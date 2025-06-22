import Header from "../../components/mobile/header";
import { SectionHeading } from '@/app/components/mobile/ui';
import SwiperBanner from '../../components/mobile/ui/swiper-banner';
import { fetchPhysiotherapyHomePageData } from '@/lib/hooks/physiotherapy/usePhysiotherapy';
import { clinicBannerImage } from '@/lib/image';
import Specializations from './specializations';
import Clinics from "./clinics";
import Link from "next/link";
const PhysiotherapyMobile = async ({ state, city }: { state: string, city: string }) => {
    const pageData = await fetchPhysiotherapyHomePageData(state, city)
    return (
        <>
            <Header heading="Physiotherapist" template="SUBPAGE" />
            {pageData.sections.map((section, i) =>
                <div className='mt-2' key={`section-${i}`}>
                    {section.heading && <SectionHeading className='px-2' heading={section.heading} />}
                    {section.section_type === "banner" ? <>
                        <div className='px-1'>
                            <SwiperBanner banners={(section.banners || [])?.map((banner) =>
                                <div key={banner.id} className='rounded-md overflow-hidden'>
                                    <img className='w-full h-32 rounded-md' src={clinicBannerImage(banner.image)} alt={banner.alt_text} />
                                </div>
                            )} />
                        </div>
                    </> : section.section_type === "popular_specialist" ? <>
                        <Specializations data={section.specialists || []} city={city} state={state} />
                    </> : section.section_type === "promotion_banner" ? <>
                        <div className="px-2">
                            <Link href={section.banner?.banner_redirection_url || ""} className='w-full h-32 rounded-md overflow-hidden'>
                                <img src={section.banner?.banner} className='h-full rounded-md' />
                            </Link>
                        </div>
                    </> : section.section_type === "clinics" ? <div className="px-2">
                        <Clinics data={section.clinics || []} state={state} city={city} />
                    </div> : <>

                    </>
                    }
                </div>
            )}
        </>
    )
}
export default PhysiotherapyMobile;