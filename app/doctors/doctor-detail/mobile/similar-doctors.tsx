import { TSimilarDoctor } from "@/lib/types/doctor";
import Link from "next/link";
import { doctorDetailPageUrl } from "@/lib/helper/link";
import { doctorProfilePic } from "@/lib/image";
import { textTruncate, FormatTotalLiked, formatRating } from "@/lib/helper/format-text";
import { BiStar, BiLike, BiChevronRight } from 'react-icons/bi';

const SimilarBusieness = ({ heading, similar_doctors }: { heading: string, similar_doctors: Array<TSimilarDoctor> }) => {
    return (
        <>
            <div className="flex items-center justify-between px-2 pt-4 pb-1">
                <h2 className="font-bold text-base text-gray-800">{heading}</h2>
            </div>
            <div className="flex overflow-auto gap-3 px-2 pb-3 hide-scroll-bar">
                {similar_doctors.map((doctor) => (
                    <Link
                        key={doctor.doctor_id}
                        title={doctor.doctor_name}
                        href={doctorDetailPageUrl({
                            seo_url: doctor.doctor_seo_url,
                            doctor_id: doctor.doctor_id,
                            service_loc_id: doctor.service_location_id,
                            clinic_id: doctor.clinic_id,
                            city: doctor.city,
                            market_name: doctor.market_name,
                            state: doctor.state,
                            type: doctor.business_type
                        })}
                        className="shrink-0 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden flex flex-col"
                        style={{ width: "62%" }}
                    >
                        <div className="h-1 bg-gradient-to-r from-cyan-400 to-cyan-600" />
                        <div className="flex gap-3 px-3 pt-3 pb-2 items-center">
                            <img
                                src={doctorProfilePic(doctor.doctor_profile_pic || "")}
                                alt={doctor.doctor_name}
                                className="w-14 h-14 rounded-full border-2 border-cyan-100 shrink-0 object-cover"
                            />
                            <div className="flex flex-col min-w-0">
                                <h3 className="font-semibold text-sm text-gray-900 truncate">{doctor.doctor_name}</h3>
                                <p className="text-xs text-gray-500 mt-0.5 truncate">{textTruncate(doctor.position, 30)}</p>
                                <div className="flex flex-wrap items-center gap-1 mt-1.5">
                                    {doctor.experience ? (
                                        <span className="text-xs bg-gray-100 rounded-md px-1.5 py-0.5 text-gray-600 font-medium">
                                            {doctor.experience} yrs
                                        </span>
                                    ) : null}
                                    {doctor.rating && doctor.rating !== "0.00" ? (
                                        <span className="text-xs bg-yellow-50 border border-yellow-200 rounded-md px-1.5 py-0.5 flex items-center gap-0.5 text-yellow-700 font-medium">
                                            <BiStar className="text-yellow-500 shrink-0" />
                                            {formatRating(doctor.rating)}
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        {doctor.total_liked > 10 && (
                            <div className="px-3 pb-1 flex items-center gap-1 text-xs text-gray-400">
                                <BiLike className="color-primary shrink-0" />
                                <span>{FormatTotalLiked(doctor.total_liked)} Likes</span>
                            </div>
                        )}
                        <div className="px-3 py-2 mt-auto">
                            <span className="block text-center border-2 border-cyan-500 color-primary text-sm font-semibold py-1.5 rounded-lg">
                                Book Now
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};
export default SimilarBusieness;
