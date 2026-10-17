import { registerTool, type SiteModContext } from "./site-mods-tools";

const tiers = [
  { name: "2xl", min: 1536 },
  { name: "xl", min: 1280 },
  { name: "lg", min: 1024 },
  { name: "md", min: 768 },
  { name: "sm", min: 640 },
] as const;

function tierName(width: number): string {
  return tiers.find((tier) => width >= tier.min)?.name ?? "base";
}

function reading(): string {
  const width = Math.round(window.innerWidth);
  return `${tierName(width)} · ${width}px`;
}

function startBreakpoint(ctx: SiteModContext): () => void {
  const badge = document.createElement("div");
  badge.setAttribute("data-site-mods-overlay", "");
  badge.style.cssText =
    "position:fixed;left:8px;bottom:8px;z-index:2147482000;pointer-events:none;background:#09090b;color:#f4f4f5;border:1px solid #27272a;border-radius:6px;padding:4px 8px;font:11px/1.4 ui-sans-serif,system-ui,sans-serif;";

  const update = () => {
    const text = reading();
    badge.textContent = text;
    ctx.setStatus(text);
  };

  update();
  window.addEventListener("resize", update);
  document.body.append(badge);

  return () => {
    window.removeEventListener("resize", update);
    badge.remove();
  };
}

registerTool({
  key: "breakpoint",
  label: "Breakpoint",
  color: "#f59e0b",
  start: startBreakpoint,
});
