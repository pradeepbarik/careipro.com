import Link from 'next/link';
import Header from '../../mobile/header';
import { getHomePageData } from '../../../hooks/home/useHomePage';
const Home = async () => {
    const data = await getHomePageData();
    return (
        <>
            <Header />
            {data.sections.map((section) => <div>
                {section.name === "specialization" ? <>

                </> : section.name === "verticals" ? <>
                </> : section.name === "popular_clinic" ? <>
                </> : section.name === "popular_doctors" ? <>
                </> : section.name === "category" ? <>
                </> : section.name === "pet_care" ? <>
                </> : <></>}
            </div>)}
        </>
    )
}
export default Home;