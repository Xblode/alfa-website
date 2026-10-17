"use client";

import { useEffect, useRef, useState } from "react";
import { IconChevron, IconMods, IconStructure } from "./site-mods-icons";
import { createStructureOverlay, type StructureOverlay } from "./site-mods-overlay";
import "./site-mods-registry";
import { layerMeta, layerOrder, type LayerKey } from "./site-mods-scan";
import { orderedTools, type SiteModTool } from "./site-mods-tools";

const STORAGE_KEY = "site-mods";

type Layers = Record<LayerKey, boolean>;
type ToolsState = Record<string, boolean>;

type ModsState = {
  open: boolean;
  structure: boolean;
  layers: Layers;
  tools: ToolsState;
};

type StoredState = Partial<ModsState> & { wireframes?: boolean; designSystem?: boolean };

const defaultLayers: Layers = { sections: true, layout: true, components: true, content: false };
const defaultState: ModsState = { open: false, structure: false, layers: defaultLayers, tools: {} };

function readTools(value: unknown): ToolsState {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return {};
  const toolsState: ToolsState = {};
  for (const [key, enabled] of Object.entries(value)) {
    if (typeof enabled === "boolean") toolsState[key] = enabled;
  }
  return toolsState;
}

function readState(): ModsState {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as StoredState;
    const layers = { ...defaultLayers };
    for (const key of layerOrder) {
      const value = parsed.layers?.[key];
      if (typeof value === "boolean") layers[key] = value;
    }
    const structure = parsed.structure ?? Boolean(parsed.wireframes || parsed.designSystem);
    return {
      open: Boolean(parsed.open),
      structure: Boolean(structure),
      layers,
      tools: readTools(parsed.tools),
    };
  } catch {
    return defaultState;
  }
}

function SiteModToolRow({ tool, active, onToggle }: { tool: SiteModTool; active: boolean; onToggle: () => void }) {
  const slotRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState("");
  const [trackedActive, setTrackedActive] = useState(active);
  if (active !== trackedActive) {
    setTrackedActive(active);
    setStatus("");
  }

  useEffect(() => {
    if (!active) return;
    const slot = slotRef.current;
    if (!slot) return;
    let alive = true;
    const stop = tool.start({
      slot,
      setStatus: (text) => {
        if (alive) setStatus(text);
      },
    });
    return () => {
      alive = false;
      stop();
    };
  }, [active, tool]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/50 px-2 py-1.5">
        <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: tool.color }} />
        <span className="flex-1 text-xs font-medium text-zinc-200">{tool.label}</span>
        <button
          type="button"
          role="switch"
          aria-checked={active}
          aria-label={`${tool.label} : activer ou désactiver`}
          onClick={onToggle}
          className={`relative h-5 w-9 shrink-0 rounded-full border transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 motion-reduce:transition-none ${
            active ? "border-zinc-500 bg-zinc-100" : "border-zinc-600 bg-zinc-800"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 size-4 rounded-full shadow-sm transition-transform duration-200 motion-reduce:transition-none ${
              active ? "translate-x-4 bg-zinc-950" : "bg-zinc-400"
            }`}
          />
        </button>
      </div>
      {active && status ? <p className="px-1 text-[10px] leading-snug text-zinc-500">{status}</p> : null}
      {active ? <div ref={slotRef} data-site-mod-slot={tool.key} /> : null}
    </div>
  );
}

