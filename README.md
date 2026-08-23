# Agentic AI

An AI agent built with **LangChain and Mistral AI**, with a React-based chat interface.

This project started as a console-based AI assistant and is now evolving into a full-stack AI application.

## Current Status

🚧 In Development

The current version includes a working backend AI agent and a React-based chat interface connected through an API.

### Current Features

* Uses **Mistral AI**
* Uses **LangChain**
* Uses `createAgent`
* Uses **Express** with Node.js
* Provides a `POST /api/chat` endpoint
* Connects the React frontend to the backend
* Maintains conversation history in memory
* Uses a system message with the current date
* Includes a `get_latest_information` tool structure
* Renders AI responses using Markdown
* Supports formatted headings, bold text, lists, code, and other Markdown content
* Includes a loading state while waiting for an AI response
* Provides a scrollable chat area
* Keeps the chat input at the bottom
* Includes responsive styling for smaller screens

> **Note:** The `get_latest_information` tool is currently a placeholder and does not fetch real-time information yet.

## Tech Stack

### Backend

* Node.js
* Express
* LangChain
* Mistral AI
* Zod
* dotenv
* CORS

### Frontend

* React
* React Markdown
* Remix Icon
* CSS

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
AI Response
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

The backend returns:

```json
{
  "response": "Hello! How can I help you?"
}
```

## AI Agent

The backend uses LangChain's `createAgent` with Mistral AI.

The current model is:

```text
mistral-small-latest
```

The agent is also configured with a tool named:

```text
get_latest_information
```

The tool currently accepts a query:

```json
{
  "query": "latest AI news"
}
```

The tool is currently only a structure and does not retrieve real-time information yet.

## Frontend

The React frontend provides a simple chat interface where users can:

* Send messages to the AI
* View user and assistant messages
* See a loading state while the AI is responding
* View Markdown-formatted AI responses
* Scroll through previous messages
* Use the chat input at the bottom of the interface

AI responses are rendered using `react-markdown`, allowing Markdown such as:

```markdown
## Example

**Bold text**

- First item
- Second item

1. First step
2. Second step
```

to be displayed as formatted content.

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
│   │   ├── style.css
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

* The `get_latest_information` tool is not implemented yet.
* AI responses are returned as complete responses rather than streamed to the frontend.
* Conversation history is stored in server memory.
* Conversation history is lost when the backend restarts.
* The New Chat button is currently part of the UI but does not reset the conversation.
* The backend currently runs locally on port `3000`.
* A Mistral AI API key is required to run the backend.

## Future Plans

* Implement the `get_latest_information` tool
* Stream AI responses to the frontend
* Improve the chat interface
* Add more useful agent tools
* Improve the overall agent architecture

## License

This project is currently for learning and development purposes.
