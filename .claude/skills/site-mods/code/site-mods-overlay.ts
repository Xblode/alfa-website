import {
  inspectTarget,
  isIgnored,
  layerMeta,
  scanSections,
  siteModPath,
  type InspectInfo,
  type LayerKey,
  type StructureNode,
} from "./site-mods-scan";
import { drawSpacing } from "./site-mods-spacing";
import { describe, h, renderBadge, visibleNodes, type Layers } from "./site-mods-tree";

export type StructureOverlay = {
  setLayers: (layers: Layers) => void;
  destroy: () => void;
};

type Placed = { element: HTMLElement; node: HTMLElement };
type Rect = { x: number; y: number; w: number; h: number };

const borders: Record<LayerKey, string> = {
  sections: "2px solid",
  layout: "1px dashed",
  components: "1px solid",
  content: "1px dotted",
};

const panelCss =
  "background:#09090b;color:#f4f4f5;border:1px solid #27272a;border-radius:6px;font:11px/1.45 ui-sans-serif,system-ui,sans-serif;box-shadow:0 4px 16px rgba(0,0,0,.45);";

function copyText(text: string) {
  void navigator.clipboard?.writeText(text).catch(() => undefined);
}

function overlaps(a: Rect, b: Rect): boolean {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

export function createStructureOverlay(): StructureOverlay {
  let layers: Layers = { sections: true, layout: true, components: true, content: true };
  let sections: StructureNode[] = [];
  let boxes: Placed[] = [];
  let badges: Placed[] = [];
  let highlighted: HTMLElement | null = null;
  let hoverInfo: InspectInfo | null = null;
  let hoverTarget: Element | null = null;
  let lastPointer: PointerEvent | null = null;
  let frame = 0;
  let hoverFrame = 0;
  let scanTimer = 0;
  const expanded = new Set<string>();

  const root = h("div", "position:absolute;top:0;left:0;width:0;height:0;z-index:2147483000;pointer-events:none;");
  root.setAttribute("data-site-mods-overlay", "");
  const boxLayer = h("div", "");
  const badgeLayer = h("div", "");
  const spacingLayer = h("div", "");
  const highlight = h("div", "position:absolute;top:0;left:0;display:none;box-sizing:border-box;border-radius:2px;");
  const tooltip = h("div", `position:absolute;top:0;left:0;display:none;width:max-content;max-width:24rem;padding:6px 8px;${panelCss}`);
  root.append(boxLayer, highlight, spacingLayer, badgeLayer, tooltip);
  document.body.append(root);

  function place(node: HTMLElement, rect: DOMRect) {
    node.style.transform = `translate(${rect.left + window.scrollX}px, ${rect.top + window.scrollY}px)`;
    node.style.width = `${rect.width}px`;
    node.style.height = `${rect.height}px`;
  }

  function scan() {
    sections = scanSections();
    boxes = [];
    const walk = (nodes: StructureNode[]) =>
      nodes.forEach((node) => {
        if (layers[node.layer]) {
          const color = layerMeta[node.layer].color;
          const fill = node.layer === "layout" ? `background:${color}0f;` : "";
          const box = h("div", `position:absolute;top:0;left:0;box-sizing:border-box;border:${borders[node.layer]} ${color};${fill}`);
          boxes.push({ element: node.element, node: box });
        }
        walk(node.children);
      });
    walk(sections);
    boxLayer.replaceChildren(...boxes.map((box) => box.node));
  }

  function renderBadges() {
    const scrolls = new Map<string, number>();
    badgeLayer.querySelectorAll<HTMLElement>("[data-tree-body]").forEach((body) => {
      scrolls.set(body.dataset.treeBody ?? "", body.scrollTop);
    });
    const options = { layers, expanded, onToggle: toggle, onHover: showHighlight, onCopy: copyFromTree };
    badges = sections.map((section, index) => ({
      element: section.element,
      node: renderBadge(section, String(index), options),
    }));
    badgeLayer.replaceChildren(...badges.map((badge) => badge.node));
    badgeLayer.querySelectorAll<HTMLElement>("[data-tree-body]").forEach((body) => {
      body.scrollTop = scrolls.get(body.dataset.treeBody ?? "") ?? 0;
    });
  }

  function position() {
    frame = 0;
    const boxRects = boxes.map((box) => box.element.getBoundingClientRect());
    const badgeRects = badges.map((badge) => badge.element.getBoundingClientRect());
    const sizes = badges.map((badge) => ({ w: badge.node.offsetWidth, h: badge.node.offsetHeight }));
    const highlightRect = highlighted?.getBoundingClientRect();

    boxes.forEach((box, index) => {
      const rect = boxRects[index];
      box.node.style.display = rect.width || rect.height ? "" : "none";
      place(box.node, rect);
    });

    const placed: Rect[] = [];
    badges
      .map((_, index) => index)
      .sort((a, b) => badgeRects[a].top - badgeRects[b].top)
      .forEach((index) => {
        const rect = badgeRects[index];
        const next: Rect = {
          x: Math.max(rect.left + window.scrollX + 4, window.scrollX + 56),
          y: rect.top + window.scrollY + 4,
          ...sizes[index],
        };
        for (let guard = 0, moved = true; moved && guard < 50; guard += 1) {
          moved = false;
          for (const other of placed) {
            if (overlaps(next, other)) {
              next.y = other.y + other.h + 4;
              moved = true;
            }
          }
        }
        placed.push(next);
        badges[index].node.style.transform = `translate(${next.x}px, ${next.y}px)`;
      });

    if (highlighted && highlightRect) place(highlight, highlightRect);
    paintSpacing(highlighted);
  }

  function schedulePosition() {
    if (!frame) frame = requestAnimationFrame(position);
  }

  function refresh() {
    scan();
    renderBadges();
    position();
  }

  function scheduleScan() {
    window.clearTimeout(scanTimer);
    scanTimer = window.setTimeout(refresh, 400);
  }

  function openSingleChildChain(key: string) {
    const [sectionIndex, ...path] = key.split("/");
    let nodes = visibleNodes(sections[Number(sectionIndex)]?.children ?? [], layers);
    for (const index of path) nodes = visibleNodes(nodes[Number(index)]?.children ?? [], layers);
    let current = key;
    while (nodes.length === 1) {
      current = `${current}/0`;
      expanded.add(current);
      nodes = visibleNodes(nodes[0].children, layers);
    }
  }

  function toggle(key: string) {
    if (expanded.has(key)) {
      expanded.delete(key);
    } else {
      expanded.add(key);
      if (!key.endsWith(":all")) openSingleChildChain(key);
    }
    renderBadges();
    position();
  }

  function paintSpacing(element: HTMLElement | null) {
    spacingLayer.replaceChildren();
    if (element) drawSpacing(spacingLayer, element);
  }

  function showHighlight(target: { element: HTMLElement; layer: LayerKey } | null) {
    highlighted = target?.element ?? null;
    if (!target) {
      highlight.style.display = "none";
      paintSpacing(null);
      return;
    }
    const color = layerMeta[target.layer].color;
    highlight.style.display = "";
    highlight.style.border = `2px solid ${color}`;
    highlight.style.background = `${color}1f`;
    place(highlight, target.element.getBoundingClientRect());
    paintSpacing(target.element);
  }

  function copyFromTree(node: StructureNode, label: HTMLElement) {
    void siteModPath(node).then((text) => {
      copyText(text);
      const previous = label.textContent;
      label.textContent = "Copié";
      window.setTimeout(() => {
        if (label.isConnected) label.textContent = previous;
      }, 900);
    });
  }

  function renderTooltip(info: InspectInfo, copied: boolean) {
    const title = h("div", "display:flex;align-items:center;gap:6px;font-weight:600;");
    title.append(
      h("span", `width:6px;height:6px;border-radius:9999px;background:${layerMeta[info.layer].color};flex:none;`),
      h("span", "", info.name),
    );
    const lines: HTMLElement[] = [title, h("div", "color:#a1a1aa;", `${layerMeta[info.layer].label} · ${describe(info)}`)];
    if (info.owners.length) lines.push(h("div", "color:#a1a1aa;", info.owners.join(" › ")));
    if (!info.named) lines.push(h("div", "color:#fbbf24;", "Sans nom : ajoute data-name"));
    lines.push(h("div", "color:#71717a;", copied ? "Copié" : "Clic : copier le chemin"));
    tooltip.replaceChildren(...lines);
  }

  function hideHover() {
    hoverInfo = null;
    hoverTarget = null;
    tooltip.style.display = "none";
  }

  function updateHover() {
    hoverFrame = 0;
    const event = lastPointer;
    if (!event) return;
    const target = event.target;
    if (!(target instanceof Element) || !target.isConnected || root.contains(target) || isIgnored(target)) {
      if (target instanceof Element && target.closest("[data-site-mods]")) showHighlight(null);
      hideHover();
      return;
    }
    if (target !== hoverTarget) {
      hoverTarget = target;
      hoverInfo = inspectTarget(target, (layer) => layers[layer]);
      if (!hoverInfo) {
        tooltip.style.display = "none";
        showHighlight(null);
        return;
      }
      showHighlight(hoverInfo);
      renderTooltip(hoverInfo, false);
      tooltip.style.display = "";
    }
    if (!hoverInfo) return;
    const width = tooltip.offsetWidth;
    const height = tooltip.offsetHeight;
    const left = event.clientX + 14 + width > window.innerWidth ? event.clientX - width - 14 : event.clientX + 14;
    const top = event.clientY + 14 + height > window.innerHeight ? event.clientY - height - 14 : event.clientY + 14;
    tooltip.style.transform = `translate(${left + window.scrollX}px, ${top + window.scrollY}px)`;
  }

  function onPointerMove(event: PointerEvent) {
    lastPointer = event;
    if (!hoverFrame) hoverFrame = requestAnimationFrame(updateHover);
  }

  function onPointerLeave() {
    hideHover();
    showHighlight(null);
  }

  function onClick(event: MouseEvent) {
    if (event.button !== 0) return;
    const target = event.target;
    if (!(target instanceof Element) || root.contains(target) || isIgnored(target)) return;
    const info = inspectTarget(target, (layer) => layers[layer]);
    if (!info) return;
    event.preventDefault();
    event.stopPropagation();
    hoverInfo = info;
    hoverTarget = target;
    showHighlight(info);
    void siteModPath(info).then((text) => {
      copyText(text);
      if (hoverInfo !== info) return;
      renderTooltip(info, true);
      tooltip.style.display = "";
    });
  }

  const observer = new MutationObserver((mutations) => {
    const external = mutations.some((mutation) => {
      const node = mutation.target instanceof Element ? mutation.target : mutation.target.parentElement;
      return node !== null && !isIgnored(node);
    });
    if (external) scheduleScan();
  });
  observer.observe(document.body, { childList: true, subtree: true });
  const resizeObserver = new ResizeObserver(schedulePosition);
  resizeObserver.observe(document.body);
  window.addEventListener("scroll", schedulePosition, { passive: true });
  window.addEventListener("resize", scheduleScan);
  document.addEventListener("pointermove", onPointerMove, { passive: true });
  document.documentElement.addEventListener("pointerleave", onPointerLeave);
  document.addEventListener("click", onClick, true);

  return {
    setLayers(next) {
      layers = next;
      hideHover();
      showHighlight(null);
      refresh();
    },
    destroy() {
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedulePosition);
      window.removeEventListener("resize", scheduleScan);
      document.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("click", onClick, true);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(hoverFrame);
      window.clearTimeout(scanTimer);
      root.remove();
    },
  };
}
