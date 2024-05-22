const fs = require("fs");
module.exports.config = {
  name: "bye",
    version: "1.0.1",
  hasPermssion: 0,
  credits: "Lorenzo",
  hasPrefix: false,
  description: "not prefix and not command",
  shortCategory: "not command ",
  commandCategory: "noprefix",
  usages: "bye",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  if (event.body.indexOf("Bye")==0 || (event.body.indexOf("bye")==0)) {
    var msg = {
        body: "See You Soon ${name} .",
        attachment: fs.createReadStream(__dirname + `/noprefix/bye.gif`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("👋", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }