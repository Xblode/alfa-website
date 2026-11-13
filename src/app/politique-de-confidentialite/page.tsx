import type { Metadata } from "next";
import { LegalPage } from "@/components/organisms/legal-page";
import { SiteFrame } from "@/components/organisms/site-frame";
import { getDictionary } from "@/content";

const { politiqueConfidentialite } = getDictionary("fr").legalPages;

export const metadata: Metadata = {
  title: `${politiqueConfidentialite.title} | Alfa`,
  description: politiqueConfidentialite.description,
};

export default function PolitiqueConfidentialitePage() {
  return (
    <SiteFrame>
      <LegalPage id="politiqueConfidentialite" />
    </SiteFrame>
  );
}
