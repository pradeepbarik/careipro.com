import { getCityHomePageData } from '@/lib/hooks/home/useHomePage';
import Header from '../../mobile/header';
import Footer from '../../mobile/footer';
import SectionHeading from '../../mobile/ui/section-heading';
import Specializations from '../../mobile/home/specializations';
import Verticals from '../../mobile/home/verticals';
import DoctorCategory from '../../mobile/home/doctor-category';
import Petcare from '../../mobile/home/pet-care';
import ServiceAvailbeCities from '../../mobile/footer/service-available-cities';
import NearbyCities from '../../mobile/home/nearby-cities';
import PopularDoctor from '../../mobile/home/popular-doctor';

const CityHome = async ({ state, city }: { state: string, city: string }) => {
    const data = await getCityHomePageData(state, city);
    return (
        <>
            <Header />
            {data && data.nearbyCities &&
                <NearbyCities data={data.nearbyCities} />
            }
            {data && data.sections.map((section) => <div>
                {section.name === "specialization" ? <>
                    {section.heading && <SectionHeading heading={section.heading} />}
                    <Specializations data={data.specializations} />
                </> : section.name === "verticals" ? <>
                    {section.heading && <SectionHeading heading={section.heading} />}
                    <Verticals data={data.verticals} />
                </> : (section.name === "popular_clinic" && data.popularClinics) ? <>
                    {section.heading && <SectionHeading heading={section.heading} />}
                </> : (section.name === "popular_doctors" && data.popularDoctors) ? <>
                    {section.heading && <SectionHeading heading={section.heading} />}
                    <PopularDoctor data={data.popularDoctors}/>
                </> : (section.name === "category" && data) ? <>
                    {section.heading && <SectionHeading heading={section.heading} />}
                    <DoctorCategory data={data.doctorCategory} />
                </> : section.name === "pet_care" ? <>
                    {section.heading && <SectionHeading heading={section.heading} />}
                    {data.petCareInfo && <Petcare data={data.petCareInfo} />}
                </> : <></>}
            </div>)}
            <Footer>
                <ServiceAvailbeCities />
            </Footer>
        </>
    )
}
export default CityHome;