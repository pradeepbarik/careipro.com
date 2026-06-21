'use client';

import { fetchJson, httpPost } from '@/lib/services/http-client';
import { IResponse } from '@/lib/services/http-server';
import { useState, useEffect, useRef, useCallback } from 'react';

type TAd = {
    _id: string;
    media_type: 'image' | 'video';
    link: string;
    alt: string;
    asp_ratio: string;
    impression: number;
    click: number;
    banner_link: string;
    cta_button_text?: string;
    cta_button_url?: string;
};

type UseAdsParams = {
    page_type: 'home' | 'doctor_list' | 'doctor_detail' | 'clinic_list' | 'clinic_detail';
    category_ids?: string; // Comma-separated category IDs
    city?: string;
    limit?: number;
    enabled?: boolean; // Whether to fetch automatically
    asp_ratio?: string; // Aspect ratio like "16:9", "1:1", "9:16"
    ad_selection?: 'random' | 'weighted'; // Ad selection strategy: 'random' for fair distribution, 'weighted' for bid-based
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://careipro.com:9000/ads';

export const useAds = ({ page_type, category_ids, city, limit = 5, enabled = true, asp_ratio, ad_selection = 'random' }: UseAdsParams) => {
    const [ads, setAds] = useState<TAd[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const fetchedRef = useRef(false);
    const impressionTrackedRef = useRef<Set<string>>(new Set());

    // Fetch ads when component is in viewport
    const fetchAds = useCallback(async () => {
        if (!enabled || fetchedRef.current) {
            console.log('Fetch blocked:', { enabled, already_fetched: fetchedRef.current });
            return;
        }

        console.log('Fetching ads with params:', { page_type, category_ids, city, asp_ratio, ad_selection, limit });
        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({
                page_type,
                limit: limit.toString(),
                ad_selection,
            });

            if (category_ids) params.append('category_ids', category_ids);
            if (city) params.append('city', city);
            if (asp_ratio) params.append('asp_ratio', asp_ratio);

            const url = `${API_BASE_URL}/get-ads?${params.toString()}`;
            console.log('Fetching from URL:', url);
             const result = await fetchJson<IResponse<TAd[]>>("/ads/get-ads?" + params.toString())
            if (result.code === 200 && result.data) {
                console.log('Ads loaded:', result.data.length);
                setAds(result.data);
                fetchedRef.current = true;
            } else {
                console.error('API returned error:', result);
                setError(result.message || 'Failed to fetch ads');
            }
        } catch (err) {
            console.error('Fetch ads error:', err);
            setError('Failed to load ads');
        } finally {
            setLoading(false);
        }
    }, [page_type, category_ids, city, asp_ratio, ad_selection, limit, enabled]);

    // Track impression for an ad
    const trackImpression = useCallback(async (adId: string) => {
        if (impressionTrackedRef.current.has(adId)) return;

        try {
            console.log('Tracking impression for ad:', adId);
            await httpPost('/ads/track-impression', { ad_id: adId });
            console.log('Impression tracked for:', adId);
            impressionTrackedRef.current.add(adId);
        } catch (err) {
            console.error('Track impression error:', err);
        }
    }, []);

    // Track click for an ad
    const trackClick = useCallback(async (adId: string) => {
        try {
            console.log('Tracking click for ad:', adId);
            await httpPost('/ads/track-click', { ad_id: adId });
            console.log('Click tracked for:', adId);
        } catch (err) {
            console.error('Track click error:', err);
        }
    }, []);

    // Handle ad click
    const handleAdClick = useCallback((ad: TAd) => {
        trackClick(ad._id);
        if (ad.banner_link) {
            const url = `${ad.banner_link}?utm_source=careipro&utm_medium=ad&utm_campaign=${ad._id}`;
            try {
                const isSameDomain = new URL(ad.banner_link).hostname === window.location.hostname;
                if (isSameDomain) {
                    window.location.href = url;
                } else {
                    window.open(url, '_blank', 'noopener,noreferrer');
                }
            } catch {
                window.location.href = url;
            }
        }
    }, [trackClick]);

    // Setup IntersectionObserver to fetch ads when container is visible
    useEffect(() => {
        if (!containerRef.current || !enabled) {
            console.log('Observer setup skipped:', { hasRef: !!containerRef.current, enabled });
            return;
        }

        console.log('Setting up IntersectionObserver for ads container');

        const handleIntersection = (entries: any[]) => {
            console.log('IntersectionObserver triggered:', { 
                entriesCount: entries.length,
                already_fetched: fetchedRef.current 
            });
            
            entries.forEach((entry) => {
                console.log('Entry:', { 
                    isIntersecting: entry.isIntersecting, 
                    target: entry.target,
                    already_fetched: fetchedRef.current
                });
                
                if (entry.isIntersecting && !fetchedRef.current) {
                    console.log('Calling fetchAds from observer');
                    fetchAds();
                }
            });
        };

        observerRef.current = new IntersectionObserver(handleIntersection, {
            threshold: 0.1, // Trigger when 10% of container is visible
        });

        console.log('Observing container:', containerRef.current);
        observerRef.current.observe(containerRef.current);

        return () => {
            console.log('Cleaning up IntersectionObserver');
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [fetchAds, enabled]);

    // Setup IntersectionObserver to track impressions when ads are 50% visible
    useEffect(() => {
        console.log('Impression observer effect:', { ads_count: ads.length, hasRef: !!containerRef.current });
        
        if (ads.length === 0 || !containerRef.current) {
            console.log('Impression observer skipped');
            return;
        }

        console.log('Setting up impression tracking observer');

        const adObserver = new IntersectionObserver(
            (entries) => {
                console.log('Impression observer triggered, entries:', entries.length);
                entries.forEach((entry) => {
                    console.log('Entry isIntersecting:', entry.isIntersecting, 'intersectionRatio:', entry.intersectionRatio);
                    if (entry.isIntersecting) {
                        const adId = entry.target.getAttribute('data-ad-id');
                        console.log('Ad ID from attribute:', adId);
                        if (adId) {
                            console.log('Calling trackImpression for ad:', adId);
                            trackImpression(adId);
                        }
                    }
                });
            },
            { threshold: [0.1, 0.25, 0.5, 0.75, 1] } // Track at multiple thresholds
        );

        // Observe all ad elements
        const adElements = containerRef.current.querySelectorAll('[data-ad-id]');
        console.log('Found ad elements with data-ad-id:', adElements.length);
        adElements.forEach((element) => {
            console.log('Observing element:', element);
            adObserver.observe(element);
        });

        return () => {
            console.log('Cleaning up impression observer');
            adObserver.disconnect();
        };
    }, [ads, trackImpression]);

    return {
        ads,
        loading,
        error,
        containerRef,
        handleAdClick,
        trackImpression,
        trackClick,
        refetch: fetchAds,
    };
};
