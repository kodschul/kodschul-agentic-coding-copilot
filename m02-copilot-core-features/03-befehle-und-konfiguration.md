# Befehle und Konfiguration

Slash-Befehle (`/` im Chat-Eingabefeld) sind vordefinierte Aufträge, die mit der Markierung oder der aktiven Datei arbeiten. Die Basiskonfiguration in den VS-Code-Einstellungen steuert, wo und wie Copilot aktiv ist.

## Leitfragen

<details>
<summary>Wann lohnt sich ein fester Befehl gegenüber einer frei formulierten Chat-Frage?</summary>

Bei wiederkehrenden Aufgaben an markiertem Code (erklären, korrigieren, testen): Der Befehl bringt Auftrag und Kontext in einer festen Form mit, die Frage muss das jedes Mal neu formulieren.

</details>

<details>
<summary>Ersetzt ein automatischer Korrekturvorschlag den manuellen Review?</summary>

Nein. Ein Vorschlag ist eine mögliche Korrektur, die vor der Übernahme an konkreten Eingaben geprüft werden muss.

</details>

<details>
<summary>Wo wird festgelegt, in welchen Dateitypen Copilot Vorschläge macht?</summary>

In den VS-Code-Einstellungen: als Benutzereinstellung für alle Projekte oder als Workspace-Einstellung in `.vscode/settings.json` für ein Projekt.

</details>

## Die drei Kernbefehle

| Befehl | Liefert | Liefert nicht |
| --- | --- | --- |
| `/explain` | Erklärung des markierten Codes in Prosa | keinen Änderungsvorschlag, keine verlässliche Fehlersuche |
| `/fix` | Korrekturvorschlag für einen Fehler oder eine Warnung | sichere Erkennung reiner Logikfehler ohne Hinweis im Auftrag |
| `/tests` | Testdatei bzw. Testfälle für den markierten Code | automatisch alle Grenzfälle |

- Ein Zusatz nach dem Befehl schärft den Auftrag: `/fix Seite 1 von [1..10] mit Größe 3 liefert nur [1, 2]`, `/tests inklusive leerer Liste und letzter Seite`.
- `/` im Eingabefeld zeigt alle in der installierten Version verfügbaren Befehle; weitere (z. B. `/plan`, `/clear`, `/compact`) stehen im [M2-Cheatsheet](m02-cheatsheet.md).

## Beispiel: ein Off-by-one-Fehler

[`snippet-4-loop.ts`](../project/snippets/snippet-4-loop.ts) (Python: [`snippet-4-loop.py`](../project/snippets/snippet-4-loop.py)):

```ts
// Prompt: "Gib die Einträge einer Seite zurück. Seiten beginnen bei 1, pageSize Einträge pro Seite."
export function getPage<T>(items: T[], page: number, pageSize: number): T[] {
  const result: T[] = [];
  const start = (page - 1) * pageSize;
  for (let i = start; i < start + pageSize - 1 && i < items.length; i++) {
    result.push(items[i]);
  }
  return result;
}
```

| Schritt | Ergebnis |
| --- | --- |
| `/explain` auf der Funktion | beschreibt die Schleife korrekt, nennt `- 1` aber oft nicht als Fehler |
| konkrete Eingabe `getPage([1..10], 1, 3)` | `[1, 2]` statt `[1, 2, 3]`, der Fehler wird sichtbar |
| `/fix` mit dieser Eingabe als Zusatz | Grenze `start + pageSize` bzw. `items.slice(start, start + pageSize)` |
| `/tests` mit Zusatz "Grenzfälle" | Fälle für volle Seite, letzte unvollständige Seite, leere Liste |

Die letzte, unvollständige Seite (`page 4` → `[10]`) ist zufällig korrekt, weil dort `items.length` die Grenze bildet. Ein Test nur für die letzte Seite hätte den Fehler nicht gefunden.

## Basiskonfiguration

