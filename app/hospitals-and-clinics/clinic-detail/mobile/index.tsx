import { TclinicDetail } from "@/lib/hooks/useClinics";
import Link from "next/link";
import HeroBanner from "./hero-banner";
import ClinicDistance from "./clinic-distance";
import ClinicOpenStatus from "./clinic-open-status";
import ClinicTimings from "./clinic-timings";
import TrackedLink from "@/app/components/client-components/tracked-link";
import { hasCoordinates } from "@/lib/helper/distance";
import { getOpenStatus, TClinicTiming } from "@/lib/helper/clinic-timing";
import { doctorDetailPageUrl, clinicDetailpageUrl } from "@/lib/helper/link";
import { doctorProfilePic } from "@/lib/image";
import { facilityIcon } from "@/lib/constants/facilities";
import { formatDoctorName, doctorsTabDisplayname, capitalizeEachWordFirstLetter } from "@/lib/helper/format-text";
import PriceFormat from "@/app/components/mobile/ui/price-format";
import { IconType } from "react-icons";
import { BiArrowBack, BiShareAlt, BiHeart, BiPhone, BiMap, BiTime, BiCheckShield, BiChevronRight, BiMessageRoundedDots, BiSupport, BiHeadphone, BiInfoCircle, BiErrorCircle, BiSolidHeart } from "react-icons/bi";
import SendEnquiry from "./send-enquiry";
import PublicListingBadge from "./public-listing-badge";
import ShareButton from "./share-button";
import FavouriteButton from "./favourite-button";
import BackButton from "./back-button";
import ClinicVideos from "./clinic-videos";
import ClinicReviews from "./clinic-reviews";
import AppointmentReminder from "@/app/components/mobile/appointment-reminder";
import { BsWhatsapp, BsStarFill, BsStar } from "react-icons/bs";
import { FaParking, FaWheelchair, FaAmbulance, FaPills, FaWifi, FaCreditCard, FaUserMd, FaFlask, FaXRay, FaHeartbeat, FaMicroscope, FaHospital, FaHandshake, FaHome } from "react-icons/fa";

/* The clinic detail page. Colours use the cyan scale because --primary-color is exactly
   cyan-600, so a tailwind cyan class and the brand colour are the same value.

   Stacking rule: every piece of page chrome that floats over content, the hero controls,
   the identity card, the sticky section nav and the sticky action bar, stays at z-[5].
   SlideUpModal portals its overlay at 10 and its sheet at 12, so keeping page chrome
   below 10 means any sheet, including one opened from inside another, covers the page
   without its caller having to pass a zIndex. */


/* Only offer a tab when the section it jumps to is actually on the page, otherwise
   the link scrolls to an anchor that is not there. */
const buildTabs = (data: TclinicDetail) => {
    const tabs: Array<{ label: string, href: string }> = [];
    if (data.totalDoctors > 0) {
        tabs.push({ label: doctorsTabDisplayname(data.clinic_info.business_type), href: "#doctors" });
    }
    if ((data.specializations["TESTSCAN"] || []).length > 0) {
        tabs.push({ label: "Tests & Scans", href: "#services" });
    }
    if (data.specializations["DISEASE"] && data.specializations["DISEASE"].length > 0) {
        tabs.push({ label: "Treatments", href: "#treatments" });
    }
    /* #about is the timings card, so it only exists when the clinic has hours saved */
    if (data.timing) {
        tabs.push({ label: "Timings", href: "#about" });
    }
    /* must match the reviews section's own condition, or the tab scrolls to nothing */
    if (data.clinic_info.show_patients_feedback) {
        tabs.push({ label: "Reviews", href: "#reviews" });
    }
    return tabs;
}

