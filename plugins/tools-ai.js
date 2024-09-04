import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, '𝑬𝒔𝒄𝒓𝒊𝒃𝒆 𝒖𝒏 𝒕𝒆𝒙𝒕𝒐 𝒑𝒂𝒓𝒂 𝒉𝒂𝒃𝒍𝒂𝒓 𝒄𝒐𝒏 𝒀𝑼𝑲𝑰 ฅ^•ﻌ•^ฅ', m);

try {
let msg = await conn.sendMessage(m.chat, {text: '*𝑬𝒔𝒕𝒐𝒚 𝒆𝒔𝒄𝒓𝒊𝒃𝒊𝒆𝒏𝒅𝒐.....*'});

let userid = conn.getName(m.sender) || 'default';
let apiurl = `https://api.guruapi.tech/ai/gpt4?username=${userid}&query=hii${encodeURIComponent(text)}`;
let result = await fetch(apiurl);
let response = await result.json();

await conn.relayMessage(m.chat, { protocolMessage: { key: msg.key, type: 14, editedMessage: { conversation: response.msg }}}, {});
} catch {}}

handler.command = handler.help = ["chatgpt","ia"];

export default handler
