import pytest

from focuslist.actions.add_task import add_task
from focuslist.actions.complete_tasks import complete_tasks
from focuslist.actions.list_tasks import list_tasks


def test_markiert_mehrere_tasks_als_erledigt():
    a, b = add_task("A"), add_task("B")
    complete_tasks([a.id, b.id])
    assert len(list_tasks(status="done")) == 2


def test_aendert_nichts_wenn_eine_id_unbekannt_ist():
    a = add_task("A")
    with pytest.raises(ValueError, match="existiert nicht"):
        complete_tasks([a.id, "unbekannt"])
    assert list_tasks(status="done") == []


def test_wirft_bei_leerer_id_liste():
    with pytest.raises(ValueError, match="Mindestens eine id"):
        complete_tasks([])
