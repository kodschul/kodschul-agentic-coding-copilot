# Lab 1.2 – Lösung

## Aufgabe 1: Risiken

- **Veraltetes Verfahren:** der Schnipsel nutzt vermutlich ein unsicheres Hash-Verfahren (z. B. unsalted MD5) statt eines etablierten, für Passwörter geeigneten Verfahrens.
- **Fehlende Eingabevalidierung:** keine Prüfung auf leere oder übermäßig lange Passwort-Eingaben vor dem Hashing.

## Aufgabe 2: Review-Fragen

- "Welches Hash-/Salt-Verfahren wird hier verwendet, und ist es für Passwörter aktuell empfohlen?"
- "Was passiert bei einer leeren oder extrem langen Eingabe — gibt es eine Längenbegrenzung?"

## Aufgabe 3: Verantwortung

Beide Rollen tragen Verantwortung, aber in unterschiedlicher Weise: die Person, die den Vorschlag generiert hat, trägt Verantwortung dafür, ihn nicht ungeprüft zu übernehmen; die reviewende Person trägt die Verantwortung, genau die in Aufgabe 2 formulierten Fragen tatsächlich zu stellen, bevor sie den Merge freigibt. Der eigentliche Fehler im Szenario liegt darin, dass dieser Review-Schritt übersprungen wurde — nicht darin, dass eine AI beteiligt war.
