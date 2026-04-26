'use client';
import { useEffect,useState } from "react";
// Banner data
const banners = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80",
        title: "Find Local Pharmacies",
        subtitle: "Discover the best pharmacies near you"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
        title: "Get Medicines Delivered",
        subtitle: "Order now and get doorstep delivery"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80",
        title: "Trusted & Verified Stores",
        subtitle: "Quality medicines from verified pharmacies"
    },
];
const Banner = () => {
    const [currentBanner, setCurrentBanner] = useState(0);

    // Auto-rotate banners every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-32 mb-4 overflow-hidden rounded-xl mx-2">
            {banners.map((banner, index) => (
                <div
                    key={banner.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentBanner ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <img
                        src={banner.image}
                        alt={banner.title}
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
                    {/* Text content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h2 className="text-lg font-bold text-white mb-1">
                            {banner.title}
                        </h2>
                        <p className="text-white/90 text-xs">
                            {banner.subtitle}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default Banner;