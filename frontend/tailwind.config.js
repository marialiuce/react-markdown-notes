/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#444E64',     
        'brand-blue': '#5D6D9F',  
        'sidebar-bg': '#D5DFC9',     
        'note-card': '#F9F3A7',       
        'note-active': '#5D6D9F',    
        'text-primary': '#000000',    
        'text-secondary': '#000000',  
        'delete-btn': '#F95F5F',      
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], 
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}