"""agentStop-Hook: Der Agent darf erst fertig melden, wenn die Tests grün sind."""

import json
import subprocess
import sys

event = json.loads(sys.stdin.read() or "{}")
if not event.get("stop_hook_active"):  # schon einmal blockiert: keine Endlosschleife
    result = subprocess.run(["uv", "run", "pytest", "-q"], capture_output=True, text=True)
    if result.returncode != 0:  # grün: keine Ausgabe, der Agent darf beenden
        output = "\n".join((result.stdout + result.stderr).splitlines()[-30:])
        reason = f"pytest schlägt fehl. Behebe die Fehler, bevor du fertig meldest:\n{output}"
        print(
            json.dumps(
                {
                    # Copilot-Harness liest decision/reason auf oberster Ebene
                    "decision": "block",
                    "reason": reason,
                    # lokaler VS-Code-Harness
                    "hookSpecificOutput": {
                        "hookEventName": "Stop",
                        "decision": "block",
                        "reason": reason,
                    },
                }
            )
        )
