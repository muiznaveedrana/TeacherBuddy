const CACHE_NAME = 'worksheetgen-v1.0.0'
const STATIC_CACHE_NAME = 'static-v1.0.0'
const DYNAMIC_CACHE_NAME = 'dynamic-v1.0.0'

// Files to cache on install
const STATIC_FILES = [
  '/',
  '/create',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // Add other critical static assets
]

// Files that should always be fetched from network
const NETWORK_FIRST = [
  '/api/',
  '/auth/',
  '/subscription',
  '/usage'
]

// Files that can be served from cache with network fallback
const CACHE_FIRST = [
  '/icons/',
  '/images/',
  '/_next/static/',
  '.css',
  '.js',
  '.woff2',
  '.woff'
]

self.addEventListener('install', event => {
  console.log('[SW] Installing service worker...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching static files')
        return cache.addAll(STATIC_FILES)
      })
      .catch(error => {
        console.error('[SW] Error caching static files:', error)
      })
  )
  
  // Skip waiting to activate immediately
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker...')
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => {
            return cacheName.startsWith('worksheetgen-') && 
                   cacheName !== CACHE_NAME &&
                   cacheName !== STATIC_CACHE_NAME &&
                   cacheName !== DYNAMIC_CACHE_NAME
          })
          .map(cacheName => {
            console.log('[SW] Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          })
      )
    })
  )
  
  // Take control of all clients
  return self.clients.claim()
})

self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)
  
  // Skip non-GET requests and chrome-extension requests
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') {
    return
  }
  
  // Network first for API calls and dynamic content
  if (NETWORK_FIRST.some(pattern => url.pathname.startsWith(pattern))) {
    event.respondWith(networkFirst(request))
    return
  }
  
  // Cache first for static assets
  if (CACHE_FIRST.some(pattern => 
    url.pathname.includes(pattern) || url.pathname.endsWith(pattern)
  )) {
    event.respondWith(cacheFirst(request))
    return
  }
  
  // Stale while revalidate for HTML pages
  if (request.destination === 'document') {
    event.respondWith(staleWhileRevalidate(request))
    return
  }
  
  // Default to network with cache fallback
  event.respondWith(networkWithCacheFallback(request))
})

// Network first strategy
async function networkFirst(request) {
  try {
    const response = await fetch(request)
    
    if (response.ok && response.status < 400) {
      // Cache successful responses
      const cache = await caches.open(DYNAMIC_CACHE_NAME)
      cache.put(request, response.clone())
    }
    
    return response
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url)
    const cached = await caches.match(request)
    
    if (cached) {
      return cached
    }
    
    // Return offline page for HTML requests
    if (request.destination === 'document') {
      return caches.match('/offline') || new Response('You are offline', { status: 503 })
    }
    
    throw error
  }
}

// Cache first strategy
async function cacheFirst(request) {
  const cached = await caches.match(request)
  
  if (cached) {
    return cached
  }
  
  try {
    const response = await fetch(request)
    
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME)
      cache.put(request, response.clone())
    }
    
    return response
  } catch (error) {
    console.log('[SW] Cache first failed:', request.url)
    throw error
  }
}

// Stale while revalidate strategy
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME)
  const cached = await cache.match(request)
  
  // Fetch in background to update cache
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) {
      cache.put(request, response.clone())
    }
    return response
  }).catch(error => {
    console.log('[SW] Background fetch failed:', request.url)
    return null
  })
  
  // Return cached version immediately if available
  if (cached) {
    return cached
  }
  
  // Otherwise wait for network
  return fetchPromise || new Response('You are offline', { status: 503 })
}

// Network with cache fallback
async function networkWithCacheFallback(request) {
  try {
    const response = await fetch(request)
    
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME)
      cache.put(request, response.clone())
    }
    
    return response
  } catch (error) {
    const cached = await caches.match(request)
    return cached || new Response('Content not available offline', { status: 503 })
  }
}

// Background sync for offline actions
self.addEventListener('sync', event => {
  console.log('[SW] Background sync:', event.tag)
  
  if (event.tag === 'sync-worksheets') {
    event.waitUntil(syncWorksheets())
  }
})

async function syncWorksheets() {
  try {
    // Sync any pending worksheet generation requests
    const cache = await caches.open(DYNAMIC_CACHE_NAME)
    // Implementation would depend on your offline storage strategy
    console.log('[SW] Syncing worksheets...')
  } catch (error) {
    console.error('[SW] Sync failed:', error)
  }
}

// Push notifications (for future use)
self.addEventListener('push', event => {
  if (!event.data) return
  
  const data = event.data.json()
  const options = {
    body: data.body || 'You have a new notification',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: data.data || {},
    actions: data.actions || []
  }
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'WorksheetGenerator.AI', options)
  )
})

self.addEventListener('notificationclick', event => {
  event.notification.close()
  
  const urlToOpen = event.notification.data?.url || '/create'
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clients => {
      // Check if there's already a window/tab open with the target URL
      for (const client of clients) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus()
        }
      }
      
      // If not, open new window/tab
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen)
      }
    })
  )
})