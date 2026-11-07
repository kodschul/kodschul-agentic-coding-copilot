"""Routen: Eingaben lesen, Service aufrufen, Antwort liefern."""
from datetime import date

from flask import Blueprint, abort, current_app, flash, jsonify, redirect, render_template, request, url_for

from . import tasks as service

bp = Blueprint("tasks", __name__)


def data_path():
    return current_app.config["DATA_PATH"]


@bp.app_template_filter("de_date")
def de_date(iso):
    # 2026-11-12 → 12.11.2026
    return date.fromisoformat(iso).strftime("%d.%m.%Y")


def read_form():
    """Liest und prüft das Aufgabenformular. Gibt (Werte, Fehler) zurück."""
    priority = request.form.get("priority", "medium")
    title, errors = service.validate(request.form.get("title"), priority)
    due, due_errors = service.validate_due(request.form.get("due"))
    return {"title": title, "priority": priority, "due": due}, errors + due_errors


def render_index(status="all", errors=None, form=None, code=200):
    tasks = service.list_tasks(data_path(), status)
    html = render_template(
        "index.html", tasks=tasks, status=status, errors=errors or [], form=form or {},
        is_overdue=service.is_overdue, today=date.today(),
    )
    return html, code


@bp.get("/")
def index():
    status = request.args.get("status", "all")
    if status not in service.STATUSES:
        status = "all"
    return render_index(status)


@bp.post("/tasks")
def create():
    values, errors = read_form()
    if errors:
        return render_index(errors=errors, form=request.form, code=400)
    service.add_task(data_path(), values["title"], values["priority"], values["due"])
    flash(f"Aufgabe „{values['title']}“ angelegt.")
    return redirect(url_for("tasks.index"))


@bp.route("/tasks/<int:task_id>/edit", methods=["GET", "POST"])
def edit(task_id):
    task = service.get_task(data_path(), task_id)
    if task is None:
        abort(404)
    if request.method == "GET":
        return render_template("edit.html", task=task, errors=[], form=task)

    values, errors = read_form()
    if errors:
        return render_template("edit.html", task=task, errors=errors, form=request.form), 400
    service.update_task(data_path(), task_id, values["title"], values["priority"], values["due"])
    flash(f"Aufgabe „{values['title']}“ gespeichert.")
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
