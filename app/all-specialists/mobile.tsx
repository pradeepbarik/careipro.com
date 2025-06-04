import React from "react";
import Link from "next/link";
import Header from "../components/mobile/header"
import { SectionHeading } from "../components/mobile/ui";
import { fetchAllCategories } from '@/lib/hooks/useCategories';
import { groupCategoryDisplayName, groupCategoryHeading } from "@/lib/helper/format-text";
import {categoryResultPageLink} from '@/lib/helper/link';
const AllSpecialistMobile = async ({state,city}:{state:string,city:string}) => {
    const data = await fetchAllCategories()
    return (
        <>
            <Header template="SUBPAGE" heading="All Categories" />
            <div className="flex">
                <div className="w-24 border-r px-1 py-2 overflow-auto flex-shrink-0" style={{ height: "calc(100vh - 59px)" }}>
                    {data.group_categories.map((gcat,i) =>
                        <div className="flex flex-col items-center rounded-md overflow-hidden" key={`gcat-${i}`}>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpQQExpgI8S_23hjllORQ3eeWQNYVDuxI4DQ&s" className="w-10 h-10" />
                            <span className="font-semibold fs-13 text-center">{groupCategoryDisplayName(gcat)}</span>
                        </div>
                    )}
                </div>
                <div className="grow px-2 overflow-auto" style={{ height: "calc(100vh - 59px)" }}>
                    {data.group_categories.map((group_category) =>
                        <React.Fragment key={group_category}>
                            <SectionHeading heading={groupCategoryHeading(group_category)+":"}/>
                            <div className="flex gap-x-2 gap-y-1 flex-wrap">
                                {data.categoryDataMapping[group_category] && data.categoryDataMapping[group_category].no_child_cats.map((parent_id) =>
                                    <Link href={categoryResultPageLink({
                                        state:state,city:city,seo_url:data.categoryData[parent_id].seo_url,seo_id:data.categoryData[parent_id].seo_id,group_category:data.categoryData[parent_id].group_category
                                    })} key={parent_id} className="border border-color-grey bg-white px-2 py-2 rounded-md">
                                        <span className="one-line font-semibold color-text-light">{data.categoryData[parent_id].name}</span>
                                    </Link>
                                )}
                                {data.categoryDataMapping[group_category] && data.categoryDataMapping[group_category].has_child_cats.map((parent_id) =>
                                    <React.Fragment key={parent_id}>
                                        {data.categoryDataMapping[group_category][parent_id].map(child_cat_id =>
                                            <Link href={categoryResultPageLink({
                                                state:state,city:city,seo_url:data.categoryData[child_cat_id].seo_url,seo_id:data.categoryData[child_cat_id].seo_id,group_category:data.categoryData[child_cat_id].group_category
                                            })} key={child_cat_id} className="border border-color-grey bg-white py-2 rounded-md flex items-center">
                                                <img src="https://media.istockphoto.com/id/1352426609/vector/woman-with-acne-and-clean-face-skin-line-icon-female-skincare-for-cleansing-face-and-problem.jpg?s=612x612&w=0&k=20&c=pH_T2vq50xyqIrQIYAi_mZJZLlaqdXul1MQvTB9W8OQ=" className="h-7 w-7 rounded-full" />
                                                <span className="one-line font-semibold color-text-light px-1"> {data.categoryData[child_cat_id].name}</span>
                                            </Link>
                                        )}
                                    </React.Fragment>
                                )}
                            </div>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </>
    )
}
export default AllSpecialistMobile