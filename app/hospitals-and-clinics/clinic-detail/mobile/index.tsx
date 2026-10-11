import { TclinicDetail } from "@/lib/hooks/useClinics";
import Link from "next/link";
import TrackedLink from "@/app/components/client-components/tracked-link";
import ReportIssue from "@/app/components/client-components/report-issue";
import { hasCoordinates } from "@/lib/helper/distance";
import { getOpenStatus, TClinicTiming } from "@/lib/helper/clinic-timing";
import {doctorDetailPageUrl} from "@/lib/helper/link";
import { doctorProfilePic } from "@/lib/image";
import { facilityIcon } from "@/lib/constants/facilities";
import {formatDoctorName, capitalizeEachWordFirstLetter} from "@/lib/helper/format-text";
import PriceFormat from "@/app/components/mobile/ui/price-format";
import { IconType } from "react-icons";
import {BiPhone, BiMap, BiCheckShield, BiChevronRight, BiSupport, BiErrorCircle} from "react-icons/bi";
import SendEnquiry from "./send-enquiry";
import PublicListingBadge from "./public-listing-badge";
import ShareButton from "./share-button";
import {BsWhatsapp} from "react-icons/bs";
import {FaUserMd, FaHandshake, FaHome} from "react-icons/fa";

/* The pieces the clinic detail page is built from, shared by the mobile layout in ../mobile-v2
   and the desktop one in ../desktop. This file held a mobile page of its own until mobile-v2
   replaced it; only the components remain.

   Colours use the cyan scale because --primary-color is exactly cyan-600, so a tailwind cyan
   class and the brand colour are the same value.

   Stacking rule: any page chrome that floats over content stays at z-[5]. SlideUpModal portals
   its overlay at 10 and its sheet at 12, so keeping chrome below 10 means a sheet, including one
   opened from inside another, covers the page without its caller passing a zIndex. */

export const SectionCard = ({ id, title, action, headerRight, children }: {
    id?: string, title: string, action?: string,
    /* anything that belongs beside the heading but is not a view all link */
    headerRight?: React.ReactNode,
    children: React.ReactNode
}) => {
    return (
        <section id={id} className="bg-white rounded-xl mx-3 mt-3 p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
                <h2 className="fs-16 font-bold text-gray-900 shrink-0">{title}</h2>
                {headerRight && <span className="ml-auto">{headerRight}</span>}
                {action && <span className="ml-auto fs-13 font-semibold text-cyan-700 flex items-center">{action}<BiChevronRight /></span>}
            </div>
            {children}
        </section>
    )
}

type TQuickAction = {
    key: string,
    label: string,
    icon: IconType,
    href: string,
    ev_nm: string,
    newTab: boolean,
    tile: string,
    tint: string,
}
/* showShare adds a share tile alongside the contact ones. off by default because the mobile page
   already floats a share control over the hero, and two on one screen is one too many. */
export const QuickActions = ({ info, showShare = false }: { info: TclinicDetail["clinic_info"], showShare?: boolean }) => {
    const actions: TQuickAction[] = [];
    if (info.mobile) {
        actions.push({
            key: "call", label: "Call", icon: BiPhone, href: `tel:${info.mobile}`,
            ev_nm: "call_click", newTab: false,
            tile: "bg-cyan-50 border-cyan-100", tint: "text-cyan-700"
        });
    }
    if (info.whatsapp_number) {
        actions.push({
            key: "whatsapp", label: "WhatsApp", icon: BsWhatsapp,
            href: `https://wa.me/${info.whatsapp_number}?text=${encodeURI("Hi,I found your clinic on careipro")}`,
            ev_nm: "whatsapp_click", newTab: true,
            tile: "bg-green-50 border-green-100", tint: "text-green-700"
        });
    }
    if (hasCoordinates({ lat: info.location_lat, lng: info.location_lng })) {
        actions.push({
            key: "directions", label: "Directions", icon: BiMap,
            href: `https://www.google.com/maps/dir/?api=1&destination=${info.location_lat},${info.location_lng}`,
            ev_nm: "direction_click", newTab: true,
            tile: "bg-gray-50 border-gray-200", tint: "text-gray-700"
        });
    }
    const tileCount = actions.length + (showShare ? 1 : 0);
    if (tileCount === 0) {
        return <></>
    }
    return (
        <div className="grid gap-2 mt-4" style={{ gridTemplateColumns: `repeat(${tileCount}, minmax(0,1fr))` }}>
            {actions.map((action) =>
                <TrackedLink key={action.key} href={action.href} ev_nm={action.ev_nm} section_name="quick_actions"
                    target={action.newTab ? "_blank" : undefined}
                    className={`flex flex-col items-center gap-1 py-2 rounded-lg border ${action.tile}`}>
                    <action.icon className={`${action.tint} fs-18`} />
                    <span className={`fs-12 font-semibold ${action.tint}`}>{action.label}</span>
                </TrackedLink>
            )}
            {showShare &&
                /* not a TrackedLink, sharing is a browser action rather than a link to follow */
                <ShareButton name={info.name}
                    className="flex flex-col items-center gap-1 py-2 rounded-lg border bg-gray-50 border-gray-200 w-full"
                    iconClassName="fs-18 text-gray-700">
                    <span className="fs-12 font-semibold text-gray-700">Share</span>
                </ShareButton>
            }
        </div>
    )
}

/* Sits beside the Tests & Scans heading, so it is kept short. The full wording would
   crowd the heading on a narrow phone. */
export const HomeCollectionTag = ({ info }: { info: TclinicDetail["clinic_info"] }) => {
    if (info.sample_home_collection !== 1) {
        return <></>
    }
    const charge = Number(info.sample_home_collection_charge);
    return (
        <span className="flex items-center gap-1 fs-12 font-semibold px-2 py-[2px] rounded-full text-nowrap"
            style={{ backgroundColor: "rgba(12,151,12,.08)", color: "#0c970c" }}>
            <FaHome className="shrink-0" />
            {charge > 0 ?
                <>Home collection <PriceFormat amount={charge} symbol={true} /></>
                : "Free home collection"}
        </span>
    )
}
/* Who the lab collects samples for, shown above its test list */
export const LabServiceNotes = ({ info }: { info: TclinicDetail["clinic_info"] }) => {
    const brand = (info.partner_with || "").trim();
    if (!brand) {
        return <></>
    }
    return (
        <span className="flex items-center gap-2 fs-13 font-semibold px-2 py-1 mb-3 rounded-md bg-blue-50 text-blue-800 border border-blue-100">
            <FaHandshake className="shrink-0" />In partnership with {brand}
        </span>
    )
}

/* One tile per specialisation the clinic offers, used by both Tests & Scans and
   Treatments. The category icon is usually blank in the data, so it falls back to the
   same per vertical default the current clinic page uses. */
export const CategoryTile = ({ category, fallbackIcon }: {
    category: TclinicDetail["specializations"][string][number],
    fallbackIcon: string
}) => {
    const price = Number(category.service_price);
    /* not linked on purpose: these say what this clinic offers, and a link would take
       the patient away to a listing of other clinics */
    return (
        <span className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 bg-gray-50">
            <span className="h-9 w-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0 overflow-hidden">
                <img src={category.icon || fallbackIcon} alt="" className="h-7 w-7 object-contain" />
            </span>
            <span className="flex flex-col min-w-0">
                <span className="fs-13 font-semibold text-gray-900 leading-4">{(category.name || "").trim()}</span>
                {price > 0 ?
                    <span className="fs-12 text-gray-500">from <PriceFormat amount={price} symbol={true} /></span>
                    : category.service_price_display ?
                        <span className="fs-12 text-gray-500">{category.service_price_display}</span>
                        : <></>
                }
            </span>
        </span>
    )
}

/* Escalation path when the clinic itself is not responding. The crm is careipro's own
   person for this clinic, not clinic staff, so the wording and the indigo tint keep it
   visibly separate from the clinic's own cyan contact actions above. */
/* Businesses are either partnered with careipro or listed from publicly available
   information. Anything without an explicit 'partnered' value is treated as a public
   listing, so a missing field can never imply a partnership that does not exist. */
