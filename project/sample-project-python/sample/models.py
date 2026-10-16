"""Datenmodell für einen einfachen Support-Ticket-Datensatz."""

from dataclasses import dataclass
from typing import Literal

TicketPriority = Literal["low", "medium", "high"]
TicketStatus = Literal["open", "in_progress", "closed"]


@dataclass
class Ticket:
    id: str
    title: str
    priority: TicketPriority
    status: TicketStatus
    created_at: str
    assignee: str | None = None
