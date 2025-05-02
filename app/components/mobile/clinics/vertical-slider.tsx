import Link from 'next/link';
import { FaUserMd, FaMapMarkerAlt } from "react-icons/fa";
import { TClinic, TClinicTopDoctor } from '@/lib/types/clinic';
import { clinicProfilePic } from "@/lib/image";
import {formatDoctorName} from '@/lib/helper/format-text';
import {doctorProfilePic} from '@/lib/image';

const NIsToOneClinicsSliders = ({ clinics, cliniCTopDoctorsData }: { clinics: TClinic[], cliniCTopDoctorsData?: { [clinic_id: string]: { total_doctor: number, topDoctors: TClinicTopDoctor[] } } }) => {
    return (
        <>
            <div className="px-2">
                {clinics.map((clinic) => {
                    let hasMoreSpecialist = clinic.doctor_specializations.length>5 ? true : false
                    return (
                        <div key={clinic.id} className="bg-white border-b shadow-md mb-1 click" data-href={clinic.seo_url}>
                            <div className="flex py-2 px-2 gap-3">
                                <div className='flex flex-col'>
                                    <Link href={clinic.seo_url} className='font-semibold fs-18 text one-line w-full'>{clinic.name}</Link>
                                    <span className='flex items-center gap-1'>
                                        <FaMapMarkerAlt className='color-primary text-sm' />
                                        {clinic.locality}, {clinic.market_name}, {clinic.city}
                                    </span>
                                    {/* <span className='flex items-center font-semibold gap-2 mt-1'>
                                        <FaUserMd className='text-lg color-primary' />
                                        {clinic.doctors_count} Doctors
                                    </span> */}
                                </div>
                                <img src={clinicProfilePic(clinic.logo)} className='h-20 w-20 rounded-md flex-shrink-0 ml-auto' />
                            </div>
                            {(cliniCTopDoctorsData && cliniCTopDoctorsData[clinic.id.toString()]) &&
                                <div className='flex gap-1 overflow-auto w-full hide-scroll-bar'>
                                    {cliniCTopDoctorsData[clinic.id.toString()].topDoctors.map((doctor) =>
                                        <div className='border border-color-grey rounded-md shrink-0' style={{width:"45%",overflow:"hidden"}}>
                                            <Link href={doctor.seo_url} className='flex gap-1'>
                                                <img src={doctorProfilePic(doctor.image||"")} className='h-10 w-10 shrink-0' />
                                                <div className='flex flex-col grow'>
                                                    <span className='one-line font-semibold fs-13'>{formatDoctorName(doctor.short_name||doctor.name)}</span>
                                                    <span className='fs-12 one-line'>{doctor.position}</span>
                                                </div>
                                            </Link>
                                        </div>
                                    )}
                                </div>}
                            <div className='mt-1 text-xs'>
                                {clinic.doctor_specializations.slice(0,5).map((sp) => <span className='border px-1 py-1 rounded-full inline-flex mb-1 mx-1'>{sp}</span>)}
                                {hasMoreSpecialist && <span className='border border-gray-300 px-2 py-1 rounded-full inline-flex mb-1 mx-1'>{(clinic.doctor_specializations.length - 5) + "+ More"}</span>}
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default NIsToOneClinicsSliders