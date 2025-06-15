// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase.js";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ فشل في إنشاء الحساب:", error.message);
      alert("❌ تأكد من صحة البيانات (البريد وكلمة المرور)");
    }
  };

  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ فشل التسجيل عبر Google:", error.message);
      alert("❌ حدث خطأ أثناء التسجيل عبر Google");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-100 px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-rose-600 mb-6">إنشاء حساب جديد</h2>

        <input
          type="email"
          placeholder="البريد الإلكتروني"
          className="w-full mb-4 p-3 border border-rose-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="كلمة المرور (6 أحرف على الأقل)"
          className="w-full mb-6 p-3 border border-rose-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-rose-600 text-white py-3 rounded hover:bg-rose-700 transition mb-3"
        >
          ✅ إنشاء الحساب
        </button>

        <button
          type="button"
          onClick={handleGoogleRegister}
          className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 transition flex items-center justify-center gap-2"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google"
            className="w-5 h-5"
          />
          التسجيل بواسطة Google
        </button>

        <p className="text-center mt-4 text-sm">
          لديك حساب؟{" "}
          <a href="/login" className="text-rose-700 underline">
            سجل دخولك
          </a>
        </p>
      </form>
    </div>
  );
}
