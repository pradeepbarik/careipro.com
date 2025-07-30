import type { Metadata } from "next";
import MyProfileMobile from "./mobile";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
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
    }
}
const MyProfile = () => {
    const { device,cookies } = useDeviceInfo();
    if (device.type === "mobile") {
        return (
            <>
                <MyProfileMobile cookies={cookies}/>
            </>
        )
    }
    return (
        <>
            fsdfsdfsd
        </>
    )
}
export default MyProfile;