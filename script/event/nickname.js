//event command change nickname show prefix
self.addEventListener("command", async (e) => {
  const { command, args, params } = e.detail;
  if (command === "!nickname") {
    const nickname = args[0];
    if (!nickname) {
      return self.sendAlert("Please provide a nickname.");
    }
    if (nickname.length > 20) {
      return self.sendAlert("Nickname must be less than 20 characters.");
    }
    const prefix = params.prefix;
    const name = params.name;
    const msg = `[INFO] Set nickname to ${nickname}.`;
    self.sendAlert(msg);
    const socket = self.socket;
    const data = {
      type: "nickname",
      nickname,
      prefix,
      name,
    };
    socket.send(JSON.stringify(data));
  }
}); 