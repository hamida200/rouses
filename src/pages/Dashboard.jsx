import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase.js";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Dashboard() {
  const [roses, setRoses] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    const fetchRoses = async () => {
      try {
        const snapshot = await getDocs(collection(db, "roses"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRoses(data);
      } catch (error) {
        console.error("❌ خطأ في جلب الورود:", error);
      }
    };

    fetchRoses();
  }, [currentUser]);

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الوردة؟")) {
      try {
        await deleteDoc(doc(db, "roses", id));
        setRoses((prev) => prev.filter((rose) => rose.id !== id));
      } catch (error) {
        console.error("❌ خطأ في الحذف:", error);
      }
    }
  };

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-100 to-purple-200 pt-28 pb-12 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
        <h2 className="text-5xl font-extrabold text-center text-rose-600 mb-16 drop-shadow-sm tracking-wider">
          🌹 لوحة إدارة الورود
        </h2>

        {roses.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">لا توجد ورود لعرضها حالياً.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {roses.map((rose) => (
              <div
                key={rose.id}
                className="bg-white border border-pink-200 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300"
              >
                <img
                  src={rose.imageUrl || rose.imageURL || "/fallback.jpg"}
                  alt={rose.name}
                  className="w-full h-56 object-cover rounded-t-2xl"
                />
                <div className="p-5">
                  <h3 className="text-2xl font-bold text-pink-700 mb-1">{rose.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{rose.description}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    🎨 اللون: <strong>{rose.color}</strong> | 📅 الفصل: <strong>{rose.season}</strong> | 📍 المدينة: <strong>{rose.city}</strong>
                  </p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => navigate(`/edit/${rose.id}`)}
                      className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-4 py-2 rounded-full shadow font-bold transition"
                    >
                      ✏️ تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(rose.id)}
                      className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-4 py-2 rounded-full shadow font-bold transition"
                    >
                      🗑️ حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
