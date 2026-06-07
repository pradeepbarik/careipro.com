'use client';

import { useAds } from '@/lib/hooks/useAds';
import { adSrc } from '@/lib/image';
import Image from 'next/image';
import { useState } from 'react';

type CarouselAddProps = {
    page_type: 'home' | 'doctor_list' | 'doctor_detail' | 'clinic_list' | 'clinic_detail';
    category_ids?: string;
    city?: string;
    limit?: number;
    showPlaceholder?: boolean; // Show placeholder when no ads available
    ad_selection?: 'random' | 'weighted'; // Ad selection strategy
};

const CarouselAd = ({ page_type, category_ids, city, limit = 3, showPlaceholder = false, ad_selection = 'random' }: CarouselAddProps) => {
    const { ads, loading, error, containerRef, handleAdClick } = useAds({
        page_type,
        category_ids,
        city,
        limit,
        ad_selection,
        asp_ratio: '16:9,1:1,9:16', // Multiple aspect ratios
    });
    const [currentIndex, setCurrentIndex] = useState(0);

    if (loading) {
        return (
            <div className="w-full h-48 bg-gray-100 animate-pulse rounded-lg" />
        );
    }

    if (!loading && (error || ads.length === 0)) {
        return showPlaceholder ? (
            <div className="w-full h-48 bg-gray-100 animate-pulse rounded-lg" />
        ) : null;
    }

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % ads.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + ads.length) % ads.length);
    };

    return (
        <div ref={containerRef} className="w-full my-2 relative">
            <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                {ads.map((ad, index) => (
                    <div
                        key={ad._id}
                        data-ad-id={ad._id}
                        onClick={() => handleAdClick(ad)}
                        className={`absolute inset-0 cursor-pointer hover:opacity-90 transition-all duration-500 ${
                            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                    >
                        {ad.media_type === 'image' ? (
                            <Image
                                src={adSrc(ad.link)}
                                alt={ad.alt || 'Advertisement'}
                                fill
                                className="object-cover"
                                sizes="100vw"
                            />
                        ) : (
                            <video
                                src={adSrc(ad.link)}
                                className="w-full h-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        )}
                    </div>
                ))}
                
                {/* Ad Label */}
                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded z-20">
                    Ad
                </div>

                {/* Navigation Buttons */}
                {ads.length > 1 && (
                    <>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePrev();
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 z-20 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleNext();
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 z-20 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Dots Indicator */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                            {ads.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentIndex(index);
                                    }}
                                    className={`w-2 h-2 rounded-full transition-all ${
                                        index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
                                    }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CarouselAd;
