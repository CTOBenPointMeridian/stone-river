"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface TreatmentCard {
  title: string;
  description: string;
}

const treatments: TreatmentCard[] = [
  {
    title: "Depression",
    description: "Characterized by persistent feelings of sadness, hopelessness, and a lack of interest in activities once enjoyed. Depression can affect one's daily life and require interventions like therapy and medication.",
  },
  {
    title: "Anxiety Disorders",
    description: "These include generalized anxiety disorder, panic disorder, and social anxiety disorder. Individuals may experience excessive worry, panic attacks, and intense discomfort in social situations.",
  },
  {
    title: "Bipolar Disorder",
    description: "Marked by extreme mood swings that include emotional highs (mania or hypomania) and lows (depression).",
  },
  {
    title: "Trauma & PTSD",
    description: "Develops after experiencing or witnessing a traumatic event. PTSD can cause severe anxiety, flashbacks, and uncontrollable thoughts about the event.",
  },
  {
    title: "Obsessive-Compulsive",
    description: "Involves unwanted, intrusive thoughts (obsessions) and repetitive behaviors (compulsions) that individuals feel driven to perform.",
  },
  {
    title: "Substance Use",
    description: "Chronic use of substances like drugs and alcohol that leads to significant impairment and distress. This includes those with co-occurring, dual-diagnosis substance use and mental health conditions.",
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

export function Treatment() {
  return (
    <section id="treatment" className="py-20 bg-white">
      <div className="container-custom">
        {/* Initial Content */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            In today's fast-paced world, taking time to care for our mental health can feel like an impossible task. Yet, it is crucial for leading a balanced and satisfying life.
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Getting Help For Mental Health
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            When you are ready to get help for mental health & co-occurring disorders, we are here to help with our highly-individualized approach to mental health treatment.
          </p>

          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            At Stone River Behavioral Health, we understand the complexities of mental health challenges and are here to support you every step of the way. Our expert mental health treatment options are designed to meet the unique needs of each individual, ensuring comprehensive care that focuses not only on symptom relief but also on long-term emotional and psychological well-being.
          </p>

          <Link href="/quiz">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center gap-2 justify-center"
            >
              Speak to Admissions
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Mental Health Info Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16 bg-gray-50 rounded-lg p-8"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            What Does It Mean When We Say Mental Health?
          </h3>

          <h4 className="text-2xl font-bold text-gray-900 mb-6">
            Understanding Mental Health Conditions
          </h4>

          <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>
              Mental illness encompasses a wide range of mental health conditions that affect mood, thinking, and behavior. These conditions can impact every aspect of a person's life, including their ability to function at work, maintain relationships, and engage in social activities. Mental illness is not a sign of personal weakness, and it is not something that can merely be "fixed" by willpower alone. Instead, it is a complex interplay of genetic, environmental, and psychological factors that require professional intervention and support. Understanding that mental illness is not your fault is a key step toward seeking the help you deserve.
            </p>

            <p>
              Recognizing and seeking treatment for mental health conditions is an essential part of maintaining overall health and well-being. Some of the common mental health conditions that people frequently seek treatment for include:
            </p>
          </div>
        </motion.div>

        {/* Treatment Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {treatments.map((treatment, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h5 className="text-xl font-bold text-gray-900 mb-4">
                {treatment.title}
              </h5>
              <p className="text-gray-600 leading-relaxed">
                {treatment.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
