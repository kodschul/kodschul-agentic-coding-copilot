import uuid

from focuslist.actions.validation import assert_iso_date, assert_priority
from focuslist.models import Task
from focuslist.storage import read_tasks, write_tasks


def add_task(title: str, priority: str = "medium", due_date: str | None = None) -> Task:
    if not title.strip():
        raise ValueError("Task-Titel darf nicht leer sein.")
    assert_priority(priority)
    if due_date is not None:
        assert_iso_date(due_date)
    tasks = read_tasks()
    task = Task(id=uuid.uuid4().hex[:8], title=title.strip(), priority=priority, due_date=due_date)
    tasks.append(task)
    write_tasks(tasks)
    return task
