import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "./chevron-right";

type PersonaCardProps = {
  role: string;
  title: string;
  need: string;
  image: string;
  imageAlt: string;
  href: string;
  cta: string;
};

export function PersonaCard({
  role,
  title,
  need,
  image,
  imageAlt,
  href,
  cta,
}: PersonaCardProps) {
  return (
    <article
      data-component="card"
      className="relative isolate flex h-[25rem] flex-col items-start overflow-hidden rounded-2xl bg-secondary px-6 py-8 text-white sm:h-[28.5rem] sm:px-10 sm:py-9"
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="(min-width: 640px) 470px, 327px"
        className="-z-20 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/90 via-secondary/65 to-secondary/30"
      />
      <span className="h-1 w-12 rounded-full bg-primary" aria-hidden="true" />
      <p className="mt-4 text-sm font-semibold tracking-wide text-primary-100 uppercase">
        {role}
      </p>
      <h3 className="mt-3 font-heading text-2xl leading-[1.1] font-normal sm:text-3xl">
        {title}
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-white/90">{need}</p>
      <Link
        href={href}
        className="mt-auto inline-flex items-center gap-2 rounded-full border border-white px-6 py-3 font-heading text-sm font-medium text-white transition-colors hover:bg-white hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none"
      >
        {cta}
        <ChevronRight />
      </Link>
    </article>
  );
}
