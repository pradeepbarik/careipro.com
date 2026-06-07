'use client';

import { useAds } from '@/lib/hooks/useAds';
import { adSrc } from '@/lib/image';
import Image from 'next/image';

type PortraitAddProps = {
    page_type: 'home' | 'doctor_list' | 'doctor_detail' | 'clinic_list' | 'clinic_detail';
    category_ids?: string;
    city?: string;
    limit?: number;
    showPlaceholder?: boolean; // Show placeholder when no ads available
    ad_selection?: 'random' | 'weighted'; // Ad selection strategy
};

const PortraitAd = ({ page_type, category_ids, city, limit = 1, showPlaceholder = false, ad_selection = 'random' }: PortraitAddProps) => {
    const { ads, loading, error, containerRef, handleAdClick } = useAds({
        page_type,
        category_ids,
        city,
        limit,
        asp_ratio: '9:16', // Portrait aspect ratio
        ad_selection,
    });

    if (loading) {
        return (
            <div className="w-full h-96 bg-gray-100 animate-pulse rounded-lg" />
        );
    }

    if (!loading && (error || ads.length === 0)) {
        return showPlaceholder ? (
            <div className="w-full h-96 bg-gray-100 animate-pulse rounded-lg" />
        ) : null;
    }

    const ad = ads[0];

    return (
        <div ref={containerRef} className="w-full my-2">
            <div
                data-ad-id={ad._id}
                onClick={() => handleAdClick(ad)}
                className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
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
                <div className="absolute top-1 right-1 bg-black/50 text-white text-xs px-2 py-0.5 rounded">
                    Ad
                </div>
            </div>
        </div>
    );
};

export default PortraitAd;
