"use client";

import { motion } from "framer-motion";
import { Phone, ClipboardCheck, LogIn } from "lucide-react";

interface Step {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    icon: <Phone className="w-8 h-8" />,
    title: "Reach Out to Our Team",
    description:
      "Your first step begins with reaching out to our compassionate team. During this initial contact, we will gently collect some preliminary details from you and assist in verifying your insurance benefits. This ensures you have a clear understanding of your coverage and the support available to you. Our team works diligently to make this a seamless and stress-free experience, allowing you to focus on your wellbeing.",
  },
  {
    number: "02",
    icon: <ClipboardCheck className="w-8 h-8" />,
    title: "Consultation & Assessment",
    description:
      "At Stone River Behavioral Health, we believe in understanding your unique needs with care and empathy. You will be invited for a free consultation, where our knowledgeable professionals will conduct a pre-assessment. This is a safe space for you to share your experiences and concerns, helping us to tailor our approach to your specific situation. Our high-energy experts, coupled with advanced technology, create a personalized plan that aligns with your path to recovery.",
  },
  {
    number: "03",
    icon: <LogIn className="w-8 h-8" />,
    title: "Intake & Admissions",
    description:
      "Following the consultation and pre-assessment, the final step is to schedule your intake and admission. We do this with the utmost consideration for your comfort and readiness, ensuring the transition is as peaceful and reassuring as possible. Our serene environment and skilled team await you, committed to supporting you every step of the way, providing you with hope and solace as you embark on this transformative journey toward healing.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

export function WhatWeOffer() {
  return (
    <section id="what-we-offer" className="py-20 bg-white">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What We Offer
          </h2>
          <p className="text-xl text-gray-600">
            We Make Getting Help for Mental Health
          </p>
        </motion.div>

        {/* Steps Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
              {/* Card */}
              <div className="bg-white border-2 border-gray-100 rounded-lg p-8 h-full hover:border-amber-700 transition-colors group">
                {/* Step Number */}
                <div className="mb-6">
                  <span className="text-5xl font-bold text-amber-700 opacity-20 group-hover:opacity-30 transition-opacity">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-200 transition-colors">
                  <div className="text-amber-700">{step.icon}</div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector Line (visible on lg screens) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-1 bg-gradient-to-r from-amber-700 to-transparent transform -translate-y-1/2" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
