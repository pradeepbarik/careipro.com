import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import MyleadsMobile from './mobile/myleads.mobile';
const Myleads=()=>{
    const {device}=useDeviceInfo();
    if (device.type === "mobile") {
        return (
            <MyleadsMobile/>
        )
    }
    return (
        <>
        fsdfsd
        </>
    )
}
export default Myleads