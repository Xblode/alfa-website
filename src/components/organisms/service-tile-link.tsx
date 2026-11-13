import Link from "next/link";
import { ChevronRight } from "./chevron-right";

const base =
  "inline-flex shrink-0 items-center whitespace-nowrap gap-2 rounded-full px-6 py-3 font-heading text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";

const variants = {
  outline: "border border-white text-white hover:bg-white hover:text-secondary",
  solid: "border border-secondary bg-secondary text-white hover:bg-transparent hover:text-secondary",
} as const;

type ServiceTileLinkProps = {
  href: string;
  label: string;
  variant: keyof typeof variants;
  /** Nom accessible complet : le texte visible est identique sur les 4 boutons. */
  ariaLabel: string;
};

export function ServiceTileLink({ href, label, variant, ariaLabel }: ServiceTileLinkProps) {
  return (
    <Link href={href} aria-label={ariaLabel} className={`${base} ${variants[variant]}`}>
      {label}
      <ChevronRight />
    </Link>
  );
}
