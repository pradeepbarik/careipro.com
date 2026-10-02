'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import 'swiper/css';
import 'swiper/css/pagination';
import { CSSProperties } from "react";
import { clinicBannerImage } from "@/lib/image";
import { TSiteBanner } from "@/lib/types/home-page";

/**
 * The city's site banners for a vertical landing page, auto rotating.
 *
 * Banners are uploaded per device, so the desktop rail shows only the ones meant for it. The mobile
 * pages make the mirror-image check, and a banner marked for the other device simply does not
 * appear rather than being letterboxed into the wrong shape.
 *
 * The height is fixed so a mixed ratio upload cannot resize the row and shunt whatever sits beside
 * it up and down on every slide.
 *
 * w-full and the min-w-0 wrapper are load bearing. Swiper's own stylesheet puts margin-left/right
 * auto on .swiper, and auto side margins stop a grid item from stretching to its track, so the box
 * falls back to shrink-to-fit and sizes itself from slides that are width:100% of a container with
 * no definite width. That cycle resolves to the browser's maximum length, which overflows the page
 * and, because .swiper is positioned with z-index 1, paints over its neighbour.
 */
const SiteBannerSlider = ({ banners, height = "20rem", trailingSlide }: {
    banners: TSiteBanner[],
    height?: string,
    /* anything to show as a final slide after the uploaded banners, for a house message that should
       ride the same rotation rather than take a panel of its own */
    trailingSlide?: React.ReactNode
}) => {
    const shown = (banners || []).filter((banner) => banner.device_type === "desktop" || banner.device_type === "all");
    const slideCount = shown.length + (trailingSlide ? 1 : 0);
    if (slideCount === 0) return <></>;
    return (
        <div className="min-w-0" style={{ height }}>
            <Swiper
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop={slideCount > 1}
                modules={[Pagination, Autoplay]}
                className="w-full h-full rounded-2xl overflow-hidden"
                style={{
                    height,
                    "--swiper-pagination-color": "#fff",
                    "--swiper-pagination-bullet-inactive-color": "#fff",
                    "--swiper-pagination-bullet-inactive-opacity": "0.6"
                } as CSSProperties}
            >
                {shown.map((banner, i) => {
                    const image = (
                        <img
                            src={clinicBannerImage(banner.image)}
                            alt={banner.alt_text || ""}
                            className="block w-full h-full object-cover"
                            style={{ height }}
                        />
                    );
                    return (
                        <SwiperSlide key={`site-banner-${banner.id || i}`}>
                            {banner.link ? <Link href={banner.link} className="block h-full">{image}</Link> : image}
                        </SwiperSlide>
                    );
                })}
                {trailingSlide && (
                    <SwiperSlide key="site-banner-trailing">
                        <div className="h-full" style={{ height }}>{trailingSlide}</div>
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    );
};

export default SiteBannerSlider;
