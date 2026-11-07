import { loadTasks, saveTasks } from "./store.js";

export const PRIORITIES = ["low", "medium", "high"];
export const STATUSES = ["all", "open", "done"];
export const MAX_TITLE_LENGTH = 100;

// true, wenn value ein echtes Kalenderdatum im Format YYYY-MM-DD ist
export function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

// Heutiges Datum (lokale Zeit) als YYYY-MM-DD
export function today(now = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

// Überfällig = offen und Fälligkeit vor heute; heute fällig ist noch nicht überfällig
export function isOverdue(task, todayDate = today()) {
  return !task.done && task.due !== null && task.due < todayDate;
}

// Prüft Formulardaten; liefert Fehlermeldungen und bereinigte Werte
export function validateTask({ title, priority, due }) {
  const errors = [];
  const cleanTitle = (title ?? "").trim();
  const cleanDue = (due ?? "").trim() || null;
  if (cleanTitle.length === 0) errors.push("Bitte einen Titel eingeben.");
  if (cleanTitle.length > MAX_TITLE_LENGTH) errors.push(`Der Titel darf höchstens ${MAX_TITLE_LENGTH} Zeichen lang sein.`);
  if (!PRIORITIES.includes(priority)) errors.push("Bitte eine gültige Priorität wählen.");
  if (cleanDue !== null && !isValidDate(cleanDue)) errors.push("Bitte ein gültiges Fälligkeitsdatum wählen.");
  return { errors, value: { title: cleanTitle, priority, due: cleanDue } };
}

// Offene Aufgaben nach Fälligkeit (ohne Datum zuletzt), danach die erledigten
export function sortTasks(tasks) {
  const byDue = (a, b) => {
    if (a.due === b.due) return 0;
    if (a.due === null) return 1;
    if (b.due === null) return -1;
    return a.due < b.due ? -1 : 1;
  };
  const open = tasks.filter((task) => !task.done).sort(byDue);
  return [...open, ...tasks.filter((task) => task.done)];
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
  return { tasks: sortTasks(filterTasks(tasks, status)), total: tasks.length };
}

// Erwartet bereits geprüfte Werte aus validateTask()
export async function createTask(dataPath, { title, priority, due }) {
  const tasks = await loadTasks(dataPath);
  const task = { id: nextId(tasks), title, priority, done: false, due };
  tasks.push(task);
  await saveTasks(dataPath, tasks);
  return task;
}

export async function getTask(dataPath, id) {
  const tasks = await loadTasks(dataPath);
  return tasks.find((t) => t.id === id) ?? null;
}

// Ändert Titel, Priorität und Fälligkeit; erwartet geprüfte Werte aus validateTask()
export async function updateTask(dataPath, id, { title, priority, due }) {
  const tasks = await loadTasks(dataPath);
  const task = tasks.find((t) => t.id === id);
  if (!task) return false;
  task.title = title;
  task.priority = priority;
  task.due = due;
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
