import { ServiceGlyph, type ServiceIconId } from "@/components/organisms/home-services-icons";
import type { MenuPickerItem } from "./menu-picker";

const focusRing =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const serviceIds: readonly ServiceIconId[] = [
  "domiciliation-commerciale",
  "permanence-telephonique",
  "location-de-bureaux",
  "salles-de-reunion",
];

function isServiceIconId(id: string): id is ServiceIconId {
  return serviceIds.some((value) => value === id);
}

export function ServiceMenu({
  items,
  labelledBy,
  onChoose,
}: {
  items: readonly MenuPickerItem[];
  labelledBy: string;
  onChoose: () => void;
}) {
  return (
    <ul aria-labelledby={labelledBy} className="grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={item.href}
            onClick={onChoose}
            className={`flex h-full items-start gap-3 rounded-xl border border-secondary/10 p-3 hover:border-primary ${focusRing}`}
          >
            <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-secondary">
              {isServiceIconId(item.id) ? <ServiceGlyph id={item.id} /> : null}
            </span>
            <span className="flex min-w-0 flex-col gap-1 text-left">
              <span className="font-heading text-sm font-bold">{item.title}</span>
              <span className="line-clamp-3 text-sm leading-snug text-secondary/80">{item.summary}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
