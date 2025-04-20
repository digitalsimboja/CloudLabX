"use client";

import { useState } from "react";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    platform: "",
    workload: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Submit data to your backend (modify endpoint as needed)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          platform: "",
          workload: "",
          message: "",
        });
      } else {
        console.error("Submission failed.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <Navbar isLoggedIn={false} />
      <div className="bg-dark-900 py-16 lg:py-32 min-h-screen">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Contact Us
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12">
            We'd love to hear more about your cloud infrastructure plans. Let us
            know what you're working on or planning to provision on AWS or
            OpenStack.
          </p>

          <div className="bg-dark-800 text-white rounded-lg shadow-xl p-8 max-w-2xl mx-auto">
            {submitted ? (
              <p className="text-green-400 text-lg font-medium">
                ✅ Thank you for contacting us! We’ll be in touch shortly.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div>
                  <label className="block mb-1 font-medium">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-md bg-dark-700 text-white border border-dark-600 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-md bg-dark-700 text-white border border-dark-600 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">
                    Cloud Platform
                  </label>
                  <select
                    name="platform"
                    value={formData.platform}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-md bg-dark-700 text-white border border-dark-600 focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Select</option>
                    <option value="OpenStack">OpenStack</option>
                    <option value="AWS">AWS</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-medium">
                    Workload (Current or Planned)
                  </label>
                  <input
                    type="text"
                    name="workload"
                    value={formData.workload}
                    onChange={handleChange}
                    placeholder="e.g. AI training cluster, Web services, DevOps lab"
                    required
                    className="w-full px-4 py-2 rounded-md bg-dark-700 text-white border border-dark-600 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 rounded-md bg-dark-700 text-white border border-dark-600 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 px-4 bg-accent text-white rounded-md font-medium hover:bg-accent-dark transition"
                >
                  {isSubmitting ? "Submitting..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
