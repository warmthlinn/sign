const { JUEJIN_URLS } = require('../config')
const { formateLog, httpRequest } = require('./index')
const qs = require('querystring')
const pushWeChat = require('./pushWeChat')

class JuejinSign {
  constructor({query, headers, push_token, userName}) {
    this.query = query
    this.headers = headers
    this.token = push_token
    this.userName = userName
    this.checkIn()
  }
  // 查询今天是否已经签到
  async getTodayCheckStatus () {
    const res = await httpRequest(JUEJIN_URLS['getTodayStatus'], { headers: this.headers, method: 'get' })
    const { err_no, data } = res
    if (err_no) { formateLog(`${this.userName} 今日掘金签到查询：失败, ${res}`) }
    return data
  }

  // 获取今天的免费抽奖次数
  async getTodayDrawStatus () {
    const res = await httpRequest(JUEJIN_URLS['getLotteryConfig'], { headers: this.headers, method: 'get' })
    const { err_no, data: { free_count } } = res
    return err_no ? 0 : free_count
  }
  
  // 抽奖
  async draw () {
    const freeCount = await this.getTodayDrawStatus()
    if (!freeCount) return formateLog(`${this.userName} 今天没有免费抽奖次数`)
    const res = await httpRequest(JUEJIN_URLS['drawLottery'], { method: 'post', headers: this.headers })
    const { err_no, data, err_msg } = res
    if (err_no) return formateLog(`${this.userName} 免费抽奖失败 ${err_msg}`)
    return formateLog(`恭喜${this.userName}免费抽到：${data.lottery_name}`)
  }
  /** 签到 */
  async sign () {
    const isCheck = await this.getTodayCheckStatus()
    /** 已签到 */
    if (isCheck) return formateLog(`${this.userName} 今日已签到`)
    /** 未签到 */
    const res = await httpRequest(`${JUEJIN_URLS['checkIn']}?${qs.stringify(this.query)}`, {
      headers: this.headers,
      method: "POST"
    })
    const { err_no, err_msg, data } = res
    if (err_no) {
      return formateLog(`${this.userName} 签到失败: ${err_msg}`)
    }
    return formateLog(`${this.userName} 签到成功！当前矿石数量：${data.sum_point}`)
  }

  async checkIn () {
    /** 签到 */
    const signRes = await this.sign()
    /** 抽奖 */
    const drawRes = await this.draw()
    /** 微信推送消息 */
    pushWeChat(`${signRes} ${drawRes}`, this.token)
    return signRes + drawRes
  }
}

module.exports = JuejinSign