import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/organisms/service-page";
import { SiteFrame } from "@/components/organisms/site-frame";
import { getDictionary } from "@/content";
import { getServicePages, isServicePageId, servicePageIds } from "@/lib/service-pages";

export function generateStaticParams() {
  return servicePageIds.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isServicePageId(slug)) return { title: "Alfa" };
  const page = getServicePages(getDictionary("en"))[slug];
  return {
    title: `${page.title} | Alfa`,
    description: page.description.join(" "),
  };
}

export default async function EnglishServiceRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isServicePageId(slug)) notFound();

  return (
    <SiteFrame>
      <ServicePage id={slug} />
    </SiteFrame>
  );
}
