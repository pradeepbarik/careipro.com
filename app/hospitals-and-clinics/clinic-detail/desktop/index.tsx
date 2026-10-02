import dynamic from "next/dynamic";
import Link from "next/link";
import { BiMap, BiTime, BiChevronRight, BiSolidHeart } from "react-icons/bi";
import { BsStar, BsStarFill } from "react-icons/bs";
import { FaHospital, FaUserMd } from "react-icons/fa";
import { TclinicDetail } from "@/lib/hooks/useClinics";
import { capitalizeFirstLetter, doctorsTabDisplayname } from "@/lib/helper/format-text";
import { cityPageLink, clinicDetailpageUrl } from "@/lib/helper/link";
import { facilityIcon } from "@/lib/constants/facilities";
import {
    SectionCard, QuickActions, HomeCollectionTag, LabServiceNotes, CategoryTile,
    ListingTypeBadge, ListingTypeNote, CareiproSupport, ClinicDoctorCard
} from "../mobile";
import HeroBanners from "./hero-banners";
import ClinicOpenStatus from "../mobile/clinic-open-status";
import ClinicDistance from "../mobile/clinic-distance";
import ClinicTimings from "../mobile/clinic-timings";
import FavouriteButton from "../mobile/favourite-button";
import SendEnquiry from "../mobile/send-enquiry";
import HeroVideos from "./hero-video";

const ClinicReviews = dynamic(() => import("../mobile/clinic-reviews"));
const AppointmentReminder = dynamic(() => import("@/app/components/mobile/appointment-reminder"), { ssr: false });

//the in page nav, each entry must match a section that actually rendered or it scrolls to nothing
const buildTabs = (data: TclinicDetail) => {
    const tabs: Array<{ label: string, href: string }> = [];
    if (data.totalDoctors > 0) tabs.push({ label: doctorsTabDisplayname(data.clinic_info.business_type), href: "#doctors" });
    if ((data.specializations["TESTSCAN"] || []).length > 0) tabs.push({ label: "Tests & Scans", href: "#services" });
    if ((data.specializations["DISEASE"] || []).length > 0) tabs.push({ label: "Treatments", href: "#treatments" });
    if (data.timing) tabs.push({ label: "Timings", href: "#about" });
    if (data.clinic_info.show_patients_feedback) tabs.push({ label: "Reviews", href: "#reviews" });
    return tabs;
};

