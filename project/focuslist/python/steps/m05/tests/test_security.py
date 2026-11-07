import pytest

from focuslist import create_app
from focuslist.store import load_tasks


def test_titel_wird_escaped(client):
    client.post("/tasks", data={"title": "<script>alert(1)</script>", "priority": "low"})

    html = client.get("/").get_data(as_text=True)

    assert "<script>alert(1)</script>" not in html
    assert "&lt;script&gt;alert(1)&lt;/script&gt;" in html


@pytest.mark.parametrize("title", ["", "   ", "x" * 101])
def test_ungueltiger_titel_liefert_400(client, app, title):
    response = client.post("/tasks", data={"title": title, "priority": "low"})

    assert response.status_code == 400
    assert "Titel" in response.get_data(as_text=True)
    assert len(load_tasks(app.config["DATA_PATH"])) == 3


@pytest.mark.parametrize("title", ["x", "x" * 100])
def test_titel_an_der_grenze_ist_erlaubt(client, title):
    response = client.post("/tasks", data={"title": title, "priority": "low"})

    assert response.status_code == 302


def test_ungueltige_prioritaet_liefert_400(client, app):
    response = client.post("/tasks", data={"title": "Test", "priority": "dringend"})

    assert response.status_code == 400
    assert "Priorität" in response.get_data(as_text=True)
    assert len(load_tasks(app.config["DATA_PATH"])) == 3


def test_formular_behaelt_eingabe_bei_fehler(client):
    response = client.post("/tasks", data={"title": "x" * 101, "priority": "high"})

    assert 'value="' + "x" * 101 + '"' in response.get_data(as_text=True)


def test_secret_kommt_aus_umgebung(monkeypatch, tmp_path):
    monkeypatch.setenv("FOCUSLIST_SECRET", "aus-der-umgebung")

    app = create_app(tmp_path / "tasks.json")

    assert app.secret_key == "aus-der-umgebung"


def test_ohne_umgebung_kein_festes_secret(monkeypatch, tmp_path):
    monkeypatch.delenv("FOCUSLIST_SECRET", raising=False)

    first = create_app(tmp_path / "tasks.json").secret_key
    second = create_app(tmp_path / "tasks.json").secret_key

    assert first != "dev"
    assert first != second


def test_debug_ist_standardmaessig_aus(monkeypatch, tmp_path):
    monkeypatch.delenv("FLASK_DEBUG", raising=False)

    app = create_app(tmp_path / "tasks.json")

    assert app.debug is False
