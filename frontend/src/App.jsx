import React from "react";
import { RiChatNewLine, RiArrowRightFill } from "@remixicon/react";

const App = () => {
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
          <div className="welcome">
            <div className="welcome-icon">✦</div>
            <h2>How can I help you?</h2>
            <p>Ask anything and start a conversation with Agentic AI.</p>
          </div>

          <div className="chat-input">
            <input type="text" placeholder="Type here..." />
            <button className="send-button">
              <RiArrowRightFill/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
