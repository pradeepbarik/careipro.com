import Link from "next/link";
import { BiPhone, BiChevronRight, BiSolidStar } from "react-icons/bi";
import { FaUserMd, FaMapMarkerAlt, FaHome, FaHandshake } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { TClinic, TClinicTopDoctor } from "@/lib/types/clinic";
import { clinicProfilePic, doctorProfilePic } from "@/lib/image";
import { formatDoctorName, capitalizeFirstLetter } from "@/lib/helper/format-text";
import PriceFormat from "@/app/components/mobile/ui/price-format";
import TrackedLink from "@/app/components/client-components/tracked-link";
import ClinicOpenStatus from "@/app/components/mobile/clinics/card-v2/clinic-open-status";
import { ClinicDistance } from "@/app/components/mobile/clinics/card-v2/nearby-distance";

/**
 * One clinic on the desktop listing. The mobile card stacks everything the visitor compares; here
 * the width lets identity sit on the left and the decision column, the doctors who sit there and the
 * two actions, sit on the right, so the eye runs down one edge across the whole list.
 *
 * Only the open status and the distance are client components, for the clock and the visitor's
 * position. The rest is server rendered because this page is indexed.
 */

const CHIP_LIMIT = 6;
const TOP_DOCTOR_LIMIT = 3;

const RatingPill = ({ rating, count }: { rating: number, count: number | null }) => (
    <span className="flex items-center gap-1 text-nowrap">
        <span
            className="flex items-center gap-[2px] fs-12 font-bold text-white px-[6px] py-[1px] rounded"
            style={{ backgroundColor: rating >= 4 ? "#16a34a" : rating >= 3 ? "#ca8a04" : "#dc2626" }}
        >
            {rating.toFixed(1)}<BiSolidStar className="fs-12" />
        </span>
        {count ? <span className="fs-12 text-gray-500">{count} {count === 1 ? "review" : "reviews"}</span> : null}
    </span>
);

/* home collection and brand tie ups only mean anything for a lab, and most clinics carry none of
   them, so the whole row disappears rather than leaving a gap */
const LabTags = ({ clinic }: { clinic: TClinic }) => {
    const charge = Number(clinic.sample_home_collection_charge);
    const brand = (clinic.partner_with || "").trim();
    const discount = (clinic.discount_msg || "").trim();
    if (clinic.sample_home_collection !== 1 && !brand && !discount) return <></>;
    return (
        <div className="flex flex-wrap gap-1.5 mt-2">
            {clinic.sample_home_collection === 1 && (
                <span
                    className="flex items-center gap-1 fs-12 font-semibold px-2 py-[2px] rounded-full text-nowrap"
                    style={{ backgroundColor: "rgba(12,151,12,.08)", color: "#0c970c" }}
                >
                    <FaHome className="shrink-0" />
                    {charge > 0 ? <>Home collection <PriceFormat amount={charge} symbol={true} /></> : "Free home collection"}
                </span>
            )}
            {brand && (
                <span className="flex items-center gap-1 fs-12 font-semibold px-2 py-[2px] rounded-full bg-blue-50 text-blue-800 border border-blue-100 text-nowrap">
                    <FaHandshake className="shrink-0" />{brand}
                </span>
            )}
            {discount && (
                <span className="fs-12 font-semibold px-2 py-[2px] rounded-full bg-amber-50 text-amber-800 border border-amber-100">
                    {discount}
                </span>
            )}
        </div>
    );
};

