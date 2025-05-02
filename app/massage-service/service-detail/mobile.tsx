import Link from 'next/link';
import { BiTimeFive } from "react-icons/bi";
import Header from '@/app/components/mobile/header';
import BannerView from '@/app/components/mobile/banner-view';
import { TServiceListPageData } from '@/lib/hooks/massage-service/useMassageService';
import { doctorSpecialityIcon } from '@/lib/image';
import {formatCurrency} from '@/lib/helper/format-text';
import Bookservice,{BookBtn} from '@/app/components/mobile/massage-service/book-service';
const ServiceDetailMobile = ({ data }: { data: TServiceListPageData }) => {
    return (
        <>
            <Header template='SUBPAGE' heading='Massage Service' />
            <div className='mx-2'>
                <BannerView banners={[
                    { src: "https://miro.medium.com/v2/resize:fit:1400/1*X6npfXtjE3IIAr7Q1ggqEQ.jpeg", media_type: "image", duration: 5 },
                    { src: "https://media.gettyimages.com/id/469916170/photo/young-woman-relaxing-during-back-massage-at-the-spa.jpg?s=612x612&w=gi&k=20&c=Udrw6ym7K-uf97DiduYbgK12sEwrFW1nR1jg60ZG4KA=", media_type: "image", duration: 5 },
                    { src: "https://goodspaguide--live.s3.amazonaws.com/massage.jpg", media_type: "image", duration: 5 },
                    { src: "https://miro.medium.com/v2/resize:fit:1400/1*X6npfXtjE3IIAr7Q1ggqEQ.jpeg", media_type: "image", duration: 5 },
                    { src: "https://miro.medium.com/v2/resize:fit:1400/1*X6npfXtjE3IIAr7Q1ggqEQ.jpeg", media_type: "image", duration: 5 }
                ]} />
            </div>
            <div className='flex overflow-auto gap-2 px-2 mt-3 font-semibold bg-white shadow-md hide-scroll-bar'>
                {data.categories.map((category) =>
                    <div className='w-1/3 shrink-0' key={category.seo_id}>
                        <div className='px-1 fs-17 py-1 one-line'>{category.name}</div>
                        <div>
                            <img className='rounded-full w-full h-24' src={doctorSpecialityIcon(category.icon)} />
                        </div>
                        <div className='color-text-light px-1 mt-1 one-line'>From Head to Foot</div>
                        <div className='font-bold px-1 mt-1 flex'>
                            <span className='flex gap-1 items-center'>
                                <BiTimeFive />
                                {category.service_duration_display}
                            </span>
                            <span className='ml-auto'>{formatCurrency(category.price+category.lead_charge,'l')}</span>
                        </div>
                        <div className='text-center pb-2 mt-2 px-2'>
                            <BookBtn category={category}/>
                        </div>
                    </div>
                )}
            </div>
            <Bookservice/>
        </>
    )
}
export default ServiceDetailMobile;