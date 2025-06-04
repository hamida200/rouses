import React, { useState } from "react";
import './App.css';
import Login from "./Login";
import AddRose from "./AddRose";
import RosesList from "./RosesList";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleAddClick = () => {
    setShowLogin(true);
  };

  return (
    <div className="App">
      <h1>🌹 موسوعة الورود</h1>

      {/* زر إضافة وردة */}
      {!isLoggedIn && !showLogin && (
        <button onClick={handleAddClick}>➕ إضافة وردة</button>
      )}

      {/* تسجيل الدخول */}
      {showLogin && !isLoggedIn && (
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      )}

      {/* نموذج الإضافة */}
      {isLoggedIn && <AddRose />}

      {/* عرض الورود */}
      <RosesList />
    </div>
  );
}

export default App;
