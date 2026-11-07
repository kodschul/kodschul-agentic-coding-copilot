import { layout } from "./layout.js";
import { escapeHtml } from "./escape.js";
import { priorityBadge, priorityOptions, errorList, formatDate, overdueBadge } from "./parts.js";
import { isOverdue } from "../tasks.js";

function filterLink(value, label, current) {
  const classes = value === current ? "bg-indigo-600 text-white" : "bg-white text-slate-700 hover:bg-slate-100";
  return `<a href="/?status=${value}" class="rounded-md px-3 py-1 text-sm shadow-sm ${classes}">${label}</a>`;
}

function dueInfo(task, today) {
  if (task.due === null) return "";
  const overdue = isOverdue(task, today);
  const color = overdue ? "text-red-700" : "text-slate-500";
  return `<span class="text-sm ${color}">fällig ${formatDate(task.due)}</span>${overdue ? overdueBadge() : ""}`;
}

function taskItem(task, today) {
  const titleClasses = task.done ? "text-slate-400 line-through" : "";
  const completeButton = task.done
    ? `<span class="text-sm text-green-600">✓ erledigt</span>`
    : `<form method="post" action="/tasks/${task.id}/complete">
          <button class="rounded-md bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700">Erledigt</button>
        </form>`;

  return `
      <li class="flex flex-col gap-2 rounded-lg bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div class="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 sm:flex-1">
          <span class="break-words ${titleClasses}">${escapeHtml(task.title)}</span>
          ${priorityBadge(task.priority)}
          ${dueInfo(task, today)}
        </div>
        <div class="flex flex-wrap items-center gap-2 sm:shrink-0">
          ${completeButton}
          <a href="/tasks/${task.id}/edit" class="rounded-md px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-50">Bearbeiten</a>
          <form method="post" action="/tasks/${task.id}/delete">
            <button class="rounded-md px-3 py-1 text-sm text-red-600 hover:bg-red-50">Löschen</button>
          </form>
        </div>
      </li>`;
}

export function indexPage(tasks, { status = "all", total = tasks.length, created, errors = [], form = {}, today } = {}) {
  const notice = created
    ? `<div class="mb-4 rounded-md bg-green-50 px-4 py-2 text-green-800">Aufgabe „${escapeHtml(created)}“ angelegt.</div>`
    : "";

  return layout({
    title: "Aufgaben",
    body: `
    ${notice}
    ${errorList(errors)}
    <form method="post" action="/tasks" class="mb-6 flex flex-col gap-2 sm:flex-row">
      <input name="title" value="${escapeHtml(form.title)}" placeholder="Neue Aufgabe" required maxlength="100"
        class="w-full rounded-md border border-slate-300 px-3 py-2 sm:flex-1">
      <select name="priority" class="w-full rounded-md border border-slate-300 px-2 py-2 sm:w-32">
        ${priorityOptions(form.priority ?? "medium")}
      </select>
      <input type="date" name="due" value="${escapeHtml(form.due)}" aria-label="Fällig am"
        class="w-full rounded-md border border-slate-300 px-2 py-2 sm:w-40">
      <button class="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 sm:w-auto">Hinzufügen</button>
    </form>

    <nav class="mb-4 flex flex-wrap gap-2">
      ${filterLink("all", "Alle", status)}
      ${filterLink("open", "Offen", status)}
      ${filterLink("done", "Erledigt", status)}
    </nav>

    <h2 class="mb-4 text-lg font-semibold">Meine Aufgaben</h2>
    <ul class="space-y-2">${tasks.map((task) => taskItem(task, today)).join("")}
    </ul>
    <p class="mt-6 text-sm text-slate-500">${total} Aufgaben insgesamt</p>`,
  });
}
