'use client';

import { useAds } from '@/lib/hooks/useAds';
import AdMedia from './ad-media';

type UltraWideAdProps = {
    page_type: 'home' | 'doctor_list' | 'doctor_detail' | 'clinic_list' | 'clinic_detail';
    category_ids?: string;
    city?: string;
    showPlaceholder?: boolean; // Show placeholder when no ads available
    ad_selection?: 'random' | 'weighted'; // Ad selection strategy
};

/**
 * A thin full-width strip for the top of desktop pages (12:1, e.g. 1440x120 creatives). The other
 * slots are mobile shapes, at desktop width even the 2:1 one ran ~600px tall and pushed the results
 * below the fold.
 */
const UltraWideAd = ({ page_type, category_ids, city, showPlaceholder = false, ad_selection = 'random' }: UltraWideAdProps) => {
    const { ads, loading, error, containerRef, handleAdClick } = useAds({
        page_type,
        category_ids,
        city,
        limit: 1,
        asp_ratio: '12:1',
        ad_selection,
    });

    // Always render the container div so ref gets attached
    return (
        <div ref={containerRef} className="w-full" data-nosnippet>
            {loading && showPlaceholder && (
                <div className="w-full bg-gray-200 animate-pulse rounded-lg" style={{ aspectRatio: '12/1' }} />
            )}

            {!loading && (error || ads.length === 0) && showPlaceholder && (
                <div className="w-full bg-gray-200 animate-pulse rounded-lg" style={{ aspectRatio: '12/1' }} />
            )}

            {!loading && !error && ads.length > 0 && (
                <div
                    data-ad-id={ads[0]._id}
                    onClick={() => handleAdClick(ads[0])}
                    className="relative w-full bg-white rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity mb-4"
                    style={{ aspectRatio: '12/1' }}
                >
                    <AdMedia ad={ads[0]} fit="contain" />
                </div>
            )}
        </div>
    );
};

export default UltraWideAd;
