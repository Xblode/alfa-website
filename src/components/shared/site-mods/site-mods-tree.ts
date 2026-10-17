import { layerMeta, type LayerKey, type StructureNode } from "./site-mods-scan";

export type Layers = Record<LayerKey, boolean>;

type TreeOptions = {
  layers: Layers;
  expanded: Set<string>;
  onToggle: (key: string) => void;
  onHover: (node: StructureNode | null) => void;
  onCopy: (node: StructureNode, label: HTMLElement) => void;
};

const rowLimit = 12;

export function h<K extends keyof HTMLElementTagNameMap>(tag: K, css: string, text?: string) {
  const node = document.createElement(tag);
  node.style.cssText = css;
  if (text !== undefined) node.textContent = text;
  return node;
}

export function describe(node: Pick<StructureNode, "element" | "kind" | "info" | "name">): string {
  const rect = node.element.getBoundingClientRect();
  const size = `${Math.round(rect.width)}×${Math.round(rect.height)}`;
  return [node.name === node.kind ? "" : node.kind, node.info, size].filter(Boolean).join(" · ");
}

export function visibleNodes(nodes: StructureNode[], layers: Layers): StructureNode[] {
  return nodes.flatMap((node) => (layers[node.layer] ? [node] : visibleNodes(node.children, layers)));
}

function countNodes(nodes: StructureNode[], layers: Layers): number {
  return visibleNodes(nodes, layers).reduce((total, node) => total + 1 + countNodes(node.children, layers), 0);
}

function dot(layer: LayerKey) {
  return h("span", `width:6px;height:6px;border-radius:9999px;background:${layerMeta[layer].color};flex:none;`);
}

function renderRows(
  nodes: StructureNode[],
  parentKey: string,
  depth: number,
  container: HTMLElement,
  options: TreeOptions,
) {
  const showAll = options.expanded.has(`${parentKey}:all`);
  const shown = showAll ? nodes : nodes.slice(0, rowLimit);

  shown.forEach((node, index) => {
    const key = `${parentKey}/${index}`;
    const children = visibleNodes(node.children, options.layers);
    const open = options.expanded.has(key);
    const row = h(
      "div",
      `display:flex;align-items:center;gap:6px;padding:2px 8px 2px ${8 + depth * 12}px;cursor:pointer;white-space:nowrap;`,
    );
    const caret = h("span", "width:10px;color:#71717a;flex:none;", children.length ? (open ? "▾" : "▸") : "");
    const nameStyle = node.named ? "color:#f4f4f5;font-weight:500;" : "color:#a1a1aa;font-style:italic;";
    const label = h("span", `overflow:hidden;text-overflow:ellipsis;max-width:10rem;${nameStyle}`, node.name);
    const meta = h("span", "color:#71717a;overflow:hidden;text-overflow:ellipsis;", describe(node));
    row.title = "Clic : copier le chemin · ▸ : ouvrir";
    row.append(caret, dot(node.layer), label, meta);

    caret.addEventListener("click", (event) => {
      event.stopPropagation();
      if (children.length) options.onToggle(key);
    });
    row.addEventListener("mouseenter", () => {
      row.style.background = "#18181b";
      options.onHover(node);
    });
    row.addEventListener("mouseleave", () => {
      row.style.background = "";
      options.onHover(null);
    });
    row.addEventListener("click", () => options.onCopy(node, label));
    container.append(row);

    if (children.length && open) renderRows(children, key, depth + 1, container, options);
  });

  if (!showAll && nodes.length > rowLimit) {
    const more = h(
      "div",
      `padding:2px 8px 2px ${24 + depth * 12}px;color:#71717a;cursor:pointer;`,
      `+${nodes.length - rowLimit} autres`,
    );
    more.addEventListener("click", () => options.onToggle(`${parentKey}:all`));
    container.append(more);
  }
}

export function renderBadge(section: StructureNode, key: string, options: TreeOptions): HTMLDivElement {
  const open = options.expanded.has(key);
  const badge = h(
    "div",
    `position:absolute;top:0;left:0;pointer-events:auto;width:max-content;min-width:12rem;max-width:26rem;background:#09090b;color:#f4f4f5;border:1px solid #27272a;border-left:3px solid ${layerMeta.sections.color};border-radius:6px;font:11px/1.4 ui-sans-serif,system-ui,sans-serif;box-shadow:0 4px 16px rgba(0,0,0,.45);overflow:hidden;`,
  );
  const header = h(
    "button",
    "display:flex;align-items:center;gap:6px;width:100%;padding:4px 8px;background:transparent;color:inherit;border:0;cursor:pointer;text-align:left;font:inherit;",
  );
  header.type = "button";
  header.setAttribute("aria-expanded", String(open));
  header.append(
    h("span", "font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:9rem;", section.name),
    h("span", "flex:1;color:#a1a1aa;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;", describe(section)),
    h("span", "color:#71717a;white-space:nowrap;", `${countNodes(section.children, options.layers)} ${open ? "▾" : "▸"}`),
  );
  header.addEventListener("click", () => options.onToggle(key));
  header.addEventListener("mouseenter", () => options.onHover(section));
  header.addEventListener("mouseleave", () => options.onHover(null));
  badge.append(header);

  if (open) {
    const body = h("div", "max-height:50vh;overflow:auto;border-top:1px solid #27272a;padding:4px 0;");
    body.dataset.treeBody = key;
    renderRows(visibleNodes(section.children, options.layers), key, 0, body, options);
    if (!body.childElementCount) body.append(h("div", "padding:2px 8px;color:#71717a;", "Aucun élément"));
    badge.append(body);
  }
  return badge;
}
