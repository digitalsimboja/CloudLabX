"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-red-dark text-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <span className="text-2xl font-bold text-accent cursor-pointer">
                CloudLabX
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/dashboard" className="hover:text-accent transition">
              Dashboard
            </Link>
            <div className="relative">
              <button
                className="flex items-center space-x-1 hover:text-accent"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span>Solutions</span>
                <ChevronDown size={16} />
              </button>
              {dropdownOpen && (
                <div className="absolute top-10 left-0 bg-white text-black w-48 shadow-lg rounded-md py-2">
                  <Link href="/solutions/auto-segmentation" className="block px-4 py-2 hover:bg-light-200">
                    Auto-Segmentation
                  </Link>
                  <Link href="/solutions/optimization" className="block px-4 py-2 hover:bg-light-200">
                    AI Optimization
                  </Link>
                  <Link href="/solutions/monitoring" className="block px-4 py-2 hover:bg-light-200">
                    Monitoring & Alerts
                  </Link>
                </div>
              )}
            </div>
            <Link href="/pricing" className="hover:text-accent transition">
              Pricing
            </Link>
            <Link href="/contact" className="hover:text-accent transition">
              Contact
            </Link>
            <Link href="/login">
              <button className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-dark-100 transition">
                Login
              </button>
            </Link>
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
        <div className="md:hidden bg-primary p-4 space-y-4">
          <Link href="/dashboard" className="block hover:text-accent">
            Dashboard
          </Link>
          <div className="relative">
            <button
              className="flex items-center space-x-1 hover:text-accent"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span>Solutions</span>
              <ChevronDown size={16} />
            </button>
            {dropdownOpen && (
              <div className="bg-dark-100 text-white mt-2 rounded-md p-2">
                <Link href="/solutions/auto-segmentation" className="block px-4 py-2 hover:bg-dark-200">
                  Auto-Segmentation
                </Link>
                <Link href="/solutions/optimization" className="block px-4 py-2 hover:bg-dark-200">
                  AI Optimization
                </Link>
                <Link href="/solutions/monitoring" className="block px-4 py-2 hover:bg-dark-200">
                  Monitoring & Alerts
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
          <Link href="/login">
            <button className="bg-secondary text-white px-4 py-2 rounded-md w-full hover:bg-dark-100 transition">
              Login
            </button>
          </Link>
        </div>
      )}
    </nav>

)}