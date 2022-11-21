let dict = {}
const z = console.log
const keys = Object.keys(dict)
z(keys.length)
//sort by length
const fs = require('fs')
fs.readFile('./index.htm', 'utf8', function (error, document) {
  if (error) {
    z({ error })
    return
  }
  for (let key in keys) {
    document = document.replace(new RegExp(keys[key], 'g'), dict[keys[key]])
  }
  fs.writeFile('./index.htm', document, 'utf8', function (error) {
    if (error) {
      z({ error })
      return
    }
  })
})
