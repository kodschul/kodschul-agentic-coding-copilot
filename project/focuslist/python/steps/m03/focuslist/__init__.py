"""FocusList – Flask-App für persönliche Aufgaben."""
from pathlib import Path

from flask import Flask, flash, jsonify, redirect, render_template, request, url_for

from .store import add_task, load_tasks, save_tasks

# Projektordner (eine Ebene über dem Paket)
ROOT = Path(__file__).resolve().parent.parent

PRIORITY_COLORS = {
    "high": "bg-red-100 text-red-700",
    "medium": "bg-yellow-100 text-yellow-800",
    "low": "bg-slate-200 text-slate-700",
}


def create_app(data_path=None):
    app = Flask(__name__, static_folder=str(ROOT / "static"))
    app.config["DATA_PATH"] = Path(data_path) if data_path else ROOT / "data" / "tasks.json"
    app.secret_key = "dev"

    @app.get("/")
    def index():
        tasks = load_tasks(app.config["DATA_PATH"])
        status = request.args.get("status", "all")
        if status == "open":
            tasks = [t for t in tasks if t["done"] == False]
        elif status == "done":
            tasks = [t for t in tasks if t["done"] == True]
        return render_template(
            "index.html", tasks=tasks, status=status, colors=PRIORITY_COLORS
        )

    @app.post("/tasks")
    def create_task():
        title = request.form.get("title")
        priority = request.form.get("priority", "medium")
        add_task(app.config["DATA_PATH"], title, priority)
        return redirect(url_for("index", created=title))

    @app.post("/tasks/<int:task_id>/complete")
    def complete_task(task_id):
        tasks = load_tasks(app.config["DATA_PATH"])
        for task in tasks:
            if task["id"] == task_id:
                task["done"] = True
        save_tasks(app.config["DATA_PATH"], tasks)
        flash("Aufgabe erledigt!")
        return redirect("/")

    @app.route("/api/tasks")
    def api_tasks():
        tasks = load_tasks(app.config["DATA_PATH"])
        if request.args.get("status"):
            want_done = request.args["status"] == "done"
            tasks = [t for t in tasks if t["done"] is want_done]
        return jsonify(tasks)

    return app
