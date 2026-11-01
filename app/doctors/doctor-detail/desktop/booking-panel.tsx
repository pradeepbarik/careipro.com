import Link from "next/link";
import { BsTelephone, BsPersonRaisedHand } from "react-icons/bs";
import { BiCalendar, BiEdit, BiErrorCircle } from "react-icons/bi";
import { TDoctorDetail } from "@/lib/types/doctor";
import { hirePersonalAssistantPageUrl } from "@/lib/helper/link";
import { support_no } from "@/constants/site-config";
import { userinfo, userSecreateKey } from "@/constants/storage_keys";
import TrackedLink from "@/app/components/client-components/tracked-link";
import SendEnquiry from "@/app/hospitals-and-clinics/clinic-detail/mobile/send-enquiry";
import SupportCard from "./support-card";

const PanelCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white rounded-xl border border-gray-200 p-4 ${className}`}>{children}</div>
);

/**
 * The desktop counterpart of the two buttons the mobile overview carries at the foot of its
 * profile info, surfaced here instead since the right rail has no equivalent scroll position.
 * Same SendEnquiry sheet, just rendered as a centred dialog rather than a bottom sheet.
 */
const FeedbackActions = ({ data }: { data: TDoctorDetail }) => (
    <div className="flex gap-2">
        <SendEnquiry
            businessType={data.business_type}
            state={data.clinic_state || ""}
            city={data.clinic_city}
            clini_id={data.clinic_id}
            doctor_id={data.doctor_id}
            variant="button"
            surface="dialog"
            section="suggest_edit"
            label="Suggest to update"
            heading="Suggest to update"
            placeholder={`Tell us what's incorrect or missing in ${data.doctor_name}'s profile...`}
            className="flex-1 flex items-center justify-center gap-1.5 fs-13 font-semibold text-cyan-600 border border-gray-200 rounded-lg py-2 bg-white hover:bg-gray-50 transition-colors"
        >
            <BiEdit className="text-base color-primary" />
        </SendEnquiry>
        <SendEnquiry
            businessType={data.business_type}
            state={data.clinic_state || ""}
            city={data.clinic_city}
            clini_id={data.clinic_id}
            doctor_id={data.doctor_id}
            variant="button"
            surface="dialog"
            section="report_issue"
            label="Report an issue"
            heading="Report an issue"
            placeholder="Tell us what went wrong on this page..."
            className="flex-1 flex items-center justify-center gap-1.5 fs-13 font-semibold text-red-600 border border-gray-200 rounded-lg py-2 bg-white hover:bg-gray-50 transition-colors"
        >
            <BiErrorCircle className="text-base text-red-600" />
        </SendEnquiry>
    </div>
);

/**
 * The right hand rail of the desktop profile. Booking itself happens on its own page (the desktop
 * version of the same page mobile links out to), so this rail's only job is sending the visitor
 * there with the right call to action. Which of the three it shows is decided by settings.book_by,
 * the same branching the mobile bottom bar uses.
 */
const BookingPanel = ({ data, cookies, pageUrl }: {
    data: TDoctorDetail,
    cookies: Record<string, any>,
    pageUrl: string
}) => {
    const isLoggedIn = !!cookies[userSecreateKey];
    const userdetail = cookies[userinfo] ? JSON.parse(cookies[userinfo]) : null;
    //saves a signed in visitor retyping their name in the report issue form
    const patientName = userdetail ? [userdetail.fn, userdetail.ln].filter(Boolean).join(" ") : "";

    //booking by phone only, there is no form to render
    if (data.settings.book_by === "call") {
        return (
            <div className="flex flex-col gap-4">
                <PanelCard className="text-center">
                    <span className="w-14 h-14 mx-auto mb-3 bg-cyan-100 rounded-full flex items-center justify-center">
                        <BsTelephone className="text-2xl text-cyan-600" />
                    </span>
                    <h2 className="font-bold text-gray-800">Online booking not available</h2>
                    <p className="fs-13 text-gray-600 mt-1">This clinic does not accept online appointments. Call them to book your slot.</p>
                    <TrackedLink href={`tel:${data.clinic_mobile}`} ev_nm="call_click" section_name="booking_rail" className="mt-4 flex items-center justify-center gap-2 w-full bg-primary text-white font-semibold rounded-lg py-2.5 hover:opacity-90 transition-opacity">
                        <BsTelephone />CALL NOW
                    </TrackedLink>
                </PanelCard>
                <SupportCard data={data} patientName={patientName} />
                <FeedbackActions data={data} />
            </div>
        );
    }

    //the clinic takes bookings only through a personal assistant
    if (data.settings.book_by === "manually" && data.settings.prime_member_only_booking == 1) {
        return (
            <div className="flex flex-col gap-4">
                <PanelCard className="text-center">
                    <span className="w-14 h-14 mx-auto mb-3 bg-cyan-100 rounded-full flex items-center justify-center">
                        <BsPersonRaisedHand className="text-2xl text-cyan-600" />
                    </span>
                    <h2 className="font-bold text-gray-800">Booking through an assistant</h2>
                    <p className="fs-13 text-gray-600 mt-1">
                        Hire a <b className="text-orange-500">Personal Assistant</b> to book this appointment or handle your queries at the clinic.
                    </p>
                    <Link href={hirePersonalAssistantPageUrl(data.clinic_state, data.clinic_city)} className="mt-4 block w-full bg-primary text-white font-semibold rounded-lg py-2.5 text-center hover:opacity-90 transition-opacity">
                        Hire Assistant &amp; Book
                    </Link>
                    <a href={`tel:${support_no}`} className="mt-2 block w-full bg-gray-100 text-gray-700 font-semibold rounded-lg py-2.5 hover:bg-gray-200 transition-colors">
                        Need help?
                    </a>
                </PanelCard>
                <SupportCard data={data} patientName={patientName} />
                <FeedbackActions data={data} />
            </div>
        );
    }

    //booking lives on its own page now; a signed out visitor goes through login first, landing back
    //on that page, the same redirect the mobile bottom bar uses
    const bookHref = isLoggedIn ? `${pageUrl}/book-appointment` : `/login?redirect_url=${data.seo_dt.seo_url}/book-appointment`;
    const isRequestOnly = data.settings.book_by === "manually";

    return (
        <div className="flex flex-col gap-4">
            <PanelCard className="text-center">
                <span className="w-14 h-14 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                    <BiCalendar className="text-2xl text-primary" />
                </span>
                <h2 className="font-bold text-gray-800">Book an appointment</h2>
                <p className="fs-13 text-gray-600 mt-1">
                    {isRequestOnly
                        ? "Send a booking request and the clinic will confirm your slot."
                        : "Pick a slot and confirm your details in a couple of steps."}
                </p>
                <Link href={bookHref} className="mt-4 flex items-center justify-center gap-2 w-full bg-primary text-white font-semibold rounded-lg py-2.5 hover:opacity-90 transition-opacity">
                    <BiCalendar />{isRequestOnly ? "Request Appointment" : "Book Appointment"}
                </Link>
            </PanelCard>
            <SupportCard data={data} patientName={patientName} />
            <FeedbackActions data={data} />
        </div>
    );
};

export default BookingPanel;
