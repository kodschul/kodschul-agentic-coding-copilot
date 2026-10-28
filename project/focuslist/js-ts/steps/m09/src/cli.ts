#!/usr/bin/env node
import { addTask } from "./actions/add-task.js";
import { bulkSetPriority } from "./actions/bulk-set-priority.js";
import { completeTask } from "./actions/complete-task.js";
import { completeTasks } from "./actions/complete-tasks.js";
import { listTasks, type ListFilter } from "./actions/list-tasks.js";
import { searchTasks } from "./actions/search-tasks.js";
import { setPriority } from "./actions/set-priority.js";
import { sortByDueDate } from "./actions/sort-by-due-date.js";
import type { Priority, Task } from "./models/task.js";

const USAGE = `Usage: focuslist <command>
  add-task <titel> [low|medium|high] [JJJJ-MM-TT]
  list-tasks [--status open|done] [--priority low|medium|high] [--sort due-date]
  complete-task <id>
  complete-tasks <id> [<id> ...]
  set-priority <id> <low|medium|high>
  bulk-set-priority <low|medium|high> <id> [<id> ...]
  search-tasks <begriff>`;

function print(task: Task): void {
  const due = task.dueDate ? ` fällig ${task.dueDate}` : "";
  console.log(`${task.id}  [${task.done ? "x" : " "}] ${task.title} (${task.priority})${due}`);
}

function option(args: string[], name: string): string | undefined {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
}

function run(command: string | undefined, args: string[]): void {
  switch (command) {
    case "add-task":
      print(addTask(args[0] ?? "", (args[1] as Priority | undefined) ?? "medium", args[2]));
      return;
    case "list-tasks": {
      const filter: ListFilter = {
        status: option(args, "--status") as ListFilter["status"],
        priority: option(args, "--priority") as Priority | undefined,
      };
      const tasks = listTasks(filter);
      (option(args, "--sort") === "due-date" ? sortByDueDate(tasks) : tasks).forEach(print);
      return;
    }
    case "complete-task":
      print(completeTask(args[0] ?? ""));
      return;
    case "complete-tasks":
      completeTasks(args).forEach(print);
      return;
    case "set-priority":
      print(setPriority(args[0] ?? "", args[1] ?? ""));
      return;
    case "bulk-set-priority":
      bulkSetPriority(args.slice(1), args[0] ?? "").forEach(print);
      return;
    case "search-tasks":
      searchTasks(args.join(" ")).forEach(print);
      return;
    default:
      console.error(USAGE);
      process.exitCode = 1;
  }
}

const [command, ...args] = process.argv.slice(2);
try {
  run(command, args);
} catch (error) {
  console.error(`Fehler: ${(error as Error).message}`);
  process.exitCode = 1;
}
