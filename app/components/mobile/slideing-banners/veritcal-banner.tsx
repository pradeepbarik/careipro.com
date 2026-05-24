'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface BannerItem {
    image: string;
    link?: string;
    alt?: string;
}

interface VerticalLandingBannerProps {
    banners: BannerItem[];
    autoplay?: boolean;
    autoplayDelay?: number;
    showPagination?: boolean;
    showNavigation?: boolean;
    loop?: boolean;
    className?: string;
    position?: string;
}

const VerticalLandingBanner = ({ 
    banners,
    autoplay = true,
    autoplayDelay = 3000,
    showPagination = true,
    showNavigation = false,
    loop = true,
    position = "relative",
    className = ''
}: VerticalLandingBannerProps) => {
    const bannerRef = useRef<HTMLDivElement>(null);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        if (position !== 'sticky') return;

        const handleScroll = () => {
            if (!bannerRef.current) return;
            
            const scrollY = window.scrollY;
            const bannerHeight = bannerRef.current.offsetHeight;
            
            // Calculate opacity based on scroll position
            // Starts fading immediately, fully transparent after banner height
            const fadeStart = 0;
            const fadeEnd = bannerHeight - 30; // Adjust this value to control fade speed (4rem = 4 * 16px)
            
            if (scrollY <= fadeStart) {
                setOpacity(1);
            } else if (scrollY >= fadeEnd) {
                setOpacity(0);
            } else {
                const fadeRange = fadeEnd - fadeStart;
                const scrollInRange = scrollY - fadeStart;
                const newOpacity = 1 - (scrollInRange / fadeRange);
                setOpacity(Math.max(0, Math.min(1, newOpacity)));
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [position]);

    return (
        <div 
            ref={bannerRef}
            className={`w-full ${position} ${className}`}
            style={{ 
                opacity: position === 'sticky' ? opacity : 1,
                transition: 'opacity 0.1s ease-out'
            }}
        >
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={0}
                slidesPerView={1}
                loop={loop}
                autoplay={autoplay ? {
                    delay: autoplayDelay,
                    disableOnInteraction: false,
                } : false}
                pagination={showPagination ? { 
                    clickable: true,
                    dynamicBullets: false,
                } : false}
                navigation={showNavigation}
                className="vertical-banner-swiper"
            >
                {banners.map((banner, index) => (
                    <SwiperSlide key={index}>
                        {banner.link ? (
                            <a href={banner.link} target="_blank" rel="noopener noreferrer" className="block w-full">
                                <img 
                                    src={banner.image} 
                                    alt={banner.alt || `Banner ${index + 1}`} 
                                    className="w-full h-auto"
                                />
                            </a>
                        ) : (
                            <img 
                                src={banner.image} 
                                alt={banner.alt || `Banner ${index + 1}`} 
                                className="w-full h-auto"
                            />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>

            <style jsx global>{`
                .vertical-banner-swiper {
                    position: relative;
                }
                .vertical-banner-swiper .swiper-pagination {
                    bottom: 15px !important;
                    position: absolute;
                    z-index: 10;
                }
                .vertical-banner-swiper .swiper-pagination-bullet {
                    background: #fff;
                    opacity: 0.6;
                    width: 8px;
                    height: 8px;
                    margin: 0 4px !important;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                }
                .vertical-banner-swiper .swiper-pagination-bullet-active {
                    background: #fff;
                    opacity: 1;
                    width: 10px;
                    height: 10px;
                }
                .vertical-banner-swiper .swiper-button-prev,
                .vertical-banner-swiper .swiper-button-next {
                    color: #fff;
                }
            `}</style>
        </div>
    );
};

export default VerticalLandingBanner;