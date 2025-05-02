import { Suspense } from 'react';
import { getCityHomePageData } from '@/lib/hooks/home/useHomePage';
import Header from '../../mobile/header';
import Footer from '../../mobile/footer';
import SectionHeading from '../../mobile/ui/section-heading';
import Specializations from '../../mobile/home/specializations';
import Verticals from '../../mobile/home/verticals';
import DoctorCategory from '../../mobile/home/doctor-category';
import Petcare from '../../mobile/home/pet-care';
import ServiceAvailbeCities from '../../mobile/footer/service-available-cities';
import CategoriesFooter from '../../mobile/footer/categories';
import NearbyCities from '../../mobile/home/nearby-cities';
import PopularDoctor from '../../mobile/home/popular-doctor';
import PopularClinics from '../../mobile/home/popular-clinics';
import SetStateCity from '../../client-components/set-state-city';
import AppointmentReminder from '../../mobile/appointment-reminder';
const CityHome = async ({ state, city }: { state: string, city: string }) => {
    const data = await getCityHomePageData(state, city);
    return (
        <>
            <Header state={state} city={city} />
            {data && data.sections.map((section,i) => <div id={`section-${i}`}>
                {section.name === "nearby_cities" ?
                    <>
                        {section.heading && <SectionHeading heading={section.heading} />}
                        {data.nearbyCities &&
                            <NearbyCities data={data.nearbyCities} />
                        }
                    </> : section.name === "specialization" ? <>
                        {section.heading && <SectionHeading heading={section.heading} />}
                        <Specializations viewType={section.viewType} itemViewType={section.itemViewType==="oneline"?'oneline':'line_by_line'} state={state} city={city} data={data.specializations} specialist_ids={section.specialist_ids||[]} />
                    </> : section.name === "verticals" ? <>
                        {section.heading && <SectionHeading heading={section.heading} />}
                        <Verticals data={data.verticals} />
                    </> : (section.name === "popular_clinic" && data.popularClinics) ? <>
                        {section.heading && <SectionHeading heading={section.heading} />}
                        <PopularClinics clinics={data.popularClinics} />
                    </> : (section.name === "popular_doctors" && data.popularDoctors) ? <>
                        {section.heading && <SectionHeading heading={section.heading} />}
                        <PopularDoctor data={data.popularDoctors} />
                    </> : (section.name === "doctor_category" && data.doctorCategory) ? <>
                        {section.heading && <SectionHeading heading={section.heading} />}
                        <DoctorCategory data={data.doctorCategory} />
                    </> : section.name === "pet_care" ? <>
                        {section.heading && <SectionHeading heading={section.heading} />}
                        {data.petCareInfo && <Petcare data={data.petCareInfo} />}
                    </> : <></>}
            </div>)}
            <Footer>
                <Suspense>
                    <ServiceAvailbeCities />
                    <CategoriesFooter heading='Find Doctors By Specialist' state={state} city={city} group_category='DOCTOR' page="DOCTORS" />
                </Suspense>
            </Footer>
            <SetStateCity state={state} city={city} />
            <AppointmentReminder position={"section-1"} />
        </>
    )
}
export default CityHome;