const http = require('http')

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/library/browse',
  method: 'GET'
}

const req = http.request(options, (res) => {
  let data = ''

  res.on('data', (chunk) => {
    data += chunk
  })

  res.on('end', () => {
    try {
      const json = JSON.parse(data)
      console.log('\n✅ API Response:')
      console.log(`Total worksheets: ${json.worksheets.length}`)
      console.log(`Total count: ${json.total_count}`)
      console.log(`Has more: ${json.has_more}\n`)

      console.log('Worksheets:')
      json.worksheets.forEach((w, i) => {
        console.log(`${i + 1}. ${w.title}`)
        console.log(`   Slug: ${w.slug}`)
        console.log(`   Year: ${w.year_group} | Topic: ${w.topic}`)
        console.log(`   Thumbnail: ${w.thumbnail_url ? 'Has URL' : 'Missing!'}`)
        console.log(`   Downloads: ${w.download_count}\n`)
      })
    } catch (error) {
      console.error('Failed to parse JSON:', error.message)
      console.log('Raw response:', data.substring(0, 200))
    }
  })
})

req.on('error', (error) => {
  console.error('Request failed:', error.message)
})

req.end()
