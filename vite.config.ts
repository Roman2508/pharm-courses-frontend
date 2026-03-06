import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

import { VitePWA } from "vite-plugin-pwa"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        cleanupOutdatedCaches: true,
        globPatterns: ["index.html", "assets/**/*.{js,css}", "logo.png"],
        navigateFallback: "index.html",
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname === "/logo.png",
            handler: "CacheFirst",
            options: {
              cacheName: "logo-cache",
              expiration: {
                maxEntries: 1,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: ({ request }) => request.mode === "navigate",
            handler: "NetworkFirst",
            options: {
              cacheName: "app-shell",
              networkTimeoutSeconds: 3,
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|woff2?)$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "static-assets",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
        ],
      },
      manifest: {
        name: "БПР - Житомирський базовий фармацевтичний фаховий коледж",
        short_name: "БПР ЖБФФК",
        description: "Система безперервного професійного розвитку",
        theme_color: "#ffffff",
        icons: [
          {
            src: "logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "logo.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    proxy: {
      "/upload": {
        target: "http://localhost:7777",
        changeOrigin: true,
      },
    },
  },

  optimizeDeps: {
    include: ["react", "react-dom", "react-router", "@tanstack/react-query"],
  },

  build: {
    target: "es2020",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Lazy-loaded heavy libraries
            if (id.includes("pdf-lib") || id.includes("@pdf-lib")) return "vendor-pdf"
            if (id.includes("xlsx")) return "vendor-xlsx"
            if (id.includes("@tiptap") || id.includes("prosemirror")) return "vendor-editor"

            // All other dependencies in one chunk to prevent cross-chunk circularity
            return "vendor"
          }
        },
      },
    },
  },
})
