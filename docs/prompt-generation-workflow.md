# Worksheet Configuration to Prompt Generation Workflow

## Overview

This document explains how worksheet configuration selections are transformed into LLM prompts and how the system controls the expected outcome of the Language Learning Model (LLM) in the worksheet generator.

## Architecture Flow

```
User Configuration → Unified Prompt Service → Gemini 2.5 Flash → HTML+SVG Output
```

## 1. Configuration Input Layer

### Basic Configuration
- **yearGroup**: `Reception`, `Year 1-6` (drives age-appropriate content)
- **topic**: `addition-subtraction`, `multiplication-division`, etc.
- **subtopic**: `problem-solving`, `mental-arithmetic`, etc.
- **difficulty**: `easy`, `average`, `hard`
- **questionCount**: Number of questions to generate
- **layout**: `standard`, `fluency`, `grid`, `differentiated`, `reasoning`

### Enhanced Configuration (USP.2)
- **visualTheme**: `animals`, `food`, `sports`, `space`, `standard`, `none`

## 2. Visual Theme Selection System (`enhanced-options.ts`)

Visual themes are applied only when explicitly selected by the user. If no theme is chosen, no visual theme context is added to the prompt.

### Available Visual Themes
```typescript
const VISUAL_THEME_OPTIONS: VisualThemeOption[] = [
  { value: 'animals', label: 'Animals', ageGroups: ['Reception', 'Year 1', 'Year 2', 'Year 3'] },
  { value: 'food', label: 'Food & Cooking', ageGroups: ['Reception', 'Year 1', 'Year 2', 'Year 3', 'Year 4'] },
  { value: 'sports', label: 'Sports & Games', ageGroups: ['Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6'] },
  { value: 'space', label: 'Space & Science', ageGroups: ['Year 4', 'Year 5', 'Year 6'] },
  { value: 'standard', label: 'Standard', ageGroups: ['Reception', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6'] },
  { value: 'none', label: 'No particular theme', ageGroups: ['Reception', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6'] }
]
```

### Contextual SVG Instructions (No Theme Selected)
When no theme is selected, the system provides contextual SVG instructions:
```typescript
getContextualSVGInstructions(): SVGInstructions {
  return {
    searchTerms: ['mathematical objects', 'educational icons', 'contextual illustrations', 'relevant objects'],
    sizingGuidelines: '30-50px height, maintain aspect ratio and visual consistency',
    arrangementInstructions: 'Choose SVG elements that directly relate to each question context (e.g., coins for money problems, shapes for geometry, objects for counting). Each question should have contextually relevant visual support.',
    qualityRequirements: 'Select clear, educational illustrations that enhance mathematical understanding and match the specific context of each problem'
  }
}
```


## 3. Unified Prompt Service (`promptService.ts`)

### Core Prompt Generation Process

#### Step 1: Configuration Enhancement
```typescript
createEnhancedConfig(config: WorksheetConfig): EnhancedPromptConfig {
  return {
    ...config,
    visualTheme: config.visualTheme // Keep as-is (undefined if not selected)
  }
}
```

#### Step 2: Curriculum Context Assembly
```typescript
getCurriculumContext(config) → {
  topic: config.topic,
  subtopic: config.subtopic,
  learningObjectives: [`${config.topic} understanding`],
  languageLevel: getLanguageLevel(config.yearGroup),
  progressionGuideline: 'Sequential skill development',
  mathFocus: config.topic,
  programmOfStudy: `Year ${config.yearGroup} mathematics`
}
```

#### Step 3: Theme Context Generation
```typescript
const themeContexts: Record<VisualTheme, string> = {
  'animals': 'Animal friends and nature scenarios that connect mathematical concepts to the natural world',
  'food': 'Cooking, sharing, and food-related contexts that make mathematical problems practical and relatable',
  'sports': 'Sports activities and team challenges that integrate mathematical problem-solving with physical activities',
  'space': 'Space exploration and cosmic adventures that inspire curiosity while teaching mathematical concepts',
  'standard': 'Everyday situations and real-world contexts that demonstrate the practical value of mathematics',
  'none': 'Mixed contexts and varied scenarios that demonstrate practical mathematics applications'
}
```

