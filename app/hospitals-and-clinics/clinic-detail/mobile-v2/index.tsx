import Link from "next/link";
import dynamic from "next/dynamic";
import { BiPhone, BiLogoWhatsapp, BiLocationPlus, BiChevronRight, BiTimeFive, BiMessageRoundedDots, BiTagAlt, BiSolidQuoteAltLeft } from "react-icons/bi";
import { BsStar, BsStarFill } from "react-icons/bs";
import { FaHospital, FaAmbulance } from "react-icons/fa";
import { TclinicDetail } from "@/lib/hooks/useClinics";
import { clinicProfilePic } from "@/lib/image";
import { capitalizeEachWordFirstLetter, doctorsTabDisplayname, showMaskedMobile } from "@/lib/helper/format-text";
import { hasCoordinates } from "@/lib/helper/distance";
import { facilityIcon } from "@/lib/constants/facilities";
import { clinicDetailpageUrl } from "@/lib/helper/link";
import FloatingHeader from "./floating-header";
import TrackedLink from "@/app/components/client-components/tracked-link";
import {
    SectionCard, HomeCollectionTag, LabServiceNotes, CategoryTile,
    ListingTypeBadge, ListingTypeNote, CareiproSupport
} from "../mobile";
import DoctorCard from "../doctor-card";
import HeroBanner from "../mobile/hero-banner";
import ClinicTimings from "../mobile/clinic-timings";
import ClinicDistance from "../mobile/clinic-distance";
import SendEnquiry from "../mobile/send-enquiry";
import AmbulanceCard from "../ambulance-card";
const Announcements = dynamic(() => import("@/app/components/mobile/doctors/doctor-detail/announcements"));
const ClinicReviews = dynamic(() => import("../mobile/clinic-reviews"));
const ClinicVideos = dynamic(() => import("../mobile/clinic-videos"));
const AppointmentReminder = dynamic(() => import("@/app/components/mobile/appointment-reminder"), { ssr: false });

/**
 * A second take on the mobile clinic detail page, built to be compared against the current one
 * rather than to replace it yet. Both are wired up in page.tsx, ?design=v2 picks this one.
 *
 * The difference is the block under the identity: the current page puts contact behind a grid of
 * icon tiles, where the number itself is never visible and every tile looks alike. This follows
 * the doctor detail page instead, which lists one labelled row per thing a visitor actually wants
 * -- where it is, what to call, what to message -- with the value on the row and the action at the
 * end of it. Everything below that block is the existing page's sections, imported rather than
 * copied, so the two versions cannot drift apart while the decision is open.
 */

/** one labelled row: icon, what it is, then the value and its action pushed to the end */
const InfoRow = ({ icon, label, children }: { icon: React.ReactNode, label: string, children: React.ReactNode }) => (
    <div className="bg-gray-50 rounded-md px-2 border border-gray-200 flex items-center gap-2 py-2 mt-1">
        <span className="shrink-0 flex items-center">{icon}</span>
        <h2 className="font-semibold fs-14 text-gray-800 shrink-0">{label}</h2>
        <div className="ml-auto text-right min-w-0">{children}</div>
    </div>
);

const ActionPill = ({ children }: { children: React.ReactNode }) => (
    <span className="mx-1 border border-cyan-600 rounded-md px-2 text-cyan-700 font-semibold shrink-0">{children}</span>
);

const buildTabs = (data: TclinicDetail) => {
    const tabs: Array<{ label: string, href: string }> = [];
    if ((data.ambulances || []).length > 0) tabs.push({ label: "Ambulances", href: "#ambulances" });
    if (data.totalDoctors > 0) tabs.push({ label: doctorsTabDisplayname(data.clinic_info.business_type), href: "#doctors" });
    if ((data.specializations["TESTSCAN"] || []).length > 0) tabs.push({ label: "Tests & Scans", href: "#services" });
    if ((data.specializations["DISEASE"] || []).length > 0) tabs.push({ label: "Treatments", href: "#treatments" });
    if (data.timing) tabs.push({ label: "Timings", href: "#about" });
    if (data.clinic_info.show_patients_feedback) tabs.push({ label: "Reviews", href: "#reviews" });
    return tabs;
};

