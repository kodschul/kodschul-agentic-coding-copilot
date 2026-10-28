export type Priority = "low" | "medium" | "high";

export const PRIORITIES: Priority[] = ["low", "medium", "high"];

export interface Task {
  id: string;
  title: string;
  done: boolean;
  priority: Priority;
}
