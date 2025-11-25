import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // Base path for GitHub Pages
  // For user/org pages (username.github.io): use '/'
  // For project pages (username.github.io/repo): use '/repo/'
  base: '/',
  root: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-three': ['three'],
          'vendor-chart': ['chart.js']
        }
      }
    }
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'favicon/*.png',
        'favicon/*.svg',
        'Anil_Thatha-Resume.pdf',
        'og-image.jpg'
      ],
      manifest: {
        name: 'Anil Thatha - Senior iOS/macOS Engineer',
        short_name: 'Anil Thatha',
        description: 'Senior iOS/macOS Engineer with 13+ years building enterprise-scale applications. Expert in Swift, SwiftUI, AI/ML integration.',
        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'favicon/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'favicon/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        categories: ['portfolio', 'resume', 'professional'],
        shortcuts: [
          {
            name: 'Download Resume',
            short_name: 'Resume',
            description: 'Download PDF resume',
            url: '/Anil_Thatha-Resume.pdf',
            icons: [{ src: 'favicon/favicon-96x96.png', sizes: '96x96' }]
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,pdf}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cdn-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cdn-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/www\.googletagmanager\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'analytics-cache',
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 // 1 day
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ],
  server: {
    port: 5173,
    open: true,
    host: true,
    strictPort: false
  },
  preview: {
    port: 4173,
    open: true
  }
});
