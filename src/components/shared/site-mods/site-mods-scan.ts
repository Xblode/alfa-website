export type LayerKey = "sections" | "layout" | "components" | "content";

export const layerOrder: LayerKey[] = ["sections", "layout", "components", "content"];

export const layerMeta: Record<LayerKey, { label: string; color: string }> = {
  sections: { label: "Sections", color: "#f59e0b" },
  layout: { label: "Layout", color: "#a78bfa" },
  components: { label: "Composants", color: "#38bdf8" },
  content: { label: "Contenu", color: "#34d399" },
};

export type StructureNode = {
  element: HTMLElement;
  layer: LayerKey;
  kind: string;
  info: string;
  name: string;
  searchKey: string;
  named: boolean;
  children: StructureNode[];
};

export type InspectInfo = Omit<StructureNode, "children"> & { owners: string[] };

type Classification = Pick<StructureNode, "layer" | "kind" | "info">;

type DebugSource = { fileName?: string; lineNumber?: number };
type Fiber = {
  type: unknown;
  return: Fiber | null;
  _debugSource?: DebugSource | null;
  _debugInfo?: unknown;
  _debugStack?: { stack?: string } | null;
};
type SourceHit = { file: string; line?: number };
type SourceMapSection = { offsetLine: number; offsetColumn: number; sources: string[]; mappings: string };
type SourceMapJson = {
  sources?: string[];
  mappings?: string;
  sections?: { offset: { line: number; column: number }; map: { sources?: string[]; mappings?: string } }[];
};

const sectionSelector = "header, footer, main, section, article, aside, [data-section]";
const skipSelector = "script, style, noscript, template, svg";
const layoutKinds = /^(grid|flex|stack|container|row|column)/;
const frameworkName =
  /(Router|Boundary|Handler|Provider|Template|HotReload|ServerRoot|Segment|Viewport|Metadata|Overlay|Suspense|Fragment|Context|^Root$|^Link$|^Image$|^Script$|SiteModsPanel)/;

export function isIgnored(element: Element): boolean {
  return element.closest("[data-site-mods], [data-site-mods-overlay]") !== null;
}

