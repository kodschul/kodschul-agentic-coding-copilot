"""agentStop-Hook: führt die Tests aus, wenn der Agent fertig ist.

Bei roten Tests bekommt der Agent eine weitere Runde mit der Testausgabe als Auftrag.
Ist schon eine Hook-Runde aktiv (stop_hook_active), wird nicht erneut blockiert.
Falls node_modules vorhanden ist, wird zusätzlich das CSS gebaut.
"""
import json
import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def python_exe():
    # Projekt-venv bevorzugen, sonst den Python, der den Hook startet
    for venv_python in (ROOT / ".venv/bin/python", ROOT / ".venv/Scripts/python.exe"):
        if venv_python.exists():
            return str(venv_python)
    return sys.executable


def read_event():
    try:
        event = json.loads(sys.stdin.read() or "{}")
        return event if isinstance(event, dict) else {}
    except json.JSONDecodeError:
        return {}


def run(cmd):
    result = subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True,
                            shell=os.name == "nt" and cmd[0] == "npm")
    return result.returncode, (result.stdout + result.stderr).strip()


def main():
    event = read_event()
    if event.get("stop_hook_active"):
        print("{}")
        return

    problems = []
    code, output = run([python_exe(), "-m", "pytest", "-q", "--no-header", "--tb=short", "-p", "no:cacheprovider"])
    if code != 0:
        tail = "\n".join(output.splitlines()[-25:])
        problems.append(f"pytest ist rot:\n{tail}")

    if (ROOT / "node_modules").is_dir():
        code, output = run(["npm", "run", "build:css", "--silent"])
        if code != 0:
            problems.append(f"Tailwind-Build fehlgeschlagen:\n{output[-1500:]}")

    if problems:
        reason = ("Die automatischen Prüfungen sind fehlgeschlagen. Behebe die Ursache im Code "
                  "(Tests nicht löschen oder abschwächen) und führe danach pytest erneut aus.\n\n"
                  + "\n\n".join(problems))
        print(json.dumps({"decision": "block", "reason": reason}, ensure_ascii=False))
    else:
        print("{}")


if __name__ == "__main__":
    main()
