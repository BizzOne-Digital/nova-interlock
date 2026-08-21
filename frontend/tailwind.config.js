/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'nova-bg': '#090B0C',
        'nova-bg-secondary': '#111416',
        'nova-card': '#171A1C',
        'nova-gold': '#CBA56A',
        'nova-stone': '#D7CCBC',
        'nova-text': '#F5F3EF',
        'nova-text-secondary': '#A9A9A6',
        'nova-border': 'rgba(203, 165, 106, 0.25)',
      },
      fontFamily: {
        heading: ['Sora', 'Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #CBA56A 0%, #D7CCBC 100%)',
      },
    },
  },
  plugins: [],
};
