'use client'
import { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BiArrowBack, BiCalendar, BiTime, BiUser, BiPhone, BiDirections, BiSolidLocationPlus, BiCalendarX, BiTrash, BiPlus, BiPencil, BiCommentDetail } from "react-icons/bi";
import { userSecreateKey } from '@/constants/storage_keys';
import useAppointment from "@/lib/hooks/user-profile/useAppointment";
import useSubmitRatingReview from "@/lib/hooks/user-profile/useSubmitRatingReview";
import { formatDoctorName, formatCurrency } from "@/lib/helper/format-text";
import moment from "@/lib/helper/date-time";
import Ratingstars from '@/app/components/mobile/ui/rating-stars';
import ReviewTags from "@/app/components/mobile/review-tags";
import Modal from "@/app/components/desktop/ui/modal";
import { CANCEL_REASONS, OTHER_CANCEL_REASON, isCancelledStatus, statusBadge, directionsUrl, supportWhatsappUrl } from "./appointment-ui";
import { support_no } from "@/constants/site-config";
import { BiSupport, BiRotateLeft } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";

const Panel = ({ title, action, children }: { title?: string, action?: ReactNode, children: ReactNode }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
        {(title || action) && (
            <div className="flex items-center mb-3">
                {title && <h3 className="font-bold fs-15 text-gray-800">{title}</h3>}
                {action && <div className="ml-auto">{action}</div>}
            </div>
        )}
        {children}
    </div>
);

const InfoItem = ({ icon: Icon, label, children }: { icon?: typeof BiUser, label: string, children: ReactNode }) => (
    <div className="flex items-start gap-2 min-w-0">
        {Icon && <Icon className="text-primary text-xl shrink-0 mt-0.5" />}
        <div className="min-w-0">
            <div className="fs-12 text-gray-500">{label}</div>
            <div className="fs-14 font-semibold text-gray-800 break-words">{children}</div>
        </div>
    </div>
);

const outlinedButton = "flex items-center justify-center gap-1.5 rounded-lg border fs-13 font-semibold py-2 px-3 transition-colors";

/**
 * The appointment detail inside the account layout, so the menu stays beside it and this renders
 * only the panel on the right. It reads the same hook as the phone page: a case can hold several
 * visits, which the phone swipes between and this offers as tabs.
 */
