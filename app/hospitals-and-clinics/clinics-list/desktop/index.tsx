import { Suspense } from "react";
import Link from "next/link";
import { BiChevronRight } from "react-icons/bi";
import { FaUserMd } from "react-icons/fa";
import { TClinicTopDoctor } from "@/lib/types/clinic";
import { TfetchClinicsListResponse } from "@/lib/hooks/useClinics";
import { capitalizeFirstLetter, formatDoctorName } from "@/lib/helper/format-text";
import { cityPageLink } from "@/lib/helper/link";
import { doctorProfilePic } from "@/lib/image";
import CategoriesFooter from "@/app/components/mobile/footer/categories";
import { LandscapeAd, PortraitAd, WideAd } from "@/app/components/mobile/ads-container";
import BannerWithStories from "@/app/components/desktop/banner-stories";
import NoResults from "../no-results";
import ClientHandler from "../../client-handler";
import ClinicResults from "./clinic-results";

type TTopDoctorsData = { [clinic_id: string]: { total_doctor: number, topDoctors: TClinicTopDoctor[] } };
type TProps = { params: any, data: TfetchClinicsListResponse, topDoctorsData: TTopDoctorsData };

//how many doctors the rail carries before it becomes a list of its own
const RAIL_DOCTOR_LIMIT = 6;

/* The doctors sitting in the clinics on this page, best ranked first. The api sends them keyed by
   clinic for the cards, so the rail flattens that and drops the repeats a doctor who consults at
   two of the listed clinics would otherwise cause. */
const railDoctors = (topDoctorsData: TTopDoctorsData): TClinicTopDoctor[] => {
    const seen = new Set<number>();
    const doctors: TClinicTopDoctor[] = [];
    for (const entry of Object.values(topDoctorsData || {})) {
        for (const doctor of entry?.topDoctors || []) {
            if (seen.has(doctor.id)) continue;
            seen.add(doctor.id);
            doctors.push(doctor);
        }
    }
    return doctors.sort((a, b) => a.seo_rank - b.seo_rank).slice(0, RAIL_DOCTOR_LIMIT);
};

