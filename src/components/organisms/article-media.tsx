import Image from "next/image";
import { useDictionary } from "@/components/content-provider";
import type { Dictionary } from "@/content";

type ArticleMedia = Dictionary["articles"]["items"][number]["media"];

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function MediaThumb({ media, title }: { media: ArticleMedia; title: string }) {
  const { ui } = useDictionary();
  const isVideo = media.kind === "video";
  const content = (
    <div
      data-component="image"
      className="group relative mx-auto aspect-[9/16] w-48 shrink-0 overflow-hidden rounded-xl bg-secondary sm:w-full"
    >
      {isVideo && media.src ? (
        <video
          src={media.src}
          poster={media.poster}
          muted
          playsInline
          loop
          preload="metadata"
          aria-label={media.alt}
          className="h-full w-full object-cover"
        />
      ) : (
        <Image
          src={media.poster}
          alt={media.alt}
          fill
          sizes="240px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-secondary/75 via-transparent to-secondary/35"
      />

      {isVideo ? (
        <>
          <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded-full bg-secondary/85 px-2 py-0.5 text-[11px] font-semibold text-surface">
            <span
              className="size-1.5 rounded-full bg-primary"
              aria-hidden="true"
            />
            {ui.articles.reel}
          </span>
          <span
            aria-hidden="true"
            className=" absolute inset-0 flex items-center justify-center"
          >
            <span className="inline-flex size-11 items-center justify-center rounded-full bg-primary text-secondary shadow-md transition-transform group-hover:scale-105">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="ml-0.5 size-4"
              >
                <path d="M6.5 4.75v10.5L15 10 6.5 4.75Z" />
              </svg>
            </span>
          </span>
          {media.duration ? (
            <span className="absolute right-2.5 bottom-2.5 rounded bg-secondary/85 px-1.5 py-0.5 text-[11px] font-semibold tabular-nums text-surface">
              {media.duration}
            </span>
          ) : null}
        </>
      ) : null}
    </div>
  );

  if (isVideo && media.reelHref) {
    return (
      <a
        href={media.reelHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ui.articles.readReel.replace("{title}", title)}
        className={`block rounded-xl ${focusRing}`}
      >
        {content}
      </a>
    );
  }

  return content;
}
