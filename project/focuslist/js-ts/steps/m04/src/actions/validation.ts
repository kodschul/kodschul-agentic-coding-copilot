import { PRIORITIES, type Priority } from "../models/task.js";

export function assertPriority(value: string): asserts value is Priority {
  if (!PRIORITIES.includes(value as Priority)) {
    throw new Error(`Ungültige Priorität "${value}". Erlaubt: ${PRIORITIES.join(", ")}.`);
  }
}
