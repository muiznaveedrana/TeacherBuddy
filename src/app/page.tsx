import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Clock, Zap, BookOpen, Star, ArrowRight, Menu } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { HomepageStructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Free Math Printables UK | Reception to Year 6 Worksheets",
  description: "Download 1000+ free math printables for UK primary schools (Reception to Year 6). KS1 & KS2 worksheets aligned with UK National Curriculum. Library always free.",
  keywords: [
    "free math printables",
    "free maths worksheets uk",
    "printable worksheets UK",
    "primary school printables",
    "maths printables free",
    "KS1 printables",
    "KS2 printables",
    "reception worksheets",
    "year 1 worksheets",
    "year 2 worksheets",
    "year 3 worksheets",
    "year 4 worksheets",
    "year 5 worksheets",
    "year 6 worksheets",
    "free printables",
    "UK curriculum printables",
    "math worksheets free download",
    "primary maths resources"
  ],
  openGraph: {
    title: "Free Math Printables UK | Reception to Year 6 Worksheets",
    description: "1000+ free math printables. Reception to Year 6. KS1 & KS2. UK curriculum aligned. Library always free.",
    url: "https://freemathprintable.com",
    siteName: "FreeMathPrintable.com",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Math Printables UK | Reception to Year 6",
    description: "Download 1000+ free math printables for primary schools. KS1 & KS2. UK curriculum aligned.",
  },
  alternates: {
    canonical: "https://freemathprintable.com",
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* SEO: Structured Data (Schema Markup) */}
      <HomepageStructuredData />
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-700">FreeMathPrintable.com</h1>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="#features" className="text-gray-600 hover:text-blue-700 px-3 py-2 text-sm font-medium transition-colors">
                    Features
                  </a>
                  <a href="#how-it-works" className="text-gray-600 hover:text-blue-700 px-3 py-2 text-sm font-medium transition-colors">
                    How it Works
                  </a>
                  <Link href="/library" className="text-gray-600 hover:text-blue-700 px-3 py-2 text-sm font-medium transition-colors">
                    Library
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-3">
                <Link href="/library">
                  <Button size="sm" variant="outline" className="border-blue-700 text-blue-700 hover:bg-blue-50">
                    Browse Library
                  </Button>
                </Link>
                <Link href="/create">
                  <Button size="sm" className="bg-blue-700 hover:bg-blue-800">
                    Start Creating
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:hidden">
              <button className="text-gray-600 hover:text-gray-900">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - SEO Optimized */}
      <section className="relative px-4 py-12 mx-auto max-w-7xl md:py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl xl:text-6xl leading-tight">
            <span className="block">Thousands of Free Math Printables</span>
            <span className="block text-blue-700 mt-2">Reception to Year 6 • UK Curriculum</span>
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-lg md:text-xl text-gray-600 leading-relaxed px-4">
            Browse and download free printable math resources for Reception to Year 6.
            Thousands of curriculum-aligned printables ready to download. Library always free.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 md:mt-10 px-4">
            <Link href="/library">
              <Button size="touch" className="w-full min-w-[280px] md:w-auto text-lg px-8 py-6 bg-blue-700 hover:bg-blue-800 touch-manipulation">
                Browse Free Printables
                <BookOpen className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/create">
              <Button size="touch" variant="outline" className="w-full min-w-[280px] md:w-auto text-lg px-8 py-6 border-2 border-blue-700 text-blue-700 hover:bg-blue-50 touch-manipulation">
                Create Custom Printable
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* SEO-Rich Free Badge */}
          <div className="mt-8 flex justify-center">
            <div className="bg-green-100 border-2 border-green-600 rounded-full px-6 py-3">
              <p className="text-green-900 font-bold text-lg">✓ All Printables Free • No Sign-Up Required • Download Instantly</p>
            </div>
          </div>

          {/* Demo Section - Mobile Optimized */}
          <div className="mt-16 md:mt-20 text-center px-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8">See FreeMathPrintable in Action</h2>
            <div className="max-w-4xl mx-auto">
              <div className="relative rounded-lg overflow-hidden shadow-2xl bg-gray-900">
                <div className="aspect-video">
                  <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-800 to-gray-900">
                    <div className="text-center text-white p-4">
                      <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 bg-cyan-600 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                      <p className="text-base md:text-lg font-medium mb-2">Demo Video</p>
                      <p className="text-gray-400 text-sm md:text-base">Watch how teachers create printables in seconds</p>
                      <button className="mt-4 px-6 py-3 md:px-6 md:py-2 bg-cyan-600 hover:bg-cyan-700 rounded-full text-sm md:text-sm font-medium transition-colors touch-manipulation min-h-[44px] md:min-h-auto">
                        Play Demo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-600 text-sm md:text-base">2 minute overview • See real printable generation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - SEO Optimized */}
      <section id="features" className="py-16 md:py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl lg:text-4xl">
              Free Math Printables - UK National Curriculum
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-lg md:text-xl text-gray-600 px-4">
              Thousands of free printables for Reception, Year 1, Year 2, Year 3, Year 4, Year 5, and Year 6
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-12 md:mt-16 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="flex justify-center">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Zap className="w-8 h-8 text-blue-700" />
                  </div>
                </div>
                <CardTitle className="mt-6 text-xl">100% Free Forever</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-600 leading-relaxed">
                  Our printable library is completely free to browse and download. No hidden costs,
                  no sign-up required. Print as many math resources as you need for your classroom.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="flex justify-center">
                  <div className="p-3 bg-cyan-100 rounded-full">
                    <BookOpen className="w-8 h-8 text-cyan-600" />
                  </div>
                </div>
                <CardTitle className="mt-6 text-xl">Curriculum Aligned</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-600 leading-relaxed">
                  Every printable perfectly aligned with UK National Curriculum standards for Reception through Year 6.
                  No more second-guessing content appropriateness.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="flex justify-center">
                  <div className="p-3 bg-emerald-100 rounded-full">
                    <Clock className="w-8 h-8 text-emerald-600" />
                  </div>
                </div>
                <CardTitle className="mt-6 text-xl">Save Hours Weekly</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-600 leading-relaxed">
                  Reclaim your evenings and weekends. What used to take hours now takes seconds. 
                  More time for what matters most - teaching and family.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Hidden until real testimonials available */}
      <section id="testimonials" className="py-20 bg-gray-50" style={{ display: 'none' }}>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 sm:text-4xl mb-16">
            Trusted by UK Primary Teachers
          </h2>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <CardTitle className="text-lg">Sarah Thompson</CardTitle>
                <CardDescription>Year 3 Teacher, Manchester</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  &ldquo;This has revolutionized my planning time. I can create personalized maths printables
                  for my class in minutes instead of spending my entire Sunday afternoon.&rdquo;
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <CardTitle className="text-lg">James Mitchell</CardTitle>
                <CardDescription>Year 5 Teacher, Birmingham</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  &ldquo;The student name personalization is brilliant! My class loves seeing their names 
                  in the problems, and it keeps them so much more engaged.&rdquo;
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <CardTitle className="text-lg">Emma Roberts</CardTitle>
                <CardDescription>Reception Teacher, London</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  &ldquo;Perfect for differentiation. I can quickly create printables at different difficulty
                  levels for my mixed-ability class. Absolute game-changer!&rdquo;
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Social Proof */}
          <div className="mt-16 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="text-3xl font-bold text-blue-700 mb-2">2,500+</div>
                <div className="text-gray-600">UK Teachers</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="text-3xl font-bold text-cyan-600 mb-2">87,526</div>
                <div className="text-gray-600">Minutes Saved</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="text-3xl font-bold text-emerald-600 mb-2">15,000+</div>
                <div className="text-gray-600">Printables Created</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="max-w-3xl mx-auto mt-4 text-xl text-gray-600">
              Two easy ways to get your perfect printable
            </p>
          </div>

          {/* Option 1: Browse Library */}
          <div className="mt-12 p-8 bg-blue-50 rounded-xl border-2 border-blue-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-2">📚 Option 1: Browse Our Free Library</h3>
              <p className="text-blue-700">Instant access to thousands of ready-made printables</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                    <span className="text-sm font-bold text-blue-700">1</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Browse & Download</h4>
                </div>
                <p className="text-gray-600 text-sm">Find the perfect printable from our library and download it instantly - no sign-up required!</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                    <span className="text-sm font-bold text-blue-700">2</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Customize If Needed</h4>
                </div>
                <p className="text-gray-600 text-sm">Want to personalize it? Click "Generate Similar" to edit and customize with your student names!</p>
              </div>
            </div>
          </div>

          {/* Option 2: Create Custom */}
          <div className="mt-8 p-8 bg-green-50 rounded-xl border-2 border-green-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-green-900 mb-2">✨ Option 2: Create Custom Printables</h3>
              <p className="text-green-700">Build exactly what you need from scratch</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full mb-4">
                  <span className="text-xl font-bold text-green-700">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Choose Topic</h4>
                <p className="text-gray-600 text-sm">Select from UK curriculum topics and difficulty level</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full mb-4">
                  <span className="text-xl font-bold text-green-700">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Generate & Edit</h4>
                <p className="text-gray-600 text-sm">AI creates your printable - then edit, customize, and perfect it!</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full mb-4">
                  <span className="text-xl font-bold text-green-700">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Download & Print</h4>
                <p className="text-gray-600 text-sm">Get your perfectly formatted, ready-to-print math resource</p>
              </div>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="mt-8 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="text-2xl">💡</span>
              </div>
              <div className="ml-3">
                <h4 className="text-lg font-semibold text-yellow-900">Pro Tip: Edit Any Printable!</h4>
                <p className="text-yellow-800 mt-1">Every printable can be customized - whether from our library or freshly generated. Use the Edit Mode to add your class names, adjust questions, or tweak the layout to perfection!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Hidden for now */}
      <section id="pricing" className="py-20 bg-gray-50" style={{ display: 'none' }}>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-xl text-gray-600">
              Choose the plan that works best for your teaching needs
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-3">
            {/* Free Plan */}
            <Card className="relative">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Free</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">£0</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <CardDescription className="mt-2">Perfect for trying out the platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>30 printables per month</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>All curriculum topics</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Student name personalization</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                  <span className="w-5 h-5">•</span>
                  <span>Includes advertisements</span>
                </div>
                <Link href="/create">
                  <Button className="w-full mt-8" variant="outline">Get Started Free</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="relative border-blue-700 border-2 scale-105 shadow-xl">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  ⭐ Most Popular
                </span>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Pro</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">£2.99</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <CardDescription className="mt-2">Ideal for regular classroom use</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>90 printables per month</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>All curriculum topics</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Student name personalization</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Ad-free experience</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Priority support</span>
                </div>
                <Link href="/create">
                  <Button className="w-full mt-8 bg-blue-700 hover:bg-blue-800">Start Pro Trial</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Pro Plus Plan */}
            <Card className="relative">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Pro Plus</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">£4.99</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <CardDescription className="mt-2">For heavy users and departments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>150 printables per month</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>All curriculum topics</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Student name personalization</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Ad-free experience</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Priority support</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Bulk printable generation</span>
                </div>
                <Link href="/create">
                  <Button className="w-full mt-8" variant="outline">Upgrade to Pro Plus</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/#features" className="text-gray-300 hover:text-white">Features</Link></li>
                <li><Link href="/library" className="text-gray-300 hover:text-white">Browse Library</Link></li>
                <li><Link href="/create" className="text-gray-300 hover:text-white">Create Printables</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/#how-it-works" className="text-gray-300 hover:text-white">How it Works</Link></li>
                <li><a href="mailto:support@freemathprintable.com" className="text-gray-300 hover:text-white">Help & Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-300 hover:text-white">Terms of Service</Link></li>
                <li><a href="mailto:support@freemathprintable.com" className="text-gray-300 hover:text-white">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">
              © 2024 FreeMathPrintable.com. All rights reserved. Free math printables for UK primary schools.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Keywords: free math printables, printable worksheets UK, primary school printables, maths worksheets free, KS1 printables, KS2 printables
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}