/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  darkMode: 'class',
  theme: {

    screens: {
      sm: '480px',
      md: '600px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'blue': '#1fb6ff',
      'pink': '#ff006e',
      'orange': '#ff7849',
      'green': '#13ce66',
      'gray-dark': '#273444',
      'blue-violet': '#8338EC',
      'border-red': "rgb(239 68 68)",
      'dark-green' : "#3d7625",
      'lemon-dark' : "#abc32f",
      'lemon': "#BBC7A4"
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },

  animation: {
    'infinite-scroll': 'infinite-scroll 25s linear infinite',
  },
  keyframes: {
    'infinite-scroll': {
      from: { transform: 'translateX(0)' },
      to: { transform: 'translateX(-100%)' },
    }
  },
    }
  },
  plugins: [
    require('tailwindcss-dark-mode')(),
  ],
}

