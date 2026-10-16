from focuslist.models import Task
from focuslist.storage import read_tasks


def list_tasks(status: str | None = None, priority: str | None = None) -> list[Task]:
    return [
        t
        for t in read_tasks()
        if (status is None or t.done == (status == "done"))
        and (priority is None or t.priority == priority)
    ]
