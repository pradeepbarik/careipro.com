import Link from "next/link";
import { THomePageData } from "@/lib/types/home-page";
const PopularDoctor = ({ data }: { data: THomePageData['popularDoctors'] }) => {
    return <>
        <div className='flex overflow-auto cp-section text-center bg-white' style={{ gap: '1%' }}>
            {data.map((doctor) =>
                <div key={doctor.id} className="flex flex-col gap-2 shrink-0 items-center justify-center py-1" style={{width:'24%'}}>
                    <img src={doctor.image} className="w-24 h-24 rounded-full" />
                    <Link href={doctor.seo_url} className="font-semibold">{doctor.name}</Link>
                </div>
            )}
        </div>
    </>
}
export default PopularDoctor;