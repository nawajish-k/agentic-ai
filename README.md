# Agentic AI

An AI agent built with LangChain and Mistral AI.

This project started as a console-based AI assistant and is gradually evolving into a full-stack AI application with a React frontend.

## Current Status

🚧 In Development

### Current Version

The current version is a terminal-based AI agent that:

- Uses Mistral AI
- Uses LangChain
- Uses `createAgent`
- Maintains conversation history
- Supports streaming responses
- Includes a tool structure for getting latest information
- Uses a system message with the current date
- Runs through Node.js in the terminal

> **Note:** The React frontend is currently only an information screen. The web-based AI interface is still in development.

## Tech Stack

- Node.js
- LangChain
- Mistral AI
- Zod
- dotenv
- React

## Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd agentic-ai
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

This project requires a **Mistral AI API key** to run the backend.

Create a `.env` file inside the `backend` folder:

```text
backend/
├── .env
├── index.js
├── package.json
└── package-lock.json
```

Add your Mistral API key:

```env
MISTRAL_API_KEY=your_mistral_api_key
```

Replace `your_mistral_api_key` with your own Mistral AI API key.

The backend reads the key using:

```js
process.env.MISTRAL_API_KEY
```

### Keep Your API Key Private

Never commit or share your `.env` file or API key publicly.

Make sure your `.gitignore` contains:

```gitignore
.env
```

The `.env` file is only used locally and should never be pushed to GitHub.

If an API key is accidentally exposed publicly, revoke it and generate a new one.

## Running the Agent

After setting up your `.env` file, make sure you are inside the `backend` folder:

```bash
cd backend
```

Then run:

```bash
node ./index.js
```

You should see:

```text
User:
```

You can now interact with the AI agent directly through the terminal.

> **Important:** The AI agent currently works only in the terminal. The React frontend is not connected to the backend yet.

## Frontend

A React frontend is included in the project.

Currently, the frontend is only an information screen that tells users that the AI agent runs through the terminal.

The web-based chat interface and backend connection are planned for a future version.

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

- The AI agent currently works only through the terminal.
- The React frontend is not connected to the backend.
- The latest-information tool is currently only a tool structure and does not fetch real-time information yet.
- A Mistral AI API key is required to run the backend.
- The API key must be stored locally in the backend `.env` file.

## Future Plans

- Connect the React frontend with the backend
- Build a web-based chat interface
- Stream AI responses to the frontend
- Implement the latest-information tool
- Add more useful agent tools
- Improve the overall agent architecture

## License

This project is currently for learning and development purposes.