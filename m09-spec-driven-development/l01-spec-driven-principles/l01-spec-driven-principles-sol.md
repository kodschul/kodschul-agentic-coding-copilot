# Lab 9.1 – Lösung

## Aufgabe 1: Proposal

```markdown
# Proposal: Kommentare zu Blogposts

Nutzer sollen Kommentare zu einem Blogpost hinzufügen können, um
Diskussion und Feedback direkt am Artikel zu ermöglichen.
```

## Aufgabe 2: Spec (Auszug)

```markdown
# Spec: Kommentare zu Blogposts

## Datenmodell

- Comment: { id, postId, author, text, createdAt }

## Anforderungen

- Ein Kommentar mit leerem `text` wird abgelehnt (Validierungsfehler).
- Ein Kommentar mit `text` über 1000 Zeichen wird abgelehnt.
- Kommentare werden absteigend nach `createdAt` sortiert zurückgegeben.
```

## Aufgabe 3 & 4: Implementierung und Prüfung

Die generierte Implementierung enthält eine Validierungsschicht, die genau die beiden in der Spec benannten Randfälle (leerer Text, Text über 1000 Zeichen) prüft und mit einem Fehler ablehnt — nachvollziehbar direkt aus der Spec abgeleitet, nicht zufällig getroffen.
