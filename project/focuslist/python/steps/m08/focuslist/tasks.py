"""Fachlogik für Aufgaben. Routen rufen nur diese Funktionen auf."""
import re
from datetime import date

from .store import load_tasks, save_tasks

PRIORITIES = ("low", "medium", "high")
STATUSES = ("all", "open", "done")
MAX_TITLE = 100
ISO_DATE = re.compile(r"^\d{4}-\d{2}-\d{2}$")


def validate(title, priority):
    """Gibt den bereinigten Titel und eine Liste deutscher Fehlermeldungen zurück."""
    title = (title or "").strip()
    errors = []
    if not title:
        errors.append("Der Titel darf nicht leer sein.")
    elif len(title) > MAX_TITLE:
        errors.append(f"Der Titel darf höchstens {MAX_TITLE} Zeichen lang sein.")
    if priority not in PRIORITIES:
        errors.append("Die Priorität muss niedrig, mittel oder hoch sein.")
    return title, errors


def validate_due(value):
    """Leer → None; sonst muss es ein gültiges Datum JJJJ-MM-TT sein."""
    value = (value or "").strip()
    if not value:
        return None, []
    try:
        if not ISO_DATE.match(value):
            raise ValueError
        date.fromisoformat(value)
    except ValueError:
        return None, ["Das Fälligkeitsdatum muss ein gültiges Datum sein (JJJJ-MM-TT)."]
    return value, []


def is_overdue(task, today):
    """Überfällig = offen und Fälligkeit vor heute. Heute fällig ist nicht überfällig."""
    due = task.get("due")
    return bool(due) and not task["done"] and due < today.isoformat()


def sort_tasks(tasks):
    """Offene zuerst, nach Fälligkeit (ohne Datum zuletzt); danach erledigte."""
    open_tasks = sorted((t for t in tasks if not t["done"]),
                        key=lambda t: (t.get("due") is None, t.get("due") or ""))
    return open_tasks + [t for t in tasks if t["done"]]


def list_tasks(path, status="all"):
    tasks = sort_tasks(load_tasks(path))
    for task in tasks:
        task.setdefault("due", None)
    if status == "open":
        return [t for t in tasks if not t["done"]]
    if status == "done":
        return [t for t in tasks if t["done"]]
    return tasks


def next_id(tasks):
    return max((t["id"] for t in tasks), default=0) + 1


def add_task(path, title, priority, due=None):
    tasks = load_tasks(path)
    task = {"id": next_id(tasks), "title": title, "priority": priority, "done": False, "due": due}
    tasks.append(task)
    save_tasks(path, tasks)
    return task


def get_task(path, task_id):
    return next((t for t in load_tasks(path) if t["id"] == task_id), None)


def update_task(path, task_id, title, priority, due=None):
    tasks = load_tasks(path)
    for task in tasks:
        if task["id"] == task_id:
            task["title"] = title
            task["priority"] = priority
            task["due"] = due
            save_tasks(path, tasks)
            return task
    return None


def complete_task(path, task_id):
    tasks = load_tasks(path)
    for task in tasks:
        if task["id"] == task_id:
            task["done"] = True
            save_tasks(path, tasks)
            return True
    return False


def delete_task(path, task_id):
    tasks = load_tasks(path)
    remaining = [t for t in tasks if t["id"] != task_id]
    if len(remaining) == len(tasks):
        return False
    save_tasks(path, remaining)
    return True
