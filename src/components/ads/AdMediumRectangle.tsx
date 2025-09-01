'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AdMediumRectangleProps {
  className?: string;
  onError?: () => void;
  onLoad?: () => void;
}

export function AdMediumRectangle({ className, onError, onLoad }: AdMediumRectangleProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [adBlockDetected, setAdBlockDetected] = useState(false);

  useEffect(() => {
    // Simulate ad loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      onLoad?.();
    }, 1200);

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
          'w-[300px] h-[250px] bg-muted/30 border border-dashed border-muted-foreground/30 rounded-lg',
          'flex flex-col items-center justify-center text-sm text-muted-foreground text-center p-4',
          className
        )}
      >
        <div className="mb-2">🛡️</div>
        <div>Ad blocker detected</div>
        <div className="text-xs opacity-70 mt-1">
          Please disable to support free worksheets
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div
        className={cn(
          'w-[300px] h-[250px] bg-muted/20 border border-dashed border-muted-foreground/20 rounded-lg',
          'flex flex-col items-center justify-center text-sm text-muted-foreground text-center p-4',
          className
        )}
      >
        <div className="mb-2">⚠️</div>
        <div>Advertisement failed to load</div>
        <button 
          onClick={() => window.location.reload()} 
          className="text-xs underline mt-2 hover:no-underline"
        >
          Refresh page
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className={cn(
          'w-[300px] h-[250px] bg-muted/40 rounded-lg animate-pulse',
          'flex flex-col items-center justify-center text-sm text-muted-foreground',
          className
        )}
      >
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-6 h-6 bg-muted-foreground/30 rounded animate-spin"></div>
          <span>Loading ad...</span>
        </div>
        <div className="w-32 h-3 bg-muted-foreground/20 rounded mb-2 animate-pulse"></div>
        <div className="w-24 h-2 bg-muted-foreground/15 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'w-[300px] h-[250px] bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg',
        'flex flex-col items-center justify-center text-purple-800 font-medium shadow-sm p-6',
        'hover:shadow-md transition-all cursor-pointer relative overflow-hidden group',
        className
      )}
      onClick={handleError} // Simulate ad click for demo
    >
      <div className="absolute top-2 right-2 text-xs text-purple-500/60 bg-white/70 px-1.5 py-0.5 rounded">
        Ad
      </div>
      
      <div className="text-center mb-4">
        <div className="text-2xl mb-2">📚</div>
        <div className="text-lg font-semibold mb-2">Teaching Supplies</div>
        <div className="text-sm opacity-80 leading-relaxed">
          Premium classroom materials and educational resources for UK teachers
        </div>
      </div>
      
      <div className="bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full group-hover:bg-purple-200 transition-colors">
        Shop Now - Free Delivery
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent transform rotate-12 scale-150 group-hover:animate-pulse"></div>
    </div>
  );
}