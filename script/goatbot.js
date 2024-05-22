const axios = require('axios');

module.exports["config"] = {
  name: "goatbot",
  version: "1.0.0",
  credits: "Liane Cagara",
  hasPermission: 0,
  commandCategory: "Ai-Chat",
  usage: "[ prefix ]goatbot [prompt]",
  hasPrefix: true,
  cooldowns: 0
};

module.exports["run"] = async ({ api, event, args, box, Users }) => {
  try {
    const query = args.join(" ") || "hello";
    const { name } = await Users.getData(event.senderID);

    if (query) {
      await box.react("⏳");
      const processingMessage = await box.reply(
        `Asking Goatbot Generator. Please wait a moment...`);

      const apiUrl = `https://liaspark.chatbotcommunity.ltd/@CodingAI_Liane/api/goatbot?userName=${encodeURIComponent(name)}&key=j86bwkwo-8hako-12C&query=${encodeURIComponent(query)}`;
      const response = await axios.get(apiUrl);

      if (response.data && response.data.message) {
        const trimmedMessage = response.data.message.trim();
        box.react("✅");
        await box.reply(trimmedMessage);

        console.log(`Sent Goatbot Generator's response to the user`);
      } else {
        throw new Error(`Invalid or missing response from Goatbot Generator API`);
      }

      await api.unsendMessage(processingMessage.messageID);
    }
  } catch (error) {
    console.error(`❌ | Failed to get Goatbot Generator's response: ${error.message}`);
    const errorMessage = `❌ | An error occurred. You can try typing your query again or resending it. There might be an issue with the server that's causing the problem, and it might resolve on retrying.`;
    box.reply(errorMessage);
  }
};