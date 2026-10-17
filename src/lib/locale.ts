export type Locale = "fr" | "en";

export function localeFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";
}

export function stripLocale(pathname: string) {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3);
  return pathname;
}

export function localizePath(pathname: string, locale: Locale) {
  const bare = stripLocale(pathname) || "/";
  if (locale === "fr") return bare;
  return bare === "/" ? "/en" : `/en${bare}`;
}
