"use client";
import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactUs() {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    alert(`Thank you! We’ll contact you at: ${email}`);
    setEmail("");
  };

  return (
    <section id="contact-us" className="bg-gradient-to-r from-[#0F4CBD]-500 to-purple-100 text-white py-20 px-6 md:px-16 text-center " >
      <h2 className="text-3xl sm:text-4xl font-bold mb-6">Get in Touch</h2>
      <p className="text-lg mb-8">
        Have questions? Leave your email and we’ll get back to you!
      </p>

      <div className="max-w-2xl mx-auto flex flex-col md:flex-row items-center gap-4 bg-white p-2 rounded-full shadow-lg">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3 text-dark-100 outline-none bg-transparent rounded-full"
        />
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-full text-white font-semibold transition"
        >
          Send <Send size={18} />
        </button>
      </div>
    </section>
  );
}
