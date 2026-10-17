import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

const required = [
  "AGENTS.md",
  "CLAUDE.md",
  "README.md",
  "CHANGELOG.md",
  ".gitignore",
  ".env.example",
  ".github/workflows/vercel.yml",
  ".github/workflows/supabase.yml",
  ".github/workflows/kit-check.yml",
  ".cursor/rules/00-project-governance.mdc",
  ".cursor/rules/05-output-style.mdc",
  ".cursor/rules/10-frontend.mdc",
  ".cursor/rules/20-backend-data.mdc",
  ".cursor/rules/30-testing.mdc",
  ".cursor/rules/40-security.mdc",
  ".cursor/rules/50-naming.mdc",
  ".cursor/rules/60-nextjs.mdc",
  ".cursor/skills/starter-kit/SKILL.md",
  ".cursor/skills/starter-kit-build/SKILL.md",
  ".cursor/skills/project-discovery/SKILL.md",
  ".cursor/skills/project-bootstrap/SKILL.md",
  ".cursor/skills/feature-spec/SKILL.md",
  ".cursor/skills/implement-task/SKILL.md",
  ".cursor/skills/ui-ux-review/SKILL.md",
  ".cursor/skills/review-before-done/SKILL.md",
  ".cursor/skills/clickup-from-context/SKILL.md",
  ".cursor/skills/project-start/SKILL.md",
  ".cursor/skills/project-sync/SKILL.md",
  ".cursor/skills/capture/SKILL.md",
  ".cursor/skills/project-status/SKILL.md",
  ".cursor/skills/session-close/SKILL.md",
  ".cursor/skills/project-review/SKILL.md",
  ".cursor/rules/clickup-write-guard.mdc",
  "docs/00-discovery/PROJECT_STATE.md",
  "docs/00-discovery/PROJECT_BRIEF.md",
  "docs/90-templates/FIRST_PROMPT.md",
  "docs/00-discovery/OPEN_QUESTIONS.md",
  "docs/00-discovery/ASSUMPTIONS_RISKS.md",
  "docs/00-discovery/SKILLS_SELECTION.md",
  "docs/03-architecture/STACK_PROFILES.md",
  "docs/03-architecture/ADR/ADR-001-default-stack.md",
  "docs/06-delivery/CLICKUP.md",
  "docs/06-delivery/CLICKUP_CONVENTION.md",
  "docs/03-architecture/ADR/ADR-002-clickup-convention.md",
  "docs/90-templates/skills/README.md",
  "docs/90-templates/skills/nextjs-seo/SKILL.md",
  "docs/90-templates/skills/supabase-security-review/SKILL.md",
  "docs/90-templates/skills/shopify-theme-workflow/SKILL.md",
  "docs/90-templates/skills/wordpress-theme-workflow/SKILL.md",
  "docs/90-templates/skills/clickup-sync/SKILL.md",
  "docs/90-templates/rules/shopify-theme.mdc",
  "docs/90-templates/rules/wordpress-theme.mdc",
];

const exists = (relative) => fs.existsSync(path.join(root, relative));
const read = (relative) =>
  fs.readFileSync(path.join(root, relative), "utf8").replaceAll("\r\n", "\n");

for (const relative of required) {
  if (!exists(relative)) errors.push(`missing ${relative}`);
}

const skippedDirectories = new Set([
  "node_modules",
  ".git",
  ".next",
  ".vercel",
  ".supabase",
  ".turbo",
  "out",
  "dist",
  "coverage",
]);

function walk(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (skippedDirectories.has(entry.name)) continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else files.push(path.relative(root, full).split(path.sep).join("/"));
  }
  return files;
}

// Fichiers suivis ou ajoutables par Git : les fichiers ignorés (.env.local, .vercel/) ne sont pas des fuites.
function listFiles() {
  try {
    const output = execFileSync(
      "git",
      ["ls-files", "-z", "--cached", "--others", "--exclude-standard"],
      { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    );
    return output.split("\0").filter((relative) => relative && exists(relative));
  } catch {
    return walk(root);
  }
}

function frontmatter(text) {
  if (!text.startsWith("---\n")) return null;
  const end = text.indexOf("\n---", 4);
  if (end === -1) return null;
  const body = text.slice(4, end);
  const data = {};
  for (const line of body.split("\n")) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (match) data[match[1]] = match[2].trim();
  }
  return data;
}

