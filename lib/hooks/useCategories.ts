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
export type TAllCategories={
    group_categories:string[],
    categoryDataMapping:{
        [group_category:string]:{
            no_child_cats:string[],
            has_child_cats:string[],
            [parent_id:string]:string[]
        }
    },
    categoryData:{
        [id:string]:{
            id:number,
            name:string,
            parent_id:number,
            icon:string,
            short_description:string,
            seo_url:string,
            group_category:string,
            seo_id:string
        }
    }
}
export const fetchAllCategories = cache(async () => {
    try {
        return await fetchJson<TAllCategories>(`/cache/category/all-categories.json`);
    } catch (err: any) {
        const { data } = await fetchJson<IResponse<TAllCategories>>(`/init-cache/all-categories`);
        return data;
    }
})