import Link from "next/link";
import { BiSolidMap, BiClinic } from "react-icons/bi";
import { TDoctor } from "@/lib/types/doctor";
import { doctorProfilePic } from "@/lib/image";
import { doctorDetailPageUrl } from '@/lib/helper/link';
const OneIsToNDoctorsSliders = ({ data }: { data: TDoctor[] }) => {
    return (
        <>
            <div className="flex gap-2 overflow-auto hide-scroll-bar py-2 px-2">
                {data.map((doctor) =>
                    <div key={doctor.service_location_id} className="bg-white shrink-0 border rounded-md p-2 shadow-md" style={{ width: "70%" }}>
                        <div className="flex gap-2" >
                            <img alt={"Profile picture of " + doctor.doctor_name} src={doctorProfilePic(doctor.doctor_profile_pic)} className="w-16 h-16 rounded-md" />
                            <div className="flex flex-col">
                                {doctor.qualification_disp && <span>{doctor.qualification_disp}</span>}
                                {doctor.position && <span>{doctor.position}</span>}
                                {doctor.experience && <span>EXP:{doctor.experience} Yrs</span>}
                            </div>
                        </div>
                        <div className="mt-3 flex flex-col leading-5">
                            <Link href={doctorDetailPageUrl({ doctor_id: doctor.doctor_id, clinic_id: doctor.clinic_id, service_loc_id: doctor.service_location_id, seo_url: doctor.doctor_seo_url, city: doctor.city, state: doctor.state,market_name:doctor.market_name })} className="font-semibold fs-17 text one-line" >{doctor.doctor_name}</Link>
                            <span className="font-semibold flex items-center gap-1">
                                <BiClinic className="color-primary" />
                                {doctor.clinic}
                            </span>
                            <span className="flex items-center gap-1">
                                <BiSolidMap className="color-primary" />
                                <span className="text one-line">{doctor.locality},{doctor.market_name}</span>
                            </span>
                        </div>
                    </div>)}
            </div>
            {/* <div className="flex gap-2 overflow-auto hide-scroll-bar bg-white py-2 px-2">
                {data.map((doctor) =>
                    <div key={doctor.service_location_id} className="bg-white shrink-0 mx-1 border" style={{ width: "60%" }}>
                        <div className="px-2 pb-2 flex flex-col leading-6">
                            <Link href={""} className="font-semibold text-lg text one-line" >{doctor.doctor_name}</Link>
                            {doctor.qualification_disp && <span>{doctor.qualification_disp}</span>}
                            {doctor.position && <span>{doctor.position}</span>}
                            {doctor.experience && <span>Exp :{doctor.experience} Yrs</span>}
                            <span className="font-semibold leading-4 flex gap-1">
                                <BiClinic className="color-primary" />
                                {doctor.clinic}
                            </span>
                            <span className="flex items-center gap-1">
                                <BiSolidMap className="color-primary" />
                                <span className="text one-line">
                                    {doctor.locality},{doctor.market_name}
                                </span>
                            </span>
                        </div>
                    </div>)}
            </div> */}
        </>

    )
}
export default OneIsToNDoctorsSliders;