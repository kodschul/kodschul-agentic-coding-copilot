from focuslist.models import Task
from focuslist.storage import read_tasks, write_tasks


def complete_tasks(task_ids: list[str]) -> list[Task]:
    """Alles-oder-nichts: eine unbekannte id bricht ab, bevor etwas gespeichert wird."""
    if not task_ids:
        raise ValueError("Mindestens eine id angeben.")
    tasks = read_tasks()
    by_id = {t.id: t for t in tasks}
    for task_id in task_ids:
        if task_id not in by_id:
            raise ValueError(f'Task mit id "{task_id}" existiert nicht.')
    targets = [by_id[task_id] for task_id in task_ids]
    for task in targets:
        task.done = True
    write_tasks(tasks)
    return targets
