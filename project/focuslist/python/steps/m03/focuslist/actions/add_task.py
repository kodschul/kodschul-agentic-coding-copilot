import uuid

from focuslist.models import Task
from focuslist.storage import read_tasks, write_tasks


def add_task(title: str, priority: str = "medium") -> Task:
    tasks = read_tasks()
    task = Task(id=str(uuid.uuid4()), title=title, priority=priority)
    tasks.append(task)
    write_tasks(tasks)
    return task
