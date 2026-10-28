import { PRIORITIES, type Priority } from "../models/task.js";

export function assertPriority(value: string): asserts value is Priority {
  if (!PRIORITIES.includes(value as Priority)) {
    throw new Error(`Ungültige Priorität "${value}". Erlaubt: ${PRIORITIES.join(", ")}.`);
  }
}

export function assertIsoDate(value: string): void {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value))) {
    throw new Error(`Ungültiges Datum "${value}". Format: JJJJ-MM-TT.`);
  }
}
