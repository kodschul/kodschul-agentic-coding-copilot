# Lab 10.2 – Lösung

## Aufgabe 1-3: Beispielhafte Auswahl für ein Wetter-Dashboard-Projekt

1. **Gezielte Kontextreferenzen:** verhindert, dass Copilot bei jeder Anfrage irrelevante, unrelated Dashboard-Widgets mitreferenziert.
2. **Wenige, konkrete Instructions:** eine erste Regel könnte lauten: "API-Client-Funktionen in `src/api/` werfen bei einem HTTP-Fehler immer eine typisierte `ApiError`, nie `null`."
3. **Skills für wiederkehrende Aufgaben:** eine Skill "neues Dashboard-Widget hinzufügen" würde die wiederkehrende Struktur (Datenquelle → Komponente → Test) absichern, ähnlich wie `add-focuslist-action` in diesem Kurs.

## Aufgabe 4: Bewusst nicht priorisierter Punkt

MCP-Anbindung (Modul 8) wäre für ein reines Frontend-Dashboard ohne externe Datenintegration zunächst nicht nötig — sie sollte erst eingeführt werden, wenn tatsächlich eine externe Datenquelle jenseits der ohnehin genutzten Wetter-API angebunden werden muss.

## Fazit

Die Reihenfolge der Best Practices sollte sich immer am tatsächlichen Bedarf des jeweiligen Projekts orientieren, nicht an der Reihenfolge dieses Kurses.
