import Link from 'next/link';
import { FaUserMd, FaMapMarkerAlt } from "react-icons/fa";
import { TClinic } from '@/lib/types/clinic';
import { clinicProfilePic } from "@/lib/image";
const OneIsToNClinicsSliders = ({ clinics }: { clinics: TClinic[] }) => {
    return (
        <div className=''>
            <div className="flex gap-2 overflow-auto hide-scroll-bar py-2 mx-2">
                {clinics.map((clinic) => {
                    let hasMoreSpecialist = clinic.total_specialist > clinic.doctor_specializations.length ? true : false
                    return (
                        <div key={clinic.id} className="bg-white shrink-0 border rounded-md p-1" style={{ width: "70%" }}>
                            <div className='flex overflow-hidden'>
                                <div className='flex flex-col' style={{ width: "calc(100% - 3rem)" }}>
                                    <Link href={clinic.seo_url} className='font-semibold fs-18 text one-line'>{clinic.name}</Link>
                                    <span className='flex gap-1'>
                                        <FaMapMarkerAlt className='color-primary text-lg' />
                                        <span className='leading-4'>
                                            {clinic.locality}, {clinic.market_name}
                                        </span>
                                    </span>
                                    <span className='flex items-center font-semibold gap-1 mt-1'>
                                        <FaUserMd className='text-lg color-primary' />
                                        {clinic.doctors_count} Doctors</span>
                                </div>
                                <img src={clinicProfilePic(clinic.logo)} className='rounded-md flex-shrink-0 ml-auto' style={{ width: '3rem', height: '3rem' }} />
                            </div>
                            <div className='mt-1 text-xs'>
                                {clinic.doctor_specializations.map((sp) => <span className='border border-gray-300 px-1 py-1 rounded-full inline-flex mb-1 mx-1'>{sp}</span>)}
                                {hasMoreSpecialist && <span className='border px-2 py-1 rounded-full inline-flex mb-1 mx-1'>{(clinic.total_specialist - clinic.doctor_specializations.length) + "+ More"}</span>}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default OneIsToNClinicsSliders