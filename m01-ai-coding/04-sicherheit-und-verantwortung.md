# Sicherheit und Verantwortung

KI-generierter Code ist schnell da und sieht oft fertig aus. Verantwortlich bleibt trotzdem, wer ihn übernimmt und freigibt; dazu kommen Fragen zu Urheberrecht, Lizenzen und Datenschutz.

## Leitfragen

<details>
<summary>Wer haftet, wenn KI-generierter Code einen Schaden verursacht?</summary>

Wer den Code übernommen, reviewt und in Produktion gebracht hat. Die Werkzeugwahl ändert nicht, wer verantwortlich ist.

</details>

<details>
<summary>Ist KI-generierter Code grundsätzlich unsicherer als von Hand geschriebener?</summary>

Nicht grundsätzlich. Er kann aber unreflektiert riskante oder veraltete Muster reproduzieren, wenn niemand gezielt gegenprüft.

</details>

<details>
<summary>Was bedeutet "Code-Ownership" im Team?</summary>

Wer einen Commit erstellt oder freigibt, übernimmt die fachliche Verantwortung dafür, unabhängig vom Ursprung des Vorschlags.

</details>

<details>
<summary>Welche Daten verlassen bei einer Copilot-Anfrage den Rechner?</summary>

Der mitgeschickte Kontext: Anfrage, aktive Datei, Markierung, referenzierte Dateien. Was darin steht, geht an den Dienst.

</details>

## Ownership

| Begriff | Bedeutung |
| --- | --- |
| Ownership | Verantwortung für Korrektheit, Wartbarkeit und Sicherheit eines Code-Bestandteils |
| Review-Frage | konkrete, beantwortbare Frage an den Code statt "sieht gut aus" |

| Seite | Beispiel |
| --- | --- |
| Nützlich | schnelles Boilerplate, Vorschläge für unbekannte APIs |
| Riskant | Vorschläge werden unter Zeitdruck oft ungeprüft übernommen |

> **Merksatz:** "Die KI hat das vorgeschlagen" ist im Review kein Argument, nur eine Herkunftsangabe.

## Vier Risikoarten

| Risikoart | Woran erkennbar | Beispiel |
| --- | --- | --- |
| funktionale Fehler | Grenzfälle liefern falsche Ergebnisse | Rabatt "ab 100 €" als `> 100` |
| veraltete oder unsichere Muster | Verfahren "funktioniert", ist aber nicht mehr empfohlen | MD5 für Passwörter |
| Lizenzfragen | Code reproduziert nah lizenziertes Trainingsmaterial | längere, wörtlich übernommene Passagen |
| übersehene Edge Cases | Happy Path stimmt, Sonderpfade fehlen | Zugriff ohne angemeldete Person |

- Grüne Tests prüfen nur, was jemand getestet hat. Sicherheitseigenschaften (Hash-Verfahren, Salt) testet ein Login-Test nicht.
- Reviews, Tests und schriftliche Konventionen (Modul 4) fangen auf, was KI allein nicht garantiert.

## Urheberrecht und Lizenzen

