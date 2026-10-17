import type { ServiceFactList } from "@/lib/service-pages";

export function ServiceFactList({ list }: { list: ServiceFactList }) {
  return (
    <div data-name={list.title} className="mt-6">
      <h3 className="font-heading text-lg font-semibold">{list.title}</h3>
      <p className="mt-1 text-sm font-semibold text-secondary">{list.note}</p>
      <ul className="mt-3 grid gap-2">
        {list.points.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-sm leading-relaxed sm:text-base">
            <span aria-hidden="true" className="mt-2 size-2 shrink-0 rounded-full bg-primary" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
