"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

export default function AccessibilityGuidelinesPage() {

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Accessibility Guidelines</h1>
          <p className="text-xl text-muted-foreground">
            WCAG 2.1 AA compliance standards and inclusive design principles
          </p>
        </div>

        {/* Color Contrast */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Color Contrast Requirements</h2>
            <p className="text-muted-foreground mb-6">
              Ensuring sufficient contrast for all users, including those with visual impairments.
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>WCAG 2.1 AA Standards</CardTitle>
                <CardDescription>
                  Minimum contrast ratios for different content types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Text Contrast Requirements</h4>
                      <ul className="space-y-2 text-sm">
                        <li><strong>Normal text:</strong> 4.5:1 minimum ratio</li>
                        <li><strong>Large text (18pt+):</strong> 3:1 minimum ratio</li>
                        <li><strong>Bold text (14pt+):</strong> 3:1 minimum ratio</li>
                        <li><strong>Non-text elements:</strong> 3:1 minimum ratio</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Interactive Elements</h4>
                      <ul className="space-y-2 text-sm">
                        <li><strong>Buttons:</strong> 4.5:1 text, 3:1 background</li>
                        <li><strong>Form inputs:</strong> 3:1 border contrast</li>
                        <li><strong>Links:</strong> 4.5:1 against background</li>
                        <li><strong>Icons:</strong> 3:1 minimum contrast</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Color Contrast Examples</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="p-4 bg-primary text-primary-foreground rounded text-center">
                          <strong>Primary Button</strong>
                        </div>
                        <p className="text-xs text-muted-foreground">Ratio: 8.2:1 ✓ Excellent</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="p-4 bg-muted text-muted-foreground rounded text-center">
                          <strong>Muted Text</strong>
                        </div>
                        <p className="text-xs text-muted-foreground">Ratio: 4.8:1 ✓ Good</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="p-4 bg-destructive text-destructive-foreground rounded text-center">
                          <strong>Error State</strong>
                        </div>
                        <p className="text-xs text-muted-foreground">Ratio: 6.1:1 ✓ Excellent</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Color Usage Guidelines</CardTitle>
                <CardDescription>
                  Using color effectively while maintaining accessibility
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert className="border-green-500/50 text-green-600 dark:border-green-500 [&>svg]:text-green-600">
                    <AlertDescription>
                      <strong>Do:</strong> Use color plus text labels, icons, or patterns to convey information. 
                      This ensures users with color vision differences can still access the content.
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive">
                    <AlertDescription>
                      <strong>Don&apos;t:</strong> Rely solely on color to communicate important information. 
                      &quot;Click the red button&quot; should be &quot;Click the Submit button&quot; instead.
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="font-medium mb-2">Good Example</h5>
                      <div className="flex items-center space-x-2">
                        <Badge variant="destructive">Error</Badge>
                        <span className="text-sm">Form validation failed</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Uses color + text + icon for clarity
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium mb-2">Bad Example</h5>
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Color only - unclear meaning
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Keyboard Navigation */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Keyboard Navigation Patterns</h2>
            <p className="text-muted-foreground mb-6">
              Ensuring full keyboard accessibility for users who cannot use a mouse.
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Focus Management</CardTitle>
                <CardDescription>
                  Visible focus indicators and logical tab order
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Focus Indicator Standards</h4>
                    <div className="space-y-4">
                      <div className="p-4 border border-border rounded-lg">
                        <Button className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                          Keyboard Accessible Button
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">
                          Try pressing Tab to focus this button
                        </p>
                      </div>

                      <div className="text-sm space-y-2">
                        <h5 className="font-medium">Focus Requirements:</h5>
                        <ul className="space-y-1 text-muted-foreground ml-4">
                          <li>• Visible 2px outline or ring around focused element</li>
                          <li>• High contrast color (minimum 3:1 ratio)</li>
                          <li>• 2px offset from element boundary</li>
                          <li>• Consistent styling across all interactive elements</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Tab Order Examples</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Logical Tab Order (Good)</Label>
                        <div className="space-y-2 p-4 border border-green-500 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs bg-green-500 text-white px-1 rounded">1</span>
                            <Input placeholder="First name" className="flex-1" />
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs bg-green-500 text-white px-1 rounded">2</span>
                            <Input placeholder="Last name" className="flex-1" />
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs bg-green-500 text-white px-1 rounded">3</span>
                            <Button className="flex-1">Submit</Button>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Natural reading order: top to bottom, left to right
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label>Skip Links</Label>
                        <div className="p-4 border border-border rounded-lg">
                          <Button variant="outline" size="sm" className="mb-2">
                            Skip to main content
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            Hidden until focused, allows keyboard users to skip repetitive navigation
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Keyboard Shortcuts</CardTitle>
                <CardDescription>
                  Common keyboard interactions and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Standard Navigation</h4>
                      <ul className="space-y-2 text-sm">
                        <li><kbd className="px-2 py-1 bg-muted rounded text-xs">Tab</kbd> - Move to next element</li>
                        <li><kbd className="px-2 py-1 bg-muted rounded text-xs">Shift + Tab</kbd> - Move to previous</li>
                        <li><kbd className="px-2 py-1 bg-muted rounded text-xs">Enter</kbd> - Activate button/link</li>
                        <li><kbd className="px-2 py-1 bg-muted rounded text-xs">Space</kbd> - Activate button/checkbox</li>
                        <li><kbd className="px-2 py-1 bg-muted rounded text-xs">Esc</kbd> - Close dialog/menu</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Form Controls</h4>
                      <ul className="space-y-2 text-sm">
                        <li><kbd className="px-2 py-1 bg-muted rounded text-xs">↑↓</kbd> - Navigate select options</li>
                        <li><kbd className="px-2 py-1 bg-muted rounded text-xs">Home</kbd> - First option</li>
                        <li><kbd className="px-2 py-1 bg-muted rounded text-xs">End</kbd> - Last option</li>
                        <li><kbd className="px-2 py-1 bg-muted rounded text-xs">Type</kbd> - Jump to matching option</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Screen Reader Considerations */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Screen Reader Support</h2>
            <p className="text-muted-foreground mb-6">
              Semantic HTML and ARIA labels for assistive technology users.
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Semantic HTML Structure</CardTitle>
                <CardDescription>
                  Using proper HTML elements for accessibility
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3 text-green-600">✓ Good Practices</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• Use <code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code> for headings</li>
                        <li>• Use <code>&lt;button&gt;</code> for clickable actions</li>
                        <li>• Use <code>&lt;label&gt;</code> for form inputs</li>
                        <li>• Use <code>&lt;nav&gt;</code> for navigation</li>
                        <li>• Use <code>&lt;main&gt;</code> for primary content</li>
                        <li>• Use <code>&lt;article&gt;</code> for standalone content</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3 text-destructive">✗ Avoid</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• <code>&lt;div&gt;</code> for buttons or links</li>
                        <li>• Missing form labels</li>
                        <li>• Skipping heading levels</li>
                        <li>• Generic &quot;click here&quot; link text</li>
                        <li>• Images without alt text</li>
                        <li>• Tables for layout purposes</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Example: Accessible Form</h4>
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="space-y-4 max-w-md">
                        <div className="space-y-2">
                          <Label htmlFor="worksheet-topic">Worksheet Topic *</Label>
                          <Input 
                            id="worksheet-topic" 
                            placeholder="Enter topic (e.g., Addition)" 
                            aria-required="true"
                            aria-describedby="topic-help"
                          />
                          <p id="topic-help" className="text-xs text-muted-foreground">
                            Choose from UK National Curriculum topics
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="difficulty-level">Difficulty Level</Label>
                          <div role="radiogroup" aria-labelledby="difficulty-level" className="flex space-x-4">
                            <label className="flex items-center space-x-2">
                              <input type="radio" name="difficulty" value="easy" />
                              <span>Easy</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input type="radio" name="difficulty" value="medium" />
                              <span>Medium</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input type="radio" name="difficulty" value="hard" />
                              <span>Hard</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ARIA Labels and Descriptions</CardTitle>
                <CardDescription>
                  Enhancing accessibility with ARIA attributes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Common ARIA Patterns</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Attribute</th>
                            <th className="text-left p-2">Purpose</th>
                            <th className="text-left p-2">Example</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2 font-mono">aria-label</td>
                            <td className="p-2">Accessible name when text isn&apos;t visible</td>
                            <td className="p-2 font-mono text-xs">aria-label=&quot;Close dialog&quot;</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-mono">aria-describedby</td>
                            <td className="p-2">References additional description</td>
                            <td className="p-2 font-mono text-xs">aria-describedby=&quot;help-text&quot;</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-mono">aria-expanded</td>
                            <td className="p-2">Indicates if collapsible content is open</td>
                            <td className="p-2 font-mono text-xs">aria-expanded=&quot;false&quot;</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-mono">aria-live</td>
                            <td className="p-2">Announces dynamic content changes</td>
                            <td className="p-2 font-mono text-xs">aria-live=&quot;polite&quot;</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Live Region Example</h4>
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="space-y-2">
                        <Button className="mb-2">Generate Worksheet</Button>
                        <div aria-live="polite" aria-atomic="true" className="text-sm">
                          Status: Generating worksheet... 75% complete
                        </div>
                        <Progress value={75} className="w-full" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Screen readers will announce status updates automatically
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Touch and Mobile Accessibility */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Touch & Mobile Accessibility</h2>
            <p className="text-muted-foreground mb-6">
              Ensuring accessibility across different devices and interaction methods.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Touch Target Guidelines</CardTitle>
              <CardDescription>
                Minimum sizes and spacing for touch interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center space-y-2">
                    <div className="w-11 h-11 bg-primary rounded mx-auto flex items-center justify-center text-primary-foreground">
                      ✓
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">44px minimum</div>
                      <div className="text-muted-foreground">WCAG standard</div>
                    </div>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-secondary rounded mx-auto flex items-center justify-center">
                      ✓
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">48px comfortable</div>
                      <div className="text-muted-foreground">Recommended size</div>
                    </div>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-14 h-14 bg-accent rounded mx-auto flex items-center justify-center">
                      ✓
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">56px large</div>
                      <div className="text-muted-foreground">Accessibility focused</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Touch Target Examples</h4>
                  <div className="flex flex-wrap gap-4 items-center">
                    <Button size="default">Standard Button</Button>
                    <Button size="touch">Touch Friendly</Button>
                    <Button size="icon" aria-label="Settings">⚙</Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    All buttons meet minimum 44px touch target requirement
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Spacing Requirements</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Minimum 8px spacing between touch targets</li>
                    <li>• 12px recommended for comfortable interaction</li>
                    <li>• Ensure targets don&apos;t overlap when zoomed to 200%</li>
                    <li>• Consider thumb reach zones on mobile devices</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Testing Checklist */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">WCAG 2.1 AA Compliance Checklist</h2>
            <p className="text-muted-foreground mb-6">
              Essential checks to ensure accessibility compliance.
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Visual Design</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">Color contrast ratios meet WCAG AA standards</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">Information not conveyed by color alone</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">Text can be resized up to 200% without loss</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">Focus indicators are visible and consistent</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Keyboard Navigation</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">All functionality accessible via keyboard</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">Tab order follows logical sequence</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">No keyboard traps present</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">Skip links provided for main content</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Content Structure</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">Headings follow hierarchical structure</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">All images have appropriate alt text</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">Form labels properly associated</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">Page titles are descriptive and unique</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Interactive Elements</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">Touch targets meet 44px minimum</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">Error messages are clear and helpful</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">Dynamic content changes announced</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">Timeout warnings provided when needed</span>
                    </label>
                  </div>
                </div>
              </div>

              <Alert className="mt-6">
                <AlertDescription>
                  <strong>Testing Tools:</strong> Use axe-core, WAVE, or Lighthouse accessibility audits 
                  to validate compliance. Manual testing with keyboard navigation and screen readers 
                  is also essential.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </section>

        {/* Resources */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Resources & Tools</h2>
            <p className="text-muted-foreground mb-6">
              Helpful tools and resources for maintaining accessibility standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Testing Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>axe DevTools:</strong> Browser extension for accessibility testing</li>
                  <li>• <strong>WAVE:</strong> Web accessibility evaluation tool</li>
                  <li>• <strong>Lighthouse:</strong> Built-in Chrome accessibility audit</li>
                  <li>• <strong>Colour Contrast Analyser:</strong> Contrast ratio checker</li>
                  <li>• <strong>NVDA/JAWS:</strong> Screen reader testing</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Guidelines & Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>WCAG 2.1:</strong> Web Content Accessibility Guidelines</li>
                  <li>• <strong>ARIA Authoring Practices:</strong> Interactive component patterns</li>
                  <li>• <strong>GOV.UK Design System:</strong> UK government accessibility standards</li>
                  <li>• <strong>WebAIM:</strong> Accessibility training and resources</li>
                  <li>• <strong>A11y Project:</strong> Community-driven accessibility checklist</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}