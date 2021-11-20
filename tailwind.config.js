module.exports = {
    purge: [
      "./client/*.css",
      "./client/*.js",
      "./client/*.html"
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
      require('@tailwindcss/forms'),
      require('@tailwindcss/line-clamp')
    ]
  }
