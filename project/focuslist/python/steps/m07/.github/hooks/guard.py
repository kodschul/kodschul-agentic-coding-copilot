"""preToolUse-Hook: blockiert Zugriffe auf .env-Dateien und rekursives Löschen.

Liest das Ereignis als JSON von stdin und schreibt die Entscheidung als JSON nach stdout.
Erlaubt bleibt .env.example (Vorlage ohne echte Werte).
Bewusst einfach: geprüft wird der ganze Text von toolName und toolArgs, also auch
Dateiinhalte. Ein Edit, der nur über ".env" schreibt, wird ebenfalls blockiert.
"""
import json
import re
import sys

# .env, .env.local, config/.env … – aber nicht os.environ oder process.env
ENV_FILE = re.compile(r"(?<![\w])\.env(?:\.[\w-]+)*(?![\w-])")
ALLOWED_ENV = {".env.example"}
# rm -rf, rm -fr, rm -Rf, rm -r -f, Remove-Item -Recurse
RM_RF = re.compile(r"\brm\s+(?:-[a-zA-Z]*[rR][a-zA-Z]*f|-[a-zA-Z]*f[a-zA-Z]*[rR]|-[rR]\s+-f|-f\s+-[rR])\b"
                   r"|Remove-Item\b[^\n]*-Recurse", re.IGNORECASE)


def read_event():
    raw = sys.stdin.read()
    try:
        event = json.loads(raw)
        return event if isinstance(event, dict) else {"raw": raw}
    except json.JSONDecodeError:
        # Unbekanntes Format: trotzdem den Rohtext prüfen
        return {"raw": raw}


def check(event):
    tool = str(event.get("toolName", ""))
    args = event.get("toolArgs", event.get("raw", ""))
    text = tool + " " + (args if isinstance(args, str) else json.dumps(args, ensure_ascii=False))

    env_hits = [m for m in ENV_FILE.findall(text) if m not in ALLOWED_ENV]
    if env_hits:
        return f"Zugriff auf {env_hits[0]} ist gesperrt (Secrets). Für Beispielwerte .env.example verwenden."
    if RM_RF.search(text):
        return "Rekursives Löschen (rm -rf) ist gesperrt. Einzelne Dateien gezielt löschen oder nachfragen."
    return None


def main():
    reason = check(read_event())
    if reason:
        print(json.dumps({"permissionDecision": "deny", "permissionDecisionReason": reason}, ensure_ascii=False))
    else:
        print("{}")


if __name__ == "__main__":
    main()
