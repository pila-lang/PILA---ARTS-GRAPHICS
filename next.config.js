/** @type {import('next').NextConfig} */
const nextConfig = {
    // Server Actions are enabled by default in Next.js 14
    experimental: {
        // serverActions: true, // No longer needed in 14
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
};

module.exports = nextConfig;
