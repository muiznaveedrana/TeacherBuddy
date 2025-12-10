/**
 * Regenerate thumbnail for a worksheet
 * Usage: node scripts/regenerate-thumbnail.js <worksheet-id>
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const puppeteer = require('puppeteer');
const ImageKit = require('imagekit');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function generateThumbnail(htmlContent, slug) {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1500 });

    // Set content with proper base URL for images
    const htmlWithBase = htmlContent.replace(
      '<head>',
      '<head><base href="http://localhost:3000/">'
    );

    await page.setContent(htmlWithBase, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait for images to load
    await page.evaluate(() => {
      return Promise.all(
        Array.from(document.images)
          .filter(img => !img.complete)
          .map(img => new Promise(resolve => {
            img.onload = img.onerror = resolve;
          }))
      );
    });

    // Take screenshot
    const screenshot = await page.screenshot({
      type: 'webp',
      quality: 85,
      fullPage: false,
      clip: { x: 0, y: 0, width: 1200, height: 1500 }
    });

    console.log('Screenshot taken, uploading to ImageKit...');

    // Upload to ImageKit
    const fileName = `${slug}-${Date.now()}-thumb.webp`;
    const uploadResponse = await imagekit.upload({
      file: screenshot,
      fileName: fileName,
      folder: '/worksheets/thumbnails',
      useUniqueFileName: false
    });

    console.log('Uploaded:', uploadResponse.url);
    return uploadResponse.url;

  } finally {
    await browser.close();
  }
}

async function main() {
  const worksheetId = process.argv[2];

  if (!worksheetId) {
    console.log('Usage: node scripts/regenerate-thumbnail.js <worksheet-id>');
    process.exit(1);
  }

  console.log('Fetching worksheet:', worksheetId);

  const { data: ws, error } = await supabase
    .from('library_worksheets')
    .select('id, slug, title, html_content, thumbnail_url')
    .eq('id', worksheetId)
    .single();

  if (error) {
    console.error('Error fetching worksheet:', error.message);
    process.exit(1);
  }

  console.log('Found:', ws.title);
  console.log('Current thumbnail:', ws.thumbnail_url);

  const newThumbnailUrl = await generateThumbnail(ws.html_content, ws.slug);

  console.log('New thumbnail:', newThumbnailUrl);

  // Update database
  const { error: updateError } = await supabase
    .from('library_worksheets')
    .update({ thumbnail_url: newThumbnailUrl + '?v=' + Date.now() })
    .eq('id', worksheetId);

  if (updateError) {
    console.error('Update error:', updateError.message);
    process.exit(1);
  }

  console.log('✅ Thumbnail updated successfully!');
}

main().catch(console.error);
