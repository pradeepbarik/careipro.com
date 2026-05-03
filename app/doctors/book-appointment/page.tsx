import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import { fetchDoctorAvailableTime, fetchDoctorDetail } from "@/lib/hooks/useDoctors";
import { doctorProfilePic } from "@/lib/image";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import dynamic from "next/dynamic";
import { title } from "process";
const BookAppointmentMobilePage = dynamic(() => import("./mobile"));
export async function generateMetadata({ searchParams }: { searchParams: any }): Promise<Metadata> {
    const data = await fetchDoctorDetail({ doctor_id: searchParams.doctor_id, clinic_id: searchParams.clinic_id, service_loc_id: searchParams.service_loc_id, seo_url: searchParams.seo_url, market_name: searchParams.market_name, state: searchParams.state, city: searchParams.city })
    const seodt = {
        title: `Book Appointment with Doctor ${data.data.doctor_name} in ${data.data.clinic_city}`,
        description: "Book an appointment with Dr. " + data.data.doctor_name + " in " + data.data.clinic_city + " through Careipro. Check availability, choose your preferred time slot, and get expert medical care at your convenience."
    }
    let url = 'https://careipro.com' + data.data.seo_dt.seo_url + "/book-appointment";
    return {
        title: `Book Appointment with Doctor ${data.data.doctor_name} in ${data.data.clinic_city}`,
        description: "Book an appointment with Dr. " + data.data.doctor_name + " in " + data.data.clinic_city + " through Careipro. Check availability, choose your preferred time slot, and get expert medical care at your convenience.",
        openGraph: {
            title: seodt.title,
            description: seodt.description,
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
const BookAppointmentPage = async ({ searchParams }: { searchParams: any }) => {
    const { device, cookies } = useDeviceInfo();
    const [data, availableData] = await Promise.all([
        fetchDoctorDetail({ doctor_id: searchParams.doctor_id, clinic_id: searchParams.clinic_id, service_loc_id: searchParams.service_loc_id, seo_url: searchParams.seo_url, market_name: searchParams.market_name, state: searchParams.state, city: searchParams.city }),
        fetchDoctorAvailableTime(searchParams.service_loc_id)
    ])
    if (device.type === "mobile") {
        return <BookAppointmentMobilePage data={data.data} availableData={availableData} searchParams={searchParams} cookies={cookies} />
    }
    return (
        <>

        </>
    )
}
export default BookAppointmentPage;