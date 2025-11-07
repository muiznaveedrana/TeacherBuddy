"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function DevelopmentGuidelinesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Development Guidelines</h1>
          <p className="text-xl text-muted-foreground">
            Technical standards, conventions, and best practices for WorksheetGenerator.AI
          </p>
        </div>

        {/* CSS/Tailwind Conventions */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">CSS & Tailwind Conventions</h2>
            <p className="text-muted-foreground mb-6">
              Consistent styling approach using Tailwind CSS utility classes.
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Utility Class Organization</CardTitle>
                <CardDescription>
                  Recommended order and grouping for Tailwind classes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Recommended Class Order:</h4>
                    <ol className="text-sm space-y-1 list-decimal list-inside">
                      <li><strong>Layout:</strong> display, position, top/right/bottom/left</li>
                      <li><strong>Flexbox/Grid:</strong> flex, grid, justify, align, gap</li>
                      <li><strong>Sizing:</strong> width, height, min/max dimensions</li>
                      <li><strong>Spacing:</strong> margin, padding</li>
                      <li><strong>Typography:</strong> font, text, leading, tracking</li>
                      <li><strong>Visual:</strong> background, border, shadow, opacity</li>
                      <li><strong>Interactive:</strong> transition, transform, hover, focus</li>
                    </ol>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Example (Good):</h4>
                    <div className="p-3 bg-muted rounded font-mono text-sm overflow-x-auto">
                      className=&quot;flex items-center justify-between w-full p-4 text-sm font-medium bg-card border border-border rounded-lg shadow-sm hover:bg-accent focus:ring-2 focus:ring-primary&quot;
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Example (Poor):</h4>
                    <div className="p-3 bg-muted rounded font-mono text-sm overflow-x-auto">
                      className=&quot;hover:bg-accent p-4 bg-card text-sm border-border w-full border flex font-medium rounded-lg shadow-sm items-center justify-between focus:ring-primary focus:ring-2&quot;
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Responsive Design Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Breakpoint Usage</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium mb-2">Mobile-First Approach</h5>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Base styles: mobile (no prefix)</li>
                          <li>• <code>sm:</code> 640px+ (large phones)</li>
                          <li>• <code>md:</code> 768px+ (tablets)</li>
                          <li>• <code>lg:</code> 1024px+ (laptops)</li>
                          <li>• <code>xl:</code> 1280px+ (desktops)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Common Patterns</h5>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• <code>grid-cols-1 md:grid-cols-2</code></li>
                          <li>• <code>flex-col md:flex-row</code></li>
                          <li>• <code>text-sm md:text-base</code></li>
                          <li>• <code>px-4 md:px-6 lg:px-8</code></li>
                          <li>• <code>space-y-4 md:space-y-6</code></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Alert>
                    <AlertDescription>
                      <strong>Mobile-First Rule:</strong> Always design for mobile first, then enhance 
                      for larger screens. This ensures the best experience across all devices.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom CSS Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert className="border-yellow-500/50 text-yellow-600 dark:border-yellow-500 [&>svg]:text-yellow-600">
                    <AlertDescription>
                      <strong>Prefer Tailwind:</strong> Use utility classes whenever possible. Only write 
                      custom CSS for complex animations, unique layouts, or when utilities aren&apos;t sufficient.
                    </AlertDescription>
                  </Alert>

                  <div>
                    <h4 className="font-medium mb-2">When to Use Custom CSS:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Complex keyframe animations</li>
                      <li>• CSS Grid layouts with specific track sizing</li>
                      <li>• Third-party library integration</li>
                      <li>• Print media styles</li>
                      <li>• Browser-specific workarounds</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Custom CSS Structure:</h4>
                    <div className="p-3 bg-muted rounded font-mono text-sm">
                      <div>/src/styles/</div>
                      <div>&nbsp;&nbsp;globals.css</div>
                      <div>&nbsp;&nbsp;components.css</div>
                      <div>&nbsp;&nbsp;utilities.css</div>
                      <div>&nbsp;&nbsp;print.css</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Component Naming Standards */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Component Naming Standards</h2>
            <p className="text-muted-foreground mb-6">
              Consistent naming conventions for components, files, and exports.
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>File and Component Naming</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3 text-green-600">✓ Correct Naming</h4>
                      <div className="space-y-2 text-sm">
                        <div><strong>Components:</strong> <code>PascalCase</code></div>
                        <ul className="ml-4 space-y-1 text-muted-foreground">
                          <li>• WorksheetGenerator.tsx</li>
                          <li>• ConfigurationPanel.tsx</li>
                          <li>• SubscriptionCard.tsx</li>
                        </ul>
                        
                        <div><strong>Hooks:</strong> <code>camelCase</code> with <code>use</code> prefix</div>
                        <ul className="ml-4 space-y-1 text-muted-foreground">
                          <li>• useWorksheetGeneration.ts</li>
                          <li>• useSubscriptionStatus.ts</li>
                          <li>• useNameLists.ts</li>
                        </ul>

                        <div><strong>Utils:</strong> <code>camelCase</code></div>
                        <ul className="ml-4 space-y-1 text-muted-foreground">
                          <li>• formatCurrency.ts</li>
                          <li>• validateInput.ts</li>
                          <li>• generateWorksheet.ts</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3 text-destructive">✗ Incorrect Naming</h4>
                      <div className="space-y-2 text-sm">
                        <div><strong>Avoid:</strong></div>
                        <ul className="ml-4 space-y-1 text-muted-foreground">
                          <li>• worksheetGenerator.tsx (camelCase)</li>
                          <li>• worksheet-generator.tsx (kebab-case)</li>
                          <li>• WORKSHEET_GENERATOR.tsx (SCREAMING_CASE)</li>
                          <li>• generateWorksheetHook.ts (incorrect hook naming)</li>
                          <li>• utils.ts (too generic)</li>
                          <li>• index.tsx (when specific name is better)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Directory Structure</h4>
                    <div className="p-3 bg-muted rounded font-mono text-xs">
                      <div>/src/components/</div>
                      <div>&nbsp;&nbsp;/ui/              # shadcn/ui components</div>
                      <div>&nbsp;&nbsp;/worksheet/       # Feature-specific components</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;WorksheetGenerator.tsx</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;ConfigurationPanel.tsx</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;PreviewPanel.tsx</div>
                      <div>&nbsp;&nbsp;/subscription/    # Subscription components</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;SubscriptionCard.tsx</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;UsageTracker.tsx</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Export Conventions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Default Exports (Preferred)</h4>
                      <div className="p-3 bg-muted rounded text-sm">
                        <div className="font-mono">
                          {/* WorksheetGenerator.tsx */}<br/>
                          export default function WorksheetGenerator() {"{"}<br/>
                          &nbsp;&nbsp;return &lt;div&gt;...&lt;/div&gt;<br/>
                          {"}"}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Use for main component exports and pages
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Named Exports</h4>
                      <div className="p-3 bg-muted rounded text-sm">
                        <div className="font-mono">
                          {/* utils.ts */}<br/>
                          export const formatCurrency = (amount: number) =&gt; {"..."}<br/>
                          export const validateEmail = (email: string) =&gt; {"..."}<br/>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Use for utilities, types, and multiple exports
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Index Files</h4>
                    <div className="p-3 bg-muted rounded text-sm">
                      <div className="font-mono">
                        {/* /components/worksheet/index.ts */}<br/>
                        export {"{ default as WorksheetGenerator }"} from &apos;./WorksheetGenerator&apos;<br/>
                        export {"{ default as ConfigurationPanel }"} from &apos;./ConfigurationPanel&apos;<br/>
                        export {"{ default as PreviewPanel }"} from &apos;./PreviewPanel&apos;
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Use sparingly, only for clean API boundaries
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* File Organization */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">File Organization Structure</h2>
            <p className="text-muted-foreground mb-6">
              Logical file organization for maintainable codebase structure.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Project Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="p-4 bg-muted rounded-lg font-mono text-xs">
                  <div>/src/</div>
                  <div>&nbsp;&nbsp;/app/                    # Next.js App Router</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;layout.tsx</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;page.tsx</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;/create/</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;/subscription/</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;/api/</div>
                  <div>&nbsp;&nbsp;/components/             # Reusable components</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;/ui/                   # Base UI components (shadcn)</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;/worksheet/            # Feature components</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;/subscription/</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;/layout/</div>
                  <div>&nbsp;&nbsp;/lib/                    # Shared utilities</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;/types/                # TypeScript definitions</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;/services/             # Business logic</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;/hooks/                # Custom React hooks</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;/utils/                # Helper functions</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;/stores/               # State management</div>
                  <div>&nbsp;&nbsp;/styles/                 # Global styles</div>
                  <div>&nbsp;&nbsp;/tests/                  # Test files</div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Organization Principles</h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Feature-based grouping:</strong> Group related components by feature/domain</li>
                    <li><strong>Shallow hierarchies:</strong> Avoid deep nesting (max 3-4 levels)</li>
                    <li><strong>Clear separation:</strong> Separate UI components from business logic</li>
                    <li><strong>Consistent naming:</strong> Use consistent patterns across directories</li>
                    <li><strong>Co-location:</strong> Keep related files close together</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Testing Requirements */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Testing Requirements</h2>
            <p className="text-muted-foreground mb-6">
              Comprehensive testing strategy for reliable application development.
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Testing Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Unit Tests</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Individual components</li>
                        <li>• Utility functions</li>
                        <li>• Custom hooks</li>
                        <li>• Business logic</li>
                      </ul>
                      <div className="mt-2 p-2 bg-muted rounded text-xs">
                        <strong>Tool:</strong> Vitest + React Testing Library
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Integration Tests</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Component interactions</li>
                        <li>• API integration</li>
                        <li>• State management</li>
                        <li>• User workflows</li>
                      </ul>
                      <div className="mt-2 p-2 bg-muted rounded text-xs">
                        <strong>Tool:</strong> Vitest + MSW
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">E2E Tests</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Critical user paths</li>
                        <li>• Authentication flows</li>
                        <li>• Payment processes</li>
                        <li>• Cross-browser testing</li>
                      </ul>
                      <div className="mt-2 p-2 bg-muted rounded text-xs">
                        <strong>Tool:</strong> Playwright
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Test File Naming</h4>
                    <div className="p-3 bg-muted rounded font-mono text-sm">
                      <div>ComponentName.test.tsx        # Unit tests</div>
                      <div>ComponentName.integration.test.tsx  # Integration tests</div>
                      <div>workflow-name.e2e.test.ts    # E2E tests</div>
                      <div>utils.test.ts                # Utility tests</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Testing Best Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3 text-green-600">✓ Do</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Test user behavior, not implementation</li>
                        <li>• Use descriptive test names</li>
                        <li>• Follow AAA pattern (Arrange, Act, Assert)</li>
                        <li>• Mock external dependencies</li>
                        <li>• Test error states and edge cases</li>
                        <li>• Maintain good test coverage (80%+)</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3 text-destructive">✗ Don&apos;t</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Test implementation details</li>
                        <li>• Write overly complex tests</li>
                        <li>• Share state between tests</li>
                        <li>• Skip accessibility testing</li>
                        <li>• Ignore flaky tests</li>
                        <li>• Test third-party library functionality</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Example Test Structure</h4>
                    <div className="p-3 bg-muted rounded text-sm font-mono">
                      <div>describe(&apos;WorksheetGenerator&apos;, () =&gt; {"{"}</div>
                      <div>&nbsp;&nbsp;it(&apos;should generate worksheet when form is submitted&apos;, () =&gt; {"{"}</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;// Arrange</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;render(&lt;WorksheetGenerator /&gt;)</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;// Act</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;fireEvent.click(screen.getByRole(&apos;button&apos;, {"{ name: /generate/i }"}))</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;// Assert</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;expect(screen.getByText(/generating/i)).toBeInTheDocument()</div>
                      <div>&nbsp;&nbsp;{"}"})</div>
                      <div>{"}"})</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Code Quality Standards */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Code Quality Standards</h2>
            <p className="text-muted-foreground mb-6">
              Maintaining high code quality through linting, formatting, and review processes.
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Linting & Formatting</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">ESLint Configuration</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• @next/eslint-config-next</li>
                        <li>• @typescript-eslint/recommended</li>
                        <li>• eslint-plugin-react-hooks</li>
                        <li>• eslint-plugin-jsx-a11y</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Prettier Configuration</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• 2-space indentation</li>
                        <li>• Single quotes for strings</li>
                        <li>• Trailing commas (es5)</li>
                        <li>• 80 character line width</li>
                      </ul>
                    </div>
                  </div>

                  <Alert>
                    <AlertDescription>
                      <strong>Pre-commit hooks:</strong> Use Husky and lint-staged to automatically 
                      run linting and formatting before commits. This ensures consistent code quality.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>TypeScript Standards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Type Definition Guidelines</h4>
                    <div className="p-3 bg-muted rounded text-sm font-mono">
                      <div>{/* Good: Descriptive interface names */}</div>
                      <div>interface WorksheetGenerationConfig {"{"}</div>
                      <div>&nbsp;&nbsp;topic: string</div>
                      <div>&nbsp;&nbsp;difficulty: &apos;easy&apos; | &apos;medium&apos; | &apos;hard&apos;</div>
                      <div>&nbsp;&nbsp;questionCount: number</div>
                      <div>&nbsp;&nbsp;nameListId?: string</div>
                      <div>{"}"}</div>
                      <br/>
                      <div>{/* Good: Component prop types */}</div>
                      <div>interface ButtonProps extends HTMLButtonElement {"{"}</div>
                      <div>&nbsp;&nbsp;variant?: &apos;primary&apos; | &apos;secondary&apos;</div>
                      <div>&nbsp;&nbsp;size?: &apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;</div>
                      <div>&nbsp;&nbsp;loading?: boolean</div>
                      <div>{"}"}</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Type Safety Rules</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Use strict TypeScript configuration</li>
                      <li>• Avoid <code>any</code> type (use <code>unknown</code> if needed)</li>
                      <li>• Define interfaces for all API responses</li>
                      <li>• Use type assertions sparingly and with type guards</li>
                      <li>• Prefer union types over enums for string constants</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Performance Guidelines */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Performance Guidelines</h2>
            <p className="text-muted-foreground mb-6">
              Optimizing application performance for the best user experience.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>React Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 text-green-600">✓ Optimize</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Use React.memo for expensive components</li>
                      <li>• Implement useMemo for heavy calculations</li>
                      <li>• Use useCallback for stable function references</li>
                      <li>• Lazy load routes and heavy components</li>
                      <li>• Optimize images with Next.js Image component</li>
                      <li>• Minimize bundle size with tree shaking</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 text-destructive">✗ Avoid</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Inline object/function creation in JSX</li>
                      <li>• Unnecessary re-renders</li>
                      <li>• Large bundle sizes</li>
                      <li>• Blocking the main thread</li>
                      <li>• Excessive API calls</li>
                      <li>• Memory leaks in useEffect</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Performance Monitoring</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Use Lighthouse for performance audits</li>
                    <li>• Monitor Core Web Vitals (LCP, FID, CLS)</li>
                    <li>• Set performance budgets</li>
                    <li>• Use React DevTools Profiler</li>
                    <li>• Monitor bundle analyzer reports</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Deployment & CI/CD */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Deployment & CI/CD</h2>
            <p className="text-muted-foreground mb-6">
              Automated deployment and continuous integration processes.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>GitHub Actions Workflow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-muted rounded text-sm">
                  <div className="font-medium mb-2">Automated Checks on PR:</div>
                  <ul className="space-y-1">
                    <li>• TypeScript compilation</li>
                    <li>• ESLint validation</li>
                    <li>• Prettier formatting check</li>
                    <li>• Unit and integration tests</li>
                    <li>• Build verification</li>
                    <li>• Accessibility audit</li>
                  </ul>
                </div>

                <div className="p-3 bg-muted rounded text-sm">
                  <div className="font-medium mb-2">Deployment Process:</div>
                  <ol className="space-y-1 list-decimal list-inside">
                    <li>PR review and approval required</li>
                    <li>Merge to main branch</li>
                    <li>Automatic deployment to Vercel</li>
                    <li>Smoke tests on production</li>
                    <li>Rollback capability if issues detected</li>
                  </ol>
                </div>

                <Alert>
                  <AlertDescription>
                    <strong>Quality Gates:</strong> All checks must pass before deployment. 
                    No exceptions for critical path functionality.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}