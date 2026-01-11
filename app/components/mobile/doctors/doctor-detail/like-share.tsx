'use client'
import { BiHeart, BiShareAlt, BiSolidHeart } from "react-icons/bi";
import useLikeShare from "@/lib/hooks/useLikeShare";
import { FormatTotalLiked } from "@/lib/helper/format-text";
const LikeShare = ({ url, doctor_name, position, clinic_name, service_charge, doctor_id, clinic_id, total_liked }: { url: string, total_liked?: number, doctor_name: string, position: string, clinic_name: string, service_charge: string, doctor_id: number, clinic_id: number }) => {
    const { onLikeClick, onShareClick, isLiked } = useLikeShare({ url, doctor_name, position, clinic_name, service_charge, doctor_id, clinic_id });
    return (
        <div className="flex gap-4 ml-auto">
            <BiShareAlt className="h-7 w-7 p-1 color-black" onClick={onShareClick} />
            {(isLiked) ?
                <span className={`border border-gray-300 flex items-center rounded-md ${total_liked ? 'pl-1' : ''}`} onClick={() => { onLikeClick(0) }}>
                    {total_liked ? <span className="text-sm color-black">{FormatTotalLiked(total_liked)}</span> : null}
                    <BiSolidHeart className="h-7 w-7 p-1 color-primary" />
                </span> :
                <span className={`border border-gray-300 flex items-center rounded-md ${total_liked ? 'pl-1' : ''}`} onClick={() => { onLikeClick(1) }}>
                    {total_liked ? <span className="text-sm color-black">{FormatTotalLiked(total_liked)}</span> : null}
                    <BiHeart className="h-7 w-7 p-1 color-primary" />
                </span>
            }
        </div>
    )
}
export default LikeShare;