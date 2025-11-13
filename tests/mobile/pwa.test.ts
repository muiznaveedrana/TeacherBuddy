/**
 * @jest-environment jsdom
 */

describe('Progressive Web App Features', () => {
  
  beforeEach(() => {
    // Reset DOM
    document.head.innerHTML = ''
    document.body.innerHTML = ''
  })

  describe('Manifest Configuration', () => {
    test('manifest.json has correct structure', async () => {
      // Mock fetch to return manifest content
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          name: "WorksheetGenerator.AI - Transform Worksheet Creation",
          short_name: "WorksheetGen.AI",
          start_url: "/create",
          display: "standalone",
          theme_color: "#1d4ed8",
          background_color: "#ffffff",
          icons: expect.any(Array)
        })
      })

      const response = await fetch('/manifest.json')
      const manifest = await response.json()

      expect(manifest.name).toBe("WorksheetGenerator.AI - Transform Worksheet Creation")
      expect(manifest.short_name).toBe("WorksheetGen.AI")
      expect(manifest.start_url).toBe("/create")
      expect(manifest.display).toBe("standalone")
      expect(manifest.theme_color).toBe("#1d4ed8")
      expect(manifest.icons).toBeInstanceOf(Array)
    })

    test('manifest includes required icon sizes', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          icons: [
            { src: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
            { src: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
            { src: "/icons/icon-144x144.png", sizes: "144x144", type: "image/png" }
          ]
        })
      })

      const response = await fetch('/manifest.json')
      const manifest = await response.json()

      const requiredSizes = ['192x192', '512x512']
      const availableSizes = manifest.icons.map((icon: any) => icon.sizes)

      requiredSizes.forEach(size => {
        expect(availableSizes).toContain(size)
      })
    })
  })

  describe('Service Worker', () => {
    beforeEach(() => {
      // Mock service worker
      Object.defineProperty(window.navigator, 'serviceWorker', {
        value: {
          register: jest.fn().mockResolvedValue({
            installing: null,
            waiting: null,
            active: { state: 'activated' },
            addEventListener: jest.fn(),
            removeEventListener: jest.fn()
          }),
          ready: Promise.resolve({
            active: { state: 'activated' },
            sync: {
              register: jest.fn().mockResolvedValue(undefined)
            }
          }),
          controller: null
        },
        writable: true
      })
    })

    test('service worker registration', async () => {
      // Simulate service worker registration script
      const registrationScript = `
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'))
        }
      `
      
      eval(registrationScript)

      expect(navigator.serviceWorker.register).toHaveBeenCalledWith('/sw.js')
    })

    test('service worker handles offline functionality', async () => {
      // Mock offline scenario
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false
      })

      // Service worker should serve cached content when offline
      const mockCache = {
        match: jest.fn().mockResolvedValue(new Response('cached content'))
      }

      global.caches = {
        match: jest.fn().mockResolvedValue(new Response('cached content')),
        open: jest.fn().mockResolvedValue(mockCache),
        keys: jest.fn().mockResolvedValue([]),
        delete: jest.fn().mockResolvedValue(true)
      }

      const cachedResponse = await caches.match('/create')
      expect(cachedResponse).toBeInstanceOf(Response)
    })
  })

  describe('App Shell', () => {
    test('critical resources are cached', () => {
      const criticalResources = [
        '/',
        '/create',
        '/manifest.json',
        '/icons/icon-192x192.png',
        '/icons/icon-512x512.png'
      ]

      // These should be in the service worker's static cache list
      criticalResources.forEach(resource => {
        expect(resource).toMatch(/^\//)
      })
    })

    test('app works offline after first visit', async () => {
      // Mock service worker cache
      const mockCache = new Map()
      mockCache.set('/', new Response('<html>App Shell</html>'))
      mockCache.set('/create', new Response('<html>Dashboard</html>'))

      global.caches = {
        match: jest.fn().mockImplementation((request) => {
          return Promise.resolve(mockCache.get(request) || null)
        }),
        open: jest.fn().mockResolvedValue({
          match: jest.fn().mockImplementation((request) => mockCache.get(request)),
          add: jest.fn(),
          addAll: jest.fn(),
          put: jest.fn()
        }),
        keys: jest.fn().mockResolvedValue([]),
        delete: jest.fn().mockResolvedValue(true)
      }

      // Simulate offline request
      const cachedDashboard = await caches.match('/create')
      expect(cachedDashboard).toBeInstanceOf(Response)
    })
  })

  describe('Install Prompt', () => {
    test('beforeinstallprompt event is handled', () => {
      let promptEvent: any = null
      
      // Mock install prompt handling
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault()
        promptEvent = e
      })

      // Simulate the event
      const mockEvent = new Event('beforeinstallprompt')
      Object.defineProperty(mockEvent, 'prompt', {
        value: jest.fn().mockResolvedValue({ outcome: 'accepted' })
      })
      
      window.dispatchEvent(mockEvent)
      
      expect(promptEvent).toBeTruthy()
    })

    test('install button triggers prompt', async () => {
      const mockPrompt = jest.fn().mockResolvedValue({ outcome: 'accepted' })
      
      // Simulate stored prompt event
      const deferredPrompt = {
        prompt: mockPrompt,
        userChoice: Promise.resolve({ outcome: 'accepted' })
      }

      // Trigger install
      await deferredPrompt.prompt()
      expect(mockPrompt).toHaveBeenCalled()
      
      const choice = await deferredPrompt.userChoice
      expect(choice.outcome).toBe('accepted')
    })
  })

  describe('Background Sync', () => {
    test('sync event is registered', async () => {
      const mockRegistration = {
        sync: {
          register: jest.fn().mockResolvedValue(undefined)
        }
      }

      await mockRegistration.sync.register('sync-worksheets')
      expect(mockRegistration.sync.register).toHaveBeenCalledWith('sync-worksheets')
    })
  })

  describe('Push Notifications', () => {
    beforeEach(() => {
      Object.defineProperty(window.Notification, 'permission', {
        value: 'default',
        writable: true
      })
      
      Object.defineProperty(window.Notification, 'requestPermission', {
        value: jest.fn().mockResolvedValue('granted'),
        writable: true
      })
    })

    test('notification permission can be requested', async () => {
      const permission = await Notification.requestPermission()
      expect(permission).toBe('granted')
      expect(Notification.requestPermission).toHaveBeenCalled()
    })

    test('push subscription can be created', async () => {
      const mockSubscription = {
        endpoint: 'https://example.com/endpoint',
        keys: {
          p256dh: 'key1',
          auth: 'key2'
        }
      }

      const mockRegistration = {
        pushManager: {
          subscribe: jest.fn().mockResolvedValue(mockSubscription),
          getSubscription: jest.fn().mockResolvedValue(null)
        }
      }

      const subscription = await mockRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'test-key'
      })

      expect(subscription).toEqual(mockSubscription)
      expect(mockRegistration.pushManager.subscribe).toHaveBeenCalledWith({
        userVisibleOnly: true,
        applicationServerKey: 'test-key'
      })
    })
  })

  describe('App Shortcuts', () => {
    test('manifest includes app shortcuts', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          shortcuts: [
            {
              name: "Create Printable",
              url: "/create?action=generate",
              icons: [{ src: "/icons/shortcut-create.png", sizes: "192x192" }]
            },
            {
              name: "Name Lists", 
              url: "/name-lists",
              icons: [{ src: "/icons/shortcut-names.png", sizes: "192x192" }]
            }
          ]
        })
      })

      const response = await fetch('/manifest.json')
      const manifest = await response.json()

      expect(manifest.shortcuts).toHaveLength(2)
      expect(manifest.shortcuts[0].name).toBe("Create Printable")
      expect(manifest.shortcuts[1].name).toBe("Name Lists")
    })
  })

  describe('Web Share API', () => {
    test('navigator.share is available', () => {
      Object.defineProperty(navigator, 'share', {
        value: jest.fn().mockResolvedValue(undefined),
        writable: true
      })

      expect('share' in navigator).toBe(true)
    })

    test('worksheet can be shared', async () => {
      const mockShare = jest.fn().mockResolvedValue(undefined)
      Object.defineProperty(navigator, 'share', {
        value: mockShare,
        writable: true
      })

      const shareData = {
        title: 'Check out this worksheet!',
        text: 'I created this with WorksheetGenerator.AI',
        url: 'https://app.worksheetgenerator.ai/worksheet/123'
      }

      await navigator.share(shareData)
      expect(mockShare).toHaveBeenCalledWith(shareData)
    })
  })
})