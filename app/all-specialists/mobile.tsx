import Header from "../components/mobile/header"
import { fetchAllCategories } from '@/lib/hooks/useCategories';
import AllSpecialistsView from './all-specialists-view';
const AllSpecialistMobile = async ({state,city,town}:{state:string,city:string,town?:string}) => {
    const data = await fetchAllCategories()
    return (
        <>
            <Header template="SUBPAGE" heading="All Categories" />
            <AllSpecialistsView data={data} state={state} city={city} town={town} />
        </>
    )
}
export default AllSpecialistMobile
