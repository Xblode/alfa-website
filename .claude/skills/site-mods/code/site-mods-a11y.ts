import { registerTool, type SiteModContext } from "./site-mods-tools";

const MIN_SIZE = 44;
const IGNORE = "[data-site-mods], [data-site-mods-overlay]";

type Mark = { element: Element; node: HTMLElement };

function isIgnored(node: Node): boolean {
  const element = node instanceof Element ? node : node.parentElement;
  return Boolean(element?.closest(IGNORE));
}

function isVisible(element: Element): boolean {
  if (element.getClientRects().length === 0) return false;
  const style = getComputedStyle(element);
  if (style.visibility === "hidden" || style.visibility === "collapse") return false;
  let current: Element | null = element;
  while (current) {
    if (parseFloat(getComputedStyle(current).opacity) === 0) return false;
    current = current.parentElement;
  }
  return true;
}

function hasText(value: string | null | undefined): boolean {
  return Boolean(value?.trim());
}

function hasAccessibleName(element: Element): boolean {
  if (hasText(element.getAttribute("aria-label"))) return true;

  const labelledBy = element.getAttribute("aria-labelledby");
  if (labelledBy?.trim()) {
    const text = labelledBy
      .trim()
      .split(/\s+/)
      .map((id) => document.getElementById(id)?.textContent ?? "")
      .join(" ");
    if (hasText(text)) return true;
  }

  if (hasText(element.textContent)) return true;

  if (element instanceof HTMLImageElement && hasText(element.getAttribute("alt"))) return true;
  const images = element.querySelectorAll("img");
  for (let index = 0; index < images.length; index += 1) {
    if (hasText(images[index].getAttribute("alt"))) return true;
  }

  return hasText(element.getAttribute("title"));
}

function collect(): { count: number; elements: Element[] } {
  const elements: Element[] = [];
  const seen = new Set<Element>();
  let count = 0;

  const add = (element: Element) => {
    count += 1;
    if (seen.has(element)) return;
    seen.add(element);
    elements.push(element);
  };

  document.querySelectorAll("a, button, input, select, textarea, [role=button]").forEach((element) => {
    if (isIgnored(element) || !isVisible(element)) return;
    const rect = element.getBoundingClientRect();
    if (rect.width < MIN_SIZE || rect.height < MIN_SIZE) add(element);
  });

  document.querySelectorAll("img").forEach((img) => {
    if (isIgnored(img) || img.hasAttribute("alt")) return;
    add(img);
  });

  let previous = 0;
  document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((heading) => {
    if (isIgnored(heading)) return;
    const level = Number(heading.tagName.slice(1));
    if (previous > 0 && level > previous + 1) add(heading);
    previous = level;
  });

  document.querySelectorAll("button, [role=button], a").forEach((element) => {
    if (isIgnored(element) || hasAccessibleName(element)) return;
    add(element);
  });

  return { count, elements };
}

function place(node: HTMLElement, element: Element) {
  const rect = element.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) {
    node.style.display = "none";
    return;
  }
  node.style.display = "";
  node.style.width = `${rect.width}px`;
  node.style.height = `${rect.height}px`;
  node.style.transform = `translate(${rect.left + window.scrollX}px, ${rect.top + window.scrollY}px)`;
}

function createMark(): HTMLElement {
  const node = document.createElement("div");
  node.style.cssText =
    "position:absolute;top:0;left:0;box-sizing:border-box;border:2px solid #f87171;background:#f871711f;pointer-events:none;";
  return node;
}

function startA11y(ctx: SiteModContext): () => void {
  const root = document.createElement("div");
  root.setAttribute("data-site-mods-overlay", "");
  root.style.cssText = "position:absolute;top:0;left:0;width:0;height:0;z-index:2147482000;pointer-events:none;";
  document.body.append(root);

  let marks: Mark[] = [];
  let frame = 0;
  let scanQueued = false;

  const position = () => {
    marks.forEach((mark) => {
      if (mark.element.isConnected) place(mark.node, mark.element);
      else mark.node.style.display = "none";
    });
  };

  const scan = () => {
    const { count, elements } = collect();
    ctx.setStatus(String(count));
    marks = elements.map((element) => ({ element, node: createMark() }));
    root.replaceChildren(...marks.map((mark) => mark.node));
    position();
  };

  const runFrame = () => {
    frame = 0;
    const full = scanQueued;
    scanQueued = false;
    if (full) scan();
    else position();
  };

  const schedule = (full: boolean) => {
    if (full) scanQueued = true;
    if (!frame) frame = requestAnimationFrame(runFrame);
  };

  const onMutations = (mutations: MutationRecord[]) => {
    if (mutations.some((mutation) => !isIgnored(mutation.target))) schedule(true);
  };

  const observer = new MutationObserver(onMutations);
  observer.observe(document.body, { subtree: true, childList: true, attributes: true, characterData: true });
  const onResize = () => schedule(true);
  const onScroll = () => schedule(false);
  const scrollOptions: AddEventListenerOptions = { capture: true, passive: true };
  window.addEventListener("resize", onResize);
  window.addEventListener("scroll", onScroll, scrollOptions);

  scan();

  return () => {
    observer.disconnect();
    window.removeEventListener("resize", onResize);
    window.removeEventListener("scroll", onScroll, scrollOptions);
    cancelAnimationFrame(frame);
    root.remove();
  };
}

registerTool({
  key: "a11y",
  label: "Accessibilité",
  color: "#f87171",
  start: startA11y,
});
