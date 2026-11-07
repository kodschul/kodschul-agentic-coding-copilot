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


def add_task(path, title, priority):
    tasks = load_tasks(path)
    task = {"id": len(tasks) + 1, "title": title, "priority": priority, "done": False}
    tasks.append(task)
    save_tasks(path, tasks)
    return task
