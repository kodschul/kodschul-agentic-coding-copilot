# Rückblick: die Versionskette v0 → v7

FocusList ist über zwei Tage von einem ungeleitet vibecodeten v0 zu v7 mit Spec-Driven Development gewachsen. Jede Stufe hat genau einen Baustein angedockt; verändert hat sich dabei vor allem die Zusammenarbeit mit der KI, weniger der Code selbst.

## Leitfragen

<details>
<summary>Was hat sich zwischen v0 und v7 an der Codequalität verändert?</summary>

Konsistente Fehlerbehandlung, dokumentierte Konventionen, vollständige Testabdeckung, automatisierte Absicherung. Alles Ergebnis gezielt eingeführter Leitplanken, nicht eines einzelnen großen Sprungs.

</details>

<details>
<summary>Was hat sich an der Art verändert, mit Copilot zu arbeiten?</summary>

Von "jede Anfrage einzeln und ungeleitet" (v0) zu "Konventionen, Skills, Prompts, Agenten und Specs steuern das Verhalten vorab" (v7). Die Kontrolle verschiebt sich von reaktivem Prüfen zu proaktivem Strukturieren.

</details>

<details>
<summary>Welche Stufe war im eigenen Projekt am wirkungsvollsten?</summary>

Individuelle Antwort, zum Beispiel Modul 4 (Instructions) als erste, breit wirkende Leitplanke oder Modul 9 (Spec-Driven Development) als konsequenteste Kontrolle vor der Umsetzung.

</details>

## Die Versionskette

| Version | Modul | Neu angedockt | Artefakt im Projekt | Schritt |
| --- | --- | --- | --- | --- |
| – | Start | leeres Projekt | – | [`start`](../project/focuslist/js-ts/start/) |
| v0 | 3 Vibecoding | Baseline ohne Leitplanken | – | [`steps/m03`](../project/focuslist/js-ts/steps/m03/) |
| v1 | 4 Instructions | Projektkonventionen | `.github/copilot-instructions.md`, `.github/instructions/tests.instructions.md` | [`steps/m04`](../project/focuslist/js-ts/steps/m04/) |
| v2 | 5 Skills | wiederverwendbares Vorgehen | `.github/skills/add-focuslist-action/` | [`steps/m05`](../project/focuslist/js-ts/steps/m05/) |
| v3 | 6 Prompts | Review, Tests, Refactoring, Doku auf Abruf | `.github/prompts/*.prompt.md`, README, CHANGELOG | [`steps/m06`](../project/focuslist/js-ts/steps/m06/) |
| v4 | 7 Agents | Rollen mit begrenzten Rechten | `.github/agents/*.agent.md` | [`steps/m07`](../project/focuslist/js-ts/steps/m07/) |
| v5 | 8 Tasks, Hooks | Lint + Test als Task, Tests vor jedem "fertig" | `.vscode/tasks.json`, `.github/hooks/run-tests.json` | [`steps/m08`](../project/focuslist/js-ts/steps/m08/) |
| v6 | 8 MCP | Ticket-Ablage im Chat, Massenänderung | `.vscode/mcp.json`, `.github/skills/bulk-priority-update/` | [`steps/m08`](../project/focuslist/js-ts/steps/m08/) |
| v7 | 9 Spec-Driven | Spec vor Code | `openspec/` | [`steps/m09`](../project/focuslist/js-ts/steps/m09/) |

Python: dieselben Schritte unter [`focuslist/python/`](../project/focuslist/python/). Jeden vollständigen Stand erzeugt `node project/focuslist/catch-up.mjs <stack> mNN <ziel>` (Endstand: `final`).

## Eine Funktion, zwei Stände

`complete-task` in v0 ([`steps/m03`](../project/focuslist/js-ts/steps/m03/src/actions/complete-task.ts)):

```ts
import fs from "node:fs";
import type { Task } from "../models/task";

export function completeTask(id: string): boolean {
  const tasks: Task[] = JSON.parse(fs.readFileSync("tasks.json", "utf-8"));
  const task = tasks.find((t) => t.id === id);
  if (!task) return false;
  task.done = true;
  fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
  return true;
}
```

`complete-task` in v7 ([`steps/m04`](../project/focuslist/js-ts/steps/m04/src/actions/complete-task.ts)):

```ts
import type { Task } from "../models/task.js";
import { readTasks, writeTasks } from "../storage/json-store.js";

export function completeTask(id: string): Task {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    throw new Error(`Task mit id "${id}" existiert nicht.`);
  }
  task.done = true;
  writeTasks(tasks);
  return task;
}
```

