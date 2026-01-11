import Link from 'next/link';
import { BiSolidChevronRight } from "react-icons/bi";
import { THomePageData } from "@/lib/types/home-page";
import { cityPageLink, } from '@/lib/helper/link';
import { capitalizeFirstLetter } from '@/lib/helper/format-text';
import { getCityIcon } from '@/lib/image';
import Nearme from '@/assets/icon/nearme';
const NearbyCities = ({ data, cityMarkets }: { data: THomePageData['nearbyCities'], cityMarkets?: THomePageData['cityMarkets'] }) => {
    return (
        <>
            {data &&
                <div className="flex gap-1 overflow-auto px-1 my-1 mt-2 hide-scroll-bar">
                    <div className='text-center w-16 shrink-0 overflow-hidden'>
                        <div className='h-12 bg-primary rounded-md flex items-center justify-center shrink-0'>
                            <Nearme className='h-8 w-8' style={{ fill: "white" }} />
                        </div>
                        <span className='fs-12 font-semibold'>Near me</span>
                    </div>
                    {/* {cityMarkets && cityMarkets.map((cityMarket) =>
                        <Link title={`Careipro -${cityMarket.market_name},${cityMarket.city}`} href={cityPageLink(cityMarket.state, cityMarket.city,cityMarket.market_name)} key={cityMarket.city} scroll={false} className="text-center w-20 shrink-0 overflow-hidden">
                            <div className='h-12 rounded-md overflow-hidden'>
                                <img src={getCityIcon(cityMarket.thumbIcon)} alt={`${cityMarket.market_name},${cityMarket.city}`} className='h-full w-full' />
                            </div>
                            <span className='fs-12 font-semibold' >{capitalizeFirstLetter(cityMarket.market_name || "")}</span>
                        </Link>
                    )} */}
                    {data.map((city) =>
                        <Link title={`Careipro - ${city.city}`} href={cityPageLink(city.state, city.city)} key={city.city} scroll={false} className="text-center w-20 shrink-0 overflow-hidden">
                            <div className='h-12 rounded-md overflow-hidden'>
                                <img src={getCityIcon(city.thumbIcon)} alt={`${city.city} of ${city.state}`} className='h-full w-full' />
                            </div>
                            <span className='fs-12 font-semibold' >{capitalizeFirstLetter(city.city)}</span>
                        </Link>
                    )}
                    <Link title={`Services available cities`} href={"/service-available-cities"} className="text-center w-20 shrink-0 overflow-hidden">
                        <div className='h-12 rounded-md overflow-hidden bg-primary flex items-center justify-center'>
                            <BiSolidChevronRight className='color-white text-2xl' />
                        </div>
                        <span className='fs-12 font-semibold' >All City</span>
                    </Link>
                </div>

            }
        </>
    )
}
export default NearbyCities;