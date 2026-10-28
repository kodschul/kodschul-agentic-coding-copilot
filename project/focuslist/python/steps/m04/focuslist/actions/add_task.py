import uuid

from focuslist.actions.validation import assert_priority
from focuslist.models import Task
from focuslist.storage import read_tasks, write_tasks


def add_task(title: str, priority: str = "medium") -> Task:
    if not title.strip():
        raise ValueError("Task-Titel darf nicht leer sein.")
    assert_priority(priority)
    tasks = read_tasks()
    task = Task(id=uuid.uuid4().hex[:8], title=title.strip(), priority=priority)
    tasks.append(task)
    write_tasks(tasks)
    return task
