"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Dictionary } from "@/content";
import { useDictionary } from "@/components/content-provider";

const focusRing =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function ArticleMenu({
  labelledBy,
  onChoose,
}: {
  labelledBy: string;
  onChoose: () => void;
}) {
  const { articles: articlesContent, ui } = useDictionary();
  const articles = articlesContent.items;
  const categories = articles.reduce<string[]>((list, article) => {
    if (!list.includes(article.category)) list.push(article.category);
    return list;
  }, []);
  const panelRef = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState<string | null>(null);
  const proposed = (category ? articles.filter((item) => item.category === category) : articles).slice(0, 4);

  return (
    <div
      ref={panelRef}
      className="grid gap-4 sm:grid-cols-[13rem_1fr]"
      onMouseLeave={() => setCategory(null)}
    >
      <div role="group" aria-label={ui.articleMenu.categoriesLabel}>
        <p className="px-1 pb-2 text-xs font-bold tracking-wide text-secondary/60 uppercase">
          {ui.articleMenu.categories}
        </p>
        <ul className="grid list-none gap-1 p-0">
          {categories.map((item) => {
            const selected = item === category;
            return (
              <li key={item}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onMouseEnter={() => setCategory(item)}
                  onFocus={() => setCategory(item)}
                  onBlur={(event) => {
                    const next = event.relatedTarget;
                    if (next instanceof Node && panelRef.current?.contains(next)) return;
                    setCategory(null);
                  }}
                  className={`w-full rounded-xl px-3 py-2 text-left text-sm font-bold ${focusRing} ${
                    selected ? "bg-secondary text-surface" : "hover:bg-primary/10"
                  }`}
                >
                  {item}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <p className="px-1 pb-2 text-xs font-bold tracking-wide text-secondary/60 uppercase">
          {category ?? ui.articleMenu.latest}
        </p>
        <ul aria-labelledby={labelledBy} className="grid list-none gap-2 p-0 sm:grid-cols-2">
          {proposed.map((article) => (
            <li key={article.id}>
              <ArticleLink article={article} onChoose={onChoose} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ArticleLink({
  article,
  onChoose,
}: {
  article: Dictionary["articles"]["items"][number];
  onChoose: () => void;
}) {
  return (
    <a
      href={article.href}
      onClick={onChoose}
      className={`flex h-full gap-3 rounded-xl border border-secondary/10 p-2 hover:border-primary ${focusRing}`}
    >
      <span className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-primary-100">
        <Image src={article.media.poster} alt="" fill sizes="64px" className="object-cover" />
      </span>
      <span className="flex min-w-0 flex-col gap-1 text-left">
        <span className="font-heading line-clamp-3 text-sm font-bold">{article.title}</span>
        <span className="text-xs text-secondary/60">{article.readingTime}</span>
      </span>
    </a>
  );
}
