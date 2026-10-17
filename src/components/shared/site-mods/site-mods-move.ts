import { inspectTarget, isIgnored, scanSections, siteModPath, type InspectInfo, type StructureNode } from "./site-mods-scan";
import { registerTool, type SiteModContext } from "./site-mods-tools";

const dragSlop = 6;
type Place = "avant" | "après";
type Point = { x: number; y: number };
type Drop = { node: StructureNode; place: Place };

function groupParent(element: HTMLElement): HTMLElement | null {
  const section = element.closest("[data-section]");
  if (section instanceof HTMLElement && !isIgnored(section)) return section;
  let current = element.parentElement;
  while (current && current !== document.body) {
    if (isIgnored(current)) return null;
    if (inspectTarget(current, () => true)?.element === current) return current;
    current = current.parentElement;
  }
  return element.parentElement;
}

function parentLabel(parent: HTMLElement): string {
  for (const attr of ["data-section", "data-component", "data-name"]) {
    const value = parent.getAttribute(attr);
    if (value) return `${attr}="${value}"`;
  }
  if (parent.id) return `id="${parent.id}"`;
  const info = inspectTarget(parent, () => true);
  if (info?.element === parent && info.named) return info.searchKey;
  return parent.tagName.toLowerCase();
}

function collectTargets(root: HTMLElement, source: HTMLElement): StructureNode[] {
  const found: StructureNode[] = [];
  const walk = (nodes: StructureNode[]) => {
    for (const node of nodes) {
      const element = node.element;
      if (root.contains(element)) {
        const childOfSource = element !== source && source.contains(element);
        const parentOfSource = element.contains(source);
        if (node.named && element !== source && !childOfSource && !parentOfSource) found.push(node);
      }
      walk(node.children);
    }
  };
  walk(scanSections());
  return found;
}

function layoutHorizontal(parent: HTMLElement | null): boolean {
  if (!parent) return false;
  const style = getComputedStyle(parent);
  if (style.display.endsWith("flex")) return !style.flexDirection.startsWith("column");
  if (style.display.endsWith("grid")) {
    return style.gridTemplateColumns.split(" ").filter((part) => part && part !== "none").length > 1;
  }
  return false;
}

function placeOn(rect: DOMRect, point: Point, horizontal: boolean): Place {
  if (horizontal) return point.x < rect.left + rect.width / 2 ? "avant" : "après";
  return point.y < rect.top + rect.height / 2 ? "avant" : "après";
}

function pathBody(block: string, indent: string): string {
  return block
    .split("\n")
    .filter((line) => line !== "[site-mod]")
    .map((line) => `${indent}${line}`)
    .join("\n");
}

function movePrompt(sourcePath: string, targetPath: string, parent: string, place: Place): string {
  return [
    "[site-mod-move]",
    "action: déplacer",
    "source:",
    pathBody(sourcePath, "  "),
    "destination:",
    `  parent: ${parent}`,
    `  ${place}:`,
    pathBody(targetPath, "    "),
    `consigne: Déplace la source pour qu'elle soit juste ${place} la cible, dans le même composant. Garde les classes et le responsive. Ne change rien d'autre.`,
  ].join("\n");
}

function box(css: string): HTMLElement {
  const node = document.createElement("div");
  node.style.cssText = css;
  return node;
}

function showBanner(ctx: SiteModContext, text: string) {
  const wrap = document.createElement("div");
  wrap.style.cssText = "display:flex;flex-direction:column;gap:4px;";
  const pre = document.createElement("pre");
  pre.textContent = text;
  pre.style.cssText =
    "margin:0;max-height:11rem;overflow:auto;white-space:pre-wrap;word-break:break-word;user-select:text;cursor:text;padding:6px;border:1px solid #27272a;border-radius:6px;background:#09090b;color:#e4e4e7;font:10px/1.35 ui-monospace,ui-sans-serif,monospace;";
  const cancel = document.createElement("button");
  cancel.type = "button";
  cancel.textContent = "Annuler";
  cancel.style.cssText =
    "box-sizing:border-box;width:100%;padding:4px 8px;background:#18181b;border:1px solid #27272a;color:#f4f4f5;border-radius:6px;font:inherit;cursor:pointer;";
  cancel.addEventListener("click", () => {
    ctx.slot.replaceChildren();
    ctx.setStatus("");
  });
  wrap.append(pre, cancel);
  ctx.slot.replaceChildren(wrap);
}

