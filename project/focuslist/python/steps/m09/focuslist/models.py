from dataclasses import asdict, dataclass
from typing import Literal

Priority = Literal["low", "medium", "high"]
PRIORITIES: tuple[str, ...] = ("low", "medium", "high")


@dataclass
class Task:
    id: str
    title: str
    done: bool = False
    priority: Priority = "medium"
    due_date: str | None = None  # ISO-Datum, z. B. "2026-11-03"

    def to_dict(self) -> dict:
        data = asdict(self)
        if data["due_date"] is None:
            del data["due_date"]
        return data
