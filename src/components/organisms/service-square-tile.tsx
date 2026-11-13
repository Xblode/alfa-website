import Image from "next/image";
import Link from "next/link";

type ServiceSquareTileProps = {
  title: string;
  image: string;
  href: string;
};

/** Tuile carrée mobile : image en fond, titre en bas, toute la tuile est le lien. */
export function ServiceSquareTile({ title, image, href }: ServiceSquareTileProps) {
  return (
    <Link
      href={href}
      data-component="card"
      className="group relative flex aspect-square items-end overflow-hidden rounded-2xl bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="50vw"
        className="object-cover transition-transform duration-300 group-active:scale-105 motion-reduce:transition-none"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/30 to-transparent"
      />
      <span className="relative p-3 font-heading text-lg leading-tight font-medium text-white">
        {title}
      </span>
    </Link>
  );
}
