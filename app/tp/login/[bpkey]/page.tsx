import dynamic from "next/dynamic";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import { getKeyInfo } from "@/lib/hooks/index";
import { redirect } from "next/navigation";
import { fetchClinicDetail } from "@/lib/hooks/useClinics";
const LoginMobile = dynamic(() => import("./mobile"));
//bpkey = business public key
const TPlogin = async ({ params, searchParams }: { params: { bpkey: string }, searchParams: { rurl: string } }) => {
    const { device } = useDeviceInfo();
    try {
        const keyinfo = await getKeyInfo(params.bpkey);
        const { data: clinicDetail } = await fetchClinicDetail({
            clinic_id: keyinfo.clinic_id,
            state: keyinfo.state,
            city: keyinfo.city,
            clinic_bid: keyinfo.business_id,
            market_name: ""
        })
        return device.type === "mobile" ? <>

            <LoginMobile data={clinicDetail} />
        </> : <></>
    } catch (err) {
        redirect("/"); // Redirect to home or an error page if the key is invalid
    }
}
export default TPlogin;