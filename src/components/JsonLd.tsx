/**
 * JsonLd Component for rendering JSON-LD structured data
 *
 * Usage:
 * ```tsx
 * import { JsonLd } from '@/components/JsonLd';
 * import { generateWebsiteSchema } from '@/lib/schema';
 *
 * <JsonLd schema={generateWebsiteSchema()} />
 * ```
 */

interface JsonLdProps {
  /**
   * The JSON-LD schema object to render
   * Can be a single schema or an array of schemas
   */
  schema: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Renders JSON-LD structured data in a script tag
 * Safe for server-side rendering
 */
export function JsonLd({ schema }: JsonLdProps) {
  const jsonLdString = JSON.stringify(schema, null, 0);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString }}
    />
  );
}

/**
 * Renders multiple JSON-LD schemas as separate script tags
 * Useful when you need multiple unrelated schemas on the same page
 */
interface MultiJsonLdProps {
  schemas: Record<string, unknown>[];
}

export function MultiJsonLd({ schemas }: MultiJsonLdProps) {
  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLd key={index} schema={schema} />
      ))}
    </>
  );
}

export default JsonLd;
