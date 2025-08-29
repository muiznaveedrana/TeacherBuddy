# Epic 2: Core Worksheet Generation Engine

**Epic Goal:** Integrate the AI-powered worksheet generation system with the Epic 0 UI components, replacing mock worksheet generation with real Google Gemini API integration, curriculum-aligned content generation, professional PDF output, and optimized performance that delivers 5-7 second generation times with 85%+ curriculum alignment satisfaction.

## Story 2.1: Curriculum Data Integration with Epic 0 Interface

As a UK primary school teacher,
I want to select from real UK National Curriculum math topics using the Epic 0 interface,
so that I can generate worksheets aligned with specific learning objectives for my year group.

**Acceptance Criteria:**
1. Replace mock dropdown options from Epic 0 with real UK National Curriculum data
2. Topic dropdown populated with real curriculum domains: Number & Place Value, Addition & Subtraction, Multiplication & Division, Fractions, Measurement, Geometry, Statistics
3. Subtopic dropdown dynamically populated based on selected Topic and user's Year Group from real profile data
4. Maintain Epic 0 UI design while adding real curriculum data integration
5. Year-appropriate subtopic filtering using real curriculum alignment data
6. Topic/Subtopic combinations map to specific learning objectives in database
7. Dropdown selections persist using real user profile persistence from Epic 1
8. Clear labeling with real curriculum alignment indicators (e.g., "Year 3 - Comparing Numbers")
9. Performance optimization for fast dropdown loading with real data
10. Error handling for curriculum data loading failures

## Story 2.2: Google Gemini API Integration with Name List System

As the system,
I want to replace Epic 0 mock worksheet generation with real Google Gemini API integration,
so that teachers receive real curriculum-aligned worksheets with personalized student names.

**Acceptance Criteria:**
1. Replace Epic 0 mock generation progress with real Google Gemini API calls
2. Integrate real name list data from Epic 0/Epic 1 name list management system
3. Curriculum-specific prompt templates for each Topic/Subtopic/Year combination using real curriculum data
4. Prompt engineering includes learning objective alignment, age-appropriate language, and progressive difficulty
5. Real name list integration incorporates actual student names into word problems and questions
6. Generated content follows UK educational formatting standards and terminology
7. Difficulty levels (Easy/Average/Hard) produce real progression in problem complexity
8. AI output produces valid HTML structure for PDF conversion pipeline
9. Real error handling replacing Epic 0 mock error states
10. Performance optimization to maintain Epic 0's target 5-7 second generation time
11. Integration with real usage tracking system from Epic 1

## Story 2.3: Real PDF Generation Pipeline Integration

As a UK primary school teacher,
I want to download real professionally formatted PDF worksheets using the Epic 0 interface,
so that I can print and distribute high-quality materials in my classroom.

**Acceptance Criteria:**
1. Replace Epic 0 mock PDF preview with real HTML-to-PDF conversion using Puppeteer
2. Maintain Epic 0 download button functionality with real PDF generation
3. Real PDF output includes proper page margins, headers, and professional styling
4. Integration with real worksheet content from Google Gemini API
5. PDF formatting handles real generated question types appropriately
6. Real file storage integration with Supabase Storage for generated PDFs
7. Real PDF file naming convention includes timestamp and curriculum details
8. Download functionality works within Epic 0's 2-3 second target after generation
9. Real PDF quality maintained across different browsers and devices
10. Integration with usage tracking - increment counters on successful PDF generation
11. Error handling for PDF generation failures with user-friendly messages

## Story 2.4: Real Name List System Integration

As a UK primary school teacher,
I want the Epic 0 name list management interface to work with real data and integrate with worksheet generation,
so that I can create personalized worksheets using my actual student names.

**Acceptance Criteria:**
1. Replace Epic 0 mock name lists with real database integration from Epic 1
2. Maintain Epic 0 name list creation modal interface with real data persistence
3. Real name list dropdown populated with user's actual saved name lists
4. Integration between real name list selection and worksheet generation process
5. Real name list creation, editing, and deletion functionality
6. Real bulk import functionality for CSV/text files with name lists
7. Integration with Epic 2 AI prompt system for personalized question generation
8. Real validation for name list requirements and appropriate names
9. Maintain Epic 0 UI design and user experience while adding real functionality
10. Real persistence of name list selections in user profile
11. Error handling for name list operations with user-friendly messages
12. Performance optimization for name list loading and selection

## Story 2.5: End-to-End Generation Performance Integration

As a UK primary school teacher,
I want the Epic 0 worksheet generation interface to deliver real worksheets in 5-7 seconds,
so that I can quickly create multiple worksheets during my planning sessions.

**Acceptance Criteria:**
1. Replace Epic 0 mock 5-7 second generation simulation with real end-to-end pipeline
2. Real AI API calls optimized with efficient prompt structure and Gemini model selection
3. Real HTML-to-PDF conversion optimized for speed without sacrificing quality
4. Epic 0 progress bar updated with real progress tracking and accurate time estimates
5. Real concurrent generation request handling without performance degradation
6. Real error recovery mechanisms replacing Epic 0 mock error states
7. Performance monitoring and logging integration for real usage optimization
8. Caching strategies for prompt templates and static assets
9. Real fallback mechanisms for API timeouts or failures
10. Consistent performance during peak usage times with real load testing

## Story 2.6: Configuration State Management Integration

As a UK primary school teacher,
I want the Epic 0 configuration interface to work with real state persistence and generation triggering,
so that my selections are saved and trigger real worksheet generation.

**Acceptance Criteria:**
1. Replace Epic 0 mock configuration state with real state management integration
2. Real Generate/Regenerate button functionality triggering actual AI generation
3. Real configuration changes triggering Epic 0 UI state updates (empty preview, show ads)
4. Real Download button appearing only when actual PDF is generated and ready
5. Integration with real user profile persistence from Epic 1 for configuration saving
6. Real-time state synchronization between configuration changes and UI updates
7. Real session-based configuration persistence during browser session
8. Integration with real usage tracking - prevent generation when limits exceeded
9. Real loading states replacing Epic 0 mock progress indicators
10. Error handling for configuration validation and generation failures