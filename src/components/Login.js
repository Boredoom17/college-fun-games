import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Login({ onLogin }) {
  const [error, setError] = useState("");

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const email = decoded.email;
      onLogin(email);
    } catch (error) {
      setError("Failed to login with Google. Please try again.");
      console.error("Google login error:", error);
    }
  };

  const handleGoogleError = () => {
    setError("Google login failed. Please try again.");
  };

  return (
    <div className="container">
      <h1>🎮 College Sport Week</h1>
      <h2>IT Club Challenge</h2>
      <p style={{ textAlign: "center", color: "#666", marginBottom: "30px" }}>
        Welcome! Sign in with Google to start the challenge
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap
          theme="filled_blue"
          size="large"
          text="signin_with"
          shape="rectangular"
        />
      </div>

      {error && <div className="message error">{error}</div>}

      <p
        style={{
          textAlign: "center",
          fontSize: "0.85rem",
          marginTop: "20px",
          color: "#999",
        }}
      >
        Your progress will be saved automatically
      </p>
    </div>
  );
}

export default Login;
