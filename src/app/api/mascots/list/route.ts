import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const mascotDir = path.join(process.cwd(), 'public', 'images', 'mascot')

    // Check if mascot directory exists
    if (!fs.existsSync(mascotDir)) {
      return NextResponse.json({
        mascots: [],
        message: 'Mascot directory not found'
      })
    }

    // Read all files in mascot directory
    const files = fs.readdirSync(mascotDir)

    // Filter for image files only
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.gif']
    const mascots = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase()
        return imageExtensions.includes(ext)
      })
      .map(file => `/images/mascot/${file}`)
      .sort() // Sort alphabetically

    return NextResponse.json({
      mascots,
      count: mascots.length
    })
  } catch (error) {
    console.error('Error listing mascots:', error)
    return NextResponse.json(
      { error: 'Failed to list mascots', mascots: [] },
      { status: 500 }
    )
  }
}
