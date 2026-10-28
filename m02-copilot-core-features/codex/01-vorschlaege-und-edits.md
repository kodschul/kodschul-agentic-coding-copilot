# Vorschläge und gezielte Edits

Codex ist ein Coding-Agent, kein Autovervollständiger: In VS Code erscheint kein grauer Ghost Text an der Cursorposition, und es gibt keine Next Edit Suggestions. Der Ersatz ist ein kurzer, gezielter Auftrag im Codex-Panel, dessen Ergebnis als Diff geprüft und dann übernommen oder verworfen wird.

## Leitfragen

<details>
<summary>Was ersetzt Ghost Text, wenn das Werkzeug keinen anbietet?</summary>

Ein kleiner Auftrag mit klarem Umfang ("Implementiere nur diese Funktion …"). Das Ergebnis kommt nicht beim Tippen, sondern nach einer Anfrage, dafür gleich als vollständige Änderung mit Diff.

</details>

<details>
<summary>Warum braucht ein gezielter Edit mehr Text als ein Inline-Vorschlag?</summary>

Ein Inline-Vorschlag bezieht seinen Kontext aus dem Code rund um den Cursor. Ein Auftrag im Chat muss Datei, Funktion, Anforderung und Randfall selbst nennen, sonst rät der Agent den Umfang.

</details>

<details>
<summary>Woran zeigt sich, dass ein Agent mehr geändert hat als gewollt?</summary>

Am Diff: Er listet jede geänderte Datei und Zeile. Ein gezielter Edit berührt nur die genannte Funktion.

</details>

## Was Codex bietet und was nicht

| Copilot-Funktion | Codex in VS Code | Codex CLI |
| --- | --- | --- |
| Inline-Vorschläge (Ghost Text), Tab zum Annehmen | nicht vorhanden | nicht vorhanden |
| Alternativen durchblättern (Alt+] / Alt+[) | nicht vorhanden | nicht vorhanden |
| Next Edit Suggestions | nicht vorhanden | nicht vorhanden |
| Gezielter Edit an einer Stelle | Auftrag im Codex-Panel, Diff neben dem Code | Auftrag im Terminal, `/diff` zeigt die Änderung |
| Kontext aus dem Editor | offene Dateien automatisch, Markierung per **Add to Codex Thread** | `@`-Pfad oder `/mention`; `/ide` holt IDE-Kontext |
| Auftrag aus einem Kommentar | CodeLens über `TODO`-Kommentaren (`chatgpt.commentCodeLensEnabled`, Standard an) | nicht vorhanden |

- Weder die Doku der IDE-Erweiterung noch die Marketplace-Seite nennen Code-Vervollständigung, Ghost Text oder Next Edit Suggestions; die Funktionsliste beschreibt Chat, Edits mit Vorschau und Cloud-Delegation.
- **Composer Predictions** sind Vorschläge für die nächste *Chat-Nachricht*, nicht für Code, und laut Doku nur in der ChatGPT-Desktop-App (Beta, ChatGPT Pro).
- Wer Ghost Text weiter nutzen will, braucht dafür ein zweites Werkzeug; Codex selbst liefert ihn nicht.

Stand: 10/2026, Quellen: https://learn.chatgpt.com/docs/ide, https://marketplace.visualstudio.com/items?itemName=openai.chatgpt, https://learn.chatgpt.com/docs/developer-settings?surface=ide, https://learn.chatgpt.com/docs/features/composer-predictions, https://learn.chatgpt.com/docs/prompting

## Ablauf eines gezielten Edits

1. Datei öffnen, Funktion markieren, in der Befehlspalette **Add to Codex Thread** (Befehls-ID `chatgpt.addToThread`). Offene Dateien gehen automatisch mit.
2. Auftrag mit Umfang, Anforderung, Randfall und Grenze schreiben ("Ändere nichts anderes").
3. Codex zeigt eine Zusammenfassung und den Diff der geänderten Zeilen neben dem Code.
4. Diff lesen, gewünschte Änderungen behalten, den Rest zurücknehmen oder per Folgeauftrag nachschärfen.
5. Ergebnis mit konkreter Eingabe prüfen, nicht nur den Diff lesen.

Berechtigung für diese Aufgabe: **Ask for approval** (Standard). Codex darf damit im Workspace ändern und fragt vor allem darüber hinaus. Details in [02-chat-und-kontext.md](02-chat-und-kontext.md).

Stand: 10/2026, Quellen: https://learn.chatgpt.com/docs/prompting (Abschnitt "Write a test", IDE-Workflow), https://learn.chatgpt.com/docs/developer-commands?surface=ide, https://learn.chatgpt.com/docs/permission-modes

## Beispiel: der Auftrag bestimmt den Randfall

Funktion aus [`sample-project/src/formatters.ts`](../../project/sample-project/src/formatters.ts) (Python: [`sample/formatters.py`](../../project/sample-project-python/sample/formatters.py)), Rumpf ist ein Platzhalter.

