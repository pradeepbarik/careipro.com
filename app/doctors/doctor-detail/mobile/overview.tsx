import { SectionHeading, SectionSubHeading } from "@/app/components/mobile/ui"
import { TDoctorDetail, TDoctorvailableData } from '@/lib/types/doctor';
import { BiChevronRight, BiTimeFive } from "react-icons/bi";
import WeeklyConsultingTiming from "@/app/components/mobile/doctors/doctor-detail/weekly-consulting-timing";
import NextConsultTime from '@/app/components/mobile/doctors/doctor-detail/next-consult-time';
import moment, { get_current_datetime } from "@/lib/helper/date-time";

const OverView = ({ data, availableData }: { data: TDoctorDetail, availableData: TDoctorvailableData }) => {
    let showNextConsultDate = (data.doctor_availability && data.doctor_availability.date && moment(get_current_datetime()).diff(moment(data.doctor_availability.date), 'days') < 0) ? true : false;
    return (
        <>
            {data.settings.display_consulting_timing ? <>
                <div className="px-2">
                    {data.settings.display_consulting_timing ? <>
                        <div className="bg-gray-100 rounded-md border mt-1">
                            <div className="flex items-center px-2 mt-1">
                                <BiTimeFive style={{ fontSize: '1rem' }} />
                                <span className="ml-2 font-semibold">Consulting Timings :</span>
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
                        <div className="bg-gray-100 rounded-md border mt-2">
                            <div className="flex items-center px-2 mt-1">
                                <BiTimeFive style={{ fontSize: '1rem' }} />
                                <span className="ml-2 font-semibold">Booking Timings :</span>
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
            {data.allSpecializations && data.allSpecializations["DISEASE"] && <>
                <SectionHeading heading='Good Experience in treatment of' />
                <div className="px-2 py-2 grid grid-cols-2 gap-2">
                    {data.allSpecializations["DISEASE"].map((cat) =>
                        <div key={cat.seo_id} className="flex items-center gap-2 px-2 py-1 border border-color-grey rounded-md bg-white">
                            <img src={cat.icon || "/icon/disease-defult-icon.png"} className="w-10 h-10" />
                            <span>{cat.name}</span>
                        </div>
                    )}
                </div>
            </>}
            {/* {data.settings.raw_information &&
                <div dangerouslySetInnerHTML={{ __html: data.settings.raw_information }} className="px-2 py-2 bg-white shadow-sm mb-2" ></div>
            } */}
            {data.description ?
                <>
                    <SectionHeading heading={`About ${data.doctor_name}`} />
                    <div dangerouslySetInnerHTML={{ __html: data.description }} className="px-2 py-2 bg-white shadow-sm mb-2" ></div>
                </> : <></>
            }
        </>
    )
}
export default OverView