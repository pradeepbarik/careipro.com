'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import Link from "next/link";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const HomePageBanner = () => {    
    return (
        <Swiper autoplay={{ delay: 3000 }} pagination={{ clickable: true }} modules={[Pagination, Autoplay]} className="mySwiper">
            <SwiperSlide>
                <img src="https://careipro.com/assets/images/banners/advertise-banner/mobile/hire-caretaker.jpeg" className="rounded-lg h-40 w-full" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://careipro.com/assets/images/banners/advertise-banner/mobile/hire-caretaker.jpeg" className="rounded-lg h-40 w-full" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://careipro.com/assets/images/banners/advertise-banner/mobile/hire-caretaker.jpeg" className="rounded-lg h-40 w-full" />
            </SwiperSlide>
        </Swiper>
    );
};

export default HomePageBanner;