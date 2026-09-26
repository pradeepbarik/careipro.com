import Link from 'next/link';
import { TClinic, TClinicTopDoctor } from '@/lib/types/clinic';
import { clinicProfilePic, doctorProfilePic } from "@/lib/image";
import { formatDoctorName } from '@/lib/helper/format-text';
import PriceFormat from '@/app/components/mobile/ui/price-format';
import TrackedLink from '@/app/components/client-components/tracked-link';
import ClinicOpenStatus from './clinic-open-status';
import { ClinicDistance } from './nearby-distance';
import { BiPhone, BiChevronRight, BiSolidStar } from "react-icons/bi";
import { FaUserMd, FaMapMarkerAlt, FaHome, FaHandshake } from "react-icons/fa";

/* One clinic in a listing.

   Colours use the cyan scale because --primary-color is exactly cyan-600, so a tailwind
   cyan class and the brand colour are the same value. Class names .button, .badge and
   .chip are avoided throughout: globals.scss defines them below @tailwind utilities, so
   they beat equal specificity tailwind classes and quietly repaint anything using them.

   Only the two client components inside, the open status and the distance, read the
   clock or the visitor's position. Everything else is server rendered, because these
   listing pages are indexed. */

const CHIP_LIMIT = 5;

const RatingPill = ({ rating, count }: { rating: number, count: number | null }) => {
    return (
        <span className="flex items-center gap-1 text-nowrap">
            <span className="flex items-center gap-[2px] fs-12 font-bold text-white px-[6px] py-[1px] rounded"
                style={{ backgroundColor: rating >= 4 ? "#16a34a" : rating >= 3 ? "#ca8a04" : "#dc2626" }}>
                {rating.toFixed(1)}<BiSolidStar className="fs-12" />
            </span>
            {count ? <span className="fs-12 text-gray-500">{count} {count === 1 ? "review" : "reviews"}</span> : null}
        </span>
    )
}

/* Sample collection and brand tie ups only mean anything for a lab, and most clinics
   carry none of them, so the whole row disappears rather than leaving a gap. */
const LabTags = ({ clinic }: { clinic: TClinic }) => {
    const charge = Number(clinic.sample_home_collection_charge);
    const brand = (clinic.partner_with || "").trim();
    const discount = (clinic.discount_msg || "").trim();
    if (clinic.sample_home_collection !== 1 && !brand && !discount) {
        return <></>
    }
    return (
        <div className="flex flex-wrap gap-1 mt-2">
            {clinic.sample_home_collection === 1 &&
                <span className="flex items-center gap-1 fs-12 font-semibold px-2 py-[2px] rounded-full text-nowrap"
                    style={{ backgroundColor: "rgba(12,151,12,.08)", color: "#0c970c" }}>
                    <FaHome className="shrink-0" />
                    {charge > 0 ? <>Home collection <PriceFormat amount={charge} symbol={true} /></> : "Free home collection"}
                </span>
            }
            {brand &&
                <span className="flex items-center gap-1 fs-12 font-semibold px-2 py-[2px] rounded-full bg-blue-50 text-blue-800 border border-blue-100 text-nowrap">
                    <FaHandshake className="shrink-0" />{brand}
                </span>
            }
            {discount &&
                <span className="fs-12 font-semibold px-2 py-[2px] rounded-full bg-amber-50 text-amber-800 border border-amber-100">
                    {discount}
                </span>
            }
        </div>
    )
}

const TopDoctors = ({ doctors }: { doctors: TClinicTopDoctor[] }) => {
    if (doctors.length === 0) {
        return <></>
    }
    return (
        <div className="flex gap-2 overflow-auto hide-scroll-bar px-3 pb-3">
            {doctors.map((doctor) =>
                <Link key={`doctor-${doctor.id}`} href={doctor.seo_url}
                    className="flex items-center gap-2 shrink-0 border border-gray-100 bg-gray-50 rounded-lg p-2"
                    style={{ width: "62%" }}>
                    <img src={doctorProfilePic(doctor.image || "")} alt={doctor.name}
                        className="h-9 w-9 rounded-full object-cover shrink-0 bg-white" />
                    <span className="flex flex-col min-w-0">
                        <span className="one-line fs-13 font-semibold text-gray-900">{formatDoctorName(doctor.short_name || doctor.name)}</span>
                        <span className="one-line fs-12 text-gray-500">{doctor.position}</span>
                    </span>
                </Link>
            )}
        </div>
    )
}

