"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#features" },
  { name: "Testimonials", href: "#testimonials" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
      <nav className="px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center h-auto md:h-32 gap-4 md:gap-0 py-4 md:py-0">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <Image
            src="/logo.png"
            alt="Stone River Logo"
            width={540}
            height={180}
            className="h-auto"
            priority
          />
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 items-center">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="px-8 py-4 bg-gray-100 text-gray-700 font-medium rounded-full hover:bg-gray-200 transition-colors text-lg"
            >
              {item.name}
            </motion.a>
          ))}
          <motion.a
            href="/quiz"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="px-8 py-4 bg-amber-700 text-white font-medium rounded-full hover:bg-amber-800 transition-colors text-lg"
          >
            Get Started
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden border-t border-gray-100 bg-white"
        >
          <div className="container-custom py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
