import { toast } from "react-toastify";
import { sendEnquiryPostCurl } from '@/lib/hooks/useClientSideApiCall';
const useEnquiry = ({ state, city, vaertical, market_name = "" }: { state: string, city: string, market_name?: string, vaertical: string }) => {
    const sendEnquiry = (data: {
        name: string,
        mobile: string,
        message: string,
        clinic_id: number,
        doctor_id: number,
        specialist_id: number,
        page: string,
        section: string
    }, onSuccess: () => void) => {
        if (!data.name) {
            toast.error("Please enter your name")
            return;
        }
        if (!data.mobile) {
            toast.error("please enter contact number")
            return;
        }
        if (data.mobile.length !== 10) {
            toast.error("please enter a 10 digit mobile number")
        }
        if (!data.message) {
            toast.error("please enter smething about your requirement")
            return
        }
        sendEnquiryPostCurl({
            name: data.name,
            mobile: data.mobile || "",
            message: data.message,
            clinic_id: data.clinic_id || 0,
            doctor_id: data.doctor_id || 0,
            specialist_id: data.specialist_id || 0,
            vertical: vaertical,
            state: state,
            city: city,
            market_name: market_name,
            page: data.page,
            section: data.section
        }).then(({ data, message }) => {
            toast.success(message)
            onSuccess()
        })
    }
    return {
        sendEnquiry
    }
}
export default useEnquiry;