/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        burgundy: {
          50: '#FDF2F4',
          100: '#FBE5E9',
          200: '#F7CCD4',
          300: '#F0A3B1',
          400: '#E47185',
          500: '#C73E55',
          600: '#A31D34',
          700: '#800020', // Classic Burgundy
          800: '#6B0F1A', // Logo primary Burgundy
          900: '#4A0E17',
          950: '#2E060D',
        },
        gold: {
          50: '#FCF9EE',
          100: '#F8F1D6',
          200: '#EFE0AC',
          300: '#E5CD7E',
          400: '#D4AF37', // Metallic Gold
          500: '#C5A059', // Logo warm gold
          600: '#A8823B',
          700: '#85642B',
          800: '#664B22',
          900: '#4A3418',
        },
        ivory: {
          50: '#FAF9F6', // Warm Ivory background
          100: '#F5F3EF',
          200: '#EBE7DF',
          300: '#DDD7CB',
          400: '#C5BEAF',
        },
        charcoal: {
          900: '#1A1A1A',
          800: '#2C2C2C',
          700: '#404040',
          600: '#5C5C5C',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Cinzel', 'serif'],
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(107, 15, 26, 0.07), 0 0 20px rgba(0, 0, 0, 0.04)',
        'luxury-hover': '0 25px 50px -12px rgba(107, 15, 26, 0.14), 0 0 25px rgba(197, 160, 89, 0.1)',
        'gold-glow': '0 0 25px rgba(197, 160, 89, 0.25)',
      }
    },
  },
  plugins: [],
}