#### Step 4: SVG Instructions Specification
```typescript
const themeInstructions: Record<VisualTheme, SVGInstructions> = {
  'animals': {
    searchTerms: ['cartoon animals', 'cute pets', 'farm animals', 'zoo animals'],
    sizingGuidelines: '40-60px height, maintain aspect ratio',
    arrangementInstructions: 'Animals integrated with mathematical problems as counting objects or story elements',
    qualityRequirements: 'Clear, simple designs suitable for educational use'
  },
  'food': {
    searchTerms: ['fruits', 'vegetables', 'healthy food', 'kitchen items'],
    sizingGuidelines: '35-50px height, consistent sizing across food items',
    arrangementInstructions: 'Food items used for counting, fractions, or measurement problems',
    qualityRequirements: 'Colorful, recognizable food illustrations'
  }
  // ... other themes
}
```

## 4. Final Prompt Template Structure

### Core Prompt Assembly (`generateOptimalPrompt`)
```typescript
const prompt = `Create a ${config.yearGroup} ${config.topic} worksheet: "${config.subtopic}" (${config.difficulty} level, ${config.questionCount} questions).

**Requirements:**
- UK National Curriculum aligned
- Age-appropriate vocabulary with mathematical precision
- Use names: Emma, Oliver, Sophie, James, Lily, Thomas, Grace, Harry${themeContext ? `\n- Theme: ${themeContext}` : ''}

**Format:** Complete HTML${svgInstructions ? ` with embedded SVG icons (small, simple shapes from OpenClipart.org: ${svgInstructions.searchTerms.join(', ')})` : ''}.

**CRITICAL - HTML STRUCTURE MUST BE:**
<!DOCTYPE html>
<html>
<head>
    <title>${config.topic} - ${config.subtopic}</title>
    <style>
        body { font-family: Arial, sans-serif; font-size: ${accessibilityRequirements.fontRequirements.includes('16-18pt') ? '16pt' : '14pt'}; line-height: 1.6; margin: 20px; }
        .worksheet-header { text-align: center; margin-bottom: 20px; }
        .worksheet-content { margin: 20px 0; }
        .question { margin: 15px 0; }
        svg { width: 40px; height: 40px; vertical-align: middle; }
    </style>
</head>
<body>
    <div class="worksheet-header">
        <h1>${config.topic}: ${config.subtopic}</h1>
        <div class="student-info">Name: _____________ Date: _____________</div>
    </div>
    <div class="worksheet-content">
        [Generate exactly ${config.questionCount} questions here with embedded SVG elements]
    </div>
</body>
</html>

IMPORTANT: The HTML MUST contain these exact CSS classes: "worksheet-header" and "worksheet-content" or it will be rejected.`
```

## 5. LLM Configuration & Processing (`gemini.ts`)

### Gemini 2.5 Flash Configuration
```typescript
const model = genAI.getGenerativeModel({ 
  model: 'gemini-2.5-flash',
  generationConfig: {
    temperature: 0.7,        // Balanced creativity vs consistency
    maxOutputTokens: 16383,  // Reasonable limit for worksheet content
    topP: 0.8,              // Nucleus sampling
    topK: 40                // Top-k sampling
  }
})
```

### Retry Logic for Reliability
```typescript
async function callGeminiWithRetry(prompt: string, maxRetries: number = 3) {
  // Handles transient failures: 503, 502, 504, timeouts, network errors
  // Exponential backoff: 2^attempt seconds
  // Returns standardized errors for proper error handling
}
```

## 6. Output Validation & Quality Control

### HTML Structure Validation
```typescript
parseGeneratedContent(content, config, metadata) {
  // 1. Clean content (remove markdown formatting)
  // 2. Validate HTML structure (DOCTYPE, head, body)
  // 3. Count questions (match expected questionCount)
  // 4. Ensure required CSS classes present
  // 5. Return GeneratedWorksheet with metadata
}
```

### Quality Metrics Tracking
```typescript
interface IterativeImprovementMetadata {
  promptVersion: string              // Service version for tracking
  qualityScore: number              // Estimated quality (target ≥4.5)
  improvementCycle: number          // Iteration count
  enhancementsApplied: string[]     // Applied configuration options
  templateVariation: PromptVariation // Always 'optimal'
  visualTheme?: VisualTheme         // Selected theme (if any)
  generationTime: number            // Performance tracking
  targetQualityAchieved: boolean    // Quality threshold met
}
```

