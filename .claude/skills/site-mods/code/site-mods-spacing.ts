import { registerTool, type SiteModContext } from "./site-mods-tools";

const paddingColor = "#34d399cc";
const marginColor = "#f59e0bcc";
const gapColor = "#a78bfacc";

const boxCss =
  "position:absolute;top:0;left:0;box-sizing:border-box;pointer-events:none;overflow:hidden;";
const fontLineCss = [
  "position:absolute",
  "top:0",
  "left:0",
  "z-index:1",
  "box-sizing:border-box",
  "pointer-events:none",
  "max-width:min(24rem,calc(100vw - 8px))",
  "padding:3px 6px",
  "border:1px solid #27272a",
  "border-radius:4px",
  "background:#09090b",
  "color:#f4f4f5",
  "font:11px/1.4 ui-sans-serif,system-ui,sans-serif",
  "white-space:nowrap",
  "overflow:hidden",
  "text-overflow:ellipsis",
  "box-shadow:0 4px 12px rgba(0,0,0,.4)",
].join(";");

type Box = { x: number; y: number; w: number; h: number };
type Edges = { top: number; right: number; bottom: number; left: number };
type Item = { rect: DOMRect; margin: Edges };

function px(value: string): number {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function positive(value: number): number {
  return value > 0 ? value : 0;
}

function edges(top: string, right: string, bottom: string, left: string): Edges {
  return { top: px(top), right: px(right), bottom: px(bottom), left: px(left) };
}

function overlap(startA: number, endA: number, startB: number, endB: number): number {
  return Math.min(endA, endB) - Math.max(startA, startB);
}

function measure(value: number): string | undefined {
  if (value < 1) return undefined;
  return String(Math.round(value));
}

function primaryFamily(fontFamily: string): string {
  const first = fontFamily.split(",")[0] ?? fontFamily;
  const clean = first.replace(/["']/g, "").trim();
  if (!clean) return "sans-serif";
  return clean.length > 36 ? `${clean.slice(0, 35)}…` : clean;
}

function fontLine(style: CSSStyleDeclaration): string {
  return `${primaryFamily(style.fontFamily)}, ${style.fontSize}, ${style.color}`;
}

function shortTarget(element: Element): string {
  const tag = element.tagName.toLowerCase();
  const name =
    element.getAttribute("data-name") ??
    element.getAttribute("data-section") ??
    element.getAttribute("data-component");
  let label = tag;
  if (name) label = `${tag} ${name}`;
  else if (element.id) label = `${tag}#${element.id}`;
  return label.length > 42 ? `${label.slice(0, 41)}…` : label;
}

function isSkipped(element: Element): boolean {
  if (element === document.documentElement || element === document.body) return true;
  return element.closest("[data-site-mods], [data-site-mods-overlay]") !== null;
}

function isTrack(display: string): boolean {
  return display === "flex" || display === "inline-flex" || display === "grid" || display === "inline-grid";
}

function move(node: HTMLElement, x: number, y: number, width?: number, height?: number) {
  if (width !== undefined) node.style.width = `${width}px`;
  if (height !== undefined) node.style.height = `${height}px`;
  node.style.transform = `translate(${x + window.scrollX}px, ${y + window.scrollY}px)`;
}

function addBand(root: HTMLElement, box: Box, background: string, label?: string) {
  if (!Number.isFinite(box.w) || !Number.isFinite(box.h) || box.w < 0.5 || box.h < 0.5) return;
  const showLabel = Boolean(label) && box.w >= 16 && box.h >= 12;
  const node = document.createElement("div");
  node.style.cssText = `${boxCss}background:${background};${
    showLabel
      ? "display:flex;align-items:center;justify-content:center;color:#18181b;font:700 10px/1 ui-sans-serif,system-ui,sans-serif;text-shadow:0 0 2px #fff;"
      : ""
  }`;
  if (showLabel && label) node.textContent = label;
  move(node, box.x, box.y, box.w, box.h);
  root.append(node);
}

function marginBox(rect: DOMRect, margin: Edges): Box {
  const top = positive(margin.top);
  const right = positive(margin.right);
  const bottom = positive(margin.bottom);
  const left = positive(margin.left);
  return {
    x: rect.left - left,
    y: rect.top - top,
    w: rect.width + left + right,
    h: rect.height + top + bottom,
  };
}

function drawMargin(root: HTMLElement, rect: DOMRect, margin: Edges) {
  const top = positive(margin.top);
  const right = positive(margin.right);
  const bottom = positive(margin.bottom);
  const left = positive(margin.left);
  const x = rect.left - left;
  const width = rect.width + left + right;
  addBand(root, { x, y: rect.top - top, w: width, h: top }, marginColor, measure(margin.top));
  addBand(root, { x, y: rect.bottom, w: width, h: bottom }, marginColor, measure(margin.bottom));
  addBand(root, { x, y: rect.top, w: left, h: rect.height }, marginColor, measure(margin.left));
  addBand(root, { x: rect.right, y: rect.top, w: right, h: rect.height }, marginColor, measure(margin.right));
}

function drawPadding(root: HTMLElement, rect: DOMRect, padding: Edges, border: Edges) {
  const innerX = rect.left + positive(border.left);
  const innerY = rect.top + positive(border.top);
  const innerW = Math.max(0, rect.width - positive(border.left) - positive(border.right));
  const innerH = Math.max(0, rect.height - positive(border.top) - positive(border.bottom));
  const top = Math.min(positive(padding.top), innerH);
  const bottom = Math.min(positive(padding.bottom), Math.max(0, innerH - top));
  const left = Math.min(positive(padding.left), innerW);
  const right = Math.min(positive(padding.right), Math.max(0, innerW - left));
  const midH = Math.max(0, innerH - top - bottom);

  addBand(root, { x: innerX, y: innerY, w: innerW, h: top }, paddingColor, measure(padding.top));
  addBand(root, { x: innerX, y: innerY + innerH - bottom, w: innerW, h: bottom }, paddingColor, measure(padding.bottom));
  addBand(root, { x: innerX, y: innerY + top, w: left, h: midH }, paddingColor, measure(padding.left));
  addBand(root, { x: innerX + innerW - right, y: innerY + top, w: right, h: midH }, paddingColor, measure(padding.right));
}

export function drawSpacing(root: HTMLElement, element: Element) {
  const style = getComputedStyle(element);
  const rect = element.getBoundingClientRect();
  if (rect.width < 0.5 && rect.height < 0.5) return;
  const margin = edges(style.marginTop, style.marginRight, style.marginBottom, style.marginLeft);
  const padding = edges(style.paddingTop, style.paddingRight, style.paddingBottom, style.paddingLeft);
  const border = edges(style.borderTopWidth, style.borderRightWidth, style.borderBottomWidth, style.borderLeftWidth);
  drawMargin(root, rect, margin);
  drawPadding(root, rect, padding, border);
}

function drawFrame(root: HTMLElement, rect: DOMRect) {
  if (rect.width < 0.5 || rect.height < 0.5) return;
  const node = document.createElement("div");
  node.style.cssText = `${boxCss}box-shadow:inset 0 0 0 1px rgba(24,24,27,.72);`;
  move(node, rect.left, rect.top, rect.width, rect.height);
  root.append(node);
}

function trackItems(element: Element): Item[] {
  const items: Item[] = [];
  for (const child of element.children) {
    if (!(child instanceof Element) || isSkipped(child)) continue;
    const childStyle = getComputedStyle(child);
    if (childStyle.display === "none" || childStyle.position === "absolute" || childStyle.position === "fixed") continue;
    const rect = child.getBoundingClientRect();
    if (rect.width < 0.5 && rect.height < 0.5) continue;
    items.push({
      rect,
      margin: edges(childStyle.marginTop, childStyle.marginRight, childStyle.marginBottom, childStyle.marginLeft),
    });
  }
  return items;
}

function gapBox(a: Item, b: Item, gap: number, axis: "x" | "y"): Box | null {
  const cross = overlap(
    axis === "x" ? a.rect.top : a.rect.left,
    axis === "x" ? a.rect.bottom : a.rect.right,
    axis === "x" ? b.rect.top : b.rect.left,
    axis === "x" ? b.rect.bottom : b.rect.right,
  );
  if (cross < 2) return null;

  const aMain = axis === "x" ? a.rect.left : a.rect.top;
  const bMain = axis === "x" ? b.rect.left : b.rect.top;
  const first = aMain <= bMain ? a : b;
  const second = first === a ? b : a;
  const firstEnd = axis === "x" ? first.rect.right : first.rect.bottom;
  const secondStart = axis === "x" ? second.rect.left : second.rect.top;
  const after = axis === "x" ? first.margin.right : first.margin.bottom;
  const before = axis === "x" ? second.margin.left : second.margin.top;
  const start = firstEnd + positive(after);
  const end = secondStart - positive(before);
  const available = end - start;
  if (available < 0.5) return null;

  const size = Math.min(available, gap);
  const origin = start + (available - size) / 2;
  const crossStart = Math.max(axis === "x" ? a.rect.top : a.rect.left, axis === "x" ? b.rect.top : b.rect.left);
  const crossEnd = Math.min(axis === "x" ? a.rect.bottom : a.rect.right, axis === "x" ? b.rect.bottom : b.rect.right);
  const thickness = crossEnd - crossStart;
  if (thickness < 0.5) return null;
  if (axis === "x") return { x: origin, y: crossStart, w: size, h: thickness };
  return { x: crossStart, y: origin, w: thickness, h: size };
}

function covered(box: Box, items: Item[], first: Item, second: Item): boolean {
  return items.some((item) => {
    if (item === first || item === second) return false;
    const x = overlap(item.rect.left, item.rect.right, box.x, box.x + box.w);
    const y = overlap(item.rect.top, item.rect.bottom, box.y, box.y + box.h);
    return x > 1 && y > 1;
  });
}

function drawGaps(root: HTMLElement, element: Element, style: CSSStyleDeclaration) {
  if (!isTrack(style.display)) return;
  const gaps = { x: positive(px(style.columnGap)), y: positive(px(style.rowGap)) };
  if (gaps.x < 0.5 && gaps.y < 0.5) return;
  const items = trackItems(element);
  if (items.length < 2) return;

  for (let i = 0; i < items.length; i += 1) {
    for (let j = i + 1; j < items.length; j += 1) {
      for (const axis of ["x", "y"] as const) {
        if (gaps[axis] < 0.5) continue;
        const box = gapBox(items[i], items[j], gaps[axis], axis);
        if (!box || covered(box, items, items[i], items[j])) continue;
        addBand(root, box, gapColor, measure(gaps[axis]));
      }
    }
  }
}

function placeFontLine(root: HTMLElement, text: string, anchor: Box) {
  const node = document.createElement("div");
  node.textContent = text;
  node.style.cssText = fontLineCss;
  root.append(node);
  const width = node.offsetWidth;
  const height = node.offsetHeight;
  let x = anchor.x;
  let y = anchor.y + anchor.h + 4;
  if (y + height > window.innerHeight - 4) y = Math.max(4, anchor.y - height - 4);
  const maxX = window.innerWidth - width - 4;
  if (x > maxX) x = Math.max(4, maxX);
  if (x < 4) x = 4;
  move(node, x, y);
}

function start(ctx: SiteModContext): () => void {
  const root = document.createElement("div");
  root.setAttribute("data-site-mods-overlay", "");
  root.setAttribute("aria-hidden", "true");
  root.style.cssText =
    "position:absolute;top:0;left:0;width:0;height:0;overflow:visible;z-index:2147482000;pointer-events:none;user-select:none;";
  document.body.append(root);

  let frame = 0;
  let live = true;
  let pointer: { x: number; y: number } | null = null;

  const clear = () => {
    root.replaceChildren();
    ctx.setStatus("");
  };

  const draw = (element: Element) => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    root.replaceChildren();
    if (rect.width < 0.5 && rect.height < 0.5) {
      ctx.setStatus("");
      return;
    }
    const margin = edges(style.marginTop, style.marginRight, style.marginBottom, style.marginLeft);
    drawSpacing(root, element);
    drawFrame(root, rect);
    drawGaps(root, element, style);
    placeFontLine(root, fontLine(style), marginBox(rect, margin));
    ctx.setStatus(shortTarget(element));
  };

  const paint = () => {
    frame = 0;
    if (!live || !pointer) return;
    const hit = document.elementFromPoint(pointer.x, pointer.y);
    if (!(hit instanceof Element) || !hit.isConnected || isSkipped(hit)) {
      clear();
      return;
    }
    draw(hit);
  };

  const onPointerMove = (event: PointerEvent) => {
    pointer = { x: event.clientX, y: event.clientY };
    if (!frame) frame = requestAnimationFrame(paint);
  };

  const onPointerLeave = () => {
    pointer = null;
    cancelAnimationFrame(frame);
    frame = 0;
    clear();
  };

  const onScroll = () => {
    if (!pointer || frame) return;
    frame = requestAnimationFrame(paint);
  };

  document.addEventListener("pointermove", onPointerMove, { capture: true, passive: true });
  document.documentElement.addEventListener("pointerleave", onPointerLeave);
  document.addEventListener("scroll", onScroll, { capture: true, passive: true });
  window.addEventListener("resize", onScroll);

  return () => {
    live = false;
    document.removeEventListener("pointermove", onPointerMove, { capture: true });
    document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    document.removeEventListener("scroll", onScroll, { capture: true });
    window.removeEventListener("resize", onScroll);
    cancelAnimationFrame(frame);
    root.remove();
    ctx.setStatus("");
  };
}

registerTool({
  key: "spacing",
  label: "Espacements",
  color: "#34d399",
  start,
});
