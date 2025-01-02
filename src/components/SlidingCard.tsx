'use client'

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SlidingCard() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Welcome To StetthUps',
      content: 'Your one-stop solution for successfully clearing medical exams like NEET/NEXT,FMGE and more.',
    },
    {
      title: 'Comprehensive Resources',
      content: 'Access a wide range of study materials, practice tests, and expert guidance.',
    },
    {
      title: 'Track Your Progress',
      content: 'Monitor your performance and identify areas for improvement.',
    },
  ];

  const handleCircleClick = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Automatic sliding logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  }, [slides.length]);

  return (
    <div className="bg-white p-4 rounded-3xl shadow-xl h-[180px] w-[600px] mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-4xl text-black font-bold mb-3">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl mb-4 text-center text-black">
            {slides[currentSlide].content}
          </p>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center space-x-2" role="tablist">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleCircleClick(index)}
            className={`w-4 h-4 rounded-full transition-colors duration-300 ${
              currentSlide === index ? 'bg-purple-800' : 'bg-purple-400'
            }`}
            role="tab"
            aria-selected={currentSlide === index}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
