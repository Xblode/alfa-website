import { HomeArticles } from "@/components/organisms/home-articles";
import { HomeFaq } from "@/components/organisms/home-faq";
import { HomeContactBanner } from "@/components/organisms/home-contact-banner";
import { HomeHero } from "@/components/organisms/home-hero";
import { HomeInstagram } from "@/components/organisms/home-instagram";
import { HomeOffers } from "@/components/organisms/home-offers";
import { HomePersonas } from "@/components/organisms/home-personas";
import { HomePromises } from "@/components/organisms/home-promises";
import { HomeReviews } from "@/components/organisms/home-reviews";
import { HomeServices } from "@/components/organisms/home-services";
import { HomeSpaces } from "@/components/organisms/home-spaces";
import { SiteFrame } from "@/components/organisms/site-frame";

export default function HomePage() {
  return (
    <>
      <SiteFrame>
        <HomeHero />
        <HomePromises />
        <HomeSpaces />
        <HomeServices />
        <HomePersonas />
        <HomeOffers />
        <HomeInstagram />
        <HomeArticles />
        <HomeReviews />
        <HomeFaq />
        <HomeContactBanner />
      </SiteFrame>
    </>
  );
}
