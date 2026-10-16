import json
import os
from pathlib import Path

from focuslist.models import Task


def _data_file() -> Path:
    # FOCUSLIST_FILE erlaubt Tests eine eigene, temporäre Datei.
    return Path(os.environ.get("FOCUSLIST_FILE", "tasks.json"))


def read_tasks() -> list[Task]:
    path = _data_file()
    if not path.exists():
        return []
    return [Task(**item) for item in json.loads(path.read_text(encoding="utf-8"))]


def write_tasks(tasks: list[Task]) -> None:
    data = [task.to_dict() for task in tasks]
    _data_file().write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