const ClinicListDesktop = ({ params, data, topDoctorsData }: TProps) => {
    const city = capitalizeFirstLetter(params.city || '');
    /* the admin can write a heading per category. nothing written falls back to the specialist
       name, the same rule the mobile page follows */
    const heading = data.h1_tag || data.specialist_name;
    const doctors = railDoctors(topDoctorsData);

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="max-w-7xl mx-auto px-4 py-5">
                {/* same pairing the city home and the doctor listing open with */}
                <BannerWithStories city={city} className="mb-5" stories={[
                    {
                        id: 0,
                        title: "Find trusted doctors, clinics, hospitals and home care services near you.",
                        thumbnail: "/images/placeholder/clinic-stories-placeholder.png",
                        href: "https://youtube.com/shorts/l2tLb4F038c?si=M4x4rKyrXk0Uexhu",
                        media_type: "video"
                    }, {
                        id: 1,
                        title: "Careipro is a healthcare platform that connects patients with trusted doctors, clinics, hospitals and home care services.",
                        thumbnail: "/images/placeholder/clinic-stories-placeholder.png",
                        href: "https://youtube.com/shorts/DbS0T1ey_sE?si=APHsjhl9U2M8QTlD",
                        media_type: "video"
                    }
                ]} />

                <h1 className="text-2xl font-bold text-gray-900 leading-tight">{heading}</h1>
                <p className="fs-14 text-gray-500 mt-0.5 mb-4">
                    {data.clinics.length > 0
                        ? `${data.clinics.length} ${data.clinics.length === 1 ? 'listing' : 'listings'} in ${city} with timings, doctors and contact details`
                        : `Timings, doctors and contact details in ${city}`}
                </p>

                {/* WideAd holds a 2:1 box, which is a banner in a phone column and a 624px billboard
                    across the full desktop width. Capping the width keeps the slot filled without
                    pushing the first result below the fold */}
                {/* an empty category is a dead end, so it asks the visitor for the business they came
                    looking for instead of showing an empty filter bar over nothing */}
                {data.clinics.length === 0 ? (
                    <div className="max-w-xl mx-auto">
                        <NoResults
                            specialistName={data.specialist_name}
                            state={params.state}
                            city={params.city}
                            catId={params.cat_id}
                            groupCategory={params.group_cat}
                        />
                    </div>
                ) : (
                    /* results take the bulk of the width, the rail beside them carries the ads */
                    <div className="grid grid-cols-[7fr_3fr] gap-5 items-start">
                        <div className="min-w-0">
                            <ClinicResults
                                clinics={data.clinics}
                                topDoctorsData={topDoctorsData}
                                city={params.city}
                                specialistName={data.specialist_name}
                            />
                        </div>

                        <aside className="min-w-0 sticky top-[104px] flex flex-col gap-4">
                            <PortraitAd page_type="clinic_list" category_ids={params.cat_id} city={params.city} limit={1} showPlaceholder={false} ad_selection="random" />

                            {doctors.length > 0 && (
                                <div className="bg-white rounded-xl border border-gray-200 p-4">
                                    <h2 className="flex items-center gap-2 font-bold text-gray-800 fs-15 mb-3">
                                        <FaUserMd className="text-primary shrink-0" />
                                        Doctors in {city}
                                    </h2>
                                    <div className="flex flex-col gap-2">
                                        {doctors.map((doctor) => (
                                            <Link
                                                key={doctor.id}
                                                href={doctor.seo_url}
                                                title={doctor.name}
                                                className="group flex items-center gap-2.5 rounded-lg border border-gray-100 p-2 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                                            >
                                                <img
                                                    src={doctorProfilePic(doctor.image || "")}
                                                    alt={doctor.name}
                                                    className="h-9 w-9 rounded-full object-cover shrink-0 bg-gray-50"
                                                />
                                                <span className="flex flex-col min-w-0">
                                                    <span className="one-line fs-13 font-semibold text-gray-900 group-hover:text-primary transition-colors">
                                                        {formatDoctorName(doctor.short_name || doctor.name)}
                                                    </span>
                                                    <span className="one-line fs-12 text-gray-500">{doctor.position || doctor.clinic_name}</span>
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <LandscapeAd page_type="clinic_list" category_ids={params.cat_id} city={params.city} limit={1} />
                        </aside>
                    </div>
                )}

                <nav aria-label="Breadcrumb" className="flex items-center gap-1 fs-13 text-gray-500 mt-5">
                    <Link href="/" className="hover:text-primary">Careipro</Link>
                    <BiChevronRight className="shrink-0" />
                    <Link href={cityPageLink(params.state, params.city)} className="hover:text-primary">{city}</Link>
                    <BiChevronRight className="shrink-0" />
                    <Link href={`/${params.state}/${params.city}/hospitals-and-clinics`} className="hover:text-primary">Hospitals &amp; Clinics</Link>
                    <BiChevronRight className="shrink-0" />
                    <span className="text-gray-700 font-medium">{data.specialist_name}</span>
                </nav>
            </main>

            {/* the band the footer used to wrap, the footer itself is in the layout now */}
            <div className="bg-gray-100 text-gray-800 py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <Suspense fallback={<></>}>
                        <CategoriesFooter heading="Find Clinics By Category" state={params.state} city={params.city} market_name={params.market_name} group_category="CLINIC" page="CLINICS" />
                    </Suspense>
                    <Suspense fallback={<></>}>
                        <CategoriesFooter heading="Find Doctors By Specialist" state={params.state} city={params.city} market_name={params.market_name} group_category="DOCTOR" page="CLINICS" />
                    </Suspense>
                </div>
            </div>

            <ClientHandler />
        </div>
    );
};

export default ClinicListDesktop;
