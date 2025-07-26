import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import dynamic from "next/dynamic";
const CheckStatusMobile = dynamic(() => import('./mobile'));
const CheckStatus = () => {
    const { device } = useDeviceInfo();
    if (device.type === "mobile" || device.type === "tablet") {
        return (
            <>
                <CheckStatusMobile />
            </>
        )
    }
    return (
        <></>
    )
}
export default CheckStatus;
