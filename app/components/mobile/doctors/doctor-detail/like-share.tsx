'use client'
import { formatCurrency } from "@/lib/helper/format-text";
import { BiHeart, BiShareAlt } from "react-icons/bi";

const LikeShare = ({url,doctor_name,position,clinic_name,service_charge}:{url:string,doctor_name:string,position:string,clinic_name:string,service_charge:string}) => {
   
    const onLikeClick = () => {
    
   }
    const onShareClick = async () => {
     const shareData = {
            title: `Dr. ${doctor_name} - ${position} at ${clinic_name}`,
            text: `Book appointment with Dr. ${doctor_name} - ${position} at ${clinic_name}. Consultaion Fee : ${formatCurrency(parseInt(service_charge))}. Find more doctors at careipro.com`,
            url: url,
        };
        try {
            await navigator.share(shareData);
            console.log("shared successfully")
        } catch (err) {
            console.log("shared failed", err)
        }
   }
    return (
        <div className="flex gap-2 ml-auto">
                        <BiHeart className="h-7 w-7 p-1 color-black"  />
                        <BiShareAlt className="h-7 w-7 p-1 color-black" onClick={onShareClick} />
                    </div>
    )
}
export default LikeShare;