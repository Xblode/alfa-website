import type { Metadata } from "next";
import { LegalPage } from "@/components/organisms/legal-page";
import { SiteFrame } from "@/components/organisms/site-frame";
import { getDictionary } from "@/content";

const { mentionsLegales } = getDictionary("fr").legalPages;

export const metadata: Metadata = {
  title: `${mentionsLegales.title} | Alfa`,
  description: mentionsLegales.description,
};

export default function MentionsLegalesPage() {
  return (
    <SiteFrame>
      <LegalPage id="mentionsLegales" />
    </SiteFrame>
  );
}
