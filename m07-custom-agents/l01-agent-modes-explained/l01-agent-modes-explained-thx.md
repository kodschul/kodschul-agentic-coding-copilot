# Lab 7.1: Chat-Modus vs. Custom Agent vs. Subagent

Ziel: die Unterschiede zwischen einem normalen Chat-Modus, einem Custom Agent und einem Subagent erklären und begründen können, wann sich ein eigener Agent lohnt.

**Leitfragen:**

<details>
<summary>Warum reicht ein normaler Chat-Modus nicht für jede Aufgabe?</summary>

Ein normaler Chat-Modus hat Zugriff auf alle Tools und kein festgelegtes Rollenverhalten — für eine eng begrenzte, wiederkehrende Rolle (z. B. "nur Tests schreiben") ist das oft zu offen.

</details>

<details>
<summary>Was macht einen Custom Agent aus?</summary>

Ein eigener Systemprompt plus explizit eingeschränkte Tool-Rechte, die das Verhalten auf eine bestimmte Rolle fokussieren.

</details>

<details>
<summary>Was unterscheidet einen Subagent von einem Custom Agent?</summary>

Ein Subagent wird von einem anderen Agenten (oder Prompt) aufgerufen, um eine abgegrenzte Teilaufgabe zu erledigen, und meldet ein Ergebnis zurück, statt direkt mit dem Nutzer zu interagieren.

</details>

## Begriffe & Mentales Modell

- **Chat-Modus:** offener Dialog mit vollem Werkzeugzugriff, keine feste Rolle.
- **Custom Agent (`*.agent.md`):** eigener Systemprompt + eingeschränkte Tools für eine feste Rolle.
- **Subagent:** ein Agent, der von einem anderen Agenten/Prompt für eine Teilaufgabe aufgerufen wird.

## Wann welches Werkzeug

- Chat-Modus: einmalige, offene Fragen ohne feste Rolle.
- Custom Agent: wiederkehrende, klar abgegrenzte Rolle (z. B. "schreibt nur Tests").
- Subagent: eine Teilaufgabe innerhalb eines größeren, orchestrierten Ablaufs.

## Beispiel

Ein "Explain-only"-Agent hat nur Lesezugriff und keine Editier-Tools — er kann Code erklären, aber nicht versehentlich ändern. Ein normaler Chat-Modus hätte dieselbe Aufgabe erledigen können, aber ohne die eingebaute Garantie, dass nichts geändert wird.

**Erwartetes Ergebnis:** der Explain-only-Agent verweigert oder ignoriert Änderungsanfragen, ein normaler Chat-Modus würde sie ausführen.

## Grenzen

Zu viele eingeschränkte Tools können einen Agenten für seine eigentliche Aufgabe untauglich machen — die Tool-Auswahl muss zur Rolle passen.

## Checkpoint & Brücke zur Übung

Checkpoint: Kannst du in einem Satz sagen, wann ein Custom Agent gegenüber einem normalen Chat-Modus sinnvoll ist? Die Übung baut einen ersten eigenen Agenten.
