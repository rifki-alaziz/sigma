/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  darkMode: 'class',

  theme: {
    extend: {
      /* 🔤 Font Family */
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        // Menggunakan font yang mendukung style kaligrafi arab modern
        arabic: ['"Scheherazade New"', 'serif'], 
      },

      /* 🟤 Border Radius Ekstra (Untuk tema Soft/Rounded) */
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem', // Gunakan class 'rounded-5xl' sebagai pengganti 'rounded-[2.5rem]'
      },

      /* ✨ Keyframes (Hanya yang clean & playful) */
      keyframes: {
        // Efek melayang lembut untuk kartu/badge
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        // Efek fade in halus
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },

      /* 🎬 Animation Utilities */
      animation: {
        float: 'float 6s ease-in-out infinite',
        fadeIn: 'fadeIn 0.5s ease-out',
      },

      /* 🎨 Colors (Opsional: Jika ingin mendefinisikan warna brand khusus) */
      // Kita hapus warna neon (#00f0ff) dan gunakan palet bawaan Tailwind 
      // (blue-50, purple-100, teal-500) yang lebih soft.
    },
  },

  plugins: [
    // Pastikan plugin ini sudah diinstall: npm install tailwind-clip-path
    require('tailwind-clip-path'), 
  ],
};