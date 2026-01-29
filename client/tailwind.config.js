/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6eef5',
          100: '#ccdcea',
          200: '#99b9d5',
          300: '#6697c1',
          400: '#3374ac',
          500: '#1e3a5f',
          600: '#2c5282',
          700: '#1a3654',
          800: '#132740',
          900: '#0d192b',
        },
        accent: {
          green: '#38a169',
          amber: '#d69e2e',
          red: '#c53030',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
