import Header from "@/app/components/mobile/header";
import { SectionHeading } from "@/app/components/mobile/ui";
import ClinicBanner from "@/app/components/mobile/clinics/clinic-banners";
import ClinicDoctors from "@/app/components/mobile/clinics/clinic-doctors";
import { TclinicDetail } from '@/lib/hooks/useClinics';
import { clinicProfilePic } from '@/lib/image';
import Nearme from '@/assets/icon/nearme';
import { BsTelephone } from "react-icons/bs";

const ClinicDetailMobile = ({ data }: { data: TclinicDetail }) => {
    return (
        <>
            <Header heading={data.clinic_info.name} template="SUBPAGE" />
            {(data.hasBanner) ?
                <>
                    <ClinicBanner banners={data.banners} profile_pic={data.clinic_info.logo || ""} name={data.clinic_info.name} />
                    <div className="flex gap-2 px-2 bg-white py-2">
                        <img src='/icon/clinic-icon.png' className='w-10 h-10' />
                        <div className="grow flex flex-col">
                            <h2 className={"color-primary fs-17 font-semibold"}>{data.clinic_info.name}</h2>
                            <span>5 Years in healthcare</span>
                            <span>{data.clinic_info.locality} {data.clinic_info.market_name},{data.clinic_info.city}</span>
                        </div>
                        <a href={`tel:${data.clinic_info.mobile}`} className="flex flex-col justify-center items-center ml-auto">
                            <BsTelephone className="border rounded-md p-2 w-12 h-10 bg-primary color-white" style={{ fontSize: '2.2rem'}} />
                            <span className="font-semibold text-nowrap">Call Now</span>
                        </a>
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
                            <span>5 Years in healthcare</span>
                            <span>{data.clinic_info.locality} {data.clinic_info.market_name},{data.clinic_info.city}</span>
                        </div>
                        <a href={`tel:${data.clinic_info.mobile}`} className="flex flex-col justify-center items-center ml-auto gap-1">
                            <BsTelephone className="border rounded-md p-2 w-12 h-10 bg-primary color-white" style={{ fontSize: '2.2rem'}} />
                            <span className="font-semibold text-nowrap">Call Now</span>
                        </a>
                    </div>
                </>}
                <SectionHeading heading="Doctors" />
                <ClinicDoctors clinic_info={data.clinic_info} doctors={data.doctors} specializations={data.specializations} />
        </>
    )
}
export default ClinicDetailMobile;