# Lab 5.2: Eine eigene Skill für FocusList schreiben

**Leitfragen:**

<details>
<summary>Woran erkennt Copilot, dass eine Skill zur aktuellen Anfrage passt?</summary>

Am Feld `description` im Kopf der `SKILL.md`. Copilot vergleicht die Anfrage mit dieser Beschreibung und lädt den Rest der Datei nur bei Bedarf.

</details>

<details>
<summary>Was gehört in eine Skill, was in `copilot-instructions.md`?</summary>

Instructions sind Regeln, die immer gelten. Eine Skill ist ein Ablauf für eine bestimmte, wiederkehrende Aufgabe und wird nur geladen, wenn diese Aufgabe ansteht.

</details>

<details>
<summary>Warum liegt neben der `SKILL.md` noch eine Vorlagendatei?</summary>

Eine Skill ist ein Ordner. Vorlagen, Skripte oder Beispiele daneben werden aus der `SKILL.md` verlinkt und nur gelesen, wenn der Ablauf sie braucht.

</details>

- Jede neue FocusList-Aktion folgt demselben Ablauf: Modell prüfen, Aktion schreiben, CLI verdrahten, Test schreiben, prüfen.
- Die Skill `add-focuslist-action` hält diesen Ablauf fest, damit Copilot ihn bei jeder neuen Aktion gleich ausführt.

## Aufbau einer Skill

```text
.github/skills/
└── add-focuslist-action/          # Ordnername = name im Kopf
    ├── SKILL.md                   # Pflicht: Kopf + Ablauf
    └── action-template.ts         # optional: Vorlage, aus SKILL.md verlinkt
```

| Feld im Kopf | Pflicht | Regel |
| --- | --- | --- |
| `name` | ja | nur Kleinbuchstaben, Ziffern, Bindestriche; muss dem Ordnernamen entsprechen, sonst lädt die Skill nicht |
| `description` | ja | was die Skill tut **und** wann sie greift, max. 1024 Zeichen; das ist der Auslöser |
| `argument-hint` | nein | Hinweistext beim Aufruf als `/add-focuslist-action` |
| `user-invocable` | nein | `false` blendet die Skill im `/`-Menü aus, Copilot lädt sie weiter automatisch |
| `disable-model-invocation` | nein | `true` erlaubt nur den manuellen Aufruf über `/` |

Speicherorte im Projekt: `.github/skills/`, `.claude/skills/` oder `.agents/skills/`. Persönliche Skills: `~/.copilot/skills/`.

## Die fertige Skill

Die Skill für FocusList (JS/TS-Fassung; Python: [Referenz](../../project/focuslist-reference-python/.github/skills/add-focuslist-action/SKILL.md)):

```markdown
---
name: add-focuslist-action
description: Fügt FocusList eine neue CLI-Aktion hinzu, z. B. "Priorität ändern"
  oder "Aufgabe umbenennen". Verwenden, wenn eine neue Aktion, ein neuer
  Unterbefehl oder eine neue Operation auf Tasks gebaut werden soll.
---

# Neue FocusList-Aktion hinzufügen

1. **Datenmodell prüfen:** neues Feld in `src/models/task.ts` nur optional (`?`).
2. **Aktion schreiben:** `src/actions/<aktion>.ts` nach [action-template.ts](./action-template.ts),
   Eingaben über `src/actions/validation.ts` prüfen, Fehler als `Error` werfen.
3. **CLI verdrahten:** `case` in `src/cli.ts` ergänzen, `USAGE` erweitern.
4. **Test schreiben:** Erfolgsfall und Fehlerfall in `tests/actions/<aktion>.test.ts`.
5. **Prüfen:** `npm run lint` und `npm test`; erst fertig melden, wenn beides grün ist.
```

| Teil | Wirkung |
| --- | --- |
| "Verwenden, wenn …" in `description` | nennt die Auslöser; ohne diesen Satz lädt Copilot die Skill seltener |
| nummerierte Schritte | feste Reihenfolge, nichts wird vergessen (z. B. der Test) |
| Verweis auf `action-template.ts` | Copilot liest die Vorlage nur, wenn Schritt 2 ansteht |
| Schritt 5 | Copilot prüft das Ergebnis selbst, statt "fertig" nur zu behaupten |

## Gute und schwache Beschreibungen

| `description` | Problem |
| --- | --- |
| `Hilft bei FocusList.` | passt auf jede Anfrage, sagt nicht wann |
| `Neue Aktion.` | zu knapp, Wörter wie "Unterbefehl" oder "Befehl" lösen nicht aus |
| `Fügt FocusList eine neue CLI-Aktion hinzu … Verwenden, wenn …` | nennt Aufgabe und Auslöser |

> **Merksatz:** Die `description` entscheidet, ob eine Skill geladen wird. Der Rest der Datei entscheidet, wie gut das Ergebnis wird.

## Prüfen, ob die Skill greift

| Prüfung | Woran erkennbar |
| --- | --- |
| Skill wird gefunden | `/skills` im Chat zeigt `add-focuslist-action` |
| Skill wird automatisch geladen | die aufgeklappten Tool-Aufrufe der Antwort zeigen einen Lesezugriff auf `SKILL.md` |
| Skill wird befolgt | Ergebnis enthält Test und CLI-Eintrag, Lint und Tests laufen grün |
| Skill manuell auslösen | `/add-focuslist-action Priorität ändern` |

## Grenzen

- Eine Skill garantiert keine Ausführung: Copilot kann sie übersehen, wenn die Anfrage anders formuliert ist als die `description`.
- Ein Name mit Punkt, Doppelpunkt oder Schrägstrich lässt die Skill ohne Fehlermeldung nicht laden.
- Projektregeln (z. B. "Fehler als `Error` werfen") gehören zusätzlich in `copilot-instructions.md`; die Skill verweist nur darauf.

## Fazit

- Eine Skill ist ein Ordner mit `SKILL.md`; `name` muss dem Ordnernamen entsprechen.
- Die `description` sagt, was die Skill tut und wann sie greift.
- Der letzte Schritt einer guten Skill prüft das Ergebnis selbst.

In der Übung entsteht `add-focuslist-action`, und FocusList bekommt damit die Aktion "Priorität ändern" (v2).
