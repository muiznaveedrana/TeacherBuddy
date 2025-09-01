'use client';

import React from 'react';
import { AdBanner, AdMediumRectangle, AdMobile } from './';
import { withAdVisibility, useAds } from './AdProvider';

// Create tier-aware versions of ad components
export const TierAwareAdBanner = withAdVisibility(AdBanner);
export const TierAwareAdMediumRectangle = withAdVisibility(AdMediumRectangle);
export const TierAwareAdMobile = withAdVisibility(AdMobile);

// Component to show upgrade benefits where ads would be
interface UpgradePromptProps {
  className?: string;
  size?: 'banner' | 'medium' | 'small';
}

export function UpgradePrompt({ className, size = 'medium' }: UpgradePromptProps) {
  const { subscriptionTier, setSubscriptionTier } = useAds();
  
  const handleUpgrade = (tier: 'pro' | 'pro-plus') => {
    // In real app, this would redirect to payment flow
    setSubscriptionTier(tier);
  };

  const sizeClasses = {
    banner: 'w-full h-[90px] px-6',
    medium: 'w-[300px] h-[250px] p-6',
    small: 'w-full h-[50px] px-4'
  };

  if (subscriptionTier !== 'free') {
    return null;
  }

  return (
    <div className={`
      ${sizeClasses[size]} 
      bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-dashed border-blue-300 rounded-lg 
      flex flex-col items-center justify-center text-center space-y-2 relative group hover:border-blue-400 transition-colors
      ${className}
    `}>
      <div className="absolute top-2 right-2 text-xs text-blue-500/60 bg-white/70 px-1.5 py-0.5 rounded">
        Upgrade
      </div>
      
      <div className="text-blue-600 font-medium text-sm">
        ✨ Go Ad-Free
      </div>
      
      {size !== 'small' && (
        <>
          <div className="text-blue-500 text-xs max-w-[200px]">
            Professional, distraction-free interface perfect for classroom use
          </div>
          
          <div className="flex space-x-2 mt-2">
            <button 
              onClick={() => handleUpgrade('pro')}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-full transition-colors"
            >
              Pro £2.99
            </button>
            <button 
              onClick={() => handleUpgrade('pro-plus')}
              className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1 rounded-full transition-colors"
            >
              Pro+ £4.99
            </button>
          </div>
        </>
      )}
      
      {size === 'small' && (
        <button 
          onClick={() => handleUpgrade('pro')}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-full transition-colors"
        >
          Upgrade
        </button>
      )}
    </div>
  );
}

// Demo component to show tier transitions
export function TierSelector() {
  const { subscriptionTier, setSubscriptionTier, showAds } = useAds();
  
  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <h3 className="font-medium mb-3">Demo: Subscription Tier Selector</h3>
      <div className="flex space-x-2 mb-3">
        <button 
          onClick={() => setSubscriptionTier('free')}
          className={`px-3 py-2 text-sm rounded transition-colors ${
            subscriptionTier === 'free' 
              ? 'bg-orange-100 text-orange-800 border-orange-300' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          } border`}
        >
          Free Tier
        </button>
        <button 
          onClick={() => setSubscriptionTier('pro')}
          className={`px-3 py-2 text-sm rounded transition-colors ${
            subscriptionTier === 'pro' 
              ? 'bg-blue-100 text-blue-800 border-blue-300' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          } border`}
        >
          Pro Tier
        </button>
        <button 
          onClick={() => setSubscriptionTier('pro-plus')}
          className={`px-3 py-2 text-sm rounded transition-colors ${
            subscriptionTier === 'pro-plus' 
              ? 'bg-purple-100 text-purple-800 border-purple-300' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          } border`}
        >
          Pro Plus Tier
        </button>
      </div>
      <div className="text-sm text-gray-600">
        Current: <span className="font-medium capitalize">{subscriptionTier}</span> 
        {' • '}
        Ads: <span className="font-medium">{showAds ? 'Visible' : 'Hidden'}</span>
      </div>
    </div>
  );
}