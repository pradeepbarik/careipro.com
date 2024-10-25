'use client'
import { useState } from "react";
import { BiGridAlt } from "react-icons/bi";
import { TclinicDetail } from "@/lib/hooks/useClinics";
import NIsToOneDoctorsSliders from '../doctors/vertical-slider';
import { TDoctor } from "@/lib/types/doctor";
import { doctorSpecialityIcon } from '@/lib/image';

const ClinicDoctors = ({ clinic_info, doctors, specializations }: { clinic_info: TclinicDetail['clinic_info'], doctors: TclinicDetail['doctors'], specializations: TclinicDetail['specializations'] }) => {
    const [filter, setFilter] = useState({ doctorIds: Object.keys(doctors), catId: 0 });
    let docs: TDoctor[] = filter.doctorIds.map((doctor_id) => {
        let doctor = doctors[doctor_id];
        return {
            service_location_id: doctor.id,
            doctor_id: doctor.doctor_id,
            clinic: "",
            clinic_id: doctor.clinic_id,
            city: clinic_info.city,
            contact_no: "",
            location_lat: 0,
            location_lng: 0,
            service_charge: doctor.service_charge,
            doctor_name: doctor.doctor_name,
            position: doctor.position,
            qualification_disp: doctor.qualification_disp,
            experience: doctor.experience,
            doctor_seo_url: doctor.seo_url,
            gender: doctor.gender,
            doctor_profile_pic: doctor.profile_pic,
            market_name: clinic_info.market_name,
            locality: clinic_info.locality,
            state: clinic_info.state || "",
            specialists: doctor.specialists
        }
    })
    return (<>
        <div className="flex overflow-auto px-2 gap-2 hide-scroll-bar mb-2">
            <span className={"text-nowrap border bg-white rounded-lg px-2 py-1 font-semibold flex items-center" + (filter.catId === 0 ? ' bg-primary color-white' : '')} onClick={() => { setFilter({ doctorIds: Object.keys(doctors), catId: 0 }) }}>
                <BiGridAlt/>
                <span className="ml-1">All Doctors</span>
            </span>
            {specializations['DOCTOR'].map((spl) => <span key={spl.id} className={`bg-white border rounded-lg font-semibold px-2 py-1 flex shrink-0 gap-1 ${filter.catId === spl.id ? ' bg-primary color-white' : ''}`} onClick={() => { setFilter({ doctorIds: spl.doctor_ids.split(","), catId: spl.id }) }}>
                <img src={doctorSpecialityIcon(spl.icon)} className="h-6 w-6 rounded-full" />
                <span className="text-nowrap">{spl.name}</span>
            </span>)}
        </div>
        <NIsToOneDoctorsSliders data={docs} type={"CLINIC_DOCTOR"} />
    </>)
}
export default ClinicDoctors;