import shutil
from pathlib import Path

import pytest

from focuslist import create_app

SEED = Path(__file__).resolve().parent.parent / "data" / "tasks.json"


@pytest.fixture
def app(tmp_path):
    # Jeder Test bekommt eine eigene Kopie der Beispieldaten
    data_path = tmp_path / "tasks.json"
    shutil.copy(SEED, data_path)
    app = create_app(data_path)
    app.config["TESTING"] = True
    return app


@pytest.fixture
def client(app):
    return app.test_client()
