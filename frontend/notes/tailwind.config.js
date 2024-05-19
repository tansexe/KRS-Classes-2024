/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      //colors used
      colors:{
        primary:'#000000',
        secondary: 'EF863E'
      },
    },
  },
  plugins: [],
}