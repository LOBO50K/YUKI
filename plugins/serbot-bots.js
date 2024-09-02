import ws from 'ws'
import fetch from 'node-fetch'

async function handler(m, { conn: _envio, usedPrefix }) {
const uniqueUsers = new Map()
  
global.conns.forEach((conn) => {
if (conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED) {
uniqueUsers.set(conn.user.jid.replace(/[^0-9]/g, ''), conn.user)}})

const message = Array.from(uniqueUsers.values()).map((user, index) => `┌  ✩  *${index + 1}* : @${user.jid.replace(/[^0-9]/g, '')}\n│  ✩  *Link* : http://wa.me/${user.jid.replace(/[^0-9]/g, '')}\n└  ✩  *Nombre* : ${user.name || 'Ai Hoshino'}\n`
  ).join('\n')
  
const replyMessage = message.length === 0 ? "" : message
const totalUsers = uniqueUsers.size;
const responseMessage = `${` –  *𝚂 𝚄 𝙱 𝙱 𝙾 𝚃 𝚂 - 𝙰 𝙲 𝚃 𝙸 𝚅 𝙾 𝚂*\n\n${replyMessage.trim()}`.trim()}`
  
let img = await (await fetch(`https://telegra.ph/file/9b1464be4d842309c3454.jpg`)).buffer()

await _envio.sendFile(m.chat, img, 'thumbnail.jpg', responseMessage, m, false, { mentions: _envio.parseMention(responseMessage) })
}
handler.command = ['listjadibot', 'bots']
handler.help = ['bots']
handler.tags = ['serbot']
export default handler
