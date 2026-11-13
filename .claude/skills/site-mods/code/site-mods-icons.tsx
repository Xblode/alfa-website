type IconProps = { className?: string };

export function IconMods({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 6h16M4 12h10M4 18h16" strokeLinecap="round" />
      <circle cx="18" cy="12" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconStructure({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3" y="3" width="18" height="6" rx="1.5" />
      <rect x="3" y="12" width="8" height="9" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
    </svg>
  );
}

export function IconChevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`size-3.5 shrink-0 text-zinc-500 transition-transform duration-200 ease-out motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
