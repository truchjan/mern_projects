/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'montserrat': ['Montserrat', 'sans-serif']
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}

