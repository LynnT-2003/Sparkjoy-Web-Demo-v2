/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "aceternity.com",
      "picsum.photos",
      "lh3.googleusercontent.com",
    ], // Add this line to allow images from unsplash.com
  },
};

export default nextConfig;
