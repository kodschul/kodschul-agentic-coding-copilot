#!/usr/bin/env node
import { addTask } from "./actions/add-task.js";
import { listTasks } from "./actions/list-tasks.js";
import { completeTask } from "./actions/complete-task.js";
import { setPriority } from "./actions/set-priority.js";
import { sortByDueDate } from "./actions/sort-by-due-date.js";
import type { Priority } from "./models/task.js";

const [command, ...args] = process.argv.slice(2);

switch (command) {
  case "add-task": {
    const [title, priority] = args;
    const task = addTask(title, priority as Priority | undefined);
    console.log(`Added: ${task.title} (${task.priority})`);
    break;
  }
  case "list-tasks": {
    const [sort] = args;
    const tasks =
      sort === "due-date" ? sortByDueDate(listTasks()) : listTasks();
    for (const task of tasks) {
      console.log(
        `[${task.done ? "x" : " "}] ${task.title} (${task.priority})`
      );
    }
    break;
  }
  case "complete-task": {
    const [id] = args;
    const task = completeTask(id);
    console.log(`Completed: ${task.title}`);
    break;
  }
  case "set-priority": {
    const [id, priority] = args;
    const task = setPriority(id, priority as Priority);
    console.log(`Priority set: ${task.title} -> ${task.priority}`);
    break;
  }
  default:
    console.error(
      "Usage: focuslist <add-task|list-tasks|complete-task|set-priority> ..."
    );
    process.exit(1);
}
