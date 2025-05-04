import React from "react";

const pricingPlans = [
  {
    title: "Starter",
    price: "$29/month",
    features: [
      "14-day free trial",
      "Hybrid Cloud Dashboard Access",
      "Basic AI Recommendations",
      "5 Workload Templates",
      "Email Support",
      "On-Prem & Cloud Network Automation",
      "up to 5 nodes"
    ],
    buttonText: "Start Free Trial",
    buttonLink: "#",
    bgColor: "bg-[#00B4D8]",
    textColor: "text-dark-900",
    borderColor: "border-[#00B4D8]",
  },
  {
    title: "Professional",
    price: "$79/month",
    features: [
      "Everything in Starter",
      "Advanced Network Automation",
      "up to 20 nodes",
      "Cross-Cloud Optimization (AWS + OpenStack)",
      "10 Hybrid Workload Templates",
      "Priority Email & Chat Support",
      "Custom Monitoring & Alerts",
    ],
    buttonText: "Get Started",
    buttonLink: "#",
    bgColor: "bg-[#F4A261]",
    textColor: "text-dark-900",
    borderColor: "border-[#F4A261]",
  },
  {
    title: "Enterprise",
    price: "$249/month",
    features: [
      "Everything in Professional",
      "Unlimited Nodes & Workloads",
      "Full AI-Powered Optimization Suite",
      "Dedicated Hybrid Cloud Engineer",
      "24/7 Enterprise Support",
      "Custom Integrations & API Access",
      "Advanced Security & Compliance Features",
    ],
    buttonText: "Contact Us",
    buttonLink: "#",
    bgColor: "bg-[#FF6F61]",
    textColor: "text-dark-900",
    borderColor: "border-[#FF6F61]",
  },
];

export default function Pricing() {
  return (
    <section className="py-16 lg:py-32 bg-light-100">
      <div className="container mx-auto text-center px-6">
        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-100 mb-10">
          Choose Your Plan
        </h2>
        <p className="text-lg sm:text-xl text-dark-200 max-w-3xl mx-auto mb-12">
          Whether you're a small team automating hybrid workloads or an enterprise
          optimizing cross-cloud networks, TrixNet has a plan tailored for your needs.
        </p>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-lg p-8 ${plan.bgColor} ${plan.textColor} border-4 ${plan.borderColor}`}
            >
              <h3 className="text-2xl font-semibold mb-4">{plan.title}</h3>
              <p className="text-xl font-bold mb-6">{plan.price}</p>
              <ul className="space-y-2 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-[#FFD700]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12l5 5L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={plan.buttonLink}
                className={`inline-block px-6 py-3 rounded-full font-semibold bg-[#64A6F5] text-${plan.textColor} border-2 border-${plan.borderColor} transition duration-300 hover:bg-${plan.borderColor} hover:text-white`}
              >
                {plan.buttonText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
