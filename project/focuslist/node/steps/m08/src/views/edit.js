import { layout } from "./layout.js";
import { escapeHtml } from "./escape.js";
import { priorityOptions, errorList } from "./parts.js";

// form = eingegebene Werte nach einem Fehler, sonst die gespeicherte Aufgabe
export function editPage(task, { errors = [], form = task } = {}) {
  return layout({
    title: "Aufgabe bearbeiten",
    body: `
    <h2 class="mb-4 text-lg font-semibold">Aufgabe bearbeiten</h2>
    ${errorList(errors)}
    <form method="post" action="/tasks/${task.id}/edit" class="space-y-4 rounded-lg bg-white p-4 shadow-sm">
      <label class="block">
        <span class="mb-1 block text-sm font-medium">Titel</span>
        <input name="title" value="${escapeHtml(form.title)}" required maxlength="100"
          class="w-full rounded-md border border-slate-300 px-3 py-2">
      </label>
      <label class="block">
        <span class="mb-1 block text-sm font-medium">Priorität</span>
        <select name="priority" class="w-full rounded-md border border-slate-300 px-2 py-2">
          ${priorityOptions(form.priority)}
        </select>
      </label>
      <label class="block">
        <span class="mb-1 block text-sm font-medium">Fällig am (optional)</span>
        <input type="date" name="due" value="${escapeHtml(form.due)}"
          class="w-full rounded-md border border-slate-300 px-3 py-2 sm:w-48">
      </label>
      <div class="flex gap-2">
        <button class="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">Speichern</button>
        <a href="/" class="rounded-md px-4 py-2 text-slate-600 hover:bg-slate-100">Abbrechen</a>
      </div>
    </form>`,
  });
}
