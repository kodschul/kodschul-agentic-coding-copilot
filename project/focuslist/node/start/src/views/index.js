import { layout } from "./layout.js";

const PRIORITY_LABELS = { low: "niedrig", medium: "mittel", high: "hoch" };

export function indexPage(tasks) {
  const items = tasks
    .map(
      (task) => `
      <li class="flex items-center justify-between rounded-lg bg-white px-4 py-3 shadow-sm">
        <span>${task.title}</span>
        <span class="text-sm text-slate-500">Priorität: ${PRIORITY_LABELS[task.priority]}</span>
      </li>`
    )
    .join("");

  return layout({
    title: "Aufgaben",
    body: `
    <h2 class="mb-4 text-lg font-semibold">Meine Aufgaben</h2>
    <ul class="space-y-2">${items}
    </ul>`,
  });
}
