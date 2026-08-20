import React from "react";

const App = () => {
  return (
    <div className="container">
      <div className="card">
        <div className="icon">✦</div>

        <h1>Agentic AI</h1>

        <p>
          This AI agent currently runs only in the
          <span> terminal.</span>
        </p>

        <div className="terminal">
          <div>
            <span>$</span> cd backend
          </div>

          <div>
            <span>$</span> node ./index.js
          </div>
        </div>

        <div className="info">
          <p>
            The web interface is currently in development.
          </p>

          <p>
            This page is only a project information screen for now.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
