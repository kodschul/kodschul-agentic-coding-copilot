---
description: Vereinfacht eine FocusList-Aktion, ohne ihr Verhalten zu ändern
agent: agent
tools: ['read', 'search', 'edit', 'execute']
argument-hint: Aktion, z. B. complete-task
---

Refaktoriere die Aktion `${input:aktion:Name der Aktion, z. B. complete-task}`, ohne ihr Verhalten zu ändern.

1. Führe `npm test` aus. Ist ein Test rot, brich ab und melde das.
2. Lies `src/actions/${input:aktion}.ts`, die übrigen Dateien in `src/actions/` und [copilot-instructions.md](../copilot-instructions.md).
3. Liste vor jeder Änderung auf: doppelter Code (auch in anderen Aktionen), Verstöße gegen die Projektregeln, unklare Namen. Ein Satz pro Punkt.
4. Setze nur diese Punkte um. Exportierte Signaturen, Fehlermeldungen und Tests bleiben unverändert; keine neuen Abhängigkeiten.
5. Führe `npm run lint` und `npm test` aus und nenne jede geänderte Datei.
