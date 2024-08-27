import db from '../lib/database.js'
import { cpus as _cpus, totalmem, freemem, platform, hostname, version, release, arch } from 'os'
import speed from 'performance-now'
import { performance } from 'perf_hooks'
import { sizeFormatter } from 'human-readable'

let format = sizeFormatter({
    std: 'JEDEC',
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
})

let handler = async (m, { conn, usedPrefix }) => {
   let bot = global.db.data.settings[conn.user.jid]
   let _uptime = process.uptime() * 1000
   let uptime = (_uptime).toTimeString()
   let totalreg = Object.keys(global.db.data.users).length
   let totalbots = Object.keys(global.db.data.settings).length
   let totalStats = Object.values(global.db.data.stats).reduce((total, stat) => total + stat.total, 0)
   const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
   let totalchats = Object.keys(global.db.data.chats).length
   let totalf = Object.values(global.plugins).filter(
    (v) => v.help && v.tags
  ).length
   const groupsIn = chats.filter(([id]) => id.endsWith('@g.us')) //groups.filter(v => !v.read_only)
   const used = process.memoryUsage()
   const cpus = _cpus().map(cpu => {
      cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
      return cpu
   })
   const cpu = cpus.reduce((last, cpu, _, { length }) => {
      last.total += cpu.total
      last.speed += cpu.speed / length
      last.times.user += cpu.times.user
      last.times.nice += cpu.times.nice
      last.times.sys += cpu.times.sys
      last.times.idle += cpu.times.idle
      last.times.irq += cpu.times.irq
      return last
   }, {
      speed: 0,
      total: 0,
      times: {
         user: 0,
         nice: 0,
         sys: 0,
         idle: 0,
         irq: 0
      }
   })
   let _muptime
   if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
         process.once('message', resolve)
         setTimeout(resolve, 1000)
      }) * 1000
   }
   let timestamp = speed()
   let latensi = speed() - timestamp
   let teks = ` –  *𝙸 𝙽 𝙵 𝙾  -  𝙱 𝙾 𝚃*

 ᐳ  🂲  *𝚌𝚛𝚎𝚊𝚍𝚘𝚛* : @${owner[0][0].split('@s.whatsapp.net')[0]}
║  🂲  *𝚙𝚛𝚎𝚏𝚒𝚓𝚘* : [  ${usedPrefix}  ]
║  🂲  *𝚝𝚘𝚝𝚊𝚕 𝚙𝚕𝚞𝚐𝚒𝚗𝚜* : ${totalf}
║  🂲  *𝚙𝚕𝚊𝚝𝚊𝚏𝚘𝚛𝚖𝚊* : ${platform()}
║  🂲  *𝚜𝚎𝚛𝚟𝚒𝚍𝚘𝚛* : ${hostname()}
║  🂲  *𝚛𝚊𝚖* : ${format(totalmem() - freemem())} / ${format(totalmem())}
║  🂲  *𝚏𝚛𝚎𝚎𝚁𝚊𝚖* : ${format(freemem())}
║  🂲  *𝚜𝚙𝚎𝚎𝚍* : ${latensi.toFixed(4)} ms
║  🂲  *𝚞𝚙𝚝𝚒𝚖𝚎* : ${uptime}
║  🂲  *𝚖𝚘𝚍𝚘* : ${bot.public ? 'Privado' : 'Publico'}
║  🂲  *𝚌𝚘𝚖𝚊𝚗𝚍𝚘𝚜 𝚎𝚓𝚎𝚌𝚞𝚝𝚊𝚍𝚘𝚜* : ${toNum(totalStats)} ( *${totalStats}* )
║  🂲  *𝚐𝚛𝚞𝚙𝚘𝚜 𝚛𝚎𝚐𝚒𝚜𝚝𝚛𝚊𝚍𝚘𝚜* : ${toNum(totalchats)} ( *${totalchats}* )
 ᐳ   *𝚛𝚎𝚐𝚒𝚜𝚝𝚛𝚊𝚍𝚘𝚜* : ${toNum(totalreg)} ( *${totalreg}* ) Usuarios

 –  *𝙸 𝙽 𝙵 𝙾  -  𝙲 𝙷 𝙰 𝚃*

 ᐳ ✎  *${groupsIn.length}* Chats en Grupos
║  ✎  *${groupsIn.length}* Grupos Unidos
║  ✎  *${groupsIn.length - groupsIn.length}* Grupos Salidos
║  ✎  *${chats.length - groupsIn.length}* Chats Privados
 ᐳ  ✎  *${chats.length}* Chats Totales

*≡  _NodeJS Uso de memoria_*
${'```' + Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v => v.length)), ' ')}: ${format(used[key])}`).join('\n') + '```'}`
await conn.reply(m.chat, teks, m, { contextInfo: { mentionedJid: [owner[0][0] + '@s.whatsapp.net'], externalAdReply: { mediaUrl: false, mediaType: 1, description: false, title: '↷✦╎Info - Bot╎⭐˖ ⸙',body: false, previewType: 0, thumbnail: miniurl, sourceUrl: ''}}})
}
handler.help = ['info']
handler.tags = ['main']
handler.command = ['info', 'infobot']

export default handler

function toNum(number) {
    if (number >= 1000 && number < 1000000) {
        return (number / 1000).toFixed(1) + 'k'
    } else if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M'
    } else if (number <= -1000 && number > -1000000) {
        return (number / 1000).toFixed(1) + 'k'
    } else if (number <= -1000000) {
        return (number / 1000000).toFixed(1) + 'M'
    } else {
        return number.toString()
    }
}
