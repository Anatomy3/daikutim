const withTM = require('next-transpile-modules')(['googleapis']);
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

module.exports = withPWA(withTM({
  images: {
    domains: ['daikuinterior.com'],
  },
  // Konfigurasi Next.js lainnya
}));