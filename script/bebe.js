const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports.config = {
 name: "bebe",
 version: "1.0.0",
 credits: "Lorenzo",
 hasPermssion: 0,
 commandCategory: "fun",
 description: "Sending Random Bebe Girl In tiktok",
 usages: "shoti",
 cooldowns: 9,
hasPrefix: true,
};
module.exports.run = async function ({api, event }) {
try {
api.sendMessage("Sending Please Wait ⌛,.", event.threadID, event.messageID);

     const response = await axios.post(`https://shoti-api-st8y.onrender.com/shoti`);
  const username = response.data.data.username;
const nickname = response.data.data.nickname;
const url = response.data.data.url;
const videoid = response.data.data.videoid;


let shotiPath = path.join(__dirname, "cache", "shoti.mp4");

const video = await axios.get(url, { responseType: "arraybuffer" });

fs.writeFileSync(shotiPath, Buffer.from(video.data, "utf-8"));

await api.sendMessage({body: `Here's your Random Bebe Girl In TikTok\n\nUsername: ${username}\nNickname: ${nickname}`, attachment: fs.createReadStream(shotiPath) }, event.threadID, event.messageID);
} catch (error) {
api.sendMessage(`${error}`, event.threadID, event.messageID);
}
};