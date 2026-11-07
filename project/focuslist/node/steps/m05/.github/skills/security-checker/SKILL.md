---
name: security-checker
description: Prüft FocusList-Code auf typische Sicherheitslücken von Web-Apps (XSS, Eingabevalidierung, Secrets, Path Traversal, Body-Limits, Abhängigkeiten) und liefert einen Bericht. Einsetzen vor einem Commit oder Merge, nach einem neuen Feature oder auf Anfrage wie „ist das sicher?“. Ändert keinen Code.
argument-hint: "[Datei, Ordner oder Feature; leer = ganzes Projekt]"
---

# Security-Checker

Findet Sicherheitsprobleme und beschreibt sie so, dass jemand anderes sie beheben kann.

**Dieser Skill ändert keine Dateien.** Er liest, sucht und berichtet. Behoben wird danach in einem eigenen Schritt, damit jede Korrektur bewusst entschieden und einzeln geprüft wird.

## Schritte

1. **Umfang klären.** Argument lesen; ohne Argument: `src/`, `server.js`, `package.json`, `.gitignore`.
2. **Datenfluss verfolgen.** Für jede Route in `src/app.js`: Woher kommen Eingaben (Query, Formular, URL-Pfad)? Wo landen sie (JSON-Datei, HTML, Dateisystem)?
3. **Checkliste abarbeiten.** Jeden Punkt aus [checklist.md](./checklist.md) prüfen. Pro Punkt: konkrete Stelle suchen (Datei, Zeile), nicht raten.
4. **Funde belegen.** Für jeden Fund: Datei mit Zeile, kurzer Angriff oder Beispiel-Eingabe, die das Problem zeigt (z. B. `title=<script>alert(1)</script>`).
5. **Schwere einstufen.**
   - **hoch:** ausnutzbar ohne Anmeldung, führt zu Code-Ausführung im Browser, Datenabfluss oder Datenverlust
   - **mittel:** ausnutzbar unter Bedingungen oder führt zu Ausfall (z. B. Speicher voll)
   - **niedrig:** schlechte Praxis ohne direkten Angriff
6. **Bericht ausgeben.** Format unten. Wenn ein Punkt der Checkliste geprüft und in Ordnung ist, in „Geprüft ohne Befund“ aufführen.

## Bericht

```markdown
# Sicherheitsbericht <Projekt/Bereich>, <Datum>

| Befund | Datei | Schwere | Status |
| --- | --- | --- | --- |
| <was, mit Beispiel-Eingabe> | `<datei>:<zeile>` | hoch/mittel/niedrig | offen |

**Geprüft ohne Befund:** <Checklisten-Punkte>

**Empfehlung:** <Reihenfolge der Behebung, höchste Schwere zuerst>
```

Status ist im ersten Bericht immer `offen`; nach der Behebung wird er auf `behoben (<Test>)` gesetzt.

## Grenzen

- Kein Ersatz für einen Penetrationstest; geprüft wird nur, was in der Checkliste steht.
- Keine Pakete installieren, keine Scanner herunterladen, keine Requests an fremde Server.
