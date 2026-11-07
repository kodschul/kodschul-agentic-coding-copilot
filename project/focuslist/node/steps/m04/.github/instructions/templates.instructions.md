---
applyTo: "src/views/**"
---

# Regeln für Views (HTML-Templates)

- Eine View ist eine Funktion, die einen HTML-String zurückgibt; Seiten nutzen `layout({ title, body })` aus `layout.js`.
- Views lesen keine Dateien und rufen keinen Store auf; alle Daten kommen als Parameter.
- Wiederkehrende Teile (Badge, Listeneintrag, Filter-Link) als kleine Funktion in derselben Datei.
- Styling nur mit Tailwind-Utility-Klassen, kein eigenes CSS, keine `style`-Attribute.
- Farben: Priorität hoch = rot, mittel = gelb, niedrig = grau; Hauptaktion = `indigo-600`.
- Tailwind-Klassen immer vollständig ausschreiben, nie aus Teilen zusammensetzen (`bg-${farbe}-100` findet Tailwind nicht).
- Formulare mit `method="post"`, Aktionen als eigene Route (`/tasks/<id>/<aktion>`).
- Alle sichtbaren Texte auf Deutsch.
