
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'play_button': "url('	https://fiverr-res.cloudinary.com/npm-assets/@five…_homepage_perseus/desktop-play-button.bab1740.png')",
        'footer-texture': "url('/img/footer-texture.png')",
      },
      
    },
    screens: {
      'sm': {  'max': '600px' },
      'max-900': {  'max': '900px' },
      'min-900': {  'min': '900px' },
      'max-1200': {  'max': '1200px' },
      'min-1200': {  'min': '1200px' },
      'min-1400': {  'min': '1400px' },
      'md': { 'min': '600px', 'max': '1024px' },
      'sm-md': { 'min': '0px', 'max': '1024px' },
      'md-lg': { 'min': '600px', 'max': '1200px' },
      'lg': { 'min': '1024px' },
      'xl': { 'min': '1200px'},
      'lg-xl': { 'min': '1024px', 'max': '1200px' },
      'sm-xl': { 'max': '1200px' },
    },
  },
  plugins: [
    
  ],
};