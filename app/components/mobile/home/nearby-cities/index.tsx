import Link from 'next/link';
import { THomePageData } from "@/lib/types/home-page";
import { cityPageLink, } from '@/lib/helper/link';
import { capitalizeFirstLetter } from '@/lib/helper/format-text';
import {getCityIcon} from '@/lib/image';
import  Nearme from '@/assets/icon/nearme';
const NearbyCities = ({ data }: { data: THomePageData['nearbyCities'] }) => {
    return (
        <>
            {data &&
                <div className="flex gap-1 overflow-auto px-1 my-1 mt-2 hide-scroll-bar">
                    <div className='text-center w-16 shrink-0 overflow-hidden'>
                        <div className='h-12 bg-primary rounded-md flex items-center justify-center shrink-0'>
                           <Nearme className='h-8 w-8' style={{fill:"white"}}/>
                        </div>
                        <span className='fs-12 font-semibold'>Near me</span>
                    </div>
                    {data.map((city) =>
                        <div key={city.city} className="text-center w-20 shrink-0 overflow-hidden">
                            <div className='h-12 rounded-md overflow-hidden'>
                               <img src={getCityIcon(city.thumbIcon)} alt={`${city.city} of ${city.state}`} className='h-full w-full' />
                            </div>
                            <Link href={cityPageLink(city.state, city.city)} scroll={false} className='fs-12 font-semibold' >{capitalizeFirstLetter(city.city)}</Link>
                        </div>
                    )}
                </div>
                
            }
        </>
    )
}
export default NearbyCities;