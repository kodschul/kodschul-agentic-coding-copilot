"""Routen: Eingaben lesen, Service aufrufen, Antwort liefern."""
from flask import Blueprint, abort, current_app, flash, jsonify, redirect, render_template, request, url_for

from . import tasks as service

bp = Blueprint("tasks", __name__)


def data_path():
    return current_app.config["DATA_PATH"]


@bp.get("/")
def index():
    status = request.args.get("status", "all")
    tasks = service.list_tasks(data_path(), status)
    return render_template("index.html", tasks=tasks, status=status)


@bp.post("/tasks")
def create():
    title = request.form.get("title", "")
    priority = request.form.get("priority", "medium")
    service.add_task(data_path(), title, priority)
    return redirect(url_for("tasks.index", created=title))


@bp.post("/tasks/<int:task_id>/complete")
def complete(task_id):
    if not service.complete_task(data_path(), task_id):
        abort(404)
    flash("Aufgabe erledigt.")
    return redirect(url_for("tasks.index"))


@bp.post("/tasks/<int:task_id>/delete")
def delete(task_id):
    if not service.delete_task(data_path(), task_id):
        abort(404)
    flash("Aufgabe gelöscht.")
    return redirect(url_for("tasks.index"))


@bp.get("/api/tasks")
def api_tasks():
    status = request.args.get("status", "all")
    return jsonify(service.list_tasks(data_path(), status))
