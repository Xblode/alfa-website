import Image from "next/image";
import { ServiceTileLink } from "./service-tile-link";

type ServiceTileProps = {
  featured?: boolean;
  /** Classes de fond de la tuile (ignorées pour la tuile mise en avant, toujours sombre). */
  tone?: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  href: string;
  cta: string;
  ctaLabel: string;
};

export function ServiceTile({
  featured = false,
  tone = "bg-hero",
  title,
  summary,
  image,
  imageAlt,
  href,
  cta,
  ctaLabel,
}: ServiceTileProps) {
  const link = (
    <ServiceTileLink
      href={href}
      label={cta}
      ariaLabel={ctaLabel}
      variant={featured ? "outline" : "solid"}
    />
  );

  return (
    <article
      data-component="card"
      className={`flex flex-col overflow-hidden rounded-2xl ${
        featured
          ? "bg-secondary text-white lg:row-span-3"
          : `${tone} text-secondary lg:min-h-56`
      }`}
    >
      <div
        className={`relative w-full ${
          featured ? "h-44 sm:h-52 lg:h-auto lg:min-h-44 lg:flex-1" : "hidden lg:block lg:flex-1"
        }`}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1152px) 680px, (min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div
        className={`flex gap-4 p-6 ${
          featured ? "flex-col" : "flex-col lg:flex-row lg:items-end lg:justify-between"
        }`}
      >
        <div>
          <h3 className="font-heading text-2xl leading-tight font-light">{title}</h3>
          <p className={`mt-3 text-sm ${featured ? "text-white/80" : "text-secondary/80"}`}>
            {summary}
          </p>
        </div>
        <div className={featured ? "mt-2" : ""}>{link}</div>
      </div>
    </article>
  );
}
