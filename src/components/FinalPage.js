import React, { useEffect, useState } from "react";
import { assignParticipantNumber, getOrCreateUser } from "../utils/supabase";

function FinalPage({ userEmail, onBack }) {
  const [participantNumber, setParticipantNumber] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const assignNumber = async () => {
      const userData = await getOrCreateUser(userEmail);

      if (userData.participant_number) {
        setParticipantNumber(userData.participant_number);
      } else {
        const updated = await assignParticipantNumber(userEmail);
        setParticipantNumber(updated.participant_number);
      }

      setLoading(false);
    };

    assignNumber();
  }, [userEmail]);

  if (loading) {
    return (
      <div className="container">
        <div className="spinner"></div>
        <p style={{ textAlign: "center" }}>Processing...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>🎉 All Levels Complete!</h1>

      <div className="message success">
        <h2 style={{ color: "#155724" }}>
          Well done! You made it through all challenges!
        </h2>
      </div>

      <div
        style={{
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
          color: "white",
          padding: "40px",
          borderRadius: "15px",
          margin: "30px 0",
          textAlign: "center",
        }}
      >
        <h2
          style={{ color: "white", marginBottom: "20px", fontSize: "1.3rem" }}
        >
          Your Participant Number
        </h2>
        <div
          style={{
            fontSize: "5rem",
            fontWeight: "bold",
            color: "white",
            margin: "30px 0",
            letterSpacing: "10px",
          }}
        >
          {String(participantNumber).padStart(2, "0")}
        </div>
      </div>

      <div
        style={{
          background: "#e3f2fd",
          border: "2px solid #2196f3",
          borderRadius: "15px",
          padding: "30px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        <h3
          style={{ color: "#1565c0", marginBottom: "15px", fontSize: "1.4rem" }}
        >
          🖥️ Final Stage
        </h3>
        <p
          style={{
            fontSize: "1.2rem",
            color: "#1976d2",
            margin: "10px 0",
            lineHeight: "1.6",
          }}
        >
          Head to the <strong>Computer Lab</strong> now for your final test!
        </p>
        <p
          style={{
            fontSize: "1rem",
            color: "#1976d2",
            marginTop: "15px",
          }}
        ></p>
      </div>

      <button
        className="btn btn-secondary"
        onClick={onBack}
        style={{ width: "100%", marginTop: "20px" }}
      >
        Back to Home
      </button>
    </div>
  );
}

export default FinalPage;
