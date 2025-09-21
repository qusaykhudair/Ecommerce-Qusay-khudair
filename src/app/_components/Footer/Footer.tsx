"use client";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 🟢 Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">🛍️ MyStore</h2>
          <p className="text-gray-400">
            Discover the best products at unbeatable prices.  
            Your satisfaction is our top priority.
          </p>
        </div>

        {/* 🟢 Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-green-400 transition">
                Home
              </Link>
            </li>
            {/* <li>
              <Link href="/products" className="hover:text-green-400 transition">
                Products
              </Link>
            </li> */}
            {/* <li>
              <Link href="/about" className="hover:text-green-400 transition">
                About Us
              </Link>
            </li> */}
            {/* <li>
              <Link href="/contact" className="hover:text-green-400 transition">
                Contact
              </Link>
            </li> */}
          </ul>
        </div>

        {/* 🟢 Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              className="hover:text-green-400 transition"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              className="hover:text-green-400 transition"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              className="hover:text-green-400 transition"
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              className="hover:text-green-400 transition"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      {/* 🟢 Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} MyStore. All rights reserved.
      </div>
    </footer>
  );
}
