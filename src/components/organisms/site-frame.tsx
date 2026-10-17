import type { ReactNode } from "react";
import { DocumentLang } from "@/components/content-provider";
import { ContactDock } from "@/components/organisms/contact-dock";
import { SiteFooter } from "@/components/organisms/site-footer";
import { SiteHeader } from "@/components/organisms/site-header";

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <>
      <DocumentLang />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <ContactDock />
    </>
  );
}
