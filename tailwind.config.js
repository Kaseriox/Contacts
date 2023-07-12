/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: { 
      colors:{
        custom:{
          red: '#A61A11',
          blue:'#1F3F77',
          lightblue:'#0054A6',
          lightgray:'#F1F2F4',
          gray:'#414042',
          white:'#FFFFFF'
        }
    }},

  },
  plugins: [],
}

