'use client'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { SlideUpModal, Button, TextArea } from '@/app/components/mobile/ui';
import { BiCheckCircle, BiInfoCircle } from 'react-icons/bi';
import { submitPatientEnquiry } from '@/lib/hooks/useClientSideApiCall';
import Login from '@/app/components/mobile/login';
import { RootState } from '@/lib/store';

const PatientEnquiryBanner = ({
    doctor_id = 0, clinic_id = 0, servicelocation_id = 0, doctor_name = "", clinic_name = "", city = "",
    heading = "Your Personal Assistant",
    promptText = "Your personal assistant will help you with your queries and provide the information you need.",
    placeholder = "E.g., Is the doctor available today evening?",
    bannerImage = "/patient-assistant.png"
}: {
    doctor_id?: number, clinic_id?: number, servicelocation_id?: number, doctor_name?: string, clinic_name?: string, city?: string,
    heading?: string, promptText?: string, placeholder?: string,bannerImage?: string
}) => {
    const isLoggedIn = useSelector((state: RootState) => state.authSlice.is_loggedin);
    const [showModal, setShowModal] = useState(false);
    const [query, setQuery] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [pendingSubmit, setPendingSubmit] = useState(false);

    const doSubmit = () => {
        setSubmitting(true);
        submitPatientEnquiry({ doctor_id, clinic_id, servicelocation_id, doctor_name, clinic_name, city, query: query.trim() })
            .then(() => {
                setSubmitted(true);
            })
            .catch((err: any) => {
                toast.error(err.message || "Could not submit your query");
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    const onSubmit = () => {
        if (!query.trim()) {
            toast.error("Please write your query");
            return;
        }
        if (!isLoggedIn) {
            setPendingSubmit(true);
            setShowLoginModal(true);
            return;
        }
        doSubmit();
    };

    useEffect(() => {
        if (isLoggedIn && pendingSubmit) {
            setPendingSubmit(false);
            doSubmit();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn]);

    const closeModal = () => {
        setShowModal(false);
        setQuery("");
        setSubmitted(false);
    };

    return (
        <>
            <div onClick={() => { setShowModal(true) }}>
                <img src={bannerImage} alt="Need a patient assistant?" />
            </div>
            <SlideUpModal heading={heading} open={showModal} onClose={closeModal}>
                <div className="p-2">
                    {submitted ? (
                        <div className="flex flex-col items-center text-center py-6 gap-2">
                            <BiCheckCircle className="text-5xl color-primary" />
                            <div className="font-semibold fs-16">Query submitted!</div>
                            <div className="fs-14 color-text-light">Our support team will get back to you shortly with the information you need.</div>
                            <Button className="w-full mt-4" onClick={closeModal}>Close</Button>
                        </div>
                    ) : (
                        <>
                            <p className="fs-14 color-text-light mb-3">{promptText}</p>
                            <TextArea
                                lable="Your Query"
                                value={query}
                                onChange={(e) => { setQuery(e.target.value) }}
                                placeholder={placeholder}
                            />
                            <div className="flex items-start gap-2 mt-2 bg-gray-50 border rounded-md px-2 py-2">
                                <BiInfoCircle className="color-text-light shrink-0" style={{ fontSize: '1rem', marginTop: '1px' }} />
                                <span className="fs-12 color-text-light">Your query will be sent to Careipro&apos;s support team, who will reach out with the information you need.</span>
                            </div>
                            <Button className="w-full mt-4" onClick={onSubmit} disabled={submitting}>{submitting ? "Submitting..." : "Submit Query"}</Button>
                        </>
                    )}
                </div>
            </SlideUpModal>
            <SlideUpModal heading="Login / Signup" open={showLoginModal} zIndex={1} onClose={() => { setShowLoginModal(false) }}>
                <Login allowLoggedInUser={true} onLoginSuccess={() => { setShowLoginModal(false); }} />
            </SlideUpModal>
        </>
    )
}
export default PatientEnquiryBanner;
