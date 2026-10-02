import React from "react";
import Link from "next/link";
import { BiPhone, BiChevronRight } from "react-icons/bi";
import { FaMicroscope, FaMapMarkerAlt, FaStar, FaClock, FaHome, FaHandshake, FaVials } from "react-icons/fa";
import TrackedLink from "@/app/components/client-components/tracked-link";
import PriceFormat from "@/app/components/mobile/ui/price-format";
import { PortraitAd, WideAd } from "@/app/components/mobile/ads-container";
import { doctorSpecialityIcon } from "@/lib/image";
import { capitalizeFirstLetter } from "@/lib/helper/format-text";
import { cityPageLink } from "@/lib/helper/link";
import { TClinic } from "@/lib/types/clinic";
import { TTestsScansPageData, TTestsScansSpecialist } from "@/lib/hooks/useTestsScans";
import BannerSlider from "./banner-slider";

type TProps = { state: string, city: string, pageData: TTestsScansPageData };

/* both halves of the top row stand the same height so neither side letterboxes the other */
const ROW_HEIGHT = "18rem";

const SectionHeading = ({ heading, action }: { heading: string, action?: React.ReactNode }) => (
    <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-6 bg-primary rounded-full"></div>
        <h2 className="text-lg font-bold text-gray-800">{heading}</h2>
        {action && <span className="ml-auto">{action}</span>}
    </div>
);

const Specialists = ({ specialists }: { specialists: TTestsScansSpecialist[] }) => {
    if (specialists.length === 0) return <></>;
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-4 h-full flex flex-col min-w-0">
            <SectionHeading heading="Find By Test, Scan & Ultrasound Centers" />
            {/* rows rather than icon tiles: the api sends these categories with no icon, so tiles
                would be the same placeholder glyph repeated. two columns because one row across this
                half is mostly empty space, and because the usual five then fit the box without a
                sliced row. anything longer scrolls inside the box, so a city with many categories
                cannot stretch the banner beside it. */}
            <div className="grid grid-cols-2 gap-2 content-start overflow-y-auto hide-scroll-bar flex-1">
                {specialists.map((specialist) => (
                    <Link
                        key={specialist.id}
                        href={specialist.seo_url}
                        title={specialist.name}
                        className="group flex items-center gap-2 px-2.5 py-2 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors min-w-0"
                    >
                        <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden">
                            {specialist.icon
                                ? <img src={doctorSpecialityIcon(specialist.icon)} alt={specialist.name} className="h-6 w-6" />
                                : <FaVials className="text-primary" />}
                        </span>
                        <span className="fs-14 font-semibold text-gray-800 group-hover:text-primary transition-colors min-w-0 truncate">
                            {specialist.name}
                        </span>
                        <BiChevronRight className="ml-auto text-lg text-gray-400 shrink-0" />
                    </Link>
                ))}
            </div>
        </div>
    );
};

const CenterCard = ({ center }: { center: TClinic }) => {
    const phone = center.mobile || center.alt_mob_no;
    const doctors = (center.recommended_doctors || "").split(",").map((d) => d.trim()).filter(Boolean);
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg hover:border-primary/40 transition-all flex flex-col">
            <div className="flex gap-3">
                <span className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <FaMicroscope className="text-primary text-xl" />
                </span>
                <div className="min-w-0 flex-1">
                    <Link href={center.seo_url} className="font-bold fs-16 text-gray-900 hover:text-primary transition-colors block truncate">
                        {center.name}
                    </Link>
                    <span className="flex items-center gap-1 fs-13 text-gray-600 mt-0.5">
                        <FaMapMarkerAlt className="text-primary shrink-0" />
                        <span className="truncate">{center.locality}, {center.city}</span>
                    </span>
                    <div className="flex items-center gap-3 fs-13 mt-1">
                        {/* nothing shows until the centre has public reviews. an invented rating is
                            worse than no rating on a page people choose a lab from */}
                        {center.avg_rating ? (
                            <span className="flex items-center gap-1">
                                <FaStar style={{ color: "#f5a623" }} />{center.avg_rating.toFixed(1)}
                                {center.rating_cnt ? (
                                    <span className="text-gray-500">({center.rating_cnt} {center.rating_cnt === 1 ? "review" : "reviews"})</span>
                                ) : null}
                            </span>
                        ) : null}
                        <span className="flex items-center gap-1 text-gray-600">
                            <FaClock className="text-primary" />08:00 AM - 08:00 PM
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-2">
                {center.partner_with && (
                    <span className="flex items-center gap-1 fs-12 font-semibold px-2 py-[2px] rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        <FaHandshake className="shrink-0" />{center.partner_with}
                    </span>
                )}
                {doctors.slice(0, 2).map((doctor, i) => (
                    <span key={`doctor-${i}`} className="fs-12 font-semibold px-2 py-[2px] rounded-full bg-orange-100 text-orange-700 border border-orange-200">{doctor}</span>
                ))}
                {doctors.length > 2 && <span className="fs-12 text-gray-500">+{doctors.length - 2} more</span>}
            </div>

            {(center.services || []).length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                    {(center.services || []).map((service) => (
                        <span key={service} className="fs-12 px-2 py-[2px] rounded-full bg-gray-100 text-gray-600 border border-gray-200">{service}</span>
                    ))}
                </div>
            )}

            {center.discount_msg && (
                <div className="mt-2 px-2 py-1 rounded-md bg-orange-50 border border-orange-200">
                    <span className="fs-12 font-medium text-orange-700">🎉 {center.discount_msg}</span>
                </div>
            )}
            {center.sample_home_collection ? (
                <div className="flex items-center gap-2 mt-2 px-2 py-1 rounded-md" style={{ backgroundColor: "rgba(12,151,12,.08)" }}>
                    <FaHome className="shrink-0" style={{ color: "#0c970c" }} />
                    <span className="fs-12 font-semibold" style={{ color: "#0c970c" }}>
                        {(center.sample_home_collection_charge || 0) > 0
                            ? <>Home sample collection at <PriceFormat amount={center.sample_home_collection_charge} symbol={true} /></>
                            : "Free home sample collection"}
                    </span>
                </div>
            ) : null}

            {/* booking is doctor wise rather than centre wise, so the second action opens the
                centre's own page instead of pretending to book a slot here */}
            <div className="flex gap-2 mt-auto pt-3">
                {phone && (
                    <TrackedLink
                        href={`tel:${phone}`}
                        ev_nm="call_click"
                        section_name="labs_tests_scans_centers"
                        className="flex-1 flex items-center justify-center gap-2 border border-primary text-primary font-semibold fs-14 rounded-lg py-2 hover:bg-primary hover:text-white transition-colors"
                    >
                        <BiPhone />Call Now
                    </TrackedLink>
                )}
                <Link
                    href={center.seo_url}
                    className="flex-1 flex items-center justify-center gap-1 bg-primary text-white font-semibold fs-14 rounded-lg py-2 hover:opacity-90 transition-opacity"
                >
                    View Details<BiChevronRight />
                </Link>
            </div>
        </div>
    );
};

