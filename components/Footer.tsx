import { Mail, Phone, MapPin, X, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold text-white">TrixNet</h3>
          <p className="mt-3 text-sm">
            Revolutionizing cloud optimization with AI-powered automation.
          </p>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="text-lg font-semibold text-white">Contact Us</h4>
          <ul className="mt-3 space-y-2">
            <li className="flex items-center gap-2">
              <MapPin size={18} className="text-indigo-400" />
              101 Bayside Walk, Sutton, Bayside, Dublin 13
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-indigo-400" />
              contact@TrixNet.io
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} className="text-indigo-400" />
              +353 1 234 5678
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white">Quick Links</h4>
          <ul className="mt-3 space-y-2">
            <li>
              <a href="/about" className="hover:text-indigo-400 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/pricing" className="hover:text-indigo-400 transition">
                Pricing
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-indigo-400 transition">
                FAQs
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-indigo-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h4 className="text-lg font-semibold text-white">Follow Us</h4>
          <div className="mt-3 flex gap-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition">
              <X size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition">
              <Linkedin size={24} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition">
              <Github size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
        &copy; {new Date().getFullYear()} TrixNet. All rights reserved.
      </div>
    </footer>
  );
}
