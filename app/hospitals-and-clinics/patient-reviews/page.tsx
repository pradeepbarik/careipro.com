import type { Metadata } from "next";
import Link from "next/link";
import { BiArrowBack, BiClinic } from "react-icons/bi";
import { fetchClinicReviews } from "@/lib/hooks/useClinics";
import { capitalizeEachWordFirstLetter } from "@/lib/helper/format-text";
import ClinicReviews from "../clinic-detail/mobile/clinic-reviews";

type TSearchParams = {
    clinic_id: string,
    state: string,
    city: string,
    seo_url: string,
    market_name: string,
    state_city: string,
    /* C, TS, CT or PTY, part of the bid the cache file is stored under */
    business_type: string
}
/* bid is business_type + clinic_id + state_city, eg C8-ORBHC or TS148-ORBHC. Defaulting
   to C would send every lab and caretaker listing down the api fallback path. */
const cacheParams = (searchParams: TSearchParams) => ({
    state: searchParams.state,
    city: searchParams.city,
    clinic_bid: `${searchParams.business_type || "C"}${searchParams.clinic_id}-${searchParams.state_city}`,
    clinic_id: parseInt(searchParams.clinic_id)
});
export async function generateMetadata({ searchParams }: { searchParams: TSearchParams }): Promise<Metadata> {
    const data = await fetchClinicReviews(cacheParams(searchParams));
    const clinicName = capitalizeEachWordFirstLetter(data.clinic_info.name);
    const city = capitalizeEachWordFirstLetter(searchParams.city || "");
    return {
        title: `Patient Reviews of ${clinicName}${city ? `, ${city}` : ""} - careipro.com`,
        description: `Read ${data.reviews.length} patient reviews of ${clinicName}. See ratings, what patients said about the doctors and the clinic before you book.`,
        robots: {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true }
        },
        alternates: {
            canonical: `https://careipro.com${data.clinic_info.pageUrl}/patients-reviews`
        }
    }
}
const PatientReviewsPage = async ({ searchParams }: { searchParams: TSearchParams }) => {
    const data = await fetchClinicReviews(cacheParams(searchParams));
    return (
        /* pb clears the fixed bar, otherwise the last review sits under it */
        <div className="bg-gray-50 min-h-screen pb-24">
            <div className="sticky top-0 z-[5] bg-white border-b border-gray-200 px-3 py-3 flex items-center gap-2">
                <Link href={data.clinic_info.pageUrl} aria-label="Back to clinic"
                    className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <BiArrowBack className="fs-18 text-gray-800" />
                </Link>
                <span className="flex flex-col min-w-0">
                    <h1 className="fs-16 font-bold text-gray-900 one-line">Patient Reviews</h1>
                    <span className="fs-12 text-gray-500 one-line">{capitalizeEachWordFirstLetter(data.clinic_info.name)}</span>
                </span>
            </div>
            <section className="bg-white rounded-xl mx-3 mt-3 p-4 shadow-sm border border-gray-100">
                {/* the same component the clinic page uses, so a review reads identically in
                    both places. allReviewsUrl is this page, so its own button never shows */}
                <ClinicReviews reviews={data.reviews} spread={data.rating_spread}
                    rating={null} allReviewsUrl="" />
            </section>
            {/* z-[5] keeps it under SlideUpModal's overlay at 10, the same rule the clinic
                page follows, so any sheet opened from here covers it */}
            <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 px-3 py-3 z-[5]">
                <Link href={data.clinic_info.pageUrl}
                    className="flex items-center justify-center gap-2 py-[10px] rounded-lg bg-cyan-600 text-white fs-14 font-bold">
                    <BiClinic className="fs-18" />View Clinic Details
                </Link>
            </div>
        </div>
    )
}
export default PatientReviewsPage;
