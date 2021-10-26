const Discord = require("discord.js");
const { Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  alias: ["ms"],

  execute(client, message, args) {
    message.channel.send("Pong!")
  },
};
