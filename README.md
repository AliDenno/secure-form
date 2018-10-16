Benötigte Module:
- OpenPGP.js
-- Neueste Version kann gefunden werden auf: https://github.com/openpgpjs/openpgpjs
-- Die folgende Datei sollte verwendet werden: dist/openpgp.min.js

Datei Inhalt:
- Examples.html: Ein einfaches HTML-Formular, das das Verschlüsseln von Text und Dateien ermöglicht
-- Der Abschnitt "Encrypt text" verschlüsselt den Text und stellt den verschlüsselten Text im selben Textbereich zur Verfügung
-- Der andere Textbereich entschlüsselt den Text, der dort eingefügt wird
-- Der Abschnitt "Encrypt Attachement" verschlüsselt Anhänge und stellt den verschlüsselten Text im Textbereich zur Verfügung
-- In dem anderen Abschnitt wird der verschlüsselte Text, der hinzugefügt wird, entschlüsselt [Im Moment gibt es hier ein Problem]

- encryptText.js: Javascript-Datei, die die Funktionalität zum Verschlüsseln von Text bietet
-- Der öffentliche Schlüssel (Public key) sollte hier angegeben werden

- decryptText.js: Javascript-Datei, die die Funktionalität zum Entschlüsseln von Text bietet
-- Privater Schlüssel (Private key) sollte hier bereitgestellt werden

- encryptAttachment.js: Javascript-Datei, die die Funktionalität zum Verschlüsseln von Anhängen bietet
-- Der öffentliche Schlüssel (Public key) sollte hier angegeben werden

- decryptAttachment.js: Javascript-Datei, die die Funktionalität zum Entschlüsseln von Anhängen bietet
-- Privater Schlüssel (Private key) sollte hier bereitgestellt werden


Resources:

https://github.com/openpgpjs/openpgpjs#lookup-public-key-on-hkp-server

https://scotthelme.co.uk/creating-a-pgp-contact-form/

https://aaronhorler.com/articles/openpgpjs.html

https://blog.castiel.me/posts/2016-11-16-play-with-cryptography-with-openpgpjs/

https://github.com/eligrey/FileSaver.js
