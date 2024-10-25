import Link from 'next/link';
import { fetchCategories } from '@/lib/hooks/useCategories';
import { TCategories } from "@/lib/hooks/useCategories";
import { doctorsBySpecialistPageUrl,clinicsBySpecialistPageUrl } from '@/lib/helper/link';
const CategoriesView = ({ data, state, market_name = "", city, heading, page = 'DOCTORS' }: { data: TCategories, state: string, city: string, market_name?: string, heading: string, page?: 'DOCTORS' | 'CLINICS' }) => {
    return (<>
        <h2 className='font-semibold fs-16 py-2 px-2'>
            {heading}
        </h2>
        <div className='bg-white px-2 py-2'>
            <div className='flex flex-wrap gap-2'>
                {data.noChildCategories.map((cat) => <Link key={cat.seo_id} href={page==='CLINICS'?clinicsBySpecialistPageUrl(data.categoryData[cat.seo_id].seo_url,cat.seo_id,state,city,market_name): doctorsBySpecialistPageUrl(data.categoryData[cat.seo_id].seo_url, cat.seo_id, state, city)} className='px-2 py-1 border border-gray-300 bg-gray-100 rounded-md'>{cat.name}</Link>)}
            </div>
            {data.hasChildcategories.map((category) => <div key={category.seo_id}>
                <h3 className='font-medium fs-16 py-2'>{category.name}
                </h3>
                <div className='flex flex-wrap gap-2'>
                    {category.child_categories.map((cat) => <Link key={cat.seo_id} href={page==='CLINICS'?clinicsBySpecialistPageUrl(data.categoryData[cat.seo_id].seo_url,cat.seo_id,state,city,market_name): doctorsBySpecialistPageUrl(data.categoryData[cat.seo_id].seo_url, cat.seo_id, state, city)} className='px-2 py-1 border border-gray-300 bg-gray-100 rounded-md'>{cat.name}</Link>)}
                </div>
            </div>)}
        </div>
    </>)
}
const CategoriesFooter = async ({ state, city, market_name = "", group_category, heading, page = "DOCTORS", categories }: { state: string, city: string, market_name?: string, group_category: string, heading: string, page?: 'DOCTORS' | 'CLINICS', categories?: TCategories }) => {
    if (categories) {
        return (<>
            <CategoriesView data={categories} state={state} city={city} market_name={market_name} heading={heading} page={page} />
        </>)
    } else {
        let categoriesRes = await fetchCategories(group_category);
        return (<>
            <CategoriesView data={categoriesRes} state={state} city={city} market_name={market_name} heading={heading} page={page} />
        </>)
    }
}
export default CategoriesFooter;