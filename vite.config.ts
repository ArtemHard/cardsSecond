/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // https://github.com/GizmoDevDev/vitest-tescting/blob/main/docs/react.md
    globals: true,
    environment: 'jsdom',
    // setupFiles: './test/setup.ts', // Нужно указать весь путь для файла setup.ts
  },
})
