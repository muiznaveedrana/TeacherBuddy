"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Download, Sparkles } from 'lucide-react';

interface Worksheet {
  id: string;
  slug: string;
  title: string;
  year_group: string;
  topic: string;
  difficulty: string;
  thumbnail_url?: string;
  download_count: number;
  created_at: string;
}

export default function WorksheetShowcase() {
  const [worksheets, setWorksheets] = useState<Worksheet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopularWorksheets();
  }, []);

  const fetchPopularWorksheets = async () => {
    try {
      const response = await fetch('/api/worksheets/popular');
      if (response.ok) {
        const data = await response.json();
        setWorksheets(data.worksheets || []);
      }
    } catch (error) {
      console.error('Error fetching popular worksheets:', error);
      // Fallback to mock data for development
      setWorksheets(getMockWorksheets());
    } finally {
      setLoading(false);
    }
  };

  const getMockWorksheets = (): Worksheet[] => [
    {
      id: '1',
      slug: 'addition-to-20-standard-layout',
      title: 'Addition to 20',
      year_group: 'Year 1',
      topic: 'Addition',
      difficulty: 'easy',
      download_count: 245,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      slug: 'times-tables-practice-standard-layout',
      title: 'Times Tables Practice',
      year_group: 'Year 3',
      topic: 'Multiplication',
      difficulty: 'medium',
      download_count: 189,
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      slug: 'counting-to-10-standard-layout',
      title: 'Counting to 10',
      year_group: 'Reception',
      topic: 'Number Recognition',
      difficulty: 'easy',
      download_count: 312,
      created_at: new Date().toISOString()
    },
    {
      id: '4',
      slug: 'fractions-introduction-standard-layout',
      title: 'Fractions Introduction',
      year_group: 'Year 4',
      topic: 'Fractions',
      difficulty: 'medium',
      download_count: 156,
      created_at: new Date().toISOString()
    },
    {
      id: '5',
      slug: 'shape-recognition-standard-layout',
      title: 'Shape Recognition',
      year_group: 'Reception',
      topic: 'Geometry',
      difficulty: 'easy',
      download_count: 287,
      created_at: new Date().toISOString()
    },
    {
      id: '6',
      slug: 'division-practice-standard-layout',
      title: 'Division Practice',
      year_group: 'Year 5',
      topic: 'Division',
      difficulty: 'hard',
      download_count: 134,
      created_at: new Date().toISOString()
    },
    {
      id: '7',
      slug: 'money-and-change-standard-layout',
      title: 'Money and Change',
      year_group: 'Year 2',
      topic: 'Money',
      difficulty: 'easy',
      download_count: 198,
      created_at: new Date().toISOString()
    },
    {
      id: '8',
      slug: 'telling-time-standard-layout',
      title: 'Telling Time',
      year_group: 'Year 1',
      topic: 'Time',
      difficulty: 'medium',
      download_count: 176,
      created_at: new Date().toISOString()
    },
    {
      id: '9',
      slug: 'area-and-perimeter-standard-layout',
      title: 'Area and Perimeter',
      year_group: 'Year 4',
      topic: 'Measurement',
      difficulty: 'medium',
      download_count: 165,
      created_at: new Date().toISOString()
    },
    {
      id: '10',
      slug: 'number-bonds-to-10-standard-layout',
      title: 'Number Bonds to 10',
      year_group: 'Reception',
      topic: 'Addition',
      difficulty: 'easy',
      download_count: 298,
      created_at: new Date().toISOString()
    },
    {
      id: '11',
      slug: 'decimals-introduction-standard-layout',
      title: 'Decimals Introduction',
      year_group: 'Year 5',
      topic: 'Decimals',
      difficulty: 'medium',
      download_count: 142,
      created_at: new Date().toISOString()
    },
    {
      id: '12',
      slug: 'pattern-recognition-standard-layout',
      title: 'Pattern Recognition',
      year_group: 'Reception',
      topic: 'Patterns',
      difficulty: 'easy',
      download_count: 267,
      created_at: new Date().toISOString()
    },
  ];

  const getGradeColor = (yearGroup: string) => {
    const colors: { [key: string]: string } = {
      'Reception': 'bg-purple-100 text-purple-700 border-purple-300',
      'Year 1': 'bg-orange-100 text-orange-700 border-orange-300',
      'Year 2': 'bg-green-100 text-green-700 border-green-300',
      'Year 3': 'bg-red-100 text-red-700 border-red-300',
      'Year 4': 'bg-blue-100 text-blue-700 border-blue-300',
      'Year 5': 'bg-yellow-100 text-yellow-700 border-yellow-300',
      'Year 6': 'bg-indigo-100 text-indigo-700 border-indigo-300',
    };
    return colors[yearGroup] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  if (loading) {
    return (
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Printables This Week</h2>
            <p className="text-gray-600">Loading amazing resources...</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-48"></div>
                <div className="mt-2 bg-gray-200 h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-10 px-4 bg-gradient-to-b from-blue-50/50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Reduced vertical spacing */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-2 px-4 py-2 bg-green-100 rounded-full">
            <Sparkles className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-700">Most Downloaded This Week</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Popular Free Printables
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of teachers downloading these curriculum-aligned resources
          </p>
        </div>

        {/* Printables Grid - 2 rows, 6 columns */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          {worksheets.slice(0, 12).map((worksheet, index) => (
            <Link
              key={worksheet.id}
              href={`/library/${worksheet.slug}`}
              className="group relative block"
              style={{
                transform: `rotate(${index % 2 === 0 ? '-1' : '1'}deg)`,
                transition: 'all 0.3s ease'
              }}
            >
              {/* Paper Card Effect - Clean and simple */}
              <div className={`
                bg-white rounded-lg shadow-md hover:shadow-xl
                transition-all duration-300 overflow-hidden
                hover:scale-105 hover:rotate-0
                relative border border-gray-200 cursor-pointer
              `}>
                {/* Tape Effect */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="w-16 h-6 bg-yellow-100/80 rotate-3 shadow-sm"></div>
                </div>

                {/* Printable Preview - Full width, no padding, taller aspect ratio */}
                <div className="aspect-[1/1.4] bg-gradient-to-b from-gray-50 to-gray-100">
                  {worksheet.thumbnail_url ? (
                    <Image
                      src={worksheet.thumbnail_url}
                      alt={worksheet.title}
                      width={200}
                      height={280}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-white">
                      <div className="text-4xl mb-1">📝</div>
                      <div className="text-xs text-gray-500 font-medium">Printable</div>
                    </div>
                  )}
                </div>

                {/* Printable Info - Ultra compact */}
                <div className="p-1.5">
                  {/* Grade Badge */}
                  <span className={`
                    inline-block px-1.5 py-0.5 text-[10px] font-semibold rounded-full border
                    ${getGradeColor(worksheet.year_group)}
                  `}>
                    {worksheet.year_group}
                  </span>

                  {/* Title */}
                  <h3 className="font-semibold text-[11px] text-gray-900 mt-1 line-clamp-2 leading-tight">
                    {worksheet.title}
                  </h3>

                  {/* Download count only */}
                  <div className="flex items-center gap-0.5 mt-1 text-[10px] text-gray-500">
                    <Download className="w-3 h-3" />
                    <span>{worksheet.download_count}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Browse All CTA */}
        <div className="text-center">
          <Link
            href="/library"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Free Printables
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <p className="mt-3 text-sm text-gray-500">
            1000+ printables available • No sign-up required
          </p>
        </div>
      </div>
    </section>
  );
}