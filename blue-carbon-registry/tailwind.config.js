/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // NEW COLOR PALETTE
      colors: {
        'background': '#F4F7FE', // Light bluish-white
        'surface': '#FFFFFF',    // Pure white for cards
        'primary': '#2563EB',    // A strong blue for buttons and accents
        'primary-hover': '#1D4ED8',
        'secondary': '#475569',  // A muted gray for secondary text
        'text-primary': '#1E293B', // Dark slate for primary text
        'text-secondary': '#64748B',
        'border': '#E2E8F0',    // Light border color
        'accent-green': '#10B981',
      },
      // Keep our animations
      keyframes: {
        'fade-in-up': {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
          'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
      }
    },
  },
  plugins: [],
}