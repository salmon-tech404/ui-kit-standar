/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-studio-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        studio: {
          bg: 'var(--studio-bg)',
          surface: 'var(--studio-surface)',
          subtle: 'var(--studio-surface-subtle)',
          border: 'var(--studio-border)',
          accent: 'var(--studio-accent)',
        }
      },
      fontFamily: {
        sans: ['var(--font-body)', 'var(--ui-font-family-body)', 'Inter', 'sans-serif'],
        body: ['var(--font-body)', 'var(--ui-font-family-body)', 'Inter', 'sans-serif'],
        heading: ['var(--font-heading)', 'var(--ui-font-family-heading)', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['var(--font-mono)', 'var(--ui-font-family-mono)', 'JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
