import { MediaThumb } from "./article-media";
import { useDictionary } from "@/components/content-provider";
import type { Dictionary } from "@/content";

type Article = Dictionary["articles"]["items"][number];

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function ArticleCard({ active }: { active: Article }) {
  const { ui } = useDictionary();

  return (
    <article
      data-component="card"
      className="grid h-full items-center gap-5 rounded-2xl border border-secondary/10 bg-surface p-4 shadow-sm sm:grid-cols-[15rem_minmax(0,1fr)] sm:gap-6 sm:p-5"
    >
      <MediaThumb media={active.media} title={active.title} />

      <div className="flex min-w-0 flex-col justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-secondary/65">
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-semibold text-primary">
              {active.category}
            </span>
            <span>{active.readingTime}</span>
            {active.media.kind === "video" ? (
              <span className="font-semibold text-secondary">
                • {ui.articles.relatedReel}
              </span>
            ) : null}
          </div>

          <h3 className="mt-2 font-heading text-xl font-semibold leading-snug text-secondary sm:text-[1.375rem]">
            {active.title}
          </h3>

          <p className="mt-2 text-sm font-medium leading-relaxed text-secondary">
            {active.lead}
          </p>

          <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-secondary/75">
            {active.opening}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-secondary/10 pt-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={active.href}
              data-component="button-primary"
              className={`inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 font-heading text-xs font-semibold text-surface transition-colors hover:bg-secondary sm:text-sm ${focusRing}`}
            >
              <span>{ui.articles.read}</span>
              <span aria-hidden="true">→</span>
            </a>
            {active.media.reelHref ? (
              <a
                href={active.media.reelHref}
                target="_blank"
                rel="noopener noreferrer"
                data-component="button-secondary"
                className={`inline-flex items-center gap-1.5 rounded-lg border border-secondary/15 px-3 py-2 text-xs font-semibold text-secondary transition-colors hover:border-primary hover:text-primary sm:text-sm ${focusRing}`}
              >
                <span>{ui.articles.watchReel}</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
