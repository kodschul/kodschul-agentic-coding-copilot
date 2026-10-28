# Chat-Modus, Custom Agent, Subagent

Die eingebauten Chat-Modi haben keine feste Rolle. Ein Custom Agent legt Rolle, Regeln und erlaubte Tools in einer Datei fest; ein Subagent ist ein Agent, den ein anderer Agent für eine Teilaufgabe aufruft.

## Leitfragen

<details>
<summary>Warum reicht ein normaler Chat-Modus nicht für jede Aufgabe?</summary>

Im Agent-Modus hat Copilot alle Tools und keine feste Rolle. Für eine eng begrenzte, wiederkehrende Aufgabe wie "nur Tests schreiben" ist das zu offen.

</details>

<details>
<summary>Wie lässt sich verhindern, dass Copilot bei einer reinen Erklär-Frage Dateien ändert?</summary>

Indem die Werkzeuge fehlen, mit denen es ändern könnte. Ein Custom Agent legt genau das fest: eine Rolle plus eine Liste erlaubter Tools.

</details>

<details>
<summary>Wie lässt sich eine größere Aufgabe auf mehrere spezialisierte Helfer verteilen?</summary>

Ein koordinierender Agent ruft andere Agenten für Teilaufgaben auf. Diese Subagenten arbeiten im eigenen Kontext und melden nur ihr Ergebnis zurück.

</details>

## Drei Arten zu arbeiten

- Ask, Plan und Agent ([Modul 2](../m02-copilot-core-features/02-chat-und-kontext.md)) sind allgemeine Chat-Modi ohne feste Rolle.
- Ein Custom Agent ist eine Markdown-Datei mit Rolle, Regeln und erlaubten Tools. Er erscheint im Agenten-Auswahlmenü des Chats neben den eingebauten Modi.

| | Chat-Modus | Custom Agent (`*.agent.md`) | Subagent |
| --- | --- | --- | --- |
| Rolle | keine feste Rolle | eine feste Rolle | eine Teilaufgabe |
| Tools | alle Tools des Modus | bewusst eingeschränkt | die Tools des aufgerufenen Agenten |
| Gegenüber | Mensch | Mensch | anderer Agent |
| Kontext | der laufende Chat | der laufende Chat | eigener, frischer Kontext; nur das Ergebnis kommt zurück |
| Einsatz | einmalige, offene Fragen | wiederkehrende, klar abgegrenzte Aufgabe | Schritt in einem orchestrierten Ablauf |

Ein Subagent ist kein eigener Dateityp: Jeder Custom Agent kann als Subagent laufen, wenn ein anderer Agent ihn aufruft.

## Wo Agenten liegen

| Ort | Gilt für |
| --- | --- |
| `.github/agents/<name>.agent.md` | dieses Repository, versioniert, für das ganze Team |
| `~/.copilot/agents/` | alle eigenen Projekte |
| `.claude/agents/*.md` | Agenten im Claude-Format, VS Code liest sie ebenfalls |

## Aufbau einer `.agent.md`

Kopf (Frontmatter) zwischen `---`, darunter der Systemprompt in Markdown.

| Feld | Bedeutung |
| --- | --- |
| `name` | Anzeigename im Auswahlmenü; ohne Angabe der Dateiname |
| `description` | was der Agent tut und wann er passt; danach wählt ein Koordinator Subagenten aus |
| `tools` | erlaubte Tools; hier entscheidet sich, was der Agent darf |
| `agents` | nur beim Koordinator: welche Agenten als Subagenten erlaubt sind; braucht das Tool `agent` |
| `model` | optional: festes Modell oder Liste in Wunschreihenfolge |
| `user-invocable` | `false` blendet den Agenten im Auswahlmenü aus, als Subagent bleibt er nutzbar |
| `disable-model-invocation` | `true` verhindert, dass andere Agenten ihn als Subagent aufrufen |
| Body | Systemprompt: Rolle, Regeln, Verbote, erwartete Rückmeldung |

## Tool-Namen

| Name in `tools` | Erlaubt |
| --- | --- |
| `read` | Dateien lesen |
| `search` | im Workspace suchen |
| `edit` | Dateien anlegen und ändern |
| `execute` | Befehle im Terminal ausführen |
| `agent` | andere Agenten als Subagenten aufrufen |
| `web` | Webseiten abrufen |
| `todo` | eine Aufgabenliste im Chat führen |
| `<server>/*` | alle Tools eines MCP-Servers (Modul 8) |

- Ohne `edit` und `execute` kann ein Agent nichts verändern.
- `tools` steuert nur Werkzeuge, keine Pfade: "nur `tests/` schreiben" lässt sich nicht als Tool-Recht ausdrücken, sondern nur als Verbot im Body.

