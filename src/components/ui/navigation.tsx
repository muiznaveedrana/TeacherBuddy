'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Bell,
  ChevronDown,
  Menu,
  User,
  Settings,
  Users,
  BarChart3,
  CreditCard,
  LogOut,
  X,
} from 'lucide-react'

type SubscriptionTier = 'Free' | 'Pro' | 'Pro Plus'

interface User {
  name: string
  email: string
  avatar?: string
}

interface Usage {
  current: number
  limit: number
  tier: SubscriptionTier
}

interface NavigationProps {
  user?: User
  usage: Usage
  notifications?: number
  onNavigate?: (path: string) => void | Promise<void>
}

export function Navigation({ 
  user = { name: 'Sarah Johnson', email: 'sarah.johnson@school.edu.uk' },
  usage = { current: 15, limit: 30, tier: 'Free' },
  notifications = 2,
  onNavigate
}: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const usagePercentage = (usage.current / usage.limit) * 100
  const getUsageColor = () => {
    if (usagePercentage >= 90) return 'text-red-600'
    if (usagePercentage >= 75) return 'text-yellow-600'
    return 'text-green-600'
  }
  
  const getBadgeVariant = () => {
    switch (usage.tier) {
      case 'Pro Plus': return 'default'
      case 'Pro': return 'secondary'
      default: return 'outline'
    }
  }

  const handleNavigation = async (path: string) => {
    if (onNavigate) {
      setIsLoading(true)
      try {
        await onNavigate(path)
      } catch (error) {
        console.error('Navigation failed:', error)
      } finally {
        setIsLoading(false)
      }
    } else {
      // Fallback for development/mock mode
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 500))
      setIsLoading(false)
      console.log(`Navigating to: ${path}`)
    }
  }

  return (
    <TooltipProvider>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Branding */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">W</span>
                </div>
                <h1 className="text-xl font-bold text-slate-900 hidden sm:block">
                  WorksheetGenerator.AI
                </h1>
                <h1 className="text-xl font-bold text-slate-900 sm:hidden">
                  WG.AI
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Usage Counter with Progress */}
              <div className="flex items-center space-x-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="text-sm">
                      <div className="flex items-center space-x-2">
                        <span className={`font-semibold ${getUsageColor()}`}>
                          {usage.current}/{usage.limit}
                        </span>
                        <span className="text-slate-600">worksheets</span>
                      </div>
                      <Progress value={usagePercentage} className="h-1 w-24 mt-1" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Monthly usage: {usage.current} of {usage.limit} worksheets</p>
                    <p className="text-xs text-slate-500">Resets on 1st of each month</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Subscription Tier Badge */}
              <Badge variant={getBadgeVariant()}>
                {usage.tier}
              </Badge>

              {/* Notifications */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="relative"
                    onClick={() => handleNavigation('/notifications')}
                    aria-label={`Notifications (${notifications} new)`}
                  >
                    <Bell className="h-5 w-5" />
                    {notifications > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                      >
                        {notifications > 9 ? '9+' : notifications}
                      </Badge>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{notifications} new notifications</p>
                </TooltipContent>
              </Tooltip>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 px-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 hidden lg:block">
                      {user.name.split(' ')[0]}
                    </span>
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleNavigation('/profile')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigation('/name-lists')}>
                    <Users className="mr-2 h-4 w-4" />
                    Name Lists
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigation('/subscription')}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Subscription Management
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigation('/analytics')}>
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Usage Analytics
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => handleNavigation('/logout')}
                    className="text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-slate-200 py-4">
              <div className="space-y-4">
                {/* Mobile Usage Info */}
                <div className="px-4 py-2 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Usage this month</span>
                    <Badge variant={getBadgeVariant()}>{usage.tier}</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-semibold ${getUsageColor()}`}>
                      {usage.current}/{usage.limit}
                    </span>
                    <span className="text-sm text-slate-600">worksheets</span>
                  </div>
                  <Progress value={usagePercentage} className="h-1 mt-2" />
                </div>

                {/* Mobile Menu Items */}
                <div className="space-y-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => {
                      handleNavigation('/notifications')
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                    {notifications > 0 && (
                      <Badge variant="destructive" className="ml-auto">
                        {notifications}
                      </Badge>
                    )}
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => {
                      handleNavigation('/profile')
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Profile Settings
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => {
                      handleNavigation('/name-lists')
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Name Lists
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => {
                      handleNavigation('/subscription')
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Subscription Management
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => {
                      handleNavigation('/analytics')
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Usage Analytics
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-red-600 hover:text-red-600"
                    onClick={() => {
                      handleNavigation('/logout')
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse" />
        )}
      </header>
    </TooltipProvider>
  )
}