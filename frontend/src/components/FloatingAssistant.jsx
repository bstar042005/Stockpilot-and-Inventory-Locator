import { useState } from "react";
import "./FloatingAssistant.css";

function FloatingAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleQuestion = (question, answer) => {
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: question },
      { sender: "bot", text: answer },
    ]);
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

            <p className="assistant-title">
              👋 Hi! Choose a question:
            </p>

           <button
            className="question-btn"
            onClick={() => setShowSearch(true)}
            >
            📍 Where is my product?
            </button>

            <button
              className="question-btn"
              onClick={() =>
                handleQuestion(
                  "➕ How do I add a product?",
                  responses.add
                )
              }
            >
              ➕ How do I add a product?
            </button>

            <button
              className="question-btn"
              onClick={() =>
                handleQuestion(
                  "⚠️ What is Low Stock?",
                  responses.stock
                )
              }
            >
              ⚠️ What is Low Stock?
            </button>

            <button
              className="question-btn"
              onClick={() =>
                handleQuestion(
                  "📦 How do I update inventory?",
                  responses.update
                )
              }
            >
              📦 How do I update inventory?
            </button>

            <button
              className="question-btn"
              onClick={() =>
                handleQuestion(
                  "👤 Contact Admin",
                  responses.admin
                )
              }
            >
              👤 Contact Admin
            </button>

            {showSearch && (
  <div className="search-box">

        <input
        type="text"
        placeholder="Enter Product Name or ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button className="search-btn">
        Search
        </button>

    </div>
    )}

            <div className="chat-history">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-message ${msg.sender}`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

          </div>

        </div>
      )}
    </>
  );
}

export default FloatingAssistant;