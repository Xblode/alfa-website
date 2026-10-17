import Link from "next/link";
import { OpenCookieSettings } from "@/components/organisms/open-cookie-settings";
import {
  mentionsLegales,
  politiqueConfidentialite,
  type LegalPageContent,
} from "@/lib/legal-pages";

const focusRing =
  "rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary";

const otherPage = {
  "/mentions-legales": politiqueConfidentialite,
  "/politique-de-confidentialite": mentionsLegales,
} as const;

export function LegalPage({ page }: { page: LegalPageContent }) {
  const related = otherPage[page.path];

  return (
    <article
      data-section={page.title}
      aria-labelledby="legal-title"
      className="bg-surface py-10 text-secondary sm:py-14"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 sm:px-6">
        <nav aria-label="Fil d'Ariane" data-component="nav">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li>
              <Link href="/" className={`font-semibold underline-offset-4 hover:underline ${focusRing}`}>
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{page.title}</li>
          </ol>
        </nav>

        <header className="flex flex-col gap-3">
          <span className="h-1 w-12 rounded-full bg-primary" aria-hidden="true" />
          <h1 id="legal-title" className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            {page.title}
          </h1>
          <p className="text-sm text-secondary/70">Mis à jour le {page.updated}.</p>
        </header>

        {page.blocks.map((block) => (
          <section key={block.heading} className="flex flex-col gap-3">
            <h2 className="font-heading text-xl font-semibold">{block.heading}</h2>
            {block.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-secondary/85">
                {paragraph}
              </p>
            ))}
            {block.items ? (
              <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-secondary/85">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        {page.cookieSettings ? <OpenCookieSettings /> : null}

        <p className="border-t border-secondary/10 pt-6 text-base">
          <Link href={related.path} className={`font-semibold text-primary underline-offset-4 hover:underline ${focusRing}`}>
            {related.title}
          </Link>
        </p>
      </div>
    </article>
  );
}
