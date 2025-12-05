"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Services() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Personalized Mental Health Treatment
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            When it comes to finding the best mental health treatment Stone River Behavioral Health is your top choice.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              How We Can Help You
            </h3>

            <div className="space-y-6 text-gray-600 text-lg leading-relaxed mb-8">
              <p>
                At Stone River Behavioral Health, we deeply understand the courage it takes to seek help and the urgency that often accompanies this decision.
              </p>

              <p>
                Behavioral health encompasses a wide range of emotional and psychological challenges that individuals face throughout their lives. Whether you're dealing with anxiety, depression, substance abuse, or any other mental health issue, we are here to provide the support, care, and expertise you need.
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-900">Our Approach:</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-700 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600">Comprehensive mental health assessments</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-700 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600">Evidence-based therapeutic approaches</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-700 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600">Individualized treatment plans</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-700 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600">Compassionate and supportive care</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Image */}
            <Image
              src="/services-image.webp"
              alt="Mental Health Services"
              width={500}
              height={400}
              className="rounded-lg shadow-xl w-full h-auto"
            />

            {/* Text Box */}
            <div className="bg-gray-50 rounded-lg p-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Our Holistic Approach
              </h4>

              <div className="space-y-4 text-gray-600 text-base leading-relaxed">
                <p>
                  Behavioral healthcare is not just about addressing symptoms; it's about understanding the unique experiences that shape each individual. At Stone River Behavioral Health, our approach embodies compassion, respect, and a holistic perspective aimed at fostering long-term wellness.
                </p>

                <p>
                  Our highly-trained team of professionals is dedicated to delivering personalized care that meets your specific needs and helps you navigate your path to recovery.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
