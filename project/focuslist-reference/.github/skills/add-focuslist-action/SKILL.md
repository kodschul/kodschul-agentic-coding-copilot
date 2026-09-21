---
name: add-focuslist-action
description: Fügt FocusList eine neue Aktion hinzu (Datenmodell → Logik → CLI → Test).
---

# Neue FocusList-Aktion hinzufügen

1. Prüfe, ob das `Task`-Datenmodell erweitert werden muss.
2. Implementiere die Aktion in `src/actions/`, folge `copilot-instructions.md`
   (wirft `Error` bei ungültiger Eingabe, nutzt ausschließlich
   `readTasks`/`writeTasks`).
3. Verdrahte die Aktion als neuen CLI-Unterbefehl in `src/cli.ts`.
4. Ergänze einen Test, der sowohl den Erfolgsfall als auch den Fehlerfall
   (ungültige `id`) abdeckt.
