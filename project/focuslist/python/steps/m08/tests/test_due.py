from datetime import date, timedelta

import pytest

from focuslist.store import load_tasks, save_tasks
from focuslist.tasks import is_overdue, sort_tasks

TODAY = date.today()
YESTERDAY = (TODAY - timedelta(days=1)).isoformat()
TOMORROW = (TODAY + timedelta(days=1)).isoformat()


def task(id, due=None, done=False):
    return {"id": id, "title": f"Aufgabe {id}", "priority": "medium", "done": done, "due": due}


# Fachlogik: is_overdue mit festem Datum

@pytest.mark.parametrize("due, done, expected", [
    ("2026-11-11", False, True),    # gestern, offen
    ("2026-11-12", False, False),   # heute: noch nicht überfällig
    ("2026-11-13", False, False),   # morgen
    ("2026-11-11", True, False),    # erledigt
    (None, False, False),           # ohne Datum
])
def test_is_overdue(due, done, expected):
    assert is_overdue(task(1, due, done), date(2026, 11, 12)) is expected


def test_sortierung_offene_nach_faelligkeit_ohne_datum_zuletzt_erledigte_am_ende():
    tasks = [task(1), task(2, "2026-12-01"), task(3, "2026-11-20", done=True), task(4, "2026-11-15")]

    assert [t["id"] for t in sort_tasks(tasks)] == [4, 2, 1, 3]


# Anlegen und Bearbeiten

def test_anlegen_mit_faelligkeit_speichert_datum(client, app):
    client.post("/tasks", data={"title": "Abgabe", "priority": "high", "due": "2026-11-20"})

    assert load_tasks(app.config["DATA_PATH"])[-1]["due"] == "2026-11-20"


def test_anlegen_ohne_faelligkeit_speichert_null(client, app):
    client.post("/tasks", data={"title": "Irgendwann", "priority": "low", "due": ""})

    assert load_tasks(app.config["DATA_PATH"])[-1]["due"] is None


@pytest.mark.parametrize("due", ["morgen", "2026-02-30", "20.11.2026", "2026-1-5"])
def test_anlegen_ungueltige_faelligkeit_liefert_400(client, app, due):
    response = client.post("/tasks", data={"title": "Abgabe", "priority": "high", "due": due})

    assert response.status_code == 400
    assert "Fälligkeitsdatum" in response.get_data(as_text=True)
    assert len(load_tasks(app.config["DATA_PATH"])) == 3


def test_bearbeiten_setzt_und_entfernt_faelligkeit(client, app):
    client.post("/tasks/1/edit", data={"title": "Kursunterlagen lesen", "priority": "high", "due": "2026-11-20"})
    assert load_tasks(app.config["DATA_PATH"])[0]["due"] == "2026-11-20"

    client.post("/tasks/1/edit", data={"title": "Kursunterlagen lesen", "priority": "high", "due": ""})

    assert load_tasks(app.config["DATA_PATH"])[0]["due"] is None


def test_bearbeiten_zeigt_gespeichertes_datum(client):
    client.post("/tasks/1/edit", data={"title": "Kursunterlagen lesen", "priority": "high", "due": "2026-11-20"})

    response = client.get("/tasks/1/edit")

    assert 'value="2026-11-20"' in response.get_data(as_text=True)


# Anzeige in der Liste

def test_liste_zeigt_datum_deutsch(client, app):
    save_tasks(app.config["DATA_PATH"], [task(1, "2026-11-20")])

    html = client.get("/").get_data(as_text=True)

    assert "fällig 20.11.2026" in html


def test_ueberfaellig_badge_fuer_gestern(client, app):
    save_tasks(app.config["DATA_PATH"], [task(1, YESTERDAY)])

    assert "überfällig" in client.get("/").get_data(as_text=True)


@pytest.mark.parametrize("due, done", [(TODAY.isoformat(), False), (TOMORROW, False), (YESTERDAY, True), (None, False)])
def test_kein_ueberfaellig_badge(client, app, due, done):
    save_tasks(app.config["DATA_PATH"], [task(1, due, done)])

    assert "überfällig" not in client.get("/").get_data(as_text=True)


def test_api_sortiert_und_liefert_due(client, app):
    save_tasks(app.config["DATA_PATH"], [task(1), task(2, TOMORROW), task(3, YESTERDAY)])

    tasks = client.get("/api/tasks").get_json()

    assert [t["id"] for t in tasks] == [3, 2, 1]
    assert tasks[0]["due"] == YESTERDAY


def test_alte_aufgaben_ohne_due_feld(client, app):
    save_tasks(app.config["DATA_PATH"], [{"id": 1, "title": "Alt", "priority": "low", "done": False}])

    response = client.get("/api/tasks")

    assert response.get_json()[0]["due"] is None
    assert client.get("/").status_code == 200
