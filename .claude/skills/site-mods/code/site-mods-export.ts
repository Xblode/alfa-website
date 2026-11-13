import { scanSections, type StructureNode } from "./site-mods-scan";
import { registerTool } from "./site-mods-tools";

function nodeLine(node: StructureNode): string {
  return [node.kind, node.name, node.info].filter(Boolean).join(" · ").replace(/\s+/g, " ").trim();
}

function renderNodes(nodes: StructureNode[], depth: number): string[] {
  const indent = "  ".repeat(depth);
  const lines: string[] = [];
  for (const node of nodes) {
    lines.push(`${indent}- ${nodeLine(node)}`);
    lines.push(...renderNodes(node.children, depth + 1));
  }
  return lines;
}

function buildMarkdown(): string {
  const lines = ["# Structure"];
  for (const section of scanSections()) {
    lines.push(`## ${section.name.replace(/\s+/g, " ").trim()}`, ...renderNodes(section.children, 0));
  }
  return lines.join("\n");
}

function copyWithSelection(text: string): boolean {
  const area = document.createElement("textarea");
  area.value = text;
  area.readOnly = true;
  area.setAttribute("data-site-mods-overlay", "");
  area.style.cssText = "position:fixed;top:0;left:0;opacity:0;pointer-events:none;";
  document.body.append(area);
  area.focus();
  area.select();
  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }
  area.remove();
  return copied;
}

registerTool({
  key: "export",
  label: "Export",
  color: "#a78bfa",
  start(ctx) {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let active = true;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Copier l'arbre";
    button.style.cssText =
      "box-sizing:border-box;width:100%;padding:6px 8px;background:#18181b;border:1px solid #27272a;color:#f4f4f5;border-radius:6px;font:inherit;cursor:pointer";

    const markCopied = () => {
      if (!active) return;
      clearTimeout(timer);
      ctx.setStatus("Copié");
      timer = setTimeout(() => {
        if (active) ctx.setStatus("");
      }, 900);
    };

    button.addEventListener("click", () => {
      const markdown = buildMarkdown();
      void navigator.clipboard.writeText(markdown).then(markCopied, () => {
        if (copyWithSelection(markdown)) markCopied();
      });
    });

    ctx.slot.replaceChildren(button);

    return () => {
      active = false;
      clearTimeout(timer);
      ctx.slot.replaceChildren();
    };
  },
});
