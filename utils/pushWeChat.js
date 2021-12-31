const { PUSH_URL } = require('../config')
const { formateLog, httpRequest } = require('./index')

const pushWeChat = async (content, token) => {
  const body = {
    token,
    title: '签到结果',
    content: `${content}`
  }
  const res = await httpRequest(PUSH_URL, {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    method: "POST"
  })
  const { code, msg } = res
  if (code === 200) {
    formateLog('签到消息推送成功')
  } else {
    formateLog(`签到消息推送失败 ${msg}`)
  }
  return res
}

module.exports = pushWeChat