
import React, { useState } from "react";
import { supabase } from "../utils/supabase";

function Login({ onLogin }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}`
        }
      });
      
      if (error) throw error;
    } catch (error) {
      setError("Failed to login with Google. Please try again.");
      console.error("Google login error:", error);
      setLoading(false);
    }
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
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 24px",
            backgroundColor: "#4285f4",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "500",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <path d="M17.6 9.2l-.1-1.8H9v3.4h4.8C13.6 12 13 13 12 13.6v2.2h3a8.8 8.8 0 0 0 2.6-6.6z" fill="#4285F4"/>
              <path d="M9 18c2.4 0 4.5-.8 6-2.2l-3-2.2a5.4 5.4 0 0 1-8-2.9H1V13a9 9 0 0 0 8 5z" fill="#34A853"/>
              <path d="M4 10.7a5.4 5.4 0 0 1 0-3.4V5H1a9 9 0 0 0 0 8l3-2.3z" fill="#FBBC05"/>
              <path d="M9 3.6c1.3 0 2.5.4 3.4 1.3L15 2.3A9 9 0 0 0 1 5l3 2.4a5.4 5.4 0 0 1 5-3.7z" fill="#EA4335"/>
            </g>
          </svg>
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>
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
