/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "storage.googleapis.com", // Add this domain
    ],
  },
};

export default nextConfig;
