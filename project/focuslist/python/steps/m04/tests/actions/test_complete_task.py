import pytest

from focuslist.actions.add_task import add_task
from focuslist.actions.complete_task import complete_task


def test_markiert_bestehende_task_als_erledigt():
    task = add_task("Wird erledigt")
    assert complete_task(task.id).done is True


def test_wirft_bei_unbekannter_id():
    with pytest.raises(ValueError, match="existiert nicht"):
        complete_task("unbekannt")
