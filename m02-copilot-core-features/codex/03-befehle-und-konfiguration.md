# Befehle und Konfiguration

Slash-Befehle (`/` im Eingabefeld) steuern Sitzung, Berechtigungen und Review in Codex; Aufträge wie Erklären, Korrigieren oder Testen werden dagegen frei formuliert. Die Konfiguration steht in `config.toml` und gilt für CLI und IDE-Erweiterung gemeinsam.

## Leitfragen

<details>
<summary>Was unterscheidet ein Review von einer Erklärung des Codes?</summary>

Eine Erklärung beschreibt, was der Code tut. Ein Review sucht gezielt nach Abweichungen vom beabsichtigten Verhalten und listet Befunde nach Priorität.

</details>

<details>
<summary>Ersetzt ein automatisches Review den eigenen Test mit konkreter Eingabe?</summary>

Nein. Ein Befund ist ein Hinweis, der an einer konkreten Eingabe bestätigt werden muss; ein fehlender Befund beweist keine Korrektheit.

</details>

<details>
<summary>Warum gelten Einstellungen aus einem fremden Repository nicht automatisch?</summary>

Projektdateien könnten Sandbox, Freigaben oder Hooks lockern. Codex lädt `.codex/config.toml` deshalb nur, wenn das Projekt als vertrauenswürdig markiert ist.

</details>

## Die wichtigsten Slash-Befehle

| Befehl | Wirkung | IDE | CLI |
| --- | --- | --- | --- |
| `/review` | Review-Modus: Befunde zu uncommitteten Änderungen oder zum Diff gegen einen Basis-Branch (CLI zusätzlich: Commit, eigene Kriterien); ändert nichts | ja | ja |
| `/diff` | Git-Diff inklusive noch nicht versionierter Dateien | – | ja |
| `/plan` | Plan-Modus, optional mit Auftrag | ja | ja |
| `/init` | `AGENTS.md`-Gerüst im aktuellen Ordner anlegen (Modul 4) | ja | ja |
| `/model` | Modell wählen; CLI mit Reasoning-Stufe, IDE dafür `/reasoning` | ja | ja |
| `/permissions` | Berechtigungsstufe wählen (IDE: Auswahl unter dem Eingabefeld) | – | ja |
| `/status` | CLI: Modell, Freigaberegel, beschreibbare Ordner, Token-Verbrauch; IDE: Chat-ID, Kontextverbrauch, Rate Limits | ja | ja |
| `/compact` | Verlauf zusammenfassen, spart Kontext | ja | ja |
| `/mcp` | verbundene MCP-Server und Werkzeuge (Modul 8) | ja | ja |
| `/skills` | Skill auswählen und anwenden (Modul 5) | – | ja |
| `/new`, `/resume`, `/fork` | neuer Chat, gespeicherten Chat fortsetzen, Chat abzweigen | nur `/fork` | ja |

- Ein `/explain`, `/fix` oder `/tests` gibt es nicht. Der Auftrag steht als Text im Chat: `Erkläre @src/paging.ts`, `Behebe: getPage([1..10], 1, 3) liefert [1, 2]`.
- `/review` erscheint in der IDE nur, wenn das Projekt in einem Git-Repository liegt; ein eigenes Modell für Reviews setzt `review_model` in `config.toml`.
- Die vollständige Liste zeigt `/` im Eingabefeld und das [Codex-Cheatsheet](codex-cheatsheet.md).

Stand: 10/2026, Quellen: https://learn.chatgpt.com/docs/developer-commands?surface=cli, https://learn.chatgpt.com/docs/developer-commands?surface=ide, https://learn.chatgpt.com/docs/code-review

## Nicht-interaktiv: `codex exec`

```bash
codex exec "Fasse die Projektstruktur zusammen"                    # Standard: read-only
codex exec --sandbox workspace-write "Ergänze Tests für getPage"   # darf im Workspace schreiben
codex exec --json "…" | jq                                        # JSONL-Ereignisse
codex exec -o ergebnis.md "…"                                     # letzte Antwort in Datei
codex exec resume --last "Weiter mit Schritt 2"                    # letzte exec-Sitzung fortsetzen
```

- Fortschritt geht nach stderr, nur die letzte Antwort nach stdout; damit lässt sich das Ergebnis weiterleiten.
- `--full-auto` wird nicht mehr unterstützt; stattdessen `--sandbox workspace-write` oder `--approve-for-me`.
- `codex review` führt ein Review ebenfalls nicht-interaktiv aus.

Stand: 10/2026, Quellen: https://learn.chatgpt.com/docs/non-interactive-mode, https://learn.chatgpt.com/docs/developer-commands?surface=cli

## Konfiguration: `config.toml`

| Ebene | Ort | Gilt für |
| --- | --- | --- |
| Benutzer | `~/.codex/config.toml` | alle Projekte auf diesem Rechner, CLI und IDE |
| Projekt | `.codex/config.toml` im Repo (auch in Unterordnern, der nächstgelegene gewinnt) | nur dieses Projekt, **nur wenn vertrauenswürdig** |
| einmalig | Flags wie `--model`, `--sandbox` oder `-c schlüssel=wert` | nur diesen Aufruf, höchste Priorität |

Vertrauen wird beim ersten Start (Onboarding-Abfrage) oder über `/permissions` erteilt; der zugehörige Schlüssel ist `projects.<pfad>.trust_level` in der Benutzerdatei. In der IDE öffnet **Zahnrad → Codex Settings → Open config.toml** die Datei.

