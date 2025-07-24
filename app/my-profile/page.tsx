import { cookies } from "next/headers";
import MyProfileMobile from "./mobile";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
const MyProfile = () => {
    const { device,cookies,deleteCookie } = useDeviceInfo();
    if (device.type === "mobile") {
        return (
            <>
                <MyProfileMobile cookies={cookies} deleteCookie={deleteCookie} />
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