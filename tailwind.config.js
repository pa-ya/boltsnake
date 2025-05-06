/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'neon': '0 0 5px theme("colors.indigo.400"), 0 0 20px theme("colors.indigo.600")',
        'neon-food': '0 0 5px theme("colors.red.400"), 0 0 20px theme("colors.red.600")',
      },
    },
  },
  plugins: [],
};