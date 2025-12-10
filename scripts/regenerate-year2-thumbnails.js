/**
 * Regenerate thumbnails for Year 2 worksheets
 * Usage: node scripts/regenerate-year2-thumbnails.js
 */

const { createClient } = require('@supabase/supabase-js');
const puppeteer = require('puppeteer');
const sharp = require('sharp');
const ImageKit = require('imagekit');
require('dotenv').config({ path: '.env.local' });

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
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1500, deviceScaleFactor: 1 });

    // Set content with base URL for images
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Take screenshot
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: false
    });

    // Optimize with sharp
    const optimized = await sharp(screenshot)
      .resize(1200, 1500, { fit: 'cover', position: 'top' })
      .webp({ quality: 80 })
      .toBuffer();

    // Upload to ImageKit
    const fileName = `${slug}-${Date.now()}-thumb.webp`;
    const uploadResponse = await imagekit.upload({
      file: optimized,
      fileName: fileName,
      folder: '/worksheets/thumbnails',
      useUniqueFileName: false
    });

    return uploadResponse.url;
  } finally {
    await browser.close();
  }
}

async function main() {
  console.log('Fetching Year 2 worksheets...\n');

  const { data: worksheets, error } = await supabase
    .from('library_worksheets')
    .select('id, title, slug, html_content, thumbnail_url')
    .eq('year_group', 'Year 2');

  if (error) {
    console.error('Error fetching worksheets:', error);
    process.exit(1);
  }

  console.log(`Found ${worksheets.length} Year 2 worksheets\n`);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < worksheets.length; i++) {
    const ws = worksheets[i];
    console.log(`[${i + 1}/${worksheets.length}] ${ws.title}`);

    try {
      // Generate new thumbnail
      const newThumbnailUrl = await generateThumbnail(ws.html_content, ws.slug);

      // Update database
      const { error: updateError } = await supabase
        .from('library_worksheets')
        .update({ thumbnail_url: newThumbnailUrl })
        .eq('id', ws.id);

      if (updateError) {
        throw new Error(updateError.message);
      }

      console.log(`  ✓ New thumbnail: ${newThumbnailUrl}`);
      success++;
    } catch (e) {
      console.log(`  ✗ Failed: ${e.message}`);
      failed++;
    }
  }

  console.log(`\n✅ Done! Success: ${success}, Failed: ${failed}`);
}

main().catch(console.error);
