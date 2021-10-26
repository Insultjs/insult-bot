const Discord = require("discord.js");
const discord = require("discord.js");

const client = new Discord.Client();
const { Client, Collection, Guild } = require("discord.js");

const fs = require("fs");
let { readdirSync } = require("fs");

const keepAlive = require("./server");
const Monitor = require("ping-monitor");

let prefix = "i!";

const mySecret = process.env["TOKEN"];

//keepAlive();
const monitor = new Monitor({
  website: "https://insultbota.marcmedrano.repl.co",
  title: "Secundario",
  interval: 15,
});

monitor.on("up", (res) => console.log(`${res.website} está encedido.`));
monitor.on("down", (res) =>
  console.log(`${res.website} se ha caído - ${res.statusMessage}`)
);
monitor.on("stop", (website) => console.log(`${website} se ha parado.`));
monitor.on("error", (error) => console.log(error));

client.on("message", async (message) => {
  if (message.guild == null) return;
  if (message.author.bot) return;
  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
    var id = message.channel.id;
    var ide = message.guild.id;

    if (message.guild == null) return;

    const embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(
        "Hola `" +
          message.author.tag +
          "` , Mi prefix es `" +
          prefix +
          "` puedes pedir ayuda en mi dm."
      )
      .setAuthor(message.author.username, message.author.displayAvatarURL());
    message.channel.send(embed);
  }
});

client.on("message", async (message) => {
  if (message.guild == null) return;
  if (message.author.bot) return;
  if (message.content === prefix) {
    let user = message.mentions.users.first();
    message.channel.send(
      "🎉 **| !Hey¡ ¡Parece que has descubierto mi prefix!**" +
        "\n" +
        "**Si necesitas ayuda mandame dm**"
    );
  }
});

/////////////////////////HANDLER/////////////////////////
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

////////////////////////////////////////////////////////////////////////////////////////////////

client.on("ready", () => {
  console.log("🟢 Insultbot ON");

  const array = [
    {
      name: `🎫 Soporte al dm`,
      type: "WATCHING",
    },
    {
      name: `🔐 Prefix i!`,
      type: "PLAYING",
    },
    {
      name: `🏆 V1.0.5`,
      type: "PLAYING",
    },
    {
      name: `👨‍💻 En desarrollo`,
      type: "PLAYING",
    },
    {
      name: `🍴 BETA`,
      type: "PLAYING",
    },
    {
      name: `🈹 NPM`,
      type: "WATCHING",
    },
  ];

  setInterval(() => {
    function presence() {
      client.user.setPresence({
        status: "dnd",
        activity: array[Math.floor(Math.random() * array.length)],
      });
    }
    presence();
  }, 5000);
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.guild == null) return;

  if (!message.content.toLowerCase().startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  let cmd = client.commands.find(
    (c) => c.name === command || (c.alias && c.alias.includes(command))
  );
  if (cmd) {
    cmd.execute(client, message, args);
  }
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.guild == null) return;

  if (message.member.hasPermission("ADMINISTRATOR")) return;

  if (
    message.content.toLowerCase().includes("http://") ||
    message.content.toLowerCase().includes("discord.gg") ||
    message.content.toLowerCase().includes("https://")
  ) {
    message.delete();

    const embed = new Discord.MessageEmbed()
      .setTitle("No Mandes Enlaces!")
      .setColor("#FF0000")
      .setThumbnail(message.author.avatarURL());
    message.channel.send(embed).then((msg) => msg.delete({ timeout: 5000 }));
    message.author.send(
      "`❗ Si mandas mas enlaces podrías llegar a ser Baneado`"
    );
  }
});

///////////////////////MODMAIL/////////////////////
client.on("guildMemberAdd", (membernew) => {
  let canalbienvenida = client.channels.cache.get("879865281344839760");
  const embed = new Discord.MessageEmbed()
    .setTitle("Kyara Bienvenidas")
    .setColor("FF7673")
    .setThumbnail(
      "https://i.ibb.co/9NnT3CF/1e7d36b1683c738ca3f42d9fb21e8537d39b43490438d8fd8aee0ad713f505a0.png"
    )
    .setDescription(
      "Hola **" +
        membernew.displayName +
        "**, Bienvenido a **Kyara Server**, Esperamos que disfrutes de tu estancia, Revisa las `#📜-reglas` !"
    );
  canalbienvenida.send(embed);

  const embed2 = new Discord.MessageEmbed()
    .setTitle("Bienvenidas")
    .setColor("00A1FF")
    .setThumbnail(
      "https://www.solofondos.com/wp-content/uploads/2016/03/outrun-vaporwave-hd-wallpaper-preview.jpg"
    )
    .setDescription("Para acceder al soporte de `insult` mandame un mensaje.");
  membernew.send(embed);
});

