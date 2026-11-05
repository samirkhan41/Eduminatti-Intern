/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070F1E',
          900: '#0B192C',
          800: '#152A4A',
          700: '#1E3E62',
          600: '#2B527E',
          500: '#3D6999',
          100: '#E9EEF5',
          50: '#F4F7FB',
        },
        gold: {
          600: '#A47E1B',
          500: '#C5A059',
          400: '#D4AF37',
          300: '#E6CA65',
          100: '#FDF8E7',
          50: '#FEFCF3',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(11, 25, 44, 0.06)',
        'premium': '0 10px 30px -5px rgba(11, 25, 44, 0.1)',
        'hover': '0 20px 35px -10px rgba(11, 25, 44, 0.15)',
      },
    },
  },
  plugins: [],
}

