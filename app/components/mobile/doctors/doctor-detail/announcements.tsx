'use client'
import { useState } from 'react';
import { BiBell, BiX } from 'react-icons/bi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { TDoctorDetail } from '@/lib/types/doctor';

type TAnnouncement = NonNullable<TDoctorDetail['announcements']>[number];

const AnnouncementCard = ({ a, onDismiss }: { a: TAnnouncement, onDismiss: () => void }) => (
    <div className="bg-amber-100 border border-amber-300 rounded-xl px-3 py-3 flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-amber-300 flex items-center justify-center shrink-0">
            <BiBell className="text-amber-700" style={{ fontSize: '1.1rem' }} />
        </div>
        <div className="flex flex-col grow">
            <span className="font-semibold text-sm text-gray-800">{a.title}</span>
            <span className="text-xs text-gray-600 mt-0.5">{a.message}</span>
        </div>
        <BiX className="text-lg text-gray-500 shrink-0" onClick={onDismiss} />
    </div>
);

const Announcements = ({ announcements }: { announcements: TAnnouncement[] }) => {
    const [dismissed, setDismissed] = useState<string[]>([]);
    const now = Date.now();
    const visible = announcements.filter((a) =>
        (a.expiry_type === 'forever' || new Date(a.expiry_date).getTime() > now) &&
        !dismissed.includes(a.title + a.created_at)
    );
    if (visible.length === 0) {
        return <></>
    }
    if (visible.length === 1) {
        const a = visible[0];
        return (
            <div className="px-2 mt-2">
                <AnnouncementCard a={a} onDismiss={() => setDismissed((prev) => [...prev, a.title + a.created_at])} />
            </div>
        )
    }
    return (
        <div className="px-2 mt-2 announcements-swiper">
            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={8}
                slidesPerView={1}
                loop={visible.length > 1}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
            >
                {visible.map((a) => {
                    const key = a.title + a.created_at;
                    return (
                        <SwiperSlide key={key}>
                            <div className="pb-4">
                                <AnnouncementCard a={a} onDismiss={() => setDismissed((prev) => [...prev, key])} />
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            <style jsx global>{`
                .announcements-swiper .swiper-pagination {
                    left: auto;
                    right: 8px;
                    bottom: 16px;
                    width: auto;
                    transform: none;
                }
                .announcements-swiper .swiper-pagination-bullet {
                    background: #b45309;
                    opacity: 0.4;
                    width: 6px;
                    height: 6px;
                }
                .announcements-swiper .swiper-pagination-bullet-active {
                    opacity: 1;
                    width: 16px;
                    border-radius: 4px;
                }
            `}</style>
        </div>
    )
}
export default Announcements;
