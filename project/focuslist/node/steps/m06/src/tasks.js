import { loadTasks, saveTasks } from "./store.js";

export const PRIORITIES = ["low", "medium", "high"];
export const STATUSES = ["all", "open", "done"];
export const MAX_TITLE_LENGTH = 100;

// Prüft Formulardaten; liefert Fehlermeldungen und bereinigte Werte
export function validateTask({ title, priority }) {
  const errors = [];
  const cleanTitle = (title ?? "").trim();
  if (cleanTitle.length === 0) errors.push("Bitte einen Titel eingeben.");
  if (cleanTitle.length > MAX_TITLE_LENGTH) errors.push(`Der Titel darf höchstens ${MAX_TITLE_LENGTH} Zeichen lang sein.`);
  if (!PRIORITIES.includes(priority)) errors.push("Bitte eine gültige Priorität wählen.");
  return { errors, value: { title: cleanTitle, priority } };
}

export function filterTasks(tasks, status) {
  if (status === "open") return tasks.filter((task) => !task.done);
  if (status === "done") return tasks.filter((task) => task.done);
  return tasks;
}

// Größte vorhandene ID + 1, damit nach dem Löschen keine ID doppelt vorkommt
export function nextId(tasks) {
  return tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;
}

export async function listTasks(dataPath, status) {
  const tasks = await loadTasks(dataPath);
  return { tasks: filterTasks(tasks, status), total: tasks.length };
}

// Erwartet bereits geprüfte Werte aus validateTask()
export async function createTask(dataPath, { title, priority }) {
  const tasks = await loadTasks(dataPath);
  const task = { id: nextId(tasks), title, priority, done: false };
  tasks.push(task);
  await saveTasks(dataPath, tasks);
  return task;
}

export async function getTask(dataPath, id) {
  const tasks = await loadTasks(dataPath);
  return tasks.find((t) => t.id === id) ?? null;
}

// Ändert Titel und Priorität; erwartet geprüfte Werte aus validateTask()
export async function updateTask(dataPath, id, { title, priority }) {
  const tasks = await loadTasks(dataPath);
  const task = tasks.find((t) => t.id === id);
  if (!task) return false;
  task.title = title;
  task.priority = priority;
  await saveTasks(dataPath, tasks);
  return true;
}

export async function completeTask(dataPath, id) {
  const tasks = await loadTasks(dataPath);
  const task = tasks.find((t) => t.id === id);
  if (!task) return false;
  task.done = true;
  await saveTasks(dataPath, tasks);
  return true;
}

export async function deleteTask(dataPath, id) {
  const tasks = await loadTasks(dataPath);
  const remaining = tasks.filter((t) => t.id !== id);
  if (remaining.length === tasks.length) return false;
  await saveTasks(dataPath, remaining);
  return true;
}
