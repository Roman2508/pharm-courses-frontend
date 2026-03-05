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
      devOptions: {
        enabled: true,
      },
      workbox: {
        // Стара конфігурація (кешувала все підряд):
        // globPatterns: ["**/*.{js,css,html,ico,png,svg}"],

        // Оптимізована конфігурація (без жорсткого шляху до assets/):
        globPatterns: [
          "index.html",
          "**/*.{js,css}", // Знаходить всі скрипти і стилі в будь-яких папках білду
          "logo.png",
        ],

        // Виключаємо великі зображення та інші ресурси з пре-кешу, щоб не вантажити мережу відразу
        globIgnores: ["assets/*"],

        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === "navigate",
            handler: "NetworkFirst",
            options: {
              cacheName: "app-shell",
              networkTimeoutSeconds: 5,
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
})
