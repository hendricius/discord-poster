import { Client, Intents } from "discord.js";
require("dotenv").config();
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

console.log("Bot is starting...");

client.on("ready", () => console.log("Ready!"));

client.on("messageCreate", (msg) => {
    if (msg.author.bot) return;

    if (msg.content.startsWith("!ping")) {
        msg.channel.send("!gnip");
    }
});

client.login(process.env.CLIENT_TOKEN);
