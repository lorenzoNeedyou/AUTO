module.exports.config = {
  name: "bebe",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Lorenzo",
  description: "Generate a random bebe girl tiktok video.",
  commandCategory: "Entertainment",
  usage: "[]",
  cooldowns: 0,
  hasPrefix: true,
  dependencies: {}
};

module.exports.run = async ({ api, event, args }) => {

  api.setMessageReaction("🕜", event.messageID, (err) => {
     }, true);
api.sendTypingIndicator(event.threadID, true);

  const { messageID, threadID } = event;
  const fs = require("fs");
  const axios = require("axios");
  const request = require("request");
  const prompt = args.join(" ");

  if (!prompt[0]) { api.sendMessage("Sending,🕜 please Wait.", threadID, messageID);
    }

 try {
  const response = await axios.post(`https://shoti-srv1.onrender.com/api/v1/get`, { apikey: `$shoti-1hundjf40cdik9hd1lg` });

  const path = __dirname + `/cache/bebe.mp4`;
  const file = fs.createWriteStream(path);
  const rqs = request(encodeURI(response.data.data.url));
  rqs.pipe(file);
  file.on(`finish`, () => {
     setTimeout(function() {
       api.setMessageReaction("✅", event.messageID, (err) => {
          }, true);
      return api.sendMessage({
      body: `Heres Your Random Bebe girl In tiktok. \n\nuserName : \n\n@${response.data.data.user.username} \n\nuserNickname : \n\n${response.data.data.user.nickname} \n\nuserID : \n\n${response.data.data.user.userID} \n\nDuration : \n\n${response.data.data.duration}`, 
      attachment: fs.createReadStream(path)
    }, threadID);
      }, 5000);
        });
  file.on(`error`, (err) => {
      api.sendMessage(`Error: ${err}`, threadID, messageID);
  });
   } catch (err) {
    api.sendMessage(`Error: ${err}`, threadID, messageID);
  };
};