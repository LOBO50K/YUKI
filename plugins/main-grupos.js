import fetch from 'node-fetch'

let handler  = async (m, { conn, usedPrefix, command }) => {
let img = await (await fetch(`https://telegra.ph/file/9340dacd5759506e2a2a8.jpg`)).buffer()
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
let txt = `*𝙷𝚘𝚕𝚊!, 𝚃𝚎 𝚒𝚗𝚟𝚒𝚝𝚘 𝚊 𝚞𝚗𝚒𝚛𝚝𝚎 𝚊 𝚕𝚘𝚜 𝚐𝚛𝚞𝚙𝚘𝚜 𝚘𝚏𝚒𝚌𝚞𝚊𝚕𝚎𝚜 𝚍𝚎 𝚕𝚊 𝙱𝚘𝚝 𝚙𝚊𝚛𝚊 𝚌𝚘𝚖𝚟𝚒𝚟𝚒𝚛 𝚌𝚘𝚗 𝚕𝚘𝚜 𝚒𝚗𝚝𝚎𝚐𝚛𝚊𝚗𝚝𝚎𝚜 :D*

1-Grupo
𝙽𝙰𝙺𝙰𝙽𝙾 𝙱𝙾𝚃 𝙼𝙳
*✰* ${group}

*─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ*

➠ 𝙴𝚗𝚕𝚊𝚌𝚎 𝚊𝚗𝚞𝚕𝚊𝚍𝚘? 𝚎𝚗𝚝𝚛𝚎 𝚊𝚚𝚞𝚒

2.-Canal :
➸𝙽𝙰𝙺𝙰𝙽𝙾 𝙲𝙰𝙽𝙰𝙻
*✰* ${canal}

> 🚩 ${textbot}`
await conn.sendFile(m.chat, img, "Thumbnail.jpg", txt, m, null, rcanal)
}
handler.help = ['grupos']
handler.tags = ['main']
handler.command = /^(grupos)$/i
export default handler
