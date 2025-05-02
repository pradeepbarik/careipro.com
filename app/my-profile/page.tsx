import MyProfileMobile from "./mobile";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const MyProfile = () => {
    const { device,cookies } = useDeviceInfo();
    if (device.type === "mobile") {
        return (
            <>
                <MyProfileMobile cookies={cookies} />
            </>
        )
    }
    return (
        <>
            fsdfsdfsd
        </>
    )
}
export default MyProfile;