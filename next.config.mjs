/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // PDF dosyaları için asset/resource kullanma
    config.module.rules.push({
      test: /\.pdf$/,
      type: "asset/resource", // Next.js Webpack 5 ile asset/resource tipi kullanılır
      generator: {
        filename: "static/media/[name][hash][ext]", // Dosya adlandırma düzeni
      },
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
};

export default nextConfig;
