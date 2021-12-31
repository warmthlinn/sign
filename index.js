const JueJinSignIn = require('./utils/sign')
const schedule = require('node-schedule');
const {
  getRandomTime,
  formateLog
} = require('./utils/index')
const {
  userList
} = require('./config/index.js')
const scheduleCronstyle = () => {
  // 先执行一次
  init()
  // 生成下次执行时间
  const implementTime = getRandomTime()
  formateLog(`下次签到时间: ${implementTime}`)
  const timers = schedule.scheduleJob(implementTime, () => {
    scheduleCronstyle()
    timers && timers.cancel()
  });
}
// scheduleCronstyle();
init();
function init() {
  /** 触发掘金签到 */
  [userList].forEach(item => new JueJinSignIn(item))
}
// 更新？？？
