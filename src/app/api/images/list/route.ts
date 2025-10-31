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

    // Base directory for worksheet objects
    const baseDir = path.join(process.cwd(), 'public', 'images', 'WORKSHEET_OBJECTS')

    // Get all images from the category
    const images: Image[] = []

    // If we have a specific type (like counting, money, etc.)
    if (type !== 'all') {
      const typeDir = path.join(baseDir, type)

      if (!fs.existsSync(typeDir)) {
        // Fallback to general WORKSHEET_OBJECTS directory
        return getAllImagesFromDir(baseDir)
      }

      if (category === 'all') {
        // Get all categories within this type
        const categories = fs.readdirSync(typeDir, { withFileTypes: true })
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name)

        for (const cat of categories) {
          const catImages = getImagesFromCategory(typeDir, cat, type)
          images.push(...catImages)
        }
      } else {
        // Get images from specific category
        const catImages = getImagesFromCategory(typeDir, category, type)
        images.push(...catImages)
      }
    } else {
      // Get all images from all types
      return getAllImagesFromDir(baseDir)
    }

    return NextResponse.json({
      success: true,
      images,
      category
    })
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

function getImagesFromCategory(baseDir: string, category: string, type: string = ''): Image[] {
  const images: Image[] = []
  const categoryPath = path.join(baseDir, category)

  if (!fs.existsSync(categoryPath)) {
    return images
  }

  const files = fs.readdirSync(categoryPath)

  for (const file of files) {
    const ext = path.extname(file).toLowerCase()
    if (['.png', '.jpg', '.jpeg', '.svg'].includes(ext)) {
      // Build the correct path based on whether we have a type
      const imagePath = type
        ? `/images/WORKSHEET_OBJECTS/${type}/${category}/${file}`
        : `/images/WORKSHEET_OBJECTS/${category}/${file}`

      const name = file
        .replace(/\.(png|jpg|jpeg|svg)$/i, '')
        .replace(/[-_]/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      images.push({
        path: imagePath,
        name,
        category
      })
    }
  }

  return images.sort((a, b) => a.name.localeCompare(b.name))
}

function getAllImagesFromDir(baseDir: string): NextResponse {
  const images: Image[] = []

  // Recursively get all images from the WORKSHEET_OBJECTS directory
  function scanDirectory(dir: string, relativePath: string = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        // Recursively scan subdirectories
        const newRelativePath = relativePath ? `${relativePath}/${entry.name}` : entry.name
        scanDirectory(fullPath, newRelativePath)
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase()
        if (['.png', '.jpg', '.jpeg', '.svg'].includes(ext)) {
          const imagePath = `/images/WORKSHEET_OBJECTS/${relativePath}/${entry.name}`
          const name = entry.name
            .replace(/\.(png|jpg|jpeg|svg)$/i, '')
            .replace(/[-_]/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')

          // Extract category from the relative path
          const pathParts = relativePath.split('/')
          const category = pathParts[pathParts.length - 1] || pathParts[0] || 'general'

          images.push({
            path: imagePath,
            name,
            category
          })
        }
      }
    }
  }

  try {
    scanDirectory(baseDir)
    return NextResponse.json({
      success: true,
      images: images.sort((a, b) => a.name.localeCompare(b.name)),
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
