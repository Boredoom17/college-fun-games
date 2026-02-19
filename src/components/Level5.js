import React, { useState } from "react";
import { completeLevel } from "../utils/supabase";

function Level5({ userEmail, navigateTo, refreshUserData }) {
  const firstRow = [
    {
      icon: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Capcut-icon.png",
      letter: "C",
    },
    {
      icon: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Carbon_Icons_%28IBM%29_32_logo--snapchat.svg",
      letter: "S",
    },
    {
      icon: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
      letter: "I",
    },
    {
      icon: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
      letter: "A",
    },
    {
      icon: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
      letter: "L",
    },
    {
      icon: "https://upload.wikimedia.org/wikipedia/commons/4/49/Opera_2015_icon.svg",
      letter: "O",
    },
  ];

  const secondRow = [
    {
      icon: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
      letter: "I",
    },
    {
      icon: "https://upload.wikimedia.org/wikipedia/commons/6/63/Facebook_Messenger_logo_2025.svg",
      letter: "M",
    },
    {
      icon: "https://upload.wikimedia.org/wikipedia/commons/f/f7/2023_Android_Bot.png",
      letter: "A",
    },
    {
      icon: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Esewa_logo.webp",
      letter: "E",
    },
    {
      icon: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Discord-logo-icon.jpg",
      letter: "D",
    },
  ];

  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [completed, setCompleted] = useState(false);

  const correctAnswer = "socialmedia";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const normalizedAnswer = userAnswer
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "");

    if (normalizedAnswer === correctAnswer) {
      setMessage("✅ Correct! You unscrambled it!");
      setCompleted(true);

      await completeLevel(userEmail, 5);
      await refreshUserData();
    } else {
      setMessage("❌ Incorrect. Try again!");
      setUserAnswer("");
    }
  };

  const getInitials = (row) => {
    return row.map((app) => app.letter).join("");
  };

  return (
    <div className="container">
      <h1>🖼️ Level 5: Image Bingo</h1>

      <p style={{ textAlign: "center", margin: "20px 0", color: "#666" }}>
        Look at the app icons and find the hidden word from their initials!
      </p>

      {!completed ? (
        <>
          <div
            style={{
              background: "#f8f9fa",
              padding: "25px",
              borderRadius: "15px",
              margin: "20px 0",
            }}
          >
            <h3
              style={{
                color: "#1e3c72",
                marginBottom: "15px",
                textAlign: "center",
              }}
            ></h3>
            <div
              className="image-grid"
              style={{
                display: "flex",
                gap: "15px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {firstRow.map((app, index) => (
                <div
                  key={index}
                  className="image-item"
                  style={{ textAlign: "center" }}
                >
                  <img
                    src={app.icon}
                    alt={`App ${index + 1}`}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "contain",
                      marginBottom: "5px",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: "#f8f9fa",
              padding: "25px",
              borderRadius: "15px",
              margin: "20px 0",
            }}
          >
            <h3
              style={{
                color: "#1e3c72",
                marginBottom: "15px",
                textAlign: "center",
              }}
            ></h3>
            <div
              className="image-grid"
              style={{
                display: "flex",
                gap: "15px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {secondRow.map((app, index) => (
                <div
                  key={index}
                  className="image-item"
                  style={{ textAlign: "center" }}
                >
                  <img
                    src={app.icon}
                    alt={`App ${index + 1}`}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "contain",
                      marginBottom: "5px",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: "#fff3cd",
              border: "2px solid #ffc107",
              borderRadius: "10px",
              padding: "15px",
              margin: "20px 0",
              textAlign: "center",
            }}
          >
            <p style={{ color: "#856404", margin: 0, fontWeight: "bold" }}>
              💡 Hint: Unscramble the initials from both rows to form a two-word
              phrase!
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter the unscrambled word(s)"
              value={userAnswer}
              onChange={(e) => {
                setUserAnswer(e.target.value);
                setMessage("");
              }}
              style={{
                textAlign: "center",
                fontSize: "1.2rem",
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
              }}
            />

            {message && (
              <div
                className={`message ${
                  message.includes("Correct") ? "success" : "error"
                }`}
                style={{ marginBottom: "10px", textAlign: "center" }}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              className="btn"
              style={{ width: "100%", padding: "10px" }}
            >
              Submit Answer
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              fontSize: "0.85rem",
              color: "#999",
              marginTop: "15px",
            }}
          >
            Type without spaces (e.g., "demotest" not "demo test")
          </p>
        </>
      ) : (
        <>
          <div className="message success">
            <h2 style={{ color: "#155724" }}>🎉 Puzzle Solved!</h2>
            <p
              style={{ color: "#155724", fontSize: "1.2rem", margin: "10px 0" }}
            >
              You successfully unscrambled the word!
            </p>
          </div>

          <button
            className="btn"
            onClick={() => navigateTo("final")}
            style={{ width: "100%", marginTop: "20px", padding: "10px" }}
          >
            Continue to Final Stage →
          </button>
        </>
      )}

      <button
        className="btn btn-secondary"
        onClick={() => navigateTo("home")}
        style={{ width: "100%", marginTop: "10px", padding: "10px" }}
      >
        Back to Home
      </button>
    </div>
  );
}

export default Level5;
