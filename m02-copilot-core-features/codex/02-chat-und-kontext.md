# Chat und Kontext

Codex arbeitet in der IDE-Erweiterung und in der CLI immer als Agent: Es liest Dateien, führt Befehle aus und ändert Code. Gesteuert wird zweierlei: welcher Kontext mit der Anfrage mitgeht und welche Berechtigungen der Agent ohne Rückfrage hat.

## Leitfragen

<details>
<summary>Was sieht Codex, wenn die Frage keine Datei nennt?</summary>

In der IDE-Erweiterung gehen offene Dateien automatisch mit, in der CLI nicht. Als Agent kann Codex fehlende Dateien aber selbst suchen und lesen; das kostet Zeit und Kontext und trifft nicht immer die richtige Datei.

</details>

<details>
<summary>Wie wird verhindert, dass ein Agent beim Erklären schon Dateien ändert?</summary>

Über die Berechtigung: In der CLI per `/permissions` auf **Read Only** schalten, oder mit `/plan` zuerst nur einen Plan anfordern.

</details>

<details>
<summary>Wann lohnt sich ein Screenshot als Kontext?</summary>

Wenn die Aufgabe vom Aussehen abhängt, z. B. Fehlermeldung, Layout oder Diagramm. Der Text muss trotzdem sagen, worauf zu achten ist.

</details>

## Chat öffnen

| Oberfläche | Öffnen | Neuer Chat |
| --- | --- | --- |
| IDE-Erweiterung | Codex-Symbol in der Seitenleiste oder Befehlspalette → **Codex: Open Codex Sidebar** | Cmd+N (macOS) / Ctrl+N (Windows/Linux), Befehl `chatgpt.newChat` |
| CLI | `codex` im Projektordner, optional mit Auftrag: `codex "Erkläre die Projektstruktur"` | `/new` (Verlauf bleibt im Terminal sichtbar) oder `/clear` (Terminal leeren, neuer Chat) |

Ein Tastenkürzel zum Öffnen der Seitenleiste ist nicht vorbelegt; Codex-Befehle lassen sich unter **Einstellungen → Tastenkombinationen** (Suche "Codex") selbst belegen.

Stand: 10/2026, Quellen: https://learn.chatgpt.com/docs/ide, https://learn.chatgpt.com/docs/developer-commands?surface=ide, https://learn.chatgpt.com/docs/developer-commands?surface=cli

## Kontext mitgeben

| Weg | Oberfläche | Bindet ein |
| --- | --- | --- |
| offene Dateien | IDE, automatisch; `/ide-context` schaltet das an/aus | Dateien, die im Editor offen sind |
| **Add to Codex Thread** (`chatgpt.addToThread`) | IDE, Befehlspalette | markierten Zeilenbereich |
| `chatgpt.addFileToThread` | IDE, Befehlspalette | ganze Datei |
| `@` + Pfad | IDE und CLI | Dateipfad aus dem Workspace (Autovervollständigung) |
| `/mention <pfad>` | CLI | Datei oder Ordner für die nächsten Schritte |
| `/ide` | CLI | offene Dateien und Markierung aus der IDE |
| Bild | IDE: mit gedrückter Shift-Taste ins Eingabefeld ziehen oder einfügen; CLI: einfügen oder `codex -i bild.png "…"` | Screenshot, Diagramm, Design |
| selbst suchen | beide | Codex liest Dateien und führt Suchbefehle selbst aus |

- Ein eigenes `#codebase` gibt es nicht: Codex durchsucht das Repository mit seinen Werkzeugen; welche Befehle es dafür ausführt, zeigt der Verlauf.
- `AGENTS.md` im Projekt liest Codex vor jeder Arbeit automatisch als Projektregeln ([Modul 4](../../m04-custom-instructions/01-copilot-instructions.md)).

Stand: 10/2026, Quellen: https://learn.chatgpt.com/docs/prompting, https://learn.chatgpt.com/docs/developer-commands?surface=cli, https://learn.chatgpt.com/docs/developer-commands?surface=ide, https://learn.chatgpt.com/docs/image-inputs, https://learn.chatgpt.com/docs/agent-configuration/agents-md

## Berechtigungen statt Chat-Modi

Zwei Regler wirken zusammen: die **Sandbox** (`sandbox_mode`: was technisch erlaubt ist) und die **Freigaberegel** (`approval_policy`: wann Codex fragt).

| Stufe (Name in der Oberfläche) | Wo | Sandbox / Freigabe | Wirkung |
| --- | --- | --- | --- |
| Read Only | CLI `/permissions` | `read-only` / `on-request` | lesen und Befehle in der schreibgeschützten Sandbox; Änderungen nur nach Freigabe |
| Auto (CLI) bzw. **Ask for approval** (IDE, Standard) | CLI `/permissions`, IDE Auswahl unter dem Eingabefeld | `workspace-write` / `on-request` | lesen, ändern, Befehle im Workspace; Frage vor Zugriffen außerhalb und vor Netzwerk |
| **Approve for me** | IDE, CLI `--approve-for-me` | wie oben, Freigaben prüft ein automatischer Reviewer (`approvals_reviewer = "auto_review"`) | fragt nur bei Aktionen, die als riskant erkannt werden |
| **Full access** | IDE; CLI `--yolo` bzw. `--sandbox danger-full-access` | keine Sandbox | voller Datei- und Netzzugriff, nur in isolierter Umgebung |
| **Custom (config.toml)** | IDE | Werte aus `config.toml` | z. B. `sandbox_mode = "read-only"` als Ask-Ersatz in der IDE |

