# Vorlage für eine Aktion, die eine bestehende Task ändert.
from focuslist.models import Task
from focuslist.storage import read_tasks, write_tasks


def do_something(task_id: str) -> Task:
    # 1. Eingaben prüfen (validation.py nutzen), bei Fehler: raise ValueError("...")
    tasks = read_tasks()
    task = next((t for t in tasks if t.id == task_id), None)
    if task is None:
        raise ValueError(f'Task mit id "{task_id}" existiert nicht.')
    # 2. Task ändern
    write_tasks(tasks)
    return task