const LabsTestsScansDesktop = ({ state, city, pageData }: TProps) => {
    const cityLabel = capitalizeFirstLetter(city || '');
    const centerSections = (pageData.sections || []).filter((s) => s.section_type === "testscan");
    const hasBanners = (pageData.banners || []).length > 0;
    const hasSpecialists = (pageData.specialists || []).length > 0;
    const totalCenters = centerSections.reduce((sum, s) => sum + (s.centers || []).length, 0);

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="max-w-7xl mx-auto px-4 py-5">
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                    Pathology Labs, Ultrasound &amp; Scan Centers in {cityLabel}
                </h1>
                <p className="fs-14 text-gray-500 mt-0.5 mb-4">
                    {totalCenters > 0
                        ? `${totalCenters} ${totalCenters === 1 ? 'center' : 'centers'} with test prices, timings and contact details`
                        : 'Test prices, timings and contact details'}
                </p>

                {/* banner rotating on the left, the categories on the right, half each. with only
                    one of the two present it takes the full width instead of leaving a gap */}
                {(hasBanners || hasSpecialists) && (
                    <div className={`grid ${hasBanners && hasSpecialists ? 'grid-cols-2' : 'grid-cols-1'} gap-4 items-stretch mb-6`}>
                        {hasBanners && <BannerSlider banners={pageData.banners} height={ROW_HEIGHT} />}
                        {hasSpecialists && (
                            <div style={{ height: ROW_HEIGHT }}>
                                <Specialists specialists={pageData.specialists} />
                            </div>
                        )}
                    </div>
                )}

                {/* centres take the width, the rail beside them carries the ads */}
                <div className="grid grid-cols-[7fr_3fr] gap-5 items-start">
                    <div className="min-w-0">
                        {centerSections.length === 0 ? (
                            <div className="bg-white rounded-xl border border-gray-200 py-14 text-center">
                                <img src="/icon/no-data.png" alt="" className="h-28 mx-auto" />
                                <p className="font-semibold text-gray-700 mt-3">No centers listed in {cityLabel} yet</p>
                            </div>
                        ) : centerSections.map((section, i) => (
                            <section key={`section-${i}`} className="mb-6">
                                <SectionHeading
                                    heading={section.heading}
                                    action={section.view_all_url ? (
                                        <Link href={section.view_all_url} className="flex items-center gap-1 fs-14 font-semibold text-primary hover:underline">
                                            View All<BiChevronRight className="text-lg" />
                                        </Link>
                                    ) : undefined}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    {(section.centers || []).map((center) => (
                                        <CenterCard key={center.id} center={center} />
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>

                    <aside className="min-w-0 sticky top-[104px] flex flex-col gap-4">
                        <PortraitAd page_type="clinic_list" category_ids="" city={city} limit={1} showPlaceholder={false} ad_selection="random" />
                    </aside>
                </div>
                <nav aria-label="Breadcrumb" className="flex items-center gap-1 fs-13 text-gray-500 mb-3">
                    <Link href="/" className="hover:text-primary">Careipro</Link>
                    <BiChevronRight className="shrink-0" />
                    <Link href={cityPageLink(state, city)} className="hover:text-primary">{cityLabel}</Link>
                    <BiChevronRight className="shrink-0" />
                    <span className="text-gray-700 font-medium">Labs, Tests &amp; Scans</span>
                </nav>
            </main>
        </div>
    );
};

export default LabsTestsScansDesktop;
