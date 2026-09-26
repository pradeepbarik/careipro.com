import Link from "next/link";
import { IconType } from "react-icons";
import { BiPhone, BiChevronRight, BiCheckCircle } from "react-icons/bi";
import { FaFlask, FaXRay, FaHeartbeat, FaMicroscope, FaTint, FaHome, FaClock, FaStar, FaMapMarkerAlt, FaBone, FaLungs, FaBrain, FaFileMedicalAlt, FaVials, FaSyringe, FaHandshake } from "react-icons/fa";
import { GiSoundWaves, GiMagnet, GiKidneys, GiLiver } from "react-icons/gi";
import Header from "../components/mobile/header";
import TrackedLink from "@/app/components/client-components/tracked-link";
import { SectionHeading } from "@/app/components/mobile/ui";
import PriceFormat from "@/app/components/mobile/ui/price-format";
import SwiperBanner from "@/app/components/mobile/ui/swiper-banner";
import { doctorSpecialityIcon, clinicBannerImage } from "@/lib/image";
import { TClinic } from "@/lib/types/clinic";
import { TTestsScansPageData, TTestsScansBanner, TTestsScansSpecialist } from "@/lib/hooks/useTestsScans";
import React from "react";

type TProps = {
    state: string,
    city: string,
    pageData: TTestsScansPageData,
}


const Hero = ({ banners }: { banners: TTestsScansBanner[] }) => {
    /* Fall back to the built in slides when the city has no banners configured,
       so the top of the page is never empty. */
    return (
        <div className="px-2 pt-2">
            <SwiperBanner banners={banners.map((banner, i) =>
                <div className="rounded-md overflow-hidden" key={`banner-${i}`}>
                    {banner.link ?
                        <Link href={banner.link}>
                            <img src={clinicBannerImage(banner.image)} alt={banner.alt_text} className="w-full h-36 rounded-md" />
                        </Link>
                        :
                        <img src={clinicBannerImage(banner.image)} alt={banner.alt_text} className="w-full h-36 rounded-md" />
                    }
                </div>
            )} />
        </div>
    )
    // return (
    //     <div className="px-2 pt-2">
    //         <SwiperBanner banners={heroSlides.map((slide) =>
    //             <div className={`relative rounded-md overflow-hidden bg-gradient-to-r ${slide.gradient}`} key={slide.title}>
    //                 <slide.icon className="absolute color-white opacity-20" style={{ fontSize: "7rem", right: "-1rem", bottom: "-1.5rem" }} />
    //                 <div className="relative flex flex-col gap-1 px-3 py-4" style={{ maxWidth: "75%", minHeight: "9rem" }}>
    //                     {/* Inline styles: .badge and .button are defined after @tailwind utilities, so background and border utility classes lose the cascade here. */}
    //                     <span className="fs-12 font-semibold self-start color-white rounded-full px-2 py-1"
    //                         style={{ backgroundColor: "rgba(255,255,255,.2)", border: "1px solid rgba(255,255,255,.6)" }}>
    //                         {slide.offer}
    //                     </span>
    //                     <span className="color-white font-bold fs-20 leading-6 mt-1">{slide.title}</span>
    //                     <span className="color-white fs-13 leading-4 opacity-90">{slide.subtitle}</span>
    //                     <span className="flex items-center font-semibold fs-13 self-start mt-2 rounded-full px-3 py-1"
    //                         style={{ backgroundColor: "#fff", color: "var(--primary-color)" }}>
    //                         {slide.cta}<BiChevronRight className="fs-17" />
    //                     </span>
    //                 </div>
    //             </div>
    //         )} />
    //     </div>
    // )
}

