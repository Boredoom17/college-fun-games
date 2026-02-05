import React, { useState } from "react";

function Level2({ userEmail, navigateTo, refreshUserData }) {
  const questions = [
    {
      question: "Which key is used to refresh a webpage?",
      options: ["Esc", "Ctrl + C", "Ctrl + P", "Ctrl + R"],
      correct: 3,
    },
    {
      question:
        "You're downloading a file and the speed is extremely slow. Which factor MOST affects download speed?",
      options: [
        "Screen brightness",
        "Internet bandwidth",
        "Keyboard type",
        "File name",
      ],
      correct: 1,
    },
    {
      question:
        "Which file extension is commonly associated with compressed files?",
      options: [".exe", ".zip", ".txt", ".png"],
      correct: 1,
    },
    {
      question: "What is the correct term for malicious software?",
      options: ["Freeware", "Shareware", "Malware", "Middleware"],
      correct: 2,
    },
    {
      question: "What does 'SSID' refer to in wireless networking?",
      options: [
        "Network password",
        "Wi-Fi network name",
        "Router IP address",
        "Encryption type",
      ],
      correct: 1,
    },
    {
      question: "Which of the following is a strong password?",
      options: ["password123", "john1998", "P@5w0rD!92", "abcdef"],
      correct: 2,
    },
    {
      question: "What happens when a computer enters sleep mode?",
      options: [
        "It shuts down completely",
        "It restarts automatically",
        "It saves the session in memory and uses low power",
        "It formats the hard drive",
      ],
      correct: 2,
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredCorrectly, setAnsweredCorrectly] = useState([]);

  const handleAnswerSelect = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correct;
    setShowResult(true);

    if (isCorrect) {
      setScore(score + 1);
      const newAnswered = [...answeredCorrectly];
      newAnswered[currentQuestion] = true;
      setAnsweredCorrectly(newAnswered);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const allQuestionsAnswered =
    answeredCorrectly.length === questions.length &&
    answeredCorrectly.every((a) => a === true);

  return (
    <div className="container">
      <h1>📝 Level 2: IT Quiz</h1>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${((currentQuestion + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      <p style={{ textAlign: "center", margin: "10px 0", color: "#666" }}>
        Question {currentQuestion + 1} of {questions.length} | Score: {score}/
        {questions.length}
      </p>

      {!allQuestionsAnswered ? (
        <>
          <div
            style={{
              background: "#f8f9fa",
              padding: "25px",
              borderRadius: "10px",
              margin: "20px 0",
            }}
          >
            <h3 style={{ color: "#1e3c72", marginBottom: "20px" }}>
              {questions[currentQuestion].question}
            </h3>

            <div className="quiz-options">
              {questions[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  className={`quiz-option ${
                    selectedAnswer === index ? "selected" : ""
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                  style={{
                    cursor: showResult ? "default" : "pointer",
                  }}
                >
                  <strong>{String.fromCharCode(65 + index)}.</strong> {option}
                </div>
              ))}
            </div>
          </div>

          {!showResult && (
            <button
              className="btn"
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              style={{ width: "100%" }}
            >
              Submit Answer
            </button>
          )}

          {showResult && (
            <>
              {selectedAnswer === questions[currentQuestion].correct ? (
                <>
                  <div className="message success">✅ Correct! Well done!</div>
                  {currentQuestion < questions.length - 1 ? (
                    <button
                      className="btn"
                      onClick={handleNextQuestion}
                      style={{ width: "100%", marginTop: "10px" }}
                    >
                      Next Question →
                    </button>
                  ) : null}
                </>
              ) : (
                <>
                  <div className="message error">❌ Incorrect. Try again!</div>
                  <button
                    className="btn"
                    onClick={handleRetry}
                    style={{ width: "100%", marginTop: "10px" }}
                  >
                    Try Again
                  </button>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <div className="message success">
            <h2 style={{ color: "#155724" }}>🎉 Quiz Complete!</h2>
            <p
              style={{ color: "#155724", fontSize: "1.2rem", margin: "10px 0" }}
            >
              Perfect Score: {score}/{questions.length}
            </p>
          </div>

          <button
            className="btn"
            onClick={() => navigateTo("unlock2")}
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

export default Level2;
