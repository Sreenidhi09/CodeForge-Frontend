/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0f172a',
        textColor: '#f8fafc',
        accent: '#06b6d4',
        secondary: '#0ea5e9',
        subtle: '#1e293b',
        muted: '#94a3b8',
        error: '#ef4444',
      },
    },
  },
  plugins: [],
}