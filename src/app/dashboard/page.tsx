'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Navigation } from '@/components/ui/navigation'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Footer } from '@/components/ui/footer'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Download, Info, Loader2 } from 'lucide-react'
import WelcomeTour from '@/components/WelcomeTour'
import { PullToRefresh } from '@/components/mobile/PullToRefresh'

// Mock data for UK National Curriculum topics
const mockTopics = [
  { value: 'number-operations', label: 'Number and Operations' },
  { value: 'fractions-decimals', label: 'Fractions and Decimals' },
  { value: 'measurement', label: 'Measurement' },
  { value: 'geometry', label: 'Geometry and Shape' },
  { value: 'statistics-data', label: 'Statistics and Data' },
  { value: 'algebra-patterns', label: 'Algebra and Patterns' }
]

const mockSubtopics: Record<string, { value: string; label: string }[]> = {
  'number-operations': [
    { value: 'addition-subtraction', label: 'Addition and Subtraction' },
    { value: 'multiplication-division', label: 'Multiplication and Division' },
    { value: 'place-value', label: 'Place Value' },
    { value: 'mental-maths', label: 'Mental Mathematics' }
  ],
  'fractions-decimals': [
    { value: 'equivalent-fractions', label: 'Equivalent Fractions' },
    { value: 'adding-fractions', label: 'Adding Fractions' },
    { value: 'decimal-place-value', label: 'Decimal Place Value' },
    { value: 'fraction-decimal-conversion', label: 'Fraction to Decimal Conversion' }
  ]
  // Other subtopics would be added here
}

const mockNameLists = [
  { value: 'year3-class-a', label: 'Year 3 Class A (25 students)' },
  { value: 'year4-maths-group', label: 'Year 4 Maths Group (18 students)' },
  { value: 'reception-class', label: 'Reception Class (20 students)' }
]

type GenerationState = 'idle' | 'generating' | 'completed' | 'error'
type DifficultyLevel = 'easy' | 'average' | 'hard'

