import ImageKit from 'imagekit'

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || '',
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
    throw new Error(`Failed to upload to ImageKit: ${error}`)
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
