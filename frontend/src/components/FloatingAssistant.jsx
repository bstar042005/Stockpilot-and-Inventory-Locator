import { useState } from "react";
import "./FloatingAssistant.css";

function FloatingAssistant() {
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState("");

  const responses = {
  location:
    "Go to the Inventory page and check the Shelf column to locate your product.",

  add:
    "Navigate to Inventory and click 'Add Product'. Fill in the product details and save.",

  stock:
    "Low stock means the available quantity has fallen below the minimum threshold.",

  update:
    "Open Inventory, select the product, edit its quantity, and save the changes.",

  admin:
    "Please contact the warehouse administrator for further assistance.",
};

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

            <p><strong>Hi! 👋 Choose a question:</strong></p>

            <button
                className="question-btn"
                onClick={() => setAnswer(responses.location)}
            >
                📍 Where is my product?
            </button>

            <button
                className="question-btn"
                onClick={() => setAnswer(responses.add)}
            >
                ➕ How do I add a product?
            </button>

            <button
                className="question-btn"
                onClick={() => setAnswer(responses.stock)}
            >
                ⚠️ What is Low Stock?
            </button>

            <button
                className="question-btn"
                onClick={() => setAnswer(responses.update)}
            >
                📦 How do I update inventory?
            </button>

            <button
                className="question-btn"
                onClick={() => setAnswer(responses.admin)}
            >
                👤 Contact Admin
            </button>

            {answer && (
                <div className="assistant-answer">
                {answer}
                </div>
            )}

            </div>
        </div>
      )}
    </>
  );
}

export default FloatingAssistant;