import { useState } from "react";
import "./FloatingAssistant.css";

function FloatingAssistant() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="floating-assistant"
        onClick={() => setOpen(true)}
      >
        💬
      </button>

      {open && (
        <div className="assistant-window">
          <div className="assistant-header">
            <h3>Warehouse Assistant</h3>

            <button
              className="close-btn"
              onClick={() => setOpen(false)}
            >
              ✖
            </button>
          </div>

          <div className="assistant-body">
            Welcome! 👋
            <br />
            I can help you with warehouse-related questions.
          </div>
        </div>
      )}
    </>
  );
}

export default FloatingAssistant;