import dynamic from 'next/dynamic'
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const BusinessListingMobile = dynamic(() => import('./mobile'));
const BusinessListingDesktop = dynamic(() => import('./desktop'));
const BusinessListingPage = () => {
    const { device } = useDeviceInfo();
    if (device.type === "mobile") {
        return <BusinessListingMobile />
    } else {
        return <BusinessListingDesktop />
    }   
};
export default BusinessListingPage;