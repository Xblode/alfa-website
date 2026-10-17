import { scanSections, type StructureNode } from "./site-mods-scan";
import { registerTool } from "./site-mods-tools";

const nameAttributes = ["data-section", "data-component", "data-name"] as const;

function flatten(nodes: StructureNode[]): StructureNode[] {
  const flat: StructureNode[] = [];
  const walk = (list: StructureNode[]) => {
    for (const node of list) {
      flat.push(node);
      walk(node.children);
    }
  };
  walk(nodes);
  return flat;
}

function matches(node: StructureNode, query: string): boolean {
  if (node.name.toLowerCase().includes(query) || node.searchKey.toLowerCase().includes(query)) return true;
  return nameAttributes.some((attr) => node.element.getAttribute(attr)?.toLowerCase().includes(query));
}

registerTool({
  key: "search",
  label: "Recherche",
  color: "#38bdf8",
  start(ctx) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Nom";
    input.setAttribute("aria-label", "Nom");
    input.autocomplete = "off";
    input.spellcheck = false;
    input.style.cssText =
      "display:block;width:100%;box-sizing:border-box;margin:0;padding:4px 6px;border:1px solid #27272a;border-radius:6px;background:#09090b;color:#f4f4f5;font:11px/1.4 ui-sans-serif,system-ui,sans-serif;outline:none;";
    ctx.slot.replaceChildren(input);

    let queryTimer = 0;
    let blinkTimer = 0;
    let overlay: HTMLElement | null = null;
    let current: HTMLElement | null = null;

    function place() {
      if (!overlay || !current) return;
      if (!current.isConnected) {
        removeOverlay();
        ctx.setStatus("0");
        return;
      }
      const rect = current.getBoundingClientRect();
      overlay.style.left = `${rect.left}px`;
      overlay.style.top = `${rect.top}px`;
      overlay.style.width = `${rect.width}px`;
      overlay.style.height = `${rect.height}px`;
    }

    function removeOverlay() {
      window.clearInterval(blinkTimer);
      blinkTimer = 0;
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
      overlay?.remove();
      overlay = null;
      current = null;
    }

    function show(element: HTMLElement) {
      removeOverlay();
      const box = document.createElement("div");
      box.setAttribute("data-site-mods-overlay", "");
      box.style.cssText =
        "position:fixed;left:0;top:0;box-sizing:border-box;pointer-events:none;z-index:2147482000;border:2px solid #38bdf8;border-radius:2px;background:rgba(56,189,248,.16);opacity:1;";
      document.body.append(box);
      overlay = box;
      current = element;
      window.addEventListener("scroll", place, true);
      window.addEventListener("resize", place);
      element.scrollIntoView({ block: "center" });
      place();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      let on = true;
      blinkTimer = window.setInterval(() => {
        if (!overlay || !current?.isConnected) {
          removeOverlay();
          ctx.setStatus("0");
          return;
        }
        on = !on;
        overlay.style.opacity = on ? "1" : "0.15";
        place();
      }, 400);
    }

    function find(query: string) {
      const match = flatten(scanSections()).find((node) => matches(node, query));
      if (!match) {
        removeOverlay();
        ctx.setStatus("0");
        return;
      }
      show(match.element);
      ctx.setStatus("1");
    }

    function onInput() {
      window.clearTimeout(queryTimer);
      const query = input.value.trim().toLowerCase();
      if (!query) {
        removeOverlay();
        ctx.setStatus("0");
        return;
      }
      queryTimer = window.setTimeout(() => find(query), 150);
    }

    input.addEventListener("input", onInput);

    return () => {
      window.clearTimeout(queryTimer);
      removeOverlay();
      input.removeEventListener("input", onInput);
      ctx.slot.replaceChildren();
    };
  },
});
