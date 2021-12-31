/** 推送URL */
const PUSH_URL = 'http://www.pushplus.plus/send'

/** 掘金签到URL */
const JUEJIN_URLS = {
  "getTodayStatus": "https://api.juejin.cn/growth_api/v1/get_today_status",
  "checkIn": "https://api.juejin.cn/growth_api/v1/check_in",
  "getLotteryConfig": "https://api.juejin.cn/growth_api/v1/lottery_config/get",
  "drawLottery": "https://api.juejin.cn/growth_api/v1/lottery/draw"
}

const userList = {
  "name": "juejinUpdateInfo",
  "userList": [
    {
      "id": 1,
      "userName": "北笑",
      "query": {
        "aid": process.env.AID,
        "uuid": process.env.UUID,
        "_signature": process.env.SIGNATURE
      },
      "headers": {
        "accept": "*/*",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
        "cache-control": "no-cache",
        "content-type": "application/json",
        "pragma": "no-cache",
        "sec-ch-ua": "\"Google Chrome\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "cookie": process.env.COOKIE,
        "Referer": "https://juejin.cn/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "push_token": process.env.PUSHTOEKN
    }
  ]
}

module.exports = {
  PUSH_URL,
  JUEJIN_URLS,
  userList
}