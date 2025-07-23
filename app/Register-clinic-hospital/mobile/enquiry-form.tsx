import { useState } from "react";
import { Button, SlideUpModal } from "@/app/components/mobile/ui";
import Input from "@/app/components/mobile/ui/input"
import { useDispatch, useSelector } from "react-redux";
import { displayEnquiryForm } from "@/lib/slices/pageSlice";
import { RootState } from "@/lib/store";
import useEnquiry from '@/lib/hooks/useEnquiry';
import { toast } from "react-toastify";
export const JoinNowBtn = () => {
    const dispatch = useDispatch();
    return (
        <button
            className="button mt-4"
            data-variant="outlined"
            onClick={() => {
                dispatch(displayEnquiryForm({show: true, section: "join_now", page: "register_clinic_hospital" }))
            }}
        >
            Join Now
        </button>
    )
}
export const RequestDemoBtn = () => {
    const dispatch = useDispatch();
    return (
        <button
            className="button mt-4 rounded-full"
            data-variant="outlined"
            data-color="secondary"
            onClick={() => {
                dispatch(displayEnquiryForm({show: true, section: "request_demo", page: "register_clinic_hospital" }))
            }}
        >
            Request Demo
        </button>
    )
}
const EnquiryForm = () => {
    const dispatch = useDispatch();
    const { showEnquiryForm,page,section } = useSelector((state: RootState) => state.pageSlice)
    const { sendEnquiry } = useEnquiry({ state: "Odisha", city: "Bhadrak", vaertical: "register_clinic" });
    const [formData, setFormData] = useState({
        clinic_name: "",
        name: "",
        mobile: "",
    });
    const handleSendEnquiry = () => {
        sendEnquiry({
            name: formData.name,
            mobile: formData.mobile,
            message: `clinic/hospital name is <b>${formData.clinic_name}</b>`,
            clinic_id: 0,
            doctor_id: 0,
            specialist_id: 0,
            page: "register_clinic_hospital",
            section: section
        }, (data) => {
            dispatch(displayEnquiryForm({show: false, section: "", page: ""}));
            toast.success("Enquiry sent successfully");
            setFormData({ clinic_name: "", name: "", mobile: "" });
        }, { showSuccessAlert: false });
    }
    return (
        <SlideUpModal open={showEnquiryForm} onClose={() => dispatch(displayEnquiryForm({show: false, section: "", page: ""}))} heading="Register Hospital/Clinic" className="px-2 py-2">
            <div>
                <Input placeholder="Ex. xyz healthcare" lable="Your Hospital/Clinic Name" value={formData.clinic_name} onChange={(e) => { setFormData({ ...formData, clinic_name: e.target.value }) }} />
            </div>
            <div>
                <Input lable="Your Name" value={formData.name} onChange={(e) => { setFormData({ ...formData, name: e.target.value }) }} />
            </div>
            <div>
                <Input placeholder="Contact No" lable="Contact No" type="mobile" value={formData.mobile} onChange={(e) => { setFormData({ ...formData, mobile: e.target.value }) }} />
            </div>
            <div className="flex justify-center mt-4">
                <Button onClick={handleSendEnquiry}>Send Enquiry</Button>
            </div>
        </SlideUpModal>
    )
}
export default EnquiryForm;