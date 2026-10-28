import { addTask } from "./actions/add-task";
import { completeTask } from "./actions/complete-task";
import { listTasks } from "./actions/list-tasks.js";
import type { Priority } from "./models/task";

const [command, ...args] = process.argv.slice(2);

if (command === "add-task") {
  const task = addTask(args[0], args[1] as Priority);
  console.log("Aufgabe angelegt:", task);
} else if (command === "list-tasks") {
  for (const t of listTasks()) {
    console.log(`${t.done ? "[x]" : "[ ]"} ${t.id} ${t.title} (${t.priority})`);
  }
} else if (command === "complete-task") {
  if (completeTask(args[0])) {
    console.log("Erledigt.");
  } else {
    console.log("Task not found");
  }
} else {
  console.log("Unbekannter Befehl");
}
