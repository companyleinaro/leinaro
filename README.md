# Leinaro

Statische, responsive Unternehmenswebsite für Leinaro. Die Website benötigt keinen Build-Schritt und kann direkt mit der VS-Code-Erweiterung **Live Server** geöffnet werden.

## Struktur

- `index.html` – Startseite
- `ueber-uns.html`, `leistungen.html`, `webdesign.html`, `betreuung.html`, `domain-hosting.html`, `seo.html` – Unternehmens- und Leistungsseiten
- `referenzen.html` sowie die zwei Projektseiten – Referenzen
- `faq.html`, `kontakt.html`, `impressum.html`, `datenschutz.html` – Service- und Rechteseiten
- `css/style.css` – gesamte Gestaltung in einer Datei
- `js/script.js` – mobile Navigation, mobile Akkordeons, Datenschutzhinweis und Bewegungssteuerung
- `images/` – hier kommen Logo, Portrait, Projektfotos und das optionale Hero-Video hinein

## Aktuelles Designsystem

Die neun neuen Startseitenmotive vom 16. Oktober 2026 sind in
`images/STARTSEITEN-BILDER.md` zugeordnet. Die Originalkopien liegen als PNG vor;
die Seite lädt ausschließlich die komprimierten WebP-Varianten mit `srcset`.
Für „Nicht einfach nur online“ ist die Variante ohne `_3` ausgewählt.
Der Bildplatzhalter bei „Digitales Handwerk“ ist durch das gelieferte Motiv ersetzt.
Abschnitt 13 in der CSS-Datei hält die neuen Bildmotive vollständig sichtbar.

