from focuslist.models import Task
from focuslist.storage import read_tasks, write_tasks


def complete_task(task_id: str) -> Task:
    tasks = read_tasks()
    task = next((t for t in tasks if t.id == task_id), None)
    if task is None:
        raise ValueError(f'Task mit id "{task_id}" existiert nicht.')
    task.done = True
    write_tasks(tasks)
    return task
