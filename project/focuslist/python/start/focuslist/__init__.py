"""FocusList – Flask-App für persönliche Aufgaben."""
from pathlib import Path

from flask import Flask, render_template

from .store import load_tasks

# Projektordner (eine Ebene über dem Paket)
ROOT = Path(__file__).resolve().parent.parent


def create_app(data_path=None):
    app = Flask(__name__, static_folder=str(ROOT / "static"))
    app.config["DATA_PATH"] = Path(data_path) if data_path else ROOT / "data" / "tasks.json"

    @app.get("/")
    def index():
        tasks = load_tasks(app.config["DATA_PATH"])
        return render_template("index.html", tasks=tasks)

    return app
