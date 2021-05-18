const fs = require("fs")
const appRootPath = require("app-root-path")
const path = require("path")

let ids = []

try {
  ids = require("./data/clientIds.json").ids
} catch (err) {

}

module.exports.add = function(id) {
  if (!ids.includes(id)) {
    ids.push(id)
    save()
  }
}

function save() {

  const jsonPath = path.join(appRootPath.toString(),"data","clientIds.json")
  const dataToWrite = JSON.stringify({ids: ids})

  try {
    fs.writeFile(jsonPath,dataToWrite,"utf8", () => {})
  } catch (err) {
    console.log("err", err)
  }
  return true
}

module.exports.getAll = function() {
  return ids
}

module.exports.remove = function (id) {
  console.log("removeId", id)
  ids = ids.filter(item => item !== id)
  save()

}
