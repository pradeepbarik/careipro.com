import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import MystaffMobile from "./mobile/mystaff.mobile";
const Mystaffs=()=>{
    const {device}=useDeviceInfo();
    if (device.type === "mobile") {
        return (
            <MystaffMobile/>
        )
    }
    return (
        <>
        mystaffs desktop
        </>
    )
}
export default Mystaffs;