const ClinicDetailMobileV2 = ({ data }: { data: TclinicDetail, searchParams?: any }) => {
    const info = data.clinic_info;
    const isAmbulance = info.business_type === "AMBULANCE";
    const tabs = buildTabs(data);
    const address = [info.location, info.locality, info.market_name, info.city]
        .map((part) => (part || "").trim())
        .filter((part) => part !== "")
        .filter((part, i, parts) => parts.indexOf(part) === i)
        .map(capitalizeEachWordFirstLetter)
        .join(", ");
    const yearsInService = (() => {
        const year = Number(info.established_year);
        const thisYear = new Date().getFullYear();
        if (!year || year < 1800 || year > thisYear) return 0;
        return thisYear - year;
    })();

    return (
        <div className="bg-gray-50 min-h-screen pb-24">
            {/* A transparent bar riding over the banner. It is sticky rather than absolute, so the
                back, like and share controls stay reachable once the banner has scrolled away.
                Nothing is painted behind the bar itself; each control carries its own translucent
                disc, which keeps it legible over a photo at the top and over the page below. */}
            <FloatingHeader clinicId={info.id} name={info.name} />

            {/* pulled up behind the bar. isolate: swiper sets .swiper{z-index:1}, which would
                otherwise paint the banner over the controls */}
            {/* the banner pins at the top and stays there. it sits at the bottom of the stack,
                so the panel below slides up over it as the page scrolls, and the controls above
                stay clear of both */}
            <div className="sticky top-0 z-0 overflow-hidden isolate -mt-[52px]">
                {data.hasBanner && data.banners.length > 0 ?
                    <HeroBanner banners={data.banners} name={info.name} />
                    : <div className="h-40 bg-gradient-to-br from-cyan-600 to-teal-500">
                        {isAmbulance
                            ? <FaAmbulance className="absolute text-white opacity-10" style={{ fontSize: "10rem", right: "-1rem", top: "-1rem" }} />
                            : <FaHospital className="absolute text-white opacity-10" style={{ fontSize: "10rem", right: "-1rem", top: "-1rem" }} />}
                    </div>}
                {/* a scrim at the top only, so the controls stay readable on a light banner */}
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/45 to-transparent pointer-events-none" />
            </div>

            {/* one opaque panel from here down. the rounded top edge and the lift over the
                banner are what make the scroll read as a sheet rising over the image */}
            {/* no overflow-hidden here: it would clip the rounded edge nicely but it also breaks
                position:sticky for everything inside, including the tab bar. the first child is
                rounded to match instead. */}
            <div className="relative z-10 -mt-4 rounded-t-2xl bg-gray-50 pt-1">
            {/* identity, on white so it reads as the subject of the page */}
            <div className="flex px-2 py-3 gap-3 bg-white shadow-sm rounded-t-2xl">
                {info.logo
                    ? <img src={clinicProfilePic(info.logo)} alt={`Logo of ${info.name}`}
                        className="h-20 w-20 rounded-md object-cover border border-gray-100 shrink-0" />
                    : <span className="h-20 w-20 rounded-md bg-cyan-50 border border-cyan-100 flex items-center justify-center shrink-0">
                        {isAmbulance
                            ? <FaAmbulance className="text-cyan-600" style={{ fontSize: "2rem" }} />
                            : <FaHospital className="text-cyan-600" style={{ fontSize: "2rem" }} />}
                    </span>}
                <div className="flex flex-col grow min-w-0">
                    <h1 className="font-semibold fs-17 text-gray-900 leading-tight capitalize">{capitalizeEachWordFirstLetter(`${info.name} In ${info.city.toLocaleUpperCase()}`)}</h1>
                    <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                        <ListingTypeBadge partnerType={info.partner_type} />
                        {info.rating ?
                            <span className="flex items-center gap-1 px-2 py-[2px] rounded-md bg-green-600 text-white fs-12 font-bold">
                                {info.rating.toFixed(1)}<BsStarFill className="fs-12" />
                            </span>
                            : <span className="flex items-center gap-1 px-2 py-[2px] rounded-md bg-gray-100 text-gray-500 fs-12 font-semibold border border-gray-200">
                                <BsStar className="fs-12" />Not rated yet
                            </span>}
                        {yearsInService > 0 &&
                            <span className="fs-12 font-semibold px-2 py-[2px] rounded-full bg-cyan-50 text-cyan-700 border border-cyan-100">
                                {yearsInService}+ yrs
                            </span>}
                    </div>
                </div>
            </div>

            {/* whatever the clinic is currently telling patients, above the details so a closure
                or a camp is seen before someone dials */}
            {(data.announcements || []).length > 0 &&
                <Announcements announcements={data.announcements || []} />}

            {/* The tag line is the business talking about itself, not a field someone looks up,
                so it is deliberately not an InfoRow: as a labelled grey row it read as one more
                piece of reference data and disappeared among the rest. Tinted, with an accent
                edge and a quote mark, it leads into the rows instead of sitting in them. */}
            {info.tag_line &&
                <div className="px-2 mt-2">
                    <div className="relative overflow-hidden rounded-xl border border-cyan-100 bg-gradient-to-r from-cyan-50 to-white py-2.5 pl-4 pr-3">
                        <span className="absolute left-0 inset-y-0 w-1 bg-cyan-500" />
                        <BiSolidQuoteAltLeft className="absolute right-2 top-2 text-cyan-600 opacity-10" style={{ fontSize: "2.5rem" }} />
                        <p className="relative fs-14 font-medium italic leading-snug text-cyan-900">{info.tag_line}</p>
                    </div>
                </div>}

            {/* the rows this version exists for */}
            <div className="px-2 mt-1">
                {info.category &&
                    <InfoRow icon={<BiTagAlt className="rotate-90 text-cyan-600" style={{ fontSize: "1.2rem" }} />} label="Category">
                        <span className="fs-13 text-gray-700">{info.category.replaceAll(",", ", ")}</span>
                    </InfoRow>}

                {address &&
                    <InfoRow icon={<BiLocationPlus className="text-orange-600" style={{ fontSize: "1.2rem" }} />} label="Location">
                        {hasCoordinates({ lat: info.location_lat, lng: info.location_lng }) ?
                            <TrackedLink
                                href={`https://www.google.com/maps/dir/?api=1&destination=${info.location_lat},${info.location_lng}`}
                                ev_nm="direction_click" section_name="contact" target="_blank"
                                className="flex items-center justify-end fs-13 text-gray-700">
                                <span className="truncate">{address}</span>
                                <BiChevronRight className="text-xl text-cyan-700 shrink-0" />
                            </TrackedLink>
                            : <span className="fs-13 text-gray-700">{address}</span>}
                        <div className="fs-12 text-gray-400">
                            <ClinicDistance lat={info.location_lat} lng={info.location_lng} />
                        </div>
                    </InfoRow>}

                {info.mobile &&
                    <InfoRow icon={<BiPhone className="text-green-600" style={{ fontSize: "1.2rem" }} />} label="Contact">
                        <TrackedLink href={`tel:${info.mobile}`} ev_nm="call_click" section_name="contact"
                            className="flex items-center justify-end fs-13 text-gray-700">
                            {showMaskedMobile(String(info.mobile))}
                            <ActionPill>Call Now</ActionPill>
                        </TrackedLink>
                    </InfoRow>}

                {info.whatsapp_number &&
                    <InfoRow icon={<BiLogoWhatsapp className="text-green-600" style={{ fontSize: "1.2rem" }} />} label="Whatsapp">
                        <TrackedLink
                            href={`https://wa.me/${info.whatsapp_number}?text=${encodeURI(`Hi,\nI found *${info.name}* on careipro.com. I need some more information.`)}`}
                            ev_nm="whatsapp_click" section_name="contact" target="_blank"
                            className="flex items-center justify-end fs-13 text-gray-700">
                            {showMaskedMobile(String(info.whatsapp_number))}
                            <ActionPill>Message</ActionPill>
                        </TrackedLink>
                    </InfoRow>}

                {info.open_time &&
                    <InfoRow icon={<BiTimeFive className="text-cyan-600" style={{ fontSize: "1.2rem" }} />} label="Opening Hours">
                        <span className="fs-13 text-gray-700">{info.open_time}</span>
                    </InfoRow>}
            </div>

            <div id="reminder-section"></div>
            <AppointmentReminder clinic_id={info.id} position="reminder-section" />

            <div className="px-2 mt-2"><ListingTypeNote info={info} /></div>

            {tabs.length > 0 &&
                <div className="flex gap-2 overflow-auto hide-scroll-bar px-2 py-2.5 sticky top-0 z-[15] bg-gray-50 border-b border-gray-200 shadow-sm">
                    {tabs.map((tab) =>
                        <a key={tab.href} href={tab.href}
                            className="shrink-0 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-700 font-semibold fs-13">
                            {tab.label}
                        </a>)}
                </div>}
            {(data.ambulances || []).length > 0 &&
                <SectionCard id="ambulances" title={`Ambulances (${(data.ambulances || []).length})`}>
                    <div className="flex flex-col gap-3">
                        {(data.ambulances || []).map((vehicle) =>
                            <AmbulanceCard key={vehicle.id} vehicle={vehicle} info={info} />)}
                    </div>
                </SectionCard>}

            {data.totalDoctors > 0 &&
                <SectionCard id="doctors" title={`${doctorsTabDisplayname(info.business_type)} (${data.totalDoctors})`}>
                    <div className="flex flex-col gap-3">
                        {(data.doctor_display_orders && data.doctor_display_orders.length > 0
                            ? data.doctor_display_orders.map((id) => data.doctors[id]).filter(Boolean)
                            : Object.values(data.doctors)
                        ).map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} info={info} />)}
                    </div>
                </SectionCard>}

            {(data.specializations["TESTSCAN"] || []).length > 0 &&
                <SectionCard id="services" title="Tests & Scans" headerRight={<HomeCollectionTag info={info} />}>
                    <LabServiceNotes info={info} />
                    <div className="grid grid-cols-3 gap-2">
                        {data.specializations["TESTSCAN"].map((service) =>
                            <CategoryTile key={service.seo_id} category={service} fallbackIcon="/icon/test-scan-defult.png" />)}
                    </div>
                </SectionCard>}

            {(data.specializations["DISEASE"] || []).length > 0 &&
                <SectionCard id="treatments" title="Treatments Available">
                    <div className="flex flex-wrap gap-2">
                        {data.specializations["DISEASE"].map((treatment) =>
                            <span key={treatment.seo_id} className="fs-13 font-medium px-3 py-[5px] rounded-full bg-cyan-50 text-cyan-800 border border-cyan-100">
                                {(treatment.name || "").trim()}
                            </span>)}
                    </div>
                </SectionCard>}

            {(data.specializations["FACILITIES"] || []).length > 0 &&
                <SectionCard title="Facilities">
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
                            );
                        })}
                    </div>
                </SectionCard>}

            {data.timing &&
                <SectionCard id="about" title="Timings">
                    <ClinicTimings timing={data.timing} />
                </SectionCard>}

            {info.show_patients_feedback ?
                <SectionCard id="reviews" title="Patient Reviews">
                    <ClinicReviews
                        reviews={data.reviews || []}
                        spread={data.rating_spread || {}}
                        rating={info.rating}
                        allReviewsUrl={`${clinicDetailpageUrl({
                            seo_url: info.seo_url, state: info.state || "", city: info.city,
                            market_name: info.market_name, bid: info.bid
                        })}/patients-reviews`}
                    />
                </SectionCard> : <></>}

            {(data.socialMediaVideos || []).length > 0 &&
                <ClinicVideos videos={data.socialMediaVideos || []} />}

            <div className="px-2 mt-2">
                <CareiproSupport info={info} citySettings={data.city_settings} />
            </div>

            </div>

            <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 px-3 py-3 flex gap-2 z-[5]">
                {info.mobile &&
                    <TrackedLink href={`tel:${info.mobile}`} ev_nm="call_click" section_name="bottom_bar"
                        className="flex items-center justify-center gap-2 flex-1 py-[10px] rounded-lg border border-cyan-600 text-cyan-700 fs-14 font-bold">
                        <BiPhone />Call
                    </TrackedLink>}
                {info.whatsapp_number &&
                    <TrackedLink href={`https://wa.me/${info.whatsapp_number}?text=${encodeURI(`Hi,\nI found *${info.name}* on careipro.com.`)}`}
                        ev_nm="whatsapp_click" section_name="bottom_bar" target="_blank"
                        className="flex items-center justify-center gap-2 flex-1 py-[10px] rounded-lg border fs-14 font-bold"
                        style={{ color: "#15803d", borderColor: "#15803d" }}>
                        <BiLogoWhatsapp className="text-lg" />WhatsApp
                    </TrackedLink>}
                {info.enable_enquiry == 1 &&
                    <SendEnquiry businessType={info.business_type} state={info.state || ""}
                        city={info.city} clini_id={info.id}
                        variant="button" label="Enquiry"
                        className="flex items-center justify-center gap-2 flex-1 py-[10px] rounded-lg bg-cyan-600 text-white fs-14 font-bold">
                        <BiMessageRoundedDots />
                    </SendEnquiry>}
            </div>
        </div>
    );
};
export default ClinicDetailMobileV2;
