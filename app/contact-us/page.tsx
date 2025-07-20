import dynamic from "next/dynamic";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const ContactusMobile = dynamic(() => import("./mobile"));
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