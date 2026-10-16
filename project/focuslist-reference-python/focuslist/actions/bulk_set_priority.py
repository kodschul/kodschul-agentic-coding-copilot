from focuslist.actions.validation import assert_priority
from focuslist.models import Task
from focuslist.storage import read_tasks, write_tasks


def bulk_set_priority(task_ids: list[str], priority: str) -> list[Task]:
    """Alles-oder-nichts: eine unbekannte id bricht ab, bevor etwas gespeichert wird."""
    assert_priority(priority)
    if not task_ids:
        raise ValueError("Mindestens eine id angeben.")
    tasks = read_tasks()
    by_id = {t.id: t for t in tasks}
    for task_id in task_ids:
        if task_id not in by_id:
            raise ValueError(f'Task mit id "{task_id}" existiert nicht.')
    targets = [by_id[task_id] for task_id in task_ids]
    for task in targets:
        task.priority = priority
    write_tasks(tasks)
    return targets
