import { fetchAllCategories } from '@/lib/hooks/useCategories';
import AllSpecialistsDesktop from './desktop-view';

/* the header and footer come from the root layout on desktop, so this only fetches and hands the
   categories to the view, the mirror of what mobile.tsx does with its own chrome */
const AllSpecialistDesktop = async ({ state, city, town }: { state: string, city: string, town?: string }) => {
    const data = await fetchAllCategories();
    return <AllSpecialistsDesktop data={data} state={state} city={city} town={town} />;
};

export default AllSpecialistDesktop;
