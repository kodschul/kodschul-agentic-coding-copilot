"""Fachlogik für Aufgaben. Routen rufen nur diese Funktionen auf."""
from .store import load_tasks, save_tasks

PRIORITIES = ("low", "medium", "high")
STATUSES = ("all", "open", "done")
MAX_TITLE = 100


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


def list_tasks(path, status="all"):
    tasks = load_tasks(path)
    if status == "open":
        return [t for t in tasks if not t["done"]]
    if status == "done":
        return [t for t in tasks if t["done"]]
    return tasks


def next_id(tasks):
    return max((t["id"] for t in tasks), default=0) + 1


def add_task(path, title, priority):
    tasks = load_tasks(path)
    task = {"id": next_id(tasks), "title": title, "priority": priority, "done": False}
    tasks.append(task)
    save_tasks(path, tasks)
    return task


def get_task(path, task_id):
    return next((t for t in load_tasks(path) if t["id"] == task_id), None)


def update_task(path, task_id, title, priority):
    tasks = load_tasks(path)
    for task in tasks:
        if task["id"] == task_id:
            task["title"] = title
            task["priority"] = priority
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
