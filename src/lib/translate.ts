const skipKeys = new Set([
  "id",
  "href",
  "src",
  "image",
  "logo",
  "poster",
  "icon",
  "phoneHref",
  "emailHref",
  "email",
  "phoneDisplay",
  "reelHref",
  "kind",
  "unit",
  "instagram",
  "facebook",
  "instagramHandle",
]);

export function translateTree<T>(value: T, dictionary: Record<string, string>): T {
  if (typeof value === "string") return (dictionary[value] ?? value) as T;
  if (typeof value === "number" || typeof value === "boolean" || value == null) return value;
  if (Array.isArray(value)) return value.map((item) => translateTree(item, dictionary)) as T;

  const output: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
    output[key] = skipKeys.has(key) ? child : translateTree(child, dictionary);
  }
  return output as T;
}
