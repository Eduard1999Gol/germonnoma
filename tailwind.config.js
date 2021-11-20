module.exports = {
    purge: [
    ],
    darkMode: false, 
    theme: {
      extend: {},
    },
    variants: {
      extend: {
      },
    },
    plugins: [
      require('tailwindcss'),
      require('autoprefixer'),
      require('@tailwindcss/line-clamp')
    ]
  }
