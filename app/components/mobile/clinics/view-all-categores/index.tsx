"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { BiChevronDown } from "react-icons/bi";
import { SlideUpModal } from "@/app/components/mobile/ui";
import { TCategories } from "@/lib/hooks/useCategories";
import { clinicsBySpecialistPageUrl } from '@/lib/helper/link';
import { fetchJson, IResponse } from '@/lib/services/http-client';
export const fetchCategories = async (group_category: string) => {
    try {
        return await fetchJson<TCategories>(`/api/categories?group_category=${group_category}`);
    } catch (err: any) {
        const { data } = await fetchJson<IResponse<TCategories>>(`/init-cache/all-categories?group_category=${group_category}`);
        return data;
    }
}
const ViewAllCategories = ({ data, state, city, market_name, group_category }: { data?: TCategories, state: string, city: string, market_name: string, group_category: string }) => {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState<TCategories | undefined>(data);
    const [docrorCategories, setDoctorCategories] = useState<TCategories | undefined>(data);
    const [diseaseCategories, setDiseaseCategories] = useState<TCategories | undefined>(data);
    useEffect(() => {
        if (open === true && typeof categories === "undefined") {
            fetchCategories(group_category).then((data) => {
                setCategories(data)
            });
            if (group_category === "CLINIC") {
                if (typeof docrorCategories === "undefined") {
                    fetchCategories("DOCTOR").then((data) => {
                        setDoctorCategories(data)
                    });
                }
                if (typeof diseaseCategories === "undefined") {
                    fetchCategories("DISEASE").then((data) => {
                        setDiseaseCategories(data)
                    });
                }
            }
        }
    }, [open])
    return (
        <>
            <span className="button inline-flex items-center ml-auto" data-variant="outlined" data-size="xs" onClick={() => { setOpen(true) }}>All Specialists <BiChevronDown className="fs-17" /></span>
            <SlideUpModal open={open} heading="Find Clinics" onClose={() => { setOpen(false) }}>
                <>
                    <div className='flex flex-wrap gap-2 mt-2'>
                        {categories && categories.noChildCategories.map((cat) => <Link key={cat.seo_id} href={clinicsBySpecialistPageUrl(categories.categoryData[cat.seo_id].seo_url, cat.seo_id, state, city, market_name)} className='px-2 py-1 border border-gray-300 bg-gray-100 rounded-md'>{cat.name}</Link>)}
                    </div>
                    <div className="mb-4">
                        {categories && categories.hasChildcategories.map((category) => <div key={category.seo_id}>
                            <h3 className='font-medium fs-16 py-2'>{category.name}
                            </h3>
                            <div className='flex flex-wrap gap-2'>
                                {category.child_categories.map((cat) => <Link key={cat.seo_id} href={clinicsBySpecialistPageUrl(categories.categoryData[cat.seo_id].seo_url, cat.seo_id, state, city, market_name)} className='px-2 py-1 border border-gray-300 bg-gray-100 rounded-md'>{cat.name}</Link>)}
                            </div>
                        </div>)}
                    </div>
                </>
                {diseaseCategories && <>
                    <h3 className='font-semibold fs-16 py-2 '>Clinics for Treatment of Disease 
                    </h3>
                    <div className='flex flex-wrap gap-2 mt-2'>
                        {diseaseCategories && diseaseCategories.noChildCategories.map((cat) => <Link key={cat.seo_id} href={clinicsBySpecialistPageUrl(diseaseCategories.categoryData[cat.seo_id].seo_url, cat.seo_id, state, city, market_name)} className='px-2 py-1 border border-gray-300 bg-gray-100 rounded-md'>{cat.name}</Link>)}
                    </div>
                    <div className="mb-4">
                        {diseaseCategories && diseaseCategories.hasChildcategories.map((category) => <div key={category.seo_id}>
                            <h3 className='font-medium fs-16 py-2'>{category.name}
                            </h3>
                            <div className='flex flex-wrap gap-2'>
                                {category.child_categories.map((cat) => <Link key={cat.seo_id} href={clinicsBySpecialistPageUrl(diseaseCategories.categoryData[cat.seo_id].seo_url, cat.seo_id, state, city, market_name)} className='px-2 py-1 border border-gray-300 bg-gray-100 rounded-md'>{cat.name}</Link>)}
                            </div>
                        </div>)}
                    </div>
                </>}
                {docrorCategories && <>
                    <h3 className='font-semibold fs-16 py-2 '>Doctor Specializations 
                    </h3>
                    <div className='flex flex-wrap gap-2 mt-2'>
                        {docrorCategories && docrorCategories.noChildCategories.map((cat) => <Link key={cat.seo_id} href={clinicsBySpecialistPageUrl(docrorCategories.categoryData[cat.seo_id].seo_url, cat.seo_id, state, city, market_name)} className='px-2 py-1 border border-gray-300 bg-gray-100 rounded-md'>{cat.name}</Link>)}
                    </div>
                    <div className="mb-4">
                        {docrorCategories && docrorCategories.hasChildcategories.map((category) => <div key={category.seo_id}>
                            <h3 className='font-medium fs-16 py-2'>{category.name}
                            </h3>
                            <div className='flex flex-wrap gap-2'>
                                {category.child_categories.map((cat) => <Link key={cat.seo_id} href={clinicsBySpecialistPageUrl(docrorCategories.categoryData[cat.seo_id].seo_url, cat.seo_id, state, city, market_name)} className='px-2 py-1 border border-gray-300 bg-gray-100 rounded-md'>{cat.name}</Link>)}
                            </div>
                        </div>)}
                    </div>
                </>}
                
            </SlideUpModal>
        </>
    )
}
export default ViewAllCategories;