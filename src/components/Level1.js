import React, { useState, useEffect } from "react";

function Level1({ userEmail, navigateTo, refreshUserData }) {
  const TARGET_WORD = "VIDEO";
  const MAX_ATTEMPTS = 6;

  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [gameStatus, setGameStatus] = useState("playing"); // playing, won, lost
  const [message, setMessage] = useState("");

  const handleKeyPress = (letter) => {
    if (gameStatus !== "playing") return;
    if (currentGuess.length < 5) {
      setCurrentGuess(currentGuess + letter);
    }
  };

  const handleBackspace = () => {
    if (gameStatus !== "playing") return;
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const handleSubmit = () => {
    if (currentGuess.length !== 5) {
      setMessage("Word must be 5 letters!");
      return;
    }

    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);
    setCurrentGuess("");
    setMessage("");

    if (currentGuess === TARGET_WORD) {
      setGameStatus("won");
      setMessage("🎉 Congratulations! You found the word!");
    } else if (newGuesses.length >= MAX_ATTEMPTS) {
      setGameStatus("lost");
      setMessage(`Game Over! Try Again `);
    }
  };

  const getLetterColor = (letter, index, word) => {
    if (word[index] === TARGET_WORD[index]) {
      return "#28a745"; // Green - correct position
    } else if (TARGET_WORD.includes(letter)) {
      return "#ffc107"; // Yellow - wrong position
    } else {
      return "#6c757d"; // Gray - not in word
    }
  };

  const handleContinue = () => {
    navigateTo("unlock1");
  };

  const keyboard = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  return (
    <div className="container">
      <h1>🎮 Level 1: Wordle</h1>
      <p style={{ textAlign: "center" }}>Guess the 5-letter word!</p>

      <div style={{ margin: "30px 0" }}>
        {/* Previous guesses */}
        {guesses.map((guess, guessIndex) => (
          <div
            key={guessIndex}
            style={{
              display: "flex",
              gap: "5px",
              justifyContent: "center",
              marginBottom: "5px",
            }}
          >
            {guess.split("").map((letter, letterIndex) => (
              <div
                key={letterIndex}
                style={{
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: getLetterColor(letter, letterIndex, guess),
                  borderRadius: "5px",
                }}
              >
                {letter}
              </div>
            ))}
          </div>
        ))}

        {/* Current guess */}
        {gameStatus === "playing" && guesses.length < MAX_ATTEMPTS && (
          <div
            style={{
              display: "flex",
              gap: "5px",
              justifyContent: "center",
              marginBottom: "5px",
            }}
          >
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                style={{
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#333",
                  backgroundColor: "#fff",
                  border: "2px solid #ddd",
                  borderRadius: "5px",
                }}
              >
                {currentGuess[index] || ""}
              </div>
            ))}
          </div>
        )}

        {/* Empty rows */}
        {[
          ...Array(
            MAX_ATTEMPTS - guesses.length - (gameStatus === "playing" ? 1 : 0)
          ),
        ].map((_, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              display: "flex",
              gap: "5px",
              justifyContent: "center",
              marginBottom: "5px",
            }}
          >
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#f5f5f5",
                  border: "2px solid #ddd",
                  borderRadius: "5px",
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {message && (
        <div
          className={`message ${
            gameStatus === "won"
              ? "success"
              : gameStatus === "lost"
              ? "error"
              : "info"
          }`}
        >
          {message}
        </div>
      )}

      {/* Keyboard */}
      {gameStatus === "playing" && (
        <div style={{ marginTop: "20px" }}>
          {keyboard.map((row, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                display: "flex",
                gap: "5px",
                justifyContent: "center",
                marginBottom: "5px",
              }}
            >
              {rowIndex === 2 && (
                <button
                  onClick={handleSubmit}
                  style={{
                    padding: "10px 15px",
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  ENTER
                </button>
              )}
              {row.map((letter) => (
                <button
                  key={letter}
                  onClick={() => handleKeyPress(letter)}
                  style={{
                    width: "40px",
                    height: "50px",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    backgroundColor: "#ddd",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  {letter}
                </button>
              ))}
              {rowIndex === 2 && (
                <button
                  onClick={handleBackspace}
                  style={{
                    padding: "10px 15px",
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  ⌫
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {gameStatus === "won" && (
        <button
          className="btn"
          onClick={handleContinue}
          style={{ width: "100%", marginTop: "20px" }}
        >
          Continue to Next Clue →
        </button>
      )}

      {gameStatus === "lost" && (
        <button
          className="btn"
          onClick={() => window.location.reload()}
          style={{ width: "100%", marginTop: "20px" }}
        >
          Try Again
        </button>
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

export default Level1;
