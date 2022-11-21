const trans = require('./src/utils/translates')
const fs = require('fs')
var dict = {}
const z = console.log
const config = {}
fs.readFile('./index.htm', 'utf8', function (error, document) {
  if (error) {
    z({error})
  } else {
    // z('File read',document)
    dict = new Map(
      (document + '').match(/(?=[\u4e00-\u9fa5])[0-9\u4e00-\u9fa5 A-Za-z（）]+/g).map((v) => {
        if (isNaN(v)) {
          return [v]
        } else {
          return [undefined]
        }
      })
    )
    z(dict)
    trans.trans(
      [...dict.keys()].join('\n').replace(/_/g, ' '),
      function (params) {
        if (typeof params[0] != 'number') {
          let res = params
          ;[...dict.keys()].forEach(function (tran, i) {
            let key = tran.replace(/ /g, '_')
            if (typeof dict[key] == 'undefined') {
              dict[key] = res[i]
            }
          })
          z({res,dict})
        } else {
          z(params.join('\n'))
        }
      },
      config.to,
      config.from,
      'node'
    )
  }
})