Python v0 (`complete_task(task_id)`, Dict-Zugriff, `return False`) und v7 (`raise ValueError(...)`, `read_tasks`/`write_tasks`) zeigen dieselben Unterschiede.

| Unterschied | v0 | v7 | eingeführt in |
| --- | --- | --- | --- |
| Fehlerfall | `return false` | `throw new Error(...)` bzw. `raise ValueError(...)` | Modul 4, Regel in `copilot-instructions.md` |
| Dateizugriff | direkt `fs` bzw. `open("tasks.json")` | über `storage/` | Modul 4 |
| Tests | keine | Erfolgs- und Fehlerfall | Modul 4 (Testregeln), Modul 7 (Test-Agent) |
| Absicherung | keine | Stop-Hook führt die Tests aus, bevor ein Agent fertig meldet | Modul 8 |
| Doku | keine | README, CHANGELOG, Doc-Kommentare | Modul 6 |

- Der Code selbst ändert sich nach Modul 4 kaum noch. Was wächst, ist die Absicherung drumherum.
- Die Absicherung in Modul 8 ist ein **Agent Hook auf `agentStop`** (Alias `Stop`), kein Git-pre-commit-Hook: Er greift im Agentenlauf, bevor der Agent "fertig" meldet, nicht beim Commit.

## Was sich an der Arbeit mit KI verändert hat

| Stufe | Vorher | Nachher |
| --- | --- | --- |
| v0 → v1 | Konventionen in jeder Anfrage wiederholen oder vergessen | Regeln stehen einmal im Repo und gelten für jede Anfrage |
| v1 → v2 | wiederkehrender Ablauf jedes Mal neu erklärt | Skill wird bei passender Anfrage automatisch geladen |
| v2 → v3 | Review- und Test-Anfragen frei formuliert | `/`-Befehl mit festem Ablauf und fester Antwortform |
| v3 → v4 | ein Agent mit allen Rechten | Rollen mit begrenzten Tools, Kette Code → Test → Review |
| v4 → v6 | Tests und Tickets von Hand nachgereicht | Hook schickt den Agenten bei roten Tests zurück, Tickets über MCP |
| v6 → v7 | Randfälle fallen nach dem Code auf | Randfälle stehen vor dem Code in der Spec |

## Grenzen

- Der Rückblick bewertet die Kette dieses Kurses. Nicht jedes reale Projekt braucht alle Stufen in derselben Reihenfolge oder Tiefe.
- Jeder Baustein senkt ein Risiko, keiner ersetzt das menschliche Review des Diffs.

## Selbst ausprobieren

1. Vergleiche den eigenen v0-Stand mit dem eigenen Endstand, oder die beiden Stände aus dem Kursmaterial:

   ```bash
   diff -u project/focuslist/js-ts/steps/m03/src/actions/complete-task.ts project/focuslist/js-ts/steps/m04/src/actions/complete-task.ts
   # Python: project/focuslist/python/steps/m03/focuslist/actions/complete_task.py und …/steps/m04/…
   node project/focuslist/catch-up.mjs js-ts m04 v0 && node project/focuslist/catch-up.mjs js-ts final endstand
   diff -rq v0/ endstand/ | grep -v node_modules
   ```

2. Notiere drei Unterschiede und ordne jedem das Modul zu, in dem er entstand.
3. Formuliere in einem Satz, was sich an der eigenen Arbeitsweise mit Copilot verändert hat, nicht nur am Code.

**Beobachtung:** Der Diff von `complete-task` zeigt Rückgabetyp `Task` statt `boolean`, `throw` statt `return false` und `readTasks`/`writeTasks` statt `fs`. `diff -rq` zeigt, dass die meisten neuen Dateien keine Logik sind: `.github/`, `.vscode/`, `tests/`, `openspec/`, README und CHANGELOG.

## Fazit

- v0 → v7: jede Stufe ein Baustein, jeder Baustein eine Datei im Repo.
- Der größte Unterschied liegt nicht im Code, sondern in Tests, Regeln und Automatisierung drumherum.
- Die Kontrolle verschiebt sich von reaktivem Prüfen zu proaktivem Strukturieren.

Als Nächstes: welche Bausteine sich auf neue Projekte übertragen lassen und was sich bei Copilot gerade ändert: [02-best-practices-und-ausblick.md](02-best-practices-und-ausblick.md).