export function SiteModsPanel() {
  const [state, setState] = useState<ModsState>(defaultState);
  const [ready, setReady] = useState(false);
  const overlayRef = useRef<StructureOverlay | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setState(readState());
      setReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [ready, state]);

  useEffect(() => {
    if (!ready || !state.structure) return;
    const overlay = createStructureOverlay();
    overlayRef.current = overlay;
    return () => {
      overlay.destroy();
      overlayRef.current = null;
    };
  }, [ready, state.structure]);

  useEffect(() => {
    overlayRef.current?.setLayers(state.layers);
  }, [ready, state.structure, state.layers]);

  function toggleLayer(key: LayerKey) {
    setState((current) => ({ ...current, layers: { ...current.layers, [key]: !current.layers[key] } }));
  }

  return (
    <div
      data-site-mods=""
      className={`fixed left-2 top-1/2 z-[2147483001] -translate-y-1/2 font-sans text-xs motion-reduce:transform-none ${
        state.open ? "w-[min(100vw-1rem,13rem)]" : "w-9"
      }`}
    >
      <div
        className={`overflow-hidden border border-zinc-800 bg-zinc-950/95 text-zinc-100 shadow-lg shadow-black/40 backdrop-blur-sm ${
          state.open ? "rounded-xl" : "rounded-full"
        }`}
      >
        <button
          type="button"
          onClick={() => setState((current) => ({ ...current, open: !current.open }))}
          aria-expanded={state.open}
          aria-label={state.open ? "Fermer les mods" : "Ouvrir les mods"}
          className={`relative transition-colors duration-150 hover:bg-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 motion-reduce:transition-none ${
            state.open ? "flex w-full items-center gap-2 px-2.5 py-2 text-left" : "flex size-9 items-center justify-center rounded-full"
          }`}
        >
          <IconMods className={state.open ? "size-3.5 shrink-0 text-zinc-300" : "size-4 text-zinc-300"} />
          {state.open ? (
            <>
              <span className="flex-1 text-xs font-medium">Mods</span>
              <IconChevron open />
            </>
          ) : null}
          {!state.open && (state.structure || orderedTools().some((tool) => state.tools[tool.key])) ? (
            <span className="absolute top-1 right-1 size-1.5 rounded-full bg-zinc-100 ring-2 ring-zinc-950" aria-hidden />
          ) : null}
        </button>

        <div
          className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none ${
            state.open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-1.5 border-t border-zinc-800 p-1.5">
              <div className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/50 px-2 py-1.5">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-zinc-800 text-zinc-300">
                  <IconStructure className="size-3" />
                </span>
                <span className="flex-1 text-xs font-medium text-zinc-200">Structure</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={state.structure}
                  aria-label="Afficher la structure du site"
                  onClick={() => setState((current) => ({ ...current, structure: !current.structure }))}
                  className={`relative h-5 w-9 shrink-0 rounded-full border transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 motion-reduce:transition-none ${
                    state.structure ? "border-zinc-500 bg-zinc-100" : "border-zinc-600 bg-zinc-800"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 size-4 rounded-full shadow-sm transition-transform duration-200 motion-reduce:transition-none ${
                      state.structure ? "translate-x-4 bg-zinc-950" : "bg-zinc-400"
                    }`}
                  />
                </button>
              </div>

              {state.structure ? (
                <>
                  <div className="grid grid-cols-2 gap-1">
                    {layerOrder.map((key) => (
                      <button
                        key={key}
                        type="button"
                        aria-pressed={state.layers[key]}
                        onClick={() => toggleLayer(key)}
                        className={`flex items-center gap-1.5 rounded-md border px-1.5 py-1 text-[11px] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-zinc-500 motion-reduce:transition-none ${
                          state.layers[key]
                            ? "border-zinc-700 bg-zinc-800 text-zinc-100"
                            : "border-zinc-800 text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        <span
                          className="size-2 shrink-0 rounded-full"
                          style={{ backgroundColor: layerMeta[key].color, opacity: state.layers[key] ? 1 : 0.35 }}
                        />
                        {layerMeta[key].label}
                      </button>
                    ))}
                  </div>
                  <p className="px-1 text-[10px] leading-snug text-zinc-500">
                    Survol : espacements · Clic : copier le chemin · Badge : arbre
                  </p>
                </>
              ) : null}

              {orderedTools().map((tool) => (
                <SiteModToolRow
                  key={tool.key}
                  tool={tool}
                  active={Boolean(state.tools[tool.key])}
                  onToggle={() =>
                    setState((current) => ({
                      ...current,
                      tools: { ...current.tools, [tool.key]: !current.tools[tool.key] },
                    }))
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
