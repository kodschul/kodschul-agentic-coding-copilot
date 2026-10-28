import json
import os
from dataclasses import asdict

from focuslist.models import Task

FILE = "tasks.json"


def read_tasks() -> list[Task]:
    if not os.path.exists(FILE):
        return []
    with open(FILE) as f:
        return [Task(**item) for item in json.load(f)]


def write_tasks(tasks: list[Task]) -> None:
    with open(FILE, "w") as f:
        json.dump([asdict(t) for t in tasks], f, indent=2)
