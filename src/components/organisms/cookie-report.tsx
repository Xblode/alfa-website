"use client";

import { useState } from "react";
import {
  aboutCookies,
  adsSettings,
  cookieCategories,
  reportTabs,
  type CookieCategory,
  type CookieCategoryId,
  type CookieRow,
  type ReportTabId,
} from "@/lib/cookie-consent";

export function CookieReport() {
  const [tab, setTab] = useState<ReportTabId>("declaration");
  const [categoryId, setCategoryId] = useState<CookieCategoryId>("strict");
  const category =
    cookieCategories.find((item) => item.id === categoryId) ??
    cookieCategories[0];

  return (
    <div className="mt-2 text-left text-secondary">
      <div
        role="tablist"
        aria-label="Détails des cookies"
        data-component="tabs"
        className="grid grid-cols-1 bg-secondary/10 sm:grid-cols-3"
      >
        {reportTabs.map((item) => {
          const selected = tab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`cookie-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`cookie-panel-${item.id}`}
              data-component="button"
              onClick={() => setTab(item.id)}
              className={`min-h-8 px-2 py-1.5 text-center text-[11px] font-medium uppercase leading-tight focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary ${
                selected ? "bg-surface text-primary" : "text-secondary"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {tab === "declaration" ? (
        <div
          role="tabpanel"
          id="cookie-panel-declaration"
          aria-labelledby="cookie-tab-declaration"
          className="border border-secondary/10 bg-surface"
        >
          <div className="flex flex-wrap gap-1.5 border-b border-secondary/10 px-2 py-1.5">
            {cookieCategories.map((item) => {
              const selected = item.id === category.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  data-component="button"
                  aria-pressed={selected}
                  onClick={() => setCategoryId(item.id)}
                  className={`min-h-7 rounded-lg px-2 text-[11px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    selected
                      ? "bg-primary text-secondary"
                      : "bg-secondary/5 text-secondary"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <div className="px-2 py-2">
            <p className="text-xs leading-5">{category.summary}</p>
            {category.cookies.length > 0 ? <CookieTable category={category} /> : null}
          </div>
          <p className="border-t border-secondary/10 px-2 py-1.5 text-right text-[11px] text-secondary/70">
            Cookie report created by{" "}
            <a
              href="https://cookie-script.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              CookieScript
              <span className="sr-only"> (s’ouvre dans un nouvel onglet)</span>
            </a>
          </p>
        </div>
      ) : null}

      {tab === "about" ? (
        <div
          role="tabpanel"
          id="cookie-panel-about"
          aria-labelledby="cookie-tab-about"
          className="space-y-2 border border-secondary/10 bg-surface px-3 py-2.5 text-xs leading-5"
        >
          <p>{aboutCookies.storage}</p>
          <p>{aboutCookies.definition}</p>
          <p>{aboutCookies.change}</p>
        </div>
      ) : null}

      {tab === "ads" ? (
        <div
          role="tabpanel"
          id="cookie-panel-ads"
          aria-labelledby="cookie-tab-ads"
          className="border border-secondary/10 bg-surface px-3 py-2.5 text-xs leading-5"
        >
          <p>{adsSettings}</p>
        </div>
      ) : null}
    </div>
  );
}

function CookieTable({ category }: { category: CookieCategory }) {
  return (
    <>
      <ul className="mt-2 divide-y divide-secondary/10 sm:hidden">
        {category.cookies.map((cookie) => (
          <li key={cookie.name} className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-0.5 py-2">
            <span className="font-semibold">{cookie.name}</span>
            <span className="text-secondary/70">{cookie.expires}</span>
            <ProviderLine cookie={cookie} />
            <span className="col-span-2 leading-5">{cookie.description}</span>
          </li>
        ))}
      </ul>
      <table
        data-component="table"
        className="mt-2 hidden w-full table-fixed border-collapse text-left text-xs sm:table"
      >
        <caption className="sr-only">Cookies {category.label}</caption>
        <colgroup>
          <col className="w-[22%]" />
          <col className="w-[22%]" />
          <col className="w-[16%]" />
          <col className="w-[40%]" />
        </colgroup>
        <thead className="bg-secondary/5 text-[11px] uppercase">
          <tr>
            <th className="px-2 py-1.5 font-semibold">Nom</th>
            <th className="px-2 py-1.5 font-semibold">Fournisseur</th>
            <th className="px-2 py-1.5 font-semibold">Expiration</th>
            <th className="px-2 py-1.5 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {category.cookies.map((cookie) => (
            <tr key={cookie.name} className="border-t border-secondary/10">
              <td className="px-2 py-1.5 align-top font-medium break-words">
                {cookie.name}
              </td>
              <td className="px-2 py-1.5 align-top break-words">
                <ProviderName cookie={cookie} />
                <span className="mt-0.5 block text-[11px] text-secondary/70">
                  {cookie.domain}
                </span>
              </td>
              <td className="px-2 py-1.5 align-top">{cookie.expires}</td>
              <td className="px-2 py-1.5 align-top leading-5">{cookie.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function ProviderLine({ cookie }: { cookie: CookieRow }) {
  return (
    <span className="col-span-2 text-secondary/70">
      <ProviderName cookie={cookie} />
      <span> · {cookie.domain}</span>
    </span>
  );
}

function ProviderName({ cookie }: { cookie: CookieRow }) {
  if (!cookie.providerHref) return cookie.provider;
  return (
    <a
      href={cookie.providerHref}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-primary underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {cookie.provider}
      <span className="sr-only"> (s’ouvre dans un nouvel onglet)</span>
    </a>
  );
}
