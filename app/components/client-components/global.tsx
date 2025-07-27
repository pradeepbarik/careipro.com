'use client'
import { useSearchParams } from "next/navigation";
import useAuth from "@/lib/hooks/useAuth"
import useHandelDataHref from "@/lib/hooks/useHandelDataHref";
const GlobalComponent = () => {
    useAuth();
    useHandelDataHref();
    return <>
    </>
}
export default GlobalComponent;