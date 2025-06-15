import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.js";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // ✅ إخفاء Navbar إن لم يكن المستخدم مسجلاً الدخول
  if (!currentUser) return null;

  // ✅ دالة تسجيل الخروج مع إعادة التوجيه
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { state: { fromLogout: true } }); // ✅ تصحيح هنا
    } catch (error) {
      console.error("❌ فشل في تسجيل الخروج:", error);
    }
  };

  return (
    <nav className="bg-pink-600 text-white px-6 py-4 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold tracking-wide">🌹 RoseVerse</h1>
        <ul className="flex gap-6 text-lg">
          <li>
            <Link to="/dashboard" className="hover:text-yellow-300 transition">
              لوحة التحكم
            </Link>
          </li>
          <li>
            <Link to="/add-rose" className="hover:text-yellow-300 transition">
              أضف وردة
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-yellow-300 transition">
              تواصل معنا
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="bg-yellow-400 text-pink-800 px-4 py-1 rounded-lg hover:bg-yellow-300 transition"
            >
              🚪 تسجيل الخروج
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
