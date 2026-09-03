# Agentic AI

An AI agent built with **LangChain and Mistral AI**, with a React-based chat interface.

This project started as a console-based AI assistant and has evolved into a full-stack AI chat application with streaming responses, conversation history, Markdown rendering, and a modern interface.

## Preview

<img width="1920" height="1080" alt="Agentic AI Preview" src="https://github.com/user-attachments/assets/5c3e2d7f-7bdf-41f3-b7e5-f38097181651" />

## Current Status

🚧 In Development

The current version includes a working backend AI agent, a React chat interface, and real-time streaming between the frontend and backend.

## Current Features

- Uses **Mistral AI**
- Uses **LangChain**
- Uses LangChain's `createAgent`
- Uses **Express** with Node.js
- Provides a `POST /api/chat` endpoint
- Provides a `POST /api/new-chat` endpoint
- Connects the React frontend to the backend
- Maintains conversation history in server memory
- Uses a system message with the current date
- Includes a `get_latest_information` tool structure
- Streams AI responses from the backend to the frontend
- Displays AI responses while they are being generated
- Renders AI responses using Markdown
- Supports headings, bold text, lists, code blocks, tables, links, blockquotes, and other Markdown content
- Includes a loading state while the AI is responding
- Includes a custom `ThinkingOrb` loading indicator
- Includes a `BorderBeam` effect around the chat input
- Provides a scrollable chat area
- Automatically scrolls to the latest response
- Provides a New Chat feature
- Resets the backend conversation history when starting a new chat
- Includes a ChatGPT-style empty-state layout
- Positions the chat input below the welcome message when the conversation is empty
- Moves the chat input to the bottom once the conversation starts
- Includes welcome screen animations
- Includes subtle button interactions and hover effects
- Includes responsive styling for smaller screens

> **Note:** The `get_latest_information` tool is currently a placeholder and does not fetch real-time information yet.

## Tech Stack

### Backend

- Node.js
- Express
- LangChain
- Mistral AI
- Zod
- dotenv
- CORS

### Frontend

- React
- React Markdown
- Remark GFM
- Remix Icon
- Thinking Orbs
- Border Beam
- CSS

## How It Works

```text
User
  ↓
React Chat Interface
  ↓
POST /api/chat
  ↓
Express Backend
  ↓
LangChain Agent
  ↓
Mistral AI
  ↓
Streaming AI Response
  ↓
Express Response Stream
  ↓
React Frontend
  ↓
Markdown-rendered Response
```

## Chat API

The backend provides the following endpoint:

```text
POST /api/chat
```

The frontend sends the user's message in the request body:

```json
{
  "message": "Hello"
}
```

The backend streams the AI response as plain text.

The response is **not returned as a JSON object**. Instead, the frontend reads the response using the browser's `ReadableStream` API.

```text
AI response
    ↓
chunk
    ↓
frontend
    ↓
display
    ↓
next chunk
    ↓
frontend
    ↓
display
```

This allows the user to see the response while it is being generated instead of waiting for the complete response.

## New Chat API

The backend also provides:

```text
POST /api/new-chat
```

This endpoint clears the existing conversation history and creates a new system message.

The frontend uses this endpoint when the user clicks **New Chat**.

```text
New Chat
   ↓
POST /api/new-chat
   ↓
Clear backend messages
   ↓
Create new system message
   ↓
Clear frontend messages
```

## AI Agent

The backend uses LangChain's `createAgent` with Mistral AI.

The current model is:

```text
mistral-small-latest
```

The agent is configured with a tool named:

```text
get_latest_information
```

The tool accepts a query:

```json
{
  "query": "latest AI news"
}
```

The tool currently exists as an agent tool structure but does not retrieve real-time information yet.

## Conversation History

Conversation history is currently maintained in memory on the backend.

The backend stores:

```text
SystemMessage
      ↓
HumanMessage
      ↓
AIMessage
      ↓
HumanMessage
      ↓
AIMessage
      ↓
...
```

This allows the agent to maintain context throughout the current conversation.

However, the history is lost when the backend restarts.

> **Note:** The current in-memory approach is suitable for the project's development stage but is not designed for multiple users or production deployment.

