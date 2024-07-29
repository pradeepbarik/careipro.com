import { THomePageData } from "@/lib/types/home-page";
import { doctorSpecialityIcon } from '@/lib/image';
const Petcare=({data}:{data:THomePageData['petCareInfo']})=>{
    return (
        <div className='flex overflow-auto cp-section' style={{ gap: '2%' }}>
            {data.map((item,i)=>
            <div className="grow h-40" key={`petcare-${i}`}>
                <img src={doctorSpecialityIcon(item.banner)} className="w-full h-full" />
            </div>
            )}
        </div>
    )
}
export default Petcare