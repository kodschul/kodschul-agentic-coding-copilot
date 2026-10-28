import sys

from focuslist.actions.add_task import add_task
from focuslist.actions.complete_task import complete_task
from focuslist.actions.list_tasks import list_tasks


def main():
    command = sys.argv[1] if len(sys.argv) > 1 else None
    args = sys.argv[2:]

    if command == "add-task":
        task = add_task(args[0], args[1] if len(args) > 1 else "medium")
        print("Aufgabe angelegt:", task)
    elif command == "list-tasks":
        for t in list_tasks():
            print(f"{'[x]' if t.done else '[ ]'} {t.id} {t.title} ({t.priority})")
    elif command == "complete-task":
        if complete_task(args[0]):
            print("Erledigt.")
        else:
            print("Task not found")
    else:
        print("Unbekannter Befehl")


if __name__ == "__main__":
    main()