## Frontend

The React frontend provides a modern ChatGPT-style chat interface.

Users can:

- Send messages
- Receive streaming AI responses
- View user and assistant messages
- Start a new conversation
- See a loading state while the AI responds
- View Markdown-formatted AI responses
- Scroll through previous messages
- Use a dynamically resizing textarea
- Press `Enter` to send a message
- Press `Shift + Enter` to create a new line
- Use the interface on smaller screens

## Markdown Rendering

AI responses are rendered using `react-markdown` with `remark-gfm`.

This allows the AI to generate formatted content such as:

```markdown
## Example

**Bold text**

- First item
- Second item

1. First step
2. Second step

`inline code`

```js
const message = "Hello";
console.log(message);
```
```

The project also includes a dedicated `markdown.css` file for styling AI-generated Markdown content.

It currently provides styling for:

- Headings
- Paragraphs
- Bold and italic text
- Links
- Ordered and unordered lists
- Inline code
- Code blocks
- Blockquotes
- Tables
- Horizontal rules
- Images
- Keyboard elements
- Strikethrough
- Highlighted text
- Superscript and subscript
- Details and summary elements
- Responsive Markdown content

## Streaming

AI responses are streamed from the backend to the frontend.

The backend uses LangChain's streaming API:

```js
const stream = await agent.stream(
  {
    messages,
  },
  {
    streamMode: "messages",
  }
);
```

The backend writes each text chunk to the HTTP response:

```js
for await (const [chunk] of stream) {
  if (chunk.text) {
    aiResponse += chunk.text;
    res.write(chunk.text);
  }
}
```

The frontend reads the stream using:

```js
const reader = response.body.getReader();
```

and updates the assistant message as new chunks arrive.

This creates a real-time ChatGPT-style response experience.

## Loading State

While the AI is generating a response, the normal send button is replaced by a `ThinkingOrb`.

```text
User sends message
       ↓
Loading starts
       ↓
ThinkingOrb appears
       ↓
AI response streams
       ↓
Loading ends
       ↓
Send button returns
```

The New Chat button is also temporarily unavailable while a response is being generated.

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/nawajish-k/agentic-ai.git
cd agentic-ai
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `backend` folder:

```text
backend/
├── .env
├── index.js
├── package.json
└── package-lock.json
```

Add your Mistral AI API key:

```env
MISTRAL_API_KEY=your_mistral_api_key
```

The backend reads the API key using:

```js
process.env.MISTRAL_API_KEY
```

### Keep Your API Key Private

Never commit or share your `.env` file or API key publicly.

Make sure your `.gitignore` contains:

```gitignore
.env
```

If an API key is accidentally exposed, revoke it and generate a new one.

## Running the Backend

From the project root:

```bash
cd backend
```

Start the backend:

```bash
node ./index.js
```

You should see:

```text
Backend running on http://localhost:3000
```

The API will be available at:

```text
http://localhost:3000/api/chat
```

## Running the Frontend

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local development URL provided by Vite.

Make sure the backend is running at the same time so the frontend can communicate with it.

## Project Structure

```text
agentic-ai/
│
├── backend/
│   ├── .env              # Local only - not committed
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── markdown.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

> **Note:** The `.env` file is shown in the structure for setup reference only. It should never be committed to the repository.

## Current Limitations

- The `get_latest_information` tool is not implemented yet.
- Real-time web search is not available yet.
- Exact current-time queries are not handled by a dedicated time tool yet.
- Conversation history is stored in server memory.
- Conversation history is lost when the backend restarts.
- The conversation history is shared by the server and is not isolated per user.
- The backend currently runs locally on port `3000`.
- A Mistral AI API key is required to run the backend.
- Error messages are currently logged to the console rather than displayed as a dedicated error UI.

## Future Plans

- Implement the `get_latest_information` tool
- Add reliable real-time web search
- Add a dedicated current-time tool
- Improve tool result presentation
- Improve error message UI
- Improve mobile experience
- Add more useful agent tools
- Improve the overall agent architecture
- Improve conversation/session management
- Add persistent conversation storage
- Add more polished UI animations
- Prepare the application for production deployment

## License

This project is currently for learning and development purposes.