| Auftrag | Typisches Ergebnis (Beispiel) |
| --- | --- |
| `Implementiere truncateWithEllipsis.` | kürzt auf `maxLength - 3` und hängt `"..."` an; bei `maxLength < 3` entsteht ein String, der länger als `maxLength` ist, oder ein Fehler wird geworfen |
| `Implementiere nur truncateWithEllipsis in src/formatters.ts: höchstens maxLength Zeichen, "..." zählt mit. Randfall: maxLength < 3 liefert nur Punkte. Ändere keine andere Funktion.` | Ergebnis wie im Copilot-Beispiel, Diff berührt nur diese Funktion |

```ts
export function truncateWithEllipsis(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  if (maxLength < 3) return ".".repeat(maxLength);
  return text.slice(0, maxLength - 3) + "...";
}
```

Ein Agent liest oft mehr als die markierte Stelle, z. B. Kommentare und verwandte Dateien. Der kurze Auftrag liefert deshalb manchmal schon ein brauchbares Ergebnis; verlässlich wird es erst, wenn der Randfall im Auftrag steht. Beide Ergebnisse sind Beispiele, jeder Lauf liefert andere.

## Selbst ausprobieren

Projekt: [`../../project/sample-project/`](../../project/sample-project/) (Datei `src/formatters.ts`) bzw. [`../../project/sample-project-python/`](../../project/sample-project-python/) (Datei `sample/formatters.py`), einmal `npm install` bzw. `uv sync`. Vorher einen Git-Stand anlegen oder prüfen, dass `git status` sauber ist.

1. Öffne `src/formatters.ts` (Python: `sample/formatters.py`), markiere `truncateWithEllipsis` (Python: `truncate_with_ellipsis`) und führe **Add to Codex Thread** aus. Schreibe im Codex-Panel nur: `Implementiere diese Funktion.` Lies den Diff und nimm die Änderung zurück.
2. Schreibe in einem neuen Chat den ausführlichen Auftrag aus dem Beispiel (Python: Funktionsname `truncate_with_ellipsis`, Datei `sample/formatters.py`). Prüfe im Diff, dass nur diese Funktion geändert ist, und behalte die Änderung.
3. Prüfe das Ergebnis im Terminal:
   - JS/TS (Ordner `sample-project`): `npx tsx -e 'import { truncateWithEllipsis as t } from "./src/formatters.ts"; console.log(t("Hallo Welt", 5), t("Hallo Welt", 2))'`
   - Python (Ordner `sample-project-python`): `uv run python -c 'from sample.formatters import truncate_with_ellipsis as t; print(t("Hallo Welt", 5), t("Hallo Welt", 2))'`
4. Schreibe über `toTitleCase` (Python: `to_title_case`) den Kommentar `// TODO: Ersten Buchstaben jedes Worts groß schreiben, Umlaute beachten` (Python: `# TODO: …`) und starte den Auftrag über die CodeLens über dem Kommentar. Teste danach `"äpfel essen"`.
5. Optional in der CLI, im Projektordner: `codex`, dann `Implementiere nur formatDuration in @src/formatters.ts als "m:ss", z. B. 75 → "1:15". Ändere nichts anderes.` Prüfe die Änderung mit `/diff`.

<details>
<summary>Erwartete Beobachtung</summary>

- Schritt 1 liefert eine plausible Funktion, deren Verhalten bei `maxLength < 3` vom Zufall abhängt; der Randfall steht nirgends im Projekt, Codex muss ihn raten.
- Nach Schritt 2 gibt Schritt 3 `Ha... ..` aus, der Diff berührt nur eine Funktion.
- Schritt 4: Eine Lösung mit `text.replace(/\b\w/g, …)` macht aus `"äpfel essen"` `"äPfel Essen"`, weil `\w` kein `ä` umfasst; mit "Umlaute beachten" im Kommentar berücksichtigt das Ergebnis Umlaute häufiger, eine Garantie ist das nicht.
- Schritt 5: `/diff` zeigt nur die Änderung an `formatDuration`; der `@`-Pfad spart Codex die Suche nach der Datei.

</details>

**Falls es hakt:** Fehlt die CodeLens, Einstellung `chatgpt.commentCodeLensEnabled` prüfen (Suche `@ext:openai.chatgpt`). Fehlt das Codex-Symbol, Befehlspalette → **Codex: Open Codex Sidebar**. Änderung versehentlich behalten: `git restore src/formatters.ts`.

## Fazit

- Codex hat keine Inline-Vorschläge und keine Next Edit Suggestions; ein gezielter Auftrag mit Diff ersetzt sie.
- Umfang, Randfall und "Ändere nichts anderes" gehören in den Auftrag, die Markierung liefert die Stelle.
- Jeden Edit am Diff und mit konkreter Eingabe prüfen.

Weiter mit [02-chat-und-kontext.md](02-chat-und-kontext.md) (Copilot-Fassung: [../02-chat-und-kontext.md](../02-chat-und-kontext.md)): Kontext gezielt mitgeben und Berechtigungen wählen.
