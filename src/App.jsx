import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddRose from "./pages/AddRose";
import RosesList from "./pages/RosesList";
import EditRose from "./pages/EditRose";
import Contact from "./pages/Contact";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />

        {user && (
          <>
            <Route path="/add-rose" element={<AddRose />} />
            <Route path="/roses" element={<RosesList />} />
            <Route path="/edit/:id" element={<EditRose />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
