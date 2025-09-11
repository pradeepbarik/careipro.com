'use client'
import Link from "next/link";
import { BiSolidMap, BiClinic, BiRightArrowAlt, BiChevronRight } from "react-icons/bi";
import { THomePageData, TPopularDoctor } from "@/lib/types/home-page";
import { array_chunk } from '@/lib/helper';
import { doctorDetailPageUrl } from "@/lib/helper/link";
import { useState } from "react";
import moment, { get_current_datetime } from "@/lib/helper/date-time";
const PopularDoctor = ({ data }: { data: THomePageData['popularDoctors'] }) => {
    let chunks = array_chunk([...data], 1, [])
    return <>

        <div className='flex overflow-auto cp-section text-center bg-white hide-scroll-bar' style={{ gap: '1%' }}>
            {chunks.map((doctors, i) => {
                return (
                    <div className="flex flex-col gap-2 shrink-0" key={`doctors-${i}`} style={{ width: '25%' }}>
                        {doctors.map((doctor) =>
                            <div key={doctor.id} className="flex flex-col gap-2 shrink-0 items-center justify-center py-1">
                                <img src={doctor.image} alt={"Profile picture of " + doctor.name} className="w-20 h-20 rounded-full" />
                                <Link href={doctor.seo_url} className="font-semibold">{doctor.name}</Link>
                            </div>
                        )}
                    </div>
                )
            }
            )}
        </div>
    </>
}
const PopularDoctor2 = ({ data, showFilter }: { data: THomePageData['popularDoctors'], showFilter?: boolean }) => {
    const [available, setAvailable] = useState("all")
    let chunks: Array<Array<TPopularDoctor>> = [];
    if (available === "today" && showFilter === true) {
        let today_date = get_current_datetime(true);
        let doctors = data.filter((d) => { return d.available_dates && d.available_dates[today_date] });
        if (doctors.length > 0) {
            if (doctors.length <= 3) {
                chunks = array_chunk(doctors, 1, []);
            } else {
                chunks = array_chunk(doctors, 2, []);
            }
        } else {
            chunks = [];
        }
    } else if (available === "tomorrow" && showFilter === true) {
        let tomorrow_date = moment(get_current_datetime(true)).add(1, 'days').format("YYYY-MM-DD");
        let doctors = data.filter((d) => { return d.available_dates && d.available_dates[tomorrow_date] });
        if (doctors.length > 0) {
            if (doctors.length <= 3) {
                chunks = array_chunk(doctors, 1, []);
            } else {
                chunks = array_chunk(doctors, 2, []);
            }
        } else {
            chunks = [];
        }
    } else {
        chunks = array_chunk([...data], 2, []);
    }
    return <>
        {showFilter === true &&
            <div className="flex space-x-2 overflow-x-auto px-2 hide-scroll-bar pb-2">
                <button className={`px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-300 ${available === 'all' ? 'bg-primary color-white' : 'bg-white'}`} onClick={() => { setAvailable("all") }}>All</button>
                <button className={`px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-300 ${available === 'today' ? 'bg-primary color-white' : 'bg-white'}`} onClick={() => { setAvailable("today") }}>Available Today</button>
                <button className={`bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-300 ${available === 'tomorrow' ? 'bg-primary color-white' : 'bg-white'}`} onClick={() => { setAvailable("tomorrow") }}>Available Tomorrow</button>
            </div>
        }
        {chunks.length === 0 && <div className="flex flex-col items-center justify-center py-10 border bg-white mx-2 rounded-md">
            <img src="/icon/no-data.png" className="h-20" />
            <span className="mt-2 font-semibold">No doctors available</span>
        </div>
        }
        <div className='flex overflow-auto cp-section hide-scroll-bar' style={{ gap: '.6rem' }}>
            {chunks.map((doctors, i) => {
                return (
                    <div key={`doctors-${i}`} className="flex flex-col gap-2 shrink-0" style={{ width: '80%' }}>
                        {doctors.map((doctor) =>
                            <div key={doctor.id} className="py-1 px-2 bg-white shadow-md click" data-href={doctor.seo_url}>
                                <div className="flex gap-2">
                                    <img src={doctor.image} alt={"Profile picture of " + doctor.name} className="w-16 h-16 rounded-full shrink-0" />
                                    <div className="flex flex-col">
                                        <Link href={doctor.seo_url} className="font-semibold one-line fs-16">{doctor.name}</Link>
                                        {doctor.position && <span>{doctor.position.trim()}</span>}
                                        <span>{doctor.specialization}</span>
                                        <span>
                                            Available On:
                                            <span className="color-secondary font-semibold">{doctor.availability}</span>
                                        </span>
                                    </div>
                                </div>
                                <hr className="mt-1" />
                                <div className="flex items-center py-1">
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <BiClinic className="color-primary" />
                                            <span className="font-semibold">{doctor.clinic}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <BiSolidMap className="color-primary" />
                                            <span>{doctor.city}</span>
                                        </div>
                                    </div>
                                    <div className="ml-auto">
                                        <Link href={doctor.seo_url} title={`${doctor.name} in ${doctor.clinic},${doctor.city}`} className="flex items-center justify-center border rounded-full border-color-primary h-6 w-6" >
                                            <BiRightArrowAlt className="text-2xl color-primary" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )
            }
            )}
        </div>
    </>
}
export default PopularDoctor2;