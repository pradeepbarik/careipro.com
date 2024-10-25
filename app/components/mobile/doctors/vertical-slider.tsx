import Link from "next/link";
import { BiSolidMap, BiClinic } from "react-icons/bi";
import { Button } from '../ui';
import { TDoctor } from "@/lib/types/doctor";
import { doctorProfilePic } from '@/lib/image';
import { doctorDetailPageUrl } from '@/lib/helper/link';
const NIsToOneDoctorsSliders = ({ data, type = 'DOCTOR' }: { data: TDoctor[], type?: 'DOCTOR' | 'CLINIC_DOCTOR' }) => {
    return (
        <div className="">
            {data.map((doctor) =>
                <div key={doctor.service_location_id} className="bg-white border-b shadow-md mb-1">
                    <div className="flex py-2 px-2 gap-3">
                        <div className="w-20 shrink-0">
                            <img alt={"Profile picture of " + doctor.doctor_name} src={doctorProfilePic(doctor.doctor_profile_pic)} className="w-20 h-20 rounded-md" />
                        </div>
                        <div className="flex flex-col grow">
                            <Link className="flex items-center font-semibold text-lg" href={doctorDetailPageUrl({ doctor_id: doctor.doctor_id, clinic_id: doctor.clinic_id, service_loc_id: doctor.service_location_id, seo_url: doctor.doctor_seo_url, city: doctor.city, state: doctor.state, market_name: doctor.market_name })}>{doctor.doctor_name}</Link>
                            <div className="flex">
                                <div className="flex flex-col grow">
                                    {doctor.qualification_disp && <span>{doctor.qualification_disp}</span>}
                                    {doctor.position && <span>{doctor.position}</span>}
                                    {doctor.experience && <span>EXP: {doctor.experience} Yrs</span>}
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="flex items-center px-2 mb-2">
                        <div className="flex flex-col leading-5">
                            {doctor.clinic &&
                                <span className="font-semibold flex items-center gap-1">
                                    <BiClinic className="color-primary" />
                                    {doctor.clinic}
                                </span>}
                            {doctor.specialists && <span>{doctor.specialists}</span>}
                            {type === 'DOCTOR' &&
                                <span className="flex items-baseline gap-1">
                                    <BiSolidMap className="color-primary relative top-1" />
                                    <span className="text">{doctor.locality}, {doctor.market_name}</span>
                                </span>
                            }
                        </div>
                        <div className="ml-auto flex items-end">
                            <a className="button py-2 text one-line text-xs rounded-2xl text-center" data-variant='contained' >Book Appointment</a>
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}
export default NIsToOneDoctorsSliders;