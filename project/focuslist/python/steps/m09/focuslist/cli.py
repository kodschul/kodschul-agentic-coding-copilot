import argparse
import sys

from focuslist.actions.add_task import add_task
from focuslist.actions.bulk_set_priority import bulk_set_priority
from focuslist.actions.complete_task import complete_task
from focuslist.actions.complete_tasks import complete_tasks
from focuslist.actions.list_tasks import list_tasks
from focuslist.actions.search_tasks import search_tasks
from focuslist.actions.set_priority import set_priority
from focuslist.actions.sort_by_due_date import sort_by_due_date
from focuslist.models import Task

USAGE = """Usage: focuslist <command>
  add-task <titel> [low|medium|high] [JJJJ-MM-TT]
  list-tasks [--status open|done] [--priority low|medium|high] [--sort due-date]
  complete-task <id>
  complete-tasks <id> [<id> ...]
  set-priority <id> <low|medium|high>
  bulk-set-priority <low|medium|high> <id> [<id> ...]
  search-tasks <begriff>"""


class _Parser(argparse.ArgumentParser):
    """Gibt bei falschem Aufruf dieselbe USAGE wie die JS-CLI aus (Exit-Code 1)."""

    def error(self, message: str) -> None:
        print(USAGE, file=sys.stderr)
        sys.exit(1)


def _print(task: Task) -> None:
    due = f" fällig {task.due_date}" if task.due_date else ""
    print(f"{task.id}  [{'x' if task.done else ' '}] {task.title} ({task.priority}){due}")


def _parser() -> argparse.ArgumentParser:
    parser = _Parser(prog="focuslist")
    sub = parser.add_subparsers(dest="command", required=True)
    p = sub.add_parser("add-task")
    p.add_argument("title")
    p.add_argument("priority", nargs="?", default="medium")
    p.add_argument("due_date", nargs="?")
    p = sub.add_parser("list-tasks")
    p.add_argument("--status", choices=["open", "done"])
    p.add_argument("--priority", choices=["low", "medium", "high"])
    p.add_argument("--sort", choices=["due-date"])
    sub.add_parser("complete-task").add_argument("id")
    sub.add_parser("complete-tasks").add_argument("ids", nargs="*")
    p = sub.add_parser("set-priority")
    p.add_argument("id")
    p.add_argument("priority")
    p = sub.add_parser("bulk-set-priority")
    p.add_argument("priority", nargs="?", default="")
    p.add_argument("ids", nargs="*")
    sub.add_parser("search-tasks").add_argument("query", nargs="*")
    return parser


def run(args: argparse.Namespace) -> None:
    if args.command == "add-task":
        _print(add_task(args.title, args.priority, args.due_date))
    elif args.command == "list-tasks":
        tasks = list_tasks(status=args.status, priority=args.priority)
        for task in sort_by_due_date(tasks) if args.sort == "due-date" else tasks:
            _print(task)
    elif args.command == "complete-task":
        _print(complete_task(args.id))
    elif args.command == "complete-tasks":
        for task in complete_tasks(args.ids):
            _print(task)
    elif args.command == "set-priority":
        _print(set_priority(args.id, args.priority))
    elif args.command == "bulk-set-priority":
        for task in bulk_set_priority(args.ids, args.priority):
            _print(task)
    elif args.command == "search-tasks":
        for task in search_tasks(" ".join(args.query)):
            _print(task)


def main() -> None:
    try:
        run(_parser().parse_args())
    except ValueError as error:
        print(f"Fehler: {error}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