client.on("message", async (message) => {
  if (message.author.bot) return;

  const mensajee = new Discord.MessageEmbed()
    .setDescription(
      "Mensaje NO enviado, pon `i!message` si quieres que se envíe"
    )
    .setColor("RED");
  let server = client.guilds.cache.get("902562704793935902");
  const canal = server.channels.cache.map((e) => e.name);
  const args = message.content.trim().split(/ +/g);
  const everyone = "902562704793935902";
  let mensajeinfo =
    "Hey, este es el modmail de insult, Para reportar un bug pon `i!bug` para pedir ayuda pon `i!ayuda` y para una sugerencia pon `i!sugerencia`";
  const embedok = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setDescription("**El ticket ha sido creado correctamente**");

  const embedcor = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription("**Tu ticket es demasiado corto**");

  ////////////////////////////////////////////////////////////////////
  if (message.guild == null) {
    let autor = message.author;

    if (message.content.toLowerCase().startsWith(prefix + "bug")) {
      const args = message.content.trim().split(/ +/g);

      if (args[4] == undefined) return message.channel.send(embedcor);

      const embedbie = new Discord.MessageEmbed().setDescription(
        "**No puedes crear un ticket, ya tienes otro abierto.**"
      );
      if (canal.includes(autor.id)) return message.channel.send(embedbie);

      const embedbi = new Discord.MessageEmbed().setDescription(
        "**El staff te atenderá en un momento**"
      );
      message.channel.send(embedbi);

      server.channels
        .create(autor.id, {
          parent: "902570002564149249",
        })
        .then((c) => {
          const embedbug = new Discord.MessageEmbed()
            .setTitle(autor.tag)
            .addField("Razón:", "`Reporte de bug`", true)
            .addField("Id:", "`" + autor.id + "`", true)
            .setThumbnail(
              `${autor.displayAvatarURL({ dynamic: true, size: 1024 })}`
            )
            .setColor("GREEN")
            .setDescription("`Mensaje Del Ticket:` " + message.content);
          c.send(embedbug);
        });
    } else if (message.content.toLowerCase().startsWith(prefix + "ayuda")) {
      const args = message.content.trim().split(/ +/g);

      if (args[4] == undefined) return message.channel.send(embedcor);

      const embedbie = new Discord.MessageEmbed().setDescription(
        "**No puedes crear un ticket, ya tienes otro abierto.**"
      );
      if (canal.includes(autor.id)) return message.channel.send(embedbie);

      const embedbi = new Discord.MessageEmbed().setDescription(
        "**El staff te atenderá en un momento**"
      );
      message.channel.send(embedbi);

      server.channels
        .create(autor.id, {
          parent: "902570002564149249",
        })
        .then((c) => {
          const embedbug = new Discord.MessageEmbed()
            .setTitle(autor.tag)
            .addField("Razón:", "`Necesita Ayuda`", true)
            .addField("Id:", "`" + autor.id + "`", true)
            .setThumbnail(
              `${autor.displayAvatarURL({ dynamic: true, size: 1024 })}`
            )
            .setColor("GREEN")
            .setDescription("`Mensaje Del Ticket:` " + message.content);
          c.send(embedbug);
        });
    } else if (
      message.content.toLowerCase().startsWith(prefix + "sugerencia")
    ) {
      const args = message.content.trim().split(/ +/g);

      if (args[4] == undefined) return message.channel.send(embedcor);

      const embedbie = new Discord.MessageEmbed().setDescription(
        "**No puedes crear un ticket, ya tienes otro abierto.**"
      );
      if (canal.includes(autor.id)) return message.channel.send(embedbie);

      const embedbi = new Discord.MessageEmbed().setDescription(
        "**El staff te atenderá en un momento**"
      );
      message.channel.send(embedbi);

      server.channels
        .create(autor.id, {
          parent: "902570002564149249",
        })
        .then((c) => {
          const embedbug = new Discord.MessageEmbed()
            .setTitle(autor.tag)
            .addField("Razón:", "`Quiere dar una sugerencia`", true)
            .addField("Id:", "`" + autor.id + "`", true)
            .setThumbnail(
              `${autor.displayAvatarURL({ dynamic: true, size: 1024 })}`
            )
            .setColor("GREEN")
            .setDescription("`Mensaje Del Ticket:` " + message.content);
          c.send(embedbug);
        });
    } else if (!canal.includes(autor.id))
      return message.channel.send(mensajeinfo);
    else {
      console.log("a");
    }
  } else {
  }
});

client.on("message", async (message) => {
  let server = client.guilds.cache.get("902562704793935902");
  const canal = server.channels.cache.map((e) => e.name);
  if (message.author.bot) return;
  let autor = message.author;
  if (message.guild == null) {
    if (!canal.includes(autor.id)) return;
    if (message.content.toLowerCase().startsWith(prefix)) return;

    let id = autor.id;
    const canalmen = await server.channels.cache.find((x) => x.name == id);
    const messajek = new Discord.MessageEmbed().setDescription(
      "`Mensaje Nuevo:` " + message.content
    );
    canalmen.send(messajek);

    const messajeki = new Discord.MessageEmbed()
      .setDescription("**El mensaje se ha enviado correctamente**")
      .setColor("YELLOW");
    message.channel.send(messajeki);
  }
});

client.on("message", async (message) => {
  let server = client.guilds.cache.get("902562704793935902");
  const canal = server.channels.cache.map((e) => e.name);
  if (message.author.bot) return;
  let autor = message.author;
  let id = message.channel.name;

  const embedby = new Discord.MessageEmbed()
    .setColor("FF0000")
    .setDescription(
      "**Tu ticket ha sido marcado como completo. Si desea volver a abrirlo o crear uno nuevo, envíe un mensaje al bot.**"
    )
    .setAuthor("Adiós, " + autor.username, autor.displayAvatarURL())
    .setFooter("Ticket Cerrado -- insultjs");

  const embedbye = new Discord.MessageEmbed()
    .setColor("FF97F9")
    .setDescription(message.content)
    .setAuthor("[STAFF] " + autor.username, autor.displayAvatarURL())
    .setFooter("Mensaje Enviado -- " + autor.username);

  const embedok = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setDescription("Mensaje enviado exitosamente");

  if (message.channel.parent.id == "902570002564149249") {
    if (message.content.toLowerCase().startsWith(prefix + "close")) {
      client.users.resolve(id).send(embedby);
      message.channel.delete();
    } else {
      client.users.resolve(id).send(embedbye);
      message.channel
        .send(embedok)
        .then((msg) => msg.delete({ timeout: 5000 }));
    }
  }
});

client.login(mySecret);
