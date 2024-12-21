module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        primary: {
          "primary": "#be123c",
          "secondary": "#9f1239",
          "accent": "#fb7185",
          "neutral": "#ffe4e6",
          "base-100": "#881337",
          "info": "#9f1239",
          "success": "#d9f99d",
          "warning": "#fef08a",
          "error": "#991b1b",
        },
      },
    ],
  },
};