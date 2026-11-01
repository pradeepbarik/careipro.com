import { Suspense } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { BiChevronRight } from "react-icons/bi";
import Header from '../components/mobile/header';
import Footer from '../components/mobile/footer';
import ServiceAvailbeCities from '../components/mobile/footer/service-available-cities';
import CategoriesFooter from '../components/mobile/footer/categories';
import { SectionHeading } from "../components/mobile/ui";
import OneIsToNDoctorsSliders from "../components/mobile/doctors/horizonatal-slider";
import NIsToOneDoctorsSliders from "../components/mobile/doctors/vertical-slider";
import ViewAllCategories from '../components/mobile/doctors/view-all-categores';
import PopularDoctor from '../components/mobile/home/popular-doctor';
import { clinicBannerImage, doctorSpecialityIcon } from '@/lib/image';
import { TDoctorsPageData } from '@/lib/hooks/useDoctors';
import { TCategories } from "@/lib/hooks/useCategories";
import SectionBanners from '../components/mobile/section-banners';
import VerticalLandingBanner from '../components/mobile/slideing-banners/veritcal-banner';
import { TSiteBanner } from '@/lib/types/home-page';
const MobileDoctors = async ({ city, state, pageData, categories, diseases }: { city: string, state: string, pageData: TDoctorsPageData, categories: TCategories, diseases: TCategories }) => {
    return <>
        <Header template="VERTICAL_LANDING" heading={`Dotors In ${city}`} state={state} city={city} showSearch={true}/>
        <VerticalLandingBanner position='sticky' className='top-0' autoplay={true} loop={true} showNavigation={false} showPagination={true}
            banners={((pageData.site_banners ? pageData.site_banners : []) as TSiteBanner[]).filter((banner) => banner.device_type === "mobile" || banner.device_type === "all").map(banner => ({
                image: clinicBannerImage(banner.image),
                alt: banner.alt_text || "",
            }))}
        />
        <div className='bg-white rounded-tl-xl rounded-tr-xl relative z-10 -mt-5 pt-5'>
            <div className="bg-white">
                <SectionHeading heading="Find By Specialist">
                    <ViewAllCategories data={categories} state={state} city={city} />
                </SectionHeading>
                <div className="grid grid-cols-4 gap-x-2 gap-y-4 px-3 pt-2 pb-4 border-b border-line-light">
                    {pageData.specialists && pageData.specialists.map((specialist) =>
                        <Link key={specialist.id} href={specialist.seo_url} title={`${specialist.name} doctors in ${city}`} className="flex flex-col items-center min-w-0">
                            <span className="h-14 w-14 rounded-md bg-primary/10 border flex items-center justify-center">
                                <Image alt={specialist.name} src={doctorSpecialityIcon(specialist.icon)} width={36} height={36} className="h-9 w-9 rounded-full object-contain" placeholder="empty" loading="lazy" />
                            </span>
                            {/* two-line slot so a long name doesn't push its row out of line */}
                            <span className="mt-1.5 w-full text-center fs-12 font-medium leading-tight text-deep line-clamp-2 min-h-[2.5em]">{specialist.name}</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>

        {pageData.sections && pageData.sections.map((section, i) =>
            <div key={`section-${i}`} id={`section-${i}`}>
                {section.section_type === "doctor" ? <>
                    {section.heading &&
                        <SectionHeading heading={section.heading} >
                            {<Link href={section.view_all_url} className="button flex items-center ml-auto one-line" data-variant="outlined" data-size="xs">View All<BiChevronRight className="fs-17" /></Link>}
                        </SectionHeading>
                    }
                    {section.viewType === "1:n" ?
                        <>
                            <OneIsToNDoctorsSliders data={section.doctors} />
                        </>
                        : section.viewType === "n:1" ?
                            <>
                                <NIsToOneDoctorsSliders data={section.doctors} />
                                {/* <div className="text-center mt-2">
                                <Link href={""} className="button inline-flex ml-auto" data-variant="outlined" data-size="small">View all</Link>
                            </div> */}
                            </>
                            :
                            <></>}
                </> : (section.section_type === "popular_doctors" && pageData.popularDoctors) ? <>
                    {/* the same pinned list the city home shows, rendered by the same component.
                        the doctors sit at the top of the payload, not on the section. */}
                    {section.heading && <SectionHeading heading={section.heading} />}
                    <PopularDoctor data={pageData.popularDoctors} />
                </> : section.section_type === "banners" ? <>
                    {section.heading && <SectionHeading heading={section.heading} />}
                    {section.banners && <SectionBanners banners={section.banners} />}
                </> : <></>}
            </div>
        )}
        <Footer>
            <Suspense fallback={<></>}>
                <CategoriesFooter state={state} city={city} group_category='DOCTOR' heading='Best Doctors By Speciality' categories={categories} />
            </Suspense>
            <Suspense fallback={<></>}>
                <CategoriesFooter state={state} city={city} group_category='DISEASE' heading='Disease Specialist Doctors' categories={diseases} />
            </Suspense>
            <Suspense fallback={<></>}>
                <ServiceAvailbeCities />
            </Suspense>
        </Footer>
    </>
}
export default MobileDoctors;