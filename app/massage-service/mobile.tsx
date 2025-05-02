import Link from 'next/link';
import { BiStar, BiSolidStar } from "react-icons/bi";
import Header from '@/app/components/mobile/header';
import { SectionHeading } from '@/app/components/mobile/ui';
import BannerView from '@/app/components/mobile/banner-view';
import { THomePageData } from '@/lib/hooks/massage-service/useMassageService';
import { doctorSpecialityIcon } from '@/lib/image';
const MassageServiceMobile = ({ state, city, market_name, data }: { state: string, city: string, market_name?: string, data: THomePageData }) => {
    return (
        <>
            <Header template='SUBPAGE' heading='Massage Service' />
            <div className='relative'>
                <BannerView banners={data.banners.map((banner) => {
                    return {
                        src: banner.banner_url,
                        media_type: banner.banner_type,
                        duration: 5
                    }
                })} />
                <div className='bottom-0 left-0 w-full py-4 px-2 rounded-tl-xl rounded-tr-xl border-t text-lg font-bold bg-white-primary'>
                    Choose your massage
                </div>
            </div>
            <div className='bg-white-primary'>
                <div className='flex px-2 overflow-auto hide-scroll-bar' style={{ gap: "10px" }}>
                    {data.categories.map((category) =>
                        <div className='shrink-0 rounded-md' style={{ width: "calc(50% - 5px)" }}>
                            <div className='flex flex-col justify-center shadow-md border'>
                                <img src={doctorSpecialityIcon(category.icon)} className='h-28 w-full rounded-md' />
                                <div className='px-2 mt-2 pb-2'>
                                    <span className='font-semibold fs-16'>{category.name}</span>
                                    <div className='flex items-center w-full gap-2 mt-2'>
                                        {/* <span className='inline-flex gap-1 h-8 items-center border rounded-full px-2 bg-pink color-white'>
                                            <BiSolidStar className='text-lg' />
                                            <span className='font-bold fs-17'>4.6</span>
                                        </span> */}
                                        <Link href={category.seo_url} className='border border-color-primary py-2 rounded-md grow text-center font-semibold bg-white'>Book Now</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <SectionHeading heading='Popular Ayurvedic Massage Centers' />
        </>
    )
}
export default MassageServiceMobile;