const ClinicCard = ({ clinic, topDoctors }: { clinic: TClinic, topDoctors: TClinicTopDoctor[] }) => {
    const phone = clinic.mobile || clinic.alt_mob_no;
    const specializations = clinic.doctor_specializations || [];
    const extraSpecialists = specializations.length - CHIP_LIMIT;
    const shownDoctors = topDoctors.slice(0, TOP_DOCTOR_LIMIT);

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg hover:border-primary/40 transition-all">
            <div className="flex gap-4">
                <div className="flex-1 min-w-0">
                    {/* the identity block is one link, so the card behaves the way a card looks like
                        it should behave */}
                    <Link href={clinic.seo_url} title={clinic.name} className="group flex gap-3">
                        <img
                            src={clinicProfilePic(clinic.logo)}
                            alt={clinic.name}
                            className="h-20 w-20 rounded-lg object-cover shrink-0 border border-gray-100"
                        />
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <h3 className="fs-17 font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors">
                                    {clinic.name}
                                </h3>
                                {clinic.is_prime === 1 && <MdVerified className="text-blue-500 shrink-0" title="Verified clinic" />}
                                <ClinicOpenStatus timing={clinic.timing} />
                            </div>
                            <span className="flex items-center gap-1 fs-13 text-gray-500 mt-1">
                                <FaMapMarkerAlt className="shrink-0 text-gray-400" />
                                <span className="truncate">
                                    {[clinic.locality, clinic.market_name].filter(Boolean).map((part) => capitalizeFirstLetter(part)).join(", ")}
                                </span>
                                <ClinicDistance lat={clinic.location_lat} lng={clinic.location_lng} />
                            </span>
                            {clinic.avg_rating ? (
                                <div className="mt-1.5"><RatingPill rating={clinic.avg_rating} count={clinic.rating_cnt} /></div>
                            ) : null}
                            {clinic.tag_line && <p className="fs-13 text-gray-500 mt-1 line-clamp-1">{clinic.tag_line}</p>}
                        </div>
                    </Link>

                    {specializations.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                            {specializations.slice(0, CHIP_LIMIT).map((specialist, i) => (
                                <span key={`spl-${i}`} className="fs-12 px-2 py-[2px] rounded-full bg-primary/5 text-primary border border-primary/20">
                                    {specialist}
                                </span>
                            ))}
                            {extraSpecialists > 0 && (
                                <span className="fs-12 px-2 py-[2px] rounded-full bg-gray-50 text-gray-600 border border-gray-200">
                                    +{extraSpecialists} more
                                </span>
                            )}
                        </div>
                    )}

                    <LabTags clinic={clinic} />
                </div>

                {/* who sits here and what to do about it, pinned right and the same width on every
                    card so the actions line up down the list */}
                <div className="w-60 shrink-0 border-l border-gray-100 pl-4 flex flex-col">
                    {clinic.doctors_count > 0 && (
                        <span className="flex items-center gap-1.5 fs-13 font-semibold text-gray-700">
                            <FaUserMd className="text-primary shrink-0" />
                            {clinic.doctors_count} {clinic.doctors_count === 1 ? "Doctor" : "Doctors"}
                        </span>
                    )}

                    {shownDoctors.length > 0 && (
                        <div className="flex flex-col gap-1.5 mt-2">
                            {shownDoctors.map((doctor) => (
                                <Link
                                    key={`doctor-${doctor.id}`}
                                    href={doctor.seo_url}
                                    title={doctor.name}
                                    className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 p-1.5 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                                >
                                    <img
                                        src={doctorProfilePic(doctor.image || "")}
                                        alt={doctor.name}
                                        className="h-8 w-8 rounded-full object-cover shrink-0 bg-white"
                                    />
                                    <span className="flex flex-col min-w-0">
                                        <span className="one-line fs-12 font-semibold text-gray-900">
                                            {formatDoctorName(doctor.short_name || doctor.name)}
                                        </span>
                                        <span className="one-line fs-12 text-gray-500">{doctor.position}</span>
                                    </span>
                                </Link>
                            ))}
                        </div>
                    )}

                    <div className="flex gap-2 mt-auto pt-3">
                        {phone && (
                            <TrackedLink
                                href={`tel:${phone}`}
                                ev_nm="call_click"
                                section_name="clinic_list"
                                className="flex items-center justify-center gap-1 grow basis-0 py-2 rounded-lg fs-13 font-semibold border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                            >
                                <BiPhone />Call
                            </TrackedLink>
                        )}
                        <Link
                            href={clinic.seo_url}
                            title={`${clinic.name} details`}
                            className="flex items-center justify-center gap-1 grow basis-0 py-2 rounded-lg fs-13 font-semibold bg-primary text-white hover:opacity-90 transition-opacity"
                        >
                            View details<BiChevronRight />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClinicCard;
