import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function RoseGallery() {
  const [roses, setRoses] = useState([]);

  useEffect(() => {
    const fetchRoses = async () => {
      try {
        const snapshot = await getDocs(collection(db, "roses"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRoses(data);
      } catch (error) {
        console.error("❌ فشل في جلب الورود:", error);
      }
    };

    fetchRoses();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-gradient-to-br from-pink-50 to-white rounded-3xl shadow-2xl">
      <h2 className="text-4xl font-extrabold text-pink-700 text-center mb-12 drop-shadow">
        🌸 معرض الورود
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {roses.map((rose) => (
          <div
            key={rose.id}
            className="bg-white border border-pink-100 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={rose.imageUrl || rose.imageURL || "/images/default.jpg"}
              alt={rose.name}
              className="w-full h-48 object-cover rounded-xl border mb-4"
            />

            <h3 className="text-2xl font-bold text-pink-600">{rose.name}</h3>
            <p className="text-sm text-gray-600 mt-2">{rose.description}</p>

            <div className="mt-3 text-sm text-gray-500 space-y-1">
              <p>📅 الفصل: <span className="font-semibold">{rose.season}</span></p>
              <p>📍 المدينة: <span className="font-semibold">{rose.city}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
