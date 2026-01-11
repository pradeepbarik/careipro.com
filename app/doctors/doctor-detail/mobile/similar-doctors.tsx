import { TSimilarDoctor } from "@/lib/types/doctor";
import { SectionHeading } from "@/app/components/mobile/ui";
import Link from "next/link";
import { doctorDetailPageUrl } from "@/lib/helper/link";
import { doctorProfilePic } from "@/lib/image";
import { textTruncate, FormatTotalLiked, formatRating } from "@/lib/helper/format-text";
import { BiLike, BiStar } from 'react-icons/bi';
const SimilarBusieness = ({ heading, similar_doctors }: { heading: string, similar_doctors: Array<TSimilarDoctor> }) => {
    return (
        <>
            <SectionHeading heading={heading} />
            <div className="flex overflow-auto gap-4 px-2">
                {similar_doctors.map((doctor) => (
                    <div key={doctor.doctor_id} className="border rounded-lg shadow hover:shadow-lg transition duration-300 shrink-0" style={{ width: "70%" }}>
                        <Link title={doctor.doctor_name} href={doctorDetailPageUrl({
                            seo_url: doctor.doctor_seo_url,
                            doctor_id: doctor.doctor_id,
                            service_loc_id: doctor.service_location_id,
                            clinic_id: doctor.clinic_id,
                            city: doctor.city,
                            market_name: doctor.market_name,
                            state: doctor.state
                        })} className="flex gap-2">
                            <div className="w-16 shrink-0">
                                <img src={doctorProfilePic(doctor.doctor_profile_pic || "")} alt={doctor.doctor_name} className="w-16 h-16 rounded-full shrink-0" />
                            </div>
                            <div className="py-1 pr-2 grow">
                                <h3 className="font-semibold fs-15 flex">
                                    {doctor.doctor_name}
                                </h3>
                                <p className="text-sm text-gray-600" title={doctor.position}>{textTruncate(doctor.position, 40)}</p>
                                <p className="text-sm text-gray-600">{doctor.experience} yrs exp</p>
                                <div className="flex">
                                    {doctor.rating && doctor.rating != "0.00"?
                                        <span className="border rounded-md flex items-center gap-1 px-1">
                                            <BiStar className="inline-block color-primary" />
                                            {formatRating(doctor.rating)}
                                        </span> : <></>
                                    }
                                    {doctor.total_liked > 10 ?
                                        <span className="ml-auto flex gap-1 items-center">
                                            <BiLike className="inline-block color-primary" />
                                            <span>{FormatTotalLiked(doctor.total_liked || 10)}</span>
                                            <span>Likes</span>
                                        </span>
                                        : <></>}
                                </div>
                            </div>
                        </Link>
                    </div >
                ))}
            </div >
        </>
    )
};
export default SimilarBusieness;