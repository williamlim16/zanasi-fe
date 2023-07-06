/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  typescript:{
      ignoreBuildErrors: true,
    },

    eslint:{
      ignoreDuringBuilds: true,
    },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost'
      },
      {
        protocol: 'https',
        hostname: 'williamlim.dev'
      },
      {
        protocol: 'http',
        hostname: '52.77.244.80'
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1'
      }
    ]
  },
  env:{
    host:'http://52.77.244.80',
    googleMap: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15867.535489301074!2d106.8944799!3d-6.146296!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f54481a07e47%3A0x4dddbf9a3f872e17!2sPT.%20Printama%20Sukses!5e0!3m2!1sen!2sid!4v1680398806569!5m2!1sen!2sid'
  },
})
