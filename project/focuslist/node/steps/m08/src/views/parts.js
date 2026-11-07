import { escapeHtml } from "./escape.js";

// Bausteine, die mehrere Seiten nutzen

export const PRIORITY_LABELS = { low: "niedrig", medium: "mittel", high: "hoch" };

const BADGE_COLORS = {
  high: "bg-red-100 text-red-700",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-slate-200 text-slate-700",
};

export function priorityBadge(priority) {
  const color = BADGE_COLORS[priority] ?? BADGE_COLORS.low;
  const label = PRIORITY_LABELS[priority] ?? priority;
  return `<span class="rounded-full px-2 py-0.5 text-xs font-medium ${color}">${escapeHtml(label)}</span>`;
}

export function priorityOptions(selected) {
  return Object.entries(PRIORITY_LABELS)
    .map(([value, label]) => `<option value="${value}"${value === selected ? " selected" : ""}>${label}</option>`)
    .join("");
}

// "2026-11-30" → "30.11.2026"
export function formatDate(isoDate) {
  const [year, month, day] = isoDate.split("-");
  return `${day}.${month}.${year}`;
}

export function overdueBadge() {
  return `<span class="rounded-full bg-red-600 px-2 py-0.5 text-xs font-medium text-white">überfällig</span>`;
}

export function errorList(errors) {
  if (errors.length === 0) return "";
  const items = errors.map((error) => `<li>${escapeHtml(error)}</li>`).join("");
  return `<ul role="alert" class="mb-4 list-disc rounded-md bg-red-50 px-8 py-2 text-red-700">${items}</ul>`;
}
