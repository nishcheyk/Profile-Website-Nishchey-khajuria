/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: '#020617', // slate-950
        surface: '#0f172a', // slate-900
        surfaceBorder: '#1e293b', // slate-800
        primary: '#f8fafc', // slate-50
        secondary: '#94a3b8', // slate-400
        accent: '#22d3ee', // neon cyan
        accent2: '#e879f9', // fuchsia
      },
      fontFamily: {
        mono: ['"Fira Code"', '"JetBrains Mono"', '"SF Mono"', 'ui-monospace', 'monospace'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'mesh': 'mesh 10s ease-in-out infinite',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
              'background-size': '400% 400%',
              'background-position': 'center top'
          },
          '50%': {
              'background-size': '200% 200%',
              'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
              'background-size': '200% 200%',
              'background-position': 'left center'
          },
          '50%': {
              'background-size': '200% 200%',
              'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
              'background-size': '400% 400%',
              'background-position': 'left center'
          },
          '50%': {
              'background-size': '200% 200%',
              'background-position': 'right center'
          }
        },
        'mesh': {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.1) rotate(180deg)' },
          '100%': { transform: 'scale(1) rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}