| Frage | Kurz-Einordnung |
| --- | --- |
| Ist rein KI-generierter Code urheberrechtlich geschützt? | In Deutschland und der EU oft nicht: Schutz setzt eine persönliche geistige Schöpfung eines Menschen voraus (§ 2 Abs. 2 UrhG). Je mehr menschliche Gestaltung (Auswahl, Anpassung, Struktur) einfließt, desto eher entsteht Schutz für diesen Anteil. |
| Wer darf den Code nutzen? | Das regeln die Nutzungsbedingungen. GitHub beansprucht kein Eigentum an Ein- und Ausgaben; ob eine Ausgabe eine Drittlizenz braucht, muss die nutzende Person klären (GitHub Terms of Service, Abschnitt J.2). Business/Enterprise: GitHub Generative AI Services Terms bzw. Microsoft Product Terms (Stand: 10/2026, Quelle: https://docs.github.com/en/site-policy/github-terms/github-terms-of-service#j-ai-features und https://docs.github.com/en/site-policy/github-terms/github-terms-for-additional-products-and-features#github-copilot). |
| Kann generierter Code fremde Lizenzauflagen enthalten? | Ja, wenn er lizenziertes Trainingsmaterial nah reproduziert. Copilot bietet dafür einen Filter für Vorschläge, die öffentlichem Code entsprechen, und Code-Referenzen (Organisations- bzw. Kontoeinstellung). Im Zweifel prüfen, nicht annehmen. |

Diese Einordnung ist keine Rechtsberatung; verbindliche Aussagen für ein Unternehmen trifft die Rechtsabteilung.

## Haftung

- Verantwortlich ist, wer den Code freigibt und in Produktion bringt, unabhängig vom Werkzeug.
- Vertragliche und regulatorische Pflichten (z. B. Produkthaftung) ändern sich nicht dadurch, dass Code KI-unterstützt entstanden ist.

## Datenschutz: Privacy by Design

```
Anfrage an Copilot
  → welcher Kontext wird mitgesendet? (Dateien, Markierung)
  → enthält dieser Kontext personenbezogene oder vertrauliche Daten?
  → falls ja: Kontext einschränken, bevor die Anfrage gestellt wird
```

- Keine Zugangsdaten, `.env`-Inhalte oder Kundendaten in den Chat oder in referenzierte Dateien.
- Im Kurs gilt: FocusList arbeitet ausschließlich mit Beispieldaten ohne Personenbezug. Die Regel gilt auch für reale Projekte nach dem Kurs.

> **Merksatz:** Vor dem Referenzieren einer Datei prüfen, ob sie personenbezogene oder vertrauliche Daten enthält, nicht danach.

## Selbst ausprobieren

Material: [`../project/snippets/`](../project/snippets/), je in TypeScript und Python. Die erste Zeile jeder Snippet-Datei zeigt den Prompt, aus dem der Code entstanden ist.

### A: Passwort-Szenario (ca. 10 Min.)

1. Lies [`szenario-passwort-speicherung.md`](../project/snippets/szenario-passwort-speicherung.md): Ein Team hat KI-generierten Code zur Passwort-Speicherung ungeprüft übernommen.
2. Benenne mindestens zwei technische Risiken, je mit der Codezeile, die es verursacht.
3. Formuliere für jedes Risiko eine Review-Frage, die es vor dem Merge aufgedeckt hätte.
4. Entscheide in zwei Sätzen: Wer trägt die Verantwortung, die Entwicklerin, der genehmigende Kollege oder beide?

<details>
<summary>Antworten zum Passwort-Szenario</summary>

TS- und Python-Code haben dieselben Schwächen.

| # | Risiko | Zeile JS/TS | Zeile Python |
| --- | --- | --- | --- |
| 1 | **MD5 als Passwort-Hash:** schnell und für Passwörter ungeeignet; bekannte Passwörter lassen sich über Tabellen und Brute Force in kurzer Zeit zurückrechnen | `createHash("md5").update(password).digest("hex")` | `hashlib.md5(password.encode()).hexdigest()` |
| 2 | **Kein Salt:** gleiche Passwörter ergeben gleiche Hashes; `1234` steht in jeder Tabelle als `81dc9bdb52d04dc20036dbd8313ed055` | dieselbe Zeile, es fließt nur `password` ein | dieselbe Zeile |
| 3 | **Keine Längenprüfung:** `1234` oder `verein` werden akzeptiert | `hashPassword(password: string)` ohne Prüfung | `def hash_password(password: str)` ohne Prüfung |
| 4 | **Vergleich mit `===` / `==`:** nicht in konstanter Zeit (geringeres Risiko, aber Review-Punkt) | `hashPassword(password) === storedHash` | `hash_password(password) == stored_hash` |

Empfohlen sind langsame, gesalzene Verfahren wie Argon2id, scrypt oder bcrypt (Stand: 10/2026, Quelle: OWASP Password Storage Cheat Sheet, https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html).

**Review-Fragen**

1. "Welches Hash-Verfahren wird verwendet, und ist es für Passwörter aktuell empfohlen?"
2. "Wo kommt der Salt her, und ist er pro Passwort zufällig?"
3. "Was passiert bei einem Passwort mit 4 Zeichen, gibt es eine Mindestlänge?"
4. "Wird der Hash in konstanter Zeit verglichen?"

Grüne Tests beantworten keine dieser Fragen: Sie prüfen nur, dass der Login mit dem richtigen Passwort klappt.

**Verantwortung:** Beide, in unterschiedlicher Rolle. Die Entwicklerin hat den Vorschlag ohne Prüfung des Verfahrens übernommen; der Kollege hat mit "sieht gut aus" freigegeben, ohne Frage 1 zu stellen. Der Fehler liegt im übersprungenen Review-Schritt, nicht darin, dass eine KI beteiligt war.

</details>

<details>
<summary>Sichere Fassung (scrypt aus der Standardbibliothek)</summary>

Salt pro Passwort, Mindestlänge, Vergleich in konstanter Zeit. Gespeichert wird `salt:hash`.

```ts
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const MIN_LENGTH = 12;

export function hashPassword(password: string): string {
  if (password.length < MIN_LENGTH) {
    throw new Error(`Passwort muss mindestens ${MIN_LENGTH} Zeichen haben.`);
  }
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64);
  return `${salt.toString("hex")}:${hash.toString("hex")}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [saltHex, hashHex] = stored.split(":");
  const expected = Buffer.from(hashHex, "hex");
  const actual = scryptSync(password, Buffer.from(saltHex, "hex"), expected.length);
  return timingSafeEqual(actual, expected);
}
```

```python
import hashlib
import hmac
import os

