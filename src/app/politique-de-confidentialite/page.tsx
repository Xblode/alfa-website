import type { Metadata } from "next";
import { LegalPage } from "@/components/organisms/legal-page";
import { SiteFrame } from "@/components/organisms/site-frame";
import { politiqueConfidentialite } from "@/lib/legal-pages";

export const metadata: Metadata = {
  title: `${politiqueConfidentialite.title} | Alfa`,
  description: politiqueConfidentialite.description,
};

export default function PolitiqueConfidentialitePage() {
  return (
    <SiteFrame>
      <LegalPage page={politiqueConfidentialite} />
    </SiteFrame>
  );
}
