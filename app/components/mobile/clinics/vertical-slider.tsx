import Link from 'next/link';
import { FaUserMd, FaMapMarkerAlt } from "react-icons/fa";
import { TClinic } from '@/lib/types/clinic';
import { clinicProfilePic } from "@/lib/image";

const NIsToOneClinicsSliders = ({ clinics }: { clinics: TClinic[] }) => {
    return (
        <>
            <div className="px-2">
                {clinics.map((clinic) => {
                    let hasMoreSpecialist = clinic.total_specialist > clinic.doctor_specializations.length ? true : false
                    return (
                        <div key={clinic.id} className="bg-white border-b">
                            <div className="flex py-2 px-2 gap-3">
                                <div className='flex flex-col'>
                                    <Link href={clinic.seo_url} className='font-semibold fs-18 text one-line w-full'>{clinic.name}</Link>
                                    <span className='flex items-center gap-1'>
                                        <FaMapMarkerAlt className='color-primary text-sm' />
                                        {clinic.locality}, {clinic.market_name}, {clinic.city}
                                    </span>
                                    <span className='flex items-center font-semibold gap-2 mt-1'>
                                        <FaUserMd className='text-lg color-primary' />
                                        {clinic.doctors_count} Doctors
                                    </span>
                                </div>
                                <img src={clinicProfilePic(clinic.logo)} className='h-20 w-20 rounded-md flex-shrink-0 ml-auto' />
                            </div>
                            <div className='mt-1 text-xs'>
                                {clinic.doctor_specializations.map((sp) => <span className='border px-1 py-1 rounded-full inline-flex mb-1 mx-1'>{sp}</span>)}
                                {hasMoreSpecialist && <span className='border border-gray-300 px-2 py-1 rounded-full inline-flex mb-1 mx-1'>{(clinic.total_specialist - clinic.doctor_specializations.length) + "+ More"}</span>}
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default NIsToOneClinicsSliders