```toml
# ~/.codex/config.toml
model = "gpt-6.1-sol"             # Beispiel; verfügbare Modelle zeigt /model
approval_policy = "on-request"    # on-request | never
sandbox_mode = "workspace-write"  # read-only | workspace-write | danger-full-access

[projects."/abs/pfad/zum/sample-project"]
trust_level = "trusted"           # lädt .codex/config.toml dieses Projekts
```

| Schlüssel | Wirkung |
| --- | --- |
| `model`, `model_reasoning_effort` | Standardmodell und Reasoning-Stufe |
| `approval_policy` | wann Codex fragt (`on-request`, `never`, `granular`) |
| `sandbox_mode` | was Codex technisch darf |
| `[sandbox_workspace_write] network_access` | Netzwerk in `workspace-write` (Standard: aus) |
| `review_model` | eigenes Modell für `/review` |
| `projects.<pfad>.trust_level` | `"trusted"` oder `"untrusted"` |

**IDE-Einstellungen** (VS Code, Suche `@ext:openai.chatgpt`, nicht in `config.toml`): `chatgpt.commentCodeLensEnabled` (CodeLens über TODO-Kommentaren, Standard an), `chatgpt.reviewDelivery` (`/review` im aktuellen Chat oder separat), `chatgpt.composerEnterBehavior` (Enter oder Cmd/Ctrl+Enter sendet), `chatgpt.openOnStartup`.

`/status` zeigt die wirksamen Werte, `/debug-config` die Ebenen in Rangfolge. Weitere Codex-Dateien (`AGENTS.md`, Skills, Hooks) folgen ab Modul 4.

Stand: 10/2026, Quellen: https://learn.chatgpt.com/docs/config-file/config-basic, https://learn.chatgpt.com/docs/config-file/config-reference, https://learn.chatgpt.com/docs/developer-settings?surface=ide, https://learn.chatgpt.com/docs/agent-approvals-security

## Selbst ausprobieren

Snippet: [`snippet-4-loop.ts`](../../project/snippets/snippet-4-loop.ts) (Python: [`snippet-4-loop.py`](../../project/snippets/snippet-4-loop.py)). Die Schleifengrenze `start + pageSize - 1` lässt auf jeder vollen Seite den letzten Eintrag weg. `/review` braucht ein Git-Repository mit sauberem Stand.

1. Prüfe im Ordner `sample-project` (Python: `sample-project-python`) mit `git status`, dass keine fremden Änderungen offen sind; ist der Ordner kein Repository: `git init`, `git add -A`, `git commit -m "Ausgangsstand"`.
2. Kopiere `snippet-4-loop.ts` nach `sample-project/src/paging.ts` (Python: `snippet-4-loop.py` nach `sample-project-python/sample/paging.py`).
3. Starte `codex`, gib `/review` ein und wähle **Review uncommitted changes**. Notiere die Befunde und deren Priorität.
4. Prüfe die konkrete Eingabe:
   - JS/TS: `npx tsx -e 'import { getPage } from "./src/paging.ts"; console.log(getPage([1,2,3,4,5,6,7,8,9,10], 1, 3))'`
   - Python: `uv run python -c 'from sample.paging import get_page; print(get_page(list(range(1, 11)), 1, 3))'`
5. Schreibe (Python: `@sample/paging.py`, `get_page`): `Behebe getPage in @src/paging.ts: Seite 1 von [1..10] mit Größe 3 liefert [1, 2] statt [1, 2, 3]. Ergänze Tests für volle Seite, letzte unvollständige Seite und leere Liste.` Prüfe mit `/diff`, wiederhole Schritt 4 und führe `npm test` bzw. `uv run pytest` aus.
6. Öffne mit `/status` die aktive Konfiguration und vergleiche Sandbox und Freigaberegel mit `~/.codex/config.toml`.

<details>
<summary>Erwartete Beobachtung</summary>

- `/review` meldet die Schleifengrenze meist als Befund mit hoher Priorität (Off-by-one, letzter Eintrag fehlt) und ändert keine Datei. Ohne Befund ist der Code trotzdem nicht bestätigt.
- Schritt 4 liefert `[ 1, 2 ]` bzw. `[1, 2]`, nach dem Fix `[1, 2, 3]`.
- Die letzte, unvollständige Seite (`page 4` → `[10]`) ist schon vorher korrekt, weil dort `items.length` die Grenze bildet; ein Test nur dafür hätte den Fehler nicht gefunden.
- `/status` zeigt im Git-Projekt meist `workspace-write` mit `on-request`, sofern nichts anderes konfiguriert ist.

</details>

**Falls es hakt:** Fehlt `/review` in der IDE, liegt das Projekt nicht in einem Git-Repository (Schritt 1). Erscheinen Befunde zu fremden Dateien, den Stand vorher committen.

## Fazit

- `/review` sucht Befunde ohne zu ändern, `/diff` zeigt Änderungen; Erklären, Korrigieren und Testen sind frei formulierte Aufträge.
- Grenzfälle (leer, letzte Seite, Grenzindex) immer selbst prüfen.
- `~/.codex/config.toml` gilt überall, `.codex/config.toml` nur in vertrauenswürdigen Projekten; `codex exec` startet standardmäßig read-only.

Weiter mit Modul 3: [Vibecoding](../../m03-vibecoding/01-vibecoding.md), der erste große Praxisteil, in Codex mit der Stufe Auto bzw. Ask for approval.