- `approval_policy` kennt nur `on-request`, `never` und eine `granular`-Variante; `untrusted` wird nicht mehr unterstützt.
- In einem Ordner ohne Git empfiehlt Codex beim Start Read Only, in einem Git-Repository Auto. `.git`, `.codex` und `.agents` bleiben auch bei `workspace-write` schreibgeschützt.
- **Plan-Modus**: `/plan` (IDE und CLI) lässt Codex zuerst einen Ausführungsplan vorschlagen.
- Die Doku nennt die Stufen je Seite unterschiedlich (CLI: "Auto", "Read Only"; IDE: "Ask for approval" …); vor dem Kurs in der installierten Version prüfen. Namen wie "Chat" oder "Agent (full access)" nennt die aktuelle Doku nicht.

Stand: 10/2026, Quellen: https://learn.chatgpt.com/docs/permission-modes, https://learn.chatgpt.com/docs/agent-approvals-security, https://learn.chatgpt.com/docs/config-file/config-basic, https://learn.chatgpt.com/docs/developer-commands?surface=cli

## Copilot → Codex

| Copilot | Codex | Hinweis |
| --- | --- | --- |
| Ask | Read Only (CLI `/permissions`) bzw. Custom mit `sandbox_mode = "read-only"` (IDE) | Codex kann auch hier Befehle ausführen, nur nicht schreiben |
| Plan | `/plan` | in beiden Oberflächen |
| Agent | Auto / Ask for approval | Standard in einem Git-Projekt |
| `#file:<pfad>` | `@<pfad>`, `/mention` (CLI), `chatgpt.addFileToThread` (IDE) | |
| `#selection` | **Add to Codex Thread** (IDE), `/ide` (CLI) | |
| `#codebase` | kein Befehl, Codex sucht selbst | Suchschritte stehen im Verlauf |
| Bild per Drag & Drop | Shift + Ziehen (IDE), `codex -i` (CLI) | |
| Diff mit **Keep**/**Undo** | Diff im Panel (IDE), `/diff` (CLI) | Zurücknehmen notfalls mit Git |

## Selbst ausprobieren

Projekt: [`../../project/sample-project/`](../../project/sample-project/) bzw. [`../../project/sample-project-python/`](../../project/sample-project-python/) (Python: `sample/models.py`, `sample/validators.py`, Funktion `validate_ticket`). Modell der Tickets: [`src/models.ts`](../../project/sample-project/src/models.ts) mit `id`, `title`, `priority`, `status`, `createdAt`, optional `assignee`.

Python: in allen Aufträgen `@sample/models.py`, `validate_ticket` und `sample/validators.py` einsetzen.

1. Starte im Projektordner `codex`, stelle mit `/permissions` **Read Only** ein und frage: `Wie sollte validateTicket in src/validators.ts aussehen? Antworte nur, ändere nichts.` Beobachte im Verlauf, welche Dateien Codex liest, und notiere die Feldnamen.
2. Starte mit `/new` neu und frage dasselbe mit `@src/models.ts` am Anfang. Vergleiche Anzahl der Suchschritte und Feldnamen.
3. Öffne in VS Code `src/models.ts`, markiere nur die Zeile mit `TicketStatus`, führe **Add to Codex Thread** aus und frage im Panel: `Welche Werte muss eine Prüfung hierfür akzeptieren?`
4. Frage in der CLI: `Wo wird TicketPriority verwendet?` und lies, welche Suchbefehle Codex ausführt.
5. Schalte mit `/permissions` auf Auto: `@src/models.ts Implementiere validateTicket in src/validators.ts.` Prüfe mit `/diff` und nimm die Änderung mit `git restore src/validators.ts` (Python: `git restore sample/validators.py`) zurück.

<details>
<summary>Erwartete Beobachtung</summary>

- Anders als im Copilot-Ask-Modus erfindet Codex in Schritt 1 selten Felder: Es öffnet `models.ts` meist selbst und nutzt die echten Namen. Der Verlauf zeigt die dafür nötigen Lese- und Suchschritte.
- Mit `@src/models.ts` fallen diese Suchschritte weg oder werden kürzer; das Ergebnis kommt schneller und mit weniger verbrauchtem Kontext.
- Schritt 3 nennt genau `open`, `in_progress`, `closed`.
- Schritt 4 nennt `models.ts` und `validators.ts`; Codex findet sie über eigene Suchbefehle, die im Verlauf stehen.
- In Read Only entsteht keine Änderung; erst in Auto schreibt Codex die Datei, `/diff` zeigt sie.

</details>

**Falls es hakt:** Heißen die Stufen in `/permissions` anders, die angezeigten Namen notieren und mit `/status` prüfen, welche Sandbox und Freigaberegel aktiv sind.

## Fazit

- In der IDE gehen offene Dateien automatisch mit; gezielt per `@`-Pfad, **Add to Codex Thread** oder Bild ergänzen.
- Codex sucht fehlenden Kontext selbst; ein `@`-Pfad spart Suchschritte und Kontext.
- Statt Ask/Plan/Agent: Read Only, `/plan`, Auto bzw. Ask for approval.

Weiter mit [03-befehle-und-konfiguration.md](03-befehle-und-konfiguration.md) (Copilot-Fassung: [../03-befehle-und-konfiguration.md](../03-befehle-und-konfiguration.md)): Slash-Befehle und `config.toml`.