const isPartnered = (partnerType: string | null) => partnerType === "partnered";
export const ListingTypeBadge = ({ partnerType }: { partnerType: string | null }) => {
    if (isPartnered(partnerType)) {
        return (
            <span className="flex items-center gap-1 fs-12 font-semibold px-2 py-[2px] rounded-full bg-green-50 text-green-700 border border-green-200">
                <BiCheckShield />Careipro Partner
            </span>
        )
    }
    /* non partners explain themselves in a sheet opened from the badge, rather than
       spending a card on it in the page */
    return <PublicListingBadge />
}
/* Only a partner gets a note in the page. It carries a promise, so it also carries the
   way to hold careipro to it. */
export const ListingTypeNote = ({ info }: { info: TclinicDetail["clinic_info"] }) => {
    if (!isPartnered(info.partner_type)) {
        return <></>
    }
    return (
        <section className="bg-green-50 rounded-xl mx-3 mt-3 p-4 border border-green-200">
            <div className="flex items-start gap-3">
                <FaHandshake className="text-green-700 shrink-0" style={{ fontSize: "1.5rem" }} />
                <div className="flex flex-col grow min-w-0">
                    <h2 className="fs-14 font-bold text-green-900">Careipro assured</h2>
                    <span className="fs-13 text-green-800 leading-5 mt-1">
                        You will get best service in this clinic.
                    </span>
                    {/* the promise above is only credible with a way to hold it to account,
                            and this lands in the same enquiry queue careipro's team works from */}
                    <SendEnquiry businessType={info.business_type} state={info.state || ""}
                        city={info.city} clini_id={info.id}
                        variant="button" label="Report an issue" section="report_issue"
                        placeholder="Tell us what went wrong at this clinic..."
                        className="flex items-center gap-1 mt-2 self-start fs-13 font-semibold text-green-800 underline underline-offset-2">
                        <BiErrorCircle />
                    </SendEnquiry>
                </div>
            </div>
        </section>
    )
}

export const CareiproSupport = ({ info, citySettings }: {
    info: TclinicDetail["clinic_info"],
    citySettings: TclinicDetail["city_settings"]
}) => {
    const clean = (value: string | null | undefined) => (value || "").trim();
    /* The clinic's own crm, with no city fallback: city_manager_* is careipro's internal
       contact for the city and is not for patients. Only the city's patient support line
       stands in when the clinic has none. */
    const crm = clean(info.crm_contact_number);
    const usesClinicSupport = Boolean(clean(info.patient_support_contact_no));
    const support = clean(info.patient_support_contact_no) || clean(citySettings?.patient_support_contact_no);
    const supportStaff = usesClinicSupport ? "" : clean(citySettings?.patient_support_staff_name);
    const supportTiming = usesClinicSupport ? "" : clean(citySettings?.support_time_message);
    if (!crm && !support) {
        return <></>
    }
    /* names are entered free form in the admin, so normalise the casing before they are
       put in front of a patient */
    const crmName = capitalizeEachWordFirstLetter(clean(info.crm_name));
    //free form in the admin too, so it gets the same normalising before it goes into a sentence
    const businessName = capitalizeEachWordFirstLetter(clean(info.name));
    const namedHelper = Boolean(crm && crmName);
    /* nobody named on the clinic side, so the city's support staff fronts the message */
    const helperName = namedHelper ? crmName : capitalizeEachWordFirstLetter(supportStaff);
    return (
        <section className="bg-white rounded-xl mx-3 mt-3 p-4 shadow-sm border border-indigo-100">
            <div className="flex items-start gap-3">
                <span className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                    <BiSupport className="text-indigo-600 fs-20" />
                </span>
                <div className="flex flex-col grow min-w-0">
                    {/* "the clinic" is wrong for an ambulance service, a pharmacy or a caretaker,
                        so the business speaks for itself here */}
                    <h2 className="fs-16 font-bold text-gray-900 leading-5">
                        Not able to connect with {businessName || "the clinic"}?
                    </h2>
                    <span className="fs-13 text-gray-600 leading-5 mt-1">
                        {helperName ?
                            <><span className="font-semibold text-gray-900">{helperName}</span> from careipro team is ready to help you immediately.</>
                            : "Our careipro care team is ready to help you immediately."}
                    </span>
                </div>
            </div>
            <div className="flex flex-col gap-2 mt-3">
                {support &&
                    <TrackedLink href={`tel:${support}`} ev_nm="patient_support_call_click" section_name="careipro_support"
                        className="flex items-center justify-center gap-2 py-2 rounded-lg border border-cyan-600 text-cyan-700 fs-13 font-bold">
                        <BiPhone />
                        {supportStaff ? `Patient support · ${capitalizeEachWordFirstLetter(supportStaff)}` : "Patient support helpline"}
                    </TrackedLink>
                }
                {supportTiming &&
                    <span className="fs-12 text-gray-500 text-center">{supportTiming}</span>
                }
            </div>
            {/* the way out when support has not sorted the query. the clinic and city go in the
                campaign so a report can be traced to the page it came from without another lookup */}
            <ReportIssue campaign={`clinic_detail_support_unresolved:${info.id}:${(info.city || '').toLowerCase()}`} />
        </section>
    )
}

