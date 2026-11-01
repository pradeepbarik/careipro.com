"use client"
import { useState } from "react";
import Link from "next/link";
import { BiChevronDown, BiSearch } from "react-icons/bi";
import { SlideUpModal } from "@/app/components/mobile/ui";
import { TCategories } from "@/lib/hooks/useCategories";
import { doctorsBySpecialistPageUrl } from '@/lib/helper/link';
const ViewAllCategories = ({ data, state, city }: { data: TCategories, state: string, city: string }) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const query = search.trim().toLowerCase();
    const matches = (name: string) => name.toLowerCase().includes(query);
    const noChildCategories = query ? data.noChildCategories.filter((cat) => matches(cat.name)) : data.noChildCategories;
    const hasChildcategories = query ? data.hasChildcategories
        .map((category) => matches(category.name) ? category : { ...category, child_categories: category.child_categories.filter((cat) => matches(cat.name)) })
        .filter((category) => category.child_categories.length > 0) : data.hasChildcategories;
    return (
        <>
            <span className="button inline-flex items-center ml-auto" data-variant="outlined" data-size="xs" onClick={() => { setOpen(true) }}>All Specialists <BiChevronDown className="fs-17" /></span>
            <SlideUpModal open={open} heading="All Doctor Specialists" onClose={() => { setOpen(false); setSearch("") }}>
                <>
                    <div className='relative mt-2'>
                        <BiSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 fs-18' />
                        <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search specialist" className='w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md outline-none focus:border-primary' />
                    </div>
                    {noChildCategories.length === 0 && hasChildcategories.length === 0 && <p className='text-center text-gray-500 py-6'>No specialist found for &quot;{search.trim()}&quot;</p>}
                    <div className='flex flex-wrap gap-2 mt-2'>
                        {noChildCategories.map((cat) => <Link key={cat.seo_id} href={doctorsBySpecialistPageUrl(data.categoryData[cat.seo_id].seo_url, cat.seo_id, state, city)} className='px-2 py-1 border border-gray-300 bg-gray-100 rounded-md'>{cat.name}</Link>)}
                    </div>
                    <div className="mb-4">
                        {hasChildcategories.map((category) => <div key={category.seo_id}>
                            <h3 className='font-medium fs-16 py-2'>{category.name}
                            </h3>
                            <div className='flex flex-wrap gap-2'>
                                {category.child_categories.map((cat) => <Link key={cat.seo_id} href={doctorsBySpecialistPageUrl(data.categoryData[cat.seo_id].seo_url, cat.seo_id, state, city)} className='px-2 py-1 border border-gray-300 bg-gray-100 rounded-md'>{cat.name}</Link>)}
                            </div>
                        </div>)}
                    </div>
                </>
            </SlideUpModal>
        </>
    )
}
export default ViewAllCategories;