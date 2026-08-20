import { ChatMistralAI } from "@langchain/mistralai";
import { config } from "dotenv";
import { HumanMessage, AIMessage, SystemMessage, tool, createAgent } from "langchain"
import rl from "readline/promises";
import * as z from "zod";

config();

function getLatestInformation({ query }) {
    return ""
}

const getLatestInformationTool = tool(
    getLatestInformation, {
    name: "get_latest_information",
    description: "Get the latest information about any topic.",
    schema: z.object({
        query: z.string().describe("The topic to get the latest information about."),
    }),
});

const readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const model = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY
})

const agent = createAgent({
    model,
    tools: [getLatestInformationTool],
})

const messages = [
    new SystemMessage(`Your name is Mistral, you are a helpful assistant.
        current date is ${new Date().toLocaleDateString()}
        `)
]

while (true) {

    const userPrompt = await readline.question("User: ")

    messages.push(new HumanMessage(userPrompt))

    const stream = await agent.stream({
        messages,
    },
        {
            streamMode: "messages",
        })

    let aiResponse = ""

    for await (const [chunk] of stream) {
        process.stdout.write(chunk.text)
        aiResponse += chunk.text
    }

    messages.push(new AIMessage(aiResponse))

    process.stdout.write("\n")
}

