"use client";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore"; // Adjust path to where your firebase.js is
import firestore from "@/firebase";

const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Save the form data to Firestore
      await addDoc(collection(firestore, "WebsiteContactMessages"), {
        isimSoyad: name,
        emailAddress: email,
        phoneNo: phone,
        message: message,
      });

      // Reset the form after successful submission
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");

      alert("Mesajınız başarıyla gönderildi!");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Mesajınızı gönderirken bir hata oluştu.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="tracking-widest text-3xl font-light mb-8">
        MESAJ FORMU
      </div>
      <form onSubmit={handleSubmit} className="w-full sm:w-96">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-black text-sm font-bold mb-2"
          >
            Adınız Soyadınız
          </label>
          <input
            id="name"
            type="text"
            placeholder="Adınız Soyadınız"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-500 rounded bg-gray-500/10 text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-black text-sm font-bold mb-2"
          >
            E-mail adresiniz
          </label>
          <input
            id="email"
            type="email"
            placeholder="E-mail adresiniz"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-500 rounded bg-gray-500/10 text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-black text-sm font-bold mb-2"
          >
            Telefon numaranız (isteğe bağlı)
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="Telefon numaranız"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border border-gray-500 rounded bg-gray-500/10 text-black"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-black text-sm font-bold  mb-2"
          >
            Mesajınız
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="Mesajınız"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border border-gray-500 rounded bg-gray-500/10 text-black mb-4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-black/70 text-white font-bold rounded hover:bg-black/20 transition duration-300"
        >
          Gönder
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
