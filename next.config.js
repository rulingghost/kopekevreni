/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    appDir: true,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Bellek içi (RAM) önbellek: hem Türkçe klasör yolu (köpekevreni) ChunkLoadError hatasını önler hem de sayfalar arası geçişi maksimum hıza çıkarır
      config.cache = {
        type: "memory",
      };
    }
    return config;
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "a0.muscache.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.gstatic.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
