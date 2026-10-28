import argparse
import sys

from focuslist.actions.add_task import add_task
from focuslist.actions.complete_task import complete_task
from focuslist.actions.list_tasks import list_tasks
from focuslist.actions.set_priority import set_priority
from focuslist.models import Task

USAGE = """Usage: focuslist <command>
  add-task <titel> [low|medium|high]
  list-tasks [--status open|done] [--priority low|medium|high]
  complete-task <id>
  set-priority <id> <low|medium|high>"""


class _Parser(argparse.ArgumentParser):
    """Gibt bei falschem Aufruf dieselbe USAGE wie die JS-CLI aus (Exit-Code 1)."""

    def error(self, message: str) -> None:
        print(USAGE, file=sys.stderr)
        sys.exit(1)


def _print(task: Task) -> None:
    print(f"{task.id}  [{'x' if task.done else ' '}] {task.title} ({task.priority})")


def _parser() -> argparse.ArgumentParser:
    parser = _Parser(prog="focuslist")
    sub = parser.add_subparsers(dest="command", required=True)
    p = sub.add_parser("add-task")
    p.add_argument("title")
    p.add_argument("priority", nargs="?", default="medium")
    p = sub.add_parser("list-tasks")
    p.add_argument("--status", choices=["open", "done"])
    p.add_argument("--priority", choices=["low", "medium", "high"])
    sub.add_parser("complete-task").add_argument("id")
    p = sub.add_parser("set-priority")
    p.add_argument("id")
    p.add_argument("priority")
    return parser


def run(args: argparse.Namespace) -> None:
    if args.command == "add-task":
        _print(add_task(args.title, args.priority))
    elif args.command == "list-tasks":
        for task in list_tasks(status=args.status, priority=args.priority):
            _print(task)
    elif args.command == "complete-task":
        _print(complete_task(args.id))
    elif args.command == "set-priority":
        _print(set_priority(args.id, args.priority))


def main() -> None:
    try:
        run(_parser().parse_args())
    except ValueError as error:
        print(f"Fehler: {error}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
