import { FC } from "react";
import Link from "next/link";
import { AiOutlineRight } from "react-icons/ai";
import { TSpecility } from "@/lib/types/home-page";
import { doctorSpecialityIcon } from '@/lib/image';
const Specializations: FC<{ data: TSpecility[] }> = ({ data }) => {
    return (<>
        <div className="grid grid-cols-4 gap-y-2 cp-section bg-white py-2">
            {data.map((speciality) =>
                <div key={speciality.name} className="flex flex-col items-center">
                    <img src={doctorSpecialityIcon(speciality.icon)} alt={speciality.name} className="rounded-full border h-12 w-12 p-1" />
                    <span className="font-semibold mt-2 text-center">{speciality.name}</span>
                </div>
            )}
            <div className="flex flex-col items-center">
                <span className="rounded-full border h-12 w-12 p-1 bg-primary flex justify-center items-center">
                    <AiOutlineRight className="color-white text-xl"/>
                </span>
                <span className="font-semibold mt-2 text-center">View All</span>
            </div>
        </div>
    </>)
}
export default Specializations;