export const ClinicDoctorCard = ({ doctor, info }: { doctor: TclinicDetail["doctors"][number], info: TclinicDetail["clinic_info"] }) => {
    const fee = Number(doctor.service_charge);
    const experience = Number(doctor.experience);
    /* a doctor's weekly columns match the clinic_timings shape, so the same helper works */
    const status = getOpenStatus(doctor as unknown as TClinicTiming, new Date());
    const detailUrl = doctorDetailPageUrl({
        doctor_id: doctor.doctor_id,
        service_loc_id: doctor.id,
        clinic_id: doctor.clinic_id,
        seo_url: doctor.seo_url,
        state: info.state || "",
        city: info.city,
        market_name: info.market_name,
        type: doctor.business_type
    });
    const subtitle = [doctor.qualification_disp, doctor.specialists || doctor.position]
        .map((part) => (part || "").trim()).filter((part) => part !== "").join(" · ");
    return (
        <div className="flex gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
            {/* icon fallback rather than doctorProfilePic's default, which is a 404 */}
            {doctor.profile_pic ?
                <img src={doctorProfilePic(doctor.profile_pic)} alt={doctor.doctor_name}
                    className="h-14 w-14 rounded-full object-cover bg-gray-100 shrink-0" />
                :
                <span className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <FaUserMd className="text-gray-400 fs-20" />
                </span>
            }
            <div className="flex flex-col grow min-w-0">
                <Link href={detailUrl} className="fs-14 font-bold text-gray-900 leading-5">
                    {formatDoctorName((doctor.doctor_name || "").trim(), doctor.business_type)}
                </Link>
                {subtitle && <span className="fs-12 text-gray-500 leading-4">{subtitle}</span>}
                <div className="flex items-center gap-2 mt-1">
                    {experience > 0 &&
                        <span className="fs-12 text-gray-600">{experience} yrs exp</span>
                    }
                    {experience > 0 && fee > 0 && <span className="fs-12 text-gray-400">·</span>}
                    {fee > 0 &&
                        <span className="fs-12 font-semibold text-gray-900">
                            <PriceFormat amount={fee} symbol={true} />
                        </span>
                    }
                </div>
                <div className="flex items-center gap-2 mt-2">
                    {status.nextChange &&
                        <span className={`fs-12 font-medium px-2 py-[2px] rounded-full ${status.isOpen
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-gray-50 text-gray-600 border border-gray-200"}`}>
                            {/* nextChange carries the day, so this reads "Available today 3:30 PM" */}
                            {status.isOpen ? `Available till ${status.nextChange}` : `Available ${status.nextChange}`}
                        </span>
                    }
                    <Link href={detailUrl} className="ml-auto fs-12 font-bold text-white bg-cyan-600 px-3 py-[6px] rounded-lg shrink-0">
                        Book
                    </Link>
                </div>
            </div>
        </div>
    )
}
