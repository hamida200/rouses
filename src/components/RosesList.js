// src/RosesList.js
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export default function RosesList() {
  const [roses, setRoses] = useState([]);

  useEffect(() => {
    const fetchRoses = async () => {
      const querySnapshot = await getDocs(collection(db, "roses"));
      setRoses(querySnapshot.docs.map(doc => doc.data()));
    };
    fetchRoses();
  }, []);

  return (
    <div>
      <h2>🌸 جميع الورود</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {roses.map((rose, idx) => (
          <div key={idx} style={{ border: "1px solid #ccc", padding: 10 }}>
            <img src={rose.imageUrl} alt={rose.name} width="150" />
            <h3>{rose.name}</h3>
            <p>{rose.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
