import React from "react";

const ContactForm: React.FC = () => {
  return (
    <form className="mt-4 w-full mx-auto bg-custom-black p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-300 text-sm font-bold mb-2"
        >
          Adınız Soyadınız
        </label>
        <input
          id="name"
          type="text"
          placeholder="Adınız Soyadınız"
          className="w-full p-3 border border-gray-500 rounded bg-gray-700 text-gray-200"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-300 text-sm font-bold mb-2"
        >
          E-mail adresiniz
        </label>
        <input
          id="email"
          type="email"
          placeholder="E-mail adresiniz"
          className="w-full p-3 border border-gray-500 rounded bg-gray-700 text-gray-200"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="phone"
          className="block text-gray-300 text-sm font-bold mb-2"
        >
          Telefon numaranız (isteğe bağlı)
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="Telefon numaranız"
          className="w-full p-3 border border-gray-500 rounded bg-gray-700 text-gray-200"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="message"
          className="block text-gray-300 text-sm font-bold mb-2"
        >
          Mesajınız
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Mesajınız"
          className="w-full p-3 border border-gray-500 rounded bg-gray-700 text-gray-200"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-custom-teal text-white font-bold rounded hover:bg-custom-white hover:text-black"
      >
        Gönder
      </button>
    </form>
  );
};

export default ContactForm;
