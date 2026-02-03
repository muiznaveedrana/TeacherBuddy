/**
 * WORKSHEET CONTENT COMPONENT
 *
 * Renders educational content for worksheets with proper heading hierarchy
 * and SEO-friendly structure for freemathprintable.com
 */

import { generateWorksheetContent, type WorksheetInput, type WorksheetContent as ContentType } from '@/lib/content-generator'

interface WorksheetContentProps {
  worksheet: WorksheetInput
  className?: string
}

export function WorksheetContent({ worksheet, className = '' }: WorksheetContentProps) {
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
          {content.learningObjectives.map((objective, index) => (
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
          {content.howToUse}
        </p>
      </section>

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
              {content.suggestedFor.ageRange}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
              Suitable Settings
            </h3>
            <div className="flex flex-wrap gap-2">
              {content.suggestedFor.settings.map((setting, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  {setting}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/**
 * Alternative component that accepts pre-generated content
 * Useful when content is already generated server-side
 */
interface WorksheetContentDisplayProps {
  content: ContentType
  className?: string
}

export function WorksheetContentDisplay({ content, className = '' }: WorksheetContentDisplayProps) {
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
          {content.learningObjectives.map((objective, index) => (
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
          {content.howToUse}
        </p>
      </section>

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
              {content.suggestedFor.ageRange}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
              Suitable Settings
            </h3>
            <div className="flex flex-wrap gap-2">
              {content.suggestedFor.settings.map((setting, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  {setting}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default WorksheetContent
