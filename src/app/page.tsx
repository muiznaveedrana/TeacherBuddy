import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Clock, Zap, BookOpen, Star, ArrowRight, Menu, Download, Users } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { HomepageStructuredData } from "@/components/StructuredData";
import WorksheetShowcase from "@/components/homepage/WorksheetShowcase";
import GradeNavigation from "@/components/homepage/GradeNavigation";
import DoodleAnimations from "@/components/homepage/DoodleAnimations";
import { StickyNoteButton } from "@/components/ui/sticky-note-button";

export const metadata: Metadata = {
  title: "Free Math Worksheets | Kindergarten to Grade 6 | Printable PDF",
  description: "Download 1000+ free printable math worksheets for Kindergarten through Grade 6. Common Core aligned. No signup required. Print instantly. Ages 4-11.",
  keywords: [
    // US Primary Keywords (highest priority)
    "free math worksheets",
    "free printable math worksheets",
    "kindergarten math worksheets",
    "first grade math worksheets",
    "second grade math worksheets",
    "third grade math worksheets",
    "grade 1 math worksheets free",
    "grade 2 math worksheets free",
    "elementary math worksheets",
    "printable math worksheets pdf",
    "math worksheets for kids",
    "free worksheets for kindergarten",
    // UK Secondary Keywords
    "reception maths worksheets",
    "year 1 maths worksheets",
    "year 2 maths worksheets",
    "free maths worksheets uk",
    "ks1 maths worksheets",
    "eyfs maths resources",
    "primary maths printables",
    // Long-tail Keywords
    "counting worksheets kindergarten free",
    "addition worksheets first grade",
    "number recognition worksheets",
    "math practice sheets free download"
  ],
  openGraph: {
    title: "Free Math Worksheets | Kindergarten to Grade 6 | Printable PDF",
    description: "1000+ free printable math worksheets for K-6. Common Core & UK Curriculum aligned. No signup. Print instantly!",
    url: "https://freemathprintable.com",
    siteName: "FreeMathPrintable.com",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Math Worksheets | Kindergarten to Grade 6",
    description: "Download 1000+ free printable math worksheets. K-6. Common Core aligned. No signup required!",
  },
  alternates: {
    canonical: "https://freemathprintable.com",
    languages: {
      'en-US': 'https://freemathprintable.com',
      'en-GB': 'https://freemathprintable.com',
    },
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-cyan-50/30">
      {/* Background Doodle Animations */}
      <DoodleAnimations />

      {/* SEO: Structured Data (Schema Markup) */}
      <HomepageStructuredData />

      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  FreeMathPrintable.com
                </h1>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="#printables" className="text-gray-600 hover:text-blue-700 px-3 py-2 text-sm font-medium transition-colors">
                    Printables
                  </a>
                  <a href="#grades" className="text-gray-600 hover:text-blue-700 px-3 py-2 text-sm font-medium transition-colors">
                    Year Groups
                  </a>
                </div>
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

      {/* Simplified Hero Section */}
      <section className="relative px-4 py-12 mx-auto max-w-7xl md:py-16">
        {/* Background Doodles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
          <div className="absolute top-10 left-10 text-6xl rotate-12">📐</div>
          <div className="absolute top-20 right-20 text-8xl -rotate-6">✏️</div>
          <div className="absolute bottom-10 left-1/4 text-7xl rotate-45">📏</div>
          <div className="absolute bottom-20 right-1/3 text-5xl -rotate-12">🔢</div>
        </div>

        <div className="relative text-center">
          {/* Main Headline with Handwritten Style */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-6">
            <span className="block text-gray-900">Free Math Worksheet Library</span>
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent handwritten">
              Interactive & Editable, Print-Ready PDFs
            </span>
          </h1>

          {/* Simplified Description - US First */}
          <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-8">
            1000+ free worksheets • Kindergarten to Grade 6 • Common Core Aligned
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 justify-center items-center">
            {/* Primary CTA: Browse Library */}
            <Link href="/library">
              <Button
                size="touch"
                className="text-xl px-10 py-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105"
              >
                <BookOpen className="mr-3 h-6 w-6" />
                Browse Free Library
              </Button>
            </Link>

            {/* Secondary CTA: Generate Printable */}
            <div className="flex flex-col items-center gap-2">
              <Link href="/create">
                <Button
                  size="touch"
                  variant="outline"
                  className="text-lg px-8 py-6 border-2 border-purple-600 text-purple-700 hover:bg-purple-50 font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Generate Printable
                </Button>
              </Link>
              <span className="text-sm text-gray-600">🎨 AI-powered • Ready in 20-30 seconds</span>
            </div>
          </div>

          {/* Free Badge */}
          <div className="mt-8 flex flex-col gap-3 items-center">
            {/* Row 1: Access-related badges */}
            <div className="flex justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700 font-medium">100% Free</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700 font-medium">No Sign-up</span>
              </div>
            </div>

            {/* Row 2: Feature-related badges */}
            <div className="flex justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
                <Check className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700 font-medium">Interactive Mode</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
                <Check className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700 font-medium">Customize & Download</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
                <Check className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700 font-medium">Instant Download</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Printable Showcase */}
      <div id="printables">
        <WorksheetShowcase />
      </div>

      {/* Grade Navigation - Moved before Customization */}
      <div id="grades">
        <GradeNavigation />
      </div>

      {/* Customization Feature Section - Moved after Grade Navigation */}
      <section className="py-10 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Make Every Printable Your Own
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Don't just download - customize! Every printable can be personalized before you print.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Library Printables Customization */}
            <div className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 text-6xl opacity-10">📚</div>
              <h3 className="text-2xl font-bold text-purple-700 mb-4">
                Customize Library Printables
              </h3>
              <p className="text-gray-600 mb-6">
                Found the perfect printable in our library? Make it uniquely yours before downloading:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">
                    <strong>Edit Text:</strong> Change names, numbers, and instructions to match your lesson
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">
                    <strong>Replace Images:</strong> Swap out pictures to match your students' interests
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">
                    <strong>Add Elements:</strong> Insert additional text, images, or problems
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">
                    <strong>Resize & Rearrange:</strong> Adjust image sizes and layout to fit your needs
                  </span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/library">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Browse & Customize
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* AI-Generated Printables */}
            <div className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 text-6xl opacity-10">✨</div>
              <h3 className="text-2xl font-bold text-pink-700 mb-4">
                Create & Edit with AI
              </h3>
              <p className="text-gray-600 mb-6">
                Generate a brand new printable with AI, then perfect it with our editor:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">
                    <strong>AI Generation:</strong> Create printables tailored to your exact requirements
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">
                    <strong>Full Editing:</strong> Modify any part of the AI-generated content
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">
                    <strong>Student Names:</strong> Personalize with your students' names for engagement
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">
                    <strong>Save & Download:</strong> Export as PDF when you're happy with the result
                  </span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/create">
                  <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                    Create with AI
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-100 rounded-full">
              <span className="text-yellow-800 font-semibold">
                💡 Pro Tip: Every printable is fully editable - no locked content!
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Simplified */}
      <section className="py-10 md:py-12 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Teachers Love FreeMathPrintable
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-300">
              <CardHeader>
                <div className="mx-auto p-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full">
                  <span className="text-3xl">🎮</span>
                </div>
                <CardTitle className="mt-4 text-xl">Interactive Mode</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Every printable works online with feedback and celebration upon completion!
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-green-300">
              <CardHeader>
                <div className="mx-auto p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full">
                  <Zap className="w-10 h-10 text-green-600" />
                </div>
                <CardTitle className="mt-4 text-xl">Always Free</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  No hidden costs, no premium tiers. Every feature is 100% free forever.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-300">
              <CardHeader>
                <div className="mx-auto p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full">
                  <BookOpen className="w-10 h-10 text-purple-600" />
                </div>
                <CardTitle className="mt-4 text-xl">Standards Aligned</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Every worksheet aligned with Common Core and UK Curriculum.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-300">
              <CardHeader>
                <div className="mx-auto p-4 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full">
                  <Clock className="w-10 h-10 text-orange-600" />
                </div>
                <CardTitle className="mt-4 text-xl">Save Time</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Find perfect resources in seconds, not hours. More time for teaching!
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Simple CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="px-4 mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Save Time on Lesson Planning?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of teachers using our free resources every day
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/library">
              <StickyNoteButton
                size="lg"
                variant="yellow"
                rotation={-3}
                className="font-bold text-lg shadow-xl"
              >
                Browse Free Library
                <ArrowRight className="ml-2 h-5 w-5 inline" />
              </StickyNoteButton>
            </Link>
            <Link href="/create">
              <StickyNoteButton
                size="lg"
                variant="pink"
                rotation={2}
                className="font-bold text-lg shadow-xl"
              >
                Create Custom Printable
              </StickyNoteButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - SEO Optimized */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
            {/* Grade Levels - US First */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Grade Levels</h3>
              <ul className="space-y-2">
                <li><Link href="/free-printables/reception" className="text-gray-300 hover:text-white">Kindergarten</Link></li>
                <li><Link href="/free-printables/year-1" className="text-gray-300 hover:text-white">Grade 1</Link></li>
                <li><Link href="/free-printables/year-2" className="text-gray-300 hover:text-white">Grade 2</Link></li>
                <li><Link href="/free-printables/year-3" className="text-gray-300 hover:text-white">Grade 3</Link></li>
              </ul>
            </div>
            {/* Popular Topics */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Popular Topics</h3>
              <ul className="space-y-2">
                <li><Link href="/free-printables/reception/number-counting" className="text-gray-300 hover:text-white">Counting</Link></li>
                <li><Link href="/free-printables/year-1/addition-subtraction" className="text-gray-300 hover:text-white">Addition</Link></li>
                <li><Link href="/free-printables/reception/shape-space" className="text-gray-300 hover:text-white">Shapes</Link></li>
                <li><Link href="/free-printables/year-2/multiplication-division" className="text-gray-300 hover:text-white">Multiplication</Link></li>
              </ul>
            </div>
            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/library" className="text-gray-300 hover:text-white">Browse Library</Link></li>
                <li><Link href="/free-printables" className="text-gray-300 hover:text-white">All Worksheets</Link></li>
                <li><Link href="/create" className="text-gray-300 hover:text-white">Create Custom</Link></li>
              </ul>
            </div>
            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="mailto:support@freemathprintable.com" className="text-gray-300 hover:text-white">Contact Us</a></li>
                <li><Link href="/#how-it-works" className="text-gray-300 hover:text-white">How it Works</Link></li>
              </ul>
            </div>
            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-300 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          {/* SEO: Additional keyword-rich links */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <p className="text-sm text-gray-500 mb-3">Free Math Worksheets:</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              <Link href="/free-printables/reception/number-counting/counting-to-10" className="text-gray-400 hover:text-white">Counting to 10</Link>
              <Link href="/free-printables/reception/number-counting/number-recognition" className="text-gray-400 hover:text-white">Number Recognition</Link>
              <Link href="/free-printables/year-1/addition-subtraction/addition-to-10" className="text-gray-400 hover:text-white">Addition to 10</Link>
              <Link href="/free-printables/reception/shape-space/basic-shapes" className="text-gray-400 hover:text-white">Basic Shapes</Link>
              <Link href="/free-printables/year-1/number-place-value/number-bonds" className="text-gray-400 hover:text-white">Number Bonds</Link>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-800 text-center">
            <p className="text-gray-400">
              © 2024 FreeMathPrintable.com. Free printable math worksheets for Kindergarten through Grade 6.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}