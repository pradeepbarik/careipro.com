'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import { BiSolidMegaphone } from "react-icons/bi";
import 'swiper/css';
import 'swiper/css/pagination';

//the banner that sits beside the hero panel, the first slide is the brand banner and the rest
//carry the business offers, each one tagged so the click can be read back in the reports
const banners: Array<{ image: string, alt: string, href?: string }> = [
    {
        image: "/banners/top-banner2.png",
        alt: "Your Health, Our Care",
    },
    {
        image: "/banners/register-clinic-banner.png",
        alt: "Register your clinic on Careipro",
        href: "/business-listing/hospital-clinic?utm_source=careipro&utm_medium=home-top-banner&utm_campaign=register-clinic-banner",
    },
    {
        image: "/banners/personalised-website.png",
        alt: "Get a personalised website for your clinic",
        href: "/business-listing/hospital-clinic?utm_source=careipro&utm_medium=home-top-banner&utm_campaign=personalised-website-banner",
    },
];

const HomePageBanner = () => {
    return (
        <Swiper
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            modules={[Pagination, Autoplay]}
            className="w-full"
        >
            {banners.map((banner) => (
                <SwiperSlide key={banner.image}>
                    {banner.href ? (
                        <Link href={banner.href} className="block">
                            <img src={banner.image} alt={banner.alt} className="w-full h-auto block" />
                        </Link>
                    ) : (
                        <img src={banner.image} alt={banner.alt} className="w-full h-auto block" />
                    )}
                </SwiperSlide>
            ))}
            {/* the sell your space slide, drawn rather than an image. the banners are all 1774x887,
                so it holds the same 2:1 box and the carousel never changes height between slides */}
            <SwiperSlide>
                <Link
                    href="/contact-us?utm_source=careipro&utm_medium=home-top-banner&utm_campaign=advertise-here"
                    className="group block aspect-[2/1] bg-primary/5 border-2 border-dashed border-primary/40 hover:border-primary hover:bg-primary/10 transition-colors"
                >
                    <div className="h-full w-full flex flex-col items-center justify-center text-center px-6">
                        <span className="h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <BiSolidMegaphone className="text-2xl" />
                        </span>
                        <p className="text-2xl font-bold text-gray-900">Advertise Here</p>
                        <p className="fs-14 text-gray-600 mt-1 max-w-sm">
                            Put your business in front of people searching for healthcare in your city.
                        </p>
                        <span className="mt-4 rounded-full bg-primary text-white font-semibold fs-14 px-5 py-2">
                            Get in touch
                        </span>
                    </div>
                </Link>
            </SwiperSlide>
        </Swiper>
    );
};

export default HomePageBanner;
