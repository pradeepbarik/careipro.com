'use client';

import { useAds } from '@/lib/hooks/useAds';
import { adSrc } from '@/lib/image';
import Image from 'next/image';

type WideAdProps = {
    page_type: 'home' | 'doctor_list' | 'doctor_detail' | 'clinic_list' | 'clinic_detail';
    category_ids?: string;
    city?: string;
    limit?: number;
    showPlaceholder?: boolean; // Show placeholder when no ads available
    ad_selection?: 'random' | 'weighted'; // Ad selection strategy
};

const WideAd = ({ page_type, category_ids, city, limit = 1, showPlaceholder = false, ad_selection = 'random' }: WideAdProps) => {
    const { ads, loading, error, containerRef, handleAdClick } = useAds({
        page_type,
        category_ids,
        city,
        limit,
        asp_ratio: '2:1', // Wide aspect ratio
        ad_selection,
    });

    // Always render the container div so ref gets attached
    return (
        <div ref={containerRef} className="w-full my-2">
            {loading && (
                <div className="w-full bg-gray-100 animate-pulse rounded-lg" style={{ aspectRatio: '2/1' }} />
            )}

            {!loading && (error || ads.length === 0) && showPlaceholder && (
                <div className="w-full bg-gray-100 animate-pulse rounded-lg" style={{ aspectRatio: '2/1' }} />
            )}

            {!loading && !error && ads.length > 0 && (
                <div
                    data-ad-id={ads[0]._id}
                    onClick={() => handleAdClick(ads[0])}
                    className="relative w-full bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    style={{ aspectRatio: '2/1' }}
                >
                    {ads[0].media_type === 'image' ? (
                        <Image
                            src={adSrc(ads[0].link)}
                            alt={ads[0].alt || 'Advertisement'}
                            fill
                            className="object-contain w-full h-full"
                            sizes="100vw"
                            priority
                        />
                    ) : (
                        <video
                            src={adSrc(ads[0].link)}
                            className="w-full h-full object-contain"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default WideAd;
