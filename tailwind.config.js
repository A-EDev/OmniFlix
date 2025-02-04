/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
    "./partials/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'blood-drip': 'blood-drip 5s infinite',
        'blood-pulse': 'blood-pulse 2s infinite',
        'pulse': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        glitch: 'glitch 1s linear infinite',
        pulse1: 'pulse 5s infinite',
      },
      keyframes: {
        'blood-drip': {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '50%': { transform: 'translateY(100%)', opacity: 1 },
          '100%': { transform: 'translateY(200%)', opacity: 0 },
        },
        'blood-pulse': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.5, transform: 'scale(1.05)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        }
      }

    },
  },
  plugins: [],
};
