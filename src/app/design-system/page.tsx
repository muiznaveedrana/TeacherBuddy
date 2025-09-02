"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { ToggleSwitch } from "@/components/ui/toggle-switch";

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Design System</h1>
          <p className="text-xl text-muted-foreground">
            WorksheetGenerator.AI component library and design tokens
          </p>
        </div>

        {/* Color Palette */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Color Palette</h2>
            <p className="text-muted-foreground mb-6">
              Our color system is built on HSL values for better accessibility and dark mode support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Primary", bg: "bg-primary", text: "text-primary-foreground", hsl: "221.2 83.2% 53.3%" },
              { name: "Secondary", bg: "bg-secondary", text: "text-secondary-foreground", hsl: "210 40% 96%" },
              { name: "Accent", bg: "bg-accent", text: "text-accent-foreground", hsl: "210 40% 96%" },
              { name: "Muted", bg: "bg-muted", text: "text-muted-foreground", hsl: "210 40% 96%" },
              { name: "Card", bg: "bg-card", text: "text-card-foreground", hsl: "0 0% 100%" },
              { name: "Destructive", bg: "bg-destructive", text: "text-destructive-foreground", hsl: "0 84.2% 60.2%" }
            ].map((color) => (
              <Card key={color.name} className="overflow-hidden">
                <div className={`h-24 ${color.bg} ${color.text} flex items-center justify-center`}>
                  <span className="font-medium">{color.name}</span>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-1 text-sm">
                    <div><strong>HSL:</strong> {color.hsl}</div>
                    <div><strong>CSS Var:</strong> --{color.name.toLowerCase()}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Typography</h2>
            <p className="text-muted-foreground mb-6">
              Our typography scale is optimized for educational interfaces with clear hierarchy.
            </p>
          </div>
          
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h1 className="text-4xl font-bold tracking-tight mb-2">Heading 1 - 36px</h1>
                  <code className="text-sm text-muted-foreground">text-4xl font-bold tracking-tight</code>
                </div>
                <div className="border-b pb-4">
                  <h2 className="text-3xl font-semibold mb-2">Heading 2 - 30px</h2>
                  <code className="text-sm text-muted-foreground">text-3xl font-semibold</code>
                </div>
                <div className="border-b pb-4">
                  <h3 className="text-2xl font-semibold mb-2">Heading 3 - 24px</h3>
                  <code className="text-sm text-muted-foreground">text-2xl font-semibold</code>
                </div>
                <div className="border-b pb-4">
                  <h4 className="text-xl font-semibold mb-2">Heading 4 - 20px</h4>
                  <code className="text-sm text-muted-foreground">text-xl font-semibold</code>
                </div>
                <div className="border-b pb-4">
                  <p className="text-base mb-2">Body Text - 16px</p>
                  <code className="text-sm text-muted-foreground">text-base</code>
                </div>
                <div className="border-b pb-4">
                  <p className="text-sm mb-2">Small Text - 14px</p>
                  <code className="text-sm text-muted-foreground">text-sm</code>
                </div>
                <div>
                  <p className="text-xs mb-2">Extra Small - 12px</p>
                  <code className="text-sm text-muted-foreground">text-xs</code>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Spacing System */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Spacing System</h2>
            <p className="text-muted-foreground mb-6">
              Consistent spacing using Tailwind&apos;s scale (0.25rem increments).
            </p>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  { size: "1", px: "4px", rem: "0.25rem" },
                  { size: "2", px: "8px", rem: "0.5rem" },
                  { size: "3", px: "12px", rem: "0.75rem" },
                  { size: "4", px: "16px", rem: "1rem" },
                  { size: "6", px: "24px", rem: "1.5rem" },
                  { size: "8", px: "32px", rem: "2rem" },
                  { size: "12", px: "48px", rem: "3rem" },
                  { size: "16", px: "64px", rem: "4rem" }
                ].map((space) => (
                  <div key={space.size} className="flex items-center space-x-4">
                    <div className={`bg-primary h-4`} style={{ width: space.px }}></div>
                    <span className="font-mono text-sm">
                      {space.size} • {space.px} • {space.rem}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Button Components */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Button Variants</h2>
            <p className="text-muted-foreground mb-6">
              Button components with consistent styling and touch-friendly sizes.
            </p>
          </div>
          
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Variants</h3>
                <div className="flex flex-wrap gap-4">
                  <Button>Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Sizes</h3>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button size="sm">Small</Button>
                  <Button>Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="touch">Touch Friendly</Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">States</h3>
                <div className="flex flex-wrap gap-4">
                  <Button>Default</Button>
                  <Button disabled>Disabled</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Form Components */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Form Components</h2>
            <p className="text-muted-foreground mb-6">
              Form elements designed for accessibility and mobile-first use.
            </p>
          </div>
          
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="demo-input">Input Field</Label>
                    <Input id="demo-input" placeholder="Enter text here..." />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="demo-select">Select Dropdown</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                        <SelectItem value="option3">Option 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="demo-textarea">Textarea</Label>
                    <Textarea id="demo-textarea" placeholder="Enter longer text..." />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Toggle Switch</Label>
                    <ToggleSwitch
                      id="demo-toggle"
                      label="Enable notifications"
                      checked={true}
                      onChange={() => {}}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Progress Indicator</Label>
                    <Progress value={65} className="w-full" />
                    <span className="text-sm text-muted-foreground">65% complete</span>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Badges</Label>
                    <div className="flex gap-2 flex-wrap">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="destructive">Error</Badge>
                      <Badge variant="outline">Outline</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Cards and Layouts */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Cards & Layouts</h2>
            <p className="text-muted-foreground mb-6">
              Card components for organizing content with consistent spacing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Card</CardTitle>
                <CardDescription>
                  A simple card with header and content.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This is the card content area where you can place any content.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Statistical Card</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,234</div>
                <p className="text-sm text-muted-foreground">Worksheets Generated</p>
                <div className="mt-2">
                  <Progress value={78} />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Action Card</CardTitle>
                <CardDescription>
                  Card with embedded actions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">Manage your subscription and billing.</p>
                <Button className="w-full">Upgrade Plan</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Alerts and Feedback */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Alerts & Feedback</h2>
            <p className="text-muted-foreground mb-6">
              Alert components for user feedback and important messages.
            </p>
          </div>
          
          <div className="space-y-4">
            <Alert>
              <AlertDescription>
                This is a default alert message providing neutral information.
              </AlertDescription>
            </Alert>
            
            <Alert className="border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive">
              <AlertDescription>
                This is an error alert indicating something went wrong.
              </AlertDescription>
            </Alert>
            
            <Alert className="border-green-500/50 text-green-600 dark:border-green-500 [&>svg]:text-green-600">
              <AlertDescription>
                This is a success alert confirming a completed action.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Design Tokens Summary */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Design Tokens</h2>
            <p className="text-muted-foreground mb-6">
              Core design decisions codified as reusable values.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Border Radius</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Small</span>
                  <code className="bg-muted px-2 py-1 rounded text-sm">0.5rem</code>
                </div>
                <div className="flex items-center justify-between">
                  <span>Medium</span>
                  <code className="bg-muted px-2 py-1 rounded text-sm">0.625rem</code>
                </div>
                <div className="flex items-center justify-between">
                  <span>Large</span>
                  <code className="bg-muted px-2 py-1 rounded text-sm">0.75rem</code>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Touch Targets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Minimum</span>
                  <code className="bg-muted px-2 py-1 rounded text-sm">44px × 44px</code>
                </div>
                <div className="flex items-center justify-between">
                  <span>Comfortable</span>
                  <code className="bg-muted px-2 py-1 rounded text-sm">48px × 48px</code>
                </div>
                <div className="flex items-center justify-between">
                  <span>Large</span>
                  <code className="bg-muted px-2 py-1 rounded text-sm">56px × 56px</code>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}