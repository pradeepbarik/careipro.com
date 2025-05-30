import { SectionHeading,SectionSubHeading } from "@/app/components/mobile/ui"
import { TDoctorDetail, TDoctorvailableData } from '@/lib/types/doctor';
import WeeklyConsultingTiming from "@/app/components/mobile/doctors/doctor-detail/weekly-consulting-timing";
import NextConsultTime from '@/app/components/mobile/doctors/doctor-detail/next-consult-time';
const OverView = ({ data, availableData }: { data: TDoctorDetail, availableData: TDoctorvailableData }) => {
    return (
        <>
            <SectionSubHeading heading='Consulting Timing' />
            <div className='bg-white px-2 py-2 mb-2 shadow-sm'>
                {data.availability === "per_week" ? <WeeklyConsultingTiming data={{
                    sunday: data.sunday,
                    sunday_1st_session_start: data.sunday_1st_session_start,
                    sunday_1st_session_end: data.sunday_1st_session_end,
                    sunday_2nd_session_start: data.sunday_2nd_session_start,
                    sunday_2nd_session_end: data.sunday_2nd_session_end,
                    monday: data.monday,
                    monday_1st_session_start: data.monday_1st_session_start,
                    monday_1st_session_end: data.saturday_1st_session_end,
                    monday_2nd_session_start: data.monday_2nd_session_start,
                    monday_2nd_session_end: data.monday_2nd_session_end,
                    tuesday: data.tuesday,
                    tuesday_1st_session_start: data.tuesday_1st_session_start,
                    tuesday_1st_session_end: data.saturday_1st_session_end,
                    tuesday_2nd_session_start: data.tuesday_2nd_session_start,
                    tuesday_2nd_session_end: data.tuesday_2nd_session_end,
                    wednesday: data.wednesday,
                    wednesday_1st_session_start: data.wednesday_1st_session_start,
                    wednesday_1st_session_end: data.saturday_1st_session_end,
                    wednesday_2nd_session_start: data.wednesday_2nd_session_start,
                    wednesday_2nd_session_end: data.wednesday_2nd_session_end,
                    thursday: data.thursday,
                    thursday_1st_session_start: data.thursday_1st_session_start,
                    thursday_1st_session_end: data.saturday_1st_session_end,
                    thursday_2nd_session_start: data.thursday_2nd_session_start,
                    thursday_2nd_session_end: data.thursday_2nd_session_end,
                    friday: data.friday,
                    friday_1st_session_start: data.friday_1st_session_start,
                    friday_1st_session_end: data.saturday_1st_session_end,
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
            {data.allSpecializations && data.allSpecializations["DISEASE"] && <>
                <SectionHeading heading='Good Experience in treatment of' />
                <div className="px-2 py-2 grid grid-cols-2 gap-2">
                    {data.allSpecializations["DISEASE"].map((cat) =>
                        <div className="flex items-center gap-2 px-2 py-1 border border-color-grey rounded-md bg-white">
                            <img src={cat.icon || "/icon/disease-defult-icon.png"} className="w-10 h-10" />
                            <span>{cat.name}</span>
                        </div>
                    )}
                </div>
            </>}
            {data.settings.raw_information && 
            <div dangerouslySetInnerHTML={{ __html: data.settings.raw_information }} className="px-2 py-2 bg-white shadow-sm mb-2" ></div>
            }
        </>
    )
}
export default OverView