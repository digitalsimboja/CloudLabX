"use client";

import React, { useState } from "react";
import Navbar from "../../../../components/Navbar";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../../../components/Footer";

const ciscoDevnetLabs = [
  {
    title: "Cisco DevNet Fundamentals",
    description: "Learn the basics of Cisco DevNet and network automation fundamentals.",
    image: "/images/cisco-devnet-fundamentals.jpg",
    link: "/labs/cisco-devnet/fundamentals"
  },
  {
    title: "Network Automation with Python",
    description: "Master network automation using Python and Cisco APIs.",
    image: "/images/cisco-python-automation.jpg",
    link: "/labs/cisco-devnet/python-automation"
  },
  {
    title: "Cisco DNA Center Integration",
    description: "Explore Cisco DNA Center APIs and automation capabilities.",
    image: "/images/cisco-dna-center.jpg",
    link: "/labs/cisco-devnet/dna-center"
  },
  {
    title: "Meraki Dashboard API",
    description: "Learn to automate Meraki cloud-managed networks.",
    image: "/images/meraki-dashboard.jpg",
    link: "/labs/cisco-devnet/meraki-api"
  },
  {
    title: "Cisco Webex API Integration",
    description: "Build applications using Cisco Webex APIs and SDKs.",
    image: "/images/cisco-webex-api.jpg",
    link: "/labs/cisco-devnet/webex-api"
  },
  {
    title: "Network Security Automation",
    description: "Automate network security policies and threat response.",
    image: "/images/cisco-security-automation.jpg",
    link: "/labs/cisco-devnet/security-automation"
  }
];

export default function CiscoDevNetLabsPage() {
  const [showAll, setShowAll] = useState(false);
  const visibleLabs = showAll ? ciscoDevnetLabs : ciscoDevnetLabs.slice(0, 3);

  return (
    <>
      <Navbar isLoggedIn={false} />

      <section className="min-h-screen bg-dark-900 text-gray-200 px-4 py-10">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center mb-16 mt-12">
          <h1 className="text-4xl font-bold text-white mb-4">Cisco DevNet Labs Showcase</h1>
          <p className="text-gray-400 text-lg">
            Follow hands-on labs built on Cisco DevNet to gain practical experience in network automation and programmability.
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
        {!showAll && ciscoDevnetLabs.length > 3 && (
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
          <h2 className="text-2xl text-white font-semibold mb-4">Have a cool Cisco DevNet use case?</h2>
          <p className="text-gray-400 mb-6">
            We're growing our Cisco DevNet content. Reach out to showcase your lab or project!
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
