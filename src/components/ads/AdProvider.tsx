'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type SubscriptionTier = 'free' | 'pro' | 'pro-plus';

interface AdContextType {
  showAds: boolean;
  subscriptionTier: SubscriptionTier;
  setSubscriptionTier: (tier: SubscriptionTier) => void;
  isLoading: boolean;
}

const AdContext = createContext<AdContextType | undefined>(undefined);

interface AdProviderProps {
  children: ReactNode;
  initialTier?: SubscriptionTier;
}

export function AdProvider({ children, initialTier = 'free' }: AdProviderProps) {
  const [subscriptionTier, setSubscriptionTier] = useState<SubscriptionTier>(initialTier);
  const [isLoading, setIsLoading] = useState(true);

  // Determine if ads should be shown based on subscription tier
  const showAds = subscriptionTier === 'free';

  useEffect(() => {
    // Simulate fetching user's subscription tier from API/localStorage
    const fetchSubscriptionTier = async () => {
      setIsLoading(true);
      
      try {
        // In a real app, this would fetch from your auth/subscription service
        // For demo purposes, check localStorage for tier preference
        const savedTier = localStorage.getItem('subscription-tier') as SubscriptionTier;
        if (savedTier && ['free', 'pro', 'pro-plus'].includes(savedTier)) {
          setSubscriptionTier(savedTier);
        }
      } catch (error) {
        console.error('Error fetching subscription tier:', error);
        // Default to free tier on error
        setSubscriptionTier('free');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptionTier();
  }, []);

  // Save tier changes to localStorage (in real app, would sync with backend)
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('subscription-tier', subscriptionTier);
    }
  }, [subscriptionTier, isLoading]);

  const value: AdContextType = {
    showAds,
    subscriptionTier,
    setSubscriptionTier,
    isLoading,
  };

  return <AdContext.Provider value={value}>{children}</AdContext.Provider>;
}

export function useAds(): AdContextType {
  const context = useContext(AdContext);
  if (context === undefined) {
    throw new Error('useAds must be used within an AdProvider');
  }
  return context;
}

// Higher-order component to wrap ad components with tier-based visibility
interface WithAdVisibilityProps {
  fallback?: ReactNode;
  showUpgradePrompt?: boolean;
}

export function withAdVisibility<P extends object>(
  Component: React.ComponentType<P>
) {
  return function AdVisibilityWrapper(
    props: P & WithAdVisibilityProps
  ) {
    const { showAds, isLoading, subscriptionTier } = useAds();
    const { fallback, showUpgradePrompt = false, ...componentProps } = props;

    if (isLoading) {
      return (
        <div className="animate-pulse bg-muted/20 rounded-lg flex items-center justify-center text-sm text-muted-foreground">
          Loading...
        </div>
      );
    }

    if (!showAds) {
      if (showUpgradePrompt) {
        return (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 text-center">
            <div className="text-blue-800">
              <div className="text-sm font-medium mb-1">✨ Ad-Free Experience</div>
              <div className="text-xs opacity-80">
                Enjoying your {subscriptionTier === 'pro' ? 'Pro' : 'Pro Plus'} subscription
              </div>
            </div>
          </div>
        );
      }
      
      return fallback ? <>{fallback}</> : null;
    }

    return <Component {...(componentProps as P)} />;
  };
}