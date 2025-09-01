'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  advertising: boolean;
  schoolSafeMode: boolean;
}

interface PrivacyData {
  dataCollection: boolean;
  behavioralTargeting: boolean;
  thirdPartySharing: boolean;
  emailMarketing: boolean;
  usageAnalytics: boolean;
}

const defaultCookiePreferences: CookiePreferences = {
  essential: true,
  analytics: false,
  advertising: false,
  schoolSafeMode: true,
};

const defaultPrivacyData: PrivacyData = {
  dataCollection: true,
  behavioralTargeting: false,
  thirdPartySharing: false,
  emailMarketing: false,
  usageAnalytics: false,
};

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label: string;
  description: string;
  required?: boolean;
}

function ToggleSwitch({ checked, onChange, disabled = false, label, description, required = false }: ToggleSwitchProps) {
  return (
    <div className={cn(
      'flex items-center justify-between p-4 rounded-lg border',
      disabled ? 'bg-gray-50' : 'bg-white hover:bg-gray-50',
      'transition-colors'
    )}>
      <div className="flex-1 pr-4">
        <div className="flex items-center gap-2">
          <div className={cn(
            'font-medium text-sm',
            disabled ? 'text-gray-500' : 'text-gray-900'
          )}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </div>
        </div>
        <div className="text-xs text-gray-600 mt-1">
          {description}
        </div>
      </div>
      
      <button 
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={cn(
          'rounded-full w-11 h-6 flex items-center px-1 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          checked 
            ? (disabled ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600')
            : (disabled ? 'bg-gray-300' : 'bg-gray-300 hover:bg-gray-400'),
          disabled && 'cursor-not-allowed'
        )}
      >
        <div className={cn(
          'bg-white w-4 h-4 rounded-full shadow transition-transform',
          checked ? 'translate-x-5' : 'translate-x-0'
        )}></div>
      </button>
    </div>
  );
}

export function PrivacySettings() {
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>(defaultCookiePreferences);
  const [privacyData, setPrivacyData] = useState<PrivacyData>(defaultPrivacyData);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    try {
      // Load saved preferences with validation
      const savedCookies = localStorage.getItem('cookie-preferences');
      const savedPrivacy = localStorage.getItem('privacy-preferences');
      const savedDate = localStorage.getItem('privacy-settings-updated');
      
      if (savedCookies) {
        try {
          const parsed = JSON.parse(savedCookies) as CookiePreferences;
          // Validate and ensure essential cookies are enabled
          const validated: CookiePreferences = {
            essential: true, // Always enforce essential cookies
            analytics: Boolean(parsed.analytics),
            advertising: Boolean(parsed.advertising),
            schoolSafeMode: Boolean(parsed.schoolSafeMode),
          };
          setCookiePreferences(validated);
        } catch (error) {
          console.error('Error parsing cookie preferences:', error);
          setCookiePreferences(defaultCookiePreferences);
        }
      }
      
      if (savedPrivacy) {
        try {
          const parsed = JSON.parse(savedPrivacy) as PrivacyData;
          // Validate privacy data structure
          const validated: PrivacyData = {
            dataCollection: Boolean(parsed.dataCollection),
            behavioralTargeting: Boolean(parsed.behavioralTargeting),
            thirdPartySharing: Boolean(parsed.thirdPartySharing),
            emailMarketing: Boolean(parsed.emailMarketing),
            usageAnalytics: Boolean(parsed.usageAnalytics),
          };
          setPrivacyData(validated);
        } catch (error) {
          console.error('Error parsing privacy preferences:', error);
          setPrivacyData(defaultPrivacyData);
        }
      }
      
      if (savedDate) {
        // Validate date format
        try {
          new Date(savedDate).toISOString();
          setLastSaved(savedDate);
        } catch (error) {
          console.error('Invalid saved date format:', error);
        }
      }
    } catch (error) {
      console.error('Failed to load privacy settings:', error);
      // Reset to defaults if localStorage access fails
      setCookiePreferences(defaultCookiePreferences);
      setPrivacyData(defaultPrivacyData);
    }
  }, []);

  useEffect(() => {
    setHasChanges(true);
  }, [cookiePreferences, privacyData]);

  const updateCookiePreference = (key: keyof CookiePreferences, value: boolean) => {
    if (key === 'essential') return; // Essential cookies cannot be disabled
    
    setCookiePreferences(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const updatePrivacyPreference = (key: keyof PrivacyData, value: boolean) => {
    setPrivacyData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const saveSettings = () => {
    try {
      const timestamp = new Date().toISOString();
      
      // Validate data before saving
      const validatedCookiePrefs = {
        essential: true, // Always enforce essential cookies
        analytics: Boolean(cookiePreferences.analytics),
        advertising: Boolean(cookiePreferences.advertising),
        schoolSafeMode: Boolean(cookiePreferences.schoolSafeMode),
      };
      
      const validatedPrivacyData = {
        dataCollection: Boolean(privacyData.dataCollection),
        behavioralTargeting: Boolean(privacyData.behavioralTargeting),
        thirdPartySharing: Boolean(privacyData.thirdPartySharing),
        emailMarketing: Boolean(privacyData.emailMarketing),
        usageAnalytics: Boolean(privacyData.usageAnalytics),
      };
      
      localStorage.setItem('cookie-preferences', JSON.stringify(validatedCookiePrefs));
      localStorage.setItem('privacy-preferences', JSON.stringify(validatedPrivacyData));
      localStorage.setItem('privacy-settings-updated', timestamp);
      localStorage.setItem('cookie-consent-given', 'true');
      
      setLastSaved(timestamp);
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to save privacy settings:', error);
      // Could add user notification here in real implementation
    }
  };

  const resetToDefaults = () => {
    setCookiePreferences(defaultCookiePreferences);
    setPrivacyData(defaultPrivacyData);
  };

  const exportMyData = () => {
    const data = {
      cookiePreferences,
      privacyData,
      exportDate: new Date().toISOString(),
      userAgent: navigator.userAgent,
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-privacy-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Privacy Settings</h1>
        <p className="text-gray-600">
          Control how your data is used and manage your privacy preferences
        </p>
      </div>

      {/* Cookie Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🍪 Cookie Preferences
          </CardTitle>
          <CardDescription>
            Manage which cookies we can use to improve your experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <ToggleSwitch
            checked={cookiePreferences.essential}
            onChange={(value) => updateCookiePreference('essential', value)}
            disabled={true}
            label="Essential Cookies"
            description="Required for basic website functionality. These cookies cannot be disabled."
            required={true}
          />
          
          <ToggleSwitch
            checked={cookiePreferences.analytics}
            onChange={(value) => updateCookiePreference('analytics', value)}
            label="Analytics & Performance"
            description="Help us understand how you use our platform to improve your experience."
          />
          
          <ToggleSwitch
            checked={cookiePreferences.advertising}
            onChange={(value) => updateCookiePreference('advertising', value)}
            label="Advertising & Personalization"
            description="Show relevant educational ads and content based on your teaching preferences."
          />
          
          <ToggleSwitch
            checked={cookiePreferences.schoolSafeMode}
            onChange={(value) => updateCookiePreference('schoolSafeMode', value)}
            label="🏫 School-Safe Mode"
            description="Enhanced privacy controls and content filtering for educational environments."
          />
        </CardContent>
      </Card>

      {/* Data Usage Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🛡️ Data Usage Controls
          </CardTitle>
          <CardDescription>
            Granular controls over how your personal data is processed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <ToggleSwitch
            checked={privacyData.dataCollection}
            onChange={(value) => updatePrivacyPreference('dataCollection', value)}
            label="Data Collection"
            description="Allow collection of usage data to improve our educational content and features."
          />
          
          <ToggleSwitch
            checked={privacyData.behavioralTargeting}
            onChange={(value) => updatePrivacyPreference('behavioralTargeting', value)}
            label="Behavioral Targeting"
            description="Use your activity to show more relevant content and educational resources."
          />
          
          <ToggleSwitch
            checked={privacyData.thirdPartySharing}
            onChange={(value) => updatePrivacyPreference('thirdPartySharing', value)}
            label="Third-Party Sharing"
            description="Share anonymized data with educational partners to improve teaching resources."
          />
          
          <ToggleSwitch
            checked={privacyData.usageAnalytics}
            onChange={(value) => updatePrivacyPreference('usageAnalytics', value)}
            label="Usage Analytics"
            description="Track how you use our features to provide personalized recommendations."
          />
          
          <ToggleSwitch
            checked={privacyData.emailMarketing}
            onChange={(value) => updatePrivacyPreference('emailMarketing', value)}
            label="Email Marketing"
            description="Receive newsletters and updates about new educational features and resources."
          />
        </CardContent>
      </Card>

      {/* UK-Specific GDPR Rights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🇬🇧 Your UK Data Rights (GDPR)
          </CardTitle>
          <CardDescription>
            Exercise your rights under the General Data Protection Regulation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-sm mb-2">Right to Access</h4>
              <p className="text-xs text-gray-600 mb-3">
                Request a copy of all personal data we hold about you.
              </p>
              <Button variant="outline" size="sm" onClick={exportMyData}>
                Export My Data
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-sm mb-2">Right to be Forgotten</h4>
              <p className="text-xs text-gray-600 mb-3">
                Request deletion of your personal data from our systems.
              </p>
              <Button variant="outline" size="sm">
                Delete My Account
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-sm mb-2">Right to Portability</h4>
              <p className="text-xs text-gray-600 mb-3">
                Transfer your data to another educational platform.
              </p>
              <Button variant="outline" size="sm">
                Download Data
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-sm mb-2">Right to Rectification</h4>
              <p className="text-xs text-gray-600 mb-3">
                Correct any inaccurate personal data we hold about you.
              </p>
              <Button variant="outline" size="sm">
                Update Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              {lastSaved && (
                <span>Last saved: {new Date(lastSaved).toLocaleString('en-GB')}</span>
              )}
              {hasChanges && (
                <span className="ml-2 text-orange-600">• Unsaved changes</span>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={resetToDefaults}
              >
                Reset to Defaults
              </Button>
              <Button 
                onClick={saveSettings}
                disabled={!hasChanges}
                className="bg-green-600 hover:bg-green-700"
              >
                {hasChanges ? 'Save Changes' : 'Saved'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <h4 className="font-medium text-blue-900 mb-2">Questions about your privacy?</h4>
            <p className="text-sm text-blue-700 mb-3">
              Contact our Data Protection Officer for any privacy-related questions or concerns.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="mailto:privacy@worksheetgenerator.ai" className="text-blue-600 hover:underline">
                privacy@worksheetgenerator.ai
              </a>
              <span className="text-blue-400">|</span>
              <a href="/privacy-policy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
              <span className="text-blue-400">|</span>
              <a href="/data-processing-agreement" className="text-blue-600 hover:underline">
                Data Processing Agreement
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}