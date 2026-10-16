export type Priority = "low" | "medium" | "high";

export const PRIORITIES: Priority[] = ["low", "medium", "high"];

export interface Task {
  id: string;
  title: string;
  done: boolean;
  priority: Priority;
  dueDate?: string; // ISO-Datum, z. B. "2026-11-03"
}
