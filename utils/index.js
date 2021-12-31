const request = require('request')
/**
 * @description 获取起止数字之间的数
 * @param { Number } min 最小数
 * @param { Number } max 最大数
 * @returns { Number }
 */
const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * @description 获取年月日
 */
const getDayMonthYear = () => {
  const curDay = new Date(Date.now() + 24 * 3600000)
  const day = curDay.getDate()
  const month = curDay.getMonth() + 1
  const year = curDay.getFullYear()
  return { day, month, year }
}
/**
 * @description 设置随机时间触发
 * @returns { String }
 */
const getRandomTime = () => {
  const { day } = getDayMonthYear()
  // 秒的范围 0 到 59 秒
  const secondRang = [0, 59]
  // 分钟的范围 0 到 59 分钟
  const minuteRang = [0, 59]
  // 小时的范围 8 到 10 点
  const hourRang = [8, 9]
  const second = getRandomValue(...secondRang)
  const minute = getRandomValue(...minuteRang)
  const hour = getRandomValue(...hourRang)
  return `${second} ${minute} ${hour} ${day} * *`
}

const formateLog = content => {
  console.log(`${new Date() }: ${content}`)
  return content
}

const httpRequest = (url, config = {}) => {
  return new Promise((resolve, reject) => {
    request(url, config, (err, _, res) => {
      if (err) return reject(err)
      try {
        resolve(JSON.parse(res))
        formateLog(`${url} -> success: ${res}`)
      } catch (error) {
        reject(error)
        formateLog(`${url} -> fail: ${error}`)
      }
    })
  })
}
module.exports = {
  getRandomTime,
  formateLog,
  httpRequest
}
