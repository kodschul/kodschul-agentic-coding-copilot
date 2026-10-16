from focuslist.models import Task


def sort_by_due_date(tasks: list[Task]) -> list[Task]:
    """Reine Funktion: sortiert nur die Ausgabe, gespeicherte Daten bleiben unverändert."""
    with_date = sorted((t for t in tasks if t.due_date), key=lambda t: t.due_date)
    without_date = [t for t in tasks if not t.due_date]
    return with_date + without_date