const AppointmentDetailDesktop = ({ case_id, appointmentId, cookies }: { case_id: number, appointmentId: number, cookies: Record<string, any> }) => {
    /* read from the cookie the server passed down, same reason as the history page: the store is
       empty until the browser runs, and branching on it would not hydrate */
    const isLoggedIn = cookies[userSecreateKey] !== undefined;
    const fileRef = useRef<HTMLInputElement>(null);
    const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
    const [cancelReason, setCancelReason] = useState<string>("");
    const [otherCancelReason, setOtherCancelReason] = useState<string>("");
    const finalCancelReason = cancelReason === OTHER_CANCEL_REASON ? otherCancelReason.trim() : cancelReason;
    const { activeAppointmentId, appointmentDetail, caseAppointmentIds, onSwipeEnd, getAppointmentDetail, onSelectPrescriptionImage, deletePrescription, caseAppointmentDetails, cancelAppointment, cancellingAppointment } = useAppointment({ page: "detail", init: isLoggedIn, appointmentId: appointmentId, case_id: case_id });
    const { reviewTags, showReviewModal, setShowReviewModal, setSelectedRating, SelectedRating, selectedReviewTagsArr, setSelectedReviewTagsArr, setSelectedReviewTags, onSelectReviewTag, reviewText, setReviewText, submitRatingReview, submitRating } = useSubmitRatingReview({ review_text: appointmentDetail?.experience || "" });
    useEffect(() => {
        if (caseAppointmentDetails[activeAppointmentId] && caseAppointmentDetails[activeAppointmentId].review_tags !== null) {
            setSelectedReviewTagsArr((caseAppointmentDetails[activeAppointmentId].review_tags || []).map((tag) => tag.tag))
            setSelectedReviewTags(caseAppointmentDetails[activeAppointmentId]?.review_tags || [])
        } else {
            setSelectedReviewTagsArr([])
            setSelectedReviewTags([])
        }
    }, [activeAppointmentId, caseAppointmentDetails[activeAppointmentId]?.rev_id])

    if (!isLoggedIn) {
        return (
            <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <img src="/icon/no-data.svg" alt="" className="w-24 h-24 mb-4" />
                    <p className="font-semibold text-gray-800">Please login to view this appointment.</p>
                    <Link href="/login" className="mt-4 rounded-full bg-primary text-white font-semibold fs-14 px-6 py-2.5 hover:opacity-90 transition-opacity">
                        Login / Sign up
                    </Link>
                </div>
            </div>
        );
    }

    const detail = caseAppointmentDetails[activeAppointmentId];
    const heading = (
        <div className="flex items-center gap-3 mb-3">
            <Link href="/my-profile/appointment-history" aria-label="Back to my appointments" className="h-8 w-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:text-primary hover:border-primary transition-colors">
                <BiArrowBack />
            </Link>
            <div className="w-1 h-5 bg-primary rounded-full"></div>
            <h2 className="font-bold text-gray-800">Appointment Detail</h2>
            <span className="fs-13 text-gray-500">Case No: {case_id}</span>
        </div>
    );

    if (!appointmentDetail || !caseAppointmentIds.length || !detail) {
        return (
            <>
                {heading}
                <div className="grid grid-cols-[1fr_20rem] gap-4">
                    <div className="space-y-4">
                        <div className="h-40 bg-white rounded-xl border border-gray-200 animate-pulse" />
                        <div className="h-32 bg-white rounded-xl border border-gray-200 animate-pulse" />
                    </div>
                    <div className="h-56 bg-white rounded-xl border border-gray-200 animate-pulse" />
                </div>
            </>
        );
    }

    const badge = statusBadge(detail.status);
    const cancelled = isCancelledStatus(detail.status);
    const serviceCharge = parseInt(detail.service_charge) || 0;
    const openFilePicker = () => { fileRef.current && fileRef.current.click() };

    return (
        <>
            {heading}
            <input type="file" ref={fileRef} accept="image/*" onChange={onSelectPrescriptionImage} style={{ display: "none" }} />

            {/* visits of this case, only worth drawing when there is more than one */}
            {caseAppointmentIds.length > 1 && (
                <div className="flex flex-wrap gap-2 mb-3">
                    {caseAppointmentIds.map((bid, index) => {
                        const visit = caseAppointmentDetails[bid];
                        const active = bid === activeAppointmentId;
                        return (
                            <button
                                key={bid}
                                type="button"
                                onClick={() => onSwipeEnd(index)}
                                className={`fs-13 font-semibold rounded-full border px-4 py-1.5 transition-colors ${active
                                    ? "border-primary bg-primary text-white"
                                    : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"}`}
                            >
                                Visit {index + 1}{visit ? ` · ${moment(visit.consult_date).format("DD MMM Y")}` : ""}
                            </button>
                        );
                    })}
                </div>
            )}

            <div className="grid grid-cols-[1fr_20rem] gap-4 items-start">
                <div className="space-y-4 min-w-0">
                    {/* appointment */}
                    <Panel>
                        <div className="flex items-start gap-6">
                            <div className="shrink-0 rounded-xl bg-primary/5 border border-primary/20 px-5 py-3 text-center">
                                <div className="fs-12 text-gray-500">Token No.</div>
                                <div className={`text-4xl font-bold leading-tight ${cancelled ? "text-gray-400 line-through" : "text-primary"}`}>{detail.today_booking_id || "-"}</div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center">
                                    <span className={`rounded-full px-3 py-1 fs-13 font-semibold ${badge.className}`}>{badge.label}</span>
                                    {detail.can_cancel && (
                                        <button
                                            type="button"
                                            className={`ml-auto ${outlinedButton} border-secondary/40 text-secondary`}
                                            onClick={() => { setCancelReason(""); setOtherCancelReason(""); setShowCancelModal(true) }}
                                        >
                                            <BiCalendarX className="text-base" />Cancel Appointment
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <InfoItem icon={BiCalendar} label="Visit Date">{moment(detail.consult_date).format("dddd, DD MMM Y")}</InfoItem>
                                    <InfoItem icon={BiTime} label="Booked On">{moment(detail.booking_time).format("DD MMM Y, hh:mm a")}</InfoItem>
                                </div>
                            </div>
                        </div>
                    </Panel>

                    {/* patient */}
                    <Panel title="Patient">
                        <div className="grid grid-cols-3 gap-4">
                            <InfoItem icon={BiUser} label="Name">{detail.patient_name}</InfoItem>
                            <InfoItem label="Age / Gender">
                                {[detail.patient_age ? `${detail.patient_age} Years` : "", detail.patient_gender].filter(Boolean).join(" · ") || "-"}
                            </InfoItem>
                            <InfoItem label="Contact No.">{detail.patient_mobile || "-"}</InfoItem>
                            {detail.patient_address && (
                                <div className="col-span-3">
                                    <InfoItem label="Address">{detail.patient_address}</InfoItem>
                                </div>
                            )}
                        </div>
                    </Panel>

                    {/* prescriptions, not offered on a cancelled visit unless some were already uploaded */}
                    {(!cancelled || detail.prescriptions.length > 0) && (
                        <Panel title="Prescriptions" action={detail.prescriptions.length > 0 ? (
                            <button type="button" className={`${outlinedButton} border-primary/40 text-primary hover:bg-primary hover:text-white`} onClick={openFilePicker}>
                                <BiPlus />Upload
                            </button>
                        ) : undefined}>
                            {detail.prescriptions.length > 0 ? (
                                <div className="grid grid-cols-4 gap-3">
                                    {detail.prescriptions.map((prescription) => (
                                        <div key={prescription} className="group aspect-square overflow-hidden border border-gray-200 rounded-lg relative">
                                            <a href={prescription} target="_blank" rel="noopener noreferrer">
                                                <img src={prescription} alt="Prescription" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                            </a>
                                            <button
                                                type="button"
                                                aria-label="Delete prescription"
                                                className="absolute right-1.5 top-1.5 h-7 w-7 rounded-full bg-white/90 text-secondary shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => {
                                                    if (window.confirm("Delete this prescription?")) {
                                                        deletePrescription(prescription)
                                                    }
                                                }}
                                            >
                                                <BiTrash />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center gap-4 rounded-lg bg-primary/5 p-4">
                                    <img src="/icon/upload-document.png" alt="" className="h-14 w-14 object-contain shrink-0" />
                                    <div className="flex-1 fs-13 text-gray-600">Keep your prescription safe here and find it anytime, from anywhere.</div>
                                    <button type="button" className="shrink-0 rounded-lg bg-primary text-white fs-13 font-semibold px-4 py-2 hover:opacity-90 transition-opacity" onClick={openFilePicker}>
                                        Upload Prescription
                                    </button>
                                </div>
                            )}
                        </Panel>
                    )}

                    {/* feedback, a cancelled visit has nothing to rate */}
                    {!cancelled && (detail.rev_id ? (
                        <Panel title="Your Feedback" action={
                            <button type="button" className={`${outlinedButton} border-primary/40 text-primary hover:bg-primary hover:text-white`} onClick={() => { setShowReviewModal(true); setSelectedRating(detail.rating) }}>
                                <BiPencil />Edit
                            </button>
                        }>
                            <Ratingstars disable={true} given_rating={detail.rating} className="text-primary text-2xl" />
                            {detail.experience && (
                                <div className="flex items-start gap-1.5 mt-2 fs-14 text-gray-600">
                                    <BiCommentDetail className="shrink-0 mt-0.5" />
                                    <span>{detail.experience}</span>
                                </div>
                            )}
                            {(detail.review_tags || []).length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {(detail.review_tags || []).map((tag) => <span key={tag.tag} className={`chip selected ${tag.score < 0 ? 'secondary' : ''}`}>{tag.tag}</span>)}
                                </div>
                            )}
                        </Panel>
                    ) : (
                        <Panel title="How was your visit?">
                            <div className="flex items-center gap-4">
                                <span className="fs-13 text-gray-500">Your rating helps other patients choose the right doctor.</span>
                                <Ratingstars given_rating={detail.rating || 0} onClick={(r) => { setShowReviewModal(true); setSelectedRating(r) }} className="ml-auto text-primary text-2xl cursor-pointer" />
                            </div>
                        </Panel>
                    ))}
                </div>

                <div className="space-y-4">
                    {/* doctor & clinic */}
                    <Panel>
                        <div className="flex flex-col items-center text-center">
                            <img src={appointmentDetail.doctor_photo} alt={appointmentDetail.doctor_name} className="h-20 w-20 rounded-full object-cover border border-gray-100 bg-gray-50" />
                            <div className="fs-16 font-bold text-gray-900 mt-2">{formatDoctorName(appointmentDetail.doctor_name)}</div>
                            <div className="fs-14 font-semibold text-primary">{appointmentDetail.clinic_name}</div>
                            {appointmentDetail.location && (
                                <div className="fs-13 text-gray-500 flex items-start gap-1 mt-1">
                                    <BiSolidLocationPlus className="shrink-0 mt-0.5" />
                                    <span>{appointmentDetail.location}</span>
                                </div>
                            )}
                        </div>
                        {(appointmentDetail.clinic_contact_no || (appointmentDetail.location_lat && appointmentDetail.location_lng)) && (
                            <div className="grid grid-cols-2 gap-2 mt-4">
                                {appointmentDetail.clinic_contact_no && (
                                    <a href={`tel:${appointmentDetail.clinic_contact_no}`} className={`${outlinedButton} border-primary/40 text-primary`}>
                                        <BiPhone />Call
                                    </a>
                                )}
                                {(appointmentDetail.location_lat && appointmentDetail.location_lng) && (
                                    <a href={directionsUrl(appointmentDetail.location_lat, appointmentDetail.location_lng)} target="_blank" rel="noopener noreferrer" className={`${outlinedButton} border-primary/40 text-primary`}>
                                        <BiDirections />Directions
                                    </a>
                                )}
                            </div>
                        )}
                        {appointmentDetail.clinic_contact_no && (
                            <div className="fs-12 text-gray-500 text-center mt-2">Clinic: {appointmentDetail.clinic_contact_no}</div>
                        )}
                        {/* only while the doctor is still listed, the api leaves it empty otherwise */}
                        {appointmentDetail.rebook_url && (
                            <Link href={appointmentDetail.rebook_url} className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-primary text-white fs-14 font-semibold py-2.5 hover:opacity-90 transition-opacity">
                                <BiRotateLeft className="text-lg" />Book Again
                            </Link>
                        )}
                    </Panel>

                    {/* payment */}
                    <Panel title="Payment">
                        <div className="flex justify-between fs-14 py-1">
                            <span className="text-gray-500">Consultation Fee</span>
                            <span className="text-gray-800">{formatCurrency(parseInt(detail.booking_charge) || 0)}</span>
                        </div>
                        {serviceCharge > 0 && (
                            <div className="flex justify-between fs-14 py-1">
                                <span className="text-gray-500">Other Charges</span>
                                <span className="text-gray-800">{formatCurrency(serviceCharge)}</span>
                            </div>
                        )}
                        <div className="flex justify-between font-semibold fs-15 pt-2 mt-1 border-t border-dashed border-gray-200">
                            <span className="text-gray-800">Total Amount</span>
                            <span className="text-primary">{formatCurrency(parseInt(detail.total_amount) || 0)}</span>
                        </div>
                    </Panel>

                    {/* careipro support */}
                    <Panel>
                        <div className="flex items-center gap-3">
                            <span className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xl"><BiSupport /></span>
                            <div className="min-w-0">
                                <div className="font-bold fs-14 text-gray-800">Need help with this booking?</div>
                                <div className="fs-13 text-gray-500">Careipro Support: {support_no}</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-3">
                            <a href={`tel:${support_no}`} className={`${outlinedButton} border-primary/40 text-primary hover:bg-primary hover:text-white`}>
                                <BiPhone />Call
                            </a>
                            <a
                                href={supportWhatsappUrl(support_no, { case_id, booking_id: activeAppointmentId, doctor_name: formatDoctorName(detail.doctor_name), consult_date: moment(detail.consult_date).format("DD MMM Y") })}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${outlinedButton} border-green-600/40 text-green-700 hover:bg-green-600 hover:text-white`}
                            >
                                <FaWhatsapp />WhatsApp
                            </a>
                        </div>
                    </Panel>
                </div>
            </div>

            <Modal open={showReviewModal} heading="Share your review" width="36rem" onClose={() => {
                setShowReviewModal(false);
                /* same as the phone: a star picked and the dialog closed still saves the rating */
                if (detail.rating !== SelectedRating) {
                    submitRating({
                        rev_id: detail.rev_id || 0,
                        appointment_id: activeAppointmentId,
                        clinic_id: detail.clinic_id,
                        doctor_id: detail.doctor_id,
                        service_loc_id: detail.servicelocation_id,
                        consultation_date: detail.consult_date,
                        patient_name: detail.patient_name
                    }, () => {
                        getAppointmentDetail(activeAppointmentId)
                    })
                }
            }}>
                <p className="fs-13 text-gray-500 mb-3">
                    {formatDoctorName(detail.doctor_name)} · {detail.clinic_name} · {moment(detail.consult_date).format("DD MMM Y")}
                </p>
                {reviewTags.map((topic, i) => (
                    <div key={`topic-${i}`}>
                        <div className="font-semibold fs-14 text-gray-800 mt-3 mb-2">{topic.topic}</div>
                        <div className="flex flex-wrap gap-2">
                            {topic.sub_topics.map((sub_topic) => (
                                <Fragment key={sub_topic.sub_topic}>
                                    <ReviewTags data={sub_topic} topic={topic.topic} selectedTags={selectedReviewTagsArr} onClick={(data) => { onSelectReviewTag(data) }} />
                                </Fragment>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="font-semibold fs-14 text-gray-800 mt-4 mb-2">Overall experience</div>
                <div className="flex justify-center">
                    <Ratingstars given_rating={SelectedRating} onChange={(r) => { setSelectedRating(r) }} className="text-primary text-3xl cursor-pointer" />
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
                        submitRatingReview({
                            rev_id: detail.rev_id || 0,
                            appointment_id: activeAppointmentId,
                            clinic_id: detail.clinic_id,
                            doctor_id: detail.doctor_id,
                            service_loc_id: detail.servicelocation_id,
                            consultation_date: detail.consult_date,
                            patient_name: detail.patient_name,
                            page_source: "my_profile_appointment_detail_page",
                        }, () => {
                            getAppointmentDetail(activeAppointmentId)
                        })
                    }}
                >
                    Submit review
                </button>
            </Modal>

            <Modal open={showCancelModal} heading="Cancel Appointment" width="34rem" onClose={() => { setShowCancelModal(false) }}>
                <p className="fs-14 font-semibold text-gray-800">
                    Are you sure you want to cancel the appointment of <span className="text-primary">{detail.patient_name}</span> with {formatDoctorName(detail.doctor_name)} on {moment(detail.consult_date).format("DD MMM Y")}?
                </p>
                <p className="fs-13 text-gray-500 mt-1">This can not be undone. You will need to book again to visit the doctor.</p>
                <div className="font-semibold fs-14 text-gray-800 mt-4 mb-2">Why do you want to cancel?</div>
                <div className="flex flex-wrap gap-2">
                    {CANCEL_REASONS.map((reason) => (
                        <button
                            key={reason}
                            type="button"
                            onClick={() => { setCancelReason(reason) }}
                            className={`fs-13 rounded-full border px-3 py-1.5 transition-colors ${cancelReason === reason
                                ? "border-primary bg-primary/10 text-primary font-semibold"
                                : "border-gray-200 text-gray-700 hover:border-primary"}`}
                        >
                            {reason}
                        </button>
                    ))}
                </div>
                {cancelReason === OTHER_CANCEL_REASON && (
                    <textarea
                        className="w-full h-24 mt-3 border border-gray-200 rounded-lg px-3 py-2 fs-14 outline-none focus:border-primary transition-colors"
                        maxLength={250}
                        autoFocus
                        placeholder="Please tell us your reason"
                        value={otherCancelReason}
                        onChange={(e) => { setOtherCancelReason(e.target.value) }}
                    />
                )}
                <div className="flex gap-2 mt-4">
                    <button type="button" className="flex-1 rounded-lg border border-gray-200 text-gray-700 font-semibold fs-14 py-2.5 hover:border-primary hover:text-primary transition-colors" onClick={() => { setShowCancelModal(false) }}>
                        No, Keep it
                    </button>
                    <button
                        type="button"
                        disabled={cancellingAppointment || !finalCancelReason}
                        className="flex-1 rounded-lg bg-secondary text-white font-semibold fs-14 py-2.5 hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                        onClick={() => {
                            cancelAppointment(activeAppointmentId, finalCancelReason, () => { setShowCancelModal(false) })
                        }}
                    >
                        {cancellingAppointment ? "Cancelling..." : "Yes, Cancel"}
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default AppointmentDetailDesktop;
