# Best Practices

## Kontext bewusst steuern

- Bei wachsendem Kontextbedarf gezielt `#file`/`#selection` statt impliziten Workspace-Kontext nutzen, da explizite Referenzen reproduzierbarer sind als implizit mitgeladener Editor-Zustand (Modul 2).

## Ownership nie an das Modell abgeben

- Jede AI-generierte Änderung vor der Übernahme lesen und bewerten: die Verantwortung für Korrektheit, Sicherheit und Wartbarkeit bleibt bei der Person, die den Code freigibt (Modul 1).
- Ungewöhnliche oder nicht angefragte fachliche Entscheidungen im generierten Code als Warnsignal behandeln, nicht als Zusatzleistung (Modul 3).

## Leitplanken schriftlich fixieren statt wiederholt zu erklären

- Wiederkehrende Konventionen in `copilot-instructions.md` statt in jedem Prompt neu zu formulieren: das reduziert Prompt-Länge und sorgt für konsistente Ergebnisse über die Zeit (Modul 4).
- Regeln so konkret formulieren, dass sie in einem Diff überprüfbar sind (z. B. "Aktionen werfen `Error`, nie `null`"), statt vage Stilwünsche zu äußern, die nicht objektiv prüfbar sind (Modul 4).

## Werkzeug passend zur Aufgabenart wählen

- Eine Skill für mehrstufige, wiederkehrende Aufgaben nutzen, einen Prompt für einmalig auslösbare Vorlagen mit Variablen, und Instructions für dauerhafte Repo-Regeln — die drei Mechanismen sind nicht austauschbar (Modul 4, Modul 5, Modul 6).
- Einen Custom Agent nur einsetzen, wenn eine feste Rolle mit eingeschränktem Werkzeugzugriff einen echten Sicherheits- oder Fokusvorteil bringt, nicht als Ersatz für einen einfachen Prompt (Modul 7).

## Automatisierung schrittweise einführen

- Neue Hooks zunächst als warnend statt blockierend einführen, um Fehlalarme zu erkennen, bevor ein Hook Commits verhindern kann (Modul 8).
- Eine MCP-Anbindung erst nach einem erfolgreichen lokalen Testlauf des Servers im Chat verwenden, um Fehlkonfigurationen früh zu erkennen (Modul 8).

## Spezifikation vor Implementierung bei größeren Änderungen

- Für Features, die mehrere Dateien oder Verhaltensänderungen betreffen, zuerst eine Spec schreiben und prüfen, statt direkt zu implementieren: das reduziert nachträgliche Fehlinterpretationen des Auftrags (Modul 9).
- Abgeschlossene Specs archivieren (`openspec/archive/`), damit spätere Änderungen an derselben Fläche den ursprünglichen Entscheidungsgrund nachvollziehen können (Modul 9).

## Rückblick als Diff-Denken statt Bauchgefühl

- Den eigenen Fortschritt anhand der Versionskette (v0 → v7) bewerten: konkret benennen, was sich an der Interaktion mit Copilot geändert hat, nicht nur was zusätzlich existiert (Modul 10).
- Feedback auf konkrete Module/Übungen beziehen statt auf den Kurs pauschal, damit es umsetzbar bleibt (Modul 10).
