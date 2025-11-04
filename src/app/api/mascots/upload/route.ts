import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { writeFile } from 'fs/promises'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('mascot') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided', success: false },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload PNG, JPG, SVG, or GIF', success: false },
        { status: 400 }
      )
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 2MB', success: false },
        { status: 400 }
      )
    }

    // Create mascot directory if it doesn't exist
    const mascotDir = path.join(process.cwd(), 'public', 'images', 'mascot')
    if (!fs.existsSync(mascotDir)) {
      fs.mkdirSync(mascotDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `${timestamp}-${originalName}`
    const filepath = path.join(mascotDir, filename)

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    await writeFile(filepath, buffer)

    const publicPath = `/images/mascot/${filename}`

    return NextResponse.json({
      success: true,
      path: publicPath,
      filename: filename,
      message: 'Mascot uploaded successfully'
    })
  } catch (error) {
    console.error('Error uploading mascot:', error)
    return NextResponse.json(
      { error: 'Failed to upload mascot', success: false },
      { status: 500 }
    )
  }
}
