"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Jane Doe",
    image: "/images/jane.jpg",
    feedback:
      "BojaLabs transformed our cloud efficiency, saving us 40% in costs!",
  },
  {
    id: 2,
    name: "John Smith",
    image: "/images/john.jpg",
    feedback:
      "The AI-powered optimization is incredible. Our deployments are now seamless!",
  },
  {
    id: 3,
    name: "Emily Brown",
    image: "/images/emily.jpg",
    feedback:
      "I love how intuitive and effective BojaLabs is for scaling our business!",
  },
  {
    id: 4,
    name: "Bojana Jovanovic",
    image: "/images/emily.jpg",
    feedback:
      "The AI-powered auto-segmenation is amazing! It has saved us a lot of time and effort in classifying our workloads.",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000); // Auto-transition every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [activeIndex]);

  return (
    <section className="py-16 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-dark-100 mb-10">
        What Our Customers Say
      </h2>

      <div className="relative max-w-3xl mx-auto">
        {/* Carousel */}
        <div className="flex h-[400px] items-center justify-center overflow-hidden relative">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`absolute transition-all  ease-in-out ${
                index === activeIndex
                  ? "scale-100 opacity-100 z-10"
                  : "scale-75 opacity-50 blur-2xl"
              }`}
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg"
              />
              <p className="text-lg text-dark-200 mt-4 max-w-lg mx-auto">
                "{testimonial.feedback}"
              </p>
              <h4 className="mt-2 font-semibold text-dark-100">
                {testimonial.name}
              </h4>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevTestimonial}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-dark-100 text-white p-2 rounded-full shadow-md hover:bg-dark-200"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextTestimonial}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-dark-100 text-white p-2 rounded-full shadow-md hover:bg-dark-200"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
