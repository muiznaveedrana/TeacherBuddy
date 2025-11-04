import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

interface Image {
  path: string
  name: string
  category: string
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category') || 'all'
    const type = searchParams.get('type') || 'counting'  // Can be 'counting', 'money', etc.

    // Base directory - images are now directly in public/images
    const baseDir = path.join(process.cwd(), 'public', 'images')

    // Get all images and deduplicate by normalized name
    return getAllImagesFromDir(baseDir)
  } catch (error) {
    console.error('Error listing images:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to list images',
        images: []
      },
      { status: 500 }
    )
  }
}

function normalizeImageName(filename: string): string {
  // Remove extension and normalize: remove all spaces, hyphens, underscores, make lowercase
  return filename
    .replace(/\.(png|jpg|jpeg|svg)$/i, '')
    .toLowerCase()
    .replace(/[\s\-_]/g, '')
}

function formatDisplayName(filename: string): string {
  // Convert filename to nice display name: "teddy-bear.png" -> "Teddy Bear"
  return filename
    .replace(/\.(png|jpg|jpeg|svg)$/i, '')
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function getAllImagesFromDir(baseDir: string): NextResponse {
  const imageMap = new Map<string, Image>() // Use Map for deduplication

  try {
    const entries = fs.readdirSync(baseDir, { withFileTypes: true })

    for (const entry of entries) {
      if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase()
        if (['.png', '.jpg', '.jpeg', '.svg'].includes(ext)) {
          const normalizedName = normalizeImageName(entry.name)

          // Only add if we haven't seen this normalized name before
          if (!imageMap.has(normalizedName)) {
            const imagePath = `/images/${entry.name}`
            const displayName = formatDisplayName(entry.name)

            imageMap.set(normalizedName, {
              path: imagePath,
              name: displayName,
              category: 'general'
            })
          }
        }
      }
    }

    const images = Array.from(imageMap.values()).sort((a, b) => a.name.localeCompare(b.name))

    return NextResponse.json({
      success: true,
      images,
      category: 'all'
    })
  } catch (error) {
    console.error('Error scanning directory:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to scan images directory',
      images: []
    }, { status: 500 })
  }
}
