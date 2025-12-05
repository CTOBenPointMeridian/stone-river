"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  title: string;
  timeAgo: string;
  rating: number;
  text: string;
  avatar: string;
  verified: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Chris Lee",
    title: "3 months ago",
    timeAgo: "3 months ago",
    rating: 5,
    text: "I was suffering from severe depression and my son was also in need of urgent help and being able to find Stone river mental health was a...",
    avatar: "C",
    verified: true,
  },
  {
    id: 2,
    name: "mike dematti",
    title: "9 months ago",
    timeAgo: "9 months ago",
    rating: 5,
    text: "I cannot speak highly enough about my experience at Stone River. From the moment I walked in, I felt welcomed, understood, an...",
    avatar: "M",
    verified: true,
  },
  {
    id: 3,
    name: "Brian Wennlund",
    title: "1 year ago",
    timeAgo: "1 year ago",
    rating: 5,
    text: "Spoke to John over the phone, he was knowledgeable and caring. You could tell he had our best intentions in mind, he was...",
    avatar: "B",
    verified: true,
  },
  {
    id: 4,
    name: "Michael Valera",
    title: "1 year ago",
    timeAgo: "1 year ago",
    rating: 5,
    text: "Amazing experience, truly caring staff and I felt comfortable for the first time in a very long time. Thank you so much Stone River!!!",
    avatar: "M",
    verified: true,
  },
  {
    id: 5,
    name: "luke zocco",
    title: "1 year ago",
    timeAgo: "1 year ago",
    rating: 5,
    text: "Best staff in the world! Super friendly, makes a stranger feel at home!",
    avatar: "L",
    verified: true,
  },
  {
    id: 6,
    name: "Jason Smith",
    title: "1 year ago",
    timeAgo: "1 year ago",
    rating: 5,
    text: "I cannot speak highly enough about my experience with Stone River Behavioral Health. From the moment I walked in, I felt welcomed...",
    avatar: "J",
    verified: true,
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

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gray-800">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Stories of Healing
          </h2>
          <p className="text-xl text-gray-300">
            Client Testimonials
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="bg-gray-700 rounded-lg p-6 border border-gray-600 hover:border-amber-700 transition-colors"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-amber-500 text-amber-500"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-100 text-base leading-relaxed mb-6 line-clamp-5">
                {testimonial.text}
              </p>

              {/* Read More */}
              <button className="text-gray-300 hover:text-amber-500 transition-colors font-medium mb-6">
                Read more
              </button>

              {/* User Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-600">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold flex items-center gap-1">
                    {testimonial.name}
                    {testimonial.verified && (
                      <span className="text-amber-500">✓</span>
                    )}
                  </p>
                  <p className="text-gray-400 text-sm">{testimonial.timeAgo}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