MIN_LENGTH = 12


def hash_password(password: str) -> str:
    if len(password) < MIN_LENGTH:
        raise ValueError(f"Passwort muss mindestens {MIN_LENGTH} Zeichen haben.")
    salt = os.urandom(16)
    digest = hashlib.scrypt(password.encode(), salt=salt, n=2**14, r=8, p=1, dklen=64)
    return f"{salt.hex()}:{digest.hex()}"


def verify_password(password: str, stored: str) -> bool:
    salt_hex, hash_hex = stored.split(":")
    expected = bytes.fromhex(hash_hex)
    actual = hashlib.scrypt(
        password.encode(), salt=bytes.fromhex(salt_hex), n=2**14, r=8, p=1, dklen=len(expected)
    )
    return hmac.compare_digest(actual, expected)
```

Geprüft: Das richtige Passwort wird erkannt, ein falsches nicht, zweimal dasselbe Passwort ergibt durch den Salt verschiedene Hashes, `"1234"` wird mit `Passwort muss mindestens 12 Zeichen haben.` abgelehnt. Für Produktivsysteme die Parameter nach aktueller OWASP-Empfehlung wählen oder eine Argon2id-Bibliothek nutzen.

</details>

### B: Drei Snippets prüfen (ca. 12 Min.)

| Snippet | JS/TS | Python |
| --- | --- | --- |
| 1 Upload-Prüfung | [`snippet-1-upload.ts`](../project/snippets/snippet-1-upload.ts) | [`snippet-1-upload.py`](../project/snippets/snippet-1-upload.py) |
| 2 Warenkorbpreis | [`snippet-2-price.ts`](../project/snippets/snippet-2-price.ts) | [`snippet-2-price.py`](../project/snippets/snippet-2-price.py) |
| 3 Lösch-Berechtigung | [`snippet-3-auth.ts`](../project/snippets/snippet-3-auth.ts) | [`snippet-3-auth.py`](../project/snippets/snippet-3-auth.py) |

1. Lies alle drei Snippets im Stack der Durchführung und vergleiche jedes mit seinem Prompt. Notiere je Snippet einen konkreten Prüfpunkt (kein pauschales "sieht gut aus").
2. Formuliere für Snippet 2 eine Testeingabe, die laut Prompt ein anderes Ergebnis liefern müsste, und führe sie aus:
   - JS/TS (im Ordner `project/sample-project`, dort ist `tsx` installiert): `npx tsx -e 'import { totalPrice } from "../snippets/snippet-2-price.ts"; console.log(totalPrice([{ price: 50, quantity: 2 }]))'`
   - Python (im Ordner `project/snippets`): `uv run --no-project --python ">=3.11" python -c 'import importlib; m = importlib.import_module("snippet-2-price"); print(m.total_price([m.CartItem(50, 2)]))'`
3. Formuliere je eine Testeingabe mit erwartetem Ergebnis für Snippet 1 und Snippet 3.

**Falls es hakt:** Lässt sich der Befehl nicht ausführen (`npm install` in `sample-project` fehlt, `uv` nicht installiert), das Ergebnis von Hand durch den Code verfolgen.

<details>
<summary>Antworten zu den Snippets</summary>

Alle Ergebnisse sind ausgeführt (TS mit `tsx`, Python 3.11+); TS- und Python-Fassung verhalten sich gleich, außer wo angegeben.

| Snippet | Offensichtlich korrekt | Vor dem Commit prüfen |
| --- | --- | --- |
| 1 Upload (`isUploadAllowed` / `is_upload_allowed`) | Whitelist der Endungen, leere Datei (`0` Bytes) wird abgelehnt | Groß-/Kleinschreibung der Endung; keine Obergrenze für die Größe; Endung sagt nichts über den Inhalt; Datei ohne Punkt wird nur zufällig abgelehnt |
| 2 Preis (`totalPrice` / `total_price`) | Summe aus Preis × Menge, 10 % Rabatt | Grenze "ab 100 €" ist als `> 100` umgesetzt statt `>= 100`; negative Mengen werden nicht abgelehnt; Fließkomma-Rundung |
| 3 Löschen (`canDelete` / `can_delete`) | Admin darf alles, Mitglied nur eigene Dokumente | ohne angemeldete Person und Dokument ohne Besitzer ergibt der Vergleich `undefined === undefined` bzw. `None == None` → **erlaubt** |

**Snippet 2**

| Eingabe | Erwartet | Tatsächlich |
| --- | --- | --- |
| `[{ price: 50, quantity: 2 }]` / `[CartItem(50, 2)]` | `90` | `100` |
| `[{ price: 19.99, quantity: -3 }]` / `[CartItem(19.99, -3)]` | Fehler oder Ablehnung | `-59.97` |

Ursache: `sum > 100` (TS) bzw. `total > 100` (Python) statt `>= 100`. Korrektur: `return sum >= 100 ? sum * 0.9 : sum;` bzw. `return total * 0.9 if total >= 100 else total`.

**Snippet 1**

| Eingabe | Erwartet | Tatsächlich |
| --- | --- | --- |
| `("Foto.PNG", 2000)` | erlaubt | `false` / `False` (Endung `.PNG` nicht in der Liste) |
| `("foto.png", 5_000_000_000)` (5 GB) | abgelehnt | `true` / `True` (keine Obergrenze) |
| `("README", 10)` (ohne Endung) | abgelehnt | `false` / `False`, aber nur zufällig: `lastIndexOf(".")` bzw. `rfind(".")` liefert `-1`, verglichen wird das letzte Zeichen `"E"` |

**Snippet 3**

| Eingabe | Erwartet | Tatsächlich |
| --- | --- | --- |
| Python: `can_delete(None, Document("d1", None))` | abgelehnt | `True` |
| TS: `canDelete(undefined, JSON.parse('{"id":"d1"}'))` (Dokument aus JSON ohne `ownerId`) | abgelehnt | `true` |
| `can_delete(User("u1", "member"), Document("d1", "u2"))` | abgelehnt | `False` (korrekt) |

Im TS-Code verhindert der Typ `ownerId: string` den Fall nur zur Compile-Zeit; Daten aus einer Datenbank oder einem JSON-Request können das Feld trotzdem weglassen. Korrektur: zuerst `if (!user) return false;` bzw. `if user is None: return False`.

**Verantwortung bei Snippet 2:** Verantwortlich ist, wer den Code geprüft, committet und freigegeben hat; "die KI hat das geschrieben" verschiebt weder die fachliche noch die rechtliche Verantwortung.

</details>

## Fazit

- Ownership verschiebt sich nie auf das Werkzeug, nur die Fehlerquelle ändert sich.
- Konkrete Review-Fragen und Grenzwert-Eingaben finden, was grüne Tests übersehen.
- Rein KI-generierter Code ist oft nicht urheberrechtlich geschützt; Lizenzfragen im Zweifel prüfen.
- Vor jeder Anfrage klären, welcher Kontext mitgeht.

Weiter mit Modul 2: [Inline-Vorschläge](../m02-copilot-core-features/01-inline-vorschlaege.md).
