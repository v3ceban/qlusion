/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "9m4nqkf54itqyuue.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
