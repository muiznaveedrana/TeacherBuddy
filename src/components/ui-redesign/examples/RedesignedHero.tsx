'use client'

/**
 * Redesigned Hero Section Example
 * ================================
 * This component demonstrates the new UI design patterns for the homepage hero.
 *
 * Key improvements:
 * - Warmer color palette (cream background)
 * - Better visual hierarchy
 * - Trust badges with proper styling
 * - Illustration placeholder
 * - Improved CTA button styling
 */

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { BookOpen, Sparkles, ArrowRight, Play } from 'lucide-react'
import { HeroTrustBadges } from '../TrustBadge'

export function RedesignedHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FEFDFB] to-[#F0F4FF] min-h-[80vh] flex items-center">
      {/* Background Pattern - Subtle grid/paper texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, #3B82F6 1px, transparent 1px),
            linear-gradient(#3B82F6 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Math symbols floating in background */}
        <div className="absolute top-20 left-[10%] text-6xl opacity-[0.06] rotate-12 select-none">
          ✏️
        </div>
        <div className="absolute top-40 right-[15%] text-7xl opacity-[0.05] -rotate-6 select-none">
          📐
        </div>
        <div className="absolute bottom-32 left-[20%] text-5xl opacity-[0.06] rotate-45 select-none">
          🔢
        </div>
        <div className="absolute bottom-20 right-[25%] text-6xl opacity-[0.05] -rotate-12 select-none">
          📏
        </div>
        {/* Gradient orbs */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              AI-Powered Worksheet Generator
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
                Create Perfect{' '}
                <span className="relative">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Math Worksheets
                  </span>
                  {/* Underline decoration */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-purple-300"
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,8 Q50,0 100,8 T200,8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <br />
                in Seconds
              </h1>

              <p className="text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
                Free, curriculum-aligned worksheets for Kindergarten through Grade 6.
                No signup required. Download instantly.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/library">
                <button className={cn(
                  'group flex items-center justify-center gap-2',
                  'px-8 py-4 rounded-xl',
                  'bg-gradient-to-r from-green-500 to-emerald-600',
                  'hover:from-green-600 hover:to-emerald-700',
                  'text-white font-bold text-lg',
                  'shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-300',
                  'transform transition-all duration-200 hover:scale-105 active:scale-95'
                )}>
                  <BookOpen className="w-5 h-5" />
                  Browse Free Library
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>

              <Link href="/create">
                <button className={cn(
                  'group flex items-center justify-center gap-2',
                  'px-8 py-4 rounded-xl',
                  'bg-white border-2 border-purple-200',
                  'hover:border-purple-400 hover:bg-purple-50',
                  'text-purple-700 font-bold text-lg',
                  'shadow-md hover:shadow-lg',
                  'transform transition-all duration-200 hover:scale-105 active:scale-95'
                )}>
                  <Sparkles className="w-5 h-5" />
                  Create Custom
                </button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-4">
              <HeroTrustBadges />
            </div>
          </div>

          {/* Right: Illustration / Demo */}
          <div className="relative hidden lg:block">
            {/* Worksheet Preview Card */}
            <div className="relative">
              {/* Main preview card */}
              <div className={cn(
                'relative z-10 bg-white rounded-2xl shadow-2xl overflow-hidden',
                'border border-gray-200',
                'transform rotate-2 hover:rotate-0 transition-transform duration-500'
              )}>
                {/* Worksheet Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm opacity-80">Year 2 • Addition</div>
                      <div className="text-xl font-bold">Adding Numbers to 20</div>
                    </div>
                    <div className="text-3xl">📝</div>
                  </div>
                </div>

                {/* Worksheet Content Preview */}
                <div className="p-6 space-y-4 bg-white">
                  {/* Question 1 */}
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <span className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full font-bold">
                      1
                    </span>
                    <div className="flex items-center gap-2 text-lg">
                      <span className="text-2xl">🍎🍎🍎</span>
                      <span className="font-medium">+</span>
                      <span className="text-2xl">🍎🍎</span>
                      <span className="font-medium">=</span>
                      <span className="w-12 h-10 border-2 border-dashed border-gray-300 rounded-lg" />
                    </div>
                  </div>

                  {/* Question 2 */}
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <span className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full font-bold">
                      2
                    </span>
                    <div className="flex items-center gap-2 text-lg">
                      <span className="text-2xl">⭐⭐⭐⭐</span>
                      <span className="font-medium">+</span>
                      <span className="text-2xl">⭐⭐⭐</span>
                      <span className="font-medium">=</span>
                      <span className="w-12 h-10 border-2 border-dashed border-gray-300 rounded-lg" />
                    </div>
                  </div>

                  {/* Question 3 */}
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <span className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full font-bold">
                      3
                    </span>
                    <div className="flex items-center gap-2 text-lg">
                      <span className="text-2xl">🌟🌟</span>
                      <span className="font-medium">+</span>
                      <span className="text-2xl">🌟🌟🌟🌟</span>
                      <span className="font-medium">=</span>
                      <span className="w-12 h-10 border-2 border-dashed border-gray-300 rounded-lg" />
                    </div>
                  </div>

                  {/* More questions indicator */}
                  <div className="text-center text-gray-400 text-sm">
                    + 7 more questions...
                  </div>
                </div>
              </div>

              {/* Background decorative cards */}
              <div className={cn(
                'absolute -z-10 top-4 left-4 w-full h-full',
                'bg-purple-100 rounded-2xl transform -rotate-3'
              )} />
              <div className={cn(
                'absolute -z-20 top-8 left-8 w-full h-full',
                'bg-blue-100 rounded-2xl transform -rotate-6'
              )} />
            </div>

            {/* Stats floating badges */}
            <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100">
              <div className="text-2xl font-bold text-green-600">1,000+</div>
              <div className="text-xs text-gray-500">Free Worksheets</div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100">
              <div className="text-2xl font-bold text-purple-600">5 sec</div>
              <div className="text-xs text-gray-500">Generation Time</div>
            </div>
          </div>
        </div>

        {/* Video CTA (optional) */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
            <span className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
              <Play className="w-5 h-5 ml-0.5" />
            </span>
            <span className="text-sm font-medium">See how it works</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default RedesignedHero
