import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.weatherapi.com',
        port: '',
        pathname: '/weather/64x64/day/*.png',
        search: ''
      }
    ]
  }
};

export default nextConfig;
