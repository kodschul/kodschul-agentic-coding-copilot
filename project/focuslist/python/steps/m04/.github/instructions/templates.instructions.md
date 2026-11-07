---
applyTo: "focuslist/templates/**"
---

# Regeln für Templates

- Jede Seite erweitert `base.html` (`{% extends "base.html" %}`) und füllt nur `{% block content %}`.
- Ausgabe immer über `{{ … }}` mit dem automatischen Escaping von Jinja2. Nie `|safe` oder `Markup` für Werte, die aus Formularen, URL-Parametern oder `data/tasks.json` stammen.
- Keine Logik im Template außer Schleifen, Bedingungen und Anzeige-Zuordnungen (z. B. Priorität → Farbe).
- Styling nur mit Tailwind-Utility-Klassen. Kein `style="…"`, keine `<style>`-Blöcke, keine neuen CSS-Dateien.
- Farben für Priorität: hoch `bg-red-100 text-red-700`, mittel `bg-yellow-100 text-yellow-800`, niedrig `bg-slate-200 text-slate-700`.
- Formulare mit `method="post"` und Ziel per `url_for(...)`; Buttons mit sichtbarem deutschem Text.
- Jedes Eingabefeld hat ein `<label>` oder ein `aria-label`.
- Sichtbare Texte auf Deutsch.
