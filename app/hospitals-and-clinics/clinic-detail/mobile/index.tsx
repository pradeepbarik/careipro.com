import Link from "next/link";
import Header from "@/app/components/mobile/header";
import { SectionHeading } from "@/app/components/mobile/ui";
import ClinicBanner from "@/app/components/mobile/clinics/clinic-banners";
import ClinicDoctors from "@/app/components/mobile/clinics/clinic-doctors";
import AppointmentReminder from '@/app/components/mobile/appointment-reminder';
import { TclinicDetail } from '@/lib/hooks/useClinics';
import { clinicProfilePic } from '@/lib/image';
import {doctorsTabDisplayname} from '@/lib/helper/format-text';
import Nearme from '@/assets/icon/nearme';
import { BsTelephone, BsWhatsapp } from "react-icons/bs";
import { BiHelpCircle,BiGridAlt,BiPhotoAlbum,BiMessageRoundedDots } from "react-icons/bi";
import { clinicDetailpageUrl } from "@/lib/helper/link";

const ClinicDetailMobile = ({ data,searchParams }: { data: TclinicDetail,searchParams:any }) => {
    const pageUrl = clinicDetailpageUrl({ seo_url: data.clinic_info.seo_url, state: data.clinic_info.state||"", city: data.clinic_info.city, market_name: data.clinic_info.market_name, bid: data.clinic_info.bid }) 
    return (
        <>
            <Header heading={data.clinic_info.name} template="SUBPAGE" />
            {(data.hasBanner && false) ?
                <>
                    <ClinicBanner banners={data.banners} profile_pic={data.clinic_info.logo || ""} name={data.clinic_info.name} />
                    <div className="flex items-center gap-2 px-2 bg-white py-2">
                        <img src='/icon/clinic-icon.png' className='w-8 h-8' />
                        <div className="grow flex flex-col">
                            <h2 className={"color-primary fs-17 font-semibold"}>{data.clinic_info.name}</h2>
                            {/* <span>5 Years in healthcare</span> */}
                            <span>{data.clinic_info.locality} {data.clinic_info.market_name},{data.clinic_info.city}</span>
                        </div>
                    </div>
                </>
                :
                <>
                    <div className="flex gap-2 bg-white px-2 py-1">
                        <div>
                            <img src={clinicProfilePic(data.clinic_info.logo || "")} className="h-24 w-24 rounded-lg" />
                        </div>
                        <div className="flex flex-col grow">
                            <span className="font-semibold fs-17 color-primary">{data.clinic_info.name}</span>
                            {/* <span>5 Years in healthcare</span> */}
                            <span>{data.clinic_info.locality} {data.clinic_info.market_name},{data.clinic_info.city}</span>
                        </div>
                    </div>
                </>}
            <div className="bg-white flex px-2 justify-around shadow-md">
                <a href={`tel:${data.clinic_info.mobile}`} className="flex flex-col justify-center items-center">
                    <BsTelephone className="border rounded-md p-2 w-12 h-10 bg-primary color-white" style={{ fontSize: '2.2rem' }} />
                    <span className="font-semibold text-nowrap">Call Now</span>
                </a>
                {data.clinic_info.whatsapp_number &&
                    <a href={`tel:${data.clinic_info.whatsapp_number}`} className="flex flex-col justify-center items-center">
                        <BsWhatsapp className="border rounded-md p-2 w-12 h-10 bg-primary color-white" style={{ fontSize: '2.2rem', background: "#61AA84" }} />
                        <span className="font-semibold text-nowrap">Message</span>
                    </a>
                }
                <a target="_blank" href={`https://www.google.com/maps/dir/?api=1&destination=${data.clinic_info.location_lat},${data.clinic_info.location_lng}`} className="flex flex-col justify-center items-center">
                    <Nearme className="border rounded-md p-2 w-12 h-10" style={{ fontSize: '2.2rem' }} />
                    <span className="font-semibold text-nowrap">Direction</span>
                </a>
                <a href={`tel:${data.clinic_info.mobile}`} className="flex flex-col justify-center items-center">
                    <BiHelpCircle className="border rounded-md p-2 w-12 h-10" style={{ fontSize: '2.2rem' }} />
                    <span className="font-semibold text-nowrap">Ask</span>
                </a>
            </div>
            <div id="reminder-section"></div>
            <div className="flex overflow-auto px-2 gap-2 hide-scroll-bar mt-2 mb-2">
                {data.totalDoctors > 0 &&
                <Link href={`${pageUrl}`} className={`text-nowrap border bg-white rounded-3xl px-2 py-1 font-semibold flex items-center ${(searchParams.sub_page == undefined || searchParams.sub_page === "") ? 'bg-primary color-white' : ''}`}>
                    <img src="/icon/male-doctor.svg" className="h-6 w-6 rounded-full bg-white" />
                    <span className="ml-1">{doctorsTabDisplayname(data.clinic_info.business_type)}</span>
                </Link>
                }
                <Link href={`${pageUrl}/photos`} className={`bg-white border rounded-3xl font-semibold px-2 py-1 flex items-center shrink-0 gap-1 ${(searchParams.sub_page === "photos") ? 'bg-primary color-white' : ''}`}>
                    <BiPhotoAlbum className="" />
                    <span className="text-nowrap">Photos</span>
                </Link>
                <Link href={`${pageUrl}/feedback`} className={`bg-white border rounded-3xl font-semibold px-2 py-1 flex items-center shrink-0 gap-1 ${(searchParams.sub_page === "feedback") ? 'bg-primary color-white' : ''}`}>
                    <BiMessageRoundedDots />
                    <span className="text-nowrap">Reviews</span>
                </Link>
            </div>
            {searchParams.sub_page ==="" || searchParams.sub_page === undefined ?
            <ClinicDoctors clinic_info={data.clinic_info} doctors={data.doctors} specializations={data.specializations} />
            :searchParams.sub_page ==="photos"?
            <div className="flex flex-wrap gap-2 p-2">photos</div>
            :<ClinicDoctors clinic_info={data.clinic_info} doctors={data.doctors} specializations={data.specializations} />
            }
            <AppointmentReminder clinic_id={data.clinic_info.id} position="reminder-section" />
        </>
    )
}
export default ClinicDetailMobile;