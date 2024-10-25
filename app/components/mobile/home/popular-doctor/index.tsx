import Link from "next/link";
import { BiSolidMap, BiClinic } from "react-icons/bi";
import { THomePageData } from "@/lib/types/home-page";
import { array_chunk } from '@/lib/helper';
const PopularDoctor = ({ data }: { data: THomePageData['popularDoctors'] }) => {
    let chunks = array_chunk([...data], 1, [])
    return <>

        <div className='flex overflow-auto cp-section text-center bg-white hide-scroll-bar' style={{ gap: '1%' }}>
            {chunks.map((doctors) => {
                return (
                    <div className="flex flex-col gap-2 shrink-0" style={{ width: '25%' }}>
                        {doctors.map((doctor) => <div key={doctor.id} className="flex flex-col gap-2 shrink-0 items-center justify-center py-1">
                            <img src={doctor.image} alt={"Profile picture of " + doctor.name} className="w-20 h-20 rounded-full" />
                            <Link href={doctor.seo_url} className="font-semibold">{doctor.name}</Link>
                        </div>)}
                    </div>
                )
            }
            )}
        </div>
    </>
}
const PopularDoctor2 = ({ data }: { data: THomePageData['popularDoctors'] }) => {
    let chunks = array_chunk([...data], 2, [])
    return <>

        <div className='flex overflow-auto cp-section hide-scroll-bar' style={{ gap: '.6rem' }}>
            {chunks.map((doctors) => {
                return (
                    <div className="flex flex-col gap-2 shrink-0" style={{ width: '80%' }}>
                        {doctors.map((doctor) =>
                            <div key={doctor.id} className="py-1 px-2 bg-white shadow-md">
                                <div className="flex gap-2">
                                    <img src={doctor.image} alt={"Profile picture of " + doctor.name} className="w-16 h-16 rounded-full shrink-0" />
                                    <div className="flex flex-col">
                                        <Link href={doctor.seo_url} className="font-semibold one-line fs-16">{doctor.name}</Link>
                                        <span>{doctor.position.trim() || "No Position"}</span>
                                        <span>Medicine Specialist, Gastroenterologist</span>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div className="flex items-center gap-1">
                                        <BiClinic className="color-primary" /> 
                                        <span className="font-semibold">{doctor.clinic}</span>
                                    </div>
                                    <div className="flex">
                                        <span>
                                            <span className="flex">
                                                <BiSolidMap className="color-primary" />
                                                <span>{doctor.city}</span>
                                            </span>
                                            <span>
                                                Available On:
                                                <span className="color-secondary font-semibold">Every Day</span>
                                            </span>
                                        </span>
                                        <span className="ml-auto">
                                            <Link href={''} className="button py-2 text one-line text-xs rounded-2xl text-center">Appointment</Link>
                                        </span>
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