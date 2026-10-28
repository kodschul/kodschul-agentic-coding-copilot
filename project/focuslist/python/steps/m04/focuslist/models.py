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

    def to_dict(self) -> dict:
        return asdict(self)
