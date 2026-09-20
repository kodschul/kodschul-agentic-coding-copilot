# Lab 5.1 – Lösung

## Aufgabe 1 & 2: `SKILL.md`

```markdown
---
name: add-rest-endpoint
description: Legt einen neuen REST-Endpoint nach dem Projektschema an.
---

# Neuen REST-Endpoint anlegen

1. Definiere das Request-/Response-Schema in `schemas/`.
2. Lege die Route in `routes/` an und verknüpfe sie mit dem Schema.
3. Ergänze eine Validierungsschicht, die das Schema gegen die Eingabe prüft.
4. Schreibe mindestens einen Positiv- und einen Validierungsfehler-Test.
```

## Aufgabe 3 & 4: Vergleich zweier Endpoints

`GET /widgets` und `POST /orders` folgen beide derselben Reihenfolge (Schema → Route → Validierung → Test) und derselben Dateiaufteilung (`schemas/widget.ts` + `schemas/order.ts`, `routes/widgets.ts` + `routes/orders.ts`) — trotz unterschiedlicher fachlicher Inhalte ist die Struktur identisch, weil beide über dieselbe Skill entstanden sind.

## Fazit

Ohne Skill hätten beide Endpoints vermutlich unterschiedliche Reihenfolgen oder eine fehlende Validierungsschicht bei einem der beiden erhalten — die Skill erzwingt die Wiederholbarkeit der Struktur.
