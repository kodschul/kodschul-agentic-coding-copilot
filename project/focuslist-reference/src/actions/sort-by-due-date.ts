import type { Task } from "../models/task.js";

export function sortByDueDate(tasks: Task[]): Task[] {
  const withDate = tasks.filter((t) => t.dueDate);
  const withoutDate = tasks.filter((t) => !t.dueDate);
  withDate.sort((a, b) => a.dueDate!.localeCompare(b.dueDate!));
  return [...withDate, ...withoutDate];
}
