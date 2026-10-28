---
name: focuslist-code-review
description: Prüft eine FocusList-Datei gegen die Projektregeln in AGENTS.md und antwortet als Tabelle, ohne Dateien zu ändern. Nur explizit aufrufen mit $focuslist-code-review <datei>.
---

# Code-Review gegen die Projektregeln

Prüfe die beim Aufruf genannte Datei (z. B. `src/actions/set-priority.ts`) gegen jede Regel in `AGENTS.md` im Projektordner. Ist keine Datei genannt, frage nach dem Pfad.

Antworte als Tabelle mit den Spalten **Regel**, **Ergebnis** (eingehalten / verletzt / nicht relevant) und **Fundstelle** (Zeilennummer). Schlage für jede Verletzung eine konkrete Änderung vor. Ändere selbst keine Datei.
