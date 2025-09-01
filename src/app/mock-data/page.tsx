"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MockDataSpecificationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Mock Data Specifications</h1>
          <p className="text-xl text-muted-foreground">
            Realistic data structures and examples for development and testing
          </p>
        </div>

        {/* Sample User Profiles */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Sample User Profiles</h2>
            <p className="text-muted-foreground mb-6">
              Representative UK primary school teacher profiles for testing and demo purposes.
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Teacher Persona Examples</CardTitle>
                <CardDescription>
                  Realistic user profiles reflecting UK primary education context
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Sarah Mitchell</h4>
                            <Badge>Free Plan</Badge>
                          </div>
                          <div className="text-sm space-y-1">
                            <div><strong>School:</strong> Oakfield Primary School</div>
                            <div><strong>Year Group:</strong> Year 3</div>
                            <div><strong>Subject:</strong> Mathematics</div>
                            <div><strong>Location:</strong> Manchester, England</div>
                            <div><strong>Experience:</strong> 5 years teaching</div>
                            <div><strong>Class Size:</strong> 28 students</div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            <strong>Usage:</strong> 15/30 worksheets this month<br/>
                            <strong>Joined:</strong> September 2023
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">James Chen</h4>
                            <Badge variant="secondary">Pro Plan</Badge>
                          </div>
                          <div className="text-sm space-y-1">
                            <div><strong>School:</strong> Riverside Community Primary</div>
                            <div><strong>Year Group:</strong> Year 5</div>
                            <div><strong>Subject:</strong> Mathematics & Science</div>
                            <div><strong>Location:</strong> Birmingham, England</div>
                            <div><strong>Experience:</strong> 12 years teaching</div>
                            <div><strong>Class Size:</strong> 30 students</div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            <strong>Usage:</strong> 67/90 worksheets this month<br/>
                            <strong>Joined:</strong> March 2023
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Emma Thompson</h4>
                            <Badge variant="destructive">Pro Plus</Badge>
                          </div>
                          <div className="text-sm space-y-1">
                            <div><strong>School:</strong> St. Mary&apos;s Catholic Primary</div>
                            <div><strong>Year Group:</strong> Reception & Year 1</div>
                            <div><strong>Subject:</strong> All subjects</div>
                            <div><strong>Location:</strong> London, England</div>
                            <div><strong>Experience:</strong> 8 years teaching</div>
                            <div><strong>Class Size:</strong> 25 students</div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            <strong>Usage:</strong> 89/150 worksheets this month<br/>
                            <strong>Joined:</strong> January 2023
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">User Profile Data Structure</h4>
                    <div className="p-3 bg-muted rounded-lg text-sm font-mono overflow-x-auto">
                      <pre>{`interface UserProfile {
  id: string
  email: string
  firstName: string
  lastName: string
  school: {
    name: string
    location: string
    type: &apos;primary&apos; | &apos;secondary&apos; | &apos;academy&apos; | &apos;private&apos;
  }
  teaching: {
    yearGroups: YearGroup[]
    subjects: Subject[]
    experienceYears: number
    classSize: number
  }
  subscription: {
    tier: &apos;free&apos; | &apos;pro&apos; | &apos;pro_plus&apos;
    startDate: Date
    nextBillingDate?: Date
    worksheetsUsed: number
    worksheetLimit: number
  }
  preferences: {
    curriculum: &apos;uk_national&apos; | &apos;scottish&apos; | &apos;welsh&apos;
    emailNotifications: boolean
    marketingEmails: boolean
  }
  createdAt: Date
  lastLoginAt: Date
}`}</pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Name List Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Year 3 Class A (25 students)</h4>
                      <div className="p-3 bg-muted rounded text-sm">
                        Ava, Oliver, Emma, George, Isla, Noah, Sophia, Leo, Lily, Arthur, 
                        Grace, Oscar, Freya, Archie, Charlotte, Jack, Amelia, Harry, Emily, 
                        Henry, Poppy, Jacob, Willow, Thomas, Evie
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Reception Class (20 students)</h4>
                      <div className="p-3 bg-muted rounded text-sm">
                        Aria, Mason, Luna, Sebastian, Maya, Felix, Zara, Finn, Ava, Theo, 
                        Ivy, Max, Ruby, Lucas, Bella, Ethan, Chloe, Noah, Mia, Oscar
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Diverse Name Lists</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium mb-1">Culturally Diverse</h5>
                        <div className="p-3 bg-muted rounded text-xs">
                          Aisha, Arjun, Chen, Maria, Fatima, Kofi, Priya, Ahmed, 
                          Yuki, Carlos, Amara, Dmitri, Zara, Olumide
                        </div>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium mb-1">Traditional UK Names</h5>
                        <div className="p-3 bg-muted rounded text-xs">
                          William, Catherine, James, Elizabeth, Robert, Margaret, 
                          David, Susan, Michael, Helen, John, Sarah
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Curriculum Topic Taxonomy */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Curriculum Topic Taxonomy</h2>
            <p className="text-muted-foreground mb-6">
              UK National Curriculum aligned topic structure for worksheet generation.
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Mathematics Topics by Year Group</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Reception & Year 1</h4>
                      <div className="space-y-2">
                        <div>
                          <h5 className="text-sm font-medium">Number and Place Value</h5>
                          <ul className="text-xs text-muted-foreground ml-4">
                            <li>• Counting to 20</li>
                            <li>• Number recognition 0-20</li>
                            <li>• Ordering numbers</li>
                            <li>• One more, one less</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium">Addition and Subtraction</h5>
                          <ul className="text-xs text-muted-foreground ml-4">
                            <li>• Adding within 20</li>
                            <li>• Subtracting within 20</li>
                            <li>• Number bonds to 10</li>
                            <li>• Doubles and halves</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Year 2 & Year 3</h4>
                      <div className="space-y-2">
                        <div>
                          <h5 className="text-sm font-medium">Number and Place Value</h5>
                          <ul className="text-xs text-muted-foreground ml-4">
                            <li>• Numbers to 100/1000</li>
                            <li>• Place value (tens, hundreds)</li>
                            <li>• Comparing and ordering</li>
                            <li>• Rounding to nearest 10</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium">Multiplication and Division</h5>
                          <ul className="text-xs text-muted-foreground ml-4">
                            <li>• 2, 5, 10 times tables</li>
                            <li>• Arrays and groups</li>
                            <li>• Sharing and grouping</li>
                            <li>• Related facts</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Year 4 & Year 5</h4>
                      <div className="space-y-2">
                        <div>
                          <h5 className="text-sm font-medium">Number and Place Value</h5>
                          <ul className="text-xs text-muted-foreground ml-4">
                            <li>• Numbers to 10,000/1,000,000</li>
                            <li>• Roman numerals</li>
                            <li>• Negative numbers</li>
                            <li>• Rounding to any place</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium">Fractions and Decimals</h5>
                          <ul className="text-xs text-muted-foreground ml-4">
                            <li>• Unit and non-unit fractions</li>
                            <li>• Equivalent fractions</li>
                            <li>• Decimal notation</li>
                            <li>• Percentages</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Year 6</h4>
                      <div className="space-y-2">
                        <div>
                          <h5 className="text-sm font-medium">Advanced Topics</h5>
                          <ul className="text-xs text-muted-foreground ml-4">
                            <li>• Numbers to 10,000,000</li>
                            <li>• Four operations fluency</li>
                            <li>• Ratio and proportion</li>
                            <li>• Algebra introduction</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium">SATs Preparation</h5>
                          <ul className="text-xs text-muted-foreground ml-4">
                            <li>• Problem solving</li>
                            <li>• Reasoning questions</li>
                            <li>• Multi-step problems</li>
                            <li>• Test techniques</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Topic Data Structure</h4>
                    <div className="p-3 bg-muted rounded-lg text-sm font-mono overflow-x-auto">
                      <pre>{`interface CurriculumTopic {
  id: string
  name: string
  yearGroups: YearGroup[]
  subject: &apos;mathematics&apos; | &apos;english&apos; | &apos;science&apos;
  strand: string // e.g., &apos;Number and Place Value&apos;
  objectives: string[]
  difficultyLevels: {
    easy: ProblemTemplate[]
    medium: ProblemTemplate[]
    hard: ProblemTemplate[]
  }
  keywords: string[]
  relatedTopics: string[]
}`}</pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>English Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Phonics & Spelling</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Phase 2-6 Phonics</li>
                      <li>• Common Exception Words</li>
                      <li>• Spelling patterns</li>
                      <li>• Syllables and prefixes</li>
                      <li>• Year-specific word lists</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Grammar & Punctuation</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Parts of speech</li>
                      <li>• Sentence types</li>
                      <li>• Punctuation rules</li>
                      <li>• Verb tenses</li>
                      <li>• Conjunctions</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Reading Comprehension</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Inference skills</li>
                      <li>• Vocabulary building</li>
                      <li>• Text analysis</li>
                      <li>• Character study</li>
                      <li>• Poetry appreciation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Usage Statistics Examples */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Usage Statistics Examples</h2>
            <p className="text-muted-foreground mb-6">
              Realistic usage patterns and analytics data for dashboard displays.
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Usage Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-primary">1,847</div>
                        <div className="text-sm text-muted-foreground">Total Worksheets Generated</div>
                        <div className="text-xs mt-1">↑ 23% from last month</div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-primary">4.2</div>
                        <div className="text-sm text-muted-foreground">Average per Teacher</div>
                        <div className="text-xs mt-1">Per week this term</div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-primary">89%</div>
                        <div className="text-sm text-muted-foreground">Teacher Satisfaction</div>
                        <div className="text-xs mt-1">Based on 234 reviews</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Most Popular Topics (This Month)</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-muted rounded">
                        <span className="text-sm">Addition within 100</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-background rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '78%' }}></div>
                          </div>
                          <span className="text-xs text-muted-foreground">234 sheets</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-2 bg-muted rounded">
                        <span className="text-sm">Times Tables (2, 5, 10)</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-background rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                          </div>
                          <span className="text-xs text-muted-foreground">198 sheets</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-2 bg-muted rounded">
                        <span className="text-sm">Phonics Phase 3</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-background rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '52%' }}></div>
                          </div>
                          <span className="text-xs text-muted-foreground">156 sheets</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Usage Statistics Data Structure</h4>
                    <div className="p-3 bg-muted rounded-lg text-sm font-mono overflow-x-auto">
                      <pre>{`interface UsageStatistics {
  userId: string
  period: {
    month: number
    year: number
  }
  worksheetsGenerated: number
  topicsUsed: {
    topicId: string
    topicName: string
    count: number
    lastUsed: Date
  }[]
  averageGenerationTime: number // seconds
  mostProductiveDay: DayOfWeek
  timeOfDayPattern: {
    morning: number    // 6-12
    afternoon: number  // 12-18  
    evening: number    // 18-22
  }
  deviceBreakdown: {
    desktop: number
    tablet: number
    mobile: number
  }
}`}</pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Subscription Billing Data */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Subscription Billing Data</h2>
            <p className="text-muted-foreground mb-6">
              Mock billing information and subscription management examples.
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Tiers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center space-y-2">
                        <Badge>Free Plan</Badge>
                        <div className="text-2xl font-bold">£0</div>
                        <div className="text-sm text-muted-foreground">per month</div>
                        <div className="space-y-1 text-sm">
                          <div>• 30 worksheets/month</div>
                          <div>• Ads included</div>
                          <div>• Basic support</div>
                          <div>• Standard templates</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center space-y-2">
                        <Badge variant="secondary">Pro Plan</Badge>
                        <div className="text-2xl font-bold">£2.99</div>
                        <div className="text-sm text-muted-foreground">per month</div>
                        <div className="space-y-1 text-sm">
                          <div>• 90 worksheets/month</div>
                          <div>• Ad-free experience</div>
                          <div>• Priority support</div>
                          <div>• Premium templates</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center space-y-2">
                        <Badge variant="destructive">Pro Plus</Badge>
                        <div className="text-2xl font-bold">£4.99</div>
                        <div className="text-sm text-muted-foreground">per month</div>
                        <div className="space-y-1 text-sm">
                          <div>• 150 worksheets/month</div>
                          <div>• Ad-free experience</div>
                          <div>• Priority support</div>
                          <div>• All features included</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sample Billing History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Date</th>
                          <th className="text-left p-2">Description</th>
                          <th className="text-left p-2">Amount</th>
                          <th className="text-left p-2">Status</th>
                          <th className="text-left p-2">Invoice</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        <tr className="border-b">
                          <td className="p-2">1 Feb 2024</td>
                          <td className="p-2">Pro Plan - Monthly</td>
                          <td className="p-2">£2.99</td>
                          <td className="p-2"><Badge variant="secondary" className="text-xs">Paid</Badge></td>
                          <td className="p-2 text-primary cursor-pointer">Download</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">1 Jan 2024</td>
                          <td className="p-2">Pro Plan - Monthly</td>
                          <td className="p-2">£2.99</td>
                          <td className="p-2"><Badge variant="secondary" className="text-xs">Paid</Badge></td>
                          <td className="p-2 text-primary cursor-pointer">Download</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">1 Dec 2023</td>
                          <td className="p-2">Pro Plan - Monthly</td>
                          <td className="p-2">£2.99</td>
                          <td className="p-2"><Badge variant="secondary" className="text-xs">Paid</Badge></td>
                          <td className="p-2 text-primary cursor-pointer">Download</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Subscription Data Structure</h4>
                    <div className="p-3 bg-muted rounded-lg text-sm font-mono overflow-x-auto">
                      <pre>{`interface SubscriptionData {
  id: string
  userId: string
  tier: &apos;free&apos; | &apos;pro&apos; | &apos;pro_plus&apos;
  status: &apos;active&apos; | &apos;cancelled&apos; | &apos;past_due&apos; | &apos;trialing&apos;
  billingCycle: &apos;monthly&apos; | &apos;yearly&apos;
  priceGBP: number
  currency: &apos;GBP&apos;
  startDate: Date
  nextBillingDate?: Date
  cancelledAt?: Date
  trialEndsAt?: Date
  paymentMethod: {
    type: &apos;card&apos;
    lastFourDigits: string
    expiryMonth: number
    expiryYear: number
    brand: &apos;visa&apos; | &apos;mastercard&apos; | &apos;amex&apos;
  }
  invoices: Invoice[]
  usageQuota: {
    worksheets: number
    used: number
    resetDate: Date
  }
}`}</pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Implementation Guidelines */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Implementation Guidelines</h2>
            <p className="text-muted-foreground mb-6">
              Best practices for using mock data in development and testing.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Mock Data Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 text-green-600">✓ Do</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Use realistic, representative data</li>
                      <li>• Include edge cases and error states</li>
                      <li>• Maintain consistent naming conventions</li>
                      <li>• Update mock data regularly</li>
                      <li>• Include accessibility considerations</li>
                      <li>• Use appropriate UK context and language</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3 text-destructive">✗ Don&apos;t</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Use real student or teacher data</li>
                      <li>• Include inappropriate content</li>
                      <li>• Hardcode mock data in components</li>
                      <li>• Forget to handle loading states</li>
                      <li>• Use culturally insensitive examples</li>
                      <li>• Mix development and production data</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Mock Data Organization</h4>
                  <div className="p-3 bg-muted rounded font-mono text-sm">
                    <div>/src/lib/data/</div>
                    <div>&nbsp;&nbsp;mockUsers.ts         # User profiles</div>
                    <div>&nbsp;&nbsp;mockCurriculum.ts    # Topics and subjects</div>
                    <div>&nbsp;&nbsp;mockUsage.ts         # Analytics data</div>
                    <div>&nbsp;&nbsp;mockBilling.ts       # Subscription data</div>
                    <div>&nbsp;&nbsp;mockWorksheets.ts    # Generated content</div>
                    <div>&nbsp;&nbsp;mockNameLists.ts     # Student names</div>
                    <div>&nbsp;&nbsp;index.ts             # Combined exports</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}