import pytest

from focuslist.store import load_tasks


def test_bearbeiten_zeigt_formular_mit_werten(client):
    response = client.get("/tasks/2/edit")

    html = response.get_data(as_text=True)
    assert response.status_code == 200
    assert 'value="Tailwind ausprobieren"' in html
    assert '<option value="medium" selected>' in html


def test_bearbeiten_speichert_aenderung(client, app):
    response = client.post("/tasks/2/edit", data={"title": "Tailwind v4 lernen", "priority": "high"})

    assert response.status_code == 302
    task = load_tasks(app.config["DATA_PATH"])[1]
    assert task == {"id": 2, "title": "Tailwind v4 lernen", "priority": "high", "done": False}


def test_bearbeiten_zeigt_hinweis_und_neuen_titel(client):
    response = client.post("/tasks/2/edit", data={"title": "Tailwind v4 lernen", "priority": "high"}, follow_redirects=True)

    html = response.get_data(as_text=True)
    assert "Aufgabe „Tailwind v4 lernen“ gespeichert." in html
    assert "Tailwind ausprobieren" not in html


def test_bearbeiten_behaelt_status_erledigt(client, app):
    client.post("/tasks/3/edit", data={"title": "Agent-Modus getestet", "priority": "low"})

    assert load_tasks(app.config["DATA_PATH"])[2]["done"] is True


def test_bearbeiten_titel_mit_100_zeichen(client):
    response = client.post("/tasks/1/edit", data={"title": "x" * 100, "priority": "low"})

    assert response.status_code == 302


@pytest.mark.parametrize("data", [
    {"title": "", "priority": "low"},
    {"title": "x" * 101, "priority": "low"},
    {"title": "Gültig", "priority": "dringend"},
])
def test_bearbeiten_ungueltig_liefert_400_und_speichert_nicht(client, app, data):
    response = client.post("/tasks/1/edit", data=data)

    assert response.status_code == 400
    assert load_tasks(app.config["DATA_PATH"])[0]["title"] == "Kursunterlagen lesen"


def test_bearbeiten_titel_wird_escaped(client):
    client.post("/tasks/1/edit", data={"title": "<b>fett</b>", "priority": "low"})

    response = client.get("/tasks/1/edit")

    assert "&lt;b&gt;fett&lt;/b&gt;" in response.get_data(as_text=True)


@pytest.mark.parametrize("method", ["get", "post"])
def test_bearbeiten_unbekannte_id_liefert_404(client, method):
    response = getattr(client, method)("/tasks/999/edit")

    assert response.status_code == 404
