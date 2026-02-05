import React, { useState } from "react";

function Level4({ userEmail, navigateTo, refreshUserData }) {
  const debugProblems = [
    {
      title: "Problem 1: Syntax Error",
      code: `#include <stdio.h>

int main() {
    int num = 10
    printf("Number: %d", num);
    return 0;
}`,
      question: "What is the error in this code?",
      options: [
        "Wrong variable name",
        "Missing return statement",
        "Missing semicolon",
        "Incorrect printf syntax",
      ],
      correct: 2,
    },
    {
      title: "Problem 2: Format Specifier Error",
      code: `#include <stdio.h>

int main() {
    float price = 99.99;
    printf("Price: %d", price);
    return 0;
}`,
      question: "What is the error in this code?",
      options: [
        "Wrong format specifier",
        "Incorrect variable type",
        "Missing semicolon",
        "Missing header file",
      ],
      correct: 0,
    },
    {
      title: "Problem 3: Missing Symbol",
      code: `#include <stdio.h>

int main() {
    printf("Hello World";
    return 0;
}`,
      question: "What is the error in this code?",
      options: [
        "Missing input",
        "Wrong printf syntax",
        "Missing semicolon",
        "Missing closing parenthesis",
      ],
      correct: 3,
    },
    {
      title: "Problem 4: Array Error",
      code: `#include <stdio.h>

int main() {
    int arr[5] = {1, 2, 3, 4, 5, 6};
    printf("Array created");
    return 0;
}`,
      question: "What is the error in this code?",
      options: [
        "The array is declared to hold 5 elements but 6 are given",
        "printf should have double quotes around the text",
        "The array cannot store numbers greater than 5",
        "The main function should not return 0",
      ],
      correct: 0,
    },
  ];

  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [solvedProblems, setSolvedProblems] = useState([]);

  const handleAnswerSelect = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === debugProblems[currentProblem].correct;
    setShowResult(true);

    if (isCorrect) {
      const newSolved = [...solvedProblems];
      newSolved[currentProblem] = true;
      setSolvedProblems(newSolved);
    }
  };

  const handleNext = () => {
    if (currentProblem < debugProblems.length - 1) {
      setCurrentProblem(currentProblem + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const allProblemsSolved =
    solvedProblems.length === debugProblems.length &&
    solvedProblems.every((s) => s === true);

  return (
    <div className="container">
      <h1>🐛 Level 4: Code Debugging</h1>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${((currentProblem + 1) / debugProblems.length) * 100}%`,
          }}
        />
      </div>

      <p style={{ textAlign: "center", margin: "10px 0", color: "#666" }}>
        Problem {currentProblem + 1} of {debugProblems.length}
      </p>

      {!allProblemsSolved ? (
        <>
          <h3 style={{ color: "#1e3c72", marginTop: "20px" }}>
            {debugProblems[currentProblem].title}
          </h3>

          <div className="code-editor">
            <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
              {debugProblems[currentProblem].code}
            </pre>
          </div>

          <div
            style={{
              background: "#f8f9fa",
              padding: "20px",
              borderRadius: "10px",
              margin: "20px 0",
            }}
          >
            <h3
              style={{
                color: "#1e3c72",
                marginBottom: "15px",
                fontSize: "1.1rem",
              }}
            >
              {debugProblems[currentProblem].question}
            </h3>

            <div className="quiz-options">
              {debugProblems[currentProblem].options.map((option, index) => (
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
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              style={{ width: "100%" }}
            >
              Submit Answer
            </button>
          )}

          {showResult && (
            <>
              {selectedAnswer === debugProblems[currentProblem].correct ? (
                <>
                  <div className="message success">
                    ✅ Correct! Bug identified!
                  </div>
                  {currentProblem < debugProblems.length - 1 ? (
                    <button
                      className="btn"
                      onClick={handleNext}
                      style={{ width: "100%", marginTop: "10px" }}
                    >
                      Next Problem →
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
            <h2 style={{ color: "#155724" }}>🎉 All Bugs Found!</h2>
            <p
              style={{ color: "#155724", fontSize: "1.2rem", margin: "10px 0" }}
            >
              You successfully identified all {debugProblems.length} bugs!
            </p>
          </div>

          <button
            className="btn"
            onClick={() => navigateTo("unlock4")}
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

export default Level4;
