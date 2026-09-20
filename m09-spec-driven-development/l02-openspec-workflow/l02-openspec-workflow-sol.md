# Lab 9.2 – Lösung

## Aufgabe 1: `openspec/archive/sort-by-due-date/proposal.md` & `spec.md`

```markdown
# Proposal: Aufgaben nach Fälligkeitsdatum sortieren

Nutzer sollen `list-tasks` optional nach Fälligkeitsdatum aufsteigend
sortiert abrufen können, um dringende Aufgaben zuerst zu sehen.
```

```markdown
# Spec: sort-by-due-date

## Anforderungen

- Aufgaben mit `dueDate` werden aufsteigend danach sortiert.
- Aufgaben ohne `dueDate` erscheinen am Ende der Liste, unabhängig von
  ihrer sonstigen Reihenfolge.
- Die Sortierung ändert keine gespeicherten Daten, nur die Ausgabe.
```

## Aufgabe 3: `src/actions/sort-by-due-date.ts`

```ts
export function sortByDueDate(tasks: Task[]): Task[] {
  const withDate = tasks.filter((t) => t.dueDate);
  const withoutDate = tasks.filter((t) => !t.dueDate);
  withDate.sort((a, b) => a.dueDate!.localeCompare(b.dueDate!));
  return [...withDate, ...withoutDate];
}
```

## Aufgabe 4: Ergebnis

Getestet mit einer gemischten Liste (zwei Aufgaben mit `dueDate`, eine ohne) liefert die Funktion die beiden datierten Aufgaben korrekt sortiert, gefolgt von der undatierten Aufgabe am Ende — die Spec-Anforderung ist erfüllt. Die Spec wird nach `openspec/archive/sort-by-due-date/` verschoben; `recurring-tasks` (in-progress) und `bulk-complete-tasks` (proposed) bleiben als Platzhalter für die anderen Dashboard-Stadien. FocusList erreicht damit v7.
