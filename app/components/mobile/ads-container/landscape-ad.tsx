'use client';

import { useAds } from '@/lib/hooks/useAds';
import { adSrc } from '@/lib/image';
import Image from 'next/image';

type LandscapeAddProps = {
    page_type: 'home' | 'doctor_list' | 'doctor_detail' | 'clinic_list' | 'clinic_detail';
    category_ids?: string;
    city?: string;
    limit?: number;
    showPlaceholder?: boolean; // Show placeholder when no ads available
    ad_selection?: 'random' | 'weighted'; // Ad selection strategy
};

const LandscapeAd = ({ page_type, category_ids, city, limit = 1, showPlaceholder = false, ad_selection = 'random' }: LandscapeAddProps) => {
    const { ads, loading, error, containerRef, handleAdClick } = useAds({
        page_type,
        category_ids,
        city,
        limit,
        asp_ratio: '16:9', // Landscape aspect ratio
        ad_selection,
    });

    // Always render the container div so ref gets attached
    return (
        <div ref={containerRef} className="w-full my-2">
            {loading && (
                <div className="w-full h-24 bg-gray-100 animate-pulse rounded-lg" />
            )}
            {!loading && (error || ads.length === 0) ? (
                showPlaceholder ? <div className="w-full h-24 bg-gray-100 animate-pulse rounded-lg" />: null
            ) : null}

            {!loading && !error && ads.length > 0 && (
                <div className="w-full">
                    <div
                        data-ad-id={ads[0]._id}
                        onClick={() => handleAdClick(ads[0])}
                        className="relative w-full max-h-32 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    >
                        {ads[0].media_type === 'image' ? (
                            <Image
                                src={adSrc(ads[0].link)}
                                alt={ads[0].alt || 'Advertisement'}
                                fill
                                className="object-cover w-full h-full"
                                sizes="100vw"
                                priority
                            />
                        ) : (
                            <video
                                src={adSrc(ads[0].link)}
                                className="w-full h-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        )}
                    </div>
                    
                    {/* CTA Button */}
                    {ads[0].cta_button_text && ads[0].cta_button_url && (
                        <button
                            onClick={() => {
                                window.open(ads[0].cta_button_url, '_blank', 'noopener,noreferrer');
                            }}
                            className="w-full mt-2 px-4 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors"
                        >
                            {ads[0].cta_button_text}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default LandscapeAd;