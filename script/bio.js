const fs = require("fs");
const moment = require("moment-timezone");
const request = require("request");

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
  const juswa = moment.tz("Asia/Manila").format("『D/MM/YYYY』 【HH:mm:ss】");

  const bioText = `
❒ [ + ] PREFIX: ${prefix} \n
❒ [ + ] Owner: ${ownerName}\n
❒ [ + ]Developed By: ${createdBy}\n
🟢Active In: ${juswa} 
  `;

  api.changeBio(bioText, (e) => {
    if (e) {
      api.sendMessage("An error occurred: " + e, event.threadID);
    } else {
      api.sendMessage(`The bot's bio has been updated to:\n${bioText} automatically `, event.threadID);
    }
  });
};