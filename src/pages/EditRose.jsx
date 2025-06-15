import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

export default function EditRose() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    season: "",
    city: "",
    description: "",
    imageUrl: "",
  });

  const imageOptions = [
    "red-rose.jpg",
    "yellow-rose.jpg",
    "white-rose.jpg",
    "pink-rose.jpg",
    "orange-rose.jpg",
    "lavender-rose.jpg",
    "blue-rose.jpg.jpg",
    "Lily.jpg",
    "Daisy.jpg",
    "Daffodil.jpg",
    "Camellia.jpg",
    "Tulip.jpg",
    "Sunflower.jpg",
  ];

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRose = async () => {
      try {
        const roseRef = doc(db, "roses", id);
        const roseSnap = await getDoc(roseRef);
        if (roseSnap.exists()) {
          setFormData(roseSnap.data());
        } else {
          setError("❌ لا توجد وردة بهذا المعرف.");
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("❌ حدث خطأ أثناء جلب بيانات الوردة.");
        setLoading(false);
      }
    };

    fetchRose();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, season, city, description, imageUrl } = formData;

    if (!name || !season || !city || !description || !imageUrl) {
      setError("🛑 جميع الحقول مطلوبة!");
      setSuccess("");
      return;
    }

    try {
      const roseRef = doc(db, "roses", id);
      await updateDoc(roseRef, {
        ...formData,
        updatedAt: serverTimestamp(),
      });

      setSuccess("✅ تم تعديل الوردة بنجاح!");
      setError("");

      setTimeout(() => navigate("/roses"), 2000);
    } catch (err) {
      console.error(err);
      setError("❌ حدث خطأ أثناء التحديث.");
    }
  };

  if (loading) {
    return <div className="text-center mt-20 text-pink-600 font-bold">🔄 جاري التحميل...</div>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white mt-24 p-8 rounded-xl shadow-2xl border border-pink-200">
      <h2 className="text-2xl font-bold text-pink-700 mb-6 text-center">✏️ تعديل بيانات الوردة</h2>

      {error && <div className="mb-4 text-red-600 font-bold">{error}</div>}
      {success && <div className="mb-4 text-green-600 font-bold">{success}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="🌹 اسم الوردة"
          className="border rounded-lg p-2 focus:ring-2 focus:ring-pink-400"
          onChange={handleChange}
        />

        <input
          type="text"
          name="season"
          value={formData.season}
          placeholder="🌤️ الفصل"
          className="border rounded-lg p-2 focus:ring-2 focus:ring-pink-400"
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          value={formData.city}
          placeholder="🏙️ المدينة"
          className="border rounded-lg p-2 focus:ring-2 focus:ring-pink-400"
          onChange={handleChange}
        />

        <textarea
          name="description"
          value={formData.description}
          placeholder="📝 وصف الوردة"
          rows={4}
          className="border rounded-lg p-2 focus:ring-2 focus:ring-pink-400"
          onChange={handleChange}
        />

       <label className="font-semibold text-pink-600">
  🖼️ اختر صورة من القائمة:
</label>
<select
  name="imageUrl"
  value={formData.imageUrl}
  onChange={handleChange}
  className="border rounded-lg p-2 bg-white focus:ring-2 focus:ring-pink-400"
>
  <option value="">-- اختر صورة --</option>
  {[
    "red-rose.jpg",
    "yellow-rose.jpg",
    "white-rose.jpg",
    "pink-rose.jpg",
    "orange-rose.jpg",
    "lavender-rose.jpg",
    "blue-rose.jpg",
    "Lily.jpg",
    "Daisy.jpg",
    "Daffodil.jpg",
    "Camellia.jpg",
    "Tulip.jpg",
    "Sunflower.jpg",
  ].map((imgName) => (
    <option key={imgName} value={`/images/${imgName}`}>
      {imgName}
    </option>
  ))}
</select>
{formData.imageUrl && (
  <img
    src={formData.imageUrl}
    alt="معاينة"
    className="w-full h-48 object-cover rounded-lg border mt-2"
  />
)}

        <button
          type="submit"
          className="bg-pink-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-500 transition"
        >
          💾 حفظ التعديلات
        </button>
      </form>
    </div>
  );
}
