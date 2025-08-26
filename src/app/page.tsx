import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton'
import { Star, BookOpen, Clock, Sparkles, Users, Award, CheckCircle } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Create Amazing Worksheets with{' '}
            <span className="text-blue-600">AI Magic</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your teaching with AI-powered worksheet generation. 
            Create curriculum-aligned, engaging worksheets in seconds - perfectly tailored for UK students.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <GoogleSignInButton 
              size="lg" 
              className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white border-0"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Start Creating Now
            </GoogleSignInButton>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-blue-600 text-blue-600 hover:bg-blue-50">
              <BookOpen className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Free to start
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              UK Curriculum aligned
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Instant generation
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Teachers Love WorksheetGenerator.AI
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the features that make worksheet creation effortless and fun
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-xl text-gray-900">Save Hours Every Week</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Generate complete worksheets in under 30 seconds. No more late nights 
                  preparing materials - spend time with family instead!
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-xl text-gray-900">UK Curriculum Perfect</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Every worksheet aligns with Key Stage requirements. Age-appropriate 
                  content that meets national curriculum standards automatically.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Sparkles className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-xl text-gray-900">Engaging & Fun</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Child-friendly design and engaging activities that keep students 
                  motivated. Make learning enjoyable with our AI-crafted content.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Loved by Teachers Across the UK
            </h2>
            <div className="flex justify-center items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-lg font-semibold text-gray-700">4.9/5 from 2,847 teachers</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  &ldquo;Absolutely brilliant! I&apos;ve saved 5+ hours per week since using this. 
                  The worksheets are perfectly pitched for my Year 3 class.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Sarah Thompson</p>
                    <p className="text-sm text-gray-600">Primary Teacher, Manchester</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  &ldquo;Game changer for my maths lessons! The AI creates exactly what I need 
                  for different ability groups. My students love the engaging activities.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Award className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">James Wilson</p>
                    <p className="text-sm text-gray-600">Secondary Maths, Birmingham</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg md:col-span-2 lg:col-span-1">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  &ldquo;As a new teacher, this has been a lifesaver. Professional-quality 
                  worksheets that help me feel confident in my lesson planning.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Emma Clarke</p>
                    <p className="text-sm text-gray-600">NQT, Leeds</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Teaching?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of UK teachers who&apos;ve already discovered the magic of AI-powered worksheet generation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GoogleSignInButton 
                size="lg" 
                className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-100 border-0"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Start Creating Now - It&apos;s Free!
              </GoogleSignInButton>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-white text-white hover:bg-white/10">
                <BookOpen className="mr-2 h-5 w-5" />
                Watch How It Works
              </Button>
            </div>

            <p className="text-blue-100 mt-6 text-sm">
              No credit card required • Start with 5 free worksheets • Upgrade anytime
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}