"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const housingImages = [
  { id: 1, src: "/housing-1.webp", alt: "Housing Option 1" },
  { id: 2, src: "/housing-2.webp", alt: "Housing Option 2" },
  { id: 3, src: "/housing-3.webp", alt: "Housing Option 3" },
  { id: 4, src: "/housing-4.webp", alt: "Housing Option 4" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6 },
  },
};

export function Housing() {
  return (
    <section id="housing" className="py-20 bg-gray-50">
      <div className="container-custom">
        {/* Header Content */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Supportive Housing
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Stone River Behavioral Health is proud to offer supportive mental health recovery housing for clients attending our programs, who are looking for a structured environment and inpatient experience without the restrictions and disruption to everyday life.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            We work with vetted and trusted recovery residences throughout our service areas and provide transportation to and from our facilities.
          </p>
        </motion.div>

        {/* Image Gallery */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {housingImages.map((image) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow group cursor-pointer"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={300}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white font-medium">
                  Housing Option {image.id}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
