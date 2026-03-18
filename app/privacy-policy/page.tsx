import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
const PrivacyPolicyMobile = dynamic(() => import('./mobile'));
const PrivacyPolicyDesktop = dynamic(() => import('./desktop'));
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `Privacy Policy for using careipro.com - Careipro.com`,
        description: `Read the privacy policy for using careipro.com. We are committed to protecting your personal information and your right to privacy. Please review our privacy policy to understand how we collect, use, and safeguard your information when you visit our website.`,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            }
        },
        alternates:{
            canonical:`https://careipro.com/privacy-policy` // Relative path will be combined with metadataBase
        }
    }
}
const PrivacyPolicy = async () => {
    const { device } = useDeviceInfo();
    if (device.type === "mobile") {
        return (
            <>
                <PrivacyPolicyMobile />
            </>
        )
    }
    return <>
        <PrivacyPolicyDesktop />
    </>
}
export default PrivacyPolicy;