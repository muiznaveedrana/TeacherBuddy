"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function BrandGuidelinesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Brand Guidelines</h1>
          <p className="text-xl text-muted-foreground">
            Brand identity, voice, and visual standards for WorksheetGenerator.AI
          </p>
        </div>

        {/* Logo Usage */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Logo Usage & Placement</h2>
            <p className="text-muted-foreground mb-6">
              Consistent logo usage across all touchpoints maintains brand recognition.
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Primary Logo</CardTitle>
                <CardDescription>
                  The main logo for headers, marketing materials, and primary brand presence
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-center p-8 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    WorksheetGenerator.AI
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium mb-2">Usage Guidelines</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Maintain minimum clear space of 1x logo height</li>
                      <li>• Never stretch or distort the logo</li>
                      <li>• Use on light backgrounds with primary color</li>
                      <li>• Minimum size: 120px width on digital</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Don&apos;t</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Place on busy background images</li>
                      <li>• Use low-contrast color combinations</li>
                      <li>• Add effects, shadows, or gradients</li>
                      <li>• Modify the typography or spacing</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Logo Variations</CardTitle>
                <CardDescription>
                  Different logo formats for various contexts and backgrounds
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center p-6 bg-white border rounded-lg">
                      <div className="text-lg font-bold text-primary">
                        WorksheetGenerator.AI
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Light background</p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center p-6 bg-slate-900 rounded-lg">
                      <div className="text-lg font-bold text-white">
                        WorksheetGenerator.AI
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Dark background</p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center p-6 bg-primary rounded-lg">
                      <div className="text-lg font-bold text-primary-foreground">
                        WG.AI
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Compact version</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Voice and Tone */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Voice & Tone</h2>
            <p className="text-muted-foreground mb-6">
              Consistent communication style that resonates with UK primary teachers.
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Brand Voice Principles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-green-600 mb-2">✓ We Are</h4>
                      <ul className="space-y-2 text-sm">
                        <li><strong>Helpful:</strong> Always providing clear, actionable guidance</li>
                        <li><strong>Professional:</strong> Maintaining educational standards and reliability</li>
                        <li><strong>Empowering:</strong> Helping teachers save time and focus on teaching</li>
                        <li><strong>Supportive:</strong> Understanding the challenges teachers face</li>
                        <li><strong>Clear:</strong> Using plain English, avoiding jargon</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-destructive mb-2">✗ We Are Not</h4>
                      <ul className="space-y-2 text-sm">
                        <li><strong>Overly casual:</strong> Avoiding slang or informal language</li>
                        <li><strong>Pushy:</strong> Never aggressive in sales or upgrades</li>
                        <li><strong>Condescending:</strong> Respecting teachers&apos; expertise</li>
                        <li><strong>Technical:</strong> Avoiding unnecessary complexity</li>
                        <li><strong>Generic:</strong> Understanding UK education context</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tone Examples</CardTitle>
                <CardDescription>
                  How our voice adapts to different contexts while maintaining consistency
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      Welcome Messages
                      <Badge variant="secondary" className="ml-2">Warm & Encouraging</Badge>
                    </h4>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm">
                        &quot;Welcome to WorksheetGenerator.AI! We&apos;re here to help you create engaging worksheets 
                        in seconds, so you can spend more time doing what you love most—teaching.&quot;
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      Error Messages
                      <Badge variant="secondary" className="ml-2">Helpful & Reassuring</Badge>
                    </h4>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm">
                        &quot;Oops! Something went wrong while generating your worksheet. This sometimes happens, 
                        but don&apos;t worry—your settings have been saved. Please try again in a moment.&quot;
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      Feature Introductions
                      <Badge variant="secondary" className="ml-2">Educational & Clear</Badge>
                    </h4>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm">
                        &quot;Name lists help personalize your worksheets with your students&apos; names, making 
                        maths problems more engaging. For example: &apos;Emma has 5 apples, Oliver has 3 more.&apos;&quot;
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      Upgrade Prompts
                      <Badge variant="secondary" className="ml-2">Respectful & Value-focused</Badge>
                    </h4>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm">
                        &quot;You&apos;ve generated 25 worksheets this month—fantastic! Upgrade to Pro for unlimited 
                        generation and an ad-free experience. Many teachers find Pro saves them even more time.&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Educational Appropriateness */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Educational Appropriateness Standards</h2>
            <p className="text-muted-foreground mb-6">
              Ensuring all content is suitable for primary school environments.
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Alert className="border-green-500/50 text-green-600 dark:border-green-500 [&>svg]:text-green-600">
                    <AlertDescription>
                      <strong>Always Appropriate:</strong> Educational content, positive role models, 
                      inclusive language, curriculum-aligned topics, age-appropriate examples.
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-yellow-500/50 text-yellow-600 dark:border-yellow-500 [&>svg]:text-yellow-600">
                    <AlertDescription>
                      <strong>Use With Care:</strong> Competitive scenarios, food-related problems 
                      (consider allergies/cultural differences), pop culture references (may date quickly).
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive">
                    <AlertDescription>
                      <strong>Never Include:</strong> Violence, inappropriate themes, discriminatory content, 
                      religious references, political content, commercial brands without purpose.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Name and Character Standards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 text-green-600">✓ Preferred Examples</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Common UK names: Emma, Oliver, Ava, George</li>
                      <li>• Culturally diverse names: Aisha, Arjun, Chen, Maria</li>
                      <li>• Traditional names: Sarah, James, Lucy, Thomas</li>
                      <li>• Gender-neutral options: Alex, Riley, Jordan, Sam</li>
                      <li>• Educational roles: Ms. Smith, Mr. Patel, Dr. Jones</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3 text-destructive">✗ Avoid</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Outdated or stereotypical names</li>
                      <li>• Celebrity or fictional character names</li>
                      <li>• Names that could be mispronounced</li>
                      <li>• Names with negative connotations</li>
                      <li>• Single demographic representation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Scenario Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Mathematics Problem Contexts</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium text-green-600 mb-1">✓ Good Examples</h5>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Sharing toys or books fairly</li>
                          <li>• Counting classroom supplies</li>
                          <li>• Planning school trips or events</li>
                          <li>• Garden or nature observations</li>
                          <li>• Sports and games (non-competitive)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-destructive mb-1">✗ Avoid</h5>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Money problems without context</li>
                          <li>• Complex adult scenarios</li>
                          <li>• Dating or relationship contexts</li>
                          <li>• Violence or conflict scenarios</li>
                          <li>• Adult occupations children don&apos;t understand</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Photography and Illustration Style */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Photography & Illustration Style</h2>
            <p className="text-muted-foreground mb-6">
              Visual content standards for marketing and educational materials.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Visual Style Principles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Photography Style</h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Bright and welcoming:</strong> Natural lighting, warm tones</li>
                    <li><strong>Authentic:</strong> Real teachers and classroom environments</li>
                    <li><strong>Diverse:</strong> Representing various backgrounds and abilities</li>
                    <li><strong>Professional:</strong> Clean, organized spaces that inspire confidence</li>
                    <li><strong>Child-focused:</strong> Images that show positive learning experiences</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Illustration Guidelines</h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Simple and clear:</strong> Easy to understand at any size</li>
                    <li><strong>Educational:</strong> Supporting learning rather than decorative</li>
                    <li><strong>Consistent style:</strong> Uniform visual language throughout</li>
                    <li><strong>Inclusive:</strong> Representing diversity in all characters</li>
                    <li><strong>Age-appropriate:</strong> Suitable for primary school context</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Color Usage in Visuals</h4>
                <p className="text-sm text-muted-foreground">
                  Use our brand colors as accents, but allow photography and illustrations to maintain 
                  natural color palettes. Avoid oversaturating images with brand colors—subtlety 
                  maintains professionalism and readability.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* UK-Specific Considerations */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">UK-Specific Brand Considerations</h2>
            <p className="text-muted-foreground mb-6">
              Localized brand elements that resonate with UK primary teachers.
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Language and Terminology</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 text-green-600">✓ UK English</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Maths (not Math)</li>
                      <li>• Year groups (not Grades)</li>
                      <li>• Timetable (not Schedule)</li>
                      <li>• Headteacher (not Principal)</li>
                      <li>• Autumn/Spring/Summer terms</li>
                      <li>• £ symbol for pricing</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3 text-destructive">✗ US English</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Math, Grades, Schedule</li>
                      <li>• Fall semester, Principal</li>
                      <li>• $ symbol, ZIP codes</li>
                      <li>• Elementary school terminology</li>
                      <li>• Non-UK cultural references</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Educational Context</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">National Curriculum Alignment</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Always reference UK National Curriculum objectives and use appropriate year group terminology.
                    </p>
                    <div className="p-3 bg-muted rounded text-sm">
                      <strong>Example:</strong> &quot;Aligned with Year 3 National Curriculum objectives for multiplication and division&quot;
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Assessment Language</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Use familiar UK assessment terms and progression frameworks.
                    </p>
                    <div className="p-3 bg-muted rounded text-sm">
                      <strong>Terms to use:</strong> Working towards, Expected standard, Greater depth, SATs, Phonics screening
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Brand Application Examples */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Brand Application Examples</h2>
            <p className="text-muted-foreground mb-6">
              How our brand guidelines come together in real applications.
            </p>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Marketing Email Example</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted rounded-lg space-y-2 text-sm">
                  <h4 className="font-medium">Subject: Save 2 hours of planning time this week</h4>
                  <p>Hello Sarah,</p>
                  <p>
                    We know how precious your planning time is. That&apos;s why we created WorksheetGenerator.AI—to help 
                    Year 3 teachers like you create engaging, curriculum-aligned maths worksheets in seconds.
                  </p>
                  <p>
                    This week, try generating worksheets for multiplication and division. Your students will love 
                    seeing their names in the problems, and you&apos;ll love having 2 extra hours for other planning.
                  </p>
                  <p>Happy teaching!<br />The WorksheetGenerator.AI Team</p>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Notice: Professional tone, UK terminology, teacher-focused benefits, specific curriculum reference
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feature Announcement Example</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted rounded-lg space-y-2 text-sm">
                  <h4 className="font-medium">New: Name Lists for Personalized Learning</h4>
                  <p>
                    We&apos;re excited to introduce Name Lists—a new way to make your worksheets even more engaging 
                    for your students.
                  </p>
                  <p>
                    When you add your class names to a list, we&apos;ll use them in maths problems: &quot;Emma has 5 stickers, 
                    how many more does she need to make 10?&quot; Research shows personalized problems increase 
                    engagement by 40%.
                  </p>
                  <p>
                    Create your first name list in Settings → Name Lists. It takes just 2 minutes and works 
                    with all subjects and year groups.
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Notice: Clear benefit, educational backing, simple instructions, inclusive examples
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}