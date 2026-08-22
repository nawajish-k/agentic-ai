import React from "react";
import { RiChatNewLine, RiArrowRightFill } from "@remixicon/react";
import { useState } from "react";

const App = () => {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === "" || loading) return;

    setLoading(true);

    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response,
        },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* navbar */}
      <div className="navbar">
        <div className="icon">✦</div>
        <h1>Agentic AI</h1>

        <button className="new-chat">
          <RiChatNewLine size={20} className="new-chat-icon" />
          <h3>New chat</h3>
        </button>
      </div>

      {/* chat */}
      <div className="chat-container">
        <div className="chat-content">
          <div className="messages">
            {messages.length === 0 ? (
              <div className="welcome">
                <div className="welcome-icon">✦</div>
                <h2>How can I help you?</h2>
                <p>Ask anything and start a conversation with Agentic AI.</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  className={`message ${
                    message.role === "user"
                      ? "user-message"
                      : "assistant-message"
                  }`}
                  key={index}
                >
                  {" "}
                  <p>{message.content}</p>
                </div>
              ))
            )}

            {/* loading indicator */}
            {loading && (
              <div className="message assistant-message">
                <p>Thinking...</p>
              </div>
            )}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type here..."
            />
            <button
              className="send-button"
              onClick={sendMessage}
              disabled={loading}
            >
              <RiArrowRightFill />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
