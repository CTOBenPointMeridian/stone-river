"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-semibold text-amber-700 mb-2">
              More About Us
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Exceeding Your Expectations
            </h3>

            <div className="space-y-6 text-gray-600 text-lg leading-relaxed mb-8">
              <p>
                At Stone River Behavioral Health & Wellness, our mental health treatment services are designed to help individuals navigate their unique paths towards wellness and recovery.
              </p>

              <p>
                Our compassionate team of experts works collaboratively to understand each client's needs, developing individualized treatment plans that address a range of mental health conditions, including depression, anxiety, bipolar disorder, and PTSD. The center utilizes evidence-based therapeutic approaches such as Cognitive Behavioral Therapy (CBT) and Dialectical Behavior Therapy (DBT), among others, to help clients build resilience and foster healthier cognitive patterns.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-bold text-amber-700 mb-2">100+</div>
                <p className="text-gray-600 font-medium">of Clients Helped</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-bold text-amber-700 mb-2">40+</div>
                <p className="text-gray-600 font-medium">Years of Experience</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Image
              src="/about-image.webp"
              alt="Exceeding Your Expectations"
              width={500}
              height={500}
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
