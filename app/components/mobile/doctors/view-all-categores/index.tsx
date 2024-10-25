"use client"
import { useState } from "react";
import Link from "next/link";
import { BiChevronDown } from "react-icons/bi";
import { SlideUpModal } from "@/app/components/mobile/ui";
import { TCategories } from "@/lib/hooks/useCategories";
import { doctorsBySpecialistPageUrl } from '@/lib/helper/link';
const ViewAllCategories = ({ data, state, city }: { data: TCategories, state: string, city: string }) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <span className="button inline-flex items-center ml-auto" data-variant="outlined" data-size="xs" onClick={() => { setOpen(true) }}>All Specialists <BiChevronDown className="fs-17" /></span>
            <SlideUpModal open={open} heading="All Doctor Specialists" onClose={() => { setOpen(false) }}>
                <>
                    <div className='flex flex-wrap gap-2 mt-2'>
                        {data.noChildCategories.map((cat) => <Link key={cat.seo_id} href={doctorsBySpecialistPageUrl(data.categoryData[cat.seo_id].seo_url, cat.seo_id, state, city)} className='px-2 py-1 border border-gray-300 bg-gray-100 rounded-md'>{cat.name}</Link>)}
                    </div>
                    <div className="mb-4">
                        {data.hasChildcategories.map((category) => <div key={category.seo_id}>
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