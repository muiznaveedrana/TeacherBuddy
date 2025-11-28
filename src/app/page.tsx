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
import { getTranslations, getLocale } from 'next-intl/server';
import { RegionSelector } from "@/components/RegionSelector";

export const metadata: Metadata = {
  title: "Free Math Printables UK | Reception to Year 6 Printables",
  description: "Download 1000+ free math printables for UK primary schools (Reception to Year 6). KS1 & KS2 printables aligned with UK National Curriculum. Library always free.",
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
    title: "Free Math Printables UK | Reception to Year 6 Printables",
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

export default async function LandingPage() {
  const t = await getTranslations('homepage');
  const tNav = await getTranslations('nav');
  const tRegion = await getTranslations('region');

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
                    {tNav('printables')}
                  </a>
                  <a href="#grades" className="text-gray-600 hover:text-blue-700 px-3 py-2 text-sm font-medium transition-colors">
                    {tNav('yearGroups')}
                  </a>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Region Selector */}
              <RegionSelector variant="inline" className="hidden sm:flex" />
              <div className="md:hidden">
                <button className="text-gray-600 hover:text-gray-900">
                  <Menu className="h-6 w-6" />
                </button>
              </div>
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
            <span className="block text-gray-900">{t('hero.title')}</span>
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent handwritten">
              {t('hero.subtitle')}
            </span>
          </h1>

          {/* Simplified Description */}
          <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-8">
            {t('hero.description')}
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
                {t('hero.browseCta')}
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
                  {t('hero.createCta')}
                </Button>
              </Link>
              <span className="text-sm text-gray-600">{t('hero.aiPowered')}</span>
            </div>
          </div>

          {/* Free Badge */}
          <div className="mt-8 flex flex-col gap-3 items-center">
            {/* Row 1: Access-related badges */}
            <div className="flex justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700 font-medium">{t('badges.free')}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700 font-medium">{t('badges.noSignup')}</span>
              </div>
            </div>

            {/* Row 2: Feature-related badges */}
            <div className="flex justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
                <Check className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700 font-medium">{t('badges.interactive')}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
                <Check className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700 font-medium">{t('badges.customise')}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
                <Check className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700 font-medium">{t('badges.instantDownload')}</span>
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
              {t('customisation.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('customisation.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Library Printables Customization */}
            <div className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 text-6xl opacity-10">📚</div>
              <h3 className="text-2xl font-bold text-purple-700 mb-4">
                {t('customisation.library.title')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('customisation.library.description')}
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">
                    <strong>{t('customisation.library.editText')}</strong> {t('customisation.library.editTextDesc')}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">
                    <strong>{t('customisation.library.replaceImages')}</strong> {t('customisation.library.replaceImagesDesc')}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">
                    <strong>{t('customisation.library.addElements')}</strong> {t('customisation.library.addElementsDesc')}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">
                    <strong>{t('customisation.library.resize')}</strong> {t('customisation.library.resizeDesc')}
                  </span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/library">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    {t('customisation.library.cta')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* AI-Generated Printables */}
            <div className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 text-6xl opacity-10">✨</div>
              <h3 className="text-2xl font-bold text-pink-700 mb-4">
                {t('customisation.ai.title')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('customisation.ai.description')}
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">
                    <strong>{t('customisation.ai.generation')}</strong> {t('customisation.ai.generationDesc')}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">
                    <strong>{t('customisation.ai.fullEditing')}</strong> {t('customisation.ai.fullEditingDesc')}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">
                    <strong>{t('customisation.ai.studentNames')}</strong> {t('customisation.ai.studentNamesDesc')}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">
                    <strong>{t('customisation.ai.saveDownload')}</strong> {t('customisation.ai.saveDownloadDesc')}
                  </span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/create">
                  <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                    {t('customisation.ai.cta')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-100 rounded-full">
              <span className="text-yellow-800 font-semibold">
                {t('customisation.proTip')}
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
              {t('features.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-300">
              <CardHeader>
                <div className="mx-auto p-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full">
                  <span className="text-3xl">🎮</span>
                </div>
                <CardTitle className="mt-4 text-xl">{t('features.interactiveMode.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {t('features.interactiveMode.description')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-green-300">
              <CardHeader>
                <div className="mx-auto p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full">
                  <Zap className="w-10 h-10 text-green-600" />
                </div>
                <CardTitle className="mt-4 text-xl">{t('features.alwaysFree.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {t('features.alwaysFree.description')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-300">
              <CardHeader>
                <div className="mx-auto p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full">
                  <BookOpen className="w-10 h-10 text-purple-600" />
                </div>
                <CardTitle className="mt-4 text-xl">{t('features.curriculum.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {t('features.curriculum.description')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-300">
              <CardHeader>
                <div className="mx-auto p-4 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full">
                  <Clock className="w-10 h-10 text-orange-600" />
                </div>
                <CardTitle className="mt-4 text-xl">{t('features.saveTime.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {t('features.saveTime.description')}
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
            {t('cta.title')}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/library">
              <StickyNoteButton
                size="lg"
                variant="yellow"
                rotation={-3}
                className="font-bold text-lg shadow-xl"
              >
                {t('cta.browseLibrary')}
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
                {t('cta.createCustom')}
              </StickyNoteButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">{tNav('resources')}</h3>
              <ul className="space-y-2">
                <li><Link href="/library" className="text-gray-300 hover:text-white">{tNav('browseLibrary')}</Link></li>
                <li><Link href="/create" className="text-gray-300 hover:text-white">{tNav('createPrintable')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('footer.yearGroups.title')}</h3>
              <ul className="space-y-2">
                <li><Link href="/library?year_group=Reception" className="text-gray-300 hover:text-white">{t('footer.yearGroups.reception')}</Link></li>
                <li><Link href="/library?year_group=Year%201" className="text-gray-300 hover:text-white">{t('footer.yearGroups.year1to3')}</Link></li>
                <li><Link href="/library?year_group=Year%204" className="text-gray-300 hover:text-white">{t('footer.yearGroups.year4to6')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{tNav('support')}</h3>
              <ul className="space-y-2">
                <li><a href="mailto:support@freemathprintable.com" className="text-gray-300 hover:text-white">{tNav('contactUs')}</a></li>
                <li><Link href="/#how-it-works" className="text-gray-300 hover:text-white">{tNav('howItWorks')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{tNav('legal')}</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-300 hover:text-white">{tNav('privacyPolicy')}</Link></li>
                <li><Link href="/terms" className="text-gray-300 hover:text-white">{tNav('termsOfService')}</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}