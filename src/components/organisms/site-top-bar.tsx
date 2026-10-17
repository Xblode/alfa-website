"use client";

import { useHomeContent } from "@/components/content-provider";

function emphasize(text: string, emphasis: string) {
  const start = emphasis ? text.indexOf(emphasis) : -1;
  if (start === -1) return text;

  return (
    <>
      {text.slice(0, start)}
      <strong className="font-semibold">{emphasis}</strong>
      {text.slice(start + emphasis.length)}
    </>
  );
}

function TopBarLine({
  text,
  emphasis,
  href,
}: {
  text: string;
  emphasis: string;
  href?: string;
}) {
  const content = emphasize(text, emphasis);

  if (!href) return <p>{content}</p>;

  return (
    <a
      href={href}
      className="rounded-sm underline decoration-secondary/40 underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary max-lg:inline-flex max-lg:min-h-11 max-lg:items-center"
    >
      {content}
    </a>
  );
}

export function SiteTopBar() {
  const homeContent = useHomeContent();
  const messages = homeContent.topBar.messages;
  const track = [...messages, ...messages];

  return (
    <div className="bg-primary text-sm text-secondary" data-marquee="idle">
      <div className="mx-auto max-w-7xl overflow-hidden px-4 py-2 motion-safe:[mask-image:linear-gradient(to_right,transparent,black_1.5rem,black_calc(100%-1.5rem),transparent)]">
        <ul
          aria-label="Informations"
          data-marquee-track=""
          className="flex max-w-full list-none flex-wrap gap-x-6 gap-y-1 p-0 motion-safe:w-max motion-safe:max-w-none motion-safe:flex-nowrap motion-safe:gap-0 motion-safe:animate-top-bar-marquee motion-safe:hover:[animation-play-state:paused] motion-safe:focus-within:[animation-play-state:paused] max-lg:items-center"
        >
          {track.map((message, index) => {
            const clone = index >= messages.length;

            return (
              <li
                key={`${message.id}-${index}`}
                aria-hidden={clone ? true : undefined}
                inert={clone ? true : undefined}
                data-marquee-clone={clone ? "" : undefined}
                className={`max-w-full motion-safe:max-w-none motion-safe:shrink-0 motion-safe:pe-10 motion-safe:whitespace-nowrap ${clone ? "motion-reduce:hidden" : ""}`}
              >
                <TopBarLine
                  text={message.text}
                  emphasis={message.emphasis}
                  href={message.id === "telephone" ? homeContent.seat.phoneHref : undefined}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
