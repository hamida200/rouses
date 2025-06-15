import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ فشل تسجيل الدخول:", error.message);
      alert("❌ البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ فشل تسجيل الدخول عبر Google:", error.message);
      alert("❌ حدث خطأ أثناء تسجيل الدخول عبر Google");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-pink-200 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-pink-700 mb-6">
          🎀 تسجيل الدخول
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="📧 البريد الإلكتروني"
            className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="🔒 كلمة المرور"
            className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-3 rounded-lg font-bold hover:bg-pink-700 transition duration-300 shadow-md"
          >
            🔐 دخول
          </button>
        </form>

        <div className="mt-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition duration-300 shadow"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google"
              className="w-5 h-5"
            />
            تسجيل الدخول بواسطة Google
          </button>
        </div>

        <p className="text-center mt-6 text-sm text-gray-600">
          لا تملك حسابًا؟{" "}
          <a href="/register" className="text-pink-700 font-bold underline hover:text-pink-500">
            أنشئ حساب جديد
          </a>
        </p>
      </div>
    </div>
  );
}
