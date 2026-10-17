import type { Metadata } from "next";
import { ServicePage } from "@/components/organisms/service-page";
import { SiteFrame } from "@/components/organisms/site-frame";
import { servicePages } from "@/lib/service-pages";

const page = servicePages["location-de-bureaux"];

export const metadata: Metadata = {
  title: `${page.title} | Alfa`,
  description: page.description.join(" "),
};

export default function LocationDeBureauxPage() {
  return (
    <SiteFrame>
      <ServicePage page={page} />
    </SiteFrame>
  );
}