export default function DashboardPage() {
  const [showTour, setShowTour] = useState(true)
  
  // Configuration state
  const [topic, setTopic] = useState<string>('')
  const [subtopic, setSubtopic] = useState<string>('')
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('average')
  const [questionCount, setQuestionCount] = useState<number>(15)
  const [nameList, setNameList] = useState<string>('')
  
  // Generation state
  const [generationState, setGenerationState] = useState<GenerationState>('idle')
  const [progress, setProgress] = useState<number>(0)
  
  const hasConfiguration = topic && subtopic && nameList
  const canGenerate = hasConfiguration && generationState !== 'generating'
  const showPreview = generationState === 'completed'
  const showAds = generationState !== 'completed'
  
  const handleGenerate = async () => {
    if (!hasConfiguration) return
    
    setGenerationState('generating')
    setProgress(0)
    
    // Mock generation process (5-7 second simulation)
    const duration = 6000 + Math.random() * 1000 // 6-7 seconds
    const steps = 20
    const stepDuration = duration / steps
    
    for (let i = 0; i <= steps; i++) {
      await new Promise(resolve => setTimeout(resolve, stepDuration))
      setProgress((i / steps) * 100)
    }
    
    setGenerationState('completed')
  }
  
  const handleConfigurationChange = () => {
    if (generationState === 'completed') {
      setGenerationState('idle')
      setProgress(0)
    }
  }
  
  const handleRefresh = async () => {
    // Simulate refreshing page data
    await new Promise(resolve => setTimeout(resolve, 1000))
    // Reset state if needed
    console.log('Page refreshed')
  }
  
  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Enhanced Navigation */}
      <Navigation 
        user={{
          name: 'Sarah Johnson',
          email: 'sarah.johnson@school.edu.uk'
        }}
        usage={{
          current: 15,
          limit: 30,
          tier: 'Free'
        }}
        notifications={2}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-100 px-4 py-2">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb 
            items={[
              { label: 'Worksheet Generator', current: true }
            ]}
            showHome={false}
          />
        </div>
      </div>

      {/* Main Content - Mobile-First Responsive Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-4 md:py-6">
        {/* Mobile: Stack vertically, Tablet: 2 columns, Desktop: Optimized layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-10 gap-4 md:gap-6">
          {/* Configuration Panel - Full width on mobile, 30% on desktop */}
          <div className="w-full lg:col-span-3 order-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Worksheet Configuration
                </CardTitle>
                <CardDescription>
                  Configure your worksheet settings and generate personalized content for your students
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 md:space-y-6">
                {/* Topic Selection */}
                <div className="space-y-2">
                  <Label htmlFor="topic" className="text-base md:text-sm">Topic</Label>
                  <Select value={topic} onValueChange={(value) => { setTopic(value); setSubtopic(''); handleConfigurationChange(); }}>
                    <SelectTrigger className="h-12 md:h-10 text-base md:text-sm">
                      <SelectValue placeholder="Select a curriculum topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTopics.map(topic => (
                        <SelectItem key={topic.value} value={topic.value}>
                          {topic.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Subtopic Selection */}
                <div className="space-y-2">
                  <Label htmlFor="subtopic" className="text-base md:text-sm">Subtopic</Label>
                  <Select 
                    value={subtopic} 
                    onValueChange={(value) => { setSubtopic(value); handleConfigurationChange(); }}
                    disabled={!topic}
                  >
                    <SelectTrigger className="h-12 md:h-10 text-base md:text-sm">
                      <SelectValue placeholder={topic ? "Select a subtopic" : "Select topic first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {topic && mockSubtopics[topic]?.map(sub => (
                        <SelectItem key={sub.value} value={sub.value}>
                          {sub.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Difficulty Selection */}
                <div className="space-y-3">
                  <Label className="text-base md:text-sm">Difficulty Level</Label>
                  <div className="flex flex-col gap-4 md:gap-3">
                    {[
                      { value: 'easy', label: 'Easy', description: 'Basic concepts and simple problems' },
                      { value: 'average', label: 'Average', description: 'Standard curriculum level' },
                      { value: 'hard', label: 'Hard', description: 'Challenging problems for extension' }
                    ].map(({ value, label, description }) => (
                      <div key={value} className="flex items-start space-x-3 p-3 md:p-2 border rounded-lg hover:bg-slate-50 cursor-pointer touch-manipulation" onClick={() => { setDifficulty(value as DifficultyLevel); handleConfigurationChange(); }}>
                        <input
                          type="radio"
                          id={`difficulty-${value}`}
                          name="difficulty"
                          value={value}
                          checked={difficulty === value}
                          onChange={(e) => { setDifficulty(e.target.value as DifficultyLevel); handleConfigurationChange(); }}
                          className="h-5 w-5 md:h-4 md:w-4 text-blue-600 focus:ring-blue-500 border-gray-300 mt-0.5"
                        />
                        <div className="flex-1">
                          <Label htmlFor={`difficulty-${value}`} className="font-medium text-base md:text-sm cursor-pointer">
                            {label}
                          </Label>
                          <p className="text-sm md:text-xs text-slate-500 mt-1">{description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Question Count */}
                <div className="space-y-3">
                  <Label htmlFor="question-count" className="text-base md:text-sm">Number of Questions: {questionCount}</Label>
                  <input
                    type="range"
                    id="question-count"
                    min="5"
                    max="30"
                    value={questionCount}
                    onChange={(e) => { setQuestionCount(parseInt(e.target.value)); handleConfigurationChange(); }}
                    className="w-full h-3 md:h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider touch-manipulation"
                  />
                  <div className="flex justify-between text-sm md:text-xs text-slate-500">
                    <span>5 questions</span>
                    <span>30 questions</span>
                  </div>
                </div>

                {/* Name List Selection */}
                <div className="space-y-3 md:space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="name-list" className="text-base md:text-sm">Student Name List</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-5 w-5 md:h-4 md:w-4 text-slate-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Student names will be used in word problems to personalize the worksheet</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex flex-col md:flex-row gap-3 md:gap-2">
                    <Select value={nameList} onValueChange={(value) => { setNameList(value); handleConfigurationChange(); }}>
                      <SelectTrigger className="flex-1 h-12 md:h-10 text-base md:text-sm">
                        <SelectValue placeholder="Select a name list" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockNameLists.map(list => (
                          <SelectItem key={list.value} value={list.value}>
                            {list.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="default" className="md:flex-shrink-0">
                      Create New
                    </Button>
                  </div>
                </div>

                {/* Generation Progress */}
                {generationState === 'generating' && (
                  <div className="space-y-3 p-4 bg-blue-50 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Generating your worksheet...</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                    <p className="text-xs text-blue-700">
                      Creating curriculum-aligned questions with personalized student names
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Preview/Ads Panel - Full width on mobile, 70% on desktop */}
          <div className="w-full lg:col-span-7 order-2">
            <Card className="h-full min-h-[400px] md:min-h-[500px]">
              <CardContent className="p-0 h-full">
                {showAds ? (
                  /* Ad Placeholder */
                  <div className="h-full flex items-center justify-center bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg m-4">
                    <div className="text-center p-6">
                      <div className="w-16 h-16 bg-slate-300 rounded mx-auto mb-3"></div>
                      <p className="text-sm font-medium text-slate-600">Advertisement</p>
                      <p className="text-xs text-slate-500 mt-1">
                        Support free worksheets
                      </p>
                      <p className="text-xs text-slate-400 mt-2">
                        Upgrade to Pro to remove ads
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Worksheet Preview */
                  <div className="p-4 h-full">
                    <div className="bg-white border rounded-lg shadow-sm h-full p-4 overflow-y-auto">
                      <div className="text-center border-b pb-3 mb-4">
                        <h3 className="font-bold text-lg">Mathematics Worksheet</h3>
                        <p className="text-sm text-slate-600">
                          {mockTopics.find(t => t.value === topic)?.label} - {mockSubtopics[topic]?.find(s => s.value === subtopic)?.label}
                        </p>
                        <p className="text-xs text-slate-500">Difficulty: {difficulty} | {questionCount} questions</p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <p className="text-sm"><strong>Name:</strong> _________________</p>
                          <p className="text-sm"><strong>Date:</strong> _________________</p>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm">Instructions:</h4>
                          <p className="text-xs text-slate-600">
                            Show all your working out. Use the space provided for each question.
                          </p>
                        </div>

                        <div className="space-y-4">
                          {[1, 2, 3, 4, 5].map(num => (
                            <div key={num} className="border-b pb-2">
                              <p className="text-sm">
                                <strong>{num}.</strong> Emma has 24 stickers. She gives 8 stickers to Oliver. How many stickers does Emma have left?
                              </p>
                              <div className="mt-2 h-8 border-b border-dotted border-slate-300"></div>
                            </div>
                          ))}
                          <p className="text-xs text-slate-500 text-center">...and {questionCount - 5} more questions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons - Mobile optimized */}
        <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4 mt-6">
          <Button 
            onClick={handleGenerate}
            disabled={!canGenerate}
            size="touch"
            className="w-full md:w-auto md:min-w-32 text-lg md:text-base font-semibold"
          >
            {generationState === 'generating' ? (
              <>
                <Loader2 className="h-5 w-5 md:h-4 md:w-4 animate-spin mr-2" />
                Generating...
              </>
            ) : showPreview ? (
              'Regenerate'
            ) : (
              'Generate Worksheet'
            )}
          </Button>
          
          {showPreview && (
            <Button variant="outline" size="touch" className="w-full md:w-auto md:min-w-32 text-lg md:text-base">
              <Download className="h-5 w-5 md:h-4 md:w-4 mr-2" />
              Download PDF
            </Button>
          )}
        </div>
      </main>

      {/* Welcome Tour */}
      {showTour && (
        <WelcomeTour onComplete={() => setShowTour(false)} />
      )}

        {/* Footer */}
        <Footer version="v1.0.0-beta" />
      </div>
    </PullToRefresh>
  )
}