## 7. Control Mechanisms for LLM Output

### 1. Structural Controls
- **Fixed HTML template** ensures consistent output format
- **Required CSS classes** for reliable parsing
- **Explicit question count** prevents over/under generation

### 2. Content Controls
- **Theme context** guides scenario selection and SVG integration

### 3. Quality Controls
- **Age-appropriate vocabulary** based on year group
- **UK National Curriculum alignment** for educational accuracy
- **Accessibility requirements** for font sizes and contrast

### 4. Visual Controls
- **SVG search terms** specify appropriate visual elements
- **Sizing guidelines** ensure consistent visual presentation
- **Arrangement instructions** integrate visuals with mathematical content

## 8. Refinement Opportunities

### To Improve LLM Outcomes, Modify:

1. **Theme Context Descriptions** (`promptService.ts:356`)
   - Enhance scenario descriptions for better context generation
   - Add specific mathematical integration instructions

2. **SVG Instructions** (`promptService.ts:274`)
   - Refine search terms for better visual selection
   - Adjust sizing and placement guidelines

3. **Core Prompt Template** (`promptService.ts:182`)
   - Strengthen structural requirements
   - Add quality criteria for educational content

4. **Quality Requirements**
   - Define specific educational standards
   - Add accessibility and inclusion guidelines

### Iterative Improvement Process
1. **Track Quality Metrics**: Monitor generated worksheet quality scores
2. **Analyze Patterns**: Identify configuration combinations that produce best results
3. **Refine Prompts**: Update prompt templates based on performance data
4. **A/B Test**: Compare different prompt variations systematically

## 9. Complete Workflow Example

Let's trace through a real example using typical user interface inputs:

### **User Interface Configuration:**
- **Worksheet Layout**: Standard Questions
- **Year Group**: Year 3 (Ages 7-8)  
- **Topic**: Addition and Subtraction
- **Subtopic**: Problem Solving
- **Difficulty Level**: Average (selected)
- **Number of Questions**: 5
- **Visual Theme**: "Choose visual theme" (no theme selected)
- **Student Name List**: No specific list selected

### **Step-by-Step Processing:**

#### **1. Configuration Processing (`route.ts:33-107`)**
```typescript
const config: WorksheetConfig = {
  layout: 'standard',           // From "Standard Questions"
  topic: 'addition-subtraction', // From "Addition and Subtraction"  
  subtopic: 'problem-solving',   // From "Problem Solving"
  difficulty: 'average',         // User selected "Average"
  questionCount: 5,              // From slider
  yearGroup: 'Year 3',          // From dropdown
  studentNames: ['Emma', 'Oliver', 'Sophie', 'James', 'Lily', 'Thomas', 'Grace', 'Harry'], // Generic fallback
  visualTheme: undefined         // No theme selected
}
```

#### **2. Theme & SVG Processing**
```typescript
const shouldApplyTheme = config.visualTheme && config.visualTheme !== 'none'
// shouldApplyTheme = false (because visualTheme is undefined)

// Always get SVG instructions - either themed or contextual
const svgInstructions = shouldApplyTheme && config.visualTheme 
  ? this.getSVGInstructions(config.visualTheme)      // Themed SVGs
  : this.getContextualSVGInstructions()              // Contextual SVGs

// Result: Contextual SVG instructions
svgInstructions = {
  searchTerms: ['mathematical objects', 'educational icons', 'contextual illustrations', 'relevant objects'],
  sizingGuidelines: '30-50px height, maintain aspect ratio and visual consistency',
  arrangementInstructions: 'Choose SVG elements that directly relate to each question context (e.g., coins for money problems, shapes for geometry, objects for counting). Each question should have contextually relevant visual support.',
  qualityRequirements: 'Select clear, educational illustrations that enhance mathematical understanding and match the specific context of each problem'
}
```

#### **3. Enhanced Configuration (`promptService.ts:138-142`)**
```typescript
const enhancedConfig: EnhancedPromptConfig = {
  layout: 'standard',
  topic: 'addition-subtraction',
  subtopic: 'problem-solving', 
  difficulty: 'average',
  questionCount: 5,
  yearGroup: 'Year 3',
  studentNames: ['Emma', 'Oliver', 'Sophie', 'James', 'Lily', 'Thomas', 'Grace', 'Harry'],
  visualTheme: undefined  // Keep original (no theme selected)
}
```

