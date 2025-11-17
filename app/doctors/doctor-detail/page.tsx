import dynamic from 'next/dynamic';
import Script from 'next/script';
import type { Metadata } from "next";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import { fetchDoctorDetail, fetchDoctorAvailableTime } from '@/lib/hooks/useDoctors';
import { TsearchParams } from './types';
import PageVisitLogger from '@/app/components/client-components/page-visit-logger';
import { doctorProfilePic } from '@/lib/image';
const DoctorDetailMobile = dynamic(() => import('./mobile'));
export async function generateMetadata({ searchParams }: { searchParams: any }): Promise<Metadata> {
    const data = await fetchDoctorDetail({ doctor_id: searchParams.doctor_id, clinic_id: searchParams.clinic_id, service_loc_id: searchParams.service_loc_id, seo_url: searchParams.seo_url, market_name: searchParams.market_name, state: searchParams.state, city: searchParams.city })
    return {
        title: data.data.seo_dt.title,
        description: data.data.seo_dt.description,
        openGraph: {
            title: data.data.seo_dt.title,
            description: data.data.seo_dt.description,
            url: `https://careipro.com/${searchParams.seo_url}-At-${searchParams.market_name}-In-${searchParams.city}-Of-${searchParams.state}/DR${searchParams.doctor_id}-SL${searchParams.service_loc_id}-C${searchParams.clinic_id}`,
            siteName: 'Careipro',
            images: [
                doctorProfilePic(data.data.profile_pic)
            ],
            locale: 'en_US',
            type: 'website',
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            }
        },
        alternates: {
            canonical: `https://careipro.com/${searchParams.seo_url}-At-${searchParams.market_name}-In-${searchParams.city}-Of-${searchParams.state}/DR${searchParams.doctor_id}-SL${searchParams.service_loc_id}-C${searchParams.clinic_id}`
        }
    }
}
const DoctorDetail = async ({ searchParams }: {
    searchParams: TsearchParams
}) => {
    const { device, cookies } = useDeviceInfo();
    const [data, availableData] = await Promise.all([
        fetchDoctorDetail({ doctor_id: searchParams.doctor_id, clinic_id: searchParams.clinic_id, service_loc_id: searchParams.service_loc_id, seo_url: searchParams.seo_url, market_name: searchParams.market_name, state: searchParams.state, city: searchParams.city }),
        fetchDoctorAvailableTime(searchParams.service_loc_id)
    ])
    const ldJson = {
        "@context": "https://schema.org",
        "@type": "Doctor",
        "name": data.data.doctor_name,
        "medicalSpecialty": data.data.specialization?.split(',').map((spec: string) => spec.trim()) || [],
        "description": data.data.seo_dt.description,
        "url": `https://careipro.com/${data.data.seo_dt.seo_url}`,
        "image": doctorProfilePic(data.data.profile_pic),
        "address": {
            "@type": "PostalAddress",
            "addressLocality": searchParams.city,
            "addressRegion": searchParams.state,
            "addressCountry": "India",
        },
        "affiliation": {
            "@type": "MedicalClinic",
            "name": data.data.clinic_name,
            "address": {
                "@type": "PostalAddress",
                "addressLocality": data.data.clinic_city,
                "addressRegion": data.data.clinic_state,
                "addressCountry": "India",
            }
        },
        "telephone": data.data.clinic_mobile,
        // "rating": {
        //     "@type": "Rating",
        //     "ratingValue": data.data.average_rating.toString(),
        //     "bestRating": "5",
        //     "ratingCount": data.data.total_reviews.toString()
        // }
    };
    if (device.type === "mobile" || 1==1) {
        return (<>
            <Script
                id="json-ld-site-detail" // Unique ID for the script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "Careipro",
                        "url": "https://careipro.com/",
                    })
                }}
                strategy="beforeInteractive"
            />
            <Script
                id="json-ld-doctor-detail" // Unique ID for the script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: data.data.seo_dt.ldjson || JSON.stringify(ldJson) }}
                strategy="beforeInteractive"
            />
            <DoctorDetailMobile data={data.data} searchParams={searchParams} availableData={availableData} cookies={cookies} />
            <PageVisitLogger data={{
                page_name: "doctor_detail",
                state: searchParams.state,
                city: searchParams.city,
                doctor_id: searchParams.doctor_id,
                clinic_id: searchParams.clinic_id
            }} />
        </>)
    } else {
        return (<>
            doctor detail
        </>)
    }

}
export default DoctorDetail;