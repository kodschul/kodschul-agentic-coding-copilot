# Lab 10.2: Best Practices, Token-/Kontext-Management & Ausblick

Ziel: die wichtigsten Best Practices für Token-/Kontext-Management benennen und einordnen können, wie sich Copilot-Fähigkeiten voraussichtlich weiterentwickeln.

**Leitfragen:**

<details>
<summary>Warum kann "mehr Kontext" manchmal schlechter statt besser sein?</summary>

Weil ein begrenztes Kontextfenster mit irrelevanten Informationen gefüllt wird, was die Präzision der Antwort verschlechtern kann, statt sie zu verbessern (siehe Modul 1/2).

</details>

<details>
<summary>Was ist eine praktische Faustregel für Instructions-Länge?</summary>

Wenige, konkrete, prüfbare Regeln statt einer langen Liste allgemeiner "Best Practices" — konsistent mit dem in Modul 4 gelernten Prinzip.

</details>

<details>
<summary>Wie sollte man mit neuen Copilot-Features umgehen, die während dieses Kurses noch nicht existierten?</summary>

Dieselben Bewertungskriterien anwenden wie im ganzen Kurs: Baseline ohne die neue Fähigkeit, Problem sichtbar machen, dann gezielt einführen — statt jedes neue Feature ungeprüft zu übernehmen.

</details>

## Begriffe & Mentales Modell

- **Kontextfenster:** begrenzte Menge an Text, die ein Modell gleichzeitig berücksichtigen kann.
- **Token-Ökonomie:** bewusster Umgang mit Kontextgröße, um Präzision und Kosten im Gleichgewicht zu halten.

## Best-Practice-Zusammenfassung aus dem Kurs

- Gezielte Kontextreferenzen (Modul 2) statt pauschal alles offen zu halten.
- Wenige, konkrete Instructions (Modul 4) statt langer Regellisten.
- Skills/Prompts für wiederkehrende Aufgaben (Modul 5/6), statt jede Anfrage neu zu formulieren.
- Agenten mit eingeschränkten Rechten (Modul 7) für klar abgegrenzte Rollen.
- Automatisierung (Modul 8) als Absicherung, nicht als Ersatz für Review.
- Spec-First (Modul 9) für Features mit echten Randfällen.

## Beispiel

Ein Team, das versucht, ALLE Projektdateien gleichzeitig als Kontext zu referenzieren, erhält oft unschärfere Antworten als ein Team, das gezielt 2-3 relevante Dateien referenziert.

**Erwartetes Ergebnis:** eine gezielte, kleine Kontextauswahl liefert im direkten Vergleich eine präzisere Antwort als eine übermäßig große.

## Grenzen

Diese Best Practices sind ein Startpunkt, kein abschließendes Regelwerk — neue Copilot-Features können bestehende Empfehlungen verändern.

## Checkpoint & Brücke zur Übung

Checkpoint: Kannst du drei der sechs Best-Practice-Punkte auf ein neues, fiktives Projekt anwenden? Die Übung prüft das konkret.
