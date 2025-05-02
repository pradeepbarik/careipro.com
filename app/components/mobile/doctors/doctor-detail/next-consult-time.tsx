import { TDoctorvailableData } from '@/lib/types/doctor';
import { FcAdvertising, FcClock,FcCalendar } from "react-icons/fc";

const NextConcultTime = async ({ data }: { data: TDoctorvailableData }) => {
    return (
        <div className='font-semibold border px-2 py-1 rounded-md shadow-md'>
            <div className='flex items-center'>
                <FcCalendar />
                <span className='ml-2'>Date : &nbsp;&nbsp;<span className='color-primary'>{data.available_on}</span></span>
            </div>
            <div className='flex items-center'>
            <FcClock />
            <span className='ml-2 flex items-center'>
                Time :&nbsp;&nbsp; 
                <span className='color-primary flex flex-col'>
                    <span>{data.first_session_start_time} - {data.first_session_end_time}</span>
                    {data.second_session_start_time && <span>{data.second_session_start_time} - {data.second_session_end_time}</span>}
                </span>
            </span>
            </div>
        </div>
    )
}
export default NextConcultTime