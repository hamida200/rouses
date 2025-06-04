// src/AddRose.js
import React, { useState } from "react";
import { db } from "./firebase";
import { addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AddRose() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("يرجى اختيار صورة!");

    const storage = getStorage();
    const imageRef = ref(storage, `roses/${image.name}`);
    await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(imageRef);

    await addDoc(collection(db, "roses"), {
      name,
      description,
      imageUrl,
      createdAt: new Date()
    });

    setName("");
    setDescription("");
    setImage(null);
    alert("تمت إضافة الوردة بنجاح!");
  };

  return (
    <div>
      <h2>🌹 إضافة وردة جديدة</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="اسم الوردة"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br />
        <textarea
          placeholder="وصف الوردة"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        /><br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        /><br />
        <button type="submit">إضافة</button>
      </form>
    </div>
  );
}
