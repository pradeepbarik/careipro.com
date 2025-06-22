import Link from "next/link"
import { FaUserMd, FaMapMarkerAlt } from "react-icons/fa";
import { BiPhone } from "react-icons/bi"
import { TClinic } from "@/lib/hooks/physiotherapy/usePhysiotherapy"
import { doctorSpecialityIcon, doctorProfilePic, clinicProfilePic, clinicBannerImage } from '@/lib/image';

const Clinics = ({ data, state, city }: { data: TClinic[], state: string, city: string }) => {
    return (
        <>
            {data.map((clinic) =>
                <div className="bg-white border-b rounded-md shadow-md mb-2 click" key={clinic.id} data-href={clinic.seo_url}>
                    <div className="flex py-2 px-2 gap-3">
                        <div className='flex flex-col'>
                            <Link href={clinic.seo_url} className='font-bold fs-16 w-full color-primary'>{clinic.name}</Link>
                            <span className='flex items-center gap-1'>
                                <FaMapMarkerAlt className='color-primary' />
                                {clinic.locality}, {clinic.city}
                            </span>
                            <span className="flex flex-wrap gap-1 mt-1">
                                {clinic.specialists.slice(0,3).map((spl)=>
                                <span className="chip">{spl}</span>
                                )}
                            </span>
                        </div>
                        <img src={clinicProfilePic(clinic.logo)} className='h-20 w-20 rounded-md flex-shrink-0 ml-auto' />
                    </div>
                    <div className='flex gap-2 px-2 pb-2'>
                        <a className='button grow flex-1 items-center gap-2' data-variant="outlined">
                            <BiPhone />Call Now
                        </a>
                        <button className='button flex-1'>Book Appointment</button>
                    </div>
                </div>
            )}
        </>
    )
}
export default Clinics