import { getHomePageData } from '@/lib/hooks/home/useHomePage';
import Header from '../../mobile/header';
import Footer from '../../mobile/footer';
import SectionHeading from '../../mobile/ui/section-heading';
import Specializations from '../../mobile/home/specializations';
import Verticals from '../../mobile/home/verticals';
import DoctorCategory from '../../mobile/home/doctor-category';
import Petcare from '../../mobile/home/pet-care';
import PopularDoctor from '../../mobile/home/popular-doctor';
import NearbyCities from '../../mobile/home/nearby-cities';
import ServiceAvailbeCities from '../../mobile/footer/service-available-cities';
const Home = async () => {
    const data = await getHomePageData();
    return (
        <>
            <Header />
            {data && data.sections.map((section) => <div>
                {section.name === "nearby_cities" ?
                    <>
                        {section.heading && <SectionHeading heading={section.heading} />}
                        {data.nearbyCities &&
                            <NearbyCities data={data.nearbyCities} />
                        }
                    </> : section.name === "specialization" ? <>
                        {section.heading && <SectionHeading heading={section.heading} />}
                        <Specializations data={data.specializations} specialist_ids={section.specialist_ids || []} />
                    </> : section.name === "verticals" ? <>
                        {section.heading && <SectionHeading heading={section.heading} />}
                        <Verticals data={data.verticals} />
                    </> : (section.name === "popular_clinic" && data.popularClinics) ? <>
                        {section.heading && <SectionHeading heading={section.heading} />}
                    </> : (section.name === "popular_doctors" && data.popularDoctors) ? <>
                        {section.heading && <SectionHeading heading={section.heading} />}
                        <PopularDoctor data={data.popularDoctors} />
                    </> : (section.name === "doctor_category" && data) ? <>
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
export default Home;