'use client'
import { BiHeart, BiShareAlt,BiSolidHeart } from "react-icons/bi";
import useLikeShare from "@/lib/hooks/useLikeShare";
const LikeShare = ({ url, doctor_name, position, clinic_name, service_charge, doctor_id, clinic_id }: { url: string, doctor_name: string, position: string, clinic_name: string, service_charge: string, doctor_id: number, clinic_id: number }) => {
    const { onLikeClick, onShareClick,isLiked } = useLikeShare({ url, doctor_name, position, clinic_name, service_charge, doctor_id, clinic_id });
    return (
        <div className="flex gap-2 ml-auto">
            {isLiked ?
            <BiSolidHeart className="h-7 w-7 p-1 color-primary" onClick={()=>{onLikeClick(0)}}/>:
            <BiHeart className="h-7 w-7 p-1 color-primary" onClick={()=>{onLikeClick(1)}} />}
            <BiShareAlt className="h-7 w-7 p-1 color-black" onClick={onShareClick} />
        </div>
    )
}
export default LikeShare;