"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What is TrixNet?",
    answer:
      "TrixNet is an AI-driven cloud automation platform that optimizes cloud workloads, ensuring efficiency and cost savings.",
  },
  {
    question: "How does AI improve cloud optimization?",
    answer:
      "Our AI analyzes workloads, suggests optimizations, and automates cloud resource management for peak efficiency.",
  },
  {
    question: "What cloud providers do you support?",
    answer:
      "We support AWS, Google Cloud, and Microsoft Azure, Redhat Openshift, and IBM Cloud, with more integrations coming soon.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes! We offer a 14-day free trial so you can experience TrixNet before committing to a plan.",
  },
  {
    question: "How secure is TrixNet?",
    answer:
      "We implement enterprise-grade security measures, including encryption and compliance with industry standards.",
  },
  {
    question: "Can I use TrixNet for multi-cloud management?",
    answer:
      "Yes, our platform enables seamless multi-cloud management and optimization across providers.",
  },
  {
    question: "Do I need technical expertise to use TrixNet?",
    answer:
      "No, our intuitive UI and AI-driven recommendations make it easy for both technical and non-technical users.",
  },
  {
    question: "How does TrixNet reduce costs?",
    answer:
      "We identify unused resources, right-size instances, and optimize workloads to minimize unnecessary expenses.",
  },
  {
    question: "Can I integrate TrixNet with my existing tools?",
    answer:
      "Absolutely! TrixNet offers integrations with major DevOps and cloud management tools.",
  },
  {
    question: "What support options are available?",
    answer:
      "We provide 24/7 customer support via chat, email, and phone, plus extensive documentation. Our AI-Agents are also available at odd hours to respond to your queries.",
  },
  {
    question: "Is TrixNet suitable for startups and enterprises?",
    answer:
      "Yes, TrixNet scales to fit the needs of startups, mid-sized companies, and large enterprises alike.",
  },
  {
    question: "How do I get started with TrixNet?",
    answer:
      "Simply sign up, connect your cloud account, and let our AI handle the rest!",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 lg:py-32 bg-light-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-100 mb-10">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className=" rounded-lg shadow-lg p-4 text-left">
              <button
                className="w-full flex justify-between items-center text-lg font-semibold text-dark-100"
                onClick={() => toggleFAQ(index)}
              >
                <span className="flex items-center">
                  <span
                    className="flex justify-center items-center w-8 h-8 mr-3 text-white font-bold rounded-full"
                    style={{ backgroundColor: `hsl(${index * 30}, 70%, 50%)` }}
                  >
                    {index + 1}
                  </span>
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp size={24} />
                ) : (
                  <ChevronDown size={24} />
                )}
              </button>
              {openIndex === index && (
                <p className="mt-2 text-dark-200 text-sm">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
