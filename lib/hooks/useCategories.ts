import { cache } from 'react';
import { fetchJson, IResponse } from '@/lib/services/http-server';
export type TCategories = {
    hasChildcategories: Array<{
        seo_id: string,
        name: string,
        child_categories: Array<{
            seo_id: string,
            name: string,
        }>
    }>,
    noChildCategories: Array<{
        seo_id: string,
        name: string,
    }>,
    categoryData: Record<string, any>
}
export const fetchCategories = cache(async (group_category: string) => {
    try {
        return await fetchJson<TCategories>(`/cache/category/${group_category}.json`);
    } catch (err: any) {
        const { data } = await fetchJson<IResponse<TCategories>>(`/init-cache/all-categories?group_category=${group_category}`);
        return data;
    }
})