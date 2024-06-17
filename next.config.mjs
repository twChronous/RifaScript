/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        TOKEN: process.env.TOKEN,
        URL: process.env.URL,
    },
};

export default nextConfig;
