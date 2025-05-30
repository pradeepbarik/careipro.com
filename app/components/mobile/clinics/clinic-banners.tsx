'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import { clinicBannerImage, clinicProfilePic } from '@/lib/image';
const ClinicBanner = ({ name, banners, profile_pic }: { name: string, banners: Array<{ image: string }>, profile_pic: string }) => {
    return (
        <div className="px-2 mt-1 rounded-md overflow-hidden relative">
            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
                autoplay={true}
            >
                {banners.map((banner) =>
                    <SwiperSlide>
                        <img src={clinicBannerImage(banner.image)} className="h-40 w-full rounded-md" />
                    </SwiperSlide>
                )}
            </Swiper>
            {profile_pic &&
                <img src={clinicProfilePic(profile_pic)} alt={`${name} profile picture`} className="h-14 w-14 rounded-lg absolute right-4 bottom-4 z-10" />
            }
        </div>
    )
}
export default ClinicBanner;