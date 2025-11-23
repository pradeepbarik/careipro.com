import useDeviceInfo from "@/lib/hooks/useDeviceInfo"
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";
const ForBusinessMobile = dynamic(() => import("./mobile"));
export async function generateMetadata({ searchParams }: { searchParams: any }): Promise<Metadata> {
    return {
        title: `Best Free Healthcare Software Solutions For Doctor, Clinic and Hospital in India`,
        description: `All-in-one business and healthcare software tools for doctors, clinics, hospitals. Improve workflow, efficiency, and service quality.`,
        keywords: "Healthcare software provider,Clinic management software,Hospital management software,Doctor clinic software,Appointment booking system,Medical practice management software,Medicine billing software",
        openGraph: {
            title: "Best Free Healthcare Software Solutions For Doctor, Clinic and Hospital in India",
            description: "All-in-one business and healthcare software tools for doctors, clinics, hospitals. Improve workflow, efficiency, and service quality.",
            url: `https://careipro.com/Software-Solutions-For-Business`,
            siteName: 'Careipro',
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
            canonical: `https://careipro.com/Software-Solutions-For-Business` // Relative path will be combined with metadataBase
        }
    }
}
const ldjson={
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Best Free Healthcare Software Solutions For Doctor, Clinic and Hospital in India",
  "description": "All-in-one business and healthcare software tools for doctors, clinics, hospitals. Improve workflow, efficiency, and service quality.",
  "url": "https://careipro.com/Software-Solutions-For-Business",
  "publisher": {
    "@type": "Organization",
    "name": "Careipro",
    "logo": {
      "@type": "ImageObject",
      "url": "https://careipro.com/careipro-primary-logo.png"
    }
  }
}
const ForBusiness = () => {
    const { device } = useDeviceInfo();
    if (device.type === "mobile" || 1 == 1) {
        return (
            <>
            <Script
                id="json-ld-software" // Unique ID for the script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(ldjson) }}
                strategy="beforeInteractive"
            />
                <ForBusinessMobile />
            </>
        )
    }
}
export default ForBusiness