import dynamic from "next/dynamic";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const ShareFeedbackMobile = dynamic(() => import('./mobile'));
export async function generateMetadata({ searchParams }: { searchParams: any }) {
    return {
        title: `Share Feedback - careipro.com`,
        description: `We value your feedback! Share your thoughts and suggestions with us to help improve our services at careipro.com.`,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            }
        },
        alternates:{
            canonical: `/support/share-feedback` // Relative path will be combined with metadataBase
        }
    }
}
const ShareFeedBack = () => {
    const { device } = useDeviceInfo();
    if (device.type === "mobile") {
        return (
            <>
                <ShareFeedbackMobile />
            </>
        )
    }
    return (
        <>

        </>
    )
}
export default ShareFeedBack