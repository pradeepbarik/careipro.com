import { TDoctor } from "@/lib/types/doctor";
import { doctorProfilePic } from '@/lib/image';
const ClinicCareTakers = ({ data }: { data: TDoctor[] }) => {
    return (
        <>
            <div className="">
                {data.map((doctor) => (
                    <div className="bg-white border-b shadow-sm mb-1 px-2 py-1 overflow-hidden" key={doctor.doctor_id}>
                        <div className='flex gap-2'>
                            <img src={doctorProfilePic(doctor.doctor_profile_pic)} className='h-24 w-18 flex-shrink-0 rounded-md' />
                            <div className='flex flex-col'>
                                <span className='font-bold fs-18 text one-line w-full'>{doctor.doctor_name}</span>
                                <span>{doctor.position}</span>
                                <span>{doctor.experience}+ years exp.</span>
                                {/* <div className='flex py-1'>
                                    <span className=''>Available&nbsp;: </span>
                                    <span className='flex gap-2 overflow-auto px-2 hide-scroll-bar'>
                                        <span className='border px-1 rounded-md shrink-0'>Monthly</span>
                                        <span className='border px-1 rounded-md shrink-0'>Daily Basis</span>
                                        <span className='border px-1 rounded-md shrink-0'>Hourly Basis</span>
                                        <span className='border px-1 rounded-md shrink-0'>24 Hours / 7 Days</span>
                                    </span>
                                </div> */}
                                <span className='flex gap-2 overflow-auto px-2 py-1 hide-scroll-bar'>
                                    {doctor.specialists && doctor.specialists.split(",").map((spl, index) => (
                                        <span key={index} className='border px-1 rounded-md shrink-0' style={{ background: "#ededed" }}>{spl}</span>
                                    ))}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
export default ClinicCareTakers;