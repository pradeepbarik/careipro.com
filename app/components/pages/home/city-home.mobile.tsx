import { Suspense } from 'react';
import { getCityHomePageData } from '@/lib/hooks/home/useHomePage';
import Header from '../../mobile/header';
import Footer from '../../mobile/footer';
import SectionHeading from '../../mobile/ui/section-heading';
import Specializations from '../../mobile/home/specializations';
import Verticals from '../../mobile/home/verticals';
import DoctorCategory from '../../mobile/home/doctor-category';
import Petcare from '../../mobile/home/pet-care';
//import ServiceAvailbeCities from '../../mobile/footer/service-available-cities';
import CategoriesFooter from '../../mobile/footer/categories';
import NearbyCities from '../../mobile/home/nearby-cities';
import PopularDoctor from '../../mobile/home/popular-doctor';
import PopularClinics from '../../mobile/home/popular-clinics';
import SetStateCity from '../../client-components/set-state-city';
import SectionBanners from '@/app/components/mobile/section-banners';
import dynamic from 'next/dynamic';
import { userSecreateKey, userinfo } from '@/constants/storage_keys';
import Login from '../../mobile/login';
import LoginToast from '../../mobile/login-toast';
const AppointmentReminder = dynamic(() => import("../../mobile/appointment-reminder"), { ssr: false });
const RatingReminder = dynamic(() => import("../../mobile/rating-reminder"), { ssr: false });
const CityHome = async ({ state, city, town, cookies }: { state: string, city: string, town: string, cookies: any }) => {
    const data = await getCityHomePageData(state, city, town);
    const getSectionDoctors = (doctorIds: number[]) => {
        let doctors: any[] = [];
        if (data?.doctors) {
            for (let i = 0; i < doctorIds.length; i++) {
                if (data.doctors && data.doctors[doctorIds[i].toString()]) {
                    doctors.push(data.doctors[doctorIds[i].toString()]);
                }
            }
        }
        return doctors;
    }
    return (
        <>
            <Header state={state} city={city} />
            {data && data.sections.map((section, i) =>
                <div key={`section-${i}-${section.name}`} id={`section-${i}`}>
                    {section.name === "nearby_cities" ?
                        <>
                            {section.heading && <SectionHeading heading={section.heading} />}
                            {data.nearbyCities &&
                                <NearbyCities data={data.nearbyCities} cityMarkets={data.cityMarkets || []} />
                            }
                        </> : section.name === "specialization" ? <>
                            {section.heading && <SectionHeading heading={section.heading} />}
                            <Specializations viewType={section.viewType} itemViewType={section.itemViewType === "oneline" ? 'oneline' : 'line_by_line'} itemWidth={section.itemWidth} state={state} city={city} town={town} data={data.specializations} specialist_ids={section.specialist_ids || []} />
                        </> : section.name === "verticals" ? <>
                            {section.heading && <SectionHeading heading={section.heading} />}
                            <Verticals data={data.verticals} />
                        </> : (section.name === "popular_clinic" && data.popularClinics) ? <>
                            {section.heading && <SectionHeading heading={section.heading} />}
                            <PopularClinics clinics={data.popularClinics} />
                        </> : (section.name === "popular_doctors" && data.popularDoctors) ? <>
                            {section.heading && <SectionHeading heading={section.heading} />}
                            <PopularDoctor data={data.popularDoctors} showFilter={true} />
                        </> : (section.name === "doctor_category" && data.doctorCategory) ? <>
                            {section.heading && <SectionHeading heading={section.heading} />}
                            <DoctorCategory data={data.doctorCategory} />
                        </> : section.name === "pet_care" ? <>
                            {section.heading && <SectionHeading heading={section.heading} />}
                            {data.petCareInfo && <Petcare data={data.petCareInfo} />}
                        </> : (section.name === "doctors" && (section.doctor_ids && section.doctor_ids.length > 0) && data.doctors) ? <>
                            {section.heading && <SectionHeading heading={section.heading} />}
                            <PopularDoctor data={getSectionDoctors(section.doctor_ids || [])} showFilter={true} />
                        </> : (section.name === "doctors" && (section.specialist_id && data.specialistDoctors && data.specialistDoctors[section.specialist_id.toString()])) ? <>
                            {section.heading && <SectionHeading heading={section.heading} />}
                            <PopularDoctor data={data.specialistDoctors[section.specialist_id.toString()]} showFilter={true} />
                        </> : (section.name === "banners" && section.banners) ? <>
                            {section.heading && <SectionHeading heading={section.heading} />}
                            <SectionBanners banners={section.banners} />
                        </> : <></>}
                </div>)}
            <Footer>
                <Suspense>
                    {/* <ServiceAvailbeCities /> */}
                    <CategoriesFooter heading='Find Doctors By Specialist' state={state} city={city} market_name={town} group_category='DOCTOR' page="DOCTORS" />
                </Suspense>
            </Footer>
            <SetStateCity state={state} city={city} />
            {cookies[userSecreateKey] && cookies[userinfo] ?
                <>
                    <AppointmentReminder position={"section-1"} />
                    <RatingReminder catid={0} doctor_id={0} />
                </> : <>
                </>
            }
        </>
    )
}
export default CityHome;