| Ebene | Ort | Gilt für |
| --- | --- | --- |
| Benutzer | **Einstellungen** (Cmd+, / Ctrl+,), Reiter **Benutzer** | alle Projekte auf diesem Rechner |
| Workspace | Reiter **Arbeitsbereich** bzw. Datei `.vscode/settings.json` im Projekt | nur dieses Projekt, mit dem Repo teilbar |

Eine Workspace-Einstellung in der Einstellungsoberfläche legt `.vscode/settings.json` automatisch an, falls die Datei noch fehlt.

```jsonc
// .vscode/settings.json
{
  // Inline-Vorschläge je Sprache; "*" = alle übrigen Sprachen
  "github.copilot.enable": {
    "*": true,
    "markdown": false,
    "plaintext": false
  },
  // Next Edit Suggestions
  "github.copilot.nextEditSuggestions.enabled": true
}
```

| Einstellung | Wirkung | Standard |
| --- | --- | --- |
| `github.copilot.enable` | Inline-Vorschläge je Sprache an/aus | an, außer `plaintext`, `markdown`, `scminput` |
| `github.copilot.nextEditSuggestions.enabled` | Next Edit Suggestions an/aus | an |

Stand: 10/2026, Quelle: https://code.visualstudio.com/docs/copilot/reference/copilot-settings. Weitere Copilot-Dateien in `.vscode/` und `.github/` folgen ab Modul 4.

## Selbst ausprobieren

1. Kopiere [`snippet-4-loop.ts`](../project/snippets/snippet-4-loop.ts) nach `sample-project/src/paging.ts` (Python: [`snippet-4-loop.py`](../project/snippets/snippet-4-loop.py) nach `sample-project-python/sample/paging.py`).
2. Markiere `getPage` (Python: `get_page`) und schreibe `/explain`. Benennt die Erklärung einen Fehler?
3. Prüfe die konkrete Eingabe:
   - JS/TS (Ordner `sample-project`): `npx tsx -e 'import { getPage } from "./src/paging.ts"; console.log(getPage([1,2,3,4,5,6,7,8,9,10], 1, 3))'`
   - Python (Ordner `sample-project-python`): `uv run python -c 'from sample.paging import get_page; print(get_page(list(range(1, 11)), 1, 3))'`
4. Schreibe `/fix Seite 1 von [1..10] mit Größe 3 liefert [1, 2] statt [1, 2, 3]`, übernimm den Vorschlag und wiederhole Schritt 3.
5. Schreibe `/tests` und fordere fehlende Grenzfälle nach: `Ergänze Tests für die letzte unvollständige Seite und eine leere Liste.` Führe `npm test` bzw. `uv run pytest` aus.
6. Schalte unter **Einstellungen → Arbeitsbereich** bei `github.copilot.enable` die Sprache `plaintext` aus und öffne `.vscode/settings.json`.

**Erwartete Beobachtung:** `/explain` beschreibt die Schleife, ohne `- 1` als Fehler zu werten. Schritt 3 liefert `[ 1, 2 ]` bzw. `[1, 2]`, nach dem Fix `[1, 2, 3]`. `/tests` ohne Zusatz erzeugt oft nur den Normalfall. Die Oberfläche schreibt das ganze Objekt mit Standardwerten in `.vscode/settings.json`:

```json
{
  "github.copilot.enable": {
    "*": true,
    "plaintext": false,
    "markdown": false,
    "scminput": false
  }
}
```

**Falls es hakt:** Fehlt der Reiter **Arbeitsbereich**, ist kein Ordner geöffnet: **Datei → Ordner öffnen** und erneut versuchen.

## Fazit

- `/explain` erklärt, `/fix` korrigiert, `/tests` testet; ein Zusatz mit konkreter Eingabe macht jeden Befehl treffsicherer.
- Grenzfälle (leer, letzte Seite, Grenzindex) immer selbst prüfen.
- Benutzer-Einstellungen gelten überall, `.vscode/settings.json` nur im Projekt.

Weiter mit Modul 3: [Vibecoding](../m03-vibecoding/01-vibecoding.md), der erste große Praxisteil im Agent-Modus.
