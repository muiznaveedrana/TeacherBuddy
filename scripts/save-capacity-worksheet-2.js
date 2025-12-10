/**
 * Save Capacity Worksheet 2 to Library with thumbnail generation
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
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
  console.log('Generating thumbnail...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 800, height: 1000 });

    const htmlWithBase = htmlContent.replace(
      '<head>',
      '<head><base href="http://localhost:3000/">'
    );

    await page.setContent(htmlWithBase, { waitUntil: 'networkidle0', timeout: 30000 });

    await page.evaluate(() => {
      return Promise.all(
        Array.from(document.images)
          .filter(img => !img.complete)
          .map(img => new Promise(resolve => {
            img.onload = img.onerror = resolve;
          }))
      );
    });

    const screenshot = await page.screenshot({
      type: 'webp',
      quality: 85,
      fullPage: false,
      clip: { x: 0, y: 0, width: 800, height: 600 }
    });

    const fileName = `${slug}-${Date.now()}-thumb.webp`;
    const uploadResponse = await imagekit.upload({
      file: screenshot,
      fileName: fileName,
      folder: '/worksheets/thumbnails',
      useUniqueFileName: false
    });

    console.log('Thumbnail uploaded:', uploadResponse.url);
    return uploadResponse.url;

  } finally {
    await browser.close();
  }
}

async function saveWorksheet() {
  const htmlContent = fs.readFileSync(
    path.join(__dirname, '../public/preview-worksheet-capacity-test-2.html'),
    'utf-8'
  );

  const slug = 'capacity-which-holds-more-comparison';
  const thumbnail_url = await generateThumbnail(htmlContent, slug);

  const worksheet = {
    title: 'Capacity - Which Holds More?',
    slug: slug,
    year_group: 'Reception',
    topic: 'measurement',
    subtopic: 'capacity',
    difficulty: 'average',
    question_count: 5,
    html_content: htmlContent,
    region: 'UK',
    status: 'published',
    layout_type: 'standard',
    thumbnail_url: thumbnail_url
  };

  console.log('Saving worksheet:', worksheet.title);

  const { data, error } = await supabase
    .from('library_worksheets')
    .upsert(worksheet, { onConflict: 'slug' })
    .select()
    .single();

  if (error) {
    console.error('Error saving worksheet:', error.message);
    process.exit(1);
  }

  console.log('✅ Worksheet saved successfully!');
  console.log('   ID:', data.id);
  console.log('   Slug:', data.slug);
  console.log('   URL: /library/' + data.slug);
}

saveWorksheet().catch(console.error);
