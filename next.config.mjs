/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async()=> {
        return [
            {
                source:'/:city-in-:state',
                destination:'/city'
            }
        ]
    }
};

export default nextConfig;
