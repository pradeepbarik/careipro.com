import { Suspense } from "react";
import Link from "next/link";
import { BiChevronRight, BiCurrentLocation } from "react-icons/bi";
import { TfetchDoctorsResponse, TConsultTimingsData } from "@/lib/hooks/useDoctors";
import { capitalizeFirstLetter } from "@/lib/helper/format-text";
import { doctorsBySpecialistPageUrl, cityPageLink } from "@/lib/helper/link";
import CategoriesFooter from "@/app/components/mobile/footer/categories";
import { LandscapeAd, PortraitAd, WideAd } from "@/app/components/mobile/ads-container";
import HelpMeChoose from "@/app/components/mobile/help-me-choose";
import BannerWithStories from "@/app/components/desktop/banner-stories";
import DoctorResults from "./doctor-results";

const SectionHeading = ({ heading }: { heading: string }) => (
    <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-6 bg-primary rounded-full"></div>
        <h2 className="text-lg font-bold text-gray-800">{heading}</h2>
    </div>
);

const DoctorListDesktop = ({ params, data, consultTimings }: { params: any, data: TfetchDoctorsResponse, consultTimings: TConsultTimingsData }) => {
    const doctors = data.doctors.map((dr) => ({
        ...dr,
        consult_dates: consultTimings[dr.service_location_id]?.consult_dates ?? []
    }));
    const city = capitalizeFirstLetter(params.city || '');
    return (
        <div className="min-h-screen bg-gray-100">
            <main className="max-w-7xl mx-auto px-4 py-5">
                {/* breadcrumb, the same trail the ld+json on the page describes */}
                {/* same pairing the city home opens with, banners beside the stories rail */}
                {/* <BannerWithStories city={city} className="mb-5" stories={[
                    {
                        id: 0,
                        title: "Find trusted doctors, clinics, hospitals and home care services near you.",
                        thumbnail: "/images/placeholder/clinic-stories-placeholder.png",
                        href: "https://youtube.com/shorts/l2tLb4F038c?si=M4x4rKyrXk0Uexhu",
                        media_type: "video"
                    },{
                        id: 1,
                        title: "Careipro is a healthcare platform that connects patients with trusted doctors, clinics, hospitals and home care services.",
                        thumbnail: "/images/placeholder/clinic-stories-placeholder.png",
                        href: "https://youtube.com/shorts/DbS0T1ey_sE?si=APHsjhl9U2M8QTlD",
                        media_type: "video"
                    }
                ]} /> */}

                <h1 className="text-2xl font-bold text-gray-900 leading-tight">{data.seo_dt.h1}</h1>
                <p className="fs-14 text-gray-500 mt-0.5 mb-4">
                    {doctors.length} {doctors.length === 1 ? 'doctor' : 'doctors'} available in {city}
                </p>

                <div className="mb-4">
                    <WideAd page_type="doctor_list" category_ids={params.cat_id} city={params.city} limit={1} showPlaceholder={false} ad_selection="random" />
                </div>

                {/* results take the bulk of the width, the rail beside them carries the ads */}
                <div className="grid grid-cols-[7fr_3fr] gap-5 items-start">
                    <div className="min-w-0">
                        <DoctorResults
                            doctors={doctors}
                            city={params.city}
                            specialist_name={data.specialist_name}
                            markets={data.cityMarkets}
                            nearbyCities={data.neabyCities}
                            brandedHospitals={data.branded_hospitals || []}
                        />
                    </div>

                    <aside className="min-w-0 sticky top-[104px] flex flex-col gap-4">
                        <PortraitAd page_type="doctor_list" category_ids={params.cat_id} city={params.city} limit={1} showPlaceholder={false} ad_selection="random" />

                        {data.neabyCities.length > 0 && (
                            <div className="bg-white rounded-xl border border-gray-200 p-4">
                                <h2 className="flex items-center gap-2 font-bold text-gray-800 fs-15 mb-3">
                                    <BiCurrentLocation className="text-primary shrink-0" />
                                    {data.specialist_name} nearby
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {data.neabyCities.map((nearby) => (
                                        <Link
                                            key={nearby.city}
                                            href={doctorsBySpecialistPageUrl(params.seo_url, `CATG${params.cat_id}-${params.group_cat}`, params.state, nearby.city)}
                                            className="fs-13 px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-gray-700 hover:border-primary hover:text-primary transition-colors"
                                        >
                                            {capitalizeFirstLetter(nearby.city)}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {data.cityMarkets.length > 0 && (
                            <div className="bg-white rounded-xl border border-gray-200 p-4">
                                <h2 className="flex items-center gap-2 font-bold text-gray-800 fs-15 mb-3">
                                    <BiCurrentLocation className="text-primary shrink-0" />
                                    Other areas of {city}
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {data.cityMarkets.map((market) => (
                                        <Link
                                            key={market.market_name}
                                            href={doctorsBySpecialistPageUrl(params.seo_url, `CATG${params.cat_id}-${params.group_cat}`, params.state, params.city, { market_name: market.market_name })}
                                            className="fs-13 px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-gray-700 hover:border-primary hover:text-primary transition-colors"
                                        >
                                            {capitalizeFirstLetter(market.market_name || '')}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        <LandscapeAd page_type="doctor_list" category_ids={params.cat_id} city={params.city} limit={1} />
                    </aside>
                </div>
                {data.faqs && data.faqs.length > 0 && (
                    <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
                        <SectionHeading heading="Frequently Asked Questions" />
                        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                            {data.faqs.map((faq, index) => (
                                <details key={index} className="group border border-gray-100 rounded-lg overflow-hidden h-fit">
                                    <summary className="flex items-start gap-3 cursor-pointer p-3 hover:bg-gray-50 transition-colors">
                                        <span className="shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center fs-12 font-bold">
                                            {index + 1}
                                        </span>
                                        <span className="font-medium text-gray-800 fs-14 leading-relaxed">{faq.question}</span>
                                    </summary>
                                    <div className="px-3 pb-3">
                                        <p className="pl-9 border-l-2 border-primary/20 ml-3 text-gray-600 fs-14 leading-relaxed">{faq.answer}</p>
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                )}
                <nav aria-label="Breadcrumb" className="flex items-center gap-1 fs-13 text-gray-500 mt-5">
                    <Link href="/" className="hover:text-primary">Careipro</Link>
                    <BiChevronRight className="shrink-0" />
                    <Link href={cityPageLink(params.state, params.city)} className="hover:text-primary">{city}</Link>
                    <BiChevronRight className="shrink-0" />
                    <Link href={`/${params.state}/${params.city}/best-doctors`} className="hover:text-primary">Doctors</Link>
                    <BiChevronRight className="shrink-0" />
                    <span className="text-gray-700 font-medium">{data.specialist_name}</span>
                </nav>
            </main>
            {/* the band the footer used to wrap, the footer itself is in the layout now */}
            <div className="bg-gray-100 text-gray-800 py-8">
                <div className="max-w-7xl mx-auto px-4">
                <Suspense>
                    <CategoriesFooter heading="Find Doctors By Specialist" state={params.state} city={params.city} market_name={params.town} group_category="DOCTOR" page="DOCTORS" />
                </Suspense>
                </div>
            </div>
        </div>
    );
};

export default DoctorListDesktop;
