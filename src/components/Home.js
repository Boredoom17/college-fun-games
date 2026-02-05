import React from "react";

function Home({ userData, navigateTo, onLogout }) {
  const levels = [
    { id: 1, name: "Level 1", description: "Wordle Challenge", page: "level1" },
    { id: 2, name: "Level 2", description: "IT Quiz", page: "level2" },
    { id: 3, name: "Level 3", description: "Emoji Riddles", page: "level3" },
    { id: 4, name: "Level 4", description: "Code Debugging", page: "level4" },
    { id: 5, name: "Level 5", description: "Image Bingo", page: "level5" },
  ];

  const isLevelUnlocked = (levelId) => {
    return userData && userData.current_level >= levelId;
  };

  const isLevelCompleted = (levelId) => {
    if (!userData || !userData.completed_levels) return false;
    const completed = JSON.parse(userData.completed_levels);
    return completed.includes(levelId);
  };

  const handleLevelClick = (level) => {
    if (isLevelUnlocked(level.id)) {
      navigateTo(level.page);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div>
          <h1>🎮 IT Club Challenge</h1>
          <div className="user-info">Logged in as: {userData?.user_email}</div>
        </div>
        <button className="btn btn-secondary" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${((userData?.current_level - 1) / levels.length) * 100}%`,
          }}
        />
      </div>

      <p style={{ textAlign: "center", marginBottom: "30px" }}>
        Complete all levels to reach the computer lab for the final test!
      </p>

      <div className="level-grid">
        {levels.map((level) => {
          const unlocked = isLevelUnlocked(level.id);
          const completed = isLevelCompleted(level.id);

          return (
            <div
              key={level.id}
              className={`level-card ${!unlocked ? "locked" : ""} ${
                completed ? "completed" : ""
              }`}
              onClick={() => handleLevelClick(level)}
            >
              {!unlocked && <div className="lock-icon">🔒</div>}
              {completed && <div className="lock-icon">✅</div>}
              {unlocked && !completed && <div className="lock-icon">🎯</div>}

              <h3>{level.name}</h3>
              <p>{level.description}</p>

              {!unlocked && (
                <p style={{ fontSize: "0.8rem" }}>
                  Complete previous level to unlock
                </p>
              )}
              {completed && <p style={{ fontSize: "0.8rem" }}>Completed!</p>}
            </div>
          );
        })}
      </div>

      {userData?.current_level > 5 && (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button
            className="btn"
            onClick={() => navigateTo("final")}
            style={{ fontSize: "1.2rem", padding: "15px 40px" }}
          >
            🎉 View Final Instructions
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
