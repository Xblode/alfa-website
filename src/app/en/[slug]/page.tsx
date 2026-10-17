import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/organisms/service-page";
import { SiteFrame } from "@/components/organisms/site-frame";
import { enDictionary } from "@/lib/en-dictionary";
import { servicePages, type ServicePageContent, type ServicePageId } from "@/lib/service-pages";
import { translateTree } from "@/lib/translate";

const ids = Object.keys(servicePages) as ServicePageId[];

export function generateStaticParams() {
  return ids.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const source = servicePages[slug as ServicePageId];
  if (!source) return { title: "Alfa" };
  const page = translateTree(source, enDictionary);
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
  const source = servicePages[slug as ServicePageId];
  if (!source) notFound();

  return (
    <SiteFrame>
      <ServicePage page={translateTree(source, enDictionary) as ServicePageContent} />
    </SiteFrame>
  );
}
