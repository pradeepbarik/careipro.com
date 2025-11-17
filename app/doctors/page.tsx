import type { Metadata } from "next";
import { headers } from 'next/headers';
import dynamic from 'next/dynamic'
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import { fetchDoctorsPageData } from "@/lib/hooks/useDoctors";
import { fetchCategories } from '@/lib/hooks/useCategories';
import LoginToast from "../components/mobile/login-toast";
import { userSecreateKey } from '@/constants/storage_keys';

const DoctorsMobile = dynamic(() => import('./mobile'));
const DoctorsDesktop = dynamic(() => import('./desktop'));
export async function generateMetadata({ searchParams }: { searchParams: { city: string, state: string } }): Promise<Metadata> {
    return {
        title: `Best Doctors by specialist in ${searchParams.city} - careipro.com`,
        description: `Get available doctors by specialist and book appoinment. Get doctors phone number,clinic address,consultaion fees and consultaion timing. `,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            }
        },
        alternates: {
            canonical:`/Doctors-In-${searchParams.city}-In-${searchParams.state}`
        }
    }
}
const Doctors = async ({ searchParams }: { searchParams: { city: string, state: string } }) => {
    const { device, cookies } = useDeviceInfo();
    const [pageData, categories, diseases] = await Promise.all([
        fetchDoctorsPageData(searchParams.state.toLocaleLowerCase(), searchParams.city.toLocaleLowerCase()),
        fetchCategories("DOCTOR"),
        fetchCategories("DISEASE")
    ])
    if (device.type === "mobile" || 1==1) {
        return (
            <>
                <DoctorsMobile city={searchParams.city} state={searchParams.state} pageData={pageData} categories={categories} diseases={diseases} />
                {!cookies[userSecreateKey] && <LoginToast />}
            </>
        )
    } else {
        return (
            <>
                <DoctorsDesktop state={searchParams.state} city={searchParams.city} />
            </>
        )
    }
}
export default Doctors