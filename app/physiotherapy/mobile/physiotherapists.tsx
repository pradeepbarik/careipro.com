import Link from "next/link";
import { BiSolidMap, BiClinic, BiPhone, BiHomeHeart } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { TPhysioTherapistInfo } from "@/lib/hooks/physiotherapy/usePhysiotherapy";
import { doctorProfilePic } from "@/lib/image";
const Physiotherapists = ({ data, doctor_ids }: { data: Record<string, TPhysioTherapistInfo>, doctor_ids: number[] }) => {
    //doctors are cached once per page and referenced by the section through doctor_ids
    const physiotherapists = doctor_ids.flatMap((doctor_id) => data[doctor_id] || []);
    return (
        <div className="px-2">
            {physiotherapists.map((physiotherapist) => {
                const rating = parseFloat(physiotherapist.rating);
                return (
                    <div key={physiotherapist.service_location_id} className="bg-white border rounded-md shadow-md mb-2 click" data-href={physiotherapist.seo_url}>
                        <div className="flex gap-3 p-2">
                            <img alt={"Profile picture of " + physiotherapist.name} src={physiotherapist.image || doctorProfilePic("")} className="h-20 w-20 rounded-md object-cover shrink-0" />
                            <div className="flex flex-col grow min-w-0">
                                <span className="flex items-center gap-2">
                                    <Link href={physiotherapist.seo_url} className="font-bold fs-16 color-primary text one-line">{physiotherapist.name}</Link>
                                    {rating > 0 &&
                                        <span className="flex items-center gap-1 text-xs font-semibold bg-green-50 text-green-700 px-1.5 py-[1px] rounded ml-auto shrink-0">
                                            <FaStar />{rating}
                                        </span>
                                    }
                                </span>
                                {physiotherapist.qualification_disp && <span className="text one-line">{physiotherapist.qualification_disp}</span>}
                                <span className="flex items-center gap-2 text-sm text-gray-600">
                                    {physiotherapist.position && <span>{physiotherapist.position}</span>}
                                    {physiotherapist.position && physiotherapist.experience > 0 && <span>&bull;</span>}
                                    {physiotherapist.experience > 0 && <span>EXP: {physiotherapist.experience} Yrs</span>}
                                </span>
                                {physiotherapist.home_visit == 1 &&
                                    <span className="flex items-center gap-1 w-fit mt-1 text-xs font-semibold text-cyan-700 bg-cyan-50 border border-cyan-200 rounded px-1.5 py-[2px]">
                                        <BiHomeHeart className="fs-16" />Home Visit Available
                                    </span>
                                }
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-1 px-2">
                            {(physiotherapist.specialists || []).slice(0, 3).map((specialist) =>
                                <span className="chip" key={specialist}>{specialist}</span>
                            )}
                        </div>
                        <div className="flex items-center gap-2 px-2 mt-2">
                            <div className="flex flex-col leading-5 min-w-0">
                                <span className="font-semibold flex items-center gap-1">
                                    <BiClinic className="color-primary shrink-0" />
                                    <span className="text one-line">{physiotherapist.clinic}</span>
                                </span>
                                <span className="flex items-center gap-1">
                                    <BiSolidMap className="color-primary shrink-0" />
                                    <span className="text one-line">{[physiotherapist.place, physiotherapist.city].filter(Boolean).join(", ")}</span>
                                </span>
                            </div>
                            {physiotherapist.service_charge > 0 &&
                                <span className="flex flex-col items-end leading-4 ml-auto shrink-0">
                                    <span className="text-xs text-gray-500">Fee</span>
                                    <b className="fs-16">&#8377;{physiotherapist.service_charge}</b>
                                </span>
                            }
                        </div>
                        <div className="flex gap-2 p-2">
                            {physiotherapist.contact_no &&
                                <a href={`tel:${physiotherapist.contact_no}`} className="button grow flex-1 items-center gap-1" data-variant="outlined">
                                    <BiPhone />Call Now
                                </a>
                            }
                            <Link href={physiotherapist.seo_url} className="button flex-1">Book Appointment</Link>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default Physiotherapists;