function start(ctx: SiteModContext): () => void {
  const root = document.createElement("div");
  root.setAttribute("data-site-mods-overlay", "");
  root.setAttribute("aria-hidden", "true");
  root.style.cssText = "position:fixed;inset:0;z-index:2147482000;pointer-events:none;overflow:visible;";
  document.body.append(root);

  let live = true;
  let frame = 0;
  let origin: Point | null = null;
  let pointer: Point | null = null;
  let source: InspectInfo | null = null;
  let group: HTMLElement | null = null;
  let targets: StructureNode[] = [];
  let dragging = false;
  let suppressClick = false;

  function clearDrag() {
    cancelAnimationFrame(frame);
    frame = 0;
    origin = null;
    pointer = null;
    source = null;
    group = null;
    targets = [];
    dragging = false;
    root.replaceChildren();
  }

  function dropAt(point: Point): Drop | null {
    if (!source) return null;
    const hit = document.elementFromPoint(point.x, point.y);
    if (!(hit instanceof Element) || isIgnored(hit)) return null;
    if (hit !== source.element && source.element.contains(hit)) return null;
    const matches = targets.filter((node) => node.element === hit || node.element.contains(hit));
    matches.sort((a, b) => (a.element.contains(b.element) ? 1 : -1));
    const node = matches[0];
    if (!node?.named || node.element === source.element) return null;
    if (source.element.contains(node.element) || node.element.contains(source.element)) return null;
    if (group && !group.contains(node.element)) return null;
    const rect = node.element.getBoundingClientRect();
    return { node, place: placeOn(rect, point, layoutHorizontal(node.element.parentElement)) };
  }

  function paint() {
    frame = 0;
    if (!live || !dragging || !source || !pointer || !origin) return;
    root.replaceChildren();
    const drop = dropAt(pointer);
    for (const target of targets) {
      const rect = target.element.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) continue;
      const active = drop?.node === target;
      root.append(
        box(
          `position:fixed;left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;height:${rect.height}px;box-sizing:border-box;border:2px solid ${active ? "#f97316" : "rgba(249,115,22,.7)"};background:${active ? "rgba(249,115,22,.14)" : "transparent"};border-radius:4px;`,
        ),
      );
    }
    if (drop) {
      const rect = drop.node.element.getBoundingClientRect();
      const horizontal = layoutHorizontal(drop.node.element.parentElement);
      const bar = box("position:fixed;background:#f97316;border-radius:999px;");
      if (horizontal) {
        bar.style.left = `${drop.place === "avant" ? rect.left - 3 : rect.right - 1}px`;
        bar.style.top = `${rect.top}px`;
        bar.style.width = "4px";
        bar.style.height = `${rect.height}px`;
      } else {
        bar.style.left = `${rect.left}px`;
        bar.style.top = `${drop.place === "avant" ? rect.top - 3 : rect.bottom - 1}px`;
        bar.style.width = `${rect.width}px`;
        bar.style.height = "4px";
      }
      root.append(bar);
    }
    const rect = source.element.getBoundingClientRect();
    const ghost = box(
      "position:fixed;box-sizing:border-box;border:2px solid #f97316;border-radius:8px;background:rgba(249,115,22,.28);",
    );
    ghost.style.left = `${rect.left + pointer.x - origin.x}px`;
    ghost.style.top = `${rect.top + pointer.y - origin.y}px`;
    ghost.style.width = `${rect.width}px`;
    ghost.style.height = `${rect.height}px`;
    root.append(ghost);
  }

  function schedulePaint() {
    if (!frame) frame = requestAnimationFrame(paint);
  }

  function onPointerDown(event: PointerEvent) {
    if (event.button !== 0) return;
    const target = event.target;
    if (!(target instanceof Element) || isIgnored(target)) return;
    const info = inspectTarget(target, () => true);
    if (!info?.named) return;
    origin = { x: event.clientX, y: event.clientY };
    pointer = origin;
    source = info;
    group = groupParent(info.element);
    targets = group ? collectTargets(group, info.element) : [];
    dragging = false;
  }

  function onPointerMove(event: PointerEvent) {
    if (!origin || !source) return;
    pointer = { x: event.clientX, y: event.clientY };
    const dx = pointer.x - origin.x;
    const dy = pointer.y - origin.y;
    if (!dragging) {
      if (dx * dx + dy * dy <= dragSlop * dragSlop) return;
      dragging = true;
      suppressClick = true;
    }
    event.preventDefault();
    schedulePaint();
  }

  function finish(point: Point) {
    if (!source || !origin) return;
    const wasDragging = dragging;
    const taken = source;
    const parent = group;
    const drop = wasDragging ? dropAt(point) : null;
    if (!wasDragging) suppressClick = false;
    clearDrag();
    if (!wasDragging || !drop || !parent || !live) return;
    void commit(taken, drop, parent);
  }

  function onPointerUp(event: PointerEvent) {
    finish({ x: event.clientX, y: event.clientY });
  }

  function onPointerCancel() {
    if (dragging) suppressClick = true;
    clearDrag();
  }

  async function commit(taken: InspectInfo, drop: Drop, parent: HTMLElement) {
    const [sourcePath, targetPath] = await Promise.all([siteModPath(taken), siteModPath(drop.node)]);
    if (!live) return;
    const text = movePrompt(sourcePath, targetPath, parentLabel(parent), drop.place);
    showBanner(ctx, text);
    try {
      await navigator.clipboard.writeText(text);
      if (live) ctx.setStatus("Copié");
    } catch {
      if (live) ctx.setStatus("");
    }
  }

  function onClick(event: MouseEvent) {
    if (!suppressClick) return;
    suppressClick = false;
    event.preventDefault();
    event.stopPropagation();
  }

  function onDragOver(event: DragEvent) {
    if (!dragging || !source) return;
    event.preventDefault();
    pointer = { x: event.clientX, y: event.clientY };
    schedulePaint();
  }

  function onDragEnd() {
    if (!pointer) return;
    finish(pointer);
  }

  function onDrop(event: DragEvent) {
    if (!dragging) return;
    event.preventDefault();
  }

  document.addEventListener("pointerdown", onPointerDown, true);
  document.addEventListener("pointermove", onPointerMove, true);
  document.addEventListener("pointerup", onPointerUp, true);
  document.addEventListener("pointercancel", onPointerCancel, true);
  document.addEventListener("dragover", onDragOver, true);
  document.addEventListener("drop", onDrop, true);
  document.addEventListener("dragend", onDragEnd, true);
  window.addEventListener("click", onClick, true);
  window.addEventListener("scroll", schedulePaint, true);
  window.addEventListener("resize", schedulePaint);

  return () => {
    live = false;
    document.removeEventListener("pointerdown", onPointerDown, true);
    document.removeEventListener("pointermove", onPointerMove, true);
    document.removeEventListener("pointerup", onPointerUp, true);
    document.removeEventListener("pointercancel", onPointerCancel, true);
    document.removeEventListener("dragover", onDragOver, true);
    document.removeEventListener("drop", onDrop, true);
    document.removeEventListener("dragend", onDragEnd, true);
    window.removeEventListener("click", onClick, true);
    window.removeEventListener("scroll", schedulePaint, true);
    window.removeEventListener("resize", schedulePaint);
    clearDrag();
    root.remove();
    ctx.slot.replaceChildren();
    ctx.setStatus("");
  };
}

registerTool({
  key: "move",
  label: "Déplacer",
  color: "#f97316",
  start,
});
