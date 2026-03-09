import dynamic from 'next/dynamic';
import Script from 'next/script';
import type { Metadata } from "next";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import { fetchDoctorDetail, fetchDoctorAvailableTime } from '@/lib/hooks/useDoctors';
import { TsearchParams } from './types';
import PageVisitLogger from '@/app/components/client-components/page-visit-logger';
import { doctorProfilePic } from '@/lib/image';
const DoctorDetailMobile = dynamic(() => import('./mobile'));
const formatOpenHours = ({
    is_available,
    first_session_start_time,
    first_session_end_time,
    second_session_start_time,
    second_session_end_time
}: {
    is_available: boolean,
    first_session_start_time: string,
    first_session_end_time: string,
    second_session_start_time: string,
    second_session_end_time: string
}) => {
    let openHours = "";
    if (is_available) {
        if (first_session_start_time && first_session_end_time) {
            openHours += `${first_session_start_time}-${first_session_end_time}`;
        }
        if (second_session_start_time && second_session_end_time) {
            if (openHours) {
                openHours += ",";
            }
            openHours += `${second_session_start_time}-${second_session_end_time}`;
        }
    } else {
        openHours = "Closed";
    }
    return openHours;
}
const consultingTimingFaqAnswer = ({
    availability,
    monday_1st_session_start,
    monday_1st_session_end,
    monday_2nd_session_start,
    monday_2nd_session_end,
    tuesday_1st_session_start,
    tuesday_1st_session_end,
    tuesday_2nd_session_start,
    tuesday_2nd_session_end,
    wednesday_1st_session_start,
    wednesday_1st_session_end,
    wednesday_2nd_session_start,
    wednesday_2nd_session_end,
    thursday_1st_session_start,
    thursday_1st_session_end,
    thursday_2nd_session_start,
    thursday_2nd_session_end,
    friday_1st_session_start,
    friday_1st_session_end,
    friday_2nd_session_start,
    friday_2nd_session_end,
    saturday_1st_session_start,
    saturday_1st_session_end,
    saturday_2nd_session_start,
    saturday_2nd_session_end,
    sunday_1st_session_start,
    sunday_1st_session_end,
    sunday_2nd_session_start,
    sunday_2nd_session_end,
    display_consulting_timing,
    doctor_name
}: {
    availability: string,
    monday_1st_session_start: string,
    monday_1st_session_end: string,
    monday_2nd_session_start: string,
    monday_2nd_session_end: string,
    tuesday_1st_session_start: string,
    tuesday_1st_session_end: string,
    tuesday_2nd_session_start: string,
    tuesday_2nd_session_end: string,
    wednesday_1st_session_start: string,
    wednesday_1st_session_end: string,
    wednesday_2nd_session_start: string,
    wednesday_2nd_session_end: string,
    thursday_1st_session_start: string,
    thursday_1st_session_end: string,
    thursday_2nd_session_start: string,
    thursday_2nd_session_end: string,
    friday_1st_session_start: string,
    friday_1st_session_end: string,
    friday_2nd_session_start: string,
    friday_2nd_session_end: string,
    saturday_1st_session_start: string,
    saturday_1st_session_end: string,
    saturday_2nd_session_start: string,
    saturday_2nd_session_end: string,
    sunday_1st_session_start: string,
    sunday_1st_session_end: string,
    sunday_2nd_session_start: string,
    sunday_2nd_session_end: string,
    display_consulting_timing: null | Array<{ label: string, value: string[] }>,
    doctor_name: string
}) => {
    if (display_consulting_timing && Array.isArray(display_consulting_timing)) {
        return `Consultation timings for ${doctor_name} are ` + display_consulting_timing.map((timing: any) => `${timing.label}: ${timing.value.join(",")}`).join("; ");
    }
    if (availability === "per_week") {
        return `Consultation timings for ${doctor_name} are Monday: ${monday_1st_session_start}-${monday_1st_session_end}${monday_2nd_session_start ? "," + monday_2nd_session_start + "-" + monday_2nd_session_end : ""}; Tuesday: ${tuesday_1st_session_start}-${tuesday_1st_session_end}${tuesday_2nd_session_start ? "," + tuesday_2nd_session_start + "-" + tuesday_2nd_session_end : ""}; Wednesday: ${wednesday_1st_session_start}-${wednesday_1st_session_end}${wednesday_2nd_session_start ? "," + wednesday_2nd_session_start + "-" + wednesday_2nd_session_end : ""}; Thursday: ${thursday_1st_session_start}-${thursday_1st_session_end}${thursday_2nd_session_start ? "," + thursday_2nd_session_start + "-" + thursday_2nd_session_end : ""}; Friday: ${friday_1st_session_start}-${friday_1st_session_end}${friday_2nd_session_start ? "," + friday_2nd_session_start + "-" + friday_2nd_session_end : ""}; Saturday: ${saturday_1st_session_start}-${saturday_1st_session_end}${saturday_2nd_session_start ? "," + saturday_2nd_session_start + "-" + saturday_2nd_session_end : ""}; Sunday: ${sunday_1st_session_start}-${sunday_1st_session_end}${sunday_2nd_session_start ? "," + sunday_2nd_session_start + "-" + sunday_2nd_session_end : ""}`;
    }
    return `Consultation timings for ${doctor_name} are not available`
}
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
    const ldjsonConditionalData: any = {}
    if (data.data.rating && data.data.rating_count) {
        ldjsonConditionalData["aggregateRating"] = {
            "@type": "AggregateRating",
            "ratingValue": data.data.rating,
            "reviewCount": data.data.rating_count
        }
        if (data.data.topReviews && data.data.topReviews.length > 0) {
            ldjsonConditionalData["review"] = data.data.topReviews.map((review) => ({
                "@type": "Review",
                "author": {
                    "@type": "Person",
                    "name": review.user_name
                },
                "datePublished": review.review_date,
                "reviewBody": review.experience,
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": review.rating
                }
            }));
        }
    }
    if (data.data.allSpecializations && data.data.allSpecializations) {
        if (data.data.allSpecializations["DISEASE"]) {
            ldjsonConditionalData["treats"] = data.data.allSpecializations["DISEASE"].map((disease) => {
                return {
                    "@type": "MedicalCondition",
                    "name": disease.name
                }
            })
        }
    }
    if (data.data.availability === "per_week") {
        ldjsonConditionalData["openingHoursSpecification"] = [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Monday",
                "opens": formatOpenHours({
                    is_available: data.data.monday ? true : false,
                    first_session_start_time: data.data.monday_1st_session_start,
                    first_session_end_time: data.data.monday_1st_session_end,
                    second_session_start_time: data.data.monday_2nd_session_start,
                    second_session_end_time: data.data.monday_2nd_session_end
                }),
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Tuesday",
                "opens": formatOpenHours({
                    is_available: data.data.tuesday ? true : false,
                    first_session_start_time: data.data.tuesday_1st_session_start,
                    first_session_end_time: data.data.tuesday_1st_session_end,
                    second_session_start_time: data.data.tuesday_2nd_session_start,
                    second_session_end_time: data.data.tuesday_2nd_session_end
                }),
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Wednesday",
                "opens": formatOpenHours({
                    is_available: data.data.wednesday ? true : false,
                    first_session_start_time: data.data.wednesday_1st_session_start,
                    first_session_end_time: data.data.wednesday_1st_session_end,
                    second_session_start_time: data.data.wednesday_2nd_session_start,
                    second_session_end_time: data.data.wednesday_2nd_session_end
                }),
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Thursday",
                "opens": formatOpenHours({
                    is_available: data.data.thursday ? true : false,
                    first_session_start_time: data.data.thursday_1st_session_start,
                    first_session_end_time: data.data.thursday_1st_session_end,
                    second_session_start_time: data.data.thursday_2nd_session_start,
                    second_session_end_time: data.data.thursday_2nd_session_end
                }),
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Friday",
                "opens": formatOpenHours({
                    is_available: data.data.friday ? true : false,
                    first_session_start_time: data.data.friday_1st_session_start,
                    first_session_end_time: data.data.friday_1st_session_end,
                    second_session_start_time: data.data.friday_2nd_session_start,
                    second_session_end_time: data.data.friday_2nd_session_end
                }),
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": formatOpenHours({
                    is_available: data.data.saturday ? true : false,
                    first_session_start_time: data.data.saturday_1st_session_start,
                    first_session_end_time: data.data.saturday_1st_session_end,
                    second_session_start_time: data.data.saturday_2nd_session_start,
                    second_session_end_time: data.data.saturday_2nd_session_end
                }),
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Sunday",
                "opens": formatOpenHours({
                    is_available: data.data.sunday ? true : false,
                    first_session_start_time: data.data.sunday_1st_session_start,
                    first_session_end_time: data.data.sunday_1st_session_end,
                    second_session_start_time: data.data.sunday_2nd_session_start,
                    second_session_end_time: data.data.sunday_2nd_session_end
                }),
            }
        ]
    } else if (data.data.display_consulting_timing && Array.isArray(data.data.display_consulting_timing)) {
        ldjsonConditionalData["openingHoursSpecification"] = data.data.display_consulting_timing.map((timing: any) => {
            return {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": timing.label,
                "opens": timing.value.join(",")
            }
        })
    }
    const faqLdjaonConditionalData = [];
    if(data.data.qualification_disp){
        faqLdjaonConditionalData.push({
            "@type": "Question",
            "name": "What are the qualifications of " + data.data.doctor_name + "?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": data.data.qualification_disp
            }
        })
    }
    if(data.data.topReviews && data.data.topReviews.length > 0){
        faqLdjaonConditionalData.push({
            "@type": "Question",
            "name": "What do patients say about " + data.data.doctor_name + "?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": `Patients have given an average rating of ${data.data.rating} out of 5 to ${data.data.doctor_name} based on ${data.data.rating_count} reviews. Some of the recent reviews include: ` + data.data.topReviews.map((review: any) => `${review.user_name} said "${review.experience}" and rated ${review.rating} out of 5`).join("; ")
            }
        })
    }
    const ldjson2 = {
        "@context": "https://schema.org",
        "@type": "Doctor",
        "@graph": [
            {
                "@type": "Doctor",
                "@id": `https://careipro.com/${data.data.seo_dt.seo_url}`,
                "name": data.data.doctor_name,
                "url": `https://careipro.com/${data.data.seo_dt.seo_url}`,
                "description": data.data.description || data.data.seo_dt.description,
                "telephone": data.data.clinic_mobile,
                "image": doctorProfilePic(data.data.profile_pic),
                "medicalSpecialty": data.data.specialization?.split(',').map((spec: string) => spec.trim()) || [],
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": data.data.clinic_location + ", " + data.data.clinic_market,
                    "addressLocality": searchParams.city,
                    "addressRegion": searchParams.state,
                    "addressCountry": "India",
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": data.data.location_lat,
                    "longitude": data.data.location_lng
                },
                "areaServed": {
                    "@type": "City",
                    "name": data.data.clinic_city
                },
                "knowsAbout": data.data.specialization?.split(',').map((spec: string) => spec.trim()) || [],
                "makesOffer": {
                    "@type": "Offer",
                    "name": "Doctor Consultation",
                    "price": data.data.service_charge,
                    "priceCurrency": "INR",
                    "availability": "https://schema.org/InStock",
                    "validFrom": new Date().toISOString()
                },
                "affiliation": {
                    "@type": "MedicalClinic",
                    "name": data.data.clinic_name,
                    "url": `https://careipro.com/${data.data.clinic_dtlpg_url}`,
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": data.data.clinic_location + ", " + data.data.clinic_market,
                        "addressLocality": data.data.clinic_city,
                        "addressRegion": data.data.clinic_state,
                        "addressCountry": "India",
                    }
                },
                "hospitalAffiliation": {
                    "@type": "Hospital",
                    "name": data.data.clinic_name,
                    "url": `https://careipro.com/${data.data.clinic_dtlpg_url}`,

                },
                "potentialAction": {
                    "@type": "ReserveAction",
                    "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": `https://careipro.com/${data.data.seo_dt.seo_url}?booking_appointment=1`,
                        "actionPlatform": [
                            "http://schema.org/DesktopWebPlatform",
                            "http://schema.org/MobileWebPlatform"
                        ]
                    },
                    "result": {
                        "@type": "Reservation",
                        "reservationStatus": "http://schema.org/ReservationConfirmed",
                        "name": "Appointment Booking with " + data.data.doctor_name
                    }
                },
                ...ldjsonConditionalData
            }, {
                "@type": "MedicalClinic",
                "@id": `https://careipro.com/${data.data.clinic_dtlpg_url}`,
                "name": data.data.clinic_name,
                "url": `https://careipro.com/${data.data.clinic_dtlpg_url}`,
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": data.data.clinic_location + ", " + data.data.clinic_market,
                    "addressLocality": data.data.clinic_city,
                    "addressRegion": data.data.clinic_state,
                    "addressCountry": "India",
                }
            }, {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://careipro.com/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Doctors in " + searchParams.city + " Of " + searchParams.state,
                        "item": `https://careipro.com/${searchParams.state.toLowerCase().replace(" ", "-")}/${searchParams.city.toLowerCase().replace(" ", "-")}/best-doctors`
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": data.data.doctor_name,
                        "item": `https://careipro.com/${data.data.seo_dt.seo_url}`
                    }
                ]
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What are the consultation timings for " + data.data.doctor_name + "?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": consultingTimingFaqAnswer({
                                availability: data.data.availability,
                                monday_1st_session_start: data.data.monday_1st_session_start,
                                monday_1st_session_end: data.data.monday_1st_session_end,
                                monday_2nd_session_start: data.data.monday_2nd_session_start,
                                monday_2nd_session_end: data.data.monday_2nd_session_end,
                                tuesday_1st_session_start: data.data.tuesday_1st_session_start,
                                tuesday_1st_session_end: data.data.tuesday_1st_session_end,
                                tuesday_2nd_session_start: data.data.tuesday_2nd_session_start,
                                tuesday_2nd_session_end: data.data.tuesday_2nd_session_end,
                                wednesday_1st_session_start: data.data.wednesday_1st_session_start,
                                wednesday_1st_session_end: data.data.wednesday_1st_session_end,
                                wednesday_2nd_session_start: data.data.wednesday_2nd_session_start,
                                wednesday_2nd_session_end: data.data.wednesday_2nd_session_end,
                                thursday_1st_session_start: data.data.thursday_1st_session_start,
                                thursday_1st_session_end: data.data.thursday_1st_session_end,
                                thursday_2nd_session_start: data.data.thursday_2nd_session_start,
                                thursday_2nd_session_end: data.data.thursday_2nd_session_end,
                                friday_1st_session_start: data.data.friday_1st_session_start,
                                friday_1st_session_end: data.data.friday_1st_session_end,
                                friday_2nd_session_start: data.data.friday_2nd_session_start,
                                friday_2nd_session_end: data.data.friday_2nd_session_end,
                                saturday_1st_session_start: data.data.saturday_1st_session_start,
                                saturday_1st_session_end: data.data.saturday_1st_session_end,
                                saturday_2nd_session_start: data.data.saturday_2nd_session_start,
                                saturday_2nd_session_end: data.data.saturday_2nd_session_end,
                                sunday_1st_session_start: data.data.sunday_1st_session_start,
                                sunday_1st_session_end: data.data.sunday_1st_session_end,
                                sunday_2nd_session_start: data.data.sunday_2nd_session_start,
                                sunday_2nd_session_end: data.data.sunday_2nd_session_end,
                                display_consulting_timing: data.data.display_consulting_timing ? data.data.display_consulting_timing : null,
                                doctor_name: data.data.doctor_name
                            })
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Where is " + data.data.doctor_name + "'s clinic located?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `${data.data.doctor_name}'s clinic is located at ${data.data.clinic_locality}, ${data.data.clinic_market}, ${data.data.clinic_city}, ${data.data.clinic_state}.`
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What is the consultation fee for " + data.data.doctor_name + "?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `The consultation fee for ${data.data.doctor_name} is ₹${data.data.service_charge}.`
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What are the specializations of " + data.data.doctor_name + "?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `${data.data.doctor_name} specializes in ${data.data.specialization}.`
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What is the experience of " + data.data.doctor_name + "?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `${data.data.doctor_name} has More than ${data.data.experience}+ years of experience in the medical field.`
                        }
                    },
                    {
                        "@type": "Question",
                        "name":"Which diseases does " + data.data.doctor_name + " treat?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `${data.data.doctor_name} treats ${data.data.allSpecializations && data.data.allSpecializations["DISEASE"] ? data.data.allSpecializations["DISEASE"].map((disease: any) => disease.name).join(", ") : "various diseases based on specialization"}.`
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How can I book an appointment with " + data.data.doctor_name + "?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `You can book an appointment with ${data.data.doctor_name} through the Careipro website or mobile app. Simply search for ${data.data.doctor_name} and click on the 'Book Appointment' button to schedule your visit.`
                        }
                    },
                    {
                        "@type": "Question",
                        "name":data.data.doctor_name + "'s clinic/Hospital contact number?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `You can contact ${data.data.doctor_name}'s clinic/Hospital at ${data.data.clinic_mobile}.`
                        }
                    },
                    ...faqLdjaonConditionalData
                ]
            }
        ]
    }
    if (device.type === "mobile" || 1 == 1) {
        return (<>
            <Script
                key="json-ld-site-detail"
                id="json-ld-site-detail"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "Careipro",
                        "url": "https://careipro.com/",
                    })
                }}
            />
            <Script
                key={`json-ld-doctor-${searchParams.doctor_id}-${searchParams.clinic_id}`}
                id="json-ld-doctor-detail"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: data.data.seo_dt.ldjson || JSON.stringify(ldjson2) }}
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