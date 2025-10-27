// timeline-component/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  // Specify the files where Tailwind should look for class names
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    // Extend the default Tailwind theme with custom tokens
    extend: {
      colors: {
        // Required Primary Color Palette
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9', // Base blue for main actions
          600: '#0284c7', // Darker blue for hover/active
          700: '#0369a1',
        },
        // Required Neutral Color Palette (Grayscale)
        neutral: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          700: '#3f3f46',
          900: '#18181b', // Main text color
        },
      },
      // Required Custom Spacing Units
      spacing: {
        18: '4.5rem', // 72px
        88: '22rem',  // 352px (e.g., for large container widths)
      },
      // Required Custom Border Radius
      borderRadius: {
        'xl': '0.75rem', // 12px (Used for the main component container)
      },
    },
  },
  plugins: [],
}