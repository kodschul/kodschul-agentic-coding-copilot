"""FocusList – Flask-App für persönliche Aufgaben."""
import os
import secrets
from pathlib import Path

from flask import Flask

# Projektordner (eine Ebene über dem Paket)
ROOT = Path(__file__).resolve().parent.parent


def create_app(data_path=None):
    app = Flask(__name__, static_folder=str(ROOT / "static"))
    app.config["DATA_PATH"] = Path(data_path) if data_path else ROOT / "data" / "tasks.json"
    # Secret aus der Umgebung (.env); ohne Variable ein zufälliger Schlüssel pro Start
    app.secret_key = os.environ.get("FOCUSLIST_SECRET") or secrets.token_hex(32)

    from .routes import bp

    app.register_blueprint(bp)
    return app
