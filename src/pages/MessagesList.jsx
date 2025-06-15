import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";

export default function MessagesList() {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMessages(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد أنك تريد حذف هذه الرسالة؟")) {
      await deleteDoc(doc(db, "messages", id));
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold text-pink-600 text-center mb-6">
        💌 رسائل التواصل
      </h2>

      {messages.length === 0 ? (
        <p className="text-center text-gray-500">لا توجد رسائل حتى الآن.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-pink-200 rounded-lg overflow-hidden">
            <thead className="bg-pink-100 text-pink-800 font-bold">
              <tr>
                <th className="px-4 py-2 border">الاسم</th>
                <th className="px-4 py-2 border">البريد الإلكتروني</th>
                <th className="px-4 py-2 border">الرسالة</th>
                <th className="px-4 py-2 border">تاريخ الإرسال</th>
                <th className="px-4 py-2 border">حذف</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} className="text-center hover:bg-pink-50">
                  <td className="px-4 py-2 border">{msg.name}</td>
                  <td className="px-4 py-2 border">{msg.email}</td>
                  <td className="px-4 py-2 border text-right">{msg.message}</td>
                  <td className="px-4 py-2 border text-sm text-gray-600">
                    {msg.createdAt?.toDate().toLocaleString("ar-DZ")}
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      🗑️ حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
