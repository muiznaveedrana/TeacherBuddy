"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

export default function StyleGuidePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Style Guide</h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive guidelines for consistent UI patterns and user experience.
          </p>
        </div>

        {/* Button Styles and States */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Button Styles & Usage</h2>
            <p className="text-muted-foreground mb-6">
              Consistent button usage patterns for different contexts and user actions.
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Primary Actions</CardTitle>
                <CardDescription>
                  Use for the main action in a context (form submission, navigation)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 items-center">
                  <Button>Generate Worksheet</Button>
                  <Button>Save Changes</Button>
                  <Button>Sign In</Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  <strong>When to use:</strong> Main call-to-action, form submissions, primary navigation
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Secondary Actions</CardTitle>
                <CardDescription>
                  Supporting actions that are less prominent than primary actions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 items-center">
                  <Button variant="secondary">Preview</Button>
                  <Button variant="secondary">Edit Profile</Button>
                  <Button variant="secondary">View Details</Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  <strong>When to use:</strong> Secondary navigation, supporting actions, alternative choices
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Outline & Ghost Buttons</CardTitle>
                <CardDescription>
                  Subtle actions that don&apos;t compete with primary content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 items-center">
                  <Button variant="outline">Cancel</Button>
                  <Button variant="outline">Learn More</Button>
                  <Button variant="ghost">Skip</Button>
                  <Button variant="ghost">Close</Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  <strong>When to use:</strong> Cancel actions, optional steps, subtle navigation
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Destructive Actions</CardTitle>
                <CardDescription>
                  Actions that delete, remove, or perform irreversible operations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 items-center">
                  <Button variant="destructive">Delete Account</Button>
                  <Button variant="destructive">Remove Item</Button>
                  <Button variant="destructive">Cancel Subscription</Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  <strong>When to use:</strong> Deletion, removal, cancellation - always with confirmation dialogs
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Form Input Standards */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Form Input Standards</h2>
            <p className="text-muted-foreground mb-6">
              Consistent form design patterns for optimal user experience.
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Input Field Patterns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="required-field">Required Field *</Label>
                      <Input id="required-field" placeholder="This field is required" />
                      <p className="text-xs text-muted-foreground">
                        Use asterisk (*) for required fields
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="optional-field">Optional Field</Label>
                      <Input id="optional-field" placeholder="This field is optional" />
                      <p className="text-xs text-muted-foreground">
                        No indicator needed for optional fields
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="helper-field">Field with Helper Text</Label>
                      <Input id="helper-field" placeholder="Enter your name" />
                      <p className="text-xs text-muted-foreground">
                        Helper text provides additional context
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="error-field">Field with Error</Label>
                      <Input 
                        id="error-field" 
                        placeholder="Invalid input" 
                        className="border-destructive focus-visible:ring-destructive"
                      />
                      <p className="text-xs text-destructive">
                        This field contains an error
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="success-field">Field with Success</Label>
                      <Input 
                        id="success-field" 
                        placeholder="Valid input" 
                        className="border-green-500 focus-visible:ring-green-500"
                        defaultValue="valid@example.com"
                      />
                      <p className="text-xs text-green-600">
                        This field is valid
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="disabled-field">Disabled Field</Label>
                      <Input 
                        id="disabled-field" 
                        placeholder="Cannot be edited" 
                        disabled
                      />
                      <p className="text-xs text-muted-foreground">
                        Disabled when not editable
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Form Layout Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Single Column Layout</h4>
                    <div className="max-w-md space-y-4 p-4 border border-border rounded-lg">
                      <div className="space-y-2">
                        <Label>Full Name *</Label>
                        <Input placeholder="Enter your full name" />
                      </div>
                      <div className="space-y-2">
                        <Label>Email Address *</Label>
                        <Input type="email" placeholder="teacher@school.edu" />
                      </div>
                      <div className="space-y-2">
                        <Label>School</Label>
                        <Input placeholder="Primary School Name" />
                      </div>
                      <Button className="w-full">Create Account</Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Use for simple forms, mobile-first design
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Two Column Layout</h4>
                    <div className="max-w-2xl space-y-4 p-4 border border-border rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>First Name *</Label>
                          <Input placeholder="John" />
                        </div>
                        <div className="space-y-2">
                          <Label>Last Name *</Label>
                          <Input placeholder="Smith" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Email Address *</Label>
                        <Input type="email" placeholder="john.smith@school.edu" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Year Group</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="year1">Year 1</SelectItem>
                              <SelectItem value="year2">Year 2</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Subject</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="maths">Mathematics</SelectItem>
                              <SelectItem value="english">English</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline">Cancel</Button>
                        <Button>Save Profile</Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Use for complex forms with related field groups
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Card and Container Layouts */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Card & Container Layouts</h2>
            <p className="text-muted-foreground mb-6">
              Consistent container patterns for organizing information.
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Card Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Metric Card</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-primary">1,234</div>
                      <p className="text-sm text-muted-foreground">Worksheets Generated</p>
                      <Progress value={78} className="mt-2" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center justify-between">
                        Status Card
                        <Badge>Active</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        Your subscription is active
                      </p>
                      <div className="text-sm">
                        <div>Next billing: Feb 1, 2024</div>
                        <div className="text-muted-foreground">£2.99/month</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Action Card</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Upgrade for more features
                      </p>
                      <Button size="sm" className="w-full">
                        Upgrade Now
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>List Card Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Year 3 Class A</h3>
                          <p className="text-sm text-muted-foreground">25 students</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm">Delete</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Reception Class</h3>
                          <p className="text-sm text-muted-foreground">20 students</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">Default</Badge>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Navigation Patterns */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Navigation Patterns</h2>
            <p className="text-muted-foreground mb-6">
              Consistent navigation design for seamless user experience.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Main Navigation</CardTitle>
              <CardDescription>
                Top navigation bar with user context and actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <h1 className="text-lg font-semibold">WorksheetGenerator.AI</h1>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Progress value={50} className="w-24" />
                      <span className="text-sm">15/30</span>
                    </div>
                    <Badge>Free Plan</Badge>
                    <Button variant="ghost" size="sm">Profile</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Page Navigation</CardTitle>
              <CardDescription>
                Secondary navigation for page sections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-1 border-b">
                  <Button variant="ghost" className="border-b-2 border-primary">
                    Overview
                  </Button>
                  <Button variant="ghost">Usage</Button>
                  <Button variant="ghost">Billing</Button>
                  <Button variant="ghost">Settings</Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Use for tabbed navigation within pages
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Icon Usage Guidelines */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Icon Usage Guidelines</h2>
            <p className="text-muted-foreground mb-6">
              Consistent icon usage for better visual communication.
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-4">Action Icons</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-muted rounded flex items-center justify-center">
                        <span className="text-xs">+</span>
                      </div>
                      <span className="text-sm">Add/Create actions</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-muted rounded flex items-center justify-center">
                        <span className="text-xs">✎</span>
                      </div>
                      <span className="text-sm">Edit actions</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-muted rounded flex items-center justify-center">
                        <span className="text-xs">🗑</span>
                      </div>
                      <span className="text-sm">Delete actions</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-muted rounded flex items-center justify-center">
                        <span className="text-xs">↓</span>
                      </div>
                      <span className="text-sm">Download actions</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Status Icons</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">✓</span>
                      </div>
                      <span className="text-sm">Success/Complete</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">!</span>
                      </div>
                      <span className="text-sm">Warning/Attention</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-destructive rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">×</span>
                      </div>
                      <span className="text-sm">Error/Failed</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">i</span>
                      </div>
                      <span className="text-sm">Information</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Loading and Empty States */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Loading & Empty States</h2>
            <p className="text-muted-foreground mb-6">
              Consistent patterns for loading and empty content states.
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Loading States</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Button Loading</Label>
                  <Button disabled>
                    Generating... 
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Progress Loading</Label>
                  <div>
                    <Progress value={45} className="w-full" />
                    <p className="text-sm text-muted-foreground mt-1">
                      Generating worksheet... 45%
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Skeleton Loading</Label>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Empty States</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-8 border border-dashed border-muted-foreground/25 rounded-lg">
                  <div className="space-y-2">
                    <h3 className="font-medium">No name lists created yet</h3>
                    <p className="text-sm text-muted-foreground">
                      Create your first name list to personalize worksheets
                    </p>
                    <Button className="mt-2">Create Name List</Button>
                  </div>
                </div>

                <div className="text-center py-8 border border-dashed border-muted-foreground/25 rounded-lg">
                  <div className="space-y-2">
                    <h3 className="font-medium">No worksheets generated</h3>
                    <p className="text-sm text-muted-foreground">
                      Your generated worksheets will appear here
                    </p>
                    <Button variant="outline" className="mt-2">Generate First Worksheet</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Error Handling Patterns */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Error Handling</h2>
            <p className="text-muted-foreground mb-6">
              Consistent error messaging and recovery patterns.
            </p>
          </div>

          <div className="space-y-4">
            <Alert className="border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive">
              <AlertDescription>
                <strong>Generation Failed:</strong> Unable to generate worksheet. Please check your internet connection and try again.
              </AlertDescription>
            </Alert>

            <Alert className="border-yellow-500/50 text-yellow-600 dark:border-yellow-500 [&>svg]:text-yellow-600">
              <AlertDescription>
                <strong>Quota Warning:</strong> You have 5 worksheets remaining this month. Upgrade to Pro for unlimited generation.
              </AlertDescription>
            </Alert>

            <Alert>
              <AlertDescription>
                <strong>Maintenance Notice:</strong> Scheduled maintenance will occur tonight from 2-4 AM GMT. Service may be temporarily unavailable.
              </AlertDescription>
            </Alert>
          </div>
        </section>
      </div>
    </div>
  );
}