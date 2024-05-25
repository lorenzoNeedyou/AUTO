module.exports.config = {
  name: "bio",
  version: "1.0.0",
  hasPermission: 1,
  credits: "Lorenzo",//I know palitan nyu to kaya geh na pero Real credits is Blue
  description: "Change bot's bio automatic",
hasPrefix: "true", 
  commandCategory: "admin",
  usages: "bio",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const prefix = '[ / ]'; // Replace with your desired prefix 
  const ownerName = "Lorenzo C. Badilla"; // Replace with your name or bot owner's name
  const createdBy = "@[100082342305590:999:Lorenzo]"; //Replace with Developer Name 

  const bioText = `
❒ [ + ] PREFIX: ${prefix} \n
❒ [ + ] Owner: ${ownerName}\n
❒ [ + ]Developed By: ${createdBy}\n
  `;

  api.changeBio(bioText, (e) => {
    if (e) {
      api.sendMessage("An error occurred: " + e, event.threadID);
    } else {
      api.sendMessage(`The bot's bio has been updated to:\n${bioText} automatically `, event.threadID);
    }
  });
};