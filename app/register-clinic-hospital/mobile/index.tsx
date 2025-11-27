'use client'
import Header from "../../components/mobile/header";
import { BiChevronRight } from "react-icons/bi";
import EnquiryForm, { JoinNowBtn,RequestDemoBtn } from "./enquiry-form";
const RegisterClinicHospitalMobile = () => {
    return (
        <>
            <Header heading="Register Clinic/Hospital" template="SUBPAGE" />
            <div className="bg-primary px-2 py-2">
                <h2 className="color-white text-2xl font-extrabold text-center py-2">Grow Your Clinic or Hospital with <span style={{ color: "#104734" }}>Careipro.com</span></h2>
                <p className="color-white text-center font-semibold">Quality care is the key to growth.Join our platform to highlight your superior service and gain more patients</p>
                <div className="flex justify-center">
                    <JoinNowBtn />
                </div>
            </div>
            <div className="text-xl font-bold px-2 py-1 mt-2">Why you should join with us?</div>
            <div className="px-2 flex gap-2">
                <div className="w-1/3 h-40 border shrink-0">
                </div>
                <div>
                    <h3 className="fs-16 font-semibold color-primary">Patient Management Software</h3>
                    <ul>
                        <li className="fs-14 color-text-light flex gap-1">
                            <BiChevronRight className="color-primary" />
                            Manage patient records efficiently
                        </li>
                        <li className="fs-14 color-text-light flex gap-1">
                            <BiChevronRight className="color-primary" />
                            Streamline appointment scheduling
                        </li>
                        <li className="fs-14 color-text-light flex gap-1">
                            <BiChevronRight className="color-primary" />
                            Report and analytics for better decision making
                        </li>
                        <li className="fs-14 color-text-light flex gap-1">
                            <BiChevronRight className="color-primary" />
                            Patient Feedback and reviews Report
                        </li>
                    </ul>
                </div>
            </div>
            <div className="px-2 flex gap-2 mt-4">
                <div>
                    <h3 className="fs-16 font-semibold color-primary">Marketing & promotion</h3>
                    <ul>
                        <li className="fs-14 color-text-light flex gap-1">
                            <BiChevronRight className="color-primary" />
                            We Provides whatsapp and SMS services to promote your clinic or hospital
                        </li>
                        <li className="fs-14 color-text-light flex gap-1">
                            <BiChevronRight className="color-primary" />
                            Social media marketing like facebook,youtube,instagram
                        </li>
                    </ul>
                </div>
                <div className="w-1/3 h-40 border shrink-0 ml-auto">
                </div>
            </div>
            <div className="px-2 flex gap-2 mt-4">
                <div className="w-1/3 h-40 border shrink-0">
                </div>
                <div>
                    <h3 className="fs-16 font-semibold color-primary">Staff Management System</h3>
                    <ul>
                        <li className="fs-14 color-text-light flex gap-1">
                            <BiChevronRight className="color-primary" />
                            Manage your Staff attendance and salary
                        </li>
                        <li className="fs-14 color-text-light flex gap-1">
                            <BiChevronRight className="color-primary" />
                            Hire professional and experienced staff
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <RequestDemoBtn />
            </div>
            <EnquiryForm />
        </>
    );
};

export default RegisterClinicHospitalMobile;