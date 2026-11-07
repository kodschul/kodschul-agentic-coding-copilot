"""Routen: Eingaben lesen, Service aufrufen, Antwort liefern."""
from flask import Blueprint, abort, current_app, flash, jsonify, redirect, render_template, request, url_for

from . import tasks as service

bp = Blueprint("tasks", __name__)


def data_path():
    return current_app.config["DATA_PATH"]


def render_index(status="all", errors=None, form=None, code=200):
    tasks = service.list_tasks(data_path(), status)
    html = render_template("index.html", tasks=tasks, status=status, errors=errors or [], form=form or {})
    return html, code


@bp.get("/")
def index():
    status = request.args.get("status", "all")
    if status not in service.STATUSES:
        status = "all"
    return render_index(status)


@bp.post("/tasks")
def create():
    priority = request.form.get("priority", "medium")
    title, errors = service.validate(request.form.get("title"), priority)
    if errors:
        return render_index(errors=errors, form=request.form, code=400)
    service.add_task(data_path(), title, priority)
    flash(f"Aufgabe „{title}“ angelegt.")
    return redirect(url_for("tasks.index"))


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
    if status not in service.STATUSES:
        return jsonify(error="Unbekannter Status. Erlaubt: all, open, done."), 400
    return jsonify(service.list_tasks(data_path(), status))
