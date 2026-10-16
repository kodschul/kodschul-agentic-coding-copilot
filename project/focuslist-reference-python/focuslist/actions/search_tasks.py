from focuslist.models import Task
from focuslist.storage import read_tasks


def search_tasks(query: str) -> list[Task]:
    needle = query.strip().lower()
    if not needle:
        raise ValueError("Suchbegriff darf nicht leer sein.")
    return [t for t in read_tasks() if needle in t.title.lower()]
