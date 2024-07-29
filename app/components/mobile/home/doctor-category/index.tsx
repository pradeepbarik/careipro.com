import Link from "next/link";
import { AiOutlineRight } from "react-icons/ai";
import { THomePageData } from "@/lib/types/home-page";
import { doctorSpecialityIcon } from '@/lib/image';
const DoctorCategory = ({ data }: { data: THomePageData['doctorCategory'] }) => {
    return (<>
        <div className='flex overflow-auto cp-section' style={{ gap: '2%' }}>
            {data && data.map((category) =>
                <div className='flex flex-shrink-0 bg-white h-20 rounded' style={{ width: '48%', backgroundColor: category.bgColor }}>
                    <div className="relative w-1/2" >
                        <span className="color-white px-2 py-1 flex">{category.name}</span>
                        <div className="absolute flex items-center w-3/4 bg-primary bottom-4 px-1 py-1">
                            <Link href={category.url} className="color-white fs-12">Explore</Link>
                            <AiOutlineRight className="ml-auto color-white rounded-full p-1 h-4 w-4" style={{background:'#266552'}}/>
                        </div>
                    </div>
                    <div className="ml-auto w-1/2 flex bg-cover rounded-l-full" style={{backgroundImage:`url(${doctorSpecialityIcon(category.image)})`,borderLeft:"2px solid white"}}>
                    </div>
                </div>
            )}
        </div>
    </>)
}
export default DoctorCategory;