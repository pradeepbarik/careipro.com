import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import Header from "../components/mobile/header";
import Footer from '../components/mobile/footer';
import ServiceAvailbeCities from '../components/mobile/footer/service-available-cities';
import CategoriesFooter from '../components/mobile/footer/categories';
import { TClinicsPageData } from '@/lib/hooks/useClinics';
import { SectionHeading } from '@/app/components/mobile/ui';
import OneIsToNClinicsSliders from "@/app/components/mobile/clinics/horizontal-slider";
import NIsToOneClinicsSliders from "@/app/components/mobile/clinics/vertical-slider";
import ViewAllCategories from "@/app/components/mobile/clinics/view-all-categores";
import { doctorSpecialityIcon } from '@/lib/image';
import { TCategories } from "@/lib/hooks/useCategories";
import ClientHandler from './client-handler';
type Tprops = {
    state: string,
    city: string,
    pageData: TClinicsPageData,
    clinicCategories?: TCategories,
    doctorCategories?: TCategories,
}
const HospitalsMobile = ({ state, city, pageData }: Tprops) => {
    return (
        <>
            <Header template="SUBPAGE" heading={`Hospitals and clinics In ${city}`} />
            <div className="bg-white">
                <SectionHeading heading="Find By Specialist">
                    <ViewAllCategories state={state} city={city} market_name={pageData.primary_market} group_category="CLINIC" />
                </SectionHeading>
                <div className="flex w-full overflow-auto hide-scroll-bar py-2">
                    {pageData.specialists.map((specialist) =>
                        <div key={specialist.id} className="w-26 px-2 shrink-0 flex flex-col items-center">
                            <Image alt={specialist.name} src={doctorSpecialityIcon(specialist.icon)} width={48} height={48} className="h-12 w-12 rounded-full" />
                            <Link href={specialist.seo_url} className="">{specialist.name}</Link>
                        </div>
                    )}
                </div>
            </div>
            {pageData.sections.map((section) =>
                <div key={section.heading}>
                    <SectionHeading heading={section.heading} >
                        {section.view_all_url && <Link href={section.view_all_url} className="button inline-flex items-center ml-auto" data-variant="contained" data-size="xs">View All<BiChevronRight className="fs-17" /></Link>}
                    </SectionHeading>
                    {section.viewType === "1:n" ?
                        <>
                            <OneIsToNClinicsSliders clinics={section.clinics} />
                        </>
                        : section.viewType === "n:1" ?
                            <>
                                <NIsToOneClinicsSliders clinics={section.clinics} />
                            </>
                            :
                            <></>
                    }
                </div>
            )}
            <Footer>
                <Suspense fallback={<></>}>
                    <CategoriesFooter state={state} city={city} market_name={pageData.primary_market} group_category='CLINIC' page="CLINICS" heading='Find Best Clinics By Categories' />
                </Suspense>
                <Suspense fallback={<></>}>
                    <CategoriesFooter state={state} city={city} market_name={pageData.primary_market} group_category='DOCTOR' page="CLINICS" heading='Best Specialization Doctors' />
                </Suspense>
                <Suspense fallback={<></>}>
                    <ServiceAvailbeCities />
                </Suspense>
            </Footer>
            <ClientHandler/>
        </>
    )
}
export default HospitalsMobile;