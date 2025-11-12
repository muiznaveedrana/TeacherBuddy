'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Heart, 
  Mail, 
  MessageCircle, 
  ExternalLink,
  Shield,
  FileText,
  Book
} from 'lucide-react'

interface FooterProps {
  version?: string
  className?: string
  onLinkClick?: (url: string) => void | Promise<void>
}

export function Footer({ version = "v1.0.0", className = "", onLinkClick }: FooterProps) {
  const handleLinkClick = (url: string) => {
    if (onLinkClick) {
      onLinkClick(url)
    } else {
      // Fallback for development/mock mode
      console.log(`Opening link: ${url}`)
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className={`bg-white border-t border-slate-200 mt-auto ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">F</span>
              </div>
              <span className="font-semibold text-slate-900">FreeMathPrintable.com</span>
            </div>
            <p className="text-sm text-slate-600">
              Free math printables for UK primary schools. Library always free.
            </p>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                {version}
              </Badge>
              <span className="text-xs text-slate-500">
                Made with <Heart className="h-3 w-3 inline text-red-500" /> for teachers
              </span>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900">Support</h3>
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-slate-600 hover:text-slate-900 justify-start"
                onClick={() => handleLinkClick('/help')}
              >
                <Book className="h-4 w-4 mr-2" />
                Help Centre
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-slate-600 hover:text-slate-900 justify-start"
                onClick={() => handleLinkClick('/contact')}
              >
                <Mail className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-slate-600 hover:text-slate-900 justify-start"
                onClick={() => handleLinkClick('/feedback')}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Send Feedback
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-slate-600 hover:text-slate-900 justify-start"
                onClick={() => handleLinkClick('https://status.worksheetgenerator.ai')}
              >
                System Status
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900">Legal</h3>
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-slate-600 hover:text-slate-900 justify-start"
                onClick={() => handleLinkClick('/privacy')}
              >
                <Shield className="h-4 w-4 mr-2" />
                Privacy Policy
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-slate-600 hover:text-slate-900 justify-start"
                onClick={() => handleLinkClick('/terms')}
              >
                <FileText className="h-4 w-4 mr-2" />
                Terms of Service
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-slate-600 hover:text-slate-900 justify-start"
                onClick={() => handleLinkClick('/gdpr')}
              >
                GDPR Compliance
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-slate-600 hover:text-slate-900 justify-start"
                onClick={() => handleLinkClick('/accessibility')}
              >
                Accessibility
              </Button>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900">Resources</h3>
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-slate-600 hover:text-slate-900 justify-start"
                onClick={() => handleLinkClick('/curriculum-guide')}
              >
                UK Curriculum Guide
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-slate-600 hover:text-slate-900 justify-start"
                onClick={() => handleLinkClick('/teaching-tips')}
              >
                Teaching Tips
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-slate-600 hover:text-slate-900 justify-start"
                onClick={() => handleLinkClick('/api-docs')}
              >
                API Documentation
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-slate-600 hover:text-slate-900 justify-start"
                onClick={() => handleLinkClick('/community')}
              >
                Teacher Community
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-slate-500">
              © {currentYear} FreeMathPrintable.com. All rights reserved. Free math printables for UK primary schools.
            </div>
            <div className="flex items-center space-x-4 text-sm text-slate-500">
              <span>Designed for UK Primary Education</span>
              <Badge variant="outline" className="text-xs">
                🇬🇧 UK Compliant
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}