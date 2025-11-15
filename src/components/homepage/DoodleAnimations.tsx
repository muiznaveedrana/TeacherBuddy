"use client";

import React, { useEffect, useState } from 'react';

const doodles = [
  { content: '2+2=4', top: '10%', left: '5%', delay: 0, size: 'text-lg' },
  { content: '×', top: '30%', right: '10%', delay: 3, size: 'text-3xl' },
  { content: '√', bottom: '20%', left: '15%', delay: 7, size: 'text-2xl' },
  { content: '÷', top: '50%', right: '20%', delay: 10, size: 'text-2xl' },
  { content: 'π', bottom: '30%', right: '5%', delay: 13, size: 'text-xl' },
  { content: '∑', top: '70%', left: '10%', delay: 16, size: 'text-2xl' },
  { content: '∞', bottom: '10%', left: '40%', delay: 5, size: 'text-xl' },
  { content: '=', top: '20%', left: '60%', delay: 8, size: 'text-3xl' },
];

export default function DoodleAnimations() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay showing doodles for better performance
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {doodles.map((doodle, index) => (
        <div
          key={index}
          className={`absolute floating-doodle handwritten text-gray-300 ${doodle.size}`}
          style={{
            top: doodle.top,
            bottom: doodle.bottom,
            left: doodle.left,
            right: doodle.right,
            animationDelay: `${doodle.delay}s`,
            opacity: 0.15,
          }}
        >
          {doodle.content}
        </div>
      ))}

      {/* Pencil sketch SVG doodles */}
      <svg
        className="absolute top-1/4 left-1/4 w-32 h-32 floating-doodle"
        style={{ animationDelay: '2s', opacity: 0.1 }}
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M20,50 Q50,20 80,50 T140,50"
          stroke="currentColor"
          strokeWidth="2"
          className="pencil-line text-gray-400"
        />
        <circle
          cx="50"
          cy="50"
          r="30"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          className="text-gray-400"
          strokeDasharray="5,5"
        />
      </svg>

      {/* Star doodle */}
      <svg
        className="absolute bottom-1/4 right-1/4 w-24 h-24 floating-doodle"
        style={{ animationDelay: '12s', opacity: 0.1 }}
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9L12 2Z"
          stroke="currentColor"
          strokeWidth="1"
          className="pencil-line text-gray-400"
        />
      </svg>

      {/* Arrow doodle */}
      <svg
        className="absolute top-3/4 left-10 w-20 h-20 floating-doodle"
        style={{ animationDelay: '18s', opacity: 0.1 }}
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M5 12h14M12 5l7 7-7 7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-400"
        />
      </svg>

      {/* Squiggly underline */}
      <svg
        className="absolute top-2/3 right-1/3 w-40 h-8 floating-doodle"
        style={{ animationDelay: '9s', opacity: 0.1 }}
        viewBox="0 0 100 20"
        fill="none"
      >
        <path
          d="M0,10 Q10,5 20,10 T40,10 T60,10 T80,10 T100,10"
          stroke="currentColor"
          strokeWidth="2"
          className="text-gray-400"
        />
      </svg>
    </div>
  );
}