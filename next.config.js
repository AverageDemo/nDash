module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['openweathermap.org'],
  },
  env: {
    OW_API_KEY: process.env.OW_API_KEY,
  },
};
