'use client'
import { Fragment, useMemo, useState } from "react";
import Link from "next/link";
import { BiChevronRight, BiRotateLeft, BiCalendarEvent, BiUser, BiClinic } from "react-icons/bi";
import { userSecreateKey } from '@/constants/storage_keys';
import useAppointment from "@/lib/hooks/user-profile/useAppointment";
import useSubmitRatingReview from "@/lib/hooks/user-profile/useSubmitRatingReview";
import { formatDoctorName } from '@/lib/helper/format-text';
import { Tappointment } from "@/lib/services/apicalls";
import Ratingstars from '@/app/components/mobile/ui/rating-stars';
import ReviewTags from "@/app/components/mobile/review-tags";
import Modal from "@/app/components/desktop/ui/modal";

const Panel = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-4">{children}</div>
);

const Field = ({ icon: Icon, label, children }: { icon: typeof BiUser, label: string, children: React.ReactNode }) => (
    <span className="flex items-center gap-1.5 fs-13 min-w-0">
        <Icon className="text-primary shrink-0" />
        <span className="text-gray-500 shrink-0">{label}:</span>
        <span className="font-semibold text-gray-800 truncate">{children}</span>
    </span>
);

const AppointmentCard = ({ appointment, onRate }: { appointment: Tappointment, onRate: (rating: number) => void }) => {
    const detailUrl = `/my-profile/appointment-detail?case_id=${appointment.case_id}&appointment_id=${appointment.booking_id}`;
    return (
        <div className="bg-white rounded-xl border border-gray-200 hover:shadow-md hover:border-primary/40 transition-all">
            <div className="flex gap-4 p-4">
                <img
                    src={appointment.doctor_photo}
                    alt={appointment.doctor_name}
                    className="h-16 w-16 rounded-full object-cover shrink-0 bg-gray-50 border border-gray-100"
                />
                <div className="flex-1 min-w-0">
                    <Link href={detailUrl} className="group inline-block">
                        <h3 className="fs-16 font-bold text-gray-900 group-hover:text-primary transition-colors">
                            {formatDoctorName(appointment.doctor_name)}
                        </h3>
                    </Link>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-1.5">
                        <Field icon={BiClinic} label="Clinic">{appointment.clinic_name}</Field>
                        <Field icon={BiUser} label="Patient">{appointment.patient_name}</Field>
                        <Field icon={BiCalendarEvent} label="Consult date">{appointment.consult_date}</Field>
                        {appointment.today_booking_id && (
                            <span className="fs-13">
                                <span className="text-gray-500">Sl No: </span>
                                <span className="font-semibold text-primary">{appointment.today_booking_id}</span>
                            </span>
                        )}
                    </div>
                </div>

                <div className="w-40 shrink-0 border-l border-gray-100 pl-4 flex flex-col gap-2">
                    <Link
                        href={detailUrl}
                        className="flex items-center justify-center gap-1 py-2 rounded-lg fs-13 font-semibold bg-primary text-white hover:opacity-90 transition-opacity"
                    >
                        View details<BiChevronRight />
                    </Link>
                    {/* re-booking is only offered while the doctor is still listed, the same rule the
                        phone page follows */}
                    {appointment.active === 1 && (
                        <Link
                            href={appointment.seo_url}
                            className="flex items-center justify-center gap-1 py-2 rounded-lg fs-13 font-semibold border border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors"
                        >
                            <BiRotateLeft className="text-lg" />Re-Book
                        </Link>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-3 border-t border-gray-100 px-4 py-2.5">
                <span className="fs-13 font-semibold text-gray-700">
                    {appointment.rating ? "Your rating" : "Share your experience"}
                </span>
                <Ratingstars
                    given_rating={appointment.rating || 0}
                    className="text-xl text-primary cursor-pointer"
                    onChange={onRate}
                />
                {appointment.rating ? (
                    <span className="fs-12 text-gray-400">Click a star to edit your review</span>
                ) : null}
            </div>
        </div>
    );
};

/**
 * The booking history inside the account layout, so the menu stays beside it and this component
 * renders only the panel on the right.
 *
 * Reviewing works the same as on the phone, through useSubmitRatingReview, but the form opens in a
 * centred dialog instead of a sheet. After a review is sent the list is refetched, so the stars on
 * the card reflect what was just submitted without a page reload.
 */
const MyAppointmentsDesktop = ({ cookies }: { cookies: Record<string, any> }) => {
    /* whether there is a session is read from the cookie, which the server passed down and so holds
       the same value in both renders. The store cannot decide it: user_info is null until useAuth
       has run in the browser, so branching on it renders the signed out panel on the server and the
       list on the client, which is a hydration mismatch. */
    const isLoggedIn = cookies[userSecreateKey] !== undefined;
    const { appointments, loadingAppointments, appointment, setAppointment, appointmentsHistory } = useAppointment({ init: isLoggedIn, page: "history" });
    const {
        reviewTags, showReviewModal, setShowReviewModal, setSelectedRating, SelectedRating,
        selectedReviewTagsArr, setSelectedReviewTagsArr, setSelectedReviewTags,
        onSelectReviewTag, reviewText, setReviewText, submitRatingReview
    } = useSubmitRatingReview({});
    const [doctorId, setDoctorId] = useState("");

    /* the doctors someone has actually seen, taken from their own bookings. the hook can refetch by
       doctor, but every booking is already in hand, so filtering here answers instantly and does not
       spend a request on a list the page is holding. */
    const doctors = useMemo(() => {
        const byId = new Map<number, string>();
        for (const item of appointments) {
            if (!byId.has(item.doctor_id)) byId.set(item.doctor_id, item.doctor_name);
        }
        return Array.from(byId, ([id, name]) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name));
    }, [appointments]);

    /* a doctor chosen before a refetch may not be in the new list, and a select holding a value with
       no option silently shows the first one instead, so it falls back to showing everything */
    const activeDoctorId = doctors.some((doctor) => String(doctor.id) === doctorId) ? doctorId : "";
    const shown = activeDoctorId
        ? appointments.filter((item) => String(item.doctor_id) === activeDoctorId)
        : appointments;

    if (!isLoggedIn) {
        return (
            <Panel>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <img src="/icon/no-data.svg" alt="" className="w-24 h-24 mb-4" />
                    <p className="font-semibold text-gray-800">Please login to view your booking history.</p>
                    <p className="fs-14 text-gray-500 mt-1">Your past and upcoming appointments appear here once you are signed in.</p>
                    <Link
                        href="/login"
                        className="mt-4 rounded-full bg-primary text-white font-semibold fs-14 px-6 py-2.5 hover:opacity-90 transition-opacity"
                    >
                        Login / Sign up
                    </Link>
                </div>
            </Panel>
        );
    }

    const openReview = (appointmentToReview: Tappointment, rating: number) => {
        setSelectedRating(rating);
        setSelectedReviewTagsArr(appointmentToReview.review_tags_arr || []);
        setSelectedReviewTags(appointmentToReview.review_tags || []);
        setReviewText(appointmentToReview.experience || "");
        setAppointment(appointmentToReview);
        setShowReviewModal(true);
    };

    return (
        <>
            <div className="flex items-center gap-3 mb-3">
                <div className="w-1 h-5 bg-primary rounded-full"></div>
                <h2 className="font-bold text-gray-800">My Appointments</h2>
                {appointments.length > 0 && (
                    <span className="fs-13 text-gray-500">
                        {shown.length} {shown.length === 1 ? "booking" : "bookings"}
                        {activeDoctorId && <span className="text-gray-400"> of {appointments.length}</span>}
                    </span>
                )}
                {/* only worth drawing once there is more than one doctor to choose between */}
                {doctors.length > 1 && (
                    <label className="ml-auto flex items-center gap-2 fs-13 text-gray-500 shrink-0">
                        Doctor
                        <select
                            value={activeDoctorId}
                            onChange={(e) => setDoctorId(e.target.value)}
                            aria-label="Filter appointments by doctor"
                            className={`fs-13 font-semibold rounded-full border px-3 py-1.5 outline-none cursor-pointer transition-colors ${activeDoctorId
                                ? "border-primary text-primary bg-primary/5"
                                : "border-gray-200 text-gray-700 bg-white hover:border-primary"}`}
                        >
                            <option value="">All doctors</option>
                            {doctors.map((doctor) => (
                                <option key={doctor.id} value={doctor.id}>{formatDoctorName(doctor.name)}</option>
                            ))}
                        </select>
                    </label>
                )}
            </div>

            {loadingAppointments ? (
                /* placeholders rather than an empty state, which would otherwise flash "no
                   appointments" at everyone for the length of the fetch */
                <div className="flex flex-col gap-3">
                    {[0, 1, 2].map((i) => (
                        <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 flex gap-4">
                            <div className="h-16 w-16 rounded-full bg-gray-100 animate-pulse shrink-0" />
                            <div className="flex-1 space-y-2 py-1">
                                <div className="h-4 w-1/3 bg-gray-100 rounded animate-pulse" />
                                <div className="h-3 w-2/3 bg-gray-100 rounded animate-pulse" />
                                <div className="h-3 w-1/2 bg-gray-100 rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : appointments.length === 0 ? (
                <Panel>
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <img src="/icon/no-data.png" alt="" className="h-28 mb-3" />
                        <p className="font-semibold text-gray-800">No appointments yet</p>
                        <p className="fs-14 text-gray-500 mt-1">Bookings you make will show up here with the doctor, clinic and date.</p>
                        <Link
                            href="/"
                            className="mt-4 rounded-full border border-primary text-primary font-semibold fs-14 px-6 py-2.5 hover:bg-primary hover:text-white transition-colors"
                        >
                            Find a doctor
                        </Link>
                    </div>
                </Panel>
            ) : shown.length === 0 ? (
                <Panel>
                    <div className="py-10 text-center">
                        <p className="font-semibold text-gray-800">No bookings with this doctor</p>
                        <button
                            type="button"
                            onClick={() => setDoctorId("")}
                            className="mt-2 fs-14 font-semibold text-primary hover:underline"
                        >
                            Show all appointments
                        </button>
                    </div>
                </Panel>
            ) : (
                <div className="flex flex-col gap-3">
                    {shown.map((item) => (
                        <AppointmentCard
                            key={item.booking_id}
                            appointment={item}
                            onRate={(rating) => openReview(item, rating)}
                        />
                    ))}
                </div>
            )}

            <Modal open={showReviewModal} heading="Share your review" onClose={() => setShowReviewModal(false)} width="36rem">
                {appointment && (
                    <p className="fs-13 text-gray-500 mb-3">
                        {formatDoctorName(appointment.doctor_name)} · {appointment.clinic_name} · {appointment.consult_date}
                    </p>
                )}
                {reviewTags.map((topic, i) => (
                    <div key={`topic-${i}`}>
                        <div className="font-semibold fs-14 text-gray-800 mt-3 mb-2">{topic.topic}</div>
                        <div className="flex flex-wrap gap-2">
                            {topic.sub_topics.map((sub_topic) => (
                                <Fragment key={sub_topic.sub_topic}>
                                    <ReviewTags
                                        data={sub_topic}
                                        topic={topic.topic}
                                        selectedTags={selectedReviewTagsArr}
                                        onClick={(data) => { onSelectReviewTag(data) }}
                                    />
                                </Fragment>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="font-semibold fs-14 text-gray-800 mt-4 mb-2">Overall experience</div>
                <div className="flex justify-center">
                    <Ratingstars
                        given_rating={SelectedRating}
                        onChange={(r) => { setSelectedRating(r) }}
                        className="text-primary text-3xl cursor-pointer"
                    />
                </div>
                <textarea
                    className="w-full h-24 mt-3 border border-gray-200 rounded-lg px-3 py-2 fs-14 outline-none focus:border-primary transition-colors"
                    placeholder="Write anything else (Optional)"
                    value={reviewText}
                    onChange={(e) => { setReviewText(e.target.value) }}
                />
                <button
                    type="button"
                    className="w-full mt-3 rounded-lg bg-primary text-white font-semibold fs-14 py-2.5 hover:opacity-90 transition-opacity"
                    onClick={() => {
                        if (!appointment) return;
                        submitRatingReview({
                            rev_id: appointment.review_id || 0,
                            appointment_id: appointment.booking_id,
                            clinic_id: appointment.clinic_id,
                            doctor_id: appointment.doctor_id,
                            service_loc_id: appointment.servicelocation_id,
                            consultation_date: appointment.consult_date,
                            patient_name: appointment.patient_name
                        }, () => {
                            /* the card shows the rating it was given, so the list has to be read
                               back or the stars would snap to the old value */
                            appointmentsHistory();
                        });
                    }}
                >
                    Submit review
                </button>
            </Modal>
        </>
    );
};

export default MyAppointmentsDesktop;
