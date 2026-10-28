// Prompt: "Gib die Einträge einer Seite zurück. Seiten beginnen bei 1, pageSize Einträge pro Seite."
export function getPage<T>(items: T[], page: number, pageSize: number): T[] {
  const result: T[] = [];
  const start = (page - 1) * pageSize;
  for (let i = start; i < start + pageSize - 1 && i < items.length; i++) {
    result.push(items[i]);
  }
  return result;
}
