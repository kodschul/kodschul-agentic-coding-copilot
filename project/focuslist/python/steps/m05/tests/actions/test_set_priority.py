import pytest

from focuslist.actions.add_task import add_task
from focuslist.actions.set_priority import set_priority


def test_aendert_prioritaet_einer_bestehenden_task():
    task = add_task("Prioritäts-Test")
    assert set_priority(task.id, "high").priority == "high"


def test_wirft_bei_unbekannter_id_oder_ungueltiger_prioritaet():
    task = add_task("X")
    with pytest.raises(ValueError, match="existiert nicht"):
        set_priority("unbekannt", "high")
    with pytest.raises(ValueError, match="Ungültige Priorität"):
        set_priority(task.id, "urgent")
