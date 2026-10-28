# Szenario: Passwort-Speicherung

Ein kleines Team baut ein Mitgliederportal für einen Sportverein. Für die Registrierung fehlt noch das Speichern der Passwörter. Eine Entwicklerin bittet den KI-Assistenten im Chat: "Schreibe eine Funktion, die ein Passwort sicher für die Datenbank aufbereitet, und eine, die es beim Login prüft." Der Vorschlag kommt in wenigen Sekunden, die Login-Tests laufen grün, der Code wird übernommen.

Im Review schaut ein Kollege auf den Pull Request, sieht kurze, lesbare Funktionen und grüne Tests und genehmigt mit "sieht gut aus". Eine Nachfrage zum Verfahren gibt es nicht. Der Code geht am selben Tag live.

Drei Monate später taucht eine Kopie der Nutzertabelle in einem Forum auf. Innerhalb eines Tages sind die meisten Passwörter im Klartext bekannt, darunter viele Einträge wie `1234` oder `verein`. Mehrere Mitglieder nutzen dasselbe Passwort auch für ihr E-Mail-Konto.

## Übernommener Code (TypeScript)

```ts
import { createHash } from "node:crypto";

export function hashPassword(password: string): string {
  return createHash("md5").update(password).digest("hex");
}

export function verifyPassword(password: string, storedHash: string): boolean {
  return hashPassword(password) === storedHash;
}
```

## Übernommener Code (Python)

```python
import hashlib


def hash_password(password: str) -> str:
    return hashlib.md5(password.encode()).hexdigest()


def verify_password(password: str, stored_hash: str) -> bool:
    return hash_password(password) == stored_hash
```
