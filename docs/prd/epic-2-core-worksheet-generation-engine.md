# Epic 2: Core Worksheet Generation Engine

**Epic Goal:** Implement the complete AI-powered worksheet generation system with advanced curriculum-aligned content generation, professional PDF output, comprehensive Topic/Subtopic taxonomy, and optimized two-column user interface that delivers 5-7 second generation times with 85%+ curriculum alignment satisfaction.

## Story 2.1: UK National Curriculum Topic Taxonomy

As a UK primary school teacher,
I want to select from comprehensive UK National Curriculum math topics and subtopics,
so that I can generate worksheets aligned with specific learning objectives for my year group.

**Acceptance Criteria:**
1. Topic dropdown includes all UK National Curriculum math domains: Number & Place Value, Addition & Subtraction, Multiplication & Division, Fractions, Measurement, Geometry, Statistics
2. Subtopic dropdown dynamically populates based on selected Topic and user's Year Group (from profile)
3. Year-appropriate subtopic filtering ensures teachers only see age-appropriate options
4. Topic/Subtopic combinations map to specific curriculum learning objectives
5. Dropdown selections persist during session for quick regeneration
6. Clear labeling indicates curriculum alignment (e.g., "Year 3 - Comparing Numbers")
7. Graceful handling when no subtopics exist for Topic/Year combination
8. Fast dropdown loading without API delays

## Story 2.2: Advanced AI Prompt Engineering System

As the system,
I want to generate highly curriculum-aligned worksheet content using sophisticated prompt engineering with personalized name integration,
so that teachers receive pedagogically appropriate and educationally sound worksheets with student names embedded in questions.

**Acceptance Criteria:**
1. Curriculum-specific prompt templates for each Topic/Subtopic/Year combination
2. Prompt engineering includes learning objective alignment, age-appropriate language, and progressive difficulty within worksheets
3. Name list integration seamlessly incorporates student names into word problems and contextual questions
4. Generated content follows UK educational formatting standards and terminology
5. Difficulty levels (Easy/Average/Hard) produce meaningful progression in problem complexity
6. Question types vary appropriately within each worksheet (e.g., word problems, calculations, visual problems)
7. Content avoids cultural bias and uses UK-specific contexts and terminology
8. Generated worksheets include clear instructions and example problems where appropriate
9. AI output consistently produces valid HTML structure for PDF conversion
10. Name integration maintains educational quality and curriculum alignment
11. Personalized questions feel natural and contextually appropriate for the math concepts

## Story 2.3: Professional PDF Generation & Formatting

As a UK primary school teacher,
I want to download professionally formatted PDF worksheets,
so that I can print and distribute high-quality materials in my classroom.

**Acceptance Criteria:**
1. HTML-to-PDF conversion maintains consistent formatting across all worksheet types
2. PDF output includes proper page margins, headers, and professional styling
3. Worksheet title includes curriculum alignment information (Year Group, Topic, Subtopic)
4. Generated PDFs are optimized for standard A4 printing
5. PDF formatting handles various question types (text, numbers, diagrams) appropriately
6. Page breaks occur naturally and avoid splitting questions inappropriately
7. PDF file naming convention includes timestamp and curriculum details for teacher organization
8. Download completes within 2-3 seconds after generation finishes
9. PDF quality remains consistent across different browsers and devices
10. Generated PDFs include space for student name and date fields

## Story 2.4: Optimized Two-Column Interface with Name List Management

As a UK primary school teacher,
I want an intuitive two-column worksheet generation interface with name list management,
so that I can efficiently configure personalized worksheets and manage student names during my limited planning time.

**Acceptance Criteria:**
1. Left column contains all configuration controls in logical vertical order: Topic, Subtopic, Worksheet Type, Question Count, Difficulty Level, Name List selection
2. Right column displays ads during generation, then worksheet preview after completion
3. Interface is fully responsive for desktop, laptop, and tablet usage
4. Name list dropdown shows default name list selected with option to choose from saved lists
5. "Create New Name List" button with info icon explaining names will be used in worksheet questions
6. Name list creation modal allows teachers to input student names for personalized worksheets
7. Generate/Regenerate button at bottom of configuration changes label based on state: "Generate" for new configurations, "Regenerate" when modifying existing
8. Download button appears only when right panel shows PDF preview, disappears when configuration changes
9. Configuration changes empty the preview section and show ads in right panel
10. Progress indicator shows generation status during 5-7 second AI processing
11. Preview area includes zoom functionality for detailed worksheet review
12. Clear visual separation between configuration and preview areas
13. Interface maintains state during regeneration (no flickering or layout shifts)
14. Quick access to user profile settings and usage counter in navigation
15. Configuration persistence loads user's last selections on login

## Story 2.5: Generation Performance Optimization

As a UK primary school teacher,
I want worksheets to generate in 5-7 seconds consistently,
so that I can quickly create multiple worksheets during my planning sessions.

**Acceptance Criteria:**
1. End-to-end generation time (click to PDF ready) consistently under 7 seconds
2. AI API calls optimized with efficient prompt structure and appropriate model selection
3. HTML-to-PDF conversion optimized for speed without sacrificing quality
4. Progress bar provides accurate time estimates and completion feedback
5. Concurrent generation requests handled gracefully without performance degradation
6. Error recovery mechanisms prevent infinite loading states
7. Generation performance monitored and logged for optimization
8. Caching strategies implemented where appropriate (prompt templates, static assets)
9. Fallback mechanisms for API timeouts or failures
10. Performance maintains consistency during peak usage times

## Story 2.6: Name List Management System

As a UK primary school teacher,
I want to create and manage lists of student names for personalized worksheet generation,
so that I can generate worksheets with my students' names included in the questions for better engagement.

**Acceptance Criteria:**
1. Name list creation interface allows teachers to input multiple student names
2. Default name list provided with common UK primary school names for immediate use
3. Teachers can create multiple name lists for different classes or groups
4. Name list selector dropdown in configuration panel shows all saved lists
5. Info icon next to name list creation explains how names will be integrated into worksheet questions
6. Name lists persist across sessions and are tied to user accounts
7. Edit functionality allows modification of existing name lists
8. Delete functionality for removing unused name lists with confirmation dialog
9. Name lists integrate seamlessly with AI prompt generation for personalized questions
10. Name validation ensures appropriate names for educational content
11. Import functionality for bulk name addition from CSV or text files
12. Name list management accessible from main interface and profile settings

## Story 2.7: Enhanced Worksheet Customization

As a UK primary school teacher,
I want additional customization options for worksheet generation,
so that I can create materials perfectly suited to my lesson plans and student needs.

**Acceptance Criteria:**
1. Question count selector expanded to include 5, 10, 15, 20, 25, 30 options
2. Worksheet format options: Problems only, Problems with answer sheet, Mixed practice
3. Additional difficulty granularity: Very Easy, Easy, Average, Hard, Very Hard
4. Optional worksheet instructions customization (brief teacher notes)
5. Layout options: Single column, Two column, Mixed layout based on question type
6. Font size options: Small, Medium, Large for different age groups and accessibility needs
7. Answer key generation option as separate PDF
8. Customization options respect curriculum requirements and don't compromise educational quality
9. Advanced options collapsible to maintain interface simplicity for basic users
10. Customization preferences saved per user session