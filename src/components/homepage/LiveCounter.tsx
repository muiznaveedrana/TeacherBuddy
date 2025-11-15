"use client";

import React, { useEffect, useState } from 'react';
import { Download, Users, FileText, TrendingUp } from 'lucide-react';

interface CounterStats {
  downloads: number;
  teachers: number;
  worksheets: number;
  todayDownloads: number;
}

export default function LiveCounter() {
  const [stats, setStats] = useState<CounterStats>({
    downloads: 2500000,
    teachers: 12000,
    worksheets: 1000,
    todayDownloads: 342,
  });

  useEffect(() => {
    // Simulate live updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        downloads: prev.downloads + Math.floor(Math.random() * 3),
        todayDownloads: prev.todayDownloads + (Math.random() > 0.7 ? 1 : 0),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Total Downloads */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full">
            <Download className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {formatNumber(stats.downloads)}+
          </div>
          <div className="text-sm text-gray-600 mt-1">Total Downloads</div>
        </div>

        {/* Active Teachers */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {formatNumber(stats.teachers)}+
          </div>
          <div className="text-sm text-gray-600 mt-1">UK Teachers</div>
        </div>

        {/* Available Worksheets */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-3 bg-gradient-to-br from-green-100 to-green-200 rounded-full">
            <FileText className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            {formatNumber(stats.worksheets)}+
          </div>
          <div className="text-sm text-gray-600 mt-1">Free Worksheets</div>
        </div>

        {/* Today's Downloads */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full">
            <TrendingUp className="w-6 h-6 text-orange-600" />
          </div>
          <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            {stats.todayDownloads}
          </div>
          <div className="text-sm text-gray-600 mt-1">Today's Downloads</div>
        </div>
      </div>

      {/* Activity Indicator */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-sm text-gray-600">
            Teachers are downloading worksheets right now
          </span>
        </div>
      </div>
    </div>
  );
}