"""Fachlogik für Aufgaben. Routen rufen nur diese Funktionen auf."""
from .store import load_tasks, save_tasks


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
