/**
 * WORKSHEET CONTENT COMPONENT
 *
 * Renders educational content for worksheets with proper heading hierarchy
 * and SEO-friendly structure for freemathprintable.com
 *
 * Two usage patterns:
 * 1. WorksheetContent - auto-generates content from worksheet input (for previews)
 * 2. WorksheetContentDisplay - renders pre-generated/DB content (for library pages)
 */

import { generateWorksheetContent, type WorksheetInput, type WorksheetContent as ContentType } from '@/lib/content-generator'
import type { LibraryWorksheet } from '@/lib/types/library'

interface WorksheetContentProps {
  worksheet: WorksheetInput
  className?: string
  /** Show all sections or just essential ones */
  compact?: boolean
}

/**
 * Generates and displays worksheet content from input metadata
 * Use this for preview pages or when content hasn't been saved to DB
 */
export function WorksheetContent({ worksheet, className = '', compact = false }: WorksheetContentProps) {
  const content = generateWorksheetContent(worksheet)

  return (
    <div className={`worksheet-content space-y-8 ${className}`}>
      {/* Description Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          About This Worksheet
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {content.description}
        </p>
      </section>

      {/* Learning Objectives Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Learning Objectives
        </h2>
        <ul className="space-y-2">
          {content.learning_objectives.map((objective, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-gray-700"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-medium">
                {index + 1}
              </span>
              <span className="leading-relaxed">{objective}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* How to Use Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          How to Use This Worksheet
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {content.how_to_use}
        </p>
      </section>

      {/* Skills Developed */}
      {content.skills_developed.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Skills Developed
          </h2>
          <div className="flex flex-wrap gap-2">
            {content.skills_developed.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-green-50 text-green-700 border border-green-200 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Suggested For Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Suggested For
        </h2>
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
              Age Range
            </h3>
            <p className="text-gray-900 font-medium">
              {content.suggested_for.age_range}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
              Suitable Settings
            </h3>
            <div className="flex flex-wrap gap-2">
              {content.suggested_for.settings.map((setting, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  {setting}
                </span>
              ))}
            </div>
          </div>
          {content.estimated_time_minutes > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
                Estimated Time
              </h3>
              <p className="text-gray-900 font-medium">
                {content.estimated_time_minutes} minutes
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Extended sections (not shown in compact mode) */}
      {!compact && (
        <>
          {/* Educational Benefits (long-form SEO content) */}
          {content.educational_benefits && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Educational Benefits
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {content.educational_benefits}
              </p>
            </section>
          )}

          {/* Curriculum Standards */}
          {content.curriculum_standards.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Curriculum Alignment
              </h2>
              <ul className="space-y-2">
                {content.curriculum_standards.map((standard, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <span className="text-blue-600 mt-1">✓</span>
                    <span className="leading-relaxed">{standard}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* FAQ Section */}
          {content.faq.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {content.faq.map((item, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
                  >
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {item.question}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}

/**
 * Props for displaying content from LibraryWorksheet (DB data)
 */
interface WorksheetContentFromDBProps {
  worksheet: Pick<LibraryWorksheet,
    | 'educational_benefits'
    | 'learning_objectives'
    | 'how_to_use'
    | 'skills_developed'
    | 'estimated_time_minutes'
    | 'curriculum_standards'
    | 'faq'
    | 'year_group'
  >
  className?: string
  compact?: boolean
}

/**
 * Displays content from a LibraryWorksheet (database record)
 * Use this on library detail pages where content is already in DB
 */
export function WorksheetContentFromDB({ worksheet, className = '', compact = false }: WorksheetContentFromDBProps) {
  const hasContent = worksheet.educational_benefits ||
    (worksheet.learning_objectives && worksheet.learning_objectives.length > 0) ||
    worksheet.how_to_use

  if (!hasContent) {
    return null
  }

  // Get age range from year group
  const ageRanges: Record<string, string> = {
    'Reception': '4-5 years',
    'Year 1': '5-6 years',
    'Year 2': '6-7 years',
    'Year 3': '7-8 years',
    'Year 4': '8-9 years',
    'Year 5': '9-10 years',
    'Year 6': '10-11 years',
  }

  return (
    <div className={`worksheet-content space-y-8 ${className}`}>
      {/* Educational Benefits / About */}
      {worksheet.educational_benefits && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            About This Worksheet
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {worksheet.educational_benefits}
          </p>
        </section>
      )}

      {/* Learning Objectives */}
      {worksheet.learning_objectives && worksheet.learning_objectives.length > 0 && (
        <section className="bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Learning Objectives
          </h2>
          <ul className="space-y-3">
            {worksheet.learning_objectives.map((objective, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-gray-700"
              >
                <span className="text-blue-600 mt-1">✓</span>
                <span className="leading-relaxed">{objective}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* How to Use */}
      {worksheet.how_to_use && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            How to Use This Worksheet
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {worksheet.how_to_use}
          </p>
        </section>
      )}

      {/* Skills Developed */}
      {worksheet.skills_developed && worksheet.skills_developed.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Skills Developed
          </h2>
          <div className="flex flex-wrap gap-2">
            {worksheet.skills_developed.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-green-50 text-green-700 border border-green-200 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Metadata bar */}
      <section className="bg-gray-50 rounded-lg p-4 flex flex-wrap gap-6">
        <div>
          <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Age Range</span>
          <p className="text-gray-900 font-medium mt-1">
            {ageRanges[worksheet.year_group] || '5-11 years'}
          </p>
        </div>
        {worksheet.estimated_time_minutes && (
          <div>
            <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Estimated Time</span>
            <p className="text-gray-900 font-medium mt-1">
              {worksheet.estimated_time_minutes} minutes
            </p>
          </div>
        )}
      </section>

      {/* Extended sections */}
      {!compact && (
        <>
          {/* Curriculum Standards */}
          {worksheet.curriculum_standards && worksheet.curriculum_standards.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Curriculum Alignment
              </h2>
              <ul className="space-y-2">
                {worksheet.curriculum_standards.map((standard, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-700 text-sm"
                  >
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>{standard}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* FAQ Section */}
          {worksheet.faq && worksheet.faq.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {worksheet.faq.map((item, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
                  >
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {item.question}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}

export default WorksheetContent
