from focuslist.actions.add_task import add_task
from focuslist.actions.complete_task import complete_task
from focuslist.actions.list_tasks import list_tasks


def test_liefert_leere_liste_ohne_gespeicherte_tasks():
    assert list_tasks() == []


def test_filtert_nach_status_und_prioritaet():
    a = add_task("A", "high")
    add_task("B", "low")
    complete_task(a.id)
    assert [t.title for t in list_tasks(status="done")] == ["A"]
    assert [t.title for t in list_tasks(status="open")] == ["B"]
    assert [t.title for t in list_tasks(priority="low")] == ["B"]
