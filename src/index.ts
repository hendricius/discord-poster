import { Client, Intents } from "discord.js";
import express from "express";

//dotenv
require("dotenv").config();

//Discord Client
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

//Express
const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
