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
import { doctorSpecialityIcon } from '@/lib/image';
import { TDoctorsPageData } from '@/lib/hooks/useDoctors';
import { TCategories } from "@/lib/hooks/useCategories";
import SectionBanners from '../components/mobile/section-banners';
const MobileDoctors = async ({ city, state, pageData, categories, diseases }: { city: string, state: string, pageData: TDoctorsPageData, categories: TCategories, diseases: TCategories }) => {
    return <>
        <Header template="SUBPAGE" heading={`Dotors In ${city}`} />
        <div className="bg-white">
            <SectionHeading heading="Find By Specialist">
                <ViewAllCategories data={categories} state={state} city={city} />
            </SectionHeading>
            <div className="flex w-full overflow-auto hide-scroll-bar py-2 shadow-md">
                {pageData.specialists.map((specialist) =>
                    <div key={specialist.id} className="w-26 px-2 shrink-0 flex flex-col items-center">
                        <Image alt={specialist.name} src={doctorSpecialityIcon(specialist.icon)} width={40} height={40} className="h-10 w-10 rounded-full" placeholder="empty" loading="lazy" />
                        <Link href={specialist.seo_url} className="">{specialist.name}</Link>
                    </div>
                )}
            </div>
        </div>
        {pageData.sections.map((section, i) =>
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
                </> :section.section_type==="banners"?<>
                    {section.heading && <SectionHeading heading={section.heading} />}
                    {section.banners && <SectionBanners banners={section.banners} />}
                </>: <></>}
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