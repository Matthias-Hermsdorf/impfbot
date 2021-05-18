# Impfbot

[@MhImpfBot](https://t.me/MhImpfBot) bei Telegram nutzt diesen Code.
Schreibe diesem Bot, um Benachrichtungen zu erhalten oder clone dieses Repository um einen eigenen Impfbot zu betreiben

## Beweggründe

Das [sächsische Portal zur Impfterminvergabe](https://sachsen.impfterminvergabe.de/) bietet leider keine Benachrichtigungsfunktion bei neuen Impfterminen, aber auch keine öffentlich zugängliche API.

[Impfee bei Countee](https://www.countee.ch/app/de/counter/impfee/_iz_sachsen) bietet eine Übersicht über alle Termine in allen sächsischen Impfzentren, aber auch keine Benachrichtigung.

Damit müssen alle Impfwilligen permanent das Terminvergabeportal wegen neuen Terminen anfragen und dieses antwortet wird dabei überlastet.

Der Impfbot liest die API von Countee aus und merkt sich die Werte pro Impfzentrum. Wenn die Anzahl der Termine steigt, schickt ein Telegram Bot eine Nachricht an alle Subscriber. 


## Kommandos für den Bot 

Es gibt folgende Commands für den Bot

* /status - der Bot antwortet mit einer Übersicht über die offenen Termine. 
* /exit - löscht die ChatId aus der Liste der Subscriber und beendet die Benachrichtungen. 


## Installation

1. Clone das Repository
1. installiere die Abhängigkeiten

        npm i 

1. Lege einen Telegram Bot beim Botfather an. Lies dazu die [Botfather Doku](https://core.telegram.org/bots#botfather).

1. Mit diesem Api Token vom Bot muss die Datei /data/apiKey.json angelegt werden. Diese hat den Aufbau

        {
          "telegramToken": "deinToken"
        }

  
1. Ist diese Datei angelegt, kann der Server gestartet werden

        node app.js

oder 
        npm run start

Für eine Produktivumgebungbietet sich auch [pm2](https://www.npmjs.com/package/pm2) an. Die entsprechende ecosystem.config.js liegt bei

        // optional
        pm2 start ecosystem.config.js
        pm2 save

1. Sende /status an deinen Bot