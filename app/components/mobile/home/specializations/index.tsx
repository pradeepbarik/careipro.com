import { FC } from "react";
import Link from "next/link";
import { AiOutlineRight } from "react-icons/ai";
import { TSpecility } from "@/lib/types/home-page";
import { doctorSpecialityIcon } from '@/lib/image';
import { alllCategoriesPageLink } from '@/lib/helper/link';
import { array_chunk } from '@/lib/helper';

const Specializations: FC<{ data: Record<number, TSpecility>, specialist_ids: number[], state?: string, city?: string, viewType?: string, itemViewType?: 'line_by_line' | 'oneline',itemWidth?:string }> = ({ data, specialist_ids, state, city, viewType = "", itemViewType = "line_by_line",itemWidth='' }) => {
    if (viewType === "2:n") {
        let chunks = array_chunk([...specialist_ids, 0], 2, [])
        return (
            <div className="flex overflow-auto gap-1 hide-scroll-bar px-2">
                {chunks.map((ids,i) =>
                    <div key={`specializations-${i}`} style={itemWidth?{width:itemWidth,flexShrink:0}:{}}>
                        {ids.map((specialist_id) =>
                            <div className="my-1" key={specialist_id}>
                                {specialist_id !== 0 ?
                                    <>
                                        {itemViewType === "oneline" ?
                                            <Link title={`${data[specialist_id].name} doctors in ${city}`} href={data[specialist_id].seo_url} key={specialist_id} className={`flex gap-1 items-center border border-color-grey px-2 py-1 rounded-md h-16 bg-white`}>
                                                <img src={doctorSpecialityIcon(data[specialist_id].icon)} alt={data[specialist_id].name} className="rounded-full border h-10 w-10 p-1" />
                                                <span className="text-center">{data[specialist_id].name}</span>
                                            </Link> :
                                            <Link title={`${data[specialist_id].name} doctors in ${city}`} href={data[specialist_id].seo_url} key={specialist_id} className={`flex items-center flex-col pt-1 border border-color-grey rounded-md bg-white`}>
                                                <img src={doctorSpecialityIcon(data[specialist_id].icon)} alt={data[specialist_id].name} className="border rounded-full h-12 w-12 p-1" />
                                                <span className="mt-1 text-center h-10 px-1">{data[specialist_id].name}</span>
                                            </Link>
                                        }
                                    </> :
                                    <>
                                        {itemViewType === "oneline" ?
                                            <Link title="Find all specialists" href={alllCategoriesPageLink(state || "", city || "")} key={specialist_id} className={`flex gap-2 items-center border border-color-grey px-2 py-1 rounded-md h-16 bg-white`}>
                                                <span className="rounded-full border h-10 w-10 p-1 flex justify-center items-center">
                                                    <AiOutlineRight className="color-primary text-xl" />
                                                </span>
                                                <span className="font-semibold text-center">View All</span>
                                            </Link>
                                            :
                                            <Link title="Find all specialists" href={alllCategoriesPageLink(state || "", city || "")} className="flex flex-col items-center border border-color-grey rounded-md py-1 bg-white">
                                                <span className="rounded-full border h-10 w-10 p-1 bg-primary flex justify-center items-center">
                                                    <AiOutlineRight className="color-white text-xl" />
                                                </span>
                                                <span className="mt-1 text-center h-10 px-1">View All</span>
                                            </Link>
                                        }
                                    </>
                                }
                            </div>
                        )}
                    </div>
                )}
            </div>
        )
    }
    let chunks = array_chunk([...specialist_ids, 0], 2, [])
    return (
        <div className="flex overflow-auto gap-1 hide-scroll-bar px-2">
            {chunks.map((ids,i) =>
                <div key={`section-${i}`} className="shrink-0" style={{ width: "28%" }}>
                    {ids.map((specialist_id) =>
                        <div key={`${specialist_id}`}>
                            {specialist_id !== 0 ?
                                <Link title={`${data[specialist_id].name} doctors in ${city}`} href={data[specialist_id].seo_url} key={specialist_id} className="flex flex-col items-center">
                                    <img src={doctorSpecialityIcon(data[specialist_id].icon)} alt={data[specialist_id].name} className="rounded-full bg-white border h-12 w-12 p-1" />
                                    <span className="font-semibold mt-2 text-center">{data[specialist_id].name}</span>
                                </Link> :
                                <Link title="Find all specialists" href={alllCategoriesPageLink(state || "", city || "")} className="flex flex-col items-center">
                                    <span className="rounded-full border h-12 w-12 p-1 bg-primary flex justify-center items-center">
                                        <AiOutlineRight className="color-white text-xl" />
                                    </span>
                                    <span className="font-semibold mt-2 text-center">View All</span>
                                </Link>
                            }
                        </div>

                    )}
                </div>
            )}
        </div>
    )
    // return (<>
    //     <div className="grid grid-cols-4 gap-y-2 cp-section bg-white py-2">
    //         {specialist_ids.map((specialist_id) =>
    //             <Link href={data[specialist_id].seo_url} key={specialist_id} className="flex flex-col items-center">
    //                 <img src={doctorSpecialityIcon(data[specialist_id].icon)} alt={data[specialist_id].name} className="rounded-full border h-12 w-12 p-1" />
    //                 <span className="font-semibold mt-2 text-center">{data[specialist_id].name}</span>
    //             </Link>
    //         )}
    //         <Link href={alllCategoriesPageLink(state || "", city || "")} className="flex flex-col items-center">
    //             <span className="rounded-full border h-12 w-12 p-1 bg-primary flex justify-center items-center">
    //                 <AiOutlineRight className="color-white text-xl" />
    //             </span>
    //             <span className="font-semibold mt-2 text-center">View All</span>
    //         </Link>
    //     </div>
    // </>)
}
export default Specializations;