import { SectionHeading, SectionSubHeading } from "@/app/components/mobile/ui"
import { TDoctorDetail, TDoctorvailableData } from '@/lib/types/doctor';
import { BiChevronRight, BiSolidStar, BiTimeFive, BiUser } from "react-icons/bi";
import moment, { get_current_datetime } from "@/lib/helper/date-time";
import { doctorSpecialityIcon } from "@/lib/image";
import dynamic from "next/dynamic";
import Link from "next/link";
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
            {data.treated_health_conditions?.length == 0 && data.allSpecializations && data.allSpecializations["DISEASE"] && <>
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
            </> : <></>}
            {data.treatments_available && data.treatments_available.length > 0 ? <>
                <SectionHeading heading='Available Treatments' />
                <div className="px-2 py-2 grid grid-cols-2 gap-2 bg-white">
                    {data.treatments_available.map((treatment, idx) =>
                        <div key={idx} className="flex flex-col gap-1">
                            <span className="dot">{treatment}</span>
                        </div>
                    )}
                </div>
            </> : <></>}
            {data.description ?
                <>
                    <SectionHeading heading={`About ${data.doctor_name}`} />
                    <div dangerouslySetInnerHTML={{ __html: data.description }} className="px-2 py-2 bg-white shadow-sm mb-2" ></div>
                </> : <></>
            }
            {(data.settings.show_patients_feedback) && data.topReviews && data.topReviews?.length > 0 ? <>
                <SectionHeading heading='Rating & Reviews' />
                <div className="flex gap-3 border rounded-md mx-2">
                    <div className="bg-primary color-white shadow-md rounded-tl-md rounded-bl-md p-2 text-center">
                        <span className="text-3xl">{data.rating}</span><br />
                        <span>Avg. Rating</span>
                    </div>
                    <div>
                        <p className="font-semibold mt-2">{data.rating_count} Ratings & {data.review_count} Reviews</p>
                        <p className="">Rating is based on {data.rating_count} patients feedback</p>
                    </div>
                </div>
                <div className="px-2 py-2 grid grid-cols-1 gap-2 bg-white mt-1">
                    {data.topReviews.map((review, idx) =>
                        <div key={idx} className="bg-white border rounded-lg px-3 py-3">
                            <div className="flex items-center gap-2">
                                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                    <BiUser className="text-gray-500" style={{ fontSize: '1.2rem' }} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold fs-15">{review.user_name || 'Anonymous'}</span>
                                    {review.review_date && <span className="text-gray-500 text-xs">{new Date(review.review_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>}
                                </div>
                                <div className="ml-auto flex items-center gap-1 bg-green-50 border border-green-200 rounded-md px-2 py-0.5">
                                    <BiSolidStar className="text-green-600" style={{ fontSize: '0.8rem' }} />
                                    <span className="font-semibold text-green-700 text-sm">{review.rating}</span>
                                </div>
                            </div>
                            {review.experience && (
                                <p className="mt-2 text-gray-700 fs-14 leading-relaxed">{review.experience}</p>
                            )}
                            {review.review_tags && (
                                <div className="mt-2 flex flex-wrap gap-1">
                                    {review.review_tags.map((tag, index) => (
                                        <span key={index} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-md">{tag.tag}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                    <div>
                        <Link href={`${data.seo_dt.seo_url}/patient-reviews`} className="button" data-variant="outlined">View More </Link>
                    </div>
                </div>
            </> : <></>}
            {data.faqs && data.faqs.mainEntity && data.faqs.mainEntity.length > 0 ? <>
                <div className="px-3 mt-6 mb-4">
                    <h2 className='font-bold text-lg text-gray-800 mb-4 flex items-center gap-2'>
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-1">
                        {data.faqs.mainEntity.map((faq, index) => (
                            <details
                                key={index}
                                className="group bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden"
                            >
                                <summary className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start gap-3 pr-2">
                                        <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">
                                            {index + 1}
                                        </span>
                                        <span className="font-medium text-gray-800 text-sm leading-relaxed">
                                            {faq.name}
                                        </span>
                                    </div>
                                </summary>
                                <div className="px-4 pt-0">
                                    <div className="pl-4 py-2 border-l-2 border-primary/20">
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {faq.acceptedAnswer.text}
                                        </p>
                                    </div>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </> : <></>}
        </>
    )
}
export default OverView