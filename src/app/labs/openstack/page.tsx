"use client";

import React, { useState } from "react";
import Navbar from "../../../../components/Navbar";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../../../components/Footer";

const openstackLabs = [
  {
    title: "Deploy a Virtual Machine on OpenStack",
    description: "Launch and manage an instance on OpenStack using Horizon and openstack CLI.",
    image: "/assets/labs/openstack/launch-instance.jpg",
    link: "/labs/openstack/launch-vm",
  },
  {
    title: "Object Storage with Swift",
    description: "Set up and interact with OpenStack Swift to store and retrieve objects programmatically.",
    image: "/assets/labs/openstack/swift-storage.jpg",
    link: "/labs/openstack/object-storage",
  },
  {
    title: "Creating and Managing Networks with Neutron",
    description: "Use Neutron to create isolated networks, assign floating IPs, and configure security groups.",
    image: "/assets/labs/openstack/neutron-network.jpg",
    link: "/labs/openstack/networking",
  },
  {
    title: "Automating OpenStack with Terraform",
    description: "Provision compute, storage, and networking resources in OpenStack using Ansible Playbooks.",
    image: "/assets/labs/openstack/ansible-automation.jpg",
    link: "/labs/openstack/ansible-automation",
  },
  {
    title: "Heat Orchestration Template (HOT) Lab",
    description: "Use OpenStack Heat to deploy a multi-tier application stack with defined infrastructure templates.",
    image: "/assets/labs/openstack/heat-stack.jpg",
    link: "/labs/openstack/heat-orchestration",
  },
  {
    title: "Shared File System Deployment with Manila",
    description: "Create and attach a shared NFS file system to instances using OpenStack Manila.",
    image: "/assets/labs/openstack/manila-fileshare.jpg",
    link: "/labs/openstack/shared-file-system"
  }
  
];

export default function OpenStackLabsPage() {
  const [showAll, setShowAll] = useState(false);
  const visibleLabs = showAll ? openstackLabs : openstackLabs.slice(0, 3);

  return (
    <>
      <Navbar isLoggedIn={false} />

      <section className="min-h-screen bg-dark-900 text-gray-200 px-4 py-10">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center mb-16 mt-12">
          <h1 className="text-4xl font-bold text-white mb-4">OpenStack Labs Showcase</h1>
          <p className="text-gray-400 text-lg">
            Follow hands-on labs built on OpenStack to gain practical experience in cloud infrastructure management.
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
        {!showAll && openstackLabs.length > 3 && (
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
          <h2 className="text-2xl text-white font-semibold mb-4">Have a cool OpenStack use case?</h2>
          <p className="text-gray-400 mb-6">
            We’re growing our OpenStack content. Reach out to showcase your lab or project!
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
