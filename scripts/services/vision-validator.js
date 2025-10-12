#!/usr/bin/env node

/**
 * Vision AI Validator Service
 *
 * Uses Google Gemini Vision API to validate image-question semantic alignment
 * Detects mismatches like "football question showing sailor images"
 */

const fs = require('fs').promises;
const path = require('path');

class VisionValidator {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    if (!this.apiKey) {
      console.warn('⚠️ GEMINI_API_KEY not set - vision validation disabled');
    }
  }

  /**
   * Extract keywords from question text
   */
  extractKeywords(questionText) {
    const text = questionText.toLowerCase();

    // Common object keywords
    const objectPatterns = {
      // Fruits
      'apple': ['apple', 'apples'],
      'banana': ['banana', 'bananas'],
      'orange': ['orange', 'oranges'],
      'strawberry': ['strawberry', 'strawberries'],
      'grape': ['grape', 'grapes'],

      // Vegetables
      'carrot': ['carrot', 'carrots'],
      'tomato': ['tomato', 'tomatoes'],
      'potato': ['potato', 'potatoes'],

      // Animals
      'dog': ['dog', 'dogs', 'puppy', 'puppies'],
      'cat': ['cat', 'cats', 'kitten', 'kittens'],
      'cow': ['cow', 'cows'],
      'chicken': ['chicken', 'chickens', 'chick', 'chicks'],
      'frog': ['frog', 'frogs'],

      // Sports/Toys
      'football': ['football', 'footballs', 'soccer ball', 'soccer'],
      'basketball': ['basketball', 'basketballs'],
      'ball': ['ball', 'balls'],
      'teddy bear': ['teddy bear', 'teddy', 'bear', 'bears'],

      // School
      'book': ['book', 'books'],
      'pencil': ['pencil', 'pencils'],
      'pen': ['pen', 'pens'],
      'eraser': ['eraser', 'erasers'],
      'ruler': ['ruler', 'rulers'],

      // Nature
      'flower': ['flower', 'flowers', 'rose', 'daisy', 'tulip'],
      'tree': ['tree', 'trees'],
      'star': ['star', 'stars'],

      // People/Characters
      'sailor': ['sailor', 'sailors'],
      'santa': ['santa', 'santa claus'],
      'child': ['child', 'children', 'kid', 'kids', 'boy', 'girl']
    };

    const foundKeywords = [];

    for (const [category, patterns] of Object.entries(objectPatterns)) {
      for (const pattern of patterns) {
        if (text.includes(pattern)) {
          foundKeywords.push(category);
          break; // Only add category once
        }
      }
    }

    return foundKeywords;
  }

  /**
   * Validate image using Gemini Vision API
   */
  async analyzeImage(imagePath) {
    if (!this.apiKey) {
      return {
        success: false,
        error: 'GEMINI_API_KEY not configured',
        labels: []
      };
    }

    try {
      // Read image file
      const imageBuffer = await fs.readFile(path.join(process.cwd(), 'public', imagePath));
      const base64Image = imageBuffer.toString('base64');

      // Call Gemini Vision API
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [
                {
                  text: 'Identify the main objects in this image. List only the primary countable objects (e.g., "apple", "football", "pencil"). Return as comma-separated list. If there are people/characters, identify their role (e.g., "sailor", "santa", "child").'
                },
                {
                  inline_data: {
                    mime_type: 'image/png',
                    data: base64Image
                  }
                }
              ]
            }]
          })
        }
      );

      const data = await response.json();

      if (!data.candidates || data.candidates.length === 0) {
        return {
          success: false,
          error: 'No response from Gemini Vision API',
          labels: []
        };
      }

      // Extract labels from response
      const text = data.candidates[0].content.parts[0].text.toLowerCase();
      const labels = text.split(',').map(l => l.trim()).filter(l => l.length > 0);

      return {
        success: true,
        labels,
        rawResponse: text
      };

    } catch (error) {
      return {
        success: false,
        error: error.message,
        labels: []
      };
    }
  }

  /**
   * Calculate semantic match score between question keywords and image labels
   */
  calculateSemanticMatch(questionKeywords, imageLabels) {
    if (questionKeywords.length === 0 || imageLabels.length === 0) {
      return 0;
    }

    let matchCount = 0;

    for (const keyword of questionKeywords) {
      for (const label of imageLabels) {
        // Exact match
        if (label.includes(keyword) || keyword.includes(label)) {
          matchCount++;
          break;
        }

        // Synonym matching
        const synonyms = {
          'football': ['soccer', 'ball'],
          'soccer': ['football', 'ball'],
          'teddy bear': ['bear', 'toy'],
          'flower': ['rose', 'daisy', 'tulip', 'bloom', 'blossom']
        };

        if (synonyms[keyword] && synonyms[keyword].some(syn => label.includes(syn))) {
          matchCount += 0.5; // Partial credit for synonyms
          break;
        }
      }
    }

    return Math.min(matchCount / questionKeywords.length, 1.0);
  }

  /**
   * Validate image-question alignment
   */
  async validateImageQuestionAlignment(questionText, imagePath) {
    const questionKeywords = this.extractKeywords(questionText);

    if (questionKeywords.length === 0) {
      return {
        valid: true, // No keywords to validate
        confidence: 0,
        questionKeywords: [],
        imageLabels: [],
        message: 'No specific objects identified in question'
      };
    }

    const imageAnalysis = await this.analyzeImage(imagePath);

    if (!imageAnalysis.success) {
      return {
        valid: null, // Cannot validate
        confidence: 0,
        questionKeywords,
        imageLabels: [],
        error: imageAnalysis.error,
        message: `Vision API error: ${imageAnalysis.error}`
      };
    }

    const matchScore = this.calculateSemanticMatch(questionKeywords, imageAnalysis.labels);
    const valid = matchScore >= 0.5; // 50% threshold

    return {
      valid,
      confidence: matchScore,
      questionKeywords,
      imageLabels: imageAnalysis.labels,
      message: valid
        ? `✅ Images match question (${(matchScore * 100).toFixed(0)}% match)`
        : `❌ Mismatch detected: Question asks for "${questionKeywords.join(', ')}", image shows "${imageAnalysis.labels.join(', ')}" (${(matchScore * 100).toFixed(0)}% match)`
    };
  }

  /**
   * Batch validate all images in a worksheet
   */
  async validateWorksheet(questions, images) {
    const results = [];
    const issues = [];

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const image = images[i];

      if (!image || !image.src) {
        issues.push({
          questionIndex: i + 1,
          questionText: question,
          issue: 'No image provided for question'
        });
        continue;
      }

      const validation = await this.validateImageQuestionAlignment(question, image.src);
      results.push({
        questionIndex: i + 1,
        questionText: question,
        imagePath: image.src,
        ...validation
      });

      if (validation.valid === false) {
        issues.push({
          questionIndex: i + 1,
          questionText: question,
          imagePath: image.src,
          message: validation.message,
          questionKeywords: validation.questionKeywords,
          imageLabels: validation.imageLabels
        });
      }
    }

    const validCount = results.filter(r => r.valid === true).length;
    const invalidCount = results.filter(r => r.valid === false).length;
    const unknownCount = results.filter(r => r.valid === null).length;

    return {
      results,
      issues,
      summary: {
        total: questions.length,
        valid: validCount,
        invalid: invalidCount,
        unknown: unknownCount,
        passRate: questions.length > 0 ? (validCount / questions.length) * 100 : 0
      }
    };
  }

  /**
   * Generate catalog fix suggestions based on vision validation issues
   */
  generateCatalogFixSuggestions(issues) {
    const suggestions = [];
    const catalogAdjustments = new Map();

    for (const issue of issues) {
      const questionKeyword = issue.questionKeywords[0]; // Primary keyword
      const imageLabel = issue.imageLabels[0]; // What image actually shows

      if (questionKeyword && imageLabel && questionKeyword !== imageLabel) {
        const key = `${questionKeyword}-${imageLabel}`;

        if (!catalogAdjustments.has(key)) {
          catalogAdjustments.set(key, {
            questionKeyword,
            imageLabel,
            occurrences: 1,
            suggestion: `Lower priority for "${imageLabel}" collections in "${questionKeyword}" contexts`
          });
        } else {
          catalogAdjustments.get(key).occurrences++;
        }
      }
    }

    for (const [key, adjustment] of catalogAdjustments) {
      suggestions.push({
        type: 'CATALOG_PRIORITY_ADJUSTMENT',
        questionKeyword: adjustment.questionKeyword,
        incorrectImage: adjustment.imageLabel,
        occurrences: adjustment.occurrences,
        suggestion: adjustment.suggestion,
        autoFixable: true
      });
    }

    return suggestions;
  }
}

// Export singleton
const visionValidator = new VisionValidator();
module.exports = visionValidator;
