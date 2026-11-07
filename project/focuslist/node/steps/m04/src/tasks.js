import { loadTasks, saveTasks } from "./store.js";

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

export async function createTask(dataPath, { title, priority }) {
  const tasks = await loadTasks(dataPath);
  const task = { id: nextId(tasks), title, priority: priority || "medium", done: false };
  tasks.push(task);
  await saveTasks(dataPath, tasks);
  return task;
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
