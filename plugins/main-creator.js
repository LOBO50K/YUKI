let handler = async (m, { conn, usedPrefix, isOwner }) => {
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;𝕃𝕆𝔹𝕆;;\nFN:𝕃𝕆𝔹𝕆⁩\nORG:𝕃𝕆𝔹𝕆\nTITLE:\nitem1.TEL;waid=5493405480284:5493405480284\nitem1.X-ABLabel:𝕃𝕆𝔹𝕆\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:𝕃𝕆𝔹𝕆\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: '𝕃𝕆𝔹𝕆', contacts: [{ vcard }] }}, {quoted: m})
}
handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño'] 

export default handler
