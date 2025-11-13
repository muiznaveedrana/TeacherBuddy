import ImageKit from 'imagekit'

// Lazy initialization to avoid build-time errors
let _imagekit: ImageKit | null = null

function getImageKit() {
  if (!_imagekit) {
    _imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || '',
    })
  }
  return _imagekit
}

const imagekit = new Proxy({} as ImageKit, {
  get: (target, prop) => {
    const value = (getImageKit() as any)[prop]
    // Bind methods to preserve 'this' context
    if (typeof value === 'function') {
      return value.bind(getImageKit())
    }
    return value
  }
})

export function checkImageKitConfig(): boolean {
  const hasPublicKey = !!process.env.IMAGEKIT_PUBLIC_KEY
  const hasPrivateKey = !!process.env.IMAGEKIT_PRIVATE_KEY
  const hasUrlEndpoint = !!process.env.IMAGEKIT_URL_ENDPOINT

  if (!hasPublicKey || !hasPrivateKey || !hasUrlEndpoint) {
    console.error('❌ ImageKit configuration missing:', {
      IMAGEKIT_PUBLIC_KEY: hasPublicKey ? '✓' : '✗',
      IMAGEKIT_PRIVATE_KEY: hasPrivateKey ? '✓' : '✗',
      IMAGEKIT_URL_ENDPOINT: hasUrlEndpoint ? '✓' : '✗',
    })
    return false
  }

  return true
}

interface UploadOptions {
  fileName: string
  folder?: string
  tags?: string[]
  useUniqueFileName?: boolean
  overwriteFile?: boolean
}

export async function uploadToImageKit(
  buffer: Buffer,
  options: UploadOptions
): Promise<string> {
  try {
    if (!checkImageKitConfig()) {
      throw new Error('ImageKit configuration is incomplete')
    }

    const base64Image = buffer.toString('base64')

    const response = await imagekit.upload({
      file: base64Image,
      fileName: options.fileName,
      folder: options.folder || '/worksheets',
      tags: options.tags?.join(','),
      useUniqueFileName: options.useUniqueFileName ?? false,
      overwriteFile: options.overwriteFile ?? true,
    })

    console.log('✅ Image uploaded:', response.url)
    return response.url

  } catch (error) {
    console.error('❌ ImageKit upload failed:', error)
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error)
    throw new Error(`Failed to upload to ImageKit: ${errorMessage}`)
  }
}

export async function testImageKitConnection(): Promise<boolean> {
  try {
    if (!checkImageKitConfig()) return false

    await imagekit.listFiles({ limit: 1 })
    console.log('✅ ImageKit connection successful')
    return true

  } catch (error) {
    console.error('❌ ImageKit connection failed:', error)
    return false
  }
}

export async function deleteFromImageKit(fileUrl: string): Promise<boolean> {
  try {
    if (!checkImageKitConfig()) {
      throw new Error('ImageKit configuration is incomplete')
    }

    // Extract fileId from URL
    // ImageKit URLs format: https://ik.imagekit.io/your_id/path/to/file.ext
    const url = new URL(fileUrl)
    const pathParts = url.pathname.split('/').filter(p => p)

    // Remove transformation parameters if present (tr:...)
    const cleanPath = pathParts.filter(p => !p.startsWith('tr:')).join('/')

    // Get file details by path to find fileId
    const files = await imagekit.listFiles({
      path: cleanPath,
      limit: 1
    })

    if (files.length === 0) {
      console.warn('⚠️ File not found in ImageKit:', cleanPath)
      return false
    }

    const fileId = files[0].fileId
    await imagekit.deleteFile(fileId)

    console.log('✅ Deleted old thumbnail from ImageKit:', fileUrl)
    return true

  } catch (error) {
    console.error('❌ Failed to delete from ImageKit:', error)
    // Don't throw error - deletion failure shouldn't block the update
    return false
  }
}

export function getOptimizedThumbnailUrl(
  originalUrl: string,
  width: number,
  height?: number
): string {
  try {
    const url = new URL(originalUrl)
    const transformation = height
      ? `tr:w-${width},h-${height},fo-auto,f-webp,q-80`
      : `tr:w-${width},fo-auto,f-webp,q-80`

    const pathParts = url.pathname.split('/')
    pathParts.splice(2, 0, transformation)
    url.pathname = pathParts.join('/')

    return url.toString()
  } catch (error) {
    console.error('Failed to generate optimized URL:', error)
    return originalUrl
  }
}

export function addCacheBusting(url: string): string {
  try {
    const urlObj = new URL(url)
    urlObj.searchParams.set('v', Date.now().toString())
    return urlObj.toString()
  } catch (error) {
    console.error('Failed to add cache busting:', error)
    return url
  }
}