export function truncate(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1)}…`;
}

function layoutInfo(element: HTMLElement): string {
  const style = getComputedStyle(element);
  if (style.display.endsWith("grid")) {
    const cols = style.gridTemplateColumns.split(" ").filter((part) => part && part !== "none").length;
    return cols > 1 ? `grid ${cols} col` : "grid";
  }
  if (style.display.endsWith("flex") && element.children.length > 1) {
    const direction = style.flexDirection.startsWith("column") ? "colonne" : "ligne";
    return style.flexWrap === "wrap" ? `flex ${direction} wrap` : `flex ${direction}`;
  }
  return "";
}

function variantOf(element: HTMLElement, cls: string): string {
  const source = `${element.getAttribute("data-variant") ?? ""} ${cls}`;
  const match = /primary|secondary|ghost|outline|danger|destructive/.exec(source);
  if (!match) return "";
  return match[0] === "destructive" ? "danger" : match[0];
}

function isCardLike(element: HTMLElement): boolean {
  if (element.children.length < 2) return false;
  const style = getComputedStyle(element);
  if (parseFloat(style.borderTopLeftRadius) < 6) return false;
  const framed =
    parseFloat(style.borderTopWidth) > 0 ||
    style.boxShadow !== "none" ||
    !/rgba\(0, 0, 0, 0\)|transparent/.test(style.backgroundColor);
  return framed && element.querySelector("h2, h3, h4, img") !== null;
}

function componentKind(element: HTMLElement): string {
  const tag = element.tagName;
  const role = element.getAttribute("role") ?? "";
  const cls = (element.getAttribute("class") ?? "").toLowerCase();
  let kind = "";
  if (/carousel|swiper|slider|embla/.test(cls) || element.getAttribute("aria-roledescription") === "carousel") kind = "carousel";
  else if (/accordion/.test(cls) || tag === "DETAILS") kind = "accordion";
  else if (role === "tablist" || /(^|[^a-z])tabs([^a-z]|$)/.test(cls)) kind = "tabs";
  else if (role === "dialog" || tag === "DIALOG" || /modal/.test(cls)) kind = "modal";
  else if (/dropdown/.test(cls)) kind = "dropdown";
  else if (/breadcrumb/.test(cls)) kind = "breadcrumb";
  else if (/pagination/.test(cls)) kind = "pagination";
  else if (/badge|chip/.test(cls)) kind = "badge";
  else if (/avatar/.test(cls)) kind = "avatar";
  else if (role === "alert" || /alert|toast/.test(cls)) kind = "alert";
  else if (tag === "BUTTON" || role === "button" || role === "tab" || /(^|[^a-z-])(btn|button)/.test(cls)) kind = "button";
  else if (/card/.test(cls) || isCardLike(element)) kind = "card";
  else if (tag === "A" && element.hasAttribute("href")) kind = "link";
  else if (tag === "INPUT") {
    const type = element.getAttribute("type");
    kind = type === "checkbox" || type === "radio" ? type : "input";
  } else if (tag === "TEXTAREA" || tag === "SELECT") kind = tag.toLowerCase();
  else if (tag === "FORM") kind = "form";
  else if (tag === "NAV") kind = "nav";
  else if (role.includes("menu")) kind = "menu";
  else if (role === "switch") kind = "switch";
  else if (tag === "TABLE") kind = "table";
  else if (tag === "UL" || tag === "OL") kind = "list";
  if (!kind) return "";
  const variant = variantOf(element, cls);
  return variant ? `${kind}-${variant}` : kind;
}

function contentKind(element: HTMLElement): Classification | null {
  const tag = element.tagName;
  if (/^H[1-6]$/.test(tag)) return { layer: "content", kind: tag.toLowerCase(), info: "" };
  if (tag === "P" && element.textContent?.trim()) return { layer: "content", kind: "texte", info: "" };
  if (tag === "IMG") return { layer: "content", kind: "image", info: element.getAttribute("alt") ? "" : "sans alt" };
  if (tag === "VIDEO" || tag === "IFRAME") return { layer: "content", kind: tag.toLowerCase(), info: "" };
  return null;
}

function classify(element: HTMLElement): Classification | null {
  const explicit = element.getAttribute("data-component");
  if (explicit) {
    const layer = layoutKinds.test(explicit) ? "layout" : "components";
    return { layer, kind: explicit, info: layoutInfo(element) };
  }
  if (element.matches(sectionSelector)) {
    return { layer: "sections", kind: element.tagName.toLowerCase(), info: layoutInfo(element) };
  }
  const component = componentKind(element);
  if (component) return { layer: "components", kind: component, info: layoutInfo(element) };
  const content = contentKind(element);
  if (content) return content;

  const layout = layoutInfo(element);
  const maxWidth = getComputedStyle(element).maxWidth;
  if (maxWidth !== "none" && maxWidth !== "100%" && element.children.length > 0) {
    const max = maxWidth.endsWith("px") ? `max ${Math.round(parseFloat(maxWidth))}px` : `max ${maxWidth}`;
    return { layer: "layout", kind: "container", info: layout ? `${layout} · ${max}` : max };
  }
  if (layout) return { layer: "layout", kind: layout.split(" ")[0], info: layout };
  return null;
}

function fiberOf(element: HTMLElement): Fiber | null {
  const key = Object.keys(element).find((name) => name.startsWith("__reactFiber$"));
  return key ? ((element as unknown as Record<string, Fiber>)[key] ?? null) : null;
}

function fiberNames(fiber: Fiber): string[] {
  const names: string[] = [];
  const type = fiber.type as { displayName?: string; name?: string; render?: { name?: string } } | null;
  if (typeof fiber.type === "function" || (type && typeof type === "object")) {
    const name = type?.displayName || type?.name || type?.render?.name;
    if (name) names.push(name);
  }
  if (Array.isArray(fiber._debugInfo)) {
    for (const info of [...fiber._debugInfo].reverse()) {
      const name = (info as { name?: unknown } | null)?.name;
      if (typeof name === "string") names.push(name);
    }
  }
  return names.filter((name) => name.length > 1 && /^[A-Z]/.test(name) && !frameworkName.test(name));
}

function ownComponentName(element: HTMLElement): string {
  const host = fiberOf(element);
  if (!host) return "";
  const own = fiberNames(host)[0];
  if (own) return own;
  for (let fiber = host.return; fiber && typeof fiber.type !== "string"; fiber = fiber.return) {
    const name = fiberNames(fiber)[0];
    if (name) return name;
  }
  return "";
}

const vlqChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const sourceMaps = new Map<string, Promise<SourceMapSection[] | null>>();
const skipFrame = /jsxDEV|\bjsx[s]?\b|fakeJSXCallSite|react_stack_bottom_frame|renderWithHooks|beginWork|updateFunctionComponent/;

function projectFile(raw: string): string | null {
  let value = raw.replace(/\\/g, "/");
  for (let pass = 0; pass < 2; pass += 1) {
    try {
      const decoded = decodeURIComponent(value);
      if (decoded === value) break;
      value = decoded;
    } catch {
      break;
    }
  }
  const marked = value.match(/\[project\]\/([^?\s[+]+)/);
  if (marked) value = marked[1];
  value = value.split("?")[0].split("#")[0].replace(/^file:\/\//, "");
  if (value.includes("/node_modules/") || value.includes("/_next/")) return null;
  const relative = value.match(/(?:^|\/)((?:src|app|pages|components)\/[^:\s]+?\.(?:tsx|ts|jsx|js))$/);
  return relative ? relative[1] : null;
}

function attributeName(element: HTMLElement): string {
  for (const attr of ["data-name", "data-component", "data-section"]) {
    const value = element.getAttribute(attr);
    if (value) return `${attr}="${value}"`;
  }
  if (element.id) return `id="${element.id}"`;
  return "";
}

function parseFrame(raw: string): { fn: string; file: string; line?: number; column?: number } | null {
  const text = raw.trim();
  if (!text.startsWith("at ")) return null;
  let body = text.slice(3);
  let fn = "";
  const wrapped = body.match(/^(.*) \((.*)\)$/);
  if (wrapped) {
    fn = wrapped[1] ?? "";
    body = wrapped[2] ?? "";
  }
  let line: number | undefined;
  let column: number | undefined;
  const loc = body.match(/:(\d+):(\d+)$/);
  if (loc?.index !== undefined) {
    line = Number(loc[1]);
    column = Number(loc[2]);
    body = body.slice(0, loc.index);
  }
  if (!body) return null;
  return { fn, file: body, line, column };
}

function vlq(segment: string): number[] {
  const values: number[] = [];
  let value = 0;
  let shift = 0;
  for (const char of segment) {
    const digit = vlqChars.indexOf(char);
    if (digit < 0) continue;
    value += (digit & 31) << shift;
    if (digit & 32) {
      shift += 5;
      continue;
    }
    const negative = value & 1;
    value >>= 1;
    values.push(negative ? -value : value);
    value = 0;
    shift = 0;
  }
  return values;
}

function mapSections(json: SourceMapJson): SourceMapSection[] {
  if (json.sections?.length) {
    return json.sections.map((section) => ({
      offsetLine: section.offset.line,
      offsetColumn: section.offset.column,
      sources: section.map.sources ?? [],
      mappings: section.map.mappings ?? "",
    }));
  }
  return [{ offsetLine: 0, offsetColumn: 0, sources: json.sources ?? [], mappings: json.mappings ?? "" }];
}

function loadSourceMap(scriptUrl: string): Promise<SourceMapSection[] | null> {
  const cached = sourceMaps.get(scriptUrl);
  if (cached) return cached;
  const pending = fetch(`${scriptUrl}.map`)
    .then(async (response) => (response.ok ? mapSections((await response.json()) as SourceMapJson) : null))
    .catch(() => null);
  sourceMaps.set(scriptUrl, pending);
  return pending;
}

function sectionAt(sections: SourceMapSection[], line: number, column: number): SourceMapSection | null {
  let best: SourceMapSection | null = null;
  for (const section of sections) {
    const startsBefore =
      section.offsetLine < line || (section.offsetLine === line && section.offsetColumn <= column);
    if (!startsBefore) continue;
    if (
      !best ||
      section.offsetLine > best.offsetLine ||
      (section.offsetLine === best.offsetLine && section.offsetColumn > best.offsetColumn)
    ) {
      best = section;
    }
  }
  return best;
}

function lookupMapping(sections: SourceMapSection[], line: number, column: number): SourceHit | null {
  const section = sectionAt(sections, line, column);
  if (!section) return null;
  const innerLine = line - section.offsetLine;
  const innerColumn = innerLine === 0 ? column - section.offsetColumn : column;
  const rows = section.mappings.split(";");
  let sourceIndex = 0;
  let sourceLine = 0;
  let best: SourceHit | null = null;
  const limit = Math.min(innerLine, rows.length - 1);
  for (let row = 0; row <= limit; row += 1) {
    let generated = 0;
    for (const segment of (rows[row] ?? "").split(",")) {
      if (!segment) continue;
      const delta = vlq(segment);
      if (!delta.length) continue;
      generated += delta[0] ?? 0;
      if (delta.length < 4) continue;
      sourceIndex += delta[1] ?? 0;
      sourceLine += delta[2] ?? 0;
      if (row === innerLine && generated <= innerColumn) {
        const file = projectFile(section.sources[sourceIndex] ?? "");
        if (file) best = { file, line: sourceLine + 1 };
      }
    }
  }
  return best;
}

async function originalPosition(scriptUrl: string, line: number, column: number): Promise<SourceHit | null> {
  const sections = await loadSourceMap(scriptUrl.split("?")[0] ?? scriptUrl);
  if (!sections) return null;
  return lookupMapping(sections, Math.max(0, line - 1), Math.max(0, column - 1));
}

function hitFromSource(source: DebugSource | null | undefined): SourceHit | null {
  if (!source?.fileName) return null;
  const file = projectFile(source.fileName);
  if (!file) return null;
  return { file, line: source.lineNumber && source.lineNumber > 0 ? source.lineNumber : undefined };
}

async function hitFromStack(stack: string | undefined): Promise<SourceHit | null> {
  if (!stack) return null;
  for (const raw of stack.split("\n")) {
    const frame = parseFrame(raw);
    if (!frame || skipFrame.test(frame.fn) || frame.file.includes("/node_modules/")) continue;
    const direct = projectFile(frame.file);
    if (direct) {
      const fake = frame.file.includes("about://") || frame.file.includes("[project]") || frame.file.includes("?id=");
      return { file: direct, line: fake || !frame.line ? undefined : frame.line };
    }
    const script = (frame.file.split("?")[0] ?? "").replace(/:\d+:\d+$/, "");
    if (frame.line && frame.column && /\/_next\/static\/chunks\/[^/]+\.js$/.test(script)) {
      const mapped = await originalPosition(script, frame.line, frame.column);
      if (mapped) return mapped;
    }
  }
  return null;
}

async function hitFromDebugInfo(info: unknown): Promise<SourceHit | null> {
  if (!Array.isArray(info)) return null;
  for (const item of info) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    const direct = hitFromSource(record.debugSource as DebugSource) ?? hitFromSource(record._debugSource as DebugSource);
    if (direct) return direct;
    if (typeof record.fileName === "string") {
      const file = projectFile(record.fileName);
      const line = typeof record.lineNumber === "number" ? record.lineNumber : undefined;
      if (file) return { file, line: line && line > 0 ? line : undefined };
    }
    if (Array.isArray(record.stack)) {
      for (const frame of record.stack) {
        if (!Array.isArray(frame) || typeof frame[1] !== "string") continue;
        const file = projectFile(frame[1]);
        const line = typeof frame[2] === "number" ? frame[2] : undefined;
        if (file) return { file, line: line && line > 0 ? line : undefined };
      }
    }
    const debugStack = record.debugStack as { stack?: string } | undefined;
    const debugLocation = record.debugLocation as { stack?: string } | undefined;
    const fromStack = await hitFromStack(debugStack?.stack ?? debugLocation?.stack);
    if (fromStack) return fromStack;
  }
  return null;
}

async function reactSource(element: HTMLElement): Promise<SourceHit | null> {
  for (let fiber = fiberOf(element), depth = 0; fiber && depth < 8; fiber = fiber.return, depth += 1) {
    const direct = hitFromSource(fiber._debugSource);
    if (direct) return direct;
    const stack = await hitFromStack(fiber._debugStack?.stack);
    if (stack) return stack;
    const info = await hitFromDebugInfo(fiber._debugInfo);
    if (info) return info;
  }
  return null;
}

export async function siteModPath(
  node: Pick<StructureNode, "element" | "kind" | "searchKey"> & { owners?: string[] },
): Promise<string> {
  const owners = node.owners?.length ? node.owners : ownerChain(node.element);
  const source = await reactSource(node.element);
  const lines = ["[site-mod]", `page: ${window.location.pathname}`];
  if (owners.length) lines.push(`composants: ${owners.join(" › ")}`);
  if (source) lines.push(`fichier: ${source.line ? `${source.file}:${source.line}` : source.file}`);
  lines.push(`nom: ${attributeName(node.element) || node.searchKey}`, `élément: ${node.kind}`);
  return lines.join("\n");
}

function ownerChain(element: HTMLElement, limit = 4): string[] {
  const names: string[] = [];
  for (let fiber = fiberOf(element); fiber && names.length < limit; fiber = fiber.return) {
    for (const name of fiberNames(fiber)) {
      if (names.length < limit && names[names.length - 1] !== name) names.push(name);
    }
  }
  return names.reverse();
}

function resolveName(element: HTMLElement, { layer, kind }: Classification) {
  for (const attr of ["data-name", "data-component", "data-section", "aria-label"]) {
    const value = element.getAttribute(attr);
    if (value) return { name: value, searchKey: `${attr}="${value}"`, named: true };
  }
  if (element.id) return { name: `#${element.id}`, searchKey: `id="${element.id}"`, named: true };
  const component = ownComponentName(element);
  if (component) return { name: component, searchKey: component, named: true };

  let text = "";
  if (layer === "sections") text = element.querySelector("h1, h2, h3")?.textContent ?? "";
  if (layer === "components" || layer === "content") {
    text = element.textContent || element.getAttribute("alt") || element.getAttribute("placeholder") || "";
  }
  if (text.trim()) {
    const short = truncate(text, 28);
    return { name: `${kind} « ${short} »`, searchKey: truncate(text, 48), named: false };
  }
  return { name: kind, searchKey: kind, named: false };
}

