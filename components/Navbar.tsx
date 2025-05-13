"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { link } from "fs";

export const labs = [
  {
    link: "aws",
    text: "AWS Labs"
  },
  {
    link: "openstack",
    text: "OpenStack Labs"
  },
]

export const solutions = [
  {
    link: "iot",
    text: "IoT Edge"
  },
  {
    link: "AI-ML",
    text: "AI/ML"
  },
  {
    link: "data",
    text: "Data Engineering"
  },
  {
    link: "devops",
    text: "DevOps"
  },
  {
    link: "security",
    text: "Security"
  }
  
]

export const anciliary = [
  {
    link: "auto-segmentation",
    text: "Data Segmentation"
  },
  {
    link: "document-processing",
    text: "Document Classification"
  },
  {
    link: "workflow",
    text: "Workflow Orchestration"
  },
  {
    link: "social-media-chatbot",
    text: "Social Media Chatbot"
  },
  {
    link: "trainings",
    text: "Trainings"
  },
]

export default function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState("");

  return (
    <nav className="text-white fixed w-full z-50 shadow-md ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <span className="text-2xl font-bold text-accent cursor-pointer">
                BojaLabs
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {isLoggedIn && (
              <Link href="/dashboard" className="hover:text-accent">
                Dashboard
              </Link>
            )}

            {/* Labs Dropdown */}
            <div className="relative group">
              <div className=" flex items-center space-x-1 cursor-pointer group-hover:text-accent">
                <span>Labs</span>
                <ChevronDown size={16} />
              </div>
              <div className="absolute hidden group-hover:block hover:block bg-[#1e293b] rounded-md p-2 shadow-lg min-w-max">
                {labs.map((l, i) => (
                  <Link key={i} href={`/labs/${l.link}`} className="block px-4 py-2 hover:bg-[#334155] rounded">
                    {l.text}
                  </Link>
                ))}
              </div>
            </div>
            {/* Solutions Dropdown */}
            <div className="relative group">
              <div className="flex items-center space-x-1 cursor-pointer hover:text-accent">
                <span>Solutions</span>
                <ChevronDown size={16} />
              </div>
              <div className="absolute hidden group-hover:block bg-[#1e293b] rounded-md p-2 pl-4 shadow-lg min-w-max">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 max-w-xl">
                  <div>
                    <h3 className="border-b border-accent pb-1 border-gray-700">CORE</h3>

                  {
                    solutions.map((s, i) => (
                      <Link key={i} href={`solutions/${s.link}`} className="block hover:text-accent hover:border-b-2 hover:border-accent py-1">
                        {s.text}
                      </Link>
                    ))
                  }
                  </div>
                  <div>
                  <h3 className="border-b border-accent pb-1 border-gray-700">ANCILIARY</h3>
                    {
                      anciliary.map((a, i) => (
                        <Link key={i} href={`solutions/${a.link}`} className="block hover:text-accent hover:border-b-2 hover:border-accent py-1">
                          {a.text}
                        </Link>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>

            <Link href="/pricing" className="hover:text-accent">
              Pricing
            </Link>
            <Link href="/contact" className="hover:text-accent">
              Contact
            </Link>

            {!isLoggedIn && (
              <>
                <Link href="/login" className="hover:text-accent">
                  Login
                </Link>
                <Link href="/signup" className="hover:text-accent">
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0f172a] px-4 py-6 space-y-4">
          {isLoggedIn && (
            <Link href="/dashboard" className="block hover:text-accent">
              Dashboard
            </Link>
          )}

          {/* Mobile Solutions Dropdown */}
          <div className="space-y-1">
            <button
              className="flex items-center space-x-1 text-left w-full hover:text-accent"
              onClick={() =>
                setMobileDropdown(
                  mobileDropdown === "solutions" ? "" : "solutions"
                )
              }
            >
              <span>Solutions</span>
              <ChevronDown size={16} />
            </button>
            {mobileDropdown === "solutions" && (
              <div className="pl-4 space-y-2">
                {
                  solutions.map((s, i) => (
                    <Link key={i} href={`solutions/${s.link}`} className="block hover:text-accent py-2">
                      {s.text}
                    </Link>
                  ))
                }
              </div>
            )}
          </div>

          {/* Mobile Labs Dropdown */}
          <div className="space-y-1">
            <button
              className="flex items-center space-x-1 text-left w-full hover:text-accent"
              onClick={() =>
                setMobileDropdown(mobileDropdown === "labs" ? "" : "labs")
              }
            >
              <span>Labs</span>
              <ChevronDown size={16} />
            </button>
            {mobileDropdown === "labs" && (
              <div className="pl-4 space-y-2">
                <Link
                  href="/solutions/auto-segmentation"
                  className="block hover:text-accent"
                >
                  AWS Labs
                </Link>
                <Link
                  href="/solutions/optimization"
                  className="block hover:text-accent"
                >
                  OpenStack Labs
                </Link>
              </div>
            )}
          </div>

          <Link href="/pricing" className="block hover:text-accent">
            Pricing
          </Link>
          <Link href="/contact" className="block hover:text-accent">
            Contact
          </Link>

          {!isLoggedIn && (
            <Link href="/contact" className="block hover:text-accent">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
