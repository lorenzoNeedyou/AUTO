import axios from "axios";

export const metadata = {
  name: `goatbot`,
  version: "1.0",
  author: `Liane Cagara`,
  category: "Ai-Chat",
  description: `A bot that generates Goatbot Command module. Note: Not supported all of goatbot features, can make mistakes.`,
  usage: `{prefix}{name}goatbot <message>`,
  hasPrefix: true,
};

export async function onRun({ event, box, args, userInfos, api }) {
  try {
    const query = args.join(" ") || "hello";
    const { name } = await userInfos.get(event.senderID);

    if (query) {
      box.react("⏳");
      const processingMessage = await box.reply(
        `Asking Goatbot Generator. Please wait a moment...`,
      );

      const apiUrl = `https://liaspark.chatbotcommunity.ltd/@CodingAI_Liane/api/goatbot?key=j86bwkwo-8hako-12C&userName=${encodeURIComponent(name)}&query=${encodeURIComponent(query)}`;
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
}
