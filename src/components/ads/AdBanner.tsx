'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AdBannerProps {
  className?: string;
  onError?: () => void;
  onLoad?: () => void;
}

export function AdBanner({ className, onError, onLoad }: AdBannerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [adBlockDetected, setAdBlockDetected] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let loadTimer: NodeJS.Timeout;
    let testElement: HTMLElement | null = null;

    const detectAdBlocker = async () => {
      try {
        testElement = document.createElement('div');
        testElement.innerHTML = '&nbsp;';
        testElement.className = 'adsbox';
        testElement.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px;';
        document.body.appendChild(testElement);
        
        // Use requestAnimationFrame to ensure DOM update
        await new Promise(resolve => requestAnimationFrame(resolve));
        
        if (isMounted && testElement.offsetHeight === 0) {
          setAdBlockDetected(true);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.warn('Ad blocker detection failed:', error);
      } finally {
        if (testElement && testElement.parentNode) {
          testElement.parentNode.removeChild(testElement);
          testElement = null;
        }
      }
    };

    const loadAd = async () => {
      await detectAdBlocker();
      
      if (isMounted && !adBlockDetected) {
        loadTimer = setTimeout(() => {
          if (isMounted) {
            setIsLoading(false);
            onLoad?.();
          }
        }, 1000);
      }
    };

    loadAd();

    return () => {
      isMounted = false;
      if (loadTimer) clearTimeout(loadTimer);
      if (testElement && testElement.parentNode) {
        testElement.parentNode.removeChild(testElement);
      }
    };
  }, [onLoad, adBlockDetected]);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  if (adBlockDetected) {
    return (
      <div
        className={cn(
          'w-full h-[90px] bg-muted/30 border border-dashed border-muted-foreground/30 rounded-lg',
          'flex items-center justify-center text-sm text-muted-foreground',
          className
        )}
      >
        Ad blocker detected - Support us by disabling your ad blocker
      </div>
    );
  }

  if (hasError) {
    return (
      <div
        className={cn(
          'w-full h-[90px] bg-muted/20 border border-dashed border-muted-foreground/20 rounded-lg',
          'flex items-center justify-center text-sm text-muted-foreground',
          className
        )}
      >
        Advertisement failed to load
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className={cn(
          'w-full h-[90px] bg-muted/40 rounded-lg animate-pulse',
          'flex items-center justify-center text-sm text-muted-foreground',
          className
        )}
      >
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-muted-foreground/30 rounded animate-spin"></div>
          <span>Loading advertisement...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'w-full h-[90px] bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg',
        'flex items-center justify-center text-blue-800 font-medium shadow-sm',
        'hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden',
        className
      )}
      onClick={handleError} // Simulate ad click for demo
    >
      <div className="absolute top-1 right-1 text-xs text-blue-500/60 bg-white/70 px-1 rounded">
        Ad
      </div>
      <div className="text-center">
        <div className="text-lg font-semibold mb-1">Educational Resources</div>
        <div className="text-sm opacity-80">Discover teaching materials for your classroom</div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse"></div>
    </div>
  );
}