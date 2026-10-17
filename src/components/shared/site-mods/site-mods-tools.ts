export type SiteModContext = {
  slot: HTMLElement;
  setStatus: (text: string) => void;
};

export type SiteModTool = {
  key: string;
  label: string;
  color: string;
  start: (ctx: SiteModContext) => () => void;
};

export const tools: SiteModTool[] = [];

const toolOrder = ["breakpoint", "spacing", "a11y", "search", "export", "move"];

function toolRank(key: string): number {
  const index = toolOrder.indexOf(key);
  return index === -1 ? toolOrder.length : index;
}

export function orderedTools(): SiteModTool[] {
  return [...tools].sort((a, b) => toolRank(a.key) - toolRank(b.key));
}

export function registerTool(tool: SiteModTool) {
  const index = tools.findIndex((item) => item.key === tool.key);
  if (index === -1) tools.push(tool);
  else tools[index] = tool;
}
