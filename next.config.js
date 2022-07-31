const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');

dotenvLoad()

const withNextEnv = nextEnv()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
}

module.exports = withNextEnv({
  nextConfig
})
