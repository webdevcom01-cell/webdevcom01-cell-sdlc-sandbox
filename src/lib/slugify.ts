export function slugify(text: string): string {
  // Normalize to NFD form to split accented letters
  const normalized = text.normalize('NFD');
  // Remove diacritics (accents)
  const withoutAccents = normalized.replace(/\p{Diacritic}+/gu, '');
  // Replace non-alphanumeric chars (including underscores and spaces) with hyphens
  const replaced = withoutAccents.replace(/[^a-zA-Z0-9]+/g, '-');
  // Lowercase
  const lower = replaced.toLowerCase();
  // Collapse multiple hyphens
  const collapsed = lower.replace(/-+/g, '-');
  // Trim leading/trailing hyphens
  const trimmed = collapsed.replace(/^-+|-+$/g, '');
  return trimmed;
}