#### **4. Curriculum Context Assembly**
```typescript
getCurriculumContext(config) → {
  topic: 'addition-subtraction',
  subtopic: 'problem-solving',
  learningObjectives: ['Addition and subtraction understanding'],
  languageLevel: 'Age-appropriate vocabulary with mathematical precision', // Year 3 level
  progressionGuideline: 'Sequential skill development',
  mathFocus: 'addition-subtraction',
  programmOfStudy: 'Year Year 3 mathematics'
}
```

#### **5. Accessibility Requirements**
```typescript
getAccessibilityRequirements('Year 3') → {
  fontRequirements: 'Professional fonts (14-16pt) with excellent readability'  // Year 3+ standard
}
```

#### **6. Final Prompt Generation**
```
Create a Year 3 addition-subtraction worksheet: "problem-solving" (average level, 5 questions).

**Requirements:**
- UK National Curriculum aligned
- Age-appropriate vocabulary with mathematical precision
- Use names: Emma, Oliver, Sophie, James, Lily, Thomas, Grace, Harry

**Format:** Complete HTML with embedded SVG icons (mathematical objects, educational icons, contextual illustrations, relevant objects).

**SVG Instructions:**
- Choose SVG elements that directly relate to each question context (e.g., coins for money problems, shapes for geometry, objects for counting). Each question should have contextually relevant visual support.
- 30-50px height, maintain aspect ratio and visual consistency
- Select clear, educational illustrations that enhance mathematical understanding and match the specific context of each problem

**CRITICAL - HTML STRUCTURE MUST BE:**
<!DOCTYPE html>
<html>
<head>
    <title>addition-subtraction - problem-solving</title>
    <style>
        body { font-family: Arial, sans-serif; font-size: 14pt; line-height: 1.6; margin: 20px; }
        .worksheet-header { text-align: center; margin-bottom: 20px; }
        .worksheet-content { margin: 20px 0; }
        .question { margin: 15px 0; }
        svg { width: 40px; height: 40px; vertical-align: middle; }
    </style>
</head>
<body>
    <div class="worksheet-header">
        <h1>addition-subtraction: problem-solving</h1>
        <div class="student-info">Name: _____________ Date: _____________</div>
    </div>
    <div class="worksheet-content">
        [Generate exactly 5 questions here with embedded SVG elements]
    </div>
</body>
</html>

IMPORTANT: The HTML MUST contain these exact CSS classes: "worksheet-header" and "worksheet-content" or it will be rejected.
```

#### **7. LLM Processing**
**Gemini 2.5 Flash Configuration:**
- `temperature: 0.7` (balanced creativity)
- `maxOutputTokens: 16383`
- Retry logic for reliability

#### **8. Expected LLM Output (Now With Contextual SVGs)**
```html
<!DOCTYPE html>
<html>
<head>
    <title>addition-subtraction - problem-solving</title>
    <style>
        body { font-family: Arial, sans-serif; font-size: 14pt; line-height: 1.6; margin: 20px; }
        .worksheet-header { text-align: center; margin-bottom: 20px; }
        .worksheet-content { margin: 20px 0; }
        .question { margin: 15px 0; }
        svg { width: 40px; height: 40px; vertical-align: middle; }
    </style>
</head>
<body>
    <div class="worksheet-header">
        <h1>Addition and Subtraction: Problem Solving</h1>
        <div class="student-info">Name: _____________ Date: _____________</div>
    </div>
    <div class="worksheet-content">
        <div class="question">1. Emma has 24 <svg><!-- sticker icon --></svg> stickers. She gives 7 to Oliver and 5 to Sophie. How many stickers does Emma have left?</div>
        <div class="question">2. James collected 18 <svg><!-- conker/acorn icon --></svg> conkers. Thomas found 9 more conkers in the playground. How many conkers do they have altogether?</div>
        <div class="question">3. Grace had 35 <svg><!-- marble icon --></svg> marbles. She lost 12 marbles during playtime. How many marbles does Grace have now?</div>
        <div class="question">4. Harry bought 3 packs of <svg><!-- card pack icon --></svg> trading cards. Each pack has 8 cards. How many trading cards does Harry have in total?</div>
        <div class="question">5. Lily had 42 <svg><!-- pencil icon --></svg> pencils. She gave equal amounts to 6 friends. How many pencils did each friend receive?</div>
    </div>
</body>
</html>
```