const SectionCard = ({ id, title, action, headerRight, children }: {
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
const QuickActions = ({ info }: { info: TclinicDetail["clinic_info"] }) => {
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
    if (actions.length === 0) {
        return <></>
    }
    return (
        <div className="grid gap-2 mt-4" style={{ gridTemplateColumns: `repeat(${actions.length}, minmax(0,1fr))` }}>
            {actions.map((action) =>
                <TrackedLink key={action.key} href={action.href} ev_nm={action.ev_nm} section_name="quick_actions"
                    target={action.newTab ? "_blank" : undefined}
                    className={`flex flex-col items-center gap-1 py-2 rounded-lg border ${action.tile}`}>
                    <action.icon className={`${action.tint} fs-18`} />
                    <span className={`fs-12 font-semibold ${action.tint}`}>{action.label}</span>
                </TrackedLink>
            )}
        </div>
    )
}

/* Sits beside the Tests & Scans heading, so it is kept short. The full wording would
   crowd the heading on a narrow phone. */
const HomeCollectionTag = ({ info }: { info: TclinicDetail["clinic_info"] }) => {
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
const LabServiceNotes = ({ info }: { info: TclinicDetail["clinic_info"] }) => {
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
const CategoryTile = ({ category, fallbackIcon }: {
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
const ListingTypeBadge = ({ partnerType }: { partnerType: string | null }) => {
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
const ListingTypeNote = ({ info }: { info: TclinicDetail["clinic_info"] }) => {
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

const CareiproSupport = ({ info, citySettings }: {
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
                    <h2 className="fs-16 font-bold text-gray-900 leading-5">Not able to connect with the clinic?</h2>
                    <span className="fs-13 text-gray-600 leading-5 mt-1">
                        {helperName ?
                            <><span className="font-semibold text-gray-900">{helperName}</span> from careipro is ready to help you immediately.</>
                            : "Our careipro care team is ready to help you immediately."}
                    </span>
                </div>
            </div>
            <div className="flex flex-col gap-2 mt-3">
                {crm &&
                    <TrackedLink href={`tel:${crm}`} ev_nm="crm_call_click" section_name="careipro_support"
                        className="flex items-center justify-center gap-2 py-2 rounded-lg bg-cyan-600 text-white fs-13 font-bold">
                        <BiPhone />{namedHelper ? `Talk with ${crmName}` : "Talk with our care team"}
                    </TrackedLink>
                }
                {support &&
                    <TrackedLink href={`tel:${support}`} ev_nm="patient_support_call_click" section_name="careipro_support"
                        className="flex items-center justify-center gap-2 py-2 rounded-lg border border-cyan-600 text-cyan-700 fs-13 font-bold">
                        <BiHeadphone />
                        {supportStaff ? `Patient support · ${capitalizeEachWordFirstLetter(supportStaff)}` : "Patient support helpline"}
                    </TrackedLink>
                }
                {supportTiming &&
                    <span className="fs-12 text-gray-500 text-center">{supportTiming}</span>
                }
            </div>
        </section>
    )
}

const ClinicDoctorCard = ({ doctor, info }: { doctor: TclinicDetail["doctors"][number], info: TclinicDetail["clinic_info"] }) => {
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

const ClinicDetailDesignV2 = ({ data, searchParams }: { data: TclinicDetail, searchParams: any }) => {
    /* a bare year makes the reader do the arithmetic, so the trust strip carries the age too.
       guarded because the column is free text in admin and a typo like 20110 would read as negative */
    const yearsInService = (() => {
        const year = Number(data.clinic_info.established_year);
        const thisYear = new Date().getFullYear();
        if (!year || year < 1800 || year > thisYear) return 0;
        return thisYear - year;
    })();
    return (
        <div className="bg-gray-50 min-h-screen pb-24">

            {/* Hero: banner, floating controls, and the identity card pulled up over it */}
            <div className="relative">
                {/* isolate: swiper's css sets .swiper{z-index:1}, which otherwise paints the
                    banner over the scrims, the header controls and the identity card below */}
                <div className="relative overflow-hidden isolate">
                    {data.hasBanner && data.banners.length > 0 ?
                        <HeroBanner banners={data.banners} name={data.clinic_info.name} />
                        :
                        /* no banner uploaded, fall back to the branded gradient */
                        <div className="h-60 bg-gradient-to-br from-cyan-600 to-teal-500">
                            <FaUserMd className="absolute text-white opacity-10" style={{ fontSize: "13rem", right: "-2rem", top: "-1rem" }} />
                        </div>
                    }
                    {/* scrims top and bottom so the controls and card edge stay legible on any banner image */}
                    <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/45 to-transparent pointer-events-none z-10" />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-10" />
                </div>
                <div className="absolute top-0 inset-x-0 flex items-center gap-2 px-3 pt-3 z-[5]">
                    <BackButton className="h-9 w-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center" />
                    <div className="ml-auto flex gap-2">
                        <FavouriteButton clinicId={data.clinic_info.id}
                            className="h-9 w-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center" />
                        <ShareButton name={data.clinic_info.name}
                            className="h-9 w-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center" />
                    </div>
                </div>
            </div>

            {/* Identity card */}
            <div className="mx-3 -mt-10 relative z-[5] bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex gap-3">
                    <div className="h-16 w-16 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center shrink-0">
                        <FaHospital className="text-cyan-600" style={{ fontSize: "1.75rem" }} />
                    </div>
                    <div className="flex flex-col grow min-w-0">
                        <h1 className="fs-17 font-bold text-gray-900 leading-5">{data.clinic_info.name}</h1>
                        <span className="fs-13 text-gray-500 mt-[2px]">{data.clinic_info.tag_line}</span>
                        <div className="flex flex-wrap gap-1 mt-2">
                            <ListingTypeBadge partnerType={data.clinic_info.partner_type} />
                            {data.clinic_info.is_prime ?
                                <span className="fs-12 font-semibold px-2 py-[2px] rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                                    ★ Prime
                                </span> : <></>
                            }
                        </div>
                    </div>
                </div>

                {/* Rating + open status */}
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100">
                    {/* the rating is averaged from public reviews, so a clinic with none has no
                        rating at all. showing 0.0 on a green badge would read as a real score */}
                    {data.clinic_info.rating ?
                        <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1 px-2 py-[2px] rounded-md bg-green-600 text-white fs-13 font-bold">
                                {data.clinic_info.rating.toFixed(1)}<BsStarFill className="fs-12" />
                            </span>
                            {data.clinic_info.review_cnt && data.clinic_info.review_cnt > 0 ?
                                <span className="fs-12 text-gray-500">
                                    {data.clinic_info.review_cnt} {data.clinic_info.review_cnt === 1 ? "review" : "reviews"}
                                </span>
                                : <></>}
                        </div>
                        :
                        /* deliberately grey and outlined, not the green score badge: this says
                           there is no rating yet, which must not look like a low one */
                        <span className="flex items-center gap-1 px-2 py-[2px] rounded-md bg-gray-100 text-gray-500 fs-12 font-semibold border border-gray-200 text-nowrap">
                            <BsStar className="fs-12" />Not rated yet
                        </span>
                    }
                    <ClinicOpenStatus timing={data.timing} />
                </div>
                <div className="flex items-center gap-2 mt-2 fs-13 text-gray-600">
                    <BiMap className="text-cyan-600 shrink-0" style={{ marginTop: "2px" }} />
                    <span className="grow">
                        {data.clinic_info.location}, {data.clinic_info.city}{" "}
                        <ClinicDistance lat={data.clinic_info.location_lat} lng={data.clinic_info.location_lng} />
                    </span>
                </div>
                <div className="flex items-center gap-2 mt-1 fs-13 text-gray-600">
                    <BiTime className="text-cyan-600 shrink-0" />
                    <span>{data.clinic_info.open_time}</span>
                </div>

                {/* Quick actions. Built from whatever contact details the clinic actually has,
                    so a missing whatsapp number drops the tile instead of leaving a dead one. */}
                <QuickActions info={data.clinic_info} />
            </div>

            {/* An upcoming booking at this clinic outranks everything else on the page for
                the patient who has one, so it sits directly under the identity card.
                AppointmentReminder portals into this div by id and renders nothing when
                the visitor is logged out or has no appointment here. */}
            <div id="reminder-section"></div>
            <AppointmentReminder clinic_id={data.clinic_info.id} position="reminder-section" />

            {/* Trust strip */}
            <div className="mx-3 mt-3 bg-white rounded-xl border border-gray-100 shadow-sm grid grid-cols-3 divide-x divide-gray-100">
                <div className="flex flex-col items-center justify-center py-3">
                    <span className="fs-16 font-bold text-gray-900">{data.clinic_info.established_year || "--"}</span>
                    {/* most clinics have no year saved yet, and "0 Yrs of Service" under a dash reads like a claim */}
                    <span className="fs-12 text-gray-500">{yearsInService > 0 ? `${yearsInService} Yrs of Service` : "Established"}</span>
                </div>
                <div className="flex flex-col items-center justify-center py-3">
                    <span className="fs-16 font-bold text-gray-900">{Object.keys(data.doctors).length}</span>
                    <span className="fs-12 text-gray-500">Doctors</span>
                </div>
                {/* people who rated this clinic 4 or 5, counted per person not per review */}
                <div className="flex flex-col items-center justify-center py-3">
                    <span className="fs-16 font-bold text-gray-900 flex items-center gap-1">
                        <BiSolidHeart className="text-rose-500 fs-13" />
                        {(data.total_liked || 0).toLocaleString("en-IN")}
                    </span>
                    <span className="fs-12 text-gray-500">Liked</span>
                </div>
            </div>

            {/* What kind of listing this is, kept high on the page so it frames everything
                a patient reads below it */}
            <ListingTypeNote info={data.clinic_info} />
            {/* Sticky section nav */}
            <div className="sticky top-0 z-[5] bg-gray-50 pt-3 pb-2">
                <div className="flex gap-2 overflow-auto hide-scroll-bar px-3">
                    {buildTabs(data).map((tab, i) =>
                        <Link key={tab.href} href={tab.href}
                            className={`shrink-0 fs-13 font-semibold px-3 py-[6px] rounded-full border ${i === 0
                                ? "bg-cyan-600 text-white border-cyan-600"
                                : "bg-white text-gray-600 border-gray-200"}`}>
                            {tab.label}
                        </Link>
                    )}
                </div>
            </div>

            {/* Doctors */}
            {
                data.totalDoctors > 0 &&
                <SectionCard id="doctors" title={`${doctorsTabDisplayname(data.clinic_info.business_type)} (${data.totalDoctors})`}>
                    <div className="flex flex-col gap-3">
                        {/* doctor_display_orders carries the order the clinic arranged its
                            doctors in, so prefer it over the object's own key order */}
                        {(data.doctor_display_orders && data.doctor_display_orders.length > 0
                            ? data.doctor_display_orders.map((id) => data.doctors[id]).filter((doctor) => doctor)
                            : Object.values(data.doctors)
                        ).map((doctor) =>
                            <ClinicDoctorCard key={doctor.id} doctor={doctor} info={data.clinic_info} />
                        )}
                    </div>
                </SectionCard>
            }

            {/* Tests & scans */}
            {
                data.specializations["TESTSCAN"] && data.specializations["TESTSCAN"].length > 0 &&
                <SectionCard id="services" title="Tests & Scans"
                    headerRight={<HomeCollectionTag info={data.clinic_info} />}>
                    <LabServiceNotes info={data.clinic_info} />
                    <div className="grid grid-cols-2 gap-2">
                        {data.specializations["TESTSCAN"].map((service) =>
                            <CategoryTile key={service.seo_id} category={service}
                                fallbackIcon="/icon/test-scan-defult.png" />
                        )}
                    </div>
                </SectionCard>
            }

            {/* Treatments */}
            {
                data.specializations["DISEASE"] && data.specializations["DISEASE"].length > 0 &&
                <SectionCard id="treatments" title="Treatments Available">
                    <div className="flex flex-wrap gap-2">
                        {/* not linked on purpose: these say what this clinic treats, and a
                            link would take the patient away to a listing of other clinics */}
                        {data.specializations["DISEASE"].map((treatment) =>
                            <span key={treatment.seo_id}
                                className="fs-12 font-medium px-3 py-[5px] rounded-full bg-cyan-50 text-cyan-800 border border-cyan-100">
                                {(treatment.name || "").trim()}
                            </span>
                        )}
                    </div>
                </SectionCard>
            }

            {/* Facilities */}
            {
                data.specializations["FACILITIES"] && data.specializations["FACILITIES"].length > 0 &&
                <SectionCard title="Facilities">
                    {/* the api only returns rows the clinic chose to show, and the available
                        flag decides whether each reads as offered or not */}
                    <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                        {data.specializations["FACILITIES"].map((row) => {
                            const name = (row.facility || "").trim();
                            const Icon = facilityIcon(name);
                            const offered = row.available === 1;
                            return (
                                <span key={name} className={`flex items-center gap-2 fs-13 ${offered ? "text-gray-700" : "text-gray-400"}`}>
                                    <Icon className={`shrink-0 ${offered ? "text-cyan-600" : "text-gray-300"}`} />
                                    <span className={offered ? "" : "line-through"}>{name}</span>
                                </span>
                            )
                        })}
                    </div>
                </SectionCard>
            }
            {/* Timings */}
            {
                data.timing &&
                <SectionCard id="about" title="Clinic Timings">
                    <ClinicTimings timing={data.timing} />
                </SectionCard>
            }

            {/* Location. Built from whichever address parts the clinic filled in, since
                location, locality and market_name are each optional in the data. */}
            <SectionCard title="Location">
                <div className="flex items-start gap-2 fs-13 text-gray-600">
                    <BiMap className="text-cyan-600 shrink-0" style={{ marginTop: "2px" }} />
                    <span>
                        {[data.clinic_info.location, data.clinic_info.locality, data.clinic_info.market_name,
                        data.clinic_info.city, data.clinic_info.state]
                            .map((part) => (part || "").trim())
                            .filter((part) => part !== "")
                            .filter((part, i, parts) => parts.indexOf(part) === i)
                            .map(capitalizeEachWordFirstLetter)
                            .join(", ")}
                    </span>
                </div>
                {hasCoordinates({ lat: data.clinic_info.location_lat, lng: data.clinic_info.location_lng }) &&
                    <TrackedLink
                        href={`https://www.google.com/maps/dir/?api=1&destination=${data.clinic_info.location_lat},${data.clinic_info.location_lng}`}
                        ev_nm="direction_click" section_name="location" target="_blank"
                        className="flex items-center justify-center gap-2 mt-3 py-2 rounded-lg border border-cyan-600 text-cyan-700 fs-13 font-semibold">
                        <BiMap />Get Directions
                    </TrackedLink>
                }
            </SectionCard>
            {/* Reviews. Partners only, since careipro collects feedback for businesses it
                works with and a public listing has no verified patients behind a rating.
                Also honours the clinic's own show reviews setting, and must stay in step
                with the matching condition in buildTabs. */}
            {data.clinic_info.show_patients_feedback ?
                <SectionCard id="reviews" title="Patient Reviews">
                    <ClinicReviews reviews={data.reviews || []} spread={data.rating_spread || {}}
                        rating={data.clinic_info.rating}
                        allReviewsUrl={`${clinicDetailpageUrl({
                            seo_url: data.clinic_info.seo_url,
                            state: data.clinic_info.state || "",
                            city: data.clinic_info.city,
                            market_name: data.clinic_info.market_name,
                            bid: data.clinic_info.bid
                        })}/patients-reviews`} />
                </SectionCard>
                : <></>}
            {/* the clinic's own videos, above the tabbed content since they are the most
                persuasive thing on the page when a clinic has bothered to add them */}
            {data.socialMediaVideos && data.socialMediaVideos.length > 0 &&
                <ClinicVideos videos={data.socialMediaVideos || []} />
            }
            {/* Careipro's own escalation contact, last so it reads as the fallback after
                the clinic's own contact options have been tried */}
            <CareiproSupport info={data.clinic_info} citySettings={data.city_settings} />

            {/* Sticky action bar. Each cta is gated on the clinic having the detail behind
                it, and flex-1 means two or one of them still fill the bar cleanly. */}
            {/* z-5 deliberately: SlideUpModal renders its overlay at 10 and the sheet at 12,
                so keeping the bar below those lets every sheet, including ones nested inside
                another sheet, sit above it without each caller passing a zIndex. */}
            <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 px-3 py-3 flex gap-2 z-[5]">
                {data.clinic_info.mobile &&
                    <TrackedLink href={`tel:${data.clinic_info.mobile}`} ev_nm="call_click" section_name="bottom_bar"
                        className="flex items-center justify-center gap-2 flex-1 py-[10px] rounded-lg border border-cyan-600 text-cyan-700 fs-14 font-bold">
                        <BiPhone />Call
                    </TrackedLink>
                }
                {data.clinic_info.whatsapp_number &&
                    <TrackedLink href={`https://wa.me/${data.clinic_info.whatsapp_number}?text=${encodeURI("Hi,I found your clinic on careipro")}`}
                        ev_nm="whatsapp_click" section_name="bottom_bar" target="_blank"
                        className="flex items-center justify-center gap-2 flex-1 py-[10px] rounded-lg border fs-14 font-bold"
                        style={{ color: "#15803d", borderColor: "#15803d" }}>
                        <BsWhatsapp />WhatsApp
                    </TrackedLink>
                }
                {data.clinic_info.enable_enquiry == 1 &&
                    <SendEnquiry businessType={data.clinic_info.business_type} state={data.clinic_info.state || ""}
                        city={data.clinic_info.city} clini_id={data.clinic_info.id}
                        variant="button" label="Enquiry"
                        className="flex items-center justify-center gap-2 flex-1 py-[10px] rounded-lg bg-cyan-600 text-white fs-14 font-bold">
                        <BiMessageRoundedDots />
                    </SendEnquiry>
                }
            </div>
        </div >
    )
}
export default ClinicDetailDesignV2;
