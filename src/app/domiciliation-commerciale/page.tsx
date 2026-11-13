import type { Metadata } from "next";
import { ServicePage } from "@/components/organisms/service-page";
import { SiteFrame } from "@/components/organisms/site-frame";
import { getDictionary } from "@/content";
import { getServicePages } from "@/lib/service-pages";

const page = getServicePages(getDictionary("fr"))["domiciliation-commerciale"];

export const metadata: Metadata = {
  title: `${page.title} | Alfa`,
  description: page.description.join(" "),
};

export default function DomiciliationCommercialePage() {
  return (
    <SiteFrame>
      <ServicePage id="domiciliation-commerciale" />
    </SiteFrame>
  );
}