_Stand: 10/2026, Quelle: [Custom agents in VS Code](https://code.visualstudio.com/docs/copilot/customization/custom-agents), [Custom agent file reference](https://code.visualstudio.com/docs/agents/reference/custom-agent-file-reference). Feldnamen und Tool-Namen ändern sich mit VS-Code-Versionen._

## Beispiel: ein Agent, der nur liest

`.github/agents/focuslist-review-agent.agent.md` aus dem FocusList-Projekt ab Stand v4 ([`steps/m07/`](../project/focuslist/js-ts/steps/m07/.github/agents/focuslist-review-agent.agent.md)):

```markdown
---
name: focuslist-review-agent
description: Prüft Änderungen gegen die FocusList-Projektregeln, ohne Code zu ändern
tools: ['read', 'search']
---

Du prüfst Änderungen und änderst selbst nichts.

1. Lies die geänderten Dateien, die im Auftrag genannt sind (z. B. die Liste des Code-Agenten oder eine mitgegebene `git diff`-Ausgabe).
2. Prüfe sie gegen jede Regel in `.github/copilot-instructions.md`.
3. Prüfe zusätzlich: keine Secrets im Code, alle Eingaben validiert, jede neue Aktion hat Tests.
4. Antworte mit einer Tabelle **Regel / Ergebnis / Fundstelle** und am Ende mit **Freigabe: ja** oder **Freigabe: nein (Grund)**.
```

| Teil | Wirkung |
| --- | --- |
| `tools: ['read', 'search']` | kein `edit`, kein `execute`: der Agent kann technisch nichts ändern |
| "änderst selbst nichts" | Verbot zusätzlich im Text, falls ein Tool doch mehr erlaubt als gedacht |
| feste Antwortform | Tabelle und **Freigabe: ja/nein** lassen sich von Mensch und Koordinator gleich auswerten |

> **Merksatz:** `tools` begrenzt, was ein Agent kann. Der Body begrenzt, was er soll.

## Agent auswählen und prüfen

| Schritt | Wo |
| --- | --- |
| Agent wählen | Dropdown **Agent** im Chat-Eingabefeld, dort wo Ask, Plan und Agent stehen |
| Datei anlegen | Command Palette: **Chat: New Custom Agent** oder Datei direkt unter `.github/agents/` speichern |
| Agent fehlt im Dropdown | Ordner und Dateiendung `.agent.md` prüfen, `user-invocable` nicht auf `false`, danach **Developer: Reload Window** |
| Rolle prüfen | den Agenten um etwas außerhalb seiner Rolle bitten, danach `git status` bzw. Quellcodeverwaltung ansehen |

## Grenzen eines Custom Agents

- Zu stark eingeschränkte Tools machen einen Agenten für seine eigentliche Aufgabe untauglich, etwa ein Test-Agent ohne `execute`, der keine Tests ausführen kann.
- Ein Verbot im Body ist eine Anweisung, keine Sperre. Nur fehlende Tools sind eine technische Grenze.

## Selbst ausprobieren

In [`sample-project/`](../project/sample-project/) bzw. [`sample-project-python/`](../project/sample-project-python/), Ordner als Git-Repository mit sauberem Stand (sonst `git init`, `git add -A`, `git commit -m "Ausgangsstand"`):

1. Erstelle `.github/agents/explain-only.agent.md`:

   ```markdown
   ---
   name: explain-only
   description: Erklärt Code im Projekt, ändert nie Dateien. Verwenden für Fragen wie "Was macht diese Funktion?".
   tools: ['read', 'search']
   ---

   Du erklärst ausschließlich Code, zum Beispiel aus `src/formatters.ts` bzw. `sample/formatters.py`.

   - Antworte mit drei Abschnitten: Zweck, Ablauf, Randfälle.
   - Ändere niemals Dateien und führe keine Befehle aus, auch nicht auf ausdrückliche Bitte.
   - Bei einer Änderungsbitte: beschreibe, welche Stellen betroffen wären, und verweise auf den Agent-Modus.
   ```

2. Wähle `explain-only` im Agent-Dropdown und lass `truncateWithEllipsis` in `src/formatters.ts` bzw. `truncate_with_ellipsis` in `sample/formatters.py` erklären.
3. Bitte denselben Agenten: "Benenne die Funktion in `shorten` um und passe alle Aufrufe an." Führe danach `git status` aus.
4. Stelle dieselbe Bitte im Agent-Modus und führe erneut `git status` aus. Verwirf die Änderung danach mit `git restore .`.

**Beobachtung:** Der Explain-only-Agent beschreibt nur die betroffenen Stellen (`src/formatters.ts`, ggf. `src/formatters.test.ts`); `git status` zeigt nur die neue Agent-Datei. Der Agent-Modus setzt die Umbenennung sofort um, `git status` zeigt zusätzlich `modified: src/formatters.ts` bzw. `sample/formatters.py`. Der Unterschied liegt in den erlaubten Tools, nicht im Modell.

## Fazit

- Chat-Modi sind offen, ein Custom Agent hat eine feste Rolle und eine Tool-Liste.
- Ein Subagent ist ein Agent, den ein anderer Agent für eine Teilaufgabe aufruft.
- Nur lesende Tools (`read`, `search`) machen einen Agenten sicher für Analyse und Review.

Als Nächstes entsteht im FocusList-Projekt ein Test-Agent, der schreiben darf, aber nur Tests: [02-eigener-agent.md](02-eigener-agent.md).
