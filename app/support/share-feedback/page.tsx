import dynamic from "next/dynamic";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const ShareFeedbackMobile = dynamic(() => import('./mobile'));
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