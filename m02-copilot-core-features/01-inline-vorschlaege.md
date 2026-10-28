# Inline-Vorschläge

Inline-Vorschläge (Ghost Text) erscheinen grau an der Cursorposition und werden erst durch Annahme Teil des Codes. Next Edit Suggestions schlagen zusätzlich die nächste passende Änderung an einer anderen Stelle vor.

## Leitfragen

<details>
<summary>Was passiert mit einem Vorschlag, wenn einfach weitergetippt wird?</summary>

Er verschwindet oder wird durch einen neuen ersetzt. Nichts wird ungefragt übernommen.

</details>

<details>
<summary>Wie lassen sich mehrere Alternativen zu einem Vorschlag ansehen?</summary>

Über die Toolbar beim Überfahren des Vorschlags mit der Maus (vor/zurück) oder per Tastenkürzel, in VS Code standardmäßig Alt+] und Alt+[.

</details>

<details>
<summary>Warum erscheint manchmal gar kein Vorschlag?</summary>

Meist fehlt eindeutiger Kontext, z. B. eine leere Funktion ohne sprechenden Namen, oder Vorschläge sind für diesen Dateityp abgeschaltet ([03-befehle-und-konfiguration.md](03-befehle-und-konfiguration.md)).

</details>

## Annehmen, ablehnen, triggern

| Aktion | macOS | Windows / Linux | Wirkung |
| --- | --- | --- | --- |
| Annehmen | Tab | Tab | ganzer Vorschlag wird übernommen |
| Wortweise annehmen | Cmd+→ | Ctrl+→ | nur das nächste Wort |
| Ablehnen | Esc oder weitertippen | Esc oder weitertippen | Vorschlag verschwindet folgenlos |
| Alternativen | Option+] / Option+[ | Alt+] / Alt+[ | weitere Vorschläge durchblättern, auch per Toolbar beim Überfahren |
| Manuell anfordern | Option+\ | Alt+\ | Vorschlag an der Cursorposition auslösen |
| Gezielt triggern | Kommentar oder Signatur zuerst schreiben | ebenso | passenderer Vorschlag |

Stand: 10/2026, Quelle: https://code.visualstudio.com/docs/copilot/ai-powered-suggestions. Abweichende Belegungen zeigt **Einstellungen → Tastenkombinationen** (Suche "inline suggestion").

## Next Edit Suggestions (NES)

- Nach einer Änderung schlägt Copilot die nächste passende Änderung an einer anderen Stelle vor, z. B. alle Aufrufe nach einer Umbenennung.
- Ein Pfeil am Zeilenrand markiert den Vorschlag; Tab springt hin, ein zweites Tab übernimmt ihn.
- Einstellung: `github.copilot.nextEditSuggestions.enabled` (Stand: 10/2026, Quelle wie oben).

## Beispiel: ein Kommentar ändert den Vorschlag

Funktion aus [`sample-project/src/formatters.ts`](../project/sample-project/src/formatters.ts), Rumpf geleert:

```ts
export function truncateWithEllipsis(text: string, maxLength: number): string {
  // Cursor hier, kein Kommentar
}
```

Beispiel-Vorschlag ohne Kommentar:

```ts
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
```

Mit Kommentar über der Funktion:

```ts
// Kürzt text auf höchstens maxLength Zeichen, "..." zählt mit.
// Randfall: maxLength < 3 liefert nur Punkte.
export function truncateWithEllipsis(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  if (maxLength < 3) return ".".repeat(maxLength);
  return text.slice(0, maxLength - 3) + "...";
}
```

Python ([`sample-project-python/sample/formatters.py`](../project/sample-project-python/sample/formatters.py)):

```python
def truncate_with_ellipsis(text: str, max_length: int) -> str:
    # Kürzt text auf höchstens max_length Zeichen, "..." zählt mit.
    # Randfall: max_length < 3 liefert nur Punkte.
    if len(text) <= max_length:
        return text
    if max_length < 3:
        return "." * max_length
    return text[: max_length - 3] + "..."
```

| Eingabe | ohne Kommentar | mit Kommentar |
| --- | --- | --- |
| `("Hallo Welt", 5)` | `"Hallo..."` (8 Zeichen) | `"Ha..."` (5 Zeichen) |
| `("Hallo Welt", 2)` | `"Ha..."` (5 Zeichen) | `".."` (2 Zeichen) |

Beide Vorschläge sind Beispiele; Copilot liefert bei jedem Lauf andere. Der Vergleich zeigt: Der Kommentar bringt Anforderung und Randfall in den Kontext.

## Was Inline-Vorschläge nicht leisten

- Sie decken meist nur die nächsten Zeilen ab, keine Architekturentscheidungen.
- Ohne Kontext aus verwandten Dateien bleiben Vorschläge generisch.

## Selbst ausprobieren

Projekt: [`../project/sample-project/`](../project/sample-project/) (Datei `src/formatters.ts`) bzw. [`../project/sample-project-python/`](../project/sample-project-python/) (Datei `sample/formatters.py`), einmal `npm install` bzw. `uv sync`.

1. Lösche in `truncateWithEllipsis` (Python: `truncate_with_ellipsis`) die Platzhalter-Zeile `throw new Error(...)` (Python: `raise NotImplementedError(...)`); Python: zuerst eine eingerückte neue Zeile schreiben. Notiere den ersten Vorschlag und lehne ihn mit Esc ab.
2. Schreibe den Kommentar aus dem Beispiel über die Funktion, setze den Cursor wieder in den Rumpf und nimm den neuen Vorschlag mit Tab an.
3. Prüfe das Ergebnis im Terminal:
   - JS/TS (Ordner `sample-project`): `npx tsx -e 'import { truncateWithEllipsis as t } from "./src/formatters.ts"; console.log(t("Hallo Welt", 5), t("Hallo Welt", 2))'`
   - Python (Ordner `sample-project-python`): `uv run python -c 'from sample.formatters import truncate_with_ellipsis as t; print(t("Hallo Welt", 5), t("Hallo Welt", 2))'`
4. Lösche in `toTitleCase` (Python: `to_title_case`) die Platzhalter-Zeile und blättere mit Alt+] / Alt+[ durch mindestens zwei Alternativen.
5. Benenne in einer Signatur einen Parameter um (z. B. `text` in `input`) und beobachte, ob eine Next Edit Suggestion die übrigen Vorkommen anbietet.

**Erwartete Beobachtung:** Mit Kommentar gibt Schritt 3 `Ha... ..` aus; ohne Kommentar ist das Ergebnis oft länger als `maxLength`. Bei `toTitleCase` unterscheiden sich die Alternativen sichtbar, z. B. behandelt `text.replace(/\b\w/g, …)` Umlaute falsch (`"äpfel essen"` → `"äPfel Essen"`), weil `\w` kein `ä` umfasst. Nach dem Umbenennen erscheint ein Pfeil an der nächsten Verwendung, sofern NES aktiv ist.

**Falls es hakt:** Erscheint kein Vorschlag, Status-Leiste prüfen (Copilot-Symbol, angemeldet?) und mit Alt+\ (macOS: Option+\) manuell anfordern.

## Fazit

- Tab nimmt an, Esc oder Weitertippen lehnt ab, Alt+] / Alt+[ blättert.
- Ein Kommentar mit Zweck und Randfall vor dem Cursor schärft den Vorschlag.
- NES schlägt Folgeänderungen an anderen Stellen vor.

Weiter mit [02-chat-und-kontext.md](02-chat-und-kontext.md): Fragen und Aufträge mit gezieltem Kontext.
