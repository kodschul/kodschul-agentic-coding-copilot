import pytest


@pytest.fixture(autouse=True)
def temp_store(tmp_path, monkeypatch):
    """Jeder Test bekommt eine eigene, leere tasks.json im Temp-Ordner."""
    monkeypatch.setenv("FOCUSLIST_FILE", str(tmp_path / "tasks.json"))