const ClinicDetailDesktop = ({ data, searchParams }: { data: TclinicDetail, searchParams: any }) => {
    const info = data.clinic_info;
    const tabs = buildTabs(data);
    //every video the clinic uploaded sits in the hero, so there is no separate videos section
    const videos = data.socialMediaVideos || [];
    /* a bare year makes the reader do the arithmetic, so the trust strip carries the age too.
       guarded because the column is free text in admin and a typo like 20110 would read as negative */
    const yearsInService = (() => {
        const year = Number(info.established_year);
        const thisYear = new Date().getFullYear();
        if (!year || year < 1800 || year > thisYear) return 0;
        return thisYear - year;
    })();

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="max-w-7xl mx-auto px-4 py-5">
                <nav aria-label="Breadcrumb" className="flex items-center gap-1 fs-13 text-gray-500 mb-3">
                    <Link href="/" className="hover:text-primary">Careipro</Link>
                    <BiChevronRight className="shrink-0" />
                    <Link href={cityPageLink(info.state || '', info.city)} className="hover:text-primary">{capitalizeFirstLetter(info.city)}</Link>
                    <BiChevronRight className="shrink-0" />
                    <Link href={`/${info.state}/${info.city}/hospitals-and-clinics`} className="hover:text-primary">Hospitals &amp; Clinics</Link>
                    <BiChevronRight className="shrink-0" />
                    <span className="text-gray-700 font-medium truncate">{info.name}</span>
                </nav>
                
                <div className="grid grid-cols-[7fr_3fr] gap-5 items-start mt-5">
                    <div className="min-w-0">
                        {/* identity */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <div className="flex gap-4">
                                <span className="h-20 w-20 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center shrink-0">
                                    <FaHospital className="text-cyan-600" style={{ fontSize: "2.25rem" }} />
                                </span>
                                <div className="flex flex-col grow min-w-0">
                                    <div className="flex">
                                        <div>
                                            <h1 className="text-2xl font-bold text-gray-900 leading-tight">{info.name}</h1>
                                            {/* where the clinic is reads as part of its name, a visitor
                                        checks it before anything else on the card */}
                                            <span className="flex items-center gap-1.5 fs-14 text-gray-600 mt-1">
                                                <BiMap className="text-cyan-600 shrink-0 mt-0.5" />
                                                <span className="min-w-0">
                                                    {info.location}, {info.city} <ClinicDistance lat={info.location_lat} lng={info.location_lng} />
                                                </span>
                                            </span>
                                            {info.open_time && (
                                                <span className="flex items-center gap-1.5 fs-14 text-gray-600 mt-1">
                                                    <BiTime className="text-cyan-600 shrink-0" />
                                                    <span>{info.open_time}</span>
                                                </span>
                                            )}
                                            {/* {info.tag_line && <span className="fs-14 text-gray-500 mt-0.5">{info.tag_line}</span>} */}
                                        </div>
                                        <div className="shrink-0 flex flex-col items-end gap-2 ml-auto">
                                            {/* how long the clinic has been going, the one number from the old
                                        trust strip worth keeping. a bare established year makes the
                                        reader do the arithmetic, so the years are worked out here */}
                                            {yearsInService > 0 ? (
                                                <span className="fs-12 font-semibold px-2 py-[2px] rounded-full bg-cyan-50 text-cyan-700 border border-cyan-100 whitespace-nowrap">
                                                    {yearsInService}+ years of service
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2 mt-2">
                                        <ListingTypeBadge partnerType={info.partner_type} />
                                        {info.is_prime ? (
                                            <span className="fs-12 font-semibold px-2 py-[2px] rounded-full bg-amber-50 text-amber-700 border border-amber-200">★ Prime</span>
                                        ) : null}
                                        {/* averaged from public reviews, so a clinic with none has no rating at
                                            all. a 0.0 on a green badge would read as a real, bad score */}
                                        {info.rating ? (
                                            <span className="flex items-center gap-1 px-2 py-[2px] rounded-md bg-green-600 text-white fs-13 font-bold">
                                                {info.rating.toFixed(1)}<BsStarFill className="fs-12" />
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 px-2 py-[2px] rounded-md bg-gray-100 text-gray-500 fs-12 font-semibold border border-gray-200">
                                                <BsStar className="fs-12" />Not rated yet
                                            </span>
                                        )}
                                        {info.review_cnt && info.review_cnt > 0 ? (
                                            <span className="fs-12 text-gray-500">{info.review_cnt} {info.review_cnt === 1 ? "review" : "reviews"}</span>
                                        ) : null}
                                        <ClinicOpenStatus timing={data.timing} />
                                    </div>
                                </div>
                            </div>
                            {/* reaching the clinic belongs with who the clinic is. built from the
                                contact details it actually has, so a missing whatsapp number drops
                                that tile instead of leaving a dead one */}
                            <QuickActions info={info} showShare />
                        </div>
                        {data.hasBanner && data.banners.length > 0 && 
                        <HeroBanners banners={data.banners} name={info.name} />
                        }
                        <div id="reminder-section"></div>
                        <AppointmentReminder clinic_id={info.id} position="reminder-section" />

                        <div className="mt-4"><ListingTypeNote info={info} /></div>

                        {/* in page nav, the sections below are all on this one url */}
                        {tabs.length > 0 && (
                            <div className="sticky top-[104px] z-20 bg-gray-100 py-3 flex items-center gap-2 flex-wrap">
                                {tabs.map((tab) => (
                                    <a key={tab.href} href={tab.href}
                                        className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 font-semibold fs-14 hover:border-primary hover:text-primary transition-colors">
                                        {tab.label}
                                    </a>
                                ))}
                            </div>
                        )}

                        {data.totalDoctors > 0 && (
                            <SectionCard id="doctors" title={`${doctorsTabDisplayname(info.business_type)} (${data.totalDoctors})`}>
                                <div className="grid grid-cols-2 gap-3">
                                    {/* doctor_display_orders carries the order the clinic arranged its
                                        doctors in, so prefer it over the object's own key order */}
                                    {(data.doctor_display_orders && data.doctor_display_orders.length > 0
                                        ? data.doctor_display_orders.map((id) => data.doctors[id]).filter((doctor) => doctor)
                                        : Object.values(data.doctors)
                                    ).map((doctor) => (
                                        <ClinicDoctorCard key={doctor.id} doctor={doctor} info={info} />
                                    ))}
                                </div>
                            </SectionCard>
                        )}

                        {(data.specializations["TESTSCAN"] || []).length > 0 && (
                            <SectionCard id="services" title="Tests & Scans" headerRight={<HomeCollectionTag info={info} />}>
                                <LabServiceNotes info={info} />
                                <div className="grid grid-cols-3 gap-2">
                                    {data.specializations["TESTSCAN"].map((service) => (
                                        <CategoryTile key={service.seo_id} category={service} fallbackIcon="/icon/test-scan-defult.png" />
                                    ))}
                                </div>
                            </SectionCard>
                        )}

                        {(data.specializations["DISEASE"] || []).length > 0 && (
                            <SectionCard id="treatments" title="Treatments Available">
                                <div className="flex flex-wrap gap-2">
                                    {/* not linked on purpose, these say what this clinic treats and a
                                        link would take the patient off to other clinics */}
                                    {data.specializations["DISEASE"].map((treatment) => (
                                        <span key={treatment.seo_id} className="fs-13 font-medium px-3 py-[5px] rounded-full bg-cyan-50 text-cyan-800 border border-cyan-100">
                                            {(treatment.name || "").trim()}
                                        </span>
                                    ))}
                                </div>
                            </SectionCard>
                        )}

                        {(data.specializations["FACILITIES"] || []).length > 0 && (
                            <SectionCard title="Facilities">
                                <div className="grid grid-cols-3 gap-y-3 gap-x-2">
                                    {data.specializations["FACILITIES"].map((row) => {
                                        const name = (row.facility || "").trim();
                                        const Icon = facilityIcon(name);
                                        const offered = row.available === 1;
                                        return (
                                            <span key={name} className={`flex items-center gap-2 fs-14 ${offered ? "text-gray-700" : "text-gray-400"}`}>
                                                <Icon className={`shrink-0 ${offered ? "text-cyan-600" : "text-gray-300"}`} />
                                                <span className={offered ? "" : "line-through"}>{name}</span>
                                            </span>
                                        );
                                    })}
                                </div>
                            </SectionCard>
                        )}

                        {data.timing && (
                            <SectionCard id="about" title="Clinic Timings">
                                <ClinicTimings timing={data.timing} />
                            </SectionCard>
                        )}

                        {info.show_patients_feedback ? <>
                            <SectionCard id="reviews" title="Patient Reviews">
                                <ClinicReviews
                                    reviews={data.reviews || []}
                                    spread={data.rating_spread || {}}
                                    rating={info.rating}
                                    allReviewsUrl={`${clinicDetailpageUrl({
                                        seo_url: info.seo_url,
                                        state: info.state || "",
                                        city: info.city,
                                        market_name: info.market_name,
                                        bid: info.bid
                                    })}/patients-reviews`}
                                />
                            </SectionCard>
                        </>:<></>}

                    </div>

                    {/* contacting the clinic stays in view the whole way down */}
                    <aside className="min-w-0 sticky top-[104px] flex flex-col gap-4">
                        {info.enable_enquiry ? (
                            <div className="bg-white rounded-xl border border-gray-200 p-4">
                                <h2 className="font-bold text-gray-800 fs-15">Send an enquiry</h2>
                                <p className="fs-13 text-gray-500 mt-0.5 mb-2">Tell the clinic what you need and they will get back to you.</p>
                                <SendEnquiry businessType={info.business_type} state={info.state || ""} city={info.city} clini_id={info.id} doctor_id={0} />
                            </div>
                        ) : null}
                         {videos.length > 0 && <HeroVideos videos={videos} />}
                        <CareiproSupport info={info} citySettings={data.city_settings} />
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default ClinicDetailDesktop;
