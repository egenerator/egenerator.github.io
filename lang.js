const trans = require('./src/utils/translates')
const fs = require('fs')
var dict = {}
const z = console.log
const config = {}
const defaultDict = {}
fs.readFile('./index.htm', 'utf8', function (error, document) {
  if (error) {
    z({ error })
    return
  }
  ;(document + '').match(/(?=[\u4e00-\u9fa5])[0-9\u4e00-\u9fa5 A-Za-z（），。]+/g).forEach((elem) => {
    dict[elem] = elem
  })
  z(dict)
  let i = 0
  for (let key in dict) {
    i++
    setTimeout(() => {
      trans.trans(
        // Object.keys(dict).join('\n')
        key.replace(/_/g, ' '),
        function (params) {
          if (typeof params[0] != 'number') {
            let res = params
            // Object.keys(dict).forEach(function (tran, i) {
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
})
z({ dict })
