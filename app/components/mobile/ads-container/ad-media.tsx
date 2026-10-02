'use client';

import { adSrc } from '@/lib/image';

type TAdMedia = { media_type: 'image' | 'video', link: string, alt?: string };

/**
 * The image or video inside every ad slot. One component so the rules below are written once and
 * cannot drift apart across the six slot shapes.
 *
 * Three things here are deliberate and should not be tidied back:
 *
 * 1. A plain <img>, not next/image. next/image rewrites the src to /_next/image?url=..., so the url
 *    google crawls belongs to the next optimiser rather than to /assets/ads/, and an
 *    "X-Robots-Tag: noindex" that nginx puts on /assets/ads/ never reaches the crawler. With a plain
 *    tag the crawled url is the asset itself, which the asset server controls.
 *
 * 2. alt is always the literal word "Advertisement", never the advertiser's own alt text. An ad for
 *    one doctor running on a page titled "Skin Specialist Doctors" was being indexed by google
 *    images as a skin specialist, because the alt named a doctor and the page named a specialism.
 *    The advertiser's wording belongs in the creative, not in this page's vocabulary.
 *
 * 3. Lazily loaded and never priority. An ad is never the thing the visitor came for, so it must not
 *    compete with the page's own content for the first paint.
 */
/* written out rather than built with a template string: tailwind generates classes by scanning the
   source text, so a composed `object-${fit}` would never be emitted */
const FIT_CLASS = {
    cover: 'absolute inset-0 w-full h-full object-cover',
    contain: 'absolute inset-0 w-full h-full object-contain'
};

const AdMedia = ({ ad, fit = 'cover' }: { ad: TAdMedia, fit?: 'cover' | 'contain' }) => {
    const className = FIT_CLASS[fit];
    if (ad.media_type === 'video') {
        return (
            <video
                src={adSrc(ad.link)}
                className={className}
                autoPlay
                muted
                loop
                playsInline
            />
        );
    }
    return (
        <img
            src={adSrc(ad.link)}
            alt="Advertisement"
            className={className}
            loading="lazy"
            decoding="async"
        />
    );
};

export default AdMedia;
