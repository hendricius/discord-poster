import { Client, Intents, TextChannel } from "discord.js";
import express from "express";

//dotenv
require("dotenv").config();

// Channel
const channelToPostTo: string = process.env.CHANNEL_ID ?? "";

// Discord.js initialization
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
console.log("Bot is starting...");
client.on("ready", () => console.log("Ready!"));
client.login(process.env.CLIENT_TOKEN);

// Express
const app = express();
app.use(express.json());
const port = process.env.PORT || 443; // default port to listen

// define a route handler for the default home page
app.get("/", (request, response) => {
    response.send(`hendricius-discord-poster bot uptime: ${process.uptime()}`);
});

app.post("/sendMessage", (request, response) => {
    const jsonData = request.body;
    console.log("channel id", channelToPostTo);

    if (jsonData) {
        console.log(`Posting message ${jsonData} to channel`);
        (<TextChannel>client.channels.cache.get(channelToPostTo))?.send(
            createMessageStringFromJsonData(jsonData)
        );
    } else {
        response.status(400);
        response.send("No body with json data provided");
    }

    response.send("Success!");
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

function createMessageStringFromJsonData(jsonData: any) {
    return `A new question has been posted on YouTube.\
\n\nVideo: \`${jsonData.video_title}\`\
\nUser: \`${jsonData.author}\`\
\nMessage:\
\`\`\`${jsonData.message}\`\`\`
You can answer the question answer here: <${jsonData.link}>`;
}
