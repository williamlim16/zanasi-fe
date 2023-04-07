/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          10: '#0c0b09',
          20: '#002D6D',
          30: '#0c266f'
        },
        grey: '#98989A'
      }
    },
  },
corePlugins: {
  aspectRatio: false,
},
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
