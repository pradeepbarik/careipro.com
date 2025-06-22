'use client'
import { ReactElement, useEffect, useState } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
type TProps = {
    banners: Array<ReactElement>
}
const SwiperBanner = ({ banners }: TProps) => {
    return (
        <>
            <Swiper modules={[Autoplay]} autoplay={true}>
                {banners.map((banner,i) =>
                    <SwiperSlide key={`slide-${i}`}>
                        {banner}
                    </SwiperSlide>
                )}
            </Swiper>
        </>
    )
}
export default SwiperBanner