
import React, { useState, useEffect } from "react";
import "./styles.css";
import { getOrCreateUser, supabase } from "./utils/supabase";
import Login from "./components/Login";
import Home from "./components/Home";
import Level1 from "./components/Level1";
import Level2 from "./components/Level2";
import Level3 from "./components/Level3";
import Level4 from "./components/Level4";
import Level5 from "./components/Level5";
import UnlockPage from "./components/UnlockPage";
import FinalPage from "./components/FinalPage";

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("login");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check for existing Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email) {
        loadUser(session.user.email);
      } else {
        // Fallback: check localStorage for old sessions
        const savedEmail = localStorage.getItem("userEmail");
        if (savedEmail) {
          loadUser(savedEmail);
        }
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.email) {
        loadUser(session.user.email);
      } else if (_event === 'SIGNED_OUT') {
        handleLogout();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUser = async (email) => {
    const data = await getOrCreateUser(email);
    if (data) {
      setUser(email);
      setUserData(data);
      localStorage.setItem("userEmail", email);
      setCurrentPage("home");
    }
  };

  const handleLogin = async (email) => {
    localStorage.setItem("userEmail", email);
    await loadUser(email);
  };

  const handleLogout = async () => {
    // Sign out from Supabase
    await supabase.auth.signOut();
    localStorage.removeItem("userEmail");
    setUser(null);
    setUserData(null);
    setCurrentPage("login");
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const refreshUserData = async () => {
    if (user) {
      const data = await getOrCreateUser(user);
      setUserData(data);
    }
  };

  return (
    <div className="App">
      {currentPage === "login" && <Login onLogin={handleLogin} />}
      {currentPage === "home" && (
        <Home
          userData={userData}
          navigateTo={navigateTo}
          onLogout={handleLogout}
        />
      )}
      {currentPage === "level1" && (
        <Level1
          userEmail={user}
          navigateTo={navigateTo}
          refreshUserData={refreshUserData}
        />
      )}
      {currentPage === "unlock1" && (
        <UnlockPage
          levelNumber={1}
          clueText="I'm where empty stomachs find peace and friends gather for a feast. Tables and chairs everywhere, with the smell of food in the air."
          unlockWord="go"
          userEmail={user}
          navigateTo={navigateTo}
          refreshUserData={refreshUserData}
        />
      )}
      {currentPage === "level2" && (
        <Level2
          userEmail={user}
          navigateTo={navigateTo}
          refreshUserData={refreshUserData}
        />
      )}
      {currentPage === "unlock2" && (
        <UnlockPage
          levelNumber={2}
          clueText="Shh! I'm filled with books from floor to ceiling. Students come here for quiet reading and studying."
          unlockWord="to"
          userEmail={user}
          navigateTo={navigateTo}
          refreshUserData={refreshUserData}
        />
      )}
      {currentPage === "level3" && (
        <Level3
          userEmail={user}
          navigateTo={navigateTo}
          refreshUserData={refreshUserData}
        />
      )}
      {currentPage === "unlock3" && (
        <UnlockPage
          levelNumber={3}
          clueText="I'm the first thing you see when you arrive, and the last thing you pass when you leave. I welcome you in and bid you goodbye."
          unlockWord="computer"
          userEmail={user}
          navigateTo={navigateTo}
          refreshUserData={refreshUserData}
        />
      )}
      {currentPage === "level4" && (
        <Level4
          userEmail={user}
          navigateTo={navigateTo}
          refreshUserData={refreshUserData}
        />
      )}
      {currentPage === "unlock4" && (
        <UnlockPage
          levelNumber={4}
          clueText="I'm always hot but never angry. Students visit me for a warm drink throughout the day."
          unlockWord="lab"
          userEmail={user}
          navigateTo={navigateTo}
          refreshUserData={refreshUserData}
        />
      )}
      {currentPage === "level5" && (
        <Level5
          userEmail={user}
          navigateTo={navigateTo}
          refreshUserData={refreshUserData}
        />
      )}
      {currentPage === "final" && (
        <FinalPage userEmail={user} onBack={() => navigateTo("home")} />
      )}
    </div>
  );
}

export default App;
