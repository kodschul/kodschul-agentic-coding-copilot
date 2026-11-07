import { layout } from "./layout.js";
import { escapeHtml } from "./escape.js";

const PRIORITY_LABELS = { low: "niedrig", medium: "mittel", high: "hoch" };

const BADGE_COLORS = {
  high: "bg-red-100 text-red-700",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-slate-200 text-slate-700",
};

function priorityBadge(priority) {
  const color = BADGE_COLORS[priority] ?? BADGE_COLORS.low;
  const label = PRIORITY_LABELS[priority] ?? priority;
  return `<span class="rounded-full px-2 py-0.5 text-xs font-medium ${color}">${escapeHtml(label)}</span>`;
}

function priorityOptions(selected) {
  return Object.entries(PRIORITY_LABELS)
    .map(([value, label]) => `<option value="${value}"${value === selected ? " selected" : ""}>${label}</option>`)
    .join("");
}

function filterLink(value, label, current) {
  const classes = value === current ? "bg-indigo-600 text-white" : "bg-white text-slate-700 hover:bg-slate-100";
  return `<a href="/?status=${value}" class="rounded-md px-3 py-1 text-sm shadow-sm ${classes}">${label}</a>`;
}

function errorList(errors) {
  if (errors.length === 0) return "";
  const items = errors.map((error) => `<li>${escapeHtml(error)}</li>`).join("");
  return `<ul class="mb-4 list-disc rounded-md bg-red-50 px-8 py-2 text-red-700">${items}</ul>`;
}

function taskItem(task) {
  const titleClasses = task.done ? "text-slate-400 line-through" : "";
  const completeButton = task.done
    ? `<span class="text-sm text-green-600">✓ erledigt</span>`
    : `<form method="post" action="/tasks/${task.id}/complete">
          <button class="rounded-md bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700">Erledigt</button>
        </form>`;

  return `
      <li class="flex items-center justify-between rounded-lg bg-white px-4 py-3 shadow-sm">
        <div class="flex items-center gap-3">
          <span class="${titleClasses}">${escapeHtml(task.title)}</span>
          ${priorityBadge(task.priority)}
        </div>
        <div class="flex items-center gap-2">
          ${completeButton}
          <form method="post" action="/tasks/${task.id}/delete">
            <button class="rounded-md px-3 py-1 text-sm text-red-600 hover:bg-red-50">Löschen</button>
          </form>
        </div>
      </li>`;
}

export function indexPage(tasks, { status = "all", total = tasks.length, created, errors = [], form = {} } = {}) {
  const notice = created
    ? `<div class="mb-4 rounded-md bg-green-50 px-4 py-2 text-green-800">Aufgabe „${escapeHtml(created)}“ angelegt.</div>`
    : "";

  return layout({
    title: "Aufgaben",
    body: `
    ${notice}
    ${errorList(errors)}
    <form method="post" action="/tasks" class="mb-6 flex gap-2">
      <input name="title" value="${escapeHtml(form.title)}" placeholder="Neue Aufgabe" required maxlength="100"
        class="w-96 rounded-md border border-slate-300 px-3 py-2">
      <select name="priority" class="w-32 rounded-md border border-slate-300 px-2 py-2">
        ${priorityOptions(form.priority ?? "medium")}
      </select>
      <button class="w-28 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">Hinzufügen</button>
    </form>

    <nav class="mb-4 flex gap-2">
      ${filterLink("all", "Alle", status)}
      ${filterLink("open", "Offen", status)}
      ${filterLink("done", "Erledigt", status)}
    </nav>

    <h2 class="mb-4 text-lg font-semibold">Meine Aufgaben</h2>
    <ul class="space-y-2">${tasks.map(taskItem).join("")}
    </ul>
    <p class="mt-6 text-sm text-slate-500">${total} Aufgaben insgesamt</p>`,
  });
}
