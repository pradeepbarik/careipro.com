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
    let url = `https://careipro.com/${searchParams.state.toLowerCase().replace(" ", "-")}/${searchParams.city.toLowerCase().replace(" ", "-")}/${searchParams.seo_url}-In-${searchParams.market_name.replace(" ", "-")}/DR${searchParams.doctor_id}-SL${searchParams.service_loc_id}-C${searchParams.clinic_id}`;

    if (searchParams.sub_page) {
        url += `/${searchParams.sub_page}`;
    }
    return {
        title: data.data.seo_dt.title,
        description: data.data.seo_dt.description,
        openGraph: {
            title: data.data.seo_dt.title,
            description: data.data.seo_dt.description,
            url: `${url}`,
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
            canonical: `${url}`
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
   
    if (device.type === "mobile" || 1 == 1) {
        return (<>
            <Script
                key="json-ld-site-detail"
                id="json-ld-site-detail"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "@id": `https://careipro.com/${searchParams.state.toLowerCase().replace(" ", "-")}/${searchParams.city.toLowerCase().replace(" ", "-")}/best-doctors`,
                        "name": "Best Doctors in " + searchParams.city + " Of " + searchParams.state + " | Careipro",
                        "url": `https://careipro.com/${searchParams.state.toLowerCase().replace(" ", "-")}/${searchParams.city.toLowerCase().replace(" ", "-")}/best-doctors`,
                        "description": `Find the best doctors in ${searchParams.city}, ${searchParams.state} with Careipro. Read reviews, check ratings, and book appointments with top-rated doctors near you. Your health is our priority!`,
                        "inLanguage": "en-IN",
                        "isPartOf": {
                            "@type": "WebSite",
                            "name": "Careipro",
                            "url": "https://careipro.com/",
                        },
                    })
                }}
            />
            <Script
                key={`json-ld-doctor-${searchParams.doctor_id}-${searchParams.clinic_id}`}
                id="json-ld-doctor-detail"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: data.data.seo_dt.ldjson }}
            />
            <DoctorDetailMobile data={data.data} searchParams={searchParams} availableData={availableData} cookies={cookies} />
            <PageVisitLogger data={{
                page_type: "detail",
                page_name: "doctor_detail",
                section_name: "initial_load",
                state: searchParams.state,
                city: searchParams.city,
                doctor_id: searchParams.doctor_id,
                clinic_id: searchParams.clinic_id,
                vertical: "DOCTOR"
            }} />
        </>)
    } else {
        return (<>
            doctor detail
        </>)
    }

}
export default DoctorDetail;