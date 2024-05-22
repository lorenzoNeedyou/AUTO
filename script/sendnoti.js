const axios = require("axios");
const { createReadStream, unlinkSync } = require("fs");
const { resolve } = require("path");

module.exports.config = {
  name: "sendnoti",
  version: "1.1.0",
  hasPermision: 2,
  description: "Sends a message to all groups and can only be done by the admin.",
  hasPrefix: true,
  commandCategory: "noti",
  usages: "[Text]",
  cooldown: 0,
};

module.exports.run = async function ({ api, event, args }) {
  const threadList = await api.getThreadList(100, null, ["INBOX"]);
  let sentCount = 0;
  const custom = args.join(" ");

  async function sendMessage(thread) {
    try {
      await api.sendMessage(
        `𝙉𝙊𝙏𝙄𝘾𝙀 𝙁𝙍𝙊𝙈 𝘿𝙀𝙑𝙀𝙇𝙊𝙋𝙀𝙍 
 ---------------- 
『𝘋𝘦𝘷𝘦𝘭𝘰𝘱𝘦𝘳 𝘕𝘢𝘮𝘦』: Lorenzo
 --------------- 
 『𝗡𝗼𝘁𝗶𝗰𝗲』${custom}`,
        thread.threadID
      );
      sentCount++;

      const content =`${custom}`;
      const languageToSay = "tl"; 
      const pathFemale = resolve(__dirname, "cache", `${thread.threadID}_female.mp3`);

      await global.utils.downloadFile(
        `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
          content
        )}&tl=${languageToSay}&client=tw-ob&idx=1`,
        pathFemale
      );
      api.sendMessage(
        { attachment: createReadStream(pathFemale) },
        thread.threadID,
        () => unlinkSync(pathFemale)
      );
    } catch (error) {
      console.error("Error sending a message:", error);
    }
  }

  for (const thread of threadList) {
    if (sentCount >= 20) {
      break;
    }
    if (thread.isGroup && thread.name != thread.threadID && thread.threadID != event.threadID) {
      await sendMessage(thread);
    }
  }

  if (sentCount > 0) {
    api.sendMessage(`› Sent the notification successfully.`, event.threadID);
  } else {
    api.sendMessage(
      "› No eligible group threads found to send the message to.",
      event.threadID
    );
  }
};