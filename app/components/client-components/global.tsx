'use client'
import { useSearchParams } from "next/navigation";
import useAuth from "@/lib/hooks/useAuth"
import useHandelDataHref from "@/lib/hooks/useHandelDataHref";
import useUserProfileDetail from "@/lib/hooks/user-profile/useProfileDetail";
const GlobalComponent = () => {
    useAuth();
    useHandelDataHref();
    useUserProfileDetail();
    return <>
    </>
}
export default GlobalComponent;