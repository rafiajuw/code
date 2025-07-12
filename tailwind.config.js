module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'custom-gray': '#f7fafc',
        'mirror-blue': '#1e40af',
      },
      animation: {
        'mirrorFade': 'mirrorFade 2s infinite',
        'rotate3d': 'rotate3d 10s linear infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}