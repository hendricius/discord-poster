import { Client } from "discord.js";
import settings from "../settings.json";
const client = new Client({ intents: [] });

console.log("Bot is starting...");

client.on("ready", () => console.log("Ready!"));

client.on("message", (msg) => {
    if (msg.author.bot) return;

    if (msg.content.startsWith("!ping")) {
        msg.channel.send("!gnip");
    }
});

client.login(settings.token);
