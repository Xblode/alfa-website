const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export function FaqSection({
  title,
  subtitle,
  items,
  titleId,
  className = "bg-surface pt-16 text-secondary sm:pt-20",
}: {
  title: string;
  subtitle: string;
  items: readonly FaqItem[];
  titleId: string;
  className?: string;
}) {
  return (
    <section data-section="FAQ" aria-labelledby={titleId} className={className}>
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 lg:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)] lg:items-start lg:gap-12">
        <div>
          <span className="mb-2 block h-1 w-10 rounded-full bg-primary" aria-hidden="true" />
          <h2
            id={titleId}
            className="font-heading text-2xl font-semibold tracking-tight text-secondary sm:text-3xl"
          >
            {title}
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-secondary/75">{subtitle}</p>
        </div>

        <div
          data-component="accordion"
          className="divide-y divide-secondary/10 overflow-hidden rounded-2xl border border-secondary/10 bg-surface px-4 shadow-sm sm:px-6"
        >
          {items.map((item, index) => (
            <details key={item.id} data-component="accordion-item" open={index === 0} className="group">
              <summary
                data-name={item.question}
                className={`flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-4 font-heading text-sm font-semibold text-secondary marker:content-none sm:text-base [&::-webkit-details-marker]:hidden ${focusRing}`}
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-secondary/15 text-secondary transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                >
                  <svg viewBox="0 0 20 20" fill="none" className="size-4">
                    <path
                      d="M5 7.5 10 12.5 15 7.5"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </summary>
              <p className="pr-12 pb-4 text-sm leading-relaxed text-secondary/80">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
