import React, { useState } from "react";

function Level3({ userEmail, navigateTo, refreshUserData }) {
  const riddles = [
    {
      emoji1: "🐜",
      emoji2: "🤖",
      answer: "android",
    },
    {
      emoji1: "⬆️",
      emoji2: "📅",
      answer: "update",
    },
    {
      emoji1: "⚫",
      emoji2: "🕸️",
      answer: "darkweb",
    },
    {
      emoji1: "🔥",
      emoji2: "🧱",
      answer: "firewall",
    },
    {
      emoji1: "🔢",
      emoji2: "🔁",
      answer: "loop",
    },
    {
      emoji1: "💾",
      emoji2: "💿",
      answer: "floppydisk",
    },
    {
      emoji1: "🔋",
      emoji2: "🏦",
      answer: "powerbank",
    },
    {
      emoji1: "📷",
      emoji2: "📞",
      answer: "videocall",
    },
  ];

  const [currentRiddle, setCurrentRiddle] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [solvedRiddles, setSolvedRiddles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const normalizedAnswer = userAnswer
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "");
    const correctAnswer = riddles[currentRiddle].answer.toLowerCase();

    if (normalizedAnswer === correctAnswer) {
      setMessage("✅ Correct!");
      const newSolved = [...solvedRiddles];
      newSolved[currentRiddle] = true;
      setSolvedRiddles(newSolved);

      setTimeout(() => {
        if (currentRiddle < riddles.length - 1) {
          setCurrentRiddle(currentRiddle + 1);
          setUserAnswer("");
          setMessage("");
        }
      }, 1000);
    } else {
      setMessage("❌ Incorrect. Try again!");
      setUserAnswer("");
    }
  };

  const allRiddlesSolved =
    solvedRiddles.length === riddles.length &&
    solvedRiddles.every((s) => s === true);

  return (
    <div className="container">
      <h1>🎭 Level 3: Emoji Riddles</h1>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${((currentRiddle + 1) / riddles.length) * 100}%` }}
        />
      </div>

      <p style={{ textAlign: "center", margin: "10px 0", color: "#666" }}>
        Riddle {currentRiddle + 1} of {riddles.length}
      </p>

      {!allRiddlesSolved ? (
        <>
          <div
            style={{
              background: "#f8f9fa",
              padding: "40px",
              borderRadius: "15px",
              margin: "30px 0",
              textAlign: "center",
            }}
          >
            <p
              style={{ fontSize: "1rem", color: "#666", marginBottom: "20px" }}
            >
              Combine these emojis to form a word:
            </p>

            <div className="emoji-display">
              <span>{riddles[currentRiddle].emoji1}</span>
              <span style={{ fontSize: "3rem", color: "#1e3c72" }}>+</span>
              <span>{riddles[currentRiddle].emoji2}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your answer"
              value={userAnswer}
              onChange={(e) => {
                setUserAnswer(e.target.value);
                setMessage("");
              }}
              style={{ textAlign: "center", fontSize: "1.2rem" }}
            />

            {message && (
              <div
                className={`message ${
                  message.includes("Correct") ? "success" : "error"
                }`}
              >
                {message}
              </div>
            )}

            <button type="submit" className="btn" style={{ width: "100%" }}>
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
            Hint: Type the word without spaces (e.g., "demotest" not "demo
            test")
          </p>
        </>
      ) : (
        <>
          <div className="message success">
            <h2 style={{ color: "#155724" }}>🎉 All Riddles Solved!</h2>
            <p
              style={{ color: "#155724", fontSize: "1.2rem", margin: "10px 0" }}
            >
              You solved all {riddles.length} emoji riddles!
            </p>
          </div>

          <button
            className="btn"
            onClick={() => navigateTo("unlock3")}
            style={{ width: "100%", marginTop: "20px" }}
          >
            Continue to Next Clue →
          </button>
        </>
      )}

      <button
        className="btn btn-secondary"
        onClick={() => navigateTo("home")}
        style={{ width: "100%", marginTop: "10px" }}
      >
        Back to Home
      </button>
    </div>
  );
}

export default Level3;
