from focuslist.actions.sort_by_due_date import sort_by_due_date
from focuslist.models import Task


def task(task_id: str, due_date: str | None = None) -> Task:
    return Task(id=task_id, title=task_id, due_date=due_date)


def test_sortiert_aufsteigend_tasks_ohne_datum_ans_ende():
    tasks = [task("spaet", "2026-12-01"), task("ohne"), task("frueh", "2026-11-01")]
    result = sort_by_due_date(tasks)
    assert [t.id for t in result] == ["frueh", "spaet", "ohne"]


def test_veraendert_die_uebergebene_liste_nicht():
    tasks = [task("b", "2026-12-01"), task("a", "2026-11-01")]
    sort_by_due_date(tasks)
    assert [t.id for t in tasks] == ["b", "a"]
