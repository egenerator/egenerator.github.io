module.exports = {
  cross,
  trans,
  httpstrans,
}
// var lastword = ''
const z = console.log
// import { MD5 } from './tools'
const Tools = require('./tools')
const https = require('https')
// require('fast-text-encoding')
function trans(params, callback, to = 'en', from = 'auto', node) {
  // console.log(from, to)
  httpstrans(params, from, to, node)
    .then(callback)
    .catch((error) => {
      console.error(error)
      z('statusCode: ' + error.statusCode + '  ' + error.statusMessage)
    })
}
function cross(url, deal = (d) => Tools.Uint8(d), method = 'GET', node) {
  var options = {
    path: url,
    method: method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'Content-Length': 100
    },
  }
  if (node) {
    options.hostname = 'api.fanyi.baidu.com'
  }
  return new Promise((resolve, reject) => {
    httpreq(
      options,
      (d) => {
        resolve(deal(d))
        console.log(deal(d))
      },
      reject
    )
  })
}
function httpstrans(query, from, to, node) {
  if (!query) return
  query = query.toString()
  query = query.replace(/#/g, '＃')
  var appid = '20210319000733704'
  var key = 'P6MLnbpUPi5IgHkRu79L'
  var salt = new Date().getTime()
  var q = encodeURI(query) // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
  var str1 = appid + query + salt + key
  var sign = Tools.MD5(str1)
  const path =
    '/api/trans/vip/translate?q=' +
    q +
    '&from=' +
    from +
    '&to=' +
    to +
    '&appid=' +
    appid +
    '&salt=' +
    salt +
    '&sign=' +
    sign +
    '&action=' +
    1
  // var options = {
  //     path: path,
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //         // 'Content-Length': data.length
  //     }
  // }
  // return new Promise((resolve, reject) => {
  //     httpreq(options, d => {
  //         let res = dealtrans(d)
  //         resolve(res)
  //     }, reject)

  // })
  return cross(path, dealtrans, 'POST', node)
}
function httpreq(options, callback, reject) {
  const req = https.request(options, (res) => {
    if (res.statusCode != 200) {
      console.error(`CONNETCTION FAIL
url: ${options.path}
statusCode: ${res.statusCode}`)
      reject(res)
    }
    res.on('data', callback)
  })
  req.on('error', (error) => {
    console.error('error', error)
    reject(error)
  })
  req.end()
}
function dealtrans(d) {
  let baidu = Tools.Uint8(d)
  let translation = {}
  if (baidu.trans_result) {
    baidu.trans_result.forEach((e) => {
      translation[e.src] = aftertrans(e.dst)
    })
  } else if (baidu.error_code) {
    translation.error_code = Number(baidu.error_code)
    switch (baidu.error_code) {
      case '52000':
        translation.error_message = '成功;'
        break
      case '52001':
        translation.error_message = '请求超时; \n请重试'
        break
      case '52002':
        translation.error_message = '系统错误; \n请重试'
        break
      case '52003':
        translation.error_message = '未授权用户; \n请检查您的appid是否正确，或者服务是否开通'
        break
      case '54000':
        translation.error_message = '必填参数为空; \n请检查是否少传参数'
        break
      case '54001':
        translation.error_message = '签名错误; \n请检查您的签名生成方法'
        break
      case '54003':
        translation.error_message = '请求过于频繁, 请稍后再试'
        break // '访问频率受限; \n请降低您的调用频率，或进行身份认证后切换为高级版/尊享版'); break;
      case '54004':
        translation.error_message = '账户余额不足; \n请前往管理控制台为账户充值'
        break
      case '54005':
        translation.error_message = '长query请求频繁; \n请降低长query的发送频率，3s后再试'
        break
      case '58000':
        translation.error_message =
          '客户端IP非法; \n检查个人资料里填写的IP地址是否正确，可前往开发者信息-基本信息修改，可前往开发者信息-基本信息修改'
        break
      case '58001':
        translation.error_message = '译文语言方向不支持; \n请检查译文语言是否在语言列表里'
        break
      case '58002':
        translation.error_message = '服务当前已关闭; \n请前往管理控制台开启服务'
        break
      case '90107':
        translation.error_message = '认证未通过或未生效; \n请前往我的认证查看认证进度'
        break
      case '517':
        translation.error_message = '未知错误'
        break
      default:
        translation.error_message = baidu.error_msg
        console.log('新错误:', baidu.error_code)
        console.log(baidu.error_msg)
        break
    }
    translation.error_message = '; \n' + baidu.error_msg
  } else {
    translation.error_message = 40000
    translation.error_message = JSON.stringify(baidu)
    console.log(baidu)
    try {
      process.stdout.write(d)
    } catch (error) {}
  }
  return translation
}
function aftertrans(txt) {
  return txt
    .replace("'", '’')
    .replace('"', '“')
    .replace(/经销商/g, '品牌商')
}
