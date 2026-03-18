import dynamic from "next/dynamic";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const CaretakerListingPageMobile = dynamic(() => import('./mobile'));
const CaretakerListingPageDesktop = dynamic(() => import('./desktop'));
const CaretakerListingPage = () => {
    const { device } = useDeviceInfo();
    if (device.type === "mobile") {
        return <CaretakerListingPageMobile />;
    } else {
        return <CaretakerListingPageDesktop />;
    }
};
export default CaretakerListingPage;