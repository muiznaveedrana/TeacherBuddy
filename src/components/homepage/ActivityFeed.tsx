"use client";

import React, { useEffect, useState } from 'react';
import { Download, Eye, Heart } from 'lucide-react';

interface Activity {
  id: string;
  action: 'download' | 'view' | 'like';
  userName: string;
  worksheetTitle: string;
  timeAgo: string;
}

// Mock data for demonstration - in production, this would come from your API
const mockActivities: Activity[] = [
  { id: '1', action: 'download', userName: 'Sarah', worksheetTitle: 'Year 2 Addition Practice', timeAgo: '2 min ago' },
  { id: '2', action: 'view', userName: 'James', worksheetTitle: 'Reception Counting to 10', timeAgo: '5 min ago' },
  { id: '3', action: 'download', userName: 'Emma', worksheetTitle: 'Year 3 Times Tables', timeAgo: '7 min ago' },
  { id: '4', action: 'like', userName: 'Oliver', worksheetTitle: 'Year 1 Shape Recognition', timeAgo: '10 min ago' },
  { id: '5', action: 'download', userName: 'Sophie', worksheetTitle: 'Year 4 Fractions', timeAgo: '15 min ago' },
];

const actionIcons = {
  download: <Download className="w-4 h-4 text-green-600" />,
  view: <Eye className="w-4 h-4 text-blue-600" />,
  like: <Heart className="w-4 h-4 text-red-600" />,
};

const actionVerbs = {
  download: 'downloaded',
  view: 'viewed',
  like: 'liked',
};

export default function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate real-time updates
    setActivities(mockActivities);
    setIsVisible(true);

    // Simulate new activity every 30 seconds
    const interval = setInterval(() => {
      const randomActivity = mockActivities[Math.floor(Math.random() * mockActivities.length)];
      const newActivity = {
        ...randomActivity,
        id: Date.now().toString(),
        timeAgo: 'just now',
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-white/90 backdrop-blur rounded-xl shadow-lg p-6 max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">Live Activity</h3>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-xs text-gray-500">Live</span>
        </div>
      </div>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 text-sm animate-fadeIn"
            style={{
              animationDelay: `${index * 0.1}s`,
              opacity: 0,
              animationFillMode: 'forwards',
            }}
          >
            <div className="mt-0.5">{actionIcons[activity.action]}</div>
            <div className="flex-1">
              <p className="text-gray-700">
                <span className="font-medium text-gray-900">{activity.userName}</span>
                {' '}
                <span className="text-gray-600">{actionVerbs[activity.action]}</span>
                {' '}
                <span className="font-medium text-gray-900">{activity.worksheetTitle}</span>
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{activity.timeAgo}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}