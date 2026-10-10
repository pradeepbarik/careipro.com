'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import { CSSProperties } from "react";
import { clinicBannerImage } from '@/lib/image';
/* Full bleed hero carousel for the v2 design. Unlike the shared ClinicBanner this has
   no side padding, no rounded corners and no profile overlay, because the identity
   card below carries the logo and sits over the bottom of this.

   The height is fixed on purpose. With autoHeight a carousel of mixed ratio banners
   resizes on every slide and shunts the page content up and down, so every slide gets
   the same box.

   Within that box the banner is contained rather than cropped. These are designed
   artwork carrying a phone number and an offer, and a wide upload lost a third of its
   width to a centre crop on a phone. What is left over at the sides is filled with a
   blurred copy of the same image, so the slide still covers the box without cutting
   anything out of the banner itself. */
const BANNER_HEIGHT = "15rem";
const HeroBanner = ({ banners, name }: { banners: Array<{ image: string }>, name: string }) => {
    return (
        <Swiper
            pagination={{ dynamicBullets: true }}
            modules={[Pagination, Autoplay]}
            autoplay={true}
            style={{
                height: BANNER_HEIGHT,
                /* lift the bullets clear of the identity card overlapping the bottom */
                "--swiper-pagination-bottom": "3rem",
                "--swiper-pagination-color": "#fff"
            } as CSSProperties}
        >
            {banners.map((banner) =>
                <SwiperSlide key={banner.image}>
                    <div className="relative w-full overflow-hidden bg-gray-200" style={{ height: BANNER_HEIGHT }}>
                        {/* decorative fill, the real banner sits on top of it */}
                        <img src={clinicBannerImage(banner.image)} alt="" aria-hidden="true"
                            className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl" />
                        <img src={clinicBannerImage(banner.image)} alt={name}
                            className="relative block w-full h-full object-contain" />
                    </div>
                </SwiperSlide>
            )}
        </Swiper>
    )
}
export default HeroBanner;
