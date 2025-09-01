'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  advertising: boolean;
  schoolSafeMode: boolean;
}

const defaultPreferences: CookiePreferences = {
  essential: true, // Always required
  analytics: false,
  advertising: false,
  schoolSafeMode: true,
};

interface CookieConsentProps {
  className?: string;
  onPreferencesChange?: (preferences: CookiePreferences) => void;
}

export function CookieConsent({ className, onPreferencesChange }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    // Check if user has already made a choice
    const consentGiven = localStorage.getItem('cookie-consent-given');
    const savedPreferences = localStorage.getItem('cookie-preferences');
    
    if (!consentGiven) {
      setIsVisible(true);
    } else if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences) as CookiePreferences;
        
        // Validate and sanitize preferences to prevent potential security issues
        const validatedPreferences: CookiePreferences = {
          essential: Boolean(parsed.essential),
          analytics: Boolean(parsed.analytics),
          advertising: Boolean(parsed.advertising),
          schoolSafeMode: Boolean(parsed.schoolSafeMode),
        };
        
        // Ensure essential cookies are always enabled for security
        validatedPreferences.essential = true;
        
        setPreferences(validatedPreferences);
        onPreferencesChange?.(validatedPreferences);
      } catch (error) {
        console.error('Error parsing saved cookie preferences:', error);
        // Reset to safe defaults on parsing error
        const safeDefaults = { ...defaultPreferences };
        setPreferences(safeDefaults);
        onPreferencesChange?.(safeDefaults);
      }
    }
  }, [onPreferencesChange]);

  const handleAcceptAll = () => {
    const allAcceptedPreferences: CookiePreferences = {
      essential: true,
      analytics: true,
      advertising: true,
      schoolSafeMode: true,
    };
    
    savePreferences(allAcceptedPreferences);
  };

  const handleAcceptEssentialOnly = () => {
    const essentialOnlyPreferences: CookiePreferences = {
      essential: true,
      analytics: false,
      advertising: false,
      schoolSafeMode: true,
    };
    
    savePreferences(essentialOnlyPreferences);
  };

  const handleSaveCustomPreferences = () => {
    savePreferences(preferences);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent-given', 'true');
    localStorage.setItem('cookie-preferences', JSON.stringify(prefs));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    
    setPreferences(prefs);
    setIsVisible(false);
    onPreferencesChange?.(prefs);
  };

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    if (key === 'essential') return; // Essential cookies cannot be disabled
    
    setPreferences(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  if (!isVisible) return null;

  return (
    <div className={cn(
      'fixed bottom-0 left-0 right-0 z-50 p-4',
      'bg-black/50 backdrop-blur-sm',
      className
    )}>
      <Card className="max-w-4xl mx-auto shadow-xl border-2">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 text-2xl">🍪</div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Cookie Preferences
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We use cookies to improve your experience and provide relevant educational content. 
                  Your privacy is important to us, and we&apos;re committed to GDPR compliance for our UK users.
                </p>
              </div>

              {showDetails && (
                <div className="space-y-4 border-t pt-4">
                  <h4 className="font-medium text-gray-900">Customize your preferences:</h4>
                  
                  <div className="grid gap-3">
                    {/* Essential Cookies */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-900">Essential Cookies</div>
                        <div className="text-xs text-gray-600">
                          Required for the website to function properly. Cannot be disabled.
                        </div>
                      </div>
                      <div className="bg-green-500 rounded-full w-10 h-5 flex items-center px-1">
                        <div className="bg-white w-3 h-3 rounded-full shadow translate-x-4"></div>
                      </div>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-900">Analytics & Performance</div>
                        <div className="text-xs text-gray-600">
                          Help us understand how you use our platform to improve your experience.
                        </div>
                      </div>
                      <button 
                        onClick={() => updatePreference('analytics', !preferences.analytics)}
                        className={`rounded-full w-10 h-5 flex items-center px-1 transition-colors ${
                          preferences.analytics ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`bg-white w-3 h-3 rounded-full shadow transition-transform ${
                          preferences.analytics ? 'translate-x-4' : 'translate-x-0'
                        }`}></div>
                      </button>
                    </div>

                    {/* Advertising Cookies */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-900">Advertising & Personalization</div>
                        <div className="text-xs text-gray-600">
                          Show relevant educational ads and content based on your interests.
                        </div>
                      </div>
                      <button 
                        onClick={() => updatePreference('advertising', !preferences.advertising)}
                        className={`rounded-full w-10 h-5 flex items-center px-1 transition-colors ${
                          preferences.advertising ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`bg-white w-3 h-3 rounded-full shadow transition-transform ${
                          preferences.advertising ? 'translate-x-4' : 'translate-x-0'
                        }`}></div>
                      </button>
                    </div>

                    {/* School Safe Mode */}
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex-1">
                        <div className="font-medium text-sm text-blue-900 flex items-center gap-2">
                          🏫 School-Safe Mode
                        </div>
                        <div className="text-xs text-blue-700">
                          Enhanced privacy controls and content filtering for educational environments.
                        </div>
                      </div>
                      <button 
                        onClick={() => updatePreference('schoolSafeMode', !preferences.schoolSafeMode)}
                        className={`rounded-full w-10 h-5 flex items-center px-1 transition-colors ${
                          preferences.schoolSafeMode ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`bg-white w-3 h-3 rounded-full shadow transition-transform ${
                          preferences.schoolSafeMode ? 'translate-x-4' : 'translate-x-0'
                        }`}></div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3 items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  <Button 
                    onClick={handleAcceptAll}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Accept All
                  </Button>
                  <Button 
                    onClick={handleAcceptEssentialOnly}
                    variant="outline"
                  >
                    Essential Only
                  </Button>
                  <Button 
                    onClick={() => setShowDetails(!showDetails)}
                    variant="outline"
                    size="sm"
                  >
                    {showDetails ? 'Hide' : 'Customize'}
                  </Button>
                  {showDetails && (
                    <Button 
                      onClick={handleSaveCustomPreferences}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Save Preferences
                    </Button>
                  )}
                </div>
                
                <div className="flex gap-2 text-xs">
                  <a 
                    href="/privacy-policy" 
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>
                  <span className="text-gray-400">|</span>
                  <a 
                    href="/cookie-policy" 
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Cookie Policy
                  </a>
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleAcceptEssentialOnly}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 text-xl p-1"
              aria-label="Accept essential cookies only and close"
            >
              ✕
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}