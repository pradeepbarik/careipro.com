import Link from "next/link";
import { BsTelephone, BsPersonRaisedHand } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { TDoctorDetail, TDoctorvailableData } from "@/lib/types/doctor";
import { doctorProfilePic } from "@/lib/image";
import { hirePersonalAssistantPageUrl } from "@/lib/helper/link";
import { support_no } from "@/constants/site-config";
import { userinfo, userSecreateKey } from "@/constants/storage_keys";
import TrackedLink from "@/app/components/client-components/tracked-link";
import BookAppointment from "@/app/components/mobile/doctors/doctor-detail/book-appointment-form";
import SupportCard from "./support-card";

const PanelCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white rounded-xl border border-gray-200 p-4 ${className}`}>{children}</div>
);

/**
 * The right hand rail of the desktop profile. Desktop has the room to book without sending the
 * visitor to another page, so the booking form is rendered here on the profile itself. Which of the
 * three routes a clinic uses is decided by settings.book_by, the same branching the mobile page does
 * from its bottom bar.
 */
const BookingPanel = ({ data, availableData, cookies, pageUrl }: {
    data: TDoctorDetail,
    availableData: TDoctorvailableData,
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
            </div>
        );
    }

    /* the form carries its own full screen login overlay when there is no user, which would cover
       the whole profile the moment it rendered. so a signed out visitor gets the prompt instead and
       the form mounts only once they are back with a session. */
    if (!isLoggedIn || !userdetail) {
        return (
            <div className="flex flex-col gap-4">
                <PanelCard>
                    <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                            <BiUser className="text-orange-600 text-xl" />
                        </span>
                        <div className="min-w-0">
                            <p className="font-semibold text-gray-800 fs-14">Verify your mobile number</p>
                            <p className="fs-12 text-gray-500">Login to book an appointment</p>
                        </div>
                    </div>
                    <Link href={`/login?redirect_url=${data.seo_dt.seo_url}`} className="mt-3 block w-full bg-primary text-white font-semibold rounded-lg py-2.5 text-center hover:opacity-90 transition-opacity">
                        Login &amp; Book
                    </Link>
                </PanelCard>
                <SupportCard data={data} patientName={patientName} />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <h2 className="font-bold text-gray-800 px-4 py-3 border-b border-gray-100">Book an appointment</h2>
                <BookAppointment
                    state={data.clinic_state}
                    city={data.clinic_city}
                    emergencyBookingClose={data.settings.emergency_booking_close}
                    bookingCloseMessage={data.settings.booking_close_message}
                    open={false}
                    clinic_id={data.clinic_id}
                    service_loc_id={data.id}
                    doctor_id={data.doctor_id}
                    service_charge={parseInt(data.service_charge)}
                    site_service_charge={parseInt(data.site_service_charge)}
                    settings={data.settings}
                    availability={availableData}
                    slno_groups={data.slno_groups || []}
                    pageUrl={`${pageUrl}/book-appointment`}
                    doctorInfo={{
                        name: data.doctor_name,
                        image: doctorProfilePic(data.profile_pic),
                        specialization: data.specialization || "",
                        verified: true,
                        rating: data.rating,
                        experience: data.experience.toString()
                    }}
                    userdetail={userdetail}
                />
            </div>
            <SupportCard data={data} patientName={patientName} />
        </div>
    );
};

export default BookingPanel;
