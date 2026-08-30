import express from "express";
import cors from "cors";
import { ChatMistralAI } from "@langchain/mistralai";
import { config } from "dotenv";
import { HumanMessage, AIMessage, SystemMessage, tool, createAgent } from "langchain";
import * as z from "zod";

config();

const app = express();

app.use(cors());
app.use(express.json());

function getLatestInformation({ query }) {
    return "";
}

const getLatestInformationTool = tool(getLatestInformation, {
    name: "get_latest_information",
    description:
        "Search for recent, current, or up-to-date information about a topic.",
    schema: z.object({
        query: z.string().describe("The topic or question to search for."),
    }),
});

const model = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY,
});

const agent = createAgent({
    model,
    tools: [getLatestInformationTool],
});

const createSystemMessage = () =>
    new SystemMessage(`
You are Agent, an intelligent and helpful AI assistant.

Your goal is to provide clear, accurate, and useful answers.
Keep responses concise and easy to understand unless the user asks for more detail.
Be conversational, helpful, and direct.

Current date is ${new Date().toLocaleDateString()}
`);

const messages = [createSystemMessage()];

app.post("/api/new-chat", (req, res) => {
    messages.length = 0;
    messages.push(createSystemMessage());

    res.json({
        success: true,
    });
});

app.post("/api/chat", async (req, res) => {
    try {
        const { message } = req.body;

        messages.push(new HumanMessage(message));

        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Transfer-Encoding", "chunked");

        const stream = await agent.stream(
            {
                messages,
            },
            {
                streamMode: "messages",
            }
        );

        let aiResponse = "";

        for await (const [chunk] of stream) {
            if (chunk.text) {
                aiResponse += chunk.text;
                res.write(chunk.text);
            }
        }

        messages.push(new AIMessage(aiResponse));

        res.end();
    } catch (error) {
        console.error(error);

        if (!res.headersSent) {
            res.status(500).json({
                error: "Something went wrong",
            });
        } else {
            res.end();
        }
    }
});

app.listen(3000, () => {
    console.log("Backend running on http://localhost:3000");
});