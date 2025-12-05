"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const facilityImages = [
  { id: 1, src: "/facility-1.webp", alt: "Facility 1" },
  { id: 2, src: "/facility-2.webp", alt: "Facility 2" },
  { id: 3, src: "/facility-3.webp", alt: "Facility 3" },
  { id: 4, src: "/facility-4.jpg", alt: "Facility 4" },
  { id: 5, src: "/facility-5.webp", alt: "Facility 5" },
  { id: 6, src: "/facility-6.webp", alt: "Facility 6" },
  { id: 7, src: "/facility-7.jpg", alt: "Facility 7" },
  { id: 8, src: "/facility-8.webp", alt: "Facility 8" },
  { id: 9, src: "/facility-9.webp", alt: "Facility 9" },
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

export function Facilities() {
  return (
    <section id="facilities" className="py-20 bg-white">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Facilities Designed for Your Comfort
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Our treatment facilities were designed with wellness infused in every aspect of our spaces. From aromatherapy infused vents to our spacious group rooms and sound-proof therapy rooms, you can trust that your mental health and wellness is in good hands at our mental health treatment center.
          </p>
        </motion.div>

        {/* Image Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {facilityImages.map((image) => (
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white font-medium">
                  Facility {image.id}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
