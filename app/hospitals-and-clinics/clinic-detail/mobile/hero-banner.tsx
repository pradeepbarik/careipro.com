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
   resizes on every slide and shunts the page content up and down, so instead every
   slide gets the same box and an off ratio upload is centre cropped. */
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
                    <img src={clinicBannerImage(banner.image)} alt={name}
                        className="block w-full object-cover" style={{ height: BANNER_HEIGHT }} />
                </SwiperSlide>
            )}
        </Swiper>
    )
}
export default HeroBanner;
