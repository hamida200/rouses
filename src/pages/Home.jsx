// src/pages/Home.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import RoseGallery from "../components/RoseGallery";

export default function Home() {
  const location = useLocation();
  const fromLogout = location.state?.fromLogout;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-100 to-rose-200 flex flex-col items-center px-6 pt-28 pb-16">
      
      {/* ✅ رسالة الوداع بعد تسجيل الخروج */}
      {fromLogout && (
        <div className="bg-white/80 border border-rose-300 shadow-2xl rounded-2xl p-6 mb-10 text-center max-w-2xl animate-fade-in backdrop-blur-sm">
          <h2 className="text-3xl md:text-4xl font-bold text-rose-700 mb-3 tracking-wide">
            شكرًا لك للمستك المبهرة! 🌸
          </h2>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
            نسأل الله أن يبارك في وقتك وجهدك 💐<br />
            <span className="text-pink-600 font-semibold">
              "اللهم اجعل هذا اليوم حافلًا بالخيرات والسرور، وارزقنا من حيث لا نحتسب"
            </span>
          </p>
        </div>
      )}

      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-pink-700 mb-4 drop-shadow-md animate-fade-in-up">
        🌹 مرحبًا بك في موسوعة الورود الزاهية
      </h1>

      <p className="text-lg md:text-xl text-center text-gray-700 mb-8 max-w-2xl animate-fade-in-up">
        استمتع بجمال الورود القادمة من كل مدن العالم، وكن أنت أيضًا جزءًا من هذه الحديقة الإلكترونية عبر إضافة وردتك الخاصة!
      </p>

      <Link
        to="/login"
        className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-lg px-8 py-3 rounded-full shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in-up"
      >
        🔐 سجّل دخولك الآن وأضف وردتك
      </Link>

      <div className="w-full max-w-6xl mt-16">
        <RoseGallery />
      </div>
    </div>
  );
}