const ClinicCard = ({ clinic, topDoctors }: { clinic: TClinic, topDoctors: TClinicTopDoctor[] }) => {
    const extraSpecialists = clinic.doctor_specializations.length - CHIP_LIMIT;
    const phone = clinic.mobile || clinic.alt_mob_no;

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-3 overflow-hidden">
            {/* the whole identity block is the link, not just the name, so the card behaves
                the way a card looks like it should behave */}
            <Link href={clinic.seo_url} className="flex gap-3 p-3">
                <img src={clinicProfilePic(clinic.logo)} alt={clinic.name}
                    className="h-16 w-16 rounded-lg object-cover shrink-0 border border-gray-100" />
                <div className="flex flex-col min-w-0 grow">
                    <div className="flex items-start gap-2">
                        <span className="fs-16 font-bold text-gray-900 leading-tight grow">{clinic.name}</span>
                        <ClinicOpenStatus timing={clinic.timing} />
                    </div>
                    <span className="flex items-center gap-1 fs-13 text-gray-500 mt-1">
                        <FaMapMarkerAlt className="shrink-0 text-gray-400" />
                        <span className="one-line">{clinic.locality}, {clinic.market_name}</span>
                        <ClinicDistance lat={clinic.location_lat} lng={clinic.location_lng} />
                    </span>
                    {clinic.avg_rating ?
                        <div className="mt-1">
                            <RatingPill rating={clinic.avg_rating} count={clinic.rating_cnt} />
                        </div>
                        : null}
                    
                    {clinic.doctors_count > 0 &&
                        <span className="flex items-center gap-1 fs-13 text-gray-700 font-medium mt-1">
                            <FaUserMd className="shrink-0 text-cyan-700" />
                            {clinic.doctors_count} {clinic.doctors_count === 1 ? "Doctor" : "Doctors"}
                        </span>
                    }
                    <LabTags clinic={clinic} />
                </div>
            </Link>

            {clinic.doctor_specializations.length > 0 &&
                <div className="flex flex-wrap gap-1 px-3 pb-3">
                    {clinic.doctor_specializations.slice(0, CHIP_LIMIT).map((specialist, i) =>
                        <span key={`spl-${i}`} className="fs-12 px-2 py-[2px] rounded-full bg-cyan-50 text-cyan-800 border border-cyan-100">
                            {specialist}
                        </span>
                    )}
                    {extraSpecialists > 0 &&
                        <span className="fs-12 px-2 py-[2px] rounded-full bg-gray-50 text-gray-600 border border-gray-200">
                            +{extraSpecialists} more
                        </span>
                    }
                </div>
            }

            <TopDoctors doctors={topDoctors} />

            <div className="flex gap-2 border-t border-gray-100 p-2">
                {phone &&
                    <TrackedLink href={`tel:${phone}`} ev_nm="call_click" section_name="clinic_list"
                        className="flex items-center justify-center gap-1 grow basis-0 py-2 rounded-lg fs-13 font-semibold border border-cyan-600 text-cyan-700">
                        <BiPhone />Call
                    </TrackedLink>
                }
                {/* inline background: .button and friends in globals.scss would override a
                    tailwind bg here, and this needs to stay the brand cyan */}
                <Link href={clinic.seo_url}
                    className="flex items-center justify-center gap-1 grow basis-0 py-2 rounded-lg fs-13 font-semibold text-white"
                    style={{ backgroundColor: "rgb(8,145,178)" }}>
                    View details<BiChevronRight />
                </Link>
            </div>
        </div>
    )
}
export default ClinicCard;
