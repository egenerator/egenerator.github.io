const trans = require('./src/utils/translates')
const fs = require('fs')
var dict = {}
const z = console.log
const config = {}
const defaultDict = {}
const file = './jianggongshi.html'
fs.readFile(file, 'utf8', function (error, document) {
  if (error) {
    z({ error })
    return
  }
  ;(document + '').match(/(?=[\u4e00-\u9fa5])[0-9\u4e00-\u9fa5 A-Za-z（），。]+/g).forEach((elem) => {
    dict[elem] = elem
  })
  var keys = Object.keys(dict)
  keys.sort((a, b) => b.length - a.length)
  z(keys.length)
  let i = 0
  for (let key in dict) {
    i++
    setTimeout(() => {
      trans.trans(
        // keys.join('\n')
        key.replace(/_/g, ' '),
        function (params) {
          if (typeof params[0] != 'number') {
            let res = params
            // keys.forEach(function (tran, i) {
            //   let key = tran.replace(/ /g, '_')
            if (typeof defaultDict[key] == 'undefined') {
              dict[key] = res[key]
            }
            // })
            z({ res, dict })
          } else {
            z(params.join('\n'))
          }
        },
        config.to,
        config.from,
        'node'
      )
    }, 1100 * i)
  }
  setTimeout(() => {
    z({ dict })
    for (let key in keys) {
      document = document.replace(new RegExp(keys[key], 'g'), dict[keys[key]])
    }
    //rename file
    fs.writeFile(file.replace('.htm', '.en.htm'), document, 'utf8', function (error) {
      if (error) {
        z({ error })
        return
      }
    })
  }, keys.length * 1100 + 1000)
})
