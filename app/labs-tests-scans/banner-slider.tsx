'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import 'swiper/css';
import 'swiper/css/pagination';
import { CSSProperties } from "react";
import { clinicBannerImage } from "@/lib/image";
import { TTestsScansBanner } from "@/lib/hooks/useTestsScans";

/**
 * The city's promo banners, auto rotating. Unlike the clinic hero, these are campaign slots rather
 * than photos of one place, so one at a time with a rotation is the right read.
 *
 * The height is fixed so a mixed ratio upload cannot resize the row and shunt the specialists panel
 * beside it up and down on every slide.
 *
 * w-full and the min-w-0 wrapper are not decoration. Swiper's own stylesheet puts margin-left/right
 * auto on .swiper, and auto side margins stop a grid item from stretching to its track, so the box
 * falls back to shrink-to-fit and sizes itself off slides that are width:100% of a container with no
 * definite width. That cycle resolves to the browser's maximum length, which overflows the page and,
 * because .swiper is positioned with z-index 1, paints over whatever shares the row with it.
 */
const BannerSlider = ({ banners, height = "18rem" }: { banners: TTestsScansBanner[], height?: string }) => {
    if (banners.length === 0) return <></>;
    return (
        <div className="min-w-0" style={{ height }}>
            <Swiper
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop={banners.length > 1}
                modules={[Pagination, Autoplay]}
                className="w-full h-full rounded-2xl overflow-hidden"
                style={{
                    height,
                    "--swiper-pagination-color": "#fff",
                    "--swiper-pagination-bullet-inactive-color": "#fff",
                    "--swiper-pagination-bullet-inactive-opacity": "0.6"
                } as CSSProperties}
            >
                {banners.map((banner, i) => {
                    const image = (
                        <img
                            src={clinicBannerImage(banner.image)}
                            alt={banner.alt_text}
                            className="block w-full h-full object-cover"
                            style={{ height }}
                        />
                    );
                    return (
                        <SwiperSlide key={`banner-${i}`}>
                            {banner.link ? <Link href={banner.link} className="block h-full">{image}</Link> : image}
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default BannerSlider;
