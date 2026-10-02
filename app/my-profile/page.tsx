import type { Metadata } from "next";
import MyProfileMobile from "./mobile";
import MyProfileDesktop from "./desktop";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import PageVisitLogger from '@/app/components/client-components/page-visit-logger';
export async function generateMetadata({ searchParams }: { searchParams: { city: string, state: string } }): Promise<Metadata> {
    return {
        title: `Login signup Contact Us,careipro business all options - careipro.com`,
        description: `Myaccount page, need help,get support join with careipro business,looking for franchise careipro business account many more option - careipro.com`,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            }
        },
        alternates:{
            canonical: `/my-profile` // Relative path will be combined with metadataBase
        }
    }
}
const MyProfile = () => {
    const { device, cookies } = useDeviceInfo();
    //the visit log is the same either way, only the body differs
    return (
        <>
            {device.type === "mobile"
                ? <MyProfileMobile cookies={cookies} />
                : <MyProfileDesktop cookies={cookies} />}
            <PageVisitLogger data={{
                page_name: "my_profile",
                state: "",
                city: "",
            }} />
        </>
    )
}
export default MyProfile;