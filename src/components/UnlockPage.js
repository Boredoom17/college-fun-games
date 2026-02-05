import React, { useState } from "react";
import { completeLevel } from "../utils/supabase";

function UnlockPage({
  levelNumber,
  clueText,
  unlockWord,
  userEmail,
  navigateTo,
  refreshUserData,
}) {
  const [inputWord, setInputWord] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (inputWord.toLowerCase().trim() === unlockWord.toLowerCase()) {
      setLoading(true);

      await completeLevel(userEmail, levelNumber);
      await refreshUserData();

      setLoading(false);

      if (levelNumber === 5) {
        navigateTo("final");
      } else {
        navigateTo("home");
      }
    } else {
      setError("Wrong word! Try again.");
      setInputWord("");
    }
  };

  return (
    <div className="container">
      <div className="message success" style={{ marginBottom: "30px" }}>
        <h2 style={{ color: "#155724", marginBottom: "5px" }}>
          ✅ Level {levelNumber} Complete!
        </h2>
      </div>

      <div
        style={{
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
          color: "white",
          padding: "35px",
          borderRadius: "15px",
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        <h2
          style={{ color: "white", marginBottom: "20px", fontSize: "1.6rem" }}
        >
          🔒 Next Level Locked
        </h2>
        <p
          style={{
            color: "white",
            fontSize: "1.15rem",
            marginBottom: "25px",
            lineHeight: "1.6",
          }}
        >
          To unlock the next level, solve this riddle and go to that location.
          You'll find the unlock word there!
        </p>
        <div
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            padding: "25px",
            borderRadius: "12px",
            border: "2px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <p
            style={{
              color: "white",
              fontSize: "1.2rem",
              fontStyle: "italic",
              lineHeight: "1.7",
              margin: 0,
            }}
          >
            "{clueText}"
          </p>
        </div>
      </div>

      <div
        style={{
          background: "#fff3cd",
          border: "2px solid #ffc107",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "25px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "#856404",
            margin: 0,
            fontSize: "1rem",
            fontWeight: "500",
          }}
        >
          💡 Find the location, look for the unlock word posted there, then
          enter it below!
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter the unlock word you found"
          value={inputWord}
          onChange={(e) => {
            setInputWord(e.target.value);
            setError("");
          }}
          disabled={loading}
          style={{ textAlign: "center", fontSize: "1.1rem" }}
        />

        {error && <div className="message error">{error}</div>}

        <button
          type="submit"
          className="btn"
          style={{ width: "100%" }}
          disabled={loading}
        >
          {loading ? "Unlocking..." : "🔓 Unlock Next Level"}
        </button>
      </form>

      <button
        className="btn btn-secondary"
        onClick={() => navigateTo("home")}
        style={{ width: "100%", marginTop: "15px" }}
        disabled={loading}
      >
        Back to Home
      </button>
    </div>
  );
}

export default UnlockPage;
