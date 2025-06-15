import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";

export default function Contact() {
  const { currentUser } = useAuth();

  if (!currentUser) return <Navigate to="/login" replace />;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "messages"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("❌ خطأ أثناء إرسال الرسالة:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-16 px-8 py-12 bg-gradient-to-br from-pink-50 to-white rounded-3xl shadow-2xl">
      <h2 className="text-4xl font-extrabold text-pink-700 text-center mb-8 drop-shadow">
        📬 تواصل معنا
      </h2>

      {submitted ? (
        <div className="text-center text-green-600 font-bold text-lg animate-pulse">
          ✅ تم إرسال رسالتك بنجاح! سنرد عليك قريبًا 💌
        </div>
      ) : (
        <>
          <p className="text-center text-gray-600 text-md mb-8 leading-relaxed">
            هل لديك سؤال أو اقتراح؟ أرسل لنا رسالة وسنكون سعداء بالتواصل معك ❤️
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 text-gray-700">
            <div>
              <label className="block text-sm font-semibold mb-2">👤 الاسم الكامل</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="أدخل اسمك"
                className="w-full p-4 border border-pink-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">📧 البريد الإلكتروني</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="w-full p-4 border border-pink-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">✍️ رسالتك</label>
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="اكتب رسالتك هنا..."
                className="w-full p-4 border border-pink-200 rounded-xl shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white text-lg font-bold py-3 rounded-xl transition shadow-lg"
            >
              ✉️ إرسال الرسالة
            </button>
          </form>
        </>
      )}

      <div className="mt-10 border-t pt-4 text-center text-sm text-gray-500">
        أو تواصل معنا مباشرة عبر البريد الإلكتروني:{" "}
        <a
          href="mailto:roseverse@flowers.com"
          className="text-pink-700 font-semibold underline"
        >
          roseverse@flowers.com
        </a>
      </div>
    </div>
  );
}
