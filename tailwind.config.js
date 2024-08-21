/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    'node_modules/flowbite-react/lib/esm/**/*.jsx',
  ],
  theme: {
    extend: {},
    colors:{
      'bg-trans': '#4b444d',
      'dark-text': '#475467',
      'dark-bg': '#1B2028',
      'col-svg': '#d1d3d4',
      'rvs-bg':'#F42E69',
      'light-pink':"#FDEAEE",
      'text-pink':"#EF295A"
      
    }
  },
  plugins: [
    require('flowbite/plugin')
]
}

