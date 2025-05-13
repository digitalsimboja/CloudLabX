"use client";

import React, { useState } from "react";
import Navbar from "../../../../components/Navbar";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../../../components/Footer";

const labs = [
  {
    title: "AI-Powered Customer Segmentation",
    description: "Use AWS Lambda, S3, and SageMaker to build real-time customer segmentation.",
    image: "/assets/labs/customer-segmentation.png",
    link: "/labs/aws/customer-segmentation",
  },
  {
    title: "Serverless Video Processing",
    description: "Build a video upload and processing pipeline with Lambda, Step Functions, and Elastic Transcoder.",
    image: "/assets/labs/video-processing.jpg",
    link: "/labs/aws/video-processing",
  },
  {
    title: "Secure File Upload with S3 & Cognito",
    description: "Enable authenticated users to upload files securely using AWS Cognito and S3 pre-signed URLs.",
    image: "/assets/labs/secure-file-upload.jpg",
    link: "/labs/aws/secure-file-upload",
  },
  {
    title: "Real-Time Chat with API Gateway WebSockets",
    description: "Use WebSocket APIs, Lambda, and DynamoDB to create a scalable real-time chat app.",
    image: "/assets/labs/realtime-chat.jpg",
    link: "/labs/aws/realtime-chat",
  },
  {
    title: "Automated Image Moderation with Rekognition",
    description: "Analyze and moderate uploaded images using Rekognition and event-driven Lambda functions.",
    image: "/assets/labs/image-moderation.jpg",
    link: "/labs/aws/image-moderation",
  },
  {
    title: "IoT Telemetry Dashboard with QuickSight",
    description: "Stream IoT data with AWS IoT Core and visualize metrics using Amazon QuickSight.",
    image: "/assets/labs/iot-dashboard.jpg",
    link: "/labs/aws/iot-dashboard",
  },
  {
    title: "Event-Driven Order Processing System",
    description: "Build a scalable e-commerce backend using Amazon SQS, Lambda, and DynamoDB to handle order events asynchronously.",
    image: "/assets/labs/aws/order-processing.jpg",
    link: "/labs/aws/order-processing",
  },
  {
    title: "Personalized Recommendation Engine",
    description: "Use Amazon Personalize and S3 to create and deploy a machine learning model that generates personalized product recommendations.",
    image: "/assets/labs/aws/recommendation-engine.jpg",
    link: "/labs/aws/recommendation-engine",
  },
  {
    "title": "Credit Scoring Model",
    "description": "Leverage AWS services like Amazon SageMaker and DynamoDB to build and deploy a machine learning model for assessing credit scores based on historical data and financial behavior.",
    "image": "/assets/labs/aws/credit-scoring.jpg",
    "link": "/labs/aws/credit-scoring"
  }
  
];

export default function AWSLabsPage() {
  const [showAll, setShowAll] = useState(false);
  const visibleLabs = showAll ? labs : labs.slice(0, 3);

  return (
    <>
      <Navbar isLoggedIn={false} />

      <section className="min-h-screen bg-dark-900 text-gray-200 px-4 py-10">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center mb-16 mt-12">
          <h1 className="text-4xl font-bold text-white mb-4">AWS Labs Showcase</h1>
          <p className="text-gray-400 text-lg">
            Follow step-by-step labs built on AWS to learn how to implement production-ready cloud solutions.
          </p>
        </div>

        {/* Labs Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {visibleLabs.map((lab, index) => (
            <Link href={lab.link} key={index}>
              <div className="bg-dark-800 hover:bg-dark-700 transition p-5 rounded-xl border border-gray-700 shadow-lg cursor-pointer flex flex-col h-full">
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={lab.image}
                    alt={lab.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{lab.title}</h3>
                <p className="text-gray-400 text-sm">{lab.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Show All Button */}
        {!showAll && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Show All Labs
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl text-white font-semibold mb-4">Want to contribute a lab?</h2>
          <p className="text-gray-400 mb-6">
            We’re always adding new AWS projects. Reach out if you want to feature yours.
          </p>
          <Link href="/contact">
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium transition">
              Get in Touch
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
