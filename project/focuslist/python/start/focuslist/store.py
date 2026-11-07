"""Speichert Aufgaben als JSON-Datei."""
import json
from pathlib import Path


def load_tasks(path):
    path = Path(path)
    if not path.exists():
        return []
    return json.loads(path.read_text(encoding="utf-8"))


def save_tasks(path, tasks):
    text = json.dumps(tasks, ensure_ascii=False, indent=2)
    Path(path).write_text(text + "\n", encoding="utf-8")
