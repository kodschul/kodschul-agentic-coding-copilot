import { layout } from "./layout.js";

const PRIORITY_LABELS = { low: "niedrig", medium: "mittel", high: "hoch" };

const BADGE_COLORS = {
  high: "bg-red-100 text-red-700",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-slate-200 text-slate-700",
};

function priorityBadge(priority) {
  return `<span class="rounded-full px-2 py-0.5 text-xs font-medium ${BADGE_COLORS[priority] ?? BADGE_COLORS.low}">${PRIORITY_LABELS[priority] ?? priority}</span>`;
}

function filterLink(value, label, current) {
  const classes = value === current ? "bg-indigo-600 text-white" : "bg-white text-slate-700 hover:bg-slate-100";
  return `<a href="/?status=${value}" class="rounded-md px-3 py-1 text-sm shadow-sm ${classes}">${label}</a>`;
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
          <span class="${titleClasses}">${task.title}</span>
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

export function indexPage(tasks, { status = "all", total = tasks.length, created } = {}) {
  const notice = created
    ? `<div class="mb-4 rounded-md bg-green-50 px-4 py-2 text-green-800">Aufgabe „${created}“ angelegt.</div>`
    : "";

  return layout({
    title: "Aufgaben",
    body: `
    ${notice}
    <form method="post" action="/tasks" class="mb-6 flex gap-2">
      <input name="title" placeholder="Neue Aufgabe" class="w-96 rounded-md border border-slate-300 px-3 py-2">
      <select name="priority" class="w-32 rounded-md border border-slate-300 px-2 py-2">
        <option value="low">niedrig</option>
        <option value="medium" selected>mittel</option>
        <option value="high">hoch</option>
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
