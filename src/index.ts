import { Client, Intents, TextChannel } from "discord.js";
import express from "express";

//dotenv
require("dotenv").config();

//Discord Client
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// Channels
const testChannel = "840886315531632661";


console.log("Bot is starting...");

client.on("ready", () => console.log("Ready!"));

client.login(process.env.CLIENT_TOKEN);

//Express
const app = express();
const port = process.env.PORT || 443; // default port to listen

// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.post("/sendMessage", (req, res) => {
    if (req.query.message) {
        (<TextChannel>client.channels.cache.get(testChannel))?.send(
            <string>req.query.message
        );
    } else {
        res.status(400);
        res.send("No parameter 'message' provided");
    }

    res.send("Success!");
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
