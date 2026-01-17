"use client";

import React from 'react';
import Link from 'next/link';
import { BookOpen, Palette, Shapes, Calculator, Rocket, Trophy, Star } from 'lucide-react';

const gradeData = [
  {
    grade: 'Reception',
    displayLabel: 'Kindergarten / Reception',
    ageRange: '4-5 years',
    icon: '🧸',
    color: 'from-purple-400 to-purple-500',
    borderColor: 'border-purple-300',
    bgPattern: 'bg-purple-50',
    topics: ['Counting', 'Shapes', 'Patterns'],
    IconComponent: Shapes,
    comingSoon: false,
  },
  {
    grade: 'Year 1',
    displayLabel: 'Grade 1 / Year 1',
    ageRange: '5-6 years',
    icon: '1️⃣',
    color: 'from-orange-400 to-orange-500',
    borderColor: 'border-orange-300',
    bgPattern: 'bg-orange-50',
    topics: ['Addition to 20', 'Time', 'Money'],
    IconComponent: BookOpen,
    comingSoon: false,
  },
  {
    grade: 'Year 2',
    displayLabel: 'Grade 2 / Year 2',
    ageRange: '6-7 years',
    icon: '2️⃣',
    color: 'from-green-400 to-green-500',
    borderColor: 'border-green-300',
    bgPattern: 'bg-green-50',
    topics: ['Times Tables', 'Fractions', 'Measurement'],
    IconComponent: Palette,
    comingSoon: false,
  },
  {
    grade: 'Year 3',
    displayLabel: 'Grade 3 / Year 3',
    ageRange: '7-8 years',
    icon: '3️⃣',
    color: 'from-red-400 to-red-500',
    borderColor: 'border-red-300',
    bgPattern: 'bg-red-50',
    topics: ['Multiplication', 'Division', 'Perimeter'],
    IconComponent: Calculator,
    comingSoon: false,
  },
  {
    grade: 'Year 4',
    displayLabel: 'Grade 4 / Year 4',
    ageRange: '8-9 years',
    icon: '4️⃣',
    color: 'from-blue-400 to-blue-500',
    borderColor: 'border-blue-300',
    bgPattern: 'bg-blue-50',
    topics: ['Decimals', 'Area', 'Roman Numerals'],
    IconComponent: Rocket,
    comingSoon: false,
  },
  {
    grade: 'Year 5',
    displayLabel: 'Grade 5 / Year 5',
    ageRange: '9-10 years',
    icon: '5️⃣',
    color: 'from-yellow-400 to-yellow-500',
    borderColor: 'border-yellow-300',
    bgPattern: 'bg-yellow-50',
    topics: ['Percentages', 'Prime Numbers', 'Volume'],
    IconComponent: Star,
    comingSoon: true,
  },
  {
    grade: 'Year 6',
    displayLabel: 'Grade 6 / Year 6',
    ageRange: '10-11 years',
    icon: '6️⃣',
    color: 'from-indigo-400 to-indigo-500',
    borderColor: 'border-indigo-300',
    bgPattern: 'bg-indigo-50',
    topics: ['Algebra', 'Ratio', 'Statistics'],
    IconComponent: Trophy,
    comingSoon: true,
  },
];

export default function GradeNavigation() {
  return (
    <section className="py-10 px-4 bg-gradient-to-b from-white to-blue-50/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Choose Your Grade Level
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Curriculum-aligned printables for every stage of elementary school
          </p>
        </div>

        {/* Grade Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {gradeData.map((grade, index) => {
            const CardWrapper = grade.comingSoon ? 'div' : Link;
            const wrapperProps = grade.comingSoon
              ? { className: 'group relative cursor-not-allowed' }
              : { href: `/library?year_group=${encodeURIComponent(grade.grade)}`, className: 'group relative' };

            return (
              <CardWrapper key={grade.grade} {...wrapperProps}>
                <div
                  className={`
                    relative overflow-hidden rounded-2xl border-2 ${grade.borderColor}
                    ${grade.bgPattern} p-6 transition-all duration-300
                    ${grade.comingSoon
                      ? 'opacity-60 grayscale-[30%]'
                      : 'hover:scale-105 hover:shadow-xl cursor-pointer'}
                  `}
                  style={{
                    transform: `rotate(${index % 2 === 0 ? '-1' : '1'}deg)`,
                  }}
                >
                  {/* Coming Soon Badge */}
                  {grade.comingSoon && (
                    <div className="absolute top-3 right-3 z-10 px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full shadow-md">
                      Coming Soon
                    </div>
                  )}

                  {/* Decorative tape effect */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-yellow-100/80 rotate-3 opacity-70"></div>

                  {/* Grade Icon & Number */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{grade.icon}</div>
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${grade.color} text-white`}>
                      <grade.IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Grade Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {grade.displayLabel}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">Ages {grade.ageRange}</p>

                  {/* Topics */}
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Popular Topics:</p>
                    <div className="flex flex-wrap gap-1">
                      {grade.topics.map((topic) => (
                        <span
                          key={topic}
                          className="text-xs px-2 py-1 bg-white/60 rounded-md text-gray-700"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover Effect - Doodle (only for active cards) */}
                  {!grade.comingSoon && (
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-12 h-12 text-gray-400/30" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9L12 2Z"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </CardWrapper>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for?
          </p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
          >
            Create Custom Worksheet
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}