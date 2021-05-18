const telegramBot = require("./telegramBot")

const center = []

module.exports.update = (data) => {
  // only notify if there are a plenty of new seats. 
  // a add of 1 only sends notification spam 
  const discardSmallValue = 10 

  if (data) {
    const name = data.name
    const items = data.counteritems || []
    const openSeats = items[0] ? items[0].val : 0

    const seatsBefore = center[name] || 0
    const seatsDiff = openSeats - seatsBefore

    if (center[name]) { // no spam at statup
      if (openSeats > seatsBefore+discardSmallValue) { // send only for valueable changes
        const message = seatsDiff+" neue Plätze in "+name+", insgesamt "+openSeats
        if (name == "Dresden IZ") {
          telegramBot.sendAll("<b>"+message+"</b>")
        } else {
          telegramBot.sendAll(message)
        }
      }
    }

    if (openSeats != seatsBefore) {
      center[name] = openSeats
    }
  }
}


module.exports.status = function(chatId) {

  let ret = "So sieht es aus:\n"
  if (center) {
    // ret+= JSON.stringify(center)
    for (let name in center) {
      
      ret+=center[name]+" Plätze in "+name+"\n"
    }
  }
  ret += `\n Die Daten von Countee sind leider nicht immer synchron zu den Impfzentren. Selbst wenn 
  bei Countee Termine angezeigt werden, kann die Terminvergabe den Tag als ausgebucht melden.`
  console.log("status send",chatId,ret)
  telegramBot.send(chatId,ret)
}