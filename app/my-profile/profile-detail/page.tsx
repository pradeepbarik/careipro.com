import dynamic from "next/dynamic";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const ProfileDetailMobile = dynamic(() => import('./mobile'));
const ProfileDetail = () => {
    const { device } = useDeviceInfo();
    if (device.type === "mobile") {
        return <ProfileDetailMobile />
    }
    return (
        <div>
            
        </div>
    );
}
export default ProfileDetail;