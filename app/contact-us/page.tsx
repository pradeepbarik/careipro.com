import dynamic from "next/dynamic";
import { Metadata } from "next";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const ContactusMobile = dynamic(() => import("./mobile"));
export async function generateMetadata({ searchParams }: { searchParams: any }): Promise<Metadata> {
    return {
        title: `Contact Us - careipro.com`,
        description: `Get in touch with careipro.com for any inquiries, support, or feedback. We're here to help you connect with healthcare providers.`,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            }
        },
        alternates:{
            canonical: `/contact-us` // Relative path will be combined with metadataBase
        }
    }
}
const ContactUs = () => {
    const { device } = useDeviceInfo();
    if (device.type === "mobile") {
        return (
            <ContactusMobile />
        )
    }
    return (
        <>
        </>
    )
}
export default ContactUs