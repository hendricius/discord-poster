import { Client, Intents, TextChannel } from "discord.js";
import express from "express";

//dotenv
require("dotenv").config();

//Discord Client
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// Channels
const testChannel = "931119486977839125";

console.log("Bot is starting...");

client.on("ready", () => console.log("Ready!"));

client.on("messageCreate", (msg) => {
    if (msg.author.bot) return;

    if (msg.content.startsWith("!ping")) {
        msg.channel.send("!gnip");
    }
});

client.login(process.env.CLIENT_TOKEN);

//Express
const app = express();
const port = process.env.PORT || 443; // default port to listen

// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.get("/sendMessage", (req, res) => {
    (<TextChannel>client.channels.cache.get(testChannel))?.send(`TEST FROM API`);

    res.send("Success!");
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
