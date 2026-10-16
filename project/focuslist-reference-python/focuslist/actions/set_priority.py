from focuslist.actions.validation import assert_priority
from focuslist.models import Task
from focuslist.storage import read_tasks, write_tasks


def set_priority(task_id: str, priority: str) -> Task:
    assert_priority(priority)
    tasks = read_tasks()
    task = next((t for t in tasks if t.id == task_id), None)
    if task is None:
        raise ValueError(f'Task mit id "{task_id}" existiert nicht.')
    task.priority = priority
    write_tasks(tasks)
    return task
