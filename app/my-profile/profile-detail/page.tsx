import dynamic from "next/dynamic";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const ProfileDetailMobile = dynamic(() => import('./mobile'));
const ProfileDetailDesktop = dynamic(() => import('./desktop'));
const ProfileDetail = () => {
    const { device, cookies } = useDeviceInfo();
    if (device.type === "mobile") {
        return <ProfileDetailMobile />
    }
    /* the account layout draws the frame and the menu, this only fills the panel beside them */
    return <ProfileDetailDesktop cookies={cookies} />
}
export default ProfileDetail;
