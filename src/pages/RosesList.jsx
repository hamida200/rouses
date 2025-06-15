import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function RosesList() {
  const [roses, setRoses] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      fetchRoses();
    }
  }, [currentUser]);

  const fetchRoses = async () => {
    try {
      const snapshot = await getDocs(collection(db, "roses"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRoses(data);
    } catch (error) {
      console.error("❌ فشل في جلب البيانات:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الوردة؟")) {
      try {
        await deleteDoc(doc(db, "roses", id));
        fetchRoses();
      } catch (error) {
        console.error("❌ فشل في حذف الوردة:", error);
      }
    }
  };

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-100 to-fuchsia-100 px-6 pt-32 pb-16">
      <div className="max-w-7xl mx-auto">
        {/* زر الإضافة */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate("/add-rose")}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:scale-105 transition-all"
          >
            ➕ إضافة وردة جديدة
          </button>
        </div>

        <h2 className="text-5xl font-extrabold text-center text-pink-700 mb-16 drop-shadow-md tracking-wide">
          🌺 معرض الورود الزاهية
        </h2>

        {roses.length === 0 ? (
          <p className="text-center text-gray-600 text-lg mt-10">لا توجد ورود لعرضها حالياً.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {roses.map((rose) => (
              <div
                key={rose.id}
                className="bg-white border border-pink-100 rounded-3xl p-5 shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 relative"
              >
                <img
                  src={rose.imageUrl || rose.imageURL || "/fallback.jpg"}
                  alt={rose.name || "Rose"}
                  className="w-full h-56 object-cover rounded-xl border mb-4"
                />

                <h3 className="text-2xl font-bold text-rose-600">{rose.name}</h3>
                <p className="mt-2 text-gray-600 text-sm">{rose.description}</p>

                <div className="mt-3 text-sm text-gray-500 space-y-1">
                  <p>🎨 <strong>اللون:</strong> {rose.color}</p>
                  <p>📅 <strong>الفصل:</strong> {rose.season}</p>
                  <p>📍 <strong>المدينة:</strong> {rose.city}</p>
                </div>

                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => navigate(`/edit/${rose.id}`)}
                    className="bg-gradient-to-r from-yellow-300 to-yellow-500 text-white font-semibold px-4 py-2 rounded-full shadow-md hover:scale-105 transition"
                  >
                    ✏️ تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(rose.id)}
                    className="bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold px-4 py-2 rounded-full shadow-md hover:scale-105 transition"
                  >
                    🗑️ حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
