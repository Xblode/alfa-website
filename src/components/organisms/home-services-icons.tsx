import type { ReactNode } from "react";

export type ServiceIconId =
  | "domiciliation-commerciale"
  | "permanence-telephonique"
  | "location-de-bureaux"
  | "salles-de-reunion";

function ServiceIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const icons: Record<ServiceIconId, ReactNode> = {
  "domiciliation-commerciale": (
    <ServiceIcon>
      <path d="M3 9.5 12 4l9 5.5v9A1.5 1.5 0 0 1 19.5 20h-15A1.5 1.5 0 0 1 3 18.5v-9Z" />
      <path d="m3.5 10 8.5 5.25L20.5 10" />
      <path d="M9.5 20v-4.5h5V20" />
    </ServiceIcon>
  ),
  "permanence-telephonique": (
    <ServiceIcon>
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <rect x="3" y="12" width="3.5" height="6" rx="1.5" />
      <rect x="17.5" y="12" width="3.5" height="6" rx="1.5" />
      <path d="M19 18v1a2 2 0 0 1-2 2h-3.5" />
      <circle cx="12" cy="21" r="1" />
    </ServiceIcon>
  ),
  "location-de-bureaux": (
    <ServiceIcon>
      <path d="M3 14h18" />
      <path d="M5 14v6M19 14v6" />
      <rect x="7.5" y="6" width="9" height="6" rx="1" />
      <path d="M12 12v2" />
      <path d="M14 17h4" />
    </ServiceIcon>
  ),
  "salles-de-reunion": (
    <ServiceIcon>
      <rect x="4" y="4" width="16" height="11" rx="1.5" />
      <path d="M12 15v5M8.5 20h7" />
      <circle cx="9" cy="9.5" r="1.5" />
      <circle cx="15" cy="9.5" r="1.5" />
      <path d="M6.75 13a2.5 2.5 0 0 1 4.5 0M12.75 13a2.5 2.5 0 0 1 4.5 0" />
    </ServiceIcon>
  ),
};

export function ServiceGlyph({ id }: { id: ServiceIconId }) {
  return icons[id];
}
