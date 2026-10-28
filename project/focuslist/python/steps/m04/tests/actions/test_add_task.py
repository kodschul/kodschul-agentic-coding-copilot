import pytest

from focuslist.actions.add_task import add_task
from focuslist.actions.list_tasks import list_tasks


def test_legt_task_mit_default_prioritaet_an_und_speichert_sie():
    task = add_task("Steuererklärung")
    assert task.priority == "medium"
    assert task.done is False
    assert list_tasks() == [task]


def test_uebernimmt_die_angegebene_prioritaet():
    assert add_task("Arzttermin", "high").priority == "high"


def test_wirft_bei_leerem_titel():
    with pytest.raises(ValueError, match="darf nicht leer sein"):
        add_task("   ")


def test_wirft_bei_ungueltiger_prioritaet():
    with pytest.raises(ValueError, match="Ungültige Priorität"):
        add_task("X", "urgent")
