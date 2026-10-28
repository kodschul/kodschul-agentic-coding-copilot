import pytest

from focuslist.actions.add_task import add_task
from focuslist.actions.list_tasks import list_tasks
from focuslist.actions.search_tasks import search_tasks


def test_findet_tasks_unabhaengig_von_gross_kleinschreibung():
    add_task("Steuererklärung abgeben")
    add_task("Einkaufen")
    assert [t.title for t in search_tasks("STEUER")] == ["Steuererklärung abgeben"]


def test_leere_liste_ohne_treffer_und_fehler_bei_leerem_begriff():
    add_task("Einkaufen")
    assert search_tasks("Urlaub") == []
    with pytest.raises(ValueError, match="darf nicht leer sein"):
        search_tasks("  ")


def test_aendert_gespeicherte_tasks_beim_suchen_nicht():
    add_task("Steuererklärung abgeben")
    vorher = list_tasks()
    search_tasks("steuer")
    assert list_tasks() == vorher
