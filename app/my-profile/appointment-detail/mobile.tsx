"use client"
import { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { BiSolidLocationPlus, BiPencil, BiTrash, BiCommentDetail, BiCalendarX, BiPhone, BiDirections, BiCalendar, BiTime, BiUser, BiPlus } from "react-icons/bi";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import Header from "@/app/components/mobile/header";
import { SlideUpModal } from "@/app/components/mobile/ui";
import Ratingstars from '@/app/components/mobile/ui/rating-stars';
import ReviewTags from "@/app/components/mobile/review-tags";
import { formatDoctorName, formatCurrency } from "@/lib/helper/format-text";
import useAppointment from "@/lib/hooks/user-profile/useAppointment";
import useSubmitRatingReview from "@/lib/hooks/user-profile/useSubmitRatingReview";
import moment from "@/lib/helper/date-time";
import 'swiper/css';
import { CANCEL_REASONS, OTHER_CANCEL_REASON, isCancelledStatus, statusBadge, directionsUrl, supportWhatsappUrl } from "./appointment-ui";
import { support_no } from "@/constants/site-config";
import { BiSupport, BiRotateLeft } from "react-icons/bi";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
const Card = ({ title, action, children, className = "" }: { title?: string, action?: ReactNode, children: ReactNode, className?: string }) => (
    <div className={`bg-white rounded-xl shadow-card mx-3 mt-3 p-3 ${className}`}>
        {(title || action) &&
            <div className="flex items-center mb-2">
                {title && <span className="font-semibold fs-16 text-deep">{title}</span>}
                {action && <span className="ml-auto">{action}</span>}
            </div>}
        {children}
    </div>
);
const InfoItem = ({ label, value, className = "" }: { label: string, value: ReactNode, className?: string }) => (
    <div className={`flex flex-col min-w-0 ${className}`}>
        <span className="text-muted fs-13">{label}</span>
        <span className="font-semibold fs-15 text-deep break-words">{value}</span>
    </div>
);
const AppointmentDetailMobile = ({ case_id, appointmentId }: { case_id: number, appointmentId: number }) => {
    const fileRef = useRef<HTMLInputElement>(null);
    const [swiper, setSwiper] = useState<any>(null);
    const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
    const [cancelReason, setCancelReason] = useState<string>("");
    const [otherCancelReason, setOtherCancelReason] = useState<string>("");
    const finalCancelReason = cancelReason === OTHER_CANCEL_REASON ? otherCancelReason.trim() : cancelReason;
    const { activeAppointmentId, appointmentDetail, caseAppointmentIds, onSwipeEnd, getAppointmentDetail, onSelectPrescriptionImage, deletePrescription, caseAppointmentDetails, cancelAppointment, cancellingAppointment } = useAppointment({ page: "detail", init: true, appointmentId: appointmentId, case_id: case_id });
    const { reviewTags, showReviewModal, setShowReviewModal, setSelectedRating, SelectedRating, selectedReviewTagsArr, setSelectedReviewTagsArr, setSelectedReviewTags, onSelectReviewTag, reviewText, setReviewText, submitRatingReview, submitRating } = useSubmitRatingReview({ review_text: appointmentDetail?.experience || "" });
    useEffect(() => {
        if (caseAppointmentDetails[activeAppointmentId] && caseAppointmentDetails[activeAppointmentId].review_tags !== null) {
            let reviewtags: string[] = (caseAppointmentDetails[activeAppointmentId].review_tags || []).map((tag) => tag.tag);
            setSelectedReviewTagsArr(reviewtags)
            setSelectedReviewTags(caseAppointmentDetails[activeAppointmentId]?.review_tags || [])
        } else {
            setSelectedReviewTagsArr([])
            setSelectedReviewTags([])
        }
    }, [activeAppointmentId, caseAppointmentDetails[activeAppointmentId]?.rev_id])
    const activeIndex = caseAppointmentIds.indexOf(activeAppointmentId);
    const openFilePicker = () => { fileRef.current && fileRef.current.click() };
    return (
        <>
            <Header heading="Appointment Detail" template="SUBPAGE" />
            {(appointmentDetail && caseAppointmentIds.length) ?
                <div className="pb-6">
                    {/* doctor & clinic */}
                    <Card>
                        <div className="flex gap-3">
                            <img src={appointmentDetail.doctor_photo} alt={appointmentDetail.doctor_name} className="h-16 w-16 rounded-full object-cover border border-line-light shrink-0" />
                            <div className="min-w-0">
                                <div className="font-semibold fs-17 text-deep">{formatDoctorName(appointmentDetail.doctor_name)}</div>
                                <div className="font-semibold text-primary fs-14">{appointmentDetail.clinic_name}</div>
                                {appointmentDetail.location &&
                                    <div className="text-muted fs-13 flex items-start gap-1 mt-0.5">
                                        <BiSolidLocationPlus className="shrink-0 mt-0.5" />
                                        <span>{appointmentDetail.location}</span>
                                    </div>}
                            </div>
                        </div>
                        {(appointmentDetail.clinic_contact_no || (appointmentDetail.location_lat && appointmentDetail.location_lng)) &&
                            <div className="flex gap-2 mt-3">
                                {appointmentDetail.clinic_contact_no &&
                                    <a href={`tel:${appointmentDetail.clinic_contact_no}`} className="flex-1 flex items-center justify-center gap-1 rounded-lg border border-primary/40 text-primary font-semibold py-2 fs-14">
                                        <BiPhone /> Call Clinic
                                    </a>}
                                {(appointmentDetail.location_lat && appointmentDetail.location_lng) &&
                                    <a href={directionsUrl(appointmentDetail.location_lat, appointmentDetail.location_lng)} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1 rounded-lg border border-primary/40 text-primary font-semibold py-2 fs-14">
                                        <BiDirections /> Directions
                                    </a>}
                            </div>}
                        {/* only while the doctor is still listed, the api leaves it empty otherwise */}
                        {appointmentDetail.rebook_url &&
                            <Link href={appointmentDetail.rebook_url} className="mt-2 w-full flex items-center justify-center gap-1 rounded-lg bg-primary text-white font-semibold py-2.5 fs-14">
                                <BiRotateLeft className="text-lg" /> Book Again
                            </Link>}
                    </Card>
                    {/* visit switcher, only when the case has more than one visit */}
                    <div className="flex items-center mx-3 mt-4">
                        <div className="flex flex-col">
                            <span className="text-muted fs-13">Case No: {case_id}</span>
                            {caseAppointmentIds.length > 1 &&
                                <span className="font-semibold text-deep fs-15">Visit {activeIndex + 1} of {caseAppointmentIds.length}</span>}
                        </div>
                        {caseAppointmentIds.length > 1 &&
                            <div className="ml-auto flex gap-2">
                                <button aria-label="Previous visit" disabled={activeIndex <= 0} className="h-8 w-8 rounded-full bg-white shadow-card flex items-center justify-center text-primary disabled:opacity-40" onClick={() => { swiper && swiper.slidePrev() }}>
                                    <AiOutlineLeft />
                                </button>
                                <button aria-label="Next visit" disabled={activeIndex >= caseAppointmentIds.length - 1} className="h-8 w-8 rounded-full bg-white shadow-card flex items-center justify-center text-primary disabled:opacity-40" onClick={() => { swiper && swiper.slideNext() }}>
                                    <AiOutlineRight />
                                </button>
                            </div>}
                    </div>
                    <input type="file" ref={fileRef} accept="image/*" onChange={onSelectPrescriptionImage} style={{ display: "none" }} />
                    <Swiper initialSlide={activeIndex} autoHeight={true} onSwiper={(s) => { setSwiper(s) }} onSlideChange={(swiper) => {
                        onSwipeEnd(swiper.activeIndex);
                    }} >
                        {caseAppointmentIds.map((bid) => {
                            const detail = caseAppointmentDetails[bid];
                            if (!detail) {
                                return (
                                    <SwiperSlide key={bid}>
                                        <Card><div className="text-muted text-center py-6">Loading appointment...</div></Card>
                                    </SwiperSlide>
                                );
                            }
                            const badge = statusBadge(detail.status);
                            const cancelled = isCancelledStatus(detail.status);
                            const serviceCharge = parseInt(detail.service_charge) || 0;
                            return (
                                <SwiperSlide key={bid}>
                                    {/* appointment */}
                                    <Card>
                                        <div className="flex items-start">
                                            <div>
                                                <span className="text-muted fs-13">Token No.</span>
                                                <div className={`font-bold text-3xl leading-none mt-1 ${cancelled ? 'text-muted line-through' : 'text-primary'}`}>{detail.today_booking_id || "-"}</div>
                                            </div>
                                            <span className={`ml-auto rounded-full px-3 py-1 fs-13 font-semibold ${badge.className}`}>{badge.label}</span>
                                        </div>
                                        <div className="flex gap-4 mt-3 pt-3 border-t border-line-light">
                                            <div className="flex items-center gap-2">
                                                <BiCalendar className="text-primary text-xl shrink-0" />
                                                <InfoItem label="Visit Date" value={moment(detail.consult_date).format("ddd, DD MMM Y")} />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <BiTime className="text-primary text-xl shrink-0" />
                                                <InfoItem label="Booked On" value={moment(detail.booking_time).format("DD MMM, hh:mm a")} />
                                            </div>
                                        </div>
                                        {detail.can_cancel &&
                                            <button className="w-full mt-3 flex items-center justify-center gap-1 rounded-lg border border-secondary/40 text-secondary font-semibold py-2 fs-14" onClick={() => { setCancelReason(""); setOtherCancelReason(""); setShowCancelModal(true) }}>
                                                <BiCalendarX /> Cancel Appointment
                                            </button>}
                                    </Card>
                                    {/* patient */}
                                    <Card title="Patient">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"><BiUser /></span>
                                            <div className="min-w-0">
                                                <div className="font-semibold fs-15 text-deep">{detail.patient_name}</div>
                                                <div className="text-muted fs-13">
                                                    {[detail.patient_age ? `${detail.patient_age} Years` : "", detail.patient_gender].filter(Boolean).join(" · ")}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            {detail.patient_mobile && <InfoItem label="Contact No." value={detail.patient_mobile} />}
                                            {detail.patient_address && <InfoItem label="Address" value={detail.patient_address} className="col-span-2" />}
                                        </div>
                                    </Card>
                                    {/* payment */}
                                    <Card title="Payment">
                                        <div className="flex justify-between fs-14 py-1">
                                            <span className="text-muted">Consultation Fee</span>
                                            <span className="text-deep">{formatCurrency(parseInt(detail.booking_charge) || 0)}</span>
                                        </div>
                                        {serviceCharge > 0 &&
                                            <div className="flex justify-between fs-14 py-1">
                                                <span className="text-muted">Other Charges</span>
                                                <span className="text-deep">{formatCurrency(serviceCharge)}</span>
                                            </div>}
                                        <div className="flex justify-between font-semibold fs-15 pt-2 mt-1 border-t border-dashed border-line">
                                            <span className="text-deep">Total Amount</span>
                                            <span className="text-primary">{formatCurrency(parseInt(detail.total_amount) || 0)}</span>
                                        </div>
                                    </Card>
                                    {/* prescriptions, not offered on a cancelled visit unless some were already uploaded */}
                                    {(!cancelled || detail.prescriptions.length > 0) &&
                                        <Card title="Prescriptions" action={detail.prescriptions.length > 0 ?
                                            <span className="button" data-size="small" data-variant="outlined" onClick={openFilePicker}><BiPlus />&nbsp;Add</span> : undefined}>
                                            {detail.prescriptions.length > 0 ?
                                                <div className="grid grid-cols-3 gap-2">
                                                    {detail.prescriptions.map((prescription) =>
                                                        <div key={prescription} className="aspect-square overflow-hidden border border-line-light rounded-lg relative">
                                                            <a href={prescription} target="_blank" rel="noopener noreferrer">
                                                                <img src={prescription} alt="Prescription" className="w-full h-full object-cover" />
                                                            </a>
                                                            <button aria-label="Delete prescription" className="absolute right-1 top-1 bg-white/90 text-secondary rounded-full h-7 w-7 flex items-center justify-center shadow-card" onClick={() => {
                                                                if (window.confirm("Delete this prescription?")) {
                                                                    deletePrescription(prescription)
                                                                }
                                                            }}>
                                                                <BiTrash />
                                                            </button>
                                                        </div>
                                                    )}
                                                    <button className="aspect-square border border-dashed border-primary/40 rounded-lg flex flex-col items-center justify-center text-primary fs-13" onClick={openFilePicker}>
                                                        <BiPlus className="text-2xl" />
                                                        Upload
                                                    </button>
                                                </div> :
                                                <div className="flex items-center gap-3 rounded-lg bg-primary/5 p-3">
                                                    <img src="/icon/upload-document.png" alt="" className="h-12 w-12 object-contain shrink-0" />
                                                    <div className="min-w-0">
                                                        <div className="text-muted fs-13">Keep your prescription safe here and find it anytime, from anywhere.</div>
                                                        <button className="button mt-2" data-size="small" onClick={openFilePicker}>Upload Prescription</button>
                                                    </div>
                                                </div>}
                                        </Card>}
                                    {/* feedback, a cancelled visit has nothing to rate */}
                                    {!cancelled && (detail.rev_id ?
                                        <Card title="Your Feedback" action={
                                            <span className="button" data-size="small" data-variant="outlined" onClick={() => {
                                                setShowReviewModal(true); setSelectedRating(detail.rating)
                                            }}><BiPencil />&nbsp;Edit</span>}>
                                            <Ratingstars disable={true} given_rating={detail.rating} className="color-primary text-2xl" />
                                            {detail.experience &&
                                                <div className="flex items-start gap-1 mt-2 text-muted fs-14">
                                                    <BiCommentDetail className="shrink-0 mt-0.5" />
                                                    <span>{detail.experience}</span>
                                                </div>}
                                            {(detail.review_tags || []).length > 0 &&
                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    {(detail.review_tags || []).map((tag) => <span key={tag.tag} className={`chip selected ${tag.score < 0 ? 'secondary' : ''}`}>{tag.tag}</span>)}
                                                </div>}
                                        </Card>
                                        :
                                        <Card title="How was your visit?">
                                            <div className="text-muted fs-13">Your rating helps other patients choose the right doctor.</div>
                                            <div className="flex justify-center mt-2">
                                                <Ratingstars given_rating={detail.rating || 0} onClick={(r) => { setShowReviewModal(true); setSelectedRating(r) }} className="color-primary text-3xl" />
                                            </div>
                                        </Card>)}
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                    {/* careipro support, for the visit on screen */}
                    <Card>
                        <div className="flex items-center gap-3">
                            <span className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xl"><BiSupport /></span>
                            <div className="min-w-0">
                                <div className="font-semibold fs-15 text-deep">Need help with this booking?</div>
                                <div className="text-muted fs-13">Careipro Support: {support_no}</div>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                            <a href={`tel:${support_no}`} className="flex-1 flex items-center justify-center gap-1 rounded-lg border border-primary/40 text-primary font-semibold py-2 fs-14">
                                <BiPhone /> Call Support
                            </a>
                            <a href={supportWhatsappUrl(support_no, { case_id, booking_id: activeAppointmentId, doctor_name: formatDoctorName(appointmentDetail.doctor_name), consult_date: moment(appointmentDetail.consult_date).format("DD MMM Y") })} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1 rounded-lg border border-green-600/40 text-green-700 font-semibold py-2 fs-14">
                                <FaWhatsapp /> WhatsApp
                            </a>
                        </div>
                    </Card>
                    <SlideUpModal heading="Share your Review" open={showReviewModal} onClose={() => {
                        setShowReviewModal(false);
                        if (caseAppointmentDetails[activeAppointmentId].rating !== SelectedRating) {
                            submitRating({
                                rev_id: caseAppointmentDetails[activeAppointmentId].rev_id || 0,
                                appointment_id: activeAppointmentId,
                                clinic_id: caseAppointmentDetails[activeAppointmentId].clinic_id,
                                doctor_id: caseAppointmentDetails[activeAppointmentId].doctor_id,
                                service_loc_id: caseAppointmentDetails[activeAppointmentId].servicelocation_id,
                                consultation_date: caseAppointmentDetails[activeAppointmentId].consult_date,
                                patient_name: caseAppointmentDetails[activeAppointmentId].patient_name
                            }, () => {
                                getAppointmentDetail(activeAppointmentId)
                            })
                        }
                    }}>
                        <div>
                            {reviewTags.map((topic, i) =>
                                <div key={`topic-${i}`}>
                                    <div className="font-semibold my-2">{topic.topic}</div>
                                    <div className="flex flex-wrap gap-2">
                                        {topic.sub_topics.map((sub_topic) =>
                                            <Fragment key={sub_topic.sub_topic}>
                                                <ReviewTags data={sub_topic} topic={topic.topic} selectedTags={selectedReviewTagsArr} onClick={(data) => { onSelectReviewTag(data) }} />
                                            </Fragment>
                                        )}
                                    </div>
                                </div>)}
                            <div className="font-semibold my-2">Overall Experience</div>
                            <div className="flex justify-center">
                                <Ratingstars given_rating={SelectedRating} onChange={(r) => { setSelectedRating(r) }} className="color-primary text-3xl" />
                            </div>
                            <div className="mt-2">
                                <textarea className="w-full h-24 border textarea" placeholder="Write anything else (Optional)" value={reviewText} onChange={(e) => { setReviewText(e.target.value) }}></textarea>
                            </div>
                            <button className="button w-full" onClick={() => {
                                submitRatingReview({
                                    rev_id: caseAppointmentDetails[activeAppointmentId].rev_id || 0,
                                    appointment_id: activeAppointmentId,
                                    clinic_id: caseAppointmentDetails[activeAppointmentId].clinic_id,
                                    doctor_id: caseAppointmentDetails[activeAppointmentId].doctor_id,
                                    service_loc_id: caseAppointmentDetails[activeAppointmentId].servicelocation_id,
                                    consultation_date: caseAppointmentDetails[activeAppointmentId].consult_date,
                                    patient_name: caseAppointmentDetails[activeAppointmentId].patient_name,
                                    page_source: "my_profile_appointment_detail_page",
                                }, () => {
                                    getAppointmentDetail(activeAppointmentId)
                                })
                            }}>Submit Review</button>
                        </div>
                    </SlideUpModal>
                    <SlideUpModal heading="Cancel Appointment" open={showCancelModal} onClose={() => { setShowCancelModal(false) }}>
                        {caseAppointmentDetails[activeAppointmentId] &&
                            <div>
                                <p className="font-semibold">
                                    Are you sure you want to cancel the appointment of <span className="color-primary">{caseAppointmentDetails[activeAppointmentId].patient_name}</span> with {formatDoctorName(caseAppointmentDetails[activeAppointmentId].doctor_name)} on {moment(caseAppointmentDetails[activeAppointmentId].consult_date).format("DD MMM Y")}?
                                </p>
                                <p className="color-text-light mt-1">This can not be undone. You will need to book again to visit the doctor.</p>
                                <div className="font-semibold my-2">Why do you want to cancel?</div>
                                <div className="flex flex-wrap gap-2">
                                    {CANCEL_REASONS.map((reason) =>
                                        <span key={reason} className={`chip ${cancelReason === reason ? 'selected' : ''}`} onClick={() => { setCancelReason(reason) }}>{reason}</span>
                                    )}
                                </div>
                                {cancelReason === OTHER_CANCEL_REASON &&
                                    <div className="mt-2">
                                        <textarea className="w-full h-24 border textarea" maxLength={250} autoFocus placeholder="Please tell us your reason" value={otherCancelReason} onChange={(e) => { setOtherCancelReason(e.target.value) }}></textarea>
                                    </div>}
                                <div className="flex gap-2 mt-4">
                                    <button className="button grow" data-variant="outlined" onClick={() => { setShowCancelModal(false) }}>No, Keep it</button>
                                    <button className="button grow" disabled={cancellingAppointment || !finalCancelReason} onClick={() => {
                                        cancelAppointment(activeAppointmentId, finalCancelReason, () => { setShowCancelModal(false) })
                                    }}>{cancellingAppointment ? "Cancelling..." : "Yes, Cancel"}</button>
                                </div>
                            </div>}
                    </SlideUpModal>
                </div>
                : null}
        </>
    );
}
export default AppointmentDetailMobile;
