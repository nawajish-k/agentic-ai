import React from "react";
import { RiChatNewLine, RiArrowUpLine } from "@remixicon/react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useRef } from "react";
import { useEffect } from "react";
import { ThinkingOrb } from "thinking-orbs";

const App = () => {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const newChat = async () => {
    if (loading) return;

    try {
      await fetch("http://localhost:3000/api/new-chat", {
        method: "POST",
      });

      setMessages([]);
      setInput("");

      if (inputRef.current) {
        inputRef.current.style.height = "40px";
        inputRef.current.focus();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = async () => {
    if (input.trim() === "" || loading) return;

    setLoading(true);

    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
      {
        role: "assistant",
        content: "",
      },
    ]);

    const userInput = input;

    setInput("");

    if (inputRef.current) {
      inputRef.current.style.height = "40px";
    }

    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userInput,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let aiResponse = "";

      while (true) {
        const { value, done } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, {
          stream: true,
        });

        aiResponse += chunk;

        setMessages((prev) => {
          const updatedMessages = [...prev];

          updatedMessages[updatedMessages.length - 1] = {
            role: "assistant",
            content: aiResponse,
          };

          return updatedMessages;
        });
      }
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

        <span className="new-chat-wrapper">
          <button className="new-chat" onClick={newChat} disabled={loading}>
            <RiChatNewLine size={20} className="new-chat-icon" />
            <h3>New chat</h3>
          </button>

          {loading && (
            <span className="new-chat-tooltip">
              Please wait — the current response is still generating.
            </span>
          )}
        </span>
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
                  <ReactMarkdown
                    components={{
                      a: ({ node, ...props }) => (
                        <a
                          {...props}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      ),
                      table: ({ node, ...props }) => (
                        <div className="markdown-table">
                          <table {...props} />
                        </div>
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              ))
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);

                // Reset height first so it can shrink when text is deleted
                e.target.style.height = "40px";

                // Grow according to content
                e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();

                  sendMessage();

                  // Reset after sending
                  e.target.style.height = "40px";
                }
              }}
              placeholder="Type here..."
              rows={1}
            />

          {/* send button */}
            {loading ? (
  <span className="thinking-orbs-wrapper">
    <div className="thinking-orbs">
      <div className="thinking-orbs-scale">
        <ThinkingOrb state="solving" size={64} />
      </div>
    </div>

    <span className="thinking-orbs-tooltip">
      Please wait — the current response is still generating.
    </span>
  </span>
) : (
  <button
    className="send-button"
    onClick={sendMessage}
  >
    <RiArrowUpLine />
  </button>
)}

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
