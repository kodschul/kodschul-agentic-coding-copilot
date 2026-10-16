import pytest

from focuslist.actions.add_task import add_task
from focuslist.actions.list_tasks import list_tasks


def test_legt_task_mit_default_prioritaet_an_und_speichert_sie():
    task = add_task("Steuererklärung")
    assert task.priority == "medium"
    assert task.done is False
    assert list_tasks() == [task]


def test_uebernimmt_prioritaet_und_faelligkeitsdatum():
    task = add_task("Arzttermin", "high", "2026-11-03")
    assert (task.priority, task.due_date) == ("high", "2026-11-03")


def test_wirft_bei_leerem_titel():
    with pytest.raises(ValueError, match="darf nicht leer sein"):
        add_task("   ")


def test_wirft_bei_ungueltiger_prioritaet_oder_ungueltigem_datum():
    with pytest.raises(ValueError, match="Ungültige Priorität"):
        add_task("X", "urgent")
    with pytest.raises(ValueError, match="Ungültiges Datum"):
        add_task("X", "low", "3.11.2026")