#### **9. Performance Logging**
Console output would show:
```
Unified PromptService worksheet generated in 15000ms {
  topic: 'addition-subtraction',
  subtopic: 'problem-solving',
  yearGroup: 'Year 3',
  enhancedSystem: false  // No visual theme selected
}
```

### **Key Points for This Configuration:**

1. **No Visual Theme**: Since no theme was selected (`visualTheme: undefined`), no theme context is added, but the system still provides contextual SVG instructions for educational enhancement
2. **Contextual SVG Selection**: LLM chooses appropriate SVGs based on question content (stickers for sticker problems, pencils for pencil problems, etc.)
3. **Year 3 Appropriate**: Language complexity and font size are set for ages 7-8
4. **Problem Solving Focus**: Questions will be word problems requiring multi-step thinking
5. **Average Difficulty**: Balanced between simple and challenging for Year 3 level
6. **Standard Layout**: Traditional worksheet format with consistent question spacing
7. **No Smart Defaults**: The system does NOT apply any automatic theme selection - user choice is respected
8. **Enhanced Visual Learning**: Every question gets relevant visual support without thematic bias

## 10. Additional Configuration Impact Examples

### Example 1: Reception Animals Theme (Themed)
```
Input: yearGroup="Reception", visualTheme="animals"
→ Theme context: "Animal friends and nature scenarios..."
→ SVG instructions: ['cartoon animals', 'cute pets', 'farm animals', 'zoo animals']
→ SVG arrangement: "Animals integrated with mathematical problems as counting objects"
→ Output: Simple counting problems with consistent animal theme throughout
```

### Example 2: Year 4 Sports Theme (Themed)
```
Input: yearGroup="Year 4", visualTheme="sports"
→ Theme context: "Sports activities and team challenges..."
→ SVG instructions: ['sports equipment', 'balls', 'athletic gear', 'playground']
→ SVG arrangement: "Sports items for counting, scoring, or measurement exercises"
→ Output: Math problems with sports contexts and consistent sports visuals
```

### Example 3: Year 6 No Theme (Contextual)
```
Input: yearGroup="Year 6", visualTheme=undefined
→ Theme context: None
→ SVG instructions: ['mathematical objects', 'educational icons', 'contextual illustrations', 'relevant objects']
→ SVG arrangement: "Choose SVG elements that directly relate to each question context"
→ Output: Advanced math problems with contextually relevant visuals per question
```

### Example 4: Year 3 Money Problems (Contextual)
```
Input: yearGroup="Year 3", topic="money", visualTheme=undefined
→ LLM contextual choice: Coin and money-related SVGs for money problems
→ LLM contextual choice: Shopping-related icons for purchase problems
→ LLM contextual choice: Mathematical symbols for calculation steps
→ Output: Each question gets visuals that match its specific mathematical context
```

## Key Behavioral Changes

### SVG Instructions Always Included
**Current Behavior**: SVG instructions are ALWAYS provided to the LLM, regardless of theme selection:

| Theme Selection | SVG Instructions | Result |
|-----------------|------------------|---------|
| **Specific Theme** (animals, food, sports, space) | Theme-specific SVG terms and contexts | Consistent themed visuals throughout worksheet |
| **No Theme** (`undefined` or 'none') | Contextual SVG instructions | LLM chooses appropriate visuals per question context |

### No Smart Defaults Applied
**Current Behavior**: The system completely respects user choice:
- ❌ **No automatic theme assignment** based on year group
- ❌ **No smart defaults** overriding user selection  
- ✅ **Complete user control** over visual theming
- ✅ **Contextual enhancement** when no theme is chosen

### Enhanced Educational Value
**Result**: Every generated worksheet now includes visual elements that enhance mathematical understanding, either through:
1. **Thematic consistency** (when theme selected) - reinforces theme throughout
2. **Contextual relevance** (when no theme) - each question gets appropriate visual support

## Conclusion

The worksheet generation system provides granular control over LLM output through a sophisticated configuration-to-prompt transformation process. The system now ensures every worksheet includes appropriate visual elements while completely respecting user theme preferences. By understanding these control mechanisms, you can refine prompts to achieve more precise educational outcomes and improve the quality of generated worksheets.