const unquote = (value) => value.replace(/^["']|["']$/g, "");

const files = listFiles();
const secretPattern = new RegExp(
  [
    String.raw`(?:sk_live|rk_live|gh[pousr]_|github_pat_|xox[baprs]-|sbp_|sb_secret_)[A-Za-z0-9_-]{8,}`,
    String.raw`sk-[A-Za-z0-9_-]{32,}`,
    String.raw`AKIA[0-9A-Z]{16}`,
    String.raw`-----BEGIN [A-Z ]*PRIVATE KEY-----`,
    String.raw`eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}`,
    String.raw`pk_\d{8,}`,
  ].join("|"),
);
const publicServiceRole = /NEXT_PUBLIC_\w*SERVICE_ROLE/;
const pathReference =
  /`((?:\.\.?\/|docs\/|\.cursor\/|\.github\/|scripts\/|prompts\/)[^`\s]*)`/g;
const historicalSources = new Set(["Résumé exécutif.md", "CHANGELOG.md"]);

for (const relative of files) {
  const text = read(relative);
  if (secretPattern.test(text)) errors.push(`possible secret in ${relative}`);
  if (publicServiceRole.test(text)) errors.push(`service_role exposed via NEXT_PUBLIC_ in ${relative}`);

  if ((relative.endsWith(".md") || relative.endsWith(".mdc")) && !historicalSources.has(relative)) {
    for (const [, reference] of text.matchAll(pathReference)) {
      if (/[<>[\]#*{}|]/.test(reference)) continue;
      const last = reference.replace(/\/$/, "").split("/").pop();
      if (!reference.endsWith("/") && !/\.[A-Za-z0-9]+$/.test(last)) continue;
      const base = reference.startsWith(".") && !reference.startsWith(".cursor/") && !reference.startsWith(".github/")
        ? path.dirname(path.join(root, relative))
        : root;
      if (!fs.existsSync(path.resolve(base, reference))) {
        errors.push(`broken reference ${reference} in ${relative}`);
      }
    }
  }

  if (relative.endsWith(".mdc") || relative.endsWith("/SKILL.md")) {
    const data = frontmatter(text);
    if (!data) {
      errors.push(`invalid frontmatter ${relative}`);
      continue;
    }
    if (relative.endsWith(".mdc")) {
      if ("glob" in data) errors.push(`use globs, not glob, in ${relative}`);
      if (data.alwaysApply !== "true" && data.alwaysApply !== "false") {
        errors.push(`alwaysApply must be true or false in ${relative}`);
      }
      if (data.globs && /\{[^}]*,[^}]*\}/.test(data.globs)) {
        errors.push(`globs are split on commas; expand {a,b} patterns in ${relative}`);
      }
    }
    if (relative.endsWith("/SKILL.md")) {
      const name = data.name ? unquote(data.name) : "";
      if (!name || !data.description) {
        errors.push(`skill name and description required in ${relative}`);
      } else if (!/^[a-z0-9-]{1,64}$/.test(name)) {
        errors.push(`invalid skill name in ${relative}`);
      } else if (path.posix.basename(path.posix.dirname(relative)) !== name) {
        errors.push(`skill folder mismatch in ${relative}`);
      }
      const invocation = data["disable-model-invocation"];
      if (invocation !== undefined && invocation !== "true" && invocation !== "false") {
        errors.push(`disable-model-invocation must be true or false in ${relative}`);
      }
    }
  }
}

// Un skill du catalogue copié dans .cursor/skills/ doit être déclaré installé dans SKILLS_SELECTION.md.
const catalog = path.join(root, "docs", "90-templates", "skills");
const installed = path.join(root, ".cursor", "skills");
const selectionFile = "docs/00-discovery/SKILLS_SELECTION.md";
const selection = exists(selectionFile) ? read(selectionFile).split("\n") : [];
if (fs.existsSync(catalog)) {
  for (const entry of fs.readdirSync(catalog, { withFileTypes: true })) {
    if (!entry.isDirectory() || !fs.existsSync(path.join(installed, entry.name))) continue;
    const row = selection.find((line) => line.startsWith(`| ${entry.name} |`));
    const installedCell = row ? (row.split("|")[5] ?? "").trim() : "";
    if (!installedCell.startsWith("oui")) {
      errors.push(`catalog skill ${entry.name} copied to .cursor/skills but not marked installed in ${selectionFile}`);
    }
  }
}

if (exists("CLAUDE.md") && !read("CLAUDE.md").includes("@AGENTS.md")) {
  errors.push("CLAUDE.md must import AGENTS.md");
}

for (const name of ["vercel.yml", "supabase.yml", "kit-check.yml"]) {
  const relative = `.github/workflows/${name}`;
  if (exists(relative) && !read(relative).includes("jobs:")) errors.push(`${name} has no jobs`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`kit check ok (${files.length} files scanned)`);
