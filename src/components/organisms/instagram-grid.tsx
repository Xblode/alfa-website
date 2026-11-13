import { ArrowUpRightIcon, InstagramMark } from "./instagram-icons";

export type InstagramPreview = { src: string; alt: string; format?: "reel" };

const GRID_SIZE = 9;

type InstagramGridProps = {
  previews: InstagramPreview[];
  href: string;
  viewLabel: (alt: string) => string;
};

// Grille 3 x 3 carrée, sans espace. Un `format: "reel"` est recadré en carré (object-cover).
// Mobile : pleine largeur (annule le padding du conteneur) ; md+ : dans sa colonne, coins arrondis.
export function InstagramGrid({ previews, href, viewLabel }: InstagramGridProps) {
  const items = previews.slice(0, GRID_SIZE);
  const placeholders = Math.max(0, GRID_SIZE - items.length);
  return (
    <ul
      data-component="grid"
      className="-mx-4 grid grid-cols-3 gap-0 overflow-hidden sm:-mx-6 md:mx-0 md:rounded-2xl"
    >
      {items.map((preview) => (
        <li key={preview.src}>
          <a
            href={href}
            aria-label={viewLabel(preview.alt)}
            className="group block overflow-hidden focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-secondary"
          >
            <span className="relative block aspect-square overflow-hidden bg-secondary/5">
              <img
                src={preview.src}
                alt=""
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none"
              />
              <span className="absolute inset-0 flex items-end justify-end bg-secondary/80 p-2 text-surface opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
                <ArrowUpRightIcon />
              </span>
            </span>
          </a>
        </li>
      ))}
      {Array.from({ length: placeholders }, (_, index) => (
        <li
          key={`placeholder-${index}`}
          aria-hidden="true"
          className="flex aspect-square items-center justify-center bg-primary-100"
        >
          <InstagramMark className="size-1/4 text-secondary/20" />
        </li>
      ))}
    </ul>
  );
}
