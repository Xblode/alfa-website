import { homeContent } from "@/lib/home-content";
import { enDictionary } from "@/lib/en-dictionary";
import { translateTree } from "@/lib/translate";

export const homeContentEn = translateTree(homeContent, enDictionary) as typeof homeContent;
