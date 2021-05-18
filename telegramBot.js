const apiKeyJson = require("./data/apiKey.json")
const TelegramBot = require("node-telegram-bot-api")
const clientIdStore = require("./clientIdStore")
const checkData = require("./checkData")



module.exports.sendAll = function (message) {
  for (let id of clientIdStore.getAll()) {
    bot.sendMessage(id, message);
  }
}

module.exports.send = function (chatId, message) {
  bot.sendMessage(chatId, message);
}

const bot = new TelegramBot(apiKeyJson.telegramToken, {polling: true});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const newClient = clientIdStore.add(chatId)
  console.log(msg)
  if (newClient) {
     bot.sendMessage(chatId, welcomeMessage);  
   } else {
     if (msg.text == "/exit") {
       
      bot.sendMessage(chatId,"OK, bye. Es werden keine Nachrichten mehr gesendet, bis du dich wieder meldest")
      clientIdStore.remove(chatId)
     } else { 
      checkData.status(chatId) 
    }
   }
});

const welcomeMessage = `Hallo,\n
  Dieser Bot informiert über neue Termine in den Corona Impfzentren in Sachsen und bedient sich dabei
  an den Daten von https://www.countee.ch/app/de/counter/impfee/_iz_sachsen .\n
  Die eigentliche Anmeldung zu Terminen findet auf https://sachsen.impfterminvergabe.de statt
  Immer wenn neue Termine eingestellt werden und es mehr als 10 neue am Stück sind, wird eine Benachrichtigung
  versendet.\n
  Schicke dem Bot eine beliebige Nachricht um eine Übersicht über die aktuellen Terminzahlen zu bekommen.
  Lösche den Bot aus deinen Kontakten um keine Nachrichten mehr zu bekommen

`