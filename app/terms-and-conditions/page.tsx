import type { Metadata } from "next";
import dynamic from 'next/dynamic'
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const TermAndConditionsMobile = dynamic(() => import('./mobile'));
const TermAndConditionsDesktop = dynamic(() => import('./desktop'));
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `Terms and Conditions for using careipro.com - Careipro.com`,
        description: `Read the terms and conditions for using careipro.com. By accessing or using our website, you agree to be bound by these terms. Please review them carefully before using our services.`,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            }
        },
        alternates:{
            canonical:`https://careipro.com/terms-and-conditions` // Relative path will be combined with metadataBase
        }
    }
}
const TermAndConditions = async () => {
    const { device } = useDeviceInfo();
    if (device.type === "mobile") {
        return (
            <>
                <TermAndConditionsMobile />
            </>
        )
    }
    return <>
        <TermAndConditionsDesktop state="Odisha" city="Bhadrak" />
    </>
}
export default TermAndConditions;