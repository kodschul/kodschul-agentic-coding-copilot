import pytest

from focuslist.actions.add_task import add_task
from focuslist.actions.bulk_set_priority import bulk_set_priority
from focuslist.actions.list_tasks import list_tasks


def test_setzt_prioritaet_mehrerer_tasks():
    a, b = add_task("A"), add_task("B")
    bulk_set_priority([a.id, b.id], "high")
    assert [t.priority for t in list_tasks()] == ["high", "high"]


def test_aendert_nichts_wenn_eine_id_unbekannt_ist():
    a = add_task("A")
    with pytest.raises(ValueError, match="existiert nicht"):
        bulk_set_priority([a.id, "unbekannt"], "high")
    assert list_tasks()[0].priority == "medium"


def test_wirft_bei_leerer_id_liste():
    with pytest.raises(ValueError, match="Mindestens eine id"):
        bulk_set_priority([], "high")
