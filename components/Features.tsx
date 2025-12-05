"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Shield,
  Smartphone,
  Code2,
  Palette,
  Rocket,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance with Next.js 16 and React 19",
  },
  {
    icon: Shield,
    title: "Type Safe",
    description: "Full TypeScript support with strict mode enabled",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Beautiful on all devices with Tailwind CSS",
  },
  {
    icon: Code2,
    title: "Clean Code",
    description: "Well-structured and maintainable codebase",
  },
  {
    icon: Palette,
    title: "Modern UI",
    description: "Stunning design with Lucide icons and animations",
  },
  {
    icon: Rocket,
    title: "Production Ready",
    description: "Ready to deploy and scale with confidence",
  },
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to build amazing web applications
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-8 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors group cursor-pointer"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
