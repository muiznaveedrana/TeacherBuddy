// Seed script for library worksheets
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing environment variables!');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'present' : 'missing');
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? 'present' : 'missing');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const sampleWorksheets = [
  {
    slug: 'counting-to-10-with-cute-animals',
    title: 'Count to 10 with Cute Animals - Reception Math Worksheet',
    html_content: '<div class="worksheet"><h1>Count the Animals</h1><p>Sample HTML content...</p></div>',
    region: 'UK',
    year_group: 'Reception',
    topic: 'Number & Counting',
    subtopic: 'Counting to 10',
    difficulty: 'average',
    question_count: 5,
    layout_type: 'default',
    visual_theme: 'animals',
    activity_type: 'circle-answer',
    thumbnail_url: 'https://placehold.co/600x800/png?text=Counting+Animals',
    seo_title: 'Count to 10 with Animals - Reception Worksheet',
    seo_description: 'Fun counting worksheet for Reception students featuring cute animals. Perfect for practicing numbers 1-10.',
    quality_score: 95.5,
    status: 'published',
    published_at: new Date().toISOString()
  },
  {
    slug: 'simple-addition-with-colorful-fruits',
    title: 'Simple Addition with Colorful Fruits - Year 1 Math',
    html_content: '<div class="worksheet"><h1>Add the Fruits</h1><p>Sample content...</p></div>',
    region: 'UK',
    year_group: 'Year 1',
    topic: 'Addition',
    subtopic: 'Adding within 10',
    layout_type: 'default',
    visual_theme: 'fruits',
    activity_type: 'picture-addition',
    thumbnail_url: 'https://placehold.co/600x800/png?text=Addition+Fruits',
    status: 'published',
    published_at: new Date().toISOString()
  },
  {
    slug: 'basic-shapes-recognition-colorful',
    title: 'Basic Shapes Recognition - Reception Worksheet',
    html_content: '<div class="worksheet"><h1>Find the Shapes</h1><p>Sample content...</p></div>',
    region: 'UK',
    year_group: 'Reception',
    topic: 'Shapes',
    subtopic: 'Basic Shapes',
    layout_type: 'grid-layout',
    visual_theme: 'colorful-shapes',
    thumbnail_url: 'https://placehold.co/600x800/png?text=Shapes',
    status: 'published',
    published_at: new Date().toISOString()
  },
  {
    slug: 'subtraction-within-10-toys-christmas',
    title: 'Subtraction within 10 - Christmas Toys Edition',
    html_content: '<div class="worksheet"><h1>Take Away the Toys</h1><p>Sample content...</p></div>',
    region: 'UK',
    year_group: 'Year 1',
    topic: 'Subtraction',
    subtopic: 'Subtracting within 10',
    layout_type: '2-column-layout',
    visual_theme: 'toys',
    seasonal_theme: 'christmas',
    thumbnail_url: 'https://placehold.co/600x800/png?text=Subtraction+Christmas',
    status: 'published',
    published_at: new Date().toISOString()
  },
  {
    slug: 'number-recognition-1-to-20-tracing',
    title: 'Number Recognition 1-20 with Tracing',
    html_content: '<div class="worksheet"><h1>Trace the Numbers</h1><p>Sample content...</p></div>',
    region: 'UK',
    year_group: 'Reception',
    topic: 'Number & Counting',
    subtopic: 'Number Recognition',
    layout_type: 'default',
    activity_type: 'tracing',
    thumbnail_url: 'https://placehold.co/600x800/png?text=Number+Tracing',
    status: 'published',
    published_at: new Date().toISOString()
  }
];

async function seedData() {
  console.log('🌱 Seeding library worksheets...');

  const { data, error } = await supabase
    .from('library_worksheets')
    .insert(sampleWorksheets)
    .select();

  if (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }

  console.log(`✅ Successfully inserted ${data.length} sample worksheets`);
  console.log('\nSample worksheets:');
  data.forEach((ws, i) => {
    console.log(`  ${i + 1}. ${ws.title} (${ws.slug})`);
  });
}

seedData();
