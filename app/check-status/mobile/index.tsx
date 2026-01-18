'use client'
import Link from "next/link";
import { BiChevronsRight, BiPhoneOutgoing, BiTimeFive, BiCopy, BiStar, BiSolidStar } from "react-icons/bi";
import Header from "@/app/components/mobile/header";
import { Button, Input, SectionHeading, SlideUpModal } from "@/app/components/mobile/ui";
import useAppointmentStatusCheck from '../useAppointmentStatusCheck';
import moment from "moment";
import { formatCurrency, formatDoctorName } from "@/lib/helper/format-text";
import PageVisitLogger from "@/app/components/client-components/page-visit-logger";
import { support_no } from "@/constants/site-config";
import { doctorDetailPageUrl } from "@/lib/helper/link";
import { toast } from "react-toastify";
import ClinicDoctors from "@/app/components/mobile/clinics/clinic-doctors";
import useSubmitRatingReview from "@/lib/hooks/user-profile/useSubmitRatingReview";
import Ratingstars from "@/app/components/mobile/ui/rating-stars";
import { Fragment, useEffect } from "react";
import ReviewTags from "@/app/components/mobile/review-tags";
const getRatingStarColor = (rating: number) => {
    if (rating <= 1) {
        return "color-secondary";
    } else if (rating > 1 && rating <= 2) {
        return "color-secondary";
    } else if (rating > 2 && rating <= 3) {
        return "text-yellow-400";
    } else if (rating > 3 && rating <= 4) {
        return "text-yellow-600";
    } else {
        return "color-primary";
    }
}
const CheckStatusMobile = () => {
    const { appointmentDetail, clinicDetail, getAppointmentDetail, showRatingModal, setShowRatingModal } = useAppointmentStatusCheck();
    const { reviewTags, showReviewModal, setShowReviewModal, setSelectedRating, SelectedRating, selectedReviewTagsArr, setSelectedReviewTagsArr, setSelectedReviewTags, onSelectReviewTag, reviewText, setReviewText, submitRatingReview, submitRating } = useSubmitRatingReview({ review_text: "" });
    useEffect(() => {
        if (appointmentDetail) {
            setSelectedRating(appointmentDetail.rating || 0);
            let reviewtags: string[] = (appointmentDetail.review_tags || []).map((tag) => tag.tag);
            setSelectedReviewTagsArr(reviewtags)
            setSelectedReviewTags(appointmentDetail.review_tags || []);
        }
    }, [appointmentDetail?.id])
    return (
        <>
            <Header heading="Appointment Status Check" template='SUBPAGE' />
            {/* <div className="px-2 mx-2 py-2 border shadow-sm rounded-md mt-2">
                <Input lable="Enter your mobile no." type="mobile" />
                <div className="flex justify-center mt-4">
                    <button className="button" data-variant="outlined" onClick={() => { }}>CHECK STATUS <BiChevronsRight className="text-2xl" /></button>
                </div>
            </div> */}
            {/* <SectionHeading heading="Appointment Details" /> */}
            {appointmentDetail !== null ?
                <>
                    <div className="px-2 mx-2 py-2 border shadow-sm rounded-md mt-2 relative">
                        <div className="flex gap-3 py-1">
                            <span className="border border-cyan-500 rounded-md shadow-sm px-1 fs-16 font-semibold">
                                Sl.no: <b className="color-primary">{appointmentDetail.today_booking_id}</b>
                            </span>
                            <span className="ml-auto fs-15 font-semibold">
                                Consult Date :&nbsp;
                                <span className="color-secondary">{moment(appointmentDetail.consult_date).format("DD MMM YYYY")}</span>
                            </span>
                        </div>
                        <div className="py-1 flex">
                            Patient Name :
                            <b className="ml-auto">{appointmentDetail.patient_name}</b>
                        </div>
                        <div className="flex">Address: <b className="ml-auto">{appointmentDetail.patient_address}</b></div>
                        <div className="py-1 flex">Appointment Booked by <b className="ml-auto">{appointmentDetail.firstname + " " + appointmentDetail.lastname}</b></div>
                        <div className="flex">Booking Time : <b className="ml-auto">{moment(appointmentDetail.booking_time).format("DD MMM hh:mm a")}</b></div>
                        <div className="flex">Booking Status :
                            {appointmentDetail.status === "confirmed" ?
                                <b className="ml-auto text-lg color-primary">Confirmed</b> :
                                appointmentDetail.status === "doctor_cancelled" ?
                                    <b className="ml-auto text-lg color-secondary">Cancelled By Clinic</b> :
                                    appointmentDetail.status === "consulted" ?
                                        <b className="ml-auto text-lg text-green-600">Consulted</b> :
                                        <></>}
                        </div>
                        <hr className="my-1" />
                        <div className="flex items-center">
                            <div className="grow">
                                <div>
                                    Doctor Name : <b>{formatDoctorName(appointmentDetail.doctor_name)}</b>
                                </div>
                                <div className="py-1">
                                    Clinic Name : <b>{appointmentDetail.clinic_name}</b>
                                </div>
                            </div>
                            <div className="ml-auto flex" onClick={() => { setShowRatingModal(true) }}>
                                {appointmentDetail.rating && appointmentDetail.rating > 0 ? <>
                                    {appointmentDetail.rating >= 1 ? <BiSolidStar className={`fs-17 ${getRatingStarColor(appointmentDetail.rating)} zoomOut`} />
                                        : <BiStar className={`fs-17 ${getRatingStarColor(appointmentDetail.rating)} zoomOut`} />}
                                    {appointmentDetail.rating >= 2 ? <BiSolidStar className={`fs-17 ${getRatingStarColor(appointmentDetail.rating)} zoomOut`} />
                                        : <BiStar className={`fs-17 ${getRatingStarColor(appointmentDetail.rating)} zoomOut`} />}
                                    {appointmentDetail.rating >= 3 ? <BiSolidStar className={`fs-17 ${getRatingStarColor(appointmentDetail.rating)} zoomOut`} />
                                        : <BiStar className={`fs-17 ${getRatingStarColor(appointmentDetail.rating)} zoomOut`} />}
                                    {appointmentDetail.rating >= 4 ? <BiSolidStar className={`fs-17 ${getRatingStarColor(appointmentDetail.rating)} zoomOut`} />
                                        : <BiStar className={`fs-17 ${getRatingStarColor(appointmentDetail.rating)} zoomOut`} />}
                                    {appointmentDetail.rating >= 5 ? <BiSolidStar className={`fs-17 ${getRatingStarColor(appointmentDetail.rating)} zoomOut`} />
                                        : <BiStar className={`fs-17 ${getRatingStarColor(appointmentDetail.rating)} zoomOut`} />}   
                                </> : <>
                                    <BiStar className={`fs-17 color-secondary zoomOut`} />
                                    <BiStar className={`fs-17 color-secondary zoomOut`} />
                                    <BiStar className={`fs-17 text-yellow-400 zoomOut`} />
                                    <BiStar className={`fs-17 text-yellow-600 zoomOut`} />
                                    <BiStar className={`fs-17 color-primary zoomOut`} />
                                </>}

                            </div>
                        </div>
                        {appointmentDetail.consulting_timing_messages ?
                            <div className="flex items-center bg-orange-200 py-1 px-2 rounded-md border border-orange-400 font-semibold">
                                <BiTimeFive className="inline mr-1" /> {appointmentDetail.consulting_timing_messages}
                            </div> : <></>
                        }
                        {(appointmentDetail.show_rebook_btn || appointmentDetail.status === "doctor_cancelled") ? <>
                            <div className="py-2">
                                <Link href={doctorDetailPageUrl({ doctor_id: appointmentDetail.doctor_id, clinic_id: appointmentDetail.clinic_id, service_loc_id: appointmentDetail.servicelocation_id, city: appointmentDetail.clinic_city, state: appointmentDetail.clinic_state, market_name: appointmentDetail.clinic_market_name, seo_url: appointmentDetail.doctor_seo_url })} className="button" data-color="primary" >Book your Next Appointment</Link>
                            </div>
                        </> : <></>}
                        <hr className="my-2" />
                        <div className="py-1 flex">
                            Consultation Fee
                            <b className="ml-auto color-primary">{formatCurrency(parseInt(appointmentDetail.booking_charge))}</b>
                        </div>
                        <div className="py-1 flex">
                            Platform Fee
                            <b className="ml-auto color-primary">{formatCurrency(parseInt(appointmentDetail.service_charge))}</b>
                        </div>
                        <hr className="my-1" />
                        <div className="py-1 flex fs-16 font-semibold">
                            {appointmentDetail.payment_status === "paid" ? "Total Amount Paid :" : "Amount to be paid :"}
                            <b className={`ml-auto ${appointmentDetail.payment_status === "paid" ? 'color-primary' : 'color-secondary'}`}>
                                {formatCurrency(parseInt(appointmentDetail.total_amount))}
                            </b>
                        </div>
                        {(appointmentDetail.payment_status === "pending" && appointmentDetail.collect_payment_upi_id) ?
                            <div>
                                <hr className="my-1" />
                                <div className="py-1 flex gap-2 fs-15 font-semibold">
                                    <span className="fs-14">Make payment through below UPI:</span>
                                </div>
                                <div className="flex mt-1">
                                    UPI ID
                                    <span className="ml-auto font-semibold flex gap-2 items-center" onClick={() => { navigator.clipboard.writeText(appointmentDetail.collect_payment_upi_id); toast.success("UPI ID copied!", { autoClose: 1000 }) }}>
                                        {appointmentDetail.collect_payment_upi_id}
                                        <span className="flex gap-1 border rounded-full px-1 items-center border-gray-300">
                                            <BiCopy className="color-primary" />
                                            Copy
                                        </span>
                                    </span>
                                </div>
                                <div className="flex mt-3">
                                    UPI ID Mobile no
                                    <span className="ml-auto font-semibold flex gap-2 items-center" onClick={() => { navigator.clipboard.writeText(appointmentDetail.collect_payment_upi_mobile); toast.success("UPI Mobile no copied!", { autoClose: 1000 }) }}>
                                        {appointmentDetail.collect_payment_upi_mobile}
                                        <span className="flex gap-1 border rounded-full px-1 items-center border-gray-300">
                                            <BiCopy className="color-primary" />
                                            Copy
                                        </span>
                                    </span>
                                </div>
                            </div> : <></>}
                    </div>

                    <div className="font-semibold text-lg px-4 py-2">Need any help?</div>
                    <div className="flex gap-4 px-4">
                        <a href={`tel:${support_no}`} className="button grow" data-variant="outlined" data-color="secondary">Careipro Support&nbsp;&nbsp;<BiPhoneOutgoing /></a>
                        <a className="button grow" href={`tel:${appointmentDetail.clinic_contact_no}`}>Contact Clinic&nbsp;&nbsp;<BiPhoneOutgoing /></a>
                    </div>
                    <PageVisitLogger data={{
                        page_type: "detail",
                        page_name: "appointment_status_check",
                        state: appointmentDetail.clinic_state,
                        city: appointmentDetail.clinic_city,
                        clinic_id: appointmentDetail.clinic_id,
                        doctor_id: appointmentDetail.doctor_id,
                    }} />
                </>
                : <div></div>}
            {clinicDetail ? <>
                <SectionHeading heading={`Other Doctors in ${clinicDetail.clinic_info.name}`} />
                <div className="">
                    <ClinicDoctors clinic_info={clinicDetail.clinic_info} doctors={clinicDetail.doctors} specializations={clinicDetail.specializations} />
                </div>
            </> : <></>}
            <SlideUpModal heading="Share you Review" open={showRatingModal} onClose={() => {
                setShowRatingModal(false);
                // if (SelectedRating && appointmentDetail?.rating !== SelectedRating) {
                //     submitRating({
                //         rev_id: appointmentDetail?.rev_id || 0,
                //         appointment_id: appointmentDetail?.id || 0,
                //         clinic_id: appointmentDetail?.clinic_id || 0,
                //         doctor_id: appointmentDetail?.doctor_id || 0,
                //         service_loc_id: appointmentDetail?.servicelocation_id || 0,
                //         consultation_date: appointmentDetail?.consult_date || ""
                //     }, () => {
                //         getAppointmentDetail(appointmentDetail?.id)
                //     })
                // }
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
                            rev_id: appointmentDetail?.rev_id || 0,
                            appointment_id: appointmentDetail?.id || 0,
                            clinic_id: appointmentDetail?.clinic_id || 0,
                            doctor_id: appointmentDetail?.doctor_id || 0,
                            service_loc_id: appointmentDetail?.servicelocation_id || 0,
                            consultation_date: appointmentDetail?.consult_date || ""
                        }, () => {
                            getAppointmentDetail(appointmentDetail?.id)
                            setShowRatingModal(false);
                        })
                    }}>Submit Review</button>
                </div>
            </SlideUpModal>
        </>
    )
}
export default CheckStatusMobile;