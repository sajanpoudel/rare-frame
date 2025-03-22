/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Use class strategy for dark mode
  theme: {
    extend: {
      colors: {
        // Custom colors that work well in both light and dark modes
        primary: {
          50: '#e6f1fe',
          100: '#cce3fd',
          200: '#99c8fb',
          300: '#66acf9',
          400: '#3391f7',
          500: '#0075f5',
          600: '#005ec4',
          700: '#004693',
          800: '#002f62',
          900: '#001731',
        },
      },
      backgroundColor: {
        'card-light': '#ffffff',
        'card-dark': '#1f2937',
      },
      textColor: {
        'primary-light': '#111827',
        'primary-dark': '#f3f4f6',
        'secondary-light': '#4b5563',
        'secondary-dark': '#d1d5db',
      },
      borderColor: {
        'light': '#e5e7eb',
        'dark': '#374151',
      },
      boxShadow: {
        'light': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
        'dark': '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
} 