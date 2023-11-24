const withPlugins = require('next-compose-plugins');

const withMDX = require('@next/mdx')();
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx']
};

//module.exports = withMDX(nextConfig);
module.exports = withPlugins([withNextra], nextConfig);
//module.exports = nextConfig;
