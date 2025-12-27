import { SectionHeading, SectionSubHeading } from "@/app/components/mobile/ui"
import { TDoctorDetail, TDoctorvailableData } from '@/lib/types/doctor';
import { BiChevronRight, BiTimeFive } from "react-icons/bi";
import moment, { get_current_datetime } from "@/lib/helper/date-time";
import { doctorSpecialityIcon } from "@/lib/image";
import dynamic from "next/dynamic";
const SimilarBusieness = dynamic(() => import("./similar-doctors"));
const WeeklyConsultingTiming = dynamic(() => import("@/app/components/mobile/doctors/doctor-detail/weekly-consulting-timing"));
const NextConsultTime = dynamic(() => import('@/app/components/mobile/doctors/doctor-detail/next-consult-time'));

const OverView = ({ data, availableData }: { data: TDoctorDetail, availableData: TDoctorvailableData }) => {
    let showNextConsultDate = (data.doctor_availability && data.doctor_availability.date && moment(get_current_datetime()).diff(moment(data.doctor_availability.date), 'days') < 0) ? true : false;
    return (
        <>
            {data.settings.display_consulting_timing ? <>
                <div className="px-2">
                    {data.settings.display_consulting_timing ? <>
                        <div className="bg-white rounded-md border mt-1">
                            <div className="flex items-center px-2 mt-1">
                                <BiTimeFive style={{ fontSize: '1rem' }} />
                                <h2 className="ml-2 font-semibold">Consulting Timings :</h2>
                                <BiChevronRight className="text-xl ml-auto rotate-90" />
                            </div>
                            <div>
                                {Array.isArray(data.settings.display_consulting_timing) ? data.settings.display_consulting_timing.map((dt, idx) =>
                                    <div key={idx} className="flex items-center border-dashed border-b px-2 py-1">
                                        <span className="font-semibold">{dt.label}:</span>
                                        <span className="flex flex-col ml-auto">
                                            {dt.value.map((time, ti) => <span key={ti}>{time}</span>)}
                                        </span>
                                    </div>
                                ) : <span>{data.settings.display_consulting_timing}</span>}
                            </div>
                        </div>
                    </> : <></>}
                    {data.settings.display_booking_timing ? <>
                        <div className="bg-white rounded-md border mt-2">
                            <div className="flex items-center px-2 mt-1">
                                <BiTimeFive style={{ fontSize: '1rem' }} />
                                <h2 className="ml-2 font-semibold">Booking Timings :</h2>
                                <BiChevronRight className="text-xl ml-auto rotate-90" />
                            </div>
                            <div>
                                {Array.isArray(data.settings.display_booking_timing) ? data.settings.display_booking_timing.map((dt, idx) =>
                                    <div key={idx} className="flex items-center border-dashed border-b px-2 py-1">
                                        <span className="font-semibold">{dt.label}:</span>
                                        <span className="flex flex-col ml-auto">
                                            {dt.value.map((time, ti) => <span key={ti}>{time}</span>)}
                                        </span>
                                    </div>
                                ) : <span>{data.settings.display_booking_timing}</span>}
                            </div>
                        </div>
                    </> : <></>}
                </div>
            </> :
                <>
                    <SectionSubHeading heading='Consulting Timing' />
                    <div className='bg-white px-2 py-2 mb-2 shadow-sm'>
                        {(data.doctor_availability && showNextConsultDate) ? <>
                            <div className="shadow px-2 py-2 border flex items-center rounded-md gap-2 font-semibold bg-orange-200">
                                Next Consult Date : {moment(data.doctor_availability.date).format("DD MMM")}
                                <span className="flex flex-col ml-auto">
                                    <span>{data.doctor_availability.first_session_start_time} - {data.doctor_availability.first_session_end_time}</span>
                                    {data.doctor_availability.second_session_start_time && <>
                                        <span>{data.doctor_availability.second_session_start_time} - {data.doctor_availability.second_session_start_time}</span>
                                    </>}
                                </span>
                            </div>
                        </> : <></>}
                        {data.availability === "per_week" ? <WeeklyConsultingTiming data={{
                            sunday: data.sunday,
                            sunday_1st_session_start: data.sunday_1st_session_start,
                            sunday_1st_session_end: data.sunday_1st_session_end,
                            sunday_2nd_session_start: data.sunday_2nd_session_start,
                            sunday_2nd_session_end: data.sunday_2nd_session_end,
                            monday: data.monday,
                            monday_1st_session_start: data.monday_1st_session_start,
                            monday_1st_session_end: data.monday_1st_session_end,
                            monday_2nd_session_start: data.monday_2nd_session_start,
                            monday_2nd_session_end: data.monday_2nd_session_end,
                            tuesday: data.tuesday,
                            tuesday_1st_session_start: data.tuesday_1st_session_start,
                            tuesday_1st_session_end: data.tuesday_1st_session_end,
                            tuesday_2nd_session_start: data.tuesday_2nd_session_start,
                            tuesday_2nd_session_end: data.tuesday_2nd_session_end,
                            wednesday: data.wednesday,
                            wednesday_1st_session_start: data.wednesday_1st_session_start,
                            wednesday_1st_session_end: data.wednesday_1st_session_end,
                            wednesday_2nd_session_start: data.wednesday_2nd_session_start,
                            wednesday_2nd_session_end: data.wednesday_2nd_session_end,
                            thursday: data.thursday,
                            thursday_1st_session_start: data.thursday_1st_session_start,
                            thursday_1st_session_end: data.thursday_1st_session_end,
                            thursday_2nd_session_start: data.thursday_2nd_session_start,
                            thursday_2nd_session_end: data.thursday_2nd_session_end,
                            friday: data.friday,
                            friday_1st_session_start: data.friday_1st_session_start,
                            friday_1st_session_end: data.friday_1st_session_end,
                            friday_2nd_session_start: data.friday_2nd_session_start,
                            friday_2nd_session_end: data.friday_2nd_session_end,
                            saturday: data.saturday,
                            saturday_1st_session_start: data.saturday_1st_session_start,
                            saturday_1st_session_end: data.saturday_1st_session_end,
                            saturday_2nd_session_start: data.saturday_2nd_session_start,
                            saturday_2nd_session_end: data.saturday_2nd_session_end,
                        }} /> :
                            <NextConsultTime data={availableData} />
                        }
                    </div>
                </>
            }
            {data.treated_health_conditions?.length==0 && data.allSpecializations && data.allSpecializations["DISEASE"] && <>
                <SectionHeading heading='Expertise in treatment of' />
                <div className="px-2 py-2 grid grid-cols-2 gap-2 bg-white">
                    {data.allSpecializations["DISEASE"].map((cat) =>
                        <div key={cat.seo_id} className="flex items-center gap-2">
                            <img src={doctorSpecialityIcon(cat.icon) || "/icon/disease-defult-icon.png"} className="w-10 h-10" />
                            <span>{cat.name}</span>
                        </div>
                    )}
                </div>
            </>}
            {/* {data.settings.raw_information &&
                <div dangerouslySetInnerHTML={{ __html: data.settings.raw_information }} className="px-2 py-2 bg-white shadow-sm mb-2" ></div>
            } */}
            {data.treated_health_conditions && data.treated_health_conditions.length > 0 ? <>
                <SectionHeading heading='Treated Top Health Conditions' />
                <div className="px-2 py-2 grid grid-cols-2 gap-2 bg-white">
                    {data.treated_health_conditions.map((condition, idx) =>
                        <div key={idx} className="flex flex-col gap-1">
                            <span className="dot">{condition.condition}</span>
                        </div>
                    )}
                </div>
            </>:<></>}
            {data.treatments_available && data.treatments_available.length > 0 ? <>
                <SectionHeading heading='Available Treatments' />
                <div className="px-2 py-2 grid grid-cols-2 gap-2 bg-white">
                    {data.treatments_available.map((treatment, idx) =>
                        <div key={idx} className="flex flex-col gap-1">
                            <span className="dot">{treatment}</span>
                        </div>
                    )}
                </div>
            </>:<></>}
            {data.description ?
                <>
                    <SectionHeading heading={`About ${data.doctor_name}`} />
                    <div dangerouslySetInnerHTML={{ __html: data.description }} className="px-2 py-2 bg-white shadow-sm mb-2" ></div>
                </> : <></>
            }
            {data.similar_doctors && data.similar_doctors.length > 0 ?
                <>
                    <SimilarBusieness heading={`Similar Doctors in ${data.clinic_city}`} similar_doctors={data.similar_doctors} />

                </> : <></>
            }
        </>
    )
}
export default OverView