# Chat und Kontext

Copilot Chat arbeitet mit dem Kontext, der mit der Anfrage mitgeht: implizit (aktive Datei, Markierung) und explizit über `#`-Referenzen. Der gewählte Modus legt fest, ob der Chat nur antwortet, plant oder Dateien ändert.

## Leitfragen

<details>
<summary>Woher weiß der Chat, welcher Code gemeint ist, wenn die Frage keine Datei nennt?</summary>

Aus der gerade aktiven Datei und einer Markierung, die automatisch mitgeschickt werden. Alles andere muss die Frage ausdrücklich referenzieren, sonst rät das Modell.

</details>

<details>
<summary>Wie bekommt eine Frage den Inhalt einer Datei mit, die gerade nicht geöffnet ist?</summary>

Über eine Referenz im Eingabefeld: `#` gefolgt vom Dateinamen, per Drag & Drop oder über **Add Context**. Die Datei wird dann vollständig mitgeschickt.

</details>

<details>
<summary>Soll der Chat nur antworten oder gleich Dateien ändern dürfen?</summary>

Das hängt von der Aufgabe ab. Dafür gibt es Modi: Ask beantwortet nur Fragen, Plan schreibt einen Umsetzungsplan, Agent ändert Dateien und führt Befehle aus.

</details>

<details>
<summary>Warum kann zu viel mitgeschickter Kontext die Antwort verschlechtern?</summary>

Irrelevanter Kontext verdünnt das Signal und verbraucht Platz im Context Window ([LLM-Grundlagen](../m01-ai-coding/01-llm-grundlagen.md)); die Antwort wird allgemeiner.

</details>

## Chat öffnen

| Aktion | macOS | Windows / Linux |
| --- | --- | --- |
| Chat-Ansicht öffnen | Ctrl+Cmd+I | Ctrl+Alt+I |
| Neuer Chat | Cmd+N (in der Chat-Ansicht) | Ctrl+N (in der Chat-Ansicht) |
| Inline-Chat im Editor oder Terminal | Cmd+I | Ctrl+I |
| Quick Chat | Shift+Option+Cmd+L | Ctrl+Shift+Alt+L |

Stand: 10/2026, Quelle: https://code.visualstudio.com/docs/copilot/reference/copilot-vscode-features

## Kontext-Referenzen

| Referenz | Bindet ein | Sinnvoll, wenn … |
| --- | --- | --- |
| implizit | aktive Datei bzw. Markierung, als Chip im Eingabefeld sichtbar und abwählbar | die Frage sich auf das offene Stück Code bezieht |
| `#file:<pfad>` oder `#<dateiname>` | eine bestimmte Datei vollständig | die Datei nicht offen ist oder eindeutig gemeint sein muss |
| `#selection` | nur den markierten Abschnitt | eine gezielte Frage zu wenigen Zeilen gestellt wird |
| `#codebase` | Suchtreffer aus dem ganzen Workspace, nicht den ganzen Code | unklar ist, wo etwas liegt ("Wo wird X verwendet?") |
| mehrere `#file` | mehrere Dateien | die Antwort Bezug zwischen Dateien braucht, z. B. Modell + Validierung |

- `#codebase` sucht relevante Stellen (Prinzip RAG) und schickt nur die Treffer mit.
- `@workspace` ist ein älterer Chat-Teilnehmer mit ähnlicher Wirkung. Chat-Teilnehmer mit `@name` sind laut VS-Code-Doku als veraltet markiert; in neuen Anfragen `#codebase` nutzen.
- `#` im Eingabefeld zeigt alle verfügbaren Kontext-Elemente und Werkzeuge der installierten Version; die vollständige Liste steht im [M2-Cheatsheet](m02-cheatsheet.md).

Stand: 10/2026, Quelle: https://code.visualstudio.com/docs/copilot/chat/copilot-chat-context

## Chat-Modi: Ask, Plan, Agent

Der Modus wird im Auswahlfeld unter dem Chat-Eingabefeld gewählt.

| Modus | Was er tut | Ändert Dateien? | Geeignet für |
| --- | --- | --- | --- |
| Ask | beantwortet Fragen, recherchiert im Code, nur lesende Werkzeuge | nein | Erklären, Vergleichen, Vorschau eines Entwurfs |
| Plan | recherchiert und schreibt einen Umsetzungsplan zur Prüfung, im Copilot-Chat auch per `/plan` | nein | größere Änderungen vorab durchdenken |
| Agent | ändert Dateien, führt Befehle aus und prüft das Ergebnis | ja, Änderungen erscheinen als Diff mit **Keep**/**Undo** | Umsetzen über mehrere Dateien |
| Edit (veraltet) | früherer Modus für Mehrdatei-Änderungen ohne Werkzeuge | ja | ersetzt durch Agent; nur noch über `chat.editMode.hidden` einblendbar |

Stand: 10/2026, Quelle: https://code.visualstudio.com/docs/copilot/agents/local-agents. Namen und Umfang der Modi ändern sich mit VS-Code-Versionen; vor dem Kurs in der installierten Version prüfen. Ab Modul 3 arbeitet der Kurs im Agent-Modus.

## Beispiel: dieselbe Frage mit und ohne Referenz

Datei [`sample-project/src/models.ts`](../project/sample-project/src/models.ts) (Python: [`sample/models.py`](../project/sample-project-python/sample/models.py)):

```ts
export type TicketPriority = "low" | "medium" | "high";
export type TicketStatus = "open" | "in_progress" | "closed";

export interface Ticket {
  id: string;
  title: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  assignee?: string;
}
```

| Anfrage (Ask-Modus, keine Datei offen) | Feldnamen in der Antwort (Beispiel) |
| --- | --- |
| `Wie sollte validateTicket in src/validators.ts aussehen?` | erfunden, z. B. `subject`, `description`, `severity`; der TS-Code kompiliert nicht (`Property 'subject' does not exist on type 'Partial<Ticket>'`) |
| `#file:src/models.ts Wie sollte validateTicket in src/validators.ts aussehen?` | `id`, `title`, `priority`, `status`, `createdAt`, erlaubte Werte aus `TicketPriority`/`TicketStatus`; `assignee` zu Recht nicht als Pflicht |

Referenzen ersetzen keine klare Frage: Eine unklare Frage bleibt auch mit guter Referenz unklar beantwortet.

## Selbst ausprobieren

Projekt: [`../project/sample-project/`](../project/sample-project/) bzw. [`../project/sample-project-python/`](../project/sample-project-python/) (Python: `sample/models.py`, `sample/validators.py`, Funktion `validate_ticket`).

1. Schließe alle Editoren, wähle **Ask** und frage: `Wie sollte validateTicket in src/validators.ts aussehen?` Notiere die Feldnamen.
2. Stelle in einem neuen Chat dieselbe Frage mit `#file:src/models.ts` am Anfang und vergleiche die Feldnamen mit dem echten Modell.
3. Markiere in `models.ts` nur die Zeile mit `TicketStatus` und frage: `#selection Welche Werte muss eine Prüfung hierfür akzeptieren?`
4. Frage: `#codebase Wo wird TicketPriority verwendet?`
5. Wechsle in den Modus **Agent**: `#file:src/models.ts Implementiere validateTicket in src/validators.ts.` Prüfe den Diff und verwirf ihn mit **Undo**.

**Erwartete Beobachtung:** Ohne Referenz erfindet die Antwort Felder, mit `#file` nutzt sie die echten. `#selection` nennt genau `open`, `in_progress`, `closed`. `#codebase` nennt `models.ts` und `validators.ts`, auch wenn sie nicht offen sind. Nur der Agent-Modus ändert die Datei und zeigt einen Diff.

**Falls es hakt:** Fehlt der Modus-Wähler oder heißen die Modi anders, Version prüfen (**Hilfe → Info**) und die Namen der installierten Version notieren.

## Fazit

- Implizit gehen nur aktive Datei und Markierung mit; alles andere explizit mit `#file`, `#selection` oder `#codebase` referenzieren.
- So viel Kontext wie nötig, nicht wie möglich.
- Ask erklärt, Plan plant, Agent ändert Dateien.

Weiter mit [03-befehle-und-konfiguration.md](03-befehle-und-konfiguration.md): Slash-Befehle und Einstellungen.