const Specialists = ({ specialists, template = "SLIDER" }: { specialists: TTestsScansSpecialist[], template?: "SLIDER" | "GRID" }) => {
    if (specialists.length === 0) {
        return <></>
    }
    if (template === "GRID") {
        return (
            <div className="mt-2">
                <SectionHeading heading="Find By Test,Scan & Ultrasound Centers" />
                <div className="grid grid-cols-4 gap-2 px-2">
                    {specialists.map((specialist) =>
                        <Link href={specialist.seo_url} key={specialist.id} title={specialist.name} className="bg-white border border-color-grey rounded-md p-2 flex flex-col items-center gap-1">
                            <span className="h-9 w-9 rounded-full bg-primary-10 flex items-center justify-center">
                                <FaVials className="color-primary fs-17" />
                            </span>
                            <span className="fs-12 font-semibold text-center leading-4">{specialist.name}</span>
                        </Link>
                    )}
                </div>
            </div>
        )
    }
    return (
        <div className="bg-white mt-2">
            <SectionHeading heading="Find By Test,Scan & Ultrasound Centers" />
            <div className="flex w-full overflow-auto hide-scroll-bar py-2">
                {specialists.map((specialist) =>
                    <Link href={specialist.seo_url} key={specialist.id} title={specialist.name} className="px-2 shrink-0 flex flex-col items-center gap-1" style={{ width: "5.5rem" }}>
                        <img src={doctorSpecialityIcon(specialist.icon)} alt={specialist.name} className="h-12 w-12 rounded-full border" />
                        <span className="fs-12 text-center leading-4">{specialist.name}</span>
                    </Link>
                )}
            </div>
        </div>
    )
}
/* Reads as a benefit rather than another service chip, so it stays distinct from the services row above it. */
const HomeCollectionTag = ({ charge = 0 }: { charge?: number }) => {
    return (
        <div className="flex items-center gap-2 mx-2 mb-2 px-2 py-1 mt-2 rounded-md" style={{ backgroundColor: "rgba(12,151,12,.08)" }}>
            <FaHome className="shrink-0" style={{ color: "#0c970c" }} />
            <span className="fs-12 font-semibold" style={{ color: "#0c970c" }}>
                {charge > 0 ?
                    <>Home sample collection at <PriceFormat amount={charge} symbol={true} /></>
                    : "Free home sample collection"}
            </span>
        </div>
    )
}
/* Brand affiliation is a trust signal, so it sits directly under the center name in its own colour. */
const PartnerWithTag = ({ brand }: { brand: string }) => {
    return (
        <span className="flex items-center gap-1 fs-12 font-semibold self-start px-2 mt-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            <FaHandshake className="shrink-0" />{brand}
        </span>
    )
}
/* Same orange offer treatment the medicine store list uses for discount_msg. */
const DiscountMessage = ({ message }: { message: string }) => {
    return (
        <div className="mx-2 mt-2 mb-2 px-2 py-1 rounded-md bg-orange-50 border border-orange-200">
            <span className="fs-12 font-medium text-orange-700">🎉 {message}</span>
        </div>
    )
}
const RecommendedByDoctors = ({ doctors }: { doctors: string[] }) => {
    if (doctors.length === 0) {
        return <></>
    }
    return (
        <div className="flex flex-wrap items-center gap-1">
            {doctors.slice(0, 2).map((doctor, i) =>
                <span key={`doctor-${i}`} className="fs-12 font-semibold px-2 rounded-full bg-orange-100 text-orange-700 border border-orange-200">{doctor}</span>
            )}
            {doctors.length > 2 && <span className="fs-12 color-text-light">+{doctors.length - 2} more</span>}
        </div>
    )
}
const LabsTestsScansCenters = (centers: TClinic[], viewType: string) => {
    return (
        <>
            {centers.map((center) => {
                return (
                    <div className="bg-white border border-color-grey rounded-md shadow-md mb-2" key={center.id} data-href={center.seo_url}>
                        <div className="flex gap-3 px-2 py-2">
                            <div className="flex flex-col grow">
                                <Link href={center.seo_url} className="font-bold fs-16 color-primary">{center.name}</Link>
                                <span className="flex items-center gap-1 fs-13">
                                    <FaMapMarkerAlt className="color-primary" />{center.locality}, {center.city}
                                </span>
                                {/* nothing shows until the centre has public reviews. an invented
                                    rating is worse than no rating on a page people choose a lab from */}
                                {center.avg_rating ?
                                    <span className="flex items-center gap-2 fs-13 mt-1">
                                        <span className="flex items-center gap-1">
                                            <FaStar style={{ color: "#f5a623" }} />{center.avg_rating.toFixed(1)}
                                        </span>
                                        {center.rating_cnt ?
                                            <span className="color-text-light">
                                                ({center.rating_cnt} {center.rating_cnt === 1 ? "review" : "reviews"})
                                            </span>
                                            : <></>}
                                    </span>
                                    : <></>}
                                <span className="flex items-center gap-1 fs-13 mt-1">
                                    <FaClock className="color-primary" />08:00 AM - 08:00 PM
                                </span>
                            </div>
                            <span className="h-16 w-16 rounded-md bg-primary-10 flex items-center justify-center shrink-0">
                                <FaMicroscope className="color-primary fs-20" />
                            </span>
                        </div>
                        <div className="flex gap-2 px-2">
                            {center.partner_with ? <PartnerWithTag brand={center.partner_with} /> : <></>}
                            {center.recommended_doctors ? <RecommendedByDoctors doctors={(center.recommended_doctors || "").split(",").map((d) => d.trim()).filter((d) => d !== "")} /> : <></>}
                        </div>
                        <div className="flex flex-wrap gap-1 px-2 mt-2">
                            {(center.services || []).map((service) =>
                                <span className="chip fs-12" key={service}>{service}</span>
                            )}
                        </div>
                        {center.discount_msg ? <DiscountMessage message={center.discount_msg} /> : <></>}
                        {center.sample_home_collection ?
                            <HomeCollectionTag charge={center.sample_home_collection_charge} />
                            : <></>}
                        {/* both of these were inert: the anchor had no href and the button had no
                            handler. booking is doctor wise, not centre wise, so the second one
                            sends the patient to the centre's page instead of pretending to book. */}
                        <div className="flex gap-2 px-2 py-2">
                            {center.mobile || center.alt_mob_no ?
                                <TrackedLink href={`tel:${center.mobile || center.alt_mob_no}`}
                                    ev_nm="call_click" section_name="labs_tests_scans_centers"
                                    className="button grow flex-1 items-center gap-2" data-variant="outlined">
                                    <BiPhone />Call Now
                                </TrackedLink>
                                : <></>}
                            <Link href={center.seo_url} className="button flex-1 items-center justify-center gap-1">
                                View Details<BiChevronRight />
                            </Link>
                        </div>
                    </div>
                )
            })}
        </>
    )
}
const LabsTestsScansMobile = ({ state, city, pageData }: TProps) => {
    return (
        <>
            <Header template="SUBPAGE" heading={`Labs, Tests & Scans in ${city}`} state={state} city={city} showSearch={true} showProfile={true} />
            {/* defaults guard against cache files written before these keys existed */}
            {pageData.banners.length>0 ? <Hero banners={pageData.banners || []} />:<></>}
            {pageData.specialists.length>0 ?<Specialists specialists={pageData.specialists || []} template="GRID" />:<></>}
            {/* <div className="mt-2">
                <SectionHeading heading="Health Checkup Packages" />
                <div className="flex gap-2 overflow-auto hide-scroll-bar px-2 pb-1">
                    {packages.map((pkg) =>
                        <div className="bg-white border border-color-grey rounded-md p-2 shrink-0 flex flex-col gap-1" style={{ width: "70%" }} key={pkg.name}>
                            {pkg.tag && <span className="badge primary fs-12 self-start">{pkg.tag}</span>}
                            <span className="font-semibold fs-16 leading-5">{pkg.name}</span>
                            <span className="fs-12 color-text-light">Includes {pkg.tests} tests</span>
                            <span className="flex items-center gap-2 mt-1">
                                <span className="font-semibold fs-17"><PriceFormat amount={pkg.price} symbol={true} /></span>
                                <span className="fs-13 color-text-light line-through"><PriceFormat amount={pkg.mrp} symbol={true} /></span>
                                <Discount price={pkg.price} mrp={pkg.mrp} />
                            </span>
                            <button className="button mt-1">Book Package</button>
                        </div>
                    )}
                </div>
            </div> */}
            {pageData.sections.map((section, i) => <React.Fragment key={`section-${i}`}>
                {section.section_type === "testscan" ? <>
                    <SectionHeading heading={section.heading} />
                    <div className="px-2">
                        {LabsTestsScansCenters(section.centers || [], section.viewType)}
                    </div>
                </> : <></>}
            </React.Fragment>)}
            {/* <div className="mt-2">
                <SectionHeading heading="Popular Tests">
                    <Link href={`/${state}/${city}/labs-tests-scans`} className="button inline-flex items-center ml-auto" data-variant="contained" data-size="xs">
                        View All<BiChevronRight className="fs-17" />
                    </Link>
                </SectionHeading>
                <div className="grid grid-cols-2 gap-2 px-2">
                    {popularTests.map((test) =>
                        <div className="bg-white border border-color-grey rounded-md p-2 flex flex-col gap-1" key={test.name}>
                            <span className="flex items-center gap-1 fs-12 color-text-light">
                                <FaFlask className="color-primary" />{test.parameters} parameters
                            </span>
                            <span className="font-semibold leading-5">{test.name}</span>
                            <span className="flex items-center gap-1 fs-12 color-text-light">
                                <FaClock className="color-primary" />Report in {test.reportIn}
                            </span>
                            <span className="flex items-center gap-2 mt-1">
                                <span className="font-semibold"><PriceFormat amount={test.price} symbol={true} /></span>
                                <span className="fs-12 color-text-light line-through"><PriceFormat amount={test.mrp} symbol={true} /></span>
                            </span>
                            <Discount price={test.price} mrp={test.mrp} />
                            <button className="button mt-1" data-variant="outlined" data-size="xs">Book Now</button>
                        </div>
                    )}
                </div>
            </div> */}
        </>
    )
}
export default LabsTestsScansMobile;
