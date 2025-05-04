"use client";

import React from "react";
import Navbar from "../../../../components/Navbar";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../../../components/Footer";

export default function AutoSegmentationPage() {
  return (
    <>
      <Navbar isLoggedIn={false} />

      <section className="min-h-screen bg-dark-900 text-gray-200 px-4 py-10">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            AI-Powered Customer Auto-Segmentation
          </h1>
          <p className="text-gray-400 text-lg">
            Discover how TrixNet intelligently segments your customer data in real-time using AI. 
            Gain insights. Drive actions. Personalize experiences.
          </p>
        </div>

        {/* Video Preview */}
        <div className="flex justify-center mb-16">
          <video
            className="w-full max-w-4xl rounded-xl shadow-lg border border-gray-700"
            controls
            poster="/assets/posters/segmentation-thumbnail.jpg"
          >
            <source src="/videos/auto-segmentation-demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Feature Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-accent-light mb-4">
              What Auto-Segmentation Does
            </h2>
            <p>
              TrixNet uses real-time behavioral, demographic, and transactional data 
              to automatically segment your users into meaningful clusters. With our AI models, 
              you can identify high-value customers, churn risks, trend-setters, and more — 
              all without manual tagging or guesswork.
            </p>
            <ul className="list-disc list-inside text-gray-400">
              <li>Behavioral segmentation using activity logs</li>
              <li>Demographic and psychographic grouping</li>
              <li>Engagement and lifecycle scoring</li>
              <li>Predictive segmentation for churn prevention</li>
              <li>Sales, marketing, and support alignment</li>
            </ul>
          </div>

          {/* Dashboard UI Screenshot */}
          <div>
            <Image
              src="/assets/screens/segmentation-dashboard.png"
              alt="Segmentation Dashboard"
              width={800}
              height={500}
              className="rounded-lg border border-gray-700 shadow-md"
            />
            <p className="text-sm text-gray-500 mt-2 text-center">
              Real-time dashboard view of segmented user cohorts
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-20 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
            Benefits of AI-Driven Segmentation
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left mt-6">
            <div className="bg-dark-800 p-6 rounded-xl shadow-md border border-gray-700">
              <h3 className="font-semibold text-white mb-2">📈 Hyper-Personalization</h3>
              <p className="text-gray-400">
                Deliver highly targeted messages and offers to different user groups based on real behavior.
              </p>
            </div>
            <div className="bg-dark-800 p-6 rounded-xl shadow-md border border-gray-700">
              <h3 className="font-semibold text-white mb-2">🔍 Better Product Decisions</h3>
              <p className="text-gray-400">
                Use data-backed insights to develop features for your most valuable customer segments.
              </p>
            </div>
            <div className="bg-dark-800 p-6 rounded-xl shadow-md border border-gray-700">
              <h3 className="font-semibold text-white mb-2">🚀 Increased Retention</h3>
              <p className="text-gray-400">
                Predict and prevent churn by identifying disengaged or at-risk cohorts.
              </p>
            </div>
            <div className="bg-dark-800 p-6 rounded-xl shadow-md border border-gray-700">
              <h3 className="font-semibold text-white mb-2">💡 Smarter Campaigns</h3>
              <p className="text-gray-400">
                Automatically sync segments with your CRM or marketing tools for automated workflows.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-24 text-center">
          <h3 className="text-xl text-white font-semibold mb-3">
            Ready to segment smarter?
          </h3>
          <p className="text-gray-400 mb-6">
            Start using AI-powered segmentation on your customer data in under 5 minutes.
          </p>
          <Link href="/signup">
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium transition">
              Get Started for Free
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
