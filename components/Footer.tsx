"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center gap-6"
        >
          <h3 className="text-2xl font-bold">Ready to Get Help?</h3>
          <div className="flex items-center gap-3 text-xl">
            <Phone className="w-6 h-6 text-amber-500" />
            <a
              href="tel:+1-844-524-8553"
              className="hover:text-amber-500 transition-colors font-semibold"
            >
              (844) 524-8553
            </a>
          </div>
          <p className="text-gray-400 text-center max-w-2xl">
            Call us today to speak with our compassionate team and take the first step toward your recovery.
          </p>
        </motion.div>

        {/* Bottom divider */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Stone River Behavioral Health. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