Die Gestaltung verbindet die klare Basis von ameisenhaufen.at mit kräftigen
Farbakzenten und Interaktionen, inspiriert von den gelieferten Rittler-Beispielen.
Die vorgegebene Palette besteht aus Korallrosa (#F34F7E) als Hauptfarbe, Lime
(#C8DF70) als Kontrast, Dunkel (#17191C), Hellgrau (#F3F4F6) und Weiß (#FFFFFF).
Abgeleitete neutrale Grautöne gliedern Text, Linien und dunkle Abschnitte.
Große Überschriften, Lesetexte und Links sowie kompakte Abstände bleiben
erhalten. Alle 15 Seiten nutzen css/style.css. Der Header ist auf allen Seiten einheitlich, einschließlich Leistungsmenü und Kontaktbutton. Eine stabile Scrollleistenbreite verhindert seitliche Verschiebungen beim Seitenwechsel. Outline-Pink-Paare wiederholen den Schriftstil des Startseiten-Heros in Seitenköpfen und ausgewählten Abschnitten.

Die Seiten, Abschnittsfolge, Leistungen und Kontaktfunktionen bleiben erhalten.
Der Startseiten-Hero zeigt images/optimized/startseite-hero-farben-1200.webp vollflächig, auch mobil. Outline-Titel und Pink stehen mit dem Einführungstext mittig über dem Bild. Der Header ist beim Einstieg dunkel und wechselt beim Scrollen zur hellen Navigation; Abmessungen und Menüpunkte bleiben identisch. Der rotierende Projektkreis verlinkt am unteren Bildrand zur Kontaktseite. Die bisherigen Hero-Buttons entfallen. Eine Laufschrift und sanfter Textglanz ergänzen die Animationen. Beim Scrollen blenden Inhalte ein und
Linien im Ablauf bauen sich auf. Buttons reagieren leicht auf den Mauszeiger;
Bilder, Portrait und FAQ-Antworten erhalten zusätzliche Übergänge.
Bei reduzierter Bewegung im Betriebssystem bleiben die Inhalte statisch
und vollständig sichtbar. Ohne JavaScript sind alle Inhalte direkt lesbar.
Hover- und Tastaturfokus-Effekte färben Schriften, Buttons und Bildflächen.
Der Kontaktbereich zeigt das vorhandene Portrait, kräftige Kontaktkarten
und ein reduziertes Formular. Projekte und ihre Links bleiben direkt sichtbar.
Das aktuelle Logo liegt in `images/leinaro-logo-2026-v2.svg` und wird unverändert mit seinen Originalfarben in Navigation und Footer verwendet. Im Browser-Tab wird die gelieferte Version mit weißem Hintergrund (`images/leinaro-favicon-weiss-v2.svg`) verwendet. Vor dem dunklen Hero-Hintergrund sorgt eine helle Fläche für Lesbarkeit.
Poppins wird lokal aus fonts/ geladen (Regular 400, Medium 500, SemiBold 600, Bold 700, ExtraBold 800 und Black 900). Große Überschriften verwenden ExtraBold/Black, Outline-Akzente ExtraBold und Lesetexte Regular/Medium. Die SIL Open Font License liegt in fonts/OFL.txt. Es werden keine externen Schriftdienste geladen.

### Bilder ergänzen

Neutrale, beschriftete Bildplatzhalter stehen an folgenden Stellen:

- Startseite, „Digitales Handwerk“: eigenes Arbeitsplatz- oder Arbeitsfoto.
- Startseite, Neuburger-Projekt: echte Werkstatt- oder Projektaufnahme.
- Neuburger-Detailseite: große Projektaufnahme oder Website-Screenshot.

Die Platzhalter sind echte HTML-Elemente mit der Klasse image-placeholder;
der Hinweis nennt jeweils das passende Bild. Sie können später durch ein
img-Element ersetzt werden. Die übrigen Motive stammen aus images/ und
bleiben austauschbar. Bestehende Originaldateien sind erhalten.

Die lokale Strukturprüfung ./tools/validate-site.ps1 kontrolliert die
HTML-Verschachtelung, doppelte IDs, lokale Dateien/Sprungziele und CSS-Bildpfade.

## Code in VS Code bearbeiten

Die mobile Leseführung steht im Abschnitt **11. Responsive** von `css/style.css`.
Bis 600 px Breite werden Leistungsbausteine und Arbeitsschritte über native
`details`/`summary`-Elemente aufklappbar. `js/script.js` nutzt dafür dieselben
Inhalte und stellt auf größeren Bildschirmen die ursprüngliche Struktur wieder her.
Ohne JavaScript bleiben alle Erläuterungen sichtbar. Die Kernaussagen sind gekürzt;
Leseschrift, Abstände und Formulare wurden für die mobile Darstellung abgestimmt.

Für dieses Projekt sind einheitliche Formatierungsregeln hinterlegt. VS Code empfiehlt beim
ersten Öffnen automatisch die Erweiterung **Prettier – Code formatter**.

- Beim Speichern werden HTML, CSS, JavaScript und JSON automatisch formatiert.
- Eine Datei kann jederzeit manuell mit `Shift + Alt + F` formatiert werden.
- Die Regeln liegen in `.prettierrc.json`.
- Die VS-Code-Einstellungen befinden sich in `.vscode/settings.json`.

Die Hauptbereiche der CSS-Datei sind durch nummerierte Kommentare getrennt. Dadurch lassen sich
Navigation, Hero, Komponenten, Animationen und responsive Regeln schneller wiederfinden.

## Vor dem Livegang

1. Bildplatzhalter durch echte Bilder im Ordner `images/` ersetzen und Alt-Texte ergänzen.
2. Das Kontaktformular versendet per `fetch` über Web3Forms, ohne die Seite zu verlassen. Den hinterlegten Access Key im Web3Forms-Konto prüfen und einen echten Testversand durchführen. Die Empfängeradresse wird durch diesen Key bestimmt. Die Bestätigung erscheint im Formular; eine automatische Bestätigungs-E-Mail an Besucher ist nicht eingerichtet. Offline-Fehler und Pflichtfelder ebenfalls testen. Lokale Logiktests ohne E-Mail-Versand: `node tools/test-contact-form.cjs`.
3. Impressum und Datenschutzerklärung rechtlich prüfen und fehlende Firmenangaben ergänzen.
4. `leinaro.at` als Hauptdomain und `www.leinaro.at` in Vercel verbinden und anschließend `https://leinaro.at/sitemap.xml` in der Google Search Console einreichen. Für die vorbereiteten Weiterleitungen auch `itsolutions-leitner.at` und `www.itsolutions-leitner.at` am selben Vercel-Projekt belassen bzw. verbinden. DNS und HTTPS müssen für die beteiligten Domains eingerichtet sein.

## SEO und Hauptdomain

Die Hauptadresse ist `https://leinaro.at/`. Alle 11 indexierbaren Seiten haben einen
eigenen Canonical und stehen in der Sitemap, einschließlich der Hairdesign-Referenz.
Die Projektübersicht und die Startseite verlinken die Hairdesign-Detailseite direkt. Neuburger ist vorübergehend entfernt; die bisherige Adresse leitet nach dem Deployment zur Projektübersicht weiter.
Impressum, Datenschutz und die Dankeseite behalten ihre vorhandene `noindex`-Einstellung.
`vercel.json` bereitet dauerhafte Weiterleitungen der alten Domain und der www-Varianten
auf die Hauptdomain sowie von `/index.html` auf `/` vor. Die Domain-Weiterleitungen
werden erst nach Deployment und korrekter Domain-Anbindung wirksam; sie ändern kein DNS.

## Veröffentlichung

Die Dateien in ein Git-Repository legen, auf GitHub pushen und das Repository in Vercel importieren. Bei einem Push auf `main` kann Vercel automatisch neu deployen.

## Datenschutzhinweis – 9. November 2026

„Verstanden“ speichert die Bestätigung browserlokal ohne Ablaufdatum. Der Hinweis bleibt auf allen Unterseiten und bei Wiederbesuchen geschlossen. Rücksetzen über „Datenschutz-Einstellungen“ im Footer. Escape schließt ohne Speicherung. Test: `node tools/test-cookie-note.cjs [Pfad-zu-playwright]`.
