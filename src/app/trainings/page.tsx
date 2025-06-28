"use client";

import React, { act, useState } from "react";
import Navbar from "../../../components/Navbar";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../../components/Footer";

const trainings = {
  python: [
    {
      title: "Python for Absolute Beginners",
      description: "Master the basics of Python including variables, loops, and functions.",
      image: "/assets/trainings/python-beginner.jpg",
      link: "/trainings/python/beginner",
    },
    {
      title: "Intermediate Python Projects",
      description: "Build real-world projects using Python dictionaries, files, APIs, and classes.",
      image: "/assets/trainings/python-intermediate.jpg",
      link: "/trainings/python/intermediate",
    },
    {
      title: "Advanced Python Mastery",
      description: "Deep dive into generators, decorators, context managers, and concurrency.",
      image: "/assets/trainings/python-advanced.jpg",
      link: "/trainings/python/advanced",
    },
  ],
  aws: [
    {
      title: "Cloud Fundamentals with AWS",
      description: "Learn the core AWS services: EC2, S3, IAM, RDS and how to set them up securely.",
      image: "/assets/trainings/aws-fundamentals.jpg",
      link: "/trainings/aws/fundamentals",
    },
    {
      title: "Deploying Python Apps on AWS",
      description: "Deploy serverless Python apps using AWS Lambda, API Gateway, and DynamoDB.",
      image: "/assets/trainings/aws-deploy.jpg",
      link: "/trainings/aws/deploy-python",
    },
    {
      title: "Infrastructure as Code with Terraform",
      description: "Use Terraform to provision and manage scalable AWS infrastructure for Python apps.",
      image: "/assets/trainings/aws-terraform.jpg",
      link: "/trainings/aws/terraform",
    },
  ],
};

export default function TrainingsPage() {
  const [showAll, setShowAll] = useState(false);
  const [activeTab, setActiveTab] = useState<"python" | "aws">("python")
  const visibleTrainings = showAll ? trainings[activeTab] : trainings[activeTab].slice(0, 3);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredTrainings = trainings[activeTab].filter(
    (training) =>
      training.title.toLowerCase().includes(searchTerm) ||
      training.description.toLowerCase().includes(searchTerm)
  );

  return (
    <>
      <Navbar isLoggedIn={false} />

      <section className="min-h-screen bg-dark-900 text-gray-200 px-4 py-10">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center mb-16 mt-12">
          <h1 className="text-4xl font-bold text-white mb-4">Training Modules</h1>
          <p className="text-gray-400 text-lg">
            Learn at your pace with guided trainings in Python and Cloud Computing using AWS.
          </p>
        </div>
        
         {/* Tabs */}
         <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-6 py-2 rounded-lg font-medium transition ${
              activeTab === "python"
                ? "bg-indigo-600 text-white"
                : "bg-dark-800 text-gray-400 hover:bg-dark-700"
            }`}
            onClick={() => setActiveTab("python")}
          >
            Python
          </button>
          <button
            className={`px-6 py-2 rounded-lg font-medium transition ${
              activeTab === "aws"
                ? "bg-indigo-600 text-white"
                : "bg-dark-800 text-gray-400 hover:bg-dark-700"
            }`}
            onClick={() => setActiveTab("aws")}
          >
            AWS
          </button>
        </div>
        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search trainings..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 bg-dark-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

         {/* Trainings Grid */}
         <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {filteredTrainings.length > 0 ? (
            filteredTrainings.map((training, index) => (
              <Link href={training.link} key={index}>
                <div className="bg-dark-800 hover:bg-dark-700 transition p-5 rounded-xl border border-gray-700 shadow-lg cursor-pointer flex flex-col h-full">
                  <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={training.image}
                      alt={training.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{training.title}</h3>
                  <p className="text-gray-400 text-sm">{training.description}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400">
              No trainings found.
            </div>
          )}
        </div>

        {/* Show All Button */}
        {!showAll && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Show All Trainings
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl text-white font-semibold mb-4">Want to suggest a training?</h2>
          <p className="text-gray-400 mb-6">
            We're growing the library. Share what you'd like to see next!
          </p>
          <Link href="/contact">
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium transition">
              Contact Us
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
