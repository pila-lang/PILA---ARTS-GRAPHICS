/** @type {import('next').NextConfig} */
const nextConfig = {
    // This tells Netlify to ignore code-style errors during the build
    eslint: {
        ignoreDuringBuilds: true,
    },
    // This ignores TypeScript errors if they appear
    typescript: {
        ignoreBuildErrors: true,
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
