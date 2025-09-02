"use client";

import React, { useState } from "react";
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ComponentExampleProps {
  title: string;
  description: string;
  code: string;
  children: React.ReactNode;
  props?: Array<{
    name: string;
    type: string;
    default?: string;
    description: string;
  }>;
}

function ComponentExample({ title, description, code, children, props }: ComponentExampleProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-6 border border-border rounded-lg bg-card">
          {children}
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowCode(!showCode)}
          >
            {showCode ? "Hide Code" : "Show Code"}
          </Button>
        </div>

        {showCode && (
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
                <code>{code}</code>
              </pre>
            </div>
            
            {props && (
              <div>
                <h4 className="font-medium mb-2">Props</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Type</th>
                        <th className="text-left p-2">Default</th>
                        <th className="text-left p-2">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.map((prop, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2 font-mono text-primary">{prop.name}</td>
                          <td className="p-2 font-mono text-muted-foreground">{prop.type}</td>
                          <td className="p-2 font-mono text-muted-foreground">{prop.default || "-"}</td>
                          <td className="p-2">{prop.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function ComponentLibraryPage() {
  const [toggleState, setToggleState] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Component Library</h1>
          <p className="text-xl text-muted-foreground">
            Interactive documentation for all UI components with usage examples and props.
          </p>
        </div>

        {/* Button Component */}
        <ComponentExample
          title="Button"
          description="Interactive button component with multiple variants and sizes."
          code={`<Button>Primary Button</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button size="lg">Large Button</Button>
<Button disabled>Disabled</Button>`}
          props={[
            { name: "variant", type: "&apos;default&apos; | &apos;secondary&apos; | &apos;outline&apos; | &apos;ghost&apos; | &apos;destructive&apos; | &apos;link&apos;", default: "&apos;default&apos;", description: "Visual style variant" },
            { name: "size", type: "&apos;default&apos; | &apos;sm&apos; | &apos;lg&apos; | &apos;icon&apos; | &apos;touch&apos;", default: "&apos;default&apos;", description: "Size variant for different contexts" },
            { name: "disabled", type: "boolean", default: "false", description: "Disable the button" },
            { name: "asChild", type: "boolean", default: "false", description: "Render as child component" }
          ]}
        >
          <div className="flex flex-wrap gap-4">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
            <Button size="touch">Touch Friendly</Button>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button disabled>Disabled</Button>
          </div>
        </ComponentExample>

        {/* Input Component */}
        <ComponentExample
          title="Input"
          description="Text input field with consistent styling and accessibility support."
          code={`<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input 
    id="email"
    type="email" 
    placeholder="Enter your email..."
    value={value}
    onChange={(e) => setValue(e.target.value)}
  />
</div>`}
          props={[
            { name: "type", type: "string", default: "&apos;text&apos;", description: "HTML input type" },
            { name: "placeholder", type: "string", description: "Placeholder text" },
            { name: "disabled", type: "boolean", default: "false", description: "Disable the input" },
            { name: "value", type: "string", description: "Controlled value" },
            { name: "onChange", type: "function", description: "Change event handler" }
          ]}
        >
          <div className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="demo-input-1">Email Address</Label>
              <Input 
                id="demo-input-1"
                type="email" 
                placeholder="Enter your email..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-input-2">Password</Label>
              <Input 
                id="demo-input-2"
                type="password" 
                placeholder="Enter password..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-input-3">Disabled Input</Label>
              <Input 
                id="demo-input-3"
                disabled 
                placeholder="This input is disabled"
              />
            </div>
          </div>
        </ComponentExample>

        {/* Select Component */}
        <ComponentExample
          title="Select"
          description="Dropdown select component with consistent styling."
          code={`<Select value={value} onValueChange={setValue}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>`}
          props={[
            { name: "value", type: "string", description: "Selected value" },
            { name: "onValueChange", type: "function", description: "Value change handler" },
            { name: "disabled", type: "boolean", default: "false", description: "Disable the select" },
            { name: "placeholder", type: "string", description: "Placeholder text" }
          ]}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Year Group</Label>
              <Select value={selectValue} onValueChange={setSelectValue}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select year group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reception">Reception</SelectItem>
                  <SelectItem value="year1">Year 1</SelectItem>
                  <SelectItem value="year2">Year 2</SelectItem>
                  <SelectItem value="year3">Year 3</SelectItem>
                  <SelectItem value="year4">Year 4</SelectItem>
                  <SelectItem value="year5">Year 5</SelectItem>
                  <SelectItem value="year6">Year 6</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </ComponentExample>

        {/* Card Component */}
        <ComponentExample
          title="Card"
          description="Container component for organizing related content."
          code={`<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>
      Card description provides context.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
</Card>`}
          props={[
            { name: "className", type: "string", description: "Additional CSS classes" }
          ]}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Card</CardTitle>
                <CardDescription>
                  A simple card with header and content sections.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This is the main content area of the card where you can place any information.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Statistics Card</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">1,234</div>
                <p className="text-sm text-muted-foreground">Worksheets Generated</p>
                <Progress value={78} className="mt-2" />
              </CardContent>
            </Card>
          </div>
        </ComponentExample>

        {/* Badge Component */}
        <ComponentExample
          title="Badge"
          description="Small status indicators and labels."
          code={`<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Outline</Badge>`}
          props={[
            { name: "variant", type: "&apos;default&apos; | &apos;secondary&apos; | &apos;destructive&apos; | &apos;outline&apos;", default: "&apos;default&apos;", description: "Visual style variant" }
          ]}
        >
          <div className="flex flex-wrap gap-2">
            <Badge>Free Plan</Badge>
            <Badge variant="secondary">Pro</Badge>
            <Badge variant="destructive">Expired</Badge>
            <Badge variant="outline">Draft</Badge>
          </div>
        </ComponentExample>

        {/* Progress Component */}
        <ComponentExample
          title="Progress"
          description="Progress bar for showing completion status."
          code={`<Progress value={progress} className="w-full" />`}
          props={[
            { name: "value", type: "number", description: "Progress value (0-100)" },
            { name: "className", type: "string", description: "Additional CSS classes" }
          ]}
        >
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Worksheet Generation</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="w-full" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Monthly Usage</span>
                <span>23/30</span>
              </div>
              <Progress value={77} className="w-full" />
            </div>
          </div>
        </ComponentExample>

        {/* Toggle Switch */}
        <ComponentExample
          title="Toggle Switch"
          description="Switch component for boolean settings."
          code={`<ToggleSwitch
  id="notifications"
  label="Enable notifications"
  checked={checked}
  onChange={setChecked}
/>`}
          props={[
            { name: "id", type: "string", description: "HTML ID for the input" },
            { name: "label", type: "string", description: "Label text" },
            { name: "checked", type: "boolean", description: "Checked state" },
            { name: "onChange", type: "function", description: "Change handler" },
            { name: "disabled", type: "boolean", default: "false", description: "Disable the switch" }
          ]}
        >
          <div className="space-y-4">
            <ToggleSwitch
              id="demo-toggle-1"
              label="Email notifications"
              checked={toggleState}
              onChange={setToggleState}
            />
            <ToggleSwitch
              id="demo-toggle-2"
              label="Marketing emails"
              checked={false}
              onChange={() => {}}
            />
            <ToggleSwitch
              id="demo-toggle-3"
              label="Disabled option"
              checked={false}
              onChange={() => {}}
            />
          </div>
        </ComponentExample>

        {/* Alert Component */}
        <ComponentExample
          title="Alert"
          description="Alert messages for user feedback."
          code={`<Alert>
  <AlertDescription>
    This is a default alert message.
  </AlertDescription>
</Alert>`}
          props={[
            { name: "className", type: "string", description: "Additional CSS classes for styling variants" }
          ]}
        >
          <div className="space-y-4">
            <Alert>
              <AlertDescription>
                This is a default alert providing neutral information to users.
              </AlertDescription>
            </Alert>
            
            <Alert className="border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive">
              <AlertDescription>
                This is an error alert indicating that something went wrong.
              </AlertDescription>
            </Alert>
            
            <Alert className="border-green-500/50 text-green-600 dark:border-green-500 [&>svg]:text-green-600">
              <AlertDescription>
                This is a success alert confirming that an action was completed.
              </AlertDescription>
            </Alert>
          </div>
        </ComponentExample>

        {/* Dialog Component */}
        <ComponentExample
          title="Dialog"
          description="Modal dialog for important interactions."
          code={`<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Dialog description explaining the content.
      </DialogDescription>
    </DialogHeader>
    <p>Dialog content goes here.</p>
  </DialogContent>
</Dialog>`}
        >
          <div className="space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Name List</DialogTitle>
                  <DialogDescription>
                    Add a new name list for personalizing your worksheets.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>List Name</Label>
                    <Input placeholder="Year 3 Class A" />
                  </div>
                  <div className="space-y-2">
                    <Label>Student Names</Label>
                    <Textarea placeholder="Emma, Oliver, Ava, George..." />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Create List</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Item</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the name list.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </ComponentExample>

        {/* Tooltip Component */}
        <ComponentExample
          title="Tooltip"
          description="Contextual information on hover or focus."
          code={`<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>This is a tooltip message</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`}
        >
          <TooltipProvider>
            <div className="flex space-x-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover for info</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This tooltip provides additional context</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge>Pro Plan</Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>£2.99/month • 90 worksheets • Ad-free</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </ComponentExample>

        {/* Responsive Behavior */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Responsive Behavior</h2>
            <p className="text-muted-foreground mb-6">
              All components are designed mobile-first with consistent responsive breakpoints.
            </p>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Breakpoints</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Screen Sizes</h4>
                    <ul className="space-y-1 text-sm">
                      <li><code className="bg-muted px-2 py-1 rounded">sm:</code> 640px and up</li>
                      <li><code className="bg-muted px-2 py-1 rounded">md:</code> 768px and up</li>
                      <li><code className="bg-muted px-2 py-1 rounded">lg:</code> 1024px and up</li>
                      <li><code className="bg-muted px-2 py-1 rounded">xl:</code> 1280px and up</li>
                      <li><code className="bg-muted px-2 py-1 rounded">2xl:</code> 1536px and up</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Touch Targets</h4>
                    <ul className="space-y-1 text-sm">
                      <li>Minimum: 44px × 44px</li>
                      <li>Comfortable: 48px × 48px</li>
                      <li>Large: 56px × 56px</li>
                    </ul>
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