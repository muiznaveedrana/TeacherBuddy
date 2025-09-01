'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AdMobileProps {
  className?: string;
  variant?: 'banner' | 'square' | 'large-banner';
  onError?: () => void;
  onLoad?: () => void;
}

export function AdMobile({ className, variant = 'banner', onError, onLoad }: AdMobileProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [adBlockDetected, setAdBlockDetected] = useState(false);

  // Responsive sizes based on variant
  const sizeClasses = {
    'banner': 'w-full h-[50px] sm:h-[60px]', // Mobile banner 320x50, Tablet 728x60
    'square': 'w-full max-w-[250px] h-[250px]', // Mobile square
    'large-banner': 'w-full h-[100px] sm:h-[120px]' // Large mobile banner
  };

  useEffect(() => {
    // Simulate ad loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      onLoad?.();
    }, 800);

    // Simulate ad blocker detection
    const detectAdBlocker = () => {
      const testAd = document.createElement('div');
      testAd.innerHTML = '&nbsp;';
      testAd.className = 'adsbox';
      testAd.style.position = 'absolute';
      testAd.style.left = '-10000px';
      document.body.appendChild(testAd);
      
      setTimeout(() => {
        if (testAd.offsetHeight === 0) {
          setAdBlockDetected(true);
        }
        document.body.removeChild(testAd);
      }, 100);
    };

    detectAdBlocker();

    return () => clearTimeout(timer);
  }, [onLoad]);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  if (adBlockDetected) {
    return (
      <div
        className={cn(
          sizeClasses[variant],
          'bg-muted/30 border border-dashed border-muted-foreground/30 rounded-lg',
          'flex items-center justify-center text-xs text-muted-foreground text-center p-2',
          className
        )}
      >
        <div className="flex items-center space-x-2">
          <span>🛡️</span>
          <span>Ad blocked</span>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div
        className={cn(
          sizeClasses[variant],
          'bg-muted/20 border border-dashed border-muted-foreground/20 rounded-lg',
          'flex items-center justify-center text-xs text-muted-foreground text-center p-2',
          className
        )}
      >
        <div className="flex items-center space-x-2">
          <span>⚠️</span>
          <span>Ad failed</span>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className={cn(
          sizeClasses[variant],
          'bg-muted/40 rounded-lg animate-pulse',
          'flex items-center justify-center text-xs text-muted-foreground',
          className
        )}
      >
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-muted-foreground/30 rounded animate-spin"></div>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  // Different content based on variant
  const renderContent = () => {
    switch (variant) {
      case 'square':
        return (
          <div className="text-center p-4">
            <div className="text-lg mb-2">📱</div>
            <div className="text-sm font-semibold mb-2">Education Apps</div>
            <div className="text-xs opacity-80 mb-3">
              Discover mobile learning tools for teachers and students
            </div>
            <div className="bg-white/80 text-green-700 text-xs font-medium px-2 py-1 rounded">
              Download Free
            </div>
          </div>
        );
      case 'large-banner':
        return (
          <div className="flex items-center justify-between px-4 h-full">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🎯</div>
              <div>
                <div className="text-sm font-semibold">Teaching Resources</div>
                <div className="text-xs opacity-80">Free UK curriculum materials</div>
              </div>
            </div>
            <div className="bg-white/80 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full">
              Explore
            </div>
          </div>
        );
      default: // banner
        return (
          <div className="flex items-center justify-between px-3 h-full">
            <div className="flex items-center space-x-2">
              <span className="text-sm">✏️</span>
              <span className="text-xs font-medium">Classroom Tools</span>
            </div>
            <div className="bg-white/80 text-orange-700 text-xs font-medium px-2 py-1 rounded">
              Learn More
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={cn(
        sizeClasses[variant],
        'bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg',
        'text-green-800 font-medium shadow-sm relative overflow-hidden cursor-pointer',
        'hover:shadow-md transition-all',
        className
      )}
      onClick={handleError} // Simulate ad click for demo
    >
      <div className="absolute top-1 right-1 text-xs text-green-500/60 bg-white/70 px-1 rounded z-10">
        Ad
      </div>
      
      {renderContent()}
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse opacity-50"></div>
    </div>
  );
}