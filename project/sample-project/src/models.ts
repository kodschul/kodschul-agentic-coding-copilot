// Datenmodell für einen einfachen Support-Ticket-Datensatz.

export type TicketPriority = "low" | "medium" | "high";
export type TicketStatus = "open" | "in_progress" | "closed";

export interface Ticket {
  id: string;
  title: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  assignee?: string;
}
