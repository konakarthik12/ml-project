/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    rewrites() {
        return [
            {
                source: '/uploads/:path*',
                destination: '/api/uploads/:path*',
            },
        ]
    },
    images: {
        unoptimized: true,
    },

}

module.exports = nextConfig
