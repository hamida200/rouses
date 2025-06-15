import { db } from './firebase.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const roses = [
  {
    name: "Zachary",
    description: "Excepturi beatae dolorem at.",
    color: "وردي",
    season: "شتاء",
    city: "وهران",
    imageURL: "https://images.unsplash.com/photo-1493244040629-496f6d136cc3"
  },
  {
    name: "Kelsey",
    description: "Debitis error voluptatibus optio occaecati ducimus.",
    color: "أحمر",
    season: "صيف",
    city: "الجزائر",
    imageURL: "https://images.unsplash.com/photo-1617005081575-5e5dbe93e9b2"
  },
  {
    name: "Amara",
    description: "Vel sunt veniam provident natus.",
    color: "أبيض",
    season: "ربيع",
    city: "سطيف",
    imageURL: "https://images.unsplash.com/photo-1506629082955-511b1e69f57e"
  }
];

async function uploadRoses() {
  try {
    const rosesCollection = collection(db, 'roses');
    for (const rose of roses) {
      await addDoc(rosesCollection, {
        ...rose,
        createdAt: serverTimestamp()
      });
    }
    console.log("🌹 تمت إضافة الورود بنجاح!");
  } catch (error) {
    console.error("❌ فشل في الإضافة:", error);
  }
}

uploadRoses();