function isHidden(element: HTMLElement): boolean {
  return element.getClientRects().length === 0 && getComputedStyle(element).display !== "contents";
}

function scanChildren(parent: HTMLElement, depth: number): StructureNode[] {
  const nodes: StructureNode[] = [];
  for (const child of Array.from(parent.children)) {
    if (!(child instanceof HTMLElement) || child.matches(skipSelector) || isIgnored(child) || isHidden(child)) continue;
    const classification = classify(child);
    if (!classification) {
      nodes.push(...scanChildren(child, depth));
      continue;
    }
    const children = depth < 8 ? scanChildren(child, depth + 1) : [];
    nodes.push({ element: child, ...classification, ...resolveName(child, classification), children });
  }
  return nodes;
}

export function scanSections(): StructureNode[] {
  const all = Array.from(document.querySelectorAll<HTMLElement>(sectionSelector)).filter(
    (element) => !isIgnored(element) && !isHidden(element),
  );
  const roots = all.filter((element) => {
    if (element.tagName === "MAIN" && all.some((other) => other !== element && element.contains(other))) return false;
    const parent = element.parentElement?.closest(sectionSelector);
    return !parent || (parent.tagName === "MAIN" && !parent.hasAttribute("data-section"));
  });
  return roots.map((element) => {
    const classification: Classification = {
      layer: "sections",
      kind: element.tagName.toLowerCase(),
      info: layoutInfo(element),
    };
    return { element, ...classification, ...resolveName(element, classification), children: scanChildren(element, 1) };
  });
}

export function inspectTarget(target: Element, enabled: (layer: LayerKey) => boolean): InspectInfo | null {
  for (let current: Element | null = target; current && current !== document.body; current = current.parentElement) {
    if (!(current instanceof HTMLElement) || isIgnored(current)) continue;
    const classification = classify(current);
    if (classification && enabled(classification.layer)) {
      return { element: current, ...classification, ...resolveName(current, classification), owners: ownerChain(current) };
    }
  }
  return null;
}
