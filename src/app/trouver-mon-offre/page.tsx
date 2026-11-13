import type { Metadata } from "next";
import { QuizFlow } from "@/components/organisms/quiz/quiz-flow";
import { SiteFrame } from "@/components/organisms/site-frame";
import { getDictionary } from "@/content";

const { quiz } = getDictionary("fr");

export const metadata: Metadata = {
  title: `${quiz.intro.title} | Alfa`,
  description: quiz.intro.text,
};

export default function FindMyOfferPage() {
  return (
    <SiteFrame>
      <QuizFlow />
    </SiteFrame>
  );
}
