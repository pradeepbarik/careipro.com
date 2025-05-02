"use client"
import { Fragment, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { BiSolidLocationPlus, BiPencil, BiTrash, BiCommentDetail } from "react-icons/bi";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import Header from "@/app/components/mobile/header";
import { SectionHeading, SlideUpModal } from "@/app/components/mobile/ui";
import Ratingstars from '@/app/components/mobile/ui/rating-stars';
import ReviewTags from "@/app/components/mobile/review-tags";
import { formatDoctorName, formatCurrency } from "@/lib/helper/format-text";
import useAppointment from "@/lib/hooks/user-profile/useAppointment";
import useSubmitRatingReview from "@/lib/hooks/user-profile/useSubmitRatingReview";
import moment from "@/lib/helper/date-time";
import 'swiper/css';
const AppointmentDetailMobile = ({ case_id, appointmentId }: { case_id: number, appointmentId: number }) => {
    const fileRef = useRef<HTMLInputElement>(null);
    const [swiper, setSwiper] = useState<any>(null);
    const { activeAppointmentId, appointmentDetail, caseAppointmentIds, onSwipeEnd, getAppointmentDetail, onSelectPrescriptionImage, deletePrescription, caseAppointmentDetails } = useAppointment({ page: "detail", init: true, appointmentId: appointmentId, case_id: case_id });
    const { reviewTags, showReviewModal, setShowReviewModal, setSelectedRating, SelectedRating, selectedReviewTagsArr, setSelectedReviewTagsArr, setSelectedReviewTags, onSelectReviewTag, reviewText, setReviewText, submitRatingReview, submitRating } = useSubmitRatingReview({ review_text: appointmentDetail?.experience || "" });
    useEffect(() => {
        if (caseAppointmentDetails[activeAppointmentId]?.review_tags) {
            let reviewtags: string[] = [];
            for (let tag of caseAppointmentDetails[activeAppointmentId].review_tags) {
                reviewtags.push(tag.tag)
            }
            setSelectedReviewTagsArr(reviewtags)
            setSelectedReviewTags(caseAppointmentDetails[activeAppointmentId]?.review_tags)
        } else {
            setSelectedReviewTagsArr([])
            setSelectedReviewTags([])
        }
    }, [activeAppointmentId, caseAppointmentDetails[activeAppointmentId]?.rev_id])
    return (
        <>
            <Header heading={`Appointment Detail (Case No: ${case_id})`} template="SUBPAGE" />
            {(appointmentDetail && caseAppointmentIds.length) &&
                <>
                    <div className="flex px-2 py-2 gap-2 bg-white">
                        <img src={appointmentDetail.doctor_photo} alt={appointmentDetail.doctor_name} className="h-20 w-20 rounded-full" />
                        <div>
                            <div className="font-semibold">
                                <span className="fs-16">{formatDoctorName(appointmentDetail.doctor_name)}</span>
                            </div>
                            <div className="font-semibold color-text-light">
                                <span>Clinic&nbsp;</span>
                                <span className="color-primary">{appointmentDetail.clinic_name}</span>
                            </div>
                            <div className="font-semibold color-text-light flex items-center">
                                <BiSolidLocationPlus />
                                <span className="">{appointmentDetail.location}</span>
                            </div>
                        </div>
                    </div>
                    <SectionHeading heading="Patient Information" />
                    <div className="px-2 py-2 bg-white">
                        <div className="flex">
                            <span className="font-semibold flex flex-col">
                                <span className="color-text-light">Patient Name :</span>
                                <span className="fs-17">{appointmentDetail.patient_name}</span>
                            </span>
                            <span className="font-semibold flex flex-col ml-auto">
                                <span className="color-text-light">Patient Contact No :</span>
                                <span className="fs-17">{appointmentDetail.patient_mobile}</span>
                            </span>
                        </div>
                        <div className="flex mt-2">
                            <span className="font-semibold flex flex-col grow">
                                <span className="color-text-light">Patient Age :</span>
                                <span className="fs-17">{appointmentDetail.patient_age} Years</span>
                            </span>
                            <span className="font-semibold flex flex-col grow">
                                <span className="color-text-light">Patient Gender :</span>
                                <span className="fs-17">{appointmentDetail.patient_gender}</span>
                            </span>
                            <span className="font-semibold flex flex-col grow">
                                <span className="color-text-light">Patient Address :</span>
                                <span className="fs-17">{appointmentDetail.patient_address}</span>
                            </span>
                        </div>

                    </div>
                    <div className="flex items-center justify-center gap-4 mt-2">
                        <span className="border h-6 w-6 rounded-full flex items-center justify-center border-color-grey" onClick={() => { swiper.slidePrev() }}>
                            <AiOutlineLeft />
                        </span>
                        <span className="font-bold color-primary flex flex-col items-center">
                            <span className="fs-16">{appointmentDetail.patient_name} ({moment(appointmentDetail.consult_date).format("DD MMM Y")})</span>
                        </span>
                        <span className="border h-6 w-6 rounded-full flex items-center justify-center border-color-grey" onClick={() => { swiper.slideNext() }}>
                            <AiOutlineRight />
                        </span>
                    </div>
                    <Swiper initialSlide={caseAppointmentIds.indexOf(activeAppointmentId)} onSwiper={(s) => { setSwiper(s) }} onSlideChange={(swiper) => {
                        onSwipeEnd(swiper.activeIndex);

                    }} >
                        {caseAppointmentIds.map((bid) =>
                            <SwiperSlide key={bid}>
                                {caseAppointmentDetails[bid] ? <>
                                    <div className="bg-white py-2 mt-2 px-2">
                                        <div className="font-semibold flex">
                                            <span className="flex flex-col grow shrink-0 basis-0">
                                                <span className="color-text-light">Sl No:</span>
                                                <span className="fs-17">{caseAppointmentDetails[bid].today_booking_id}</span>
                                            </span>
                                            <span className="flex flex-col grow shrink-0 basis-0">
                                                <span className="color-text-light">Date :</span>
                                                <span className="fs-17">{moment(caseAppointmentDetails[bid].consult_date).format("DD MMM Y")}</span>
                                            </span>
                                            <span className="ml-auto flex flex-col grow basis-0">
                                                <span className="color-text-light">Booking Time :</span>
                                                <span className="fs-17">{moment(caseAppointmentDetails[bid].booking_time).format("DD MMM Y hh:mm a")}</span>
                                            </span>
                                        </div>
                                        <div className="font-semibold flex">
                                            <span className="flex flex-col grow shrink-0 basis-0">
                                                <span className="color-text-light">Consultaion Fee :</span>
                                                <span className="fs-17">{formatCurrency(parseInt(caseAppointmentDetails[bid].booking_charge))}</span>
                                            </span>
                                            <span className="flex flex-col grow shrink-0 basis-0">
                                                <span className="color-text-light">Other Charges :</span>
                                                <span className="fs-17">{formatCurrency(parseInt(caseAppointmentDetails[bid].service_charge))}</span>
                                            </span>
                                            <span className="flex flex-col grow shrink-0 basis-0">
                                                <span className="color-text-light">Total Amount :</span>
                                                <span className="fs-17">{formatCurrency(parseInt(caseAppointmentDetails[bid].total_amount))}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <SectionHeading heading="Prescription" />
                                    <input type="file" ref={fileRef} accept="image/*" onChange={onSelectPrescriptionImage} style={{ display: "none" }} />
                                    {caseAppointmentDetails[bid].prescriptions.length > 0 ?
                                        <>
                                            <div className="grid grid-cols-2 gap-2 px-2">
                                                {caseAppointmentDetails[bid].prescriptions.map((prescription) =>
                                                    <div key={prescription} className="h-28 overflow-hidden border border-color-grey rounded-md relative">
                                                        <img src={prescription} className="w-full" />
                                                        <BiTrash onClick={() => { deletePrescription(prescription) }} className="absolute right-2 bottom-2 bg-secondary color-white rounded-md h-6 w-6 p-1" />
                                                    </div>
                                                )}
                                                {/* <div className="h-28 overflow-hidden border border-dashed border-color-grey rounded-md flex items-center justify-center" onClick={() => { fileRef.current && fileRef.current.click() }}>
                                <BiFolderPlus className="h-14 w-14 color-primary" />
                            </div> */}
                                            </div>
                                            <div className="flex justify-center mt-2">
                                                <button className="button" onClick={() => { fileRef.current && fileRef.current.click() }}>Upload Prescription</button>
                                            </div>
                                        </> :

                                        <div className="px-2 py-2 bg-white">
                                            <div className="flex justify-center">
                                                <img src="/icon/upload-document.png" />
                                            </div>
                                            <div className="font-semibold color-text-light text-center">
                                                Your prescription will be securely stored and easily accessible. If you ever lose or forget it, you can retrieve it anytime, from anywhere.
                                            </div>
                                            <div className="px-4 flex justify-center mt-3">
                                                <button className="button" onClick={() => { fileRef.current && fileRef.current.click() }}>Upload Prescription</button>
                                            </div>
                                        </div>
                                    }
                                    {caseAppointmentDetails[bid].rev_id ?
                                        <>
                                            <SectionHeading heading="Your Feedback" children={<span className="ml-auto button" data-size="small" data-variant="outlined" onClick={() => {
                                                setShowReviewModal(true); setSelectedRating(caseAppointmentDetails[bid].rating)
                                            }}><BiPencil />&nbsp;Edit</span>} />
                                            <div className="px-2 py-2 bg-white">
                                                <div className="flex justify-center">
                                                    <Ratingstars disable={true} given_rating={caseAppointmentDetails[bid].rating} className="color-primary text-3xl" />
                                                </div>
                                                {caseAppointmentDetails[bid].experience &&
                                                    <div className="flex items-center mt-2">
                                                        <BiCommentDetail className="mr-1 text-xl" />
                                                        <span className="font-semibold color-text-light fs-15">
                                                            {caseAppointmentDetails[bid].experience}
                                                        </span>
                                                    </div>
                                                }
                                                <div className="flex flex-wrap gap-2 mt-4">
                                                    {caseAppointmentDetails[bid].review_tags && caseAppointmentDetails[bid].review_tags.map((tag) => <span key={tag.tag} className={`chip selected ${tag.score < 0 ? 'secondary' : ''}`}>{tag.tag}</span>)}
                                                </div>
                                            </div>
                                        </>
                                        : <>
                                            <SectionHeading heading="Share your Feedback" />
                                            <div className="px-2 py-2 bg-white">
                                                <p>We value your feedback! Share your thoughts with us and help us improve our service.</p>
                                                <div className="flex justify-center">
                                                    <Ratingstars given_rating={caseAppointmentDetails[bid].rating || 0} onClick={(r) => { setShowReviewModal(true); setSelectedRating(r) }} className="color-primary text-3xl" />
                                                </div>
                                            </div>
                                        </>}
                                </> : <>
                                    no data
                                </>}
                            </SwiperSlide>
                        )}
                    </Swiper>
                    <SlideUpModal heading="Share you Review" open={showReviewModal} onClose={() => {
                        setShowReviewModal(false);
                        if (caseAppointmentDetails[activeAppointmentId].rating !== SelectedRating) {
                            submitRating({
                                rev_id: caseAppointmentDetails[activeAppointmentId].rev_id || 0,
                                appointment_id: activeAppointmentId,
                                clinic_id: caseAppointmentDetails[activeAppointmentId].clinic_id,
                                doctor_id: caseAppointmentDetails[activeAppointmentId].doctor_id,
                                service_loc_id: caseAppointmentDetails[activeAppointmentId].servicelocation_id,
                                consultation_date: caseAppointmentDetails[activeAppointmentId].consult_date
                            }, () => {
                                getAppointmentDetail(activeAppointmentId)
                            })
                        }
                    }}>
                        <div>
                            {reviewTags.map((topic, i) => <div key={`topic-${i}`}>
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
                                    consultation_date: caseAppointmentDetails[activeAppointmentId].consult_date
                                }, () => {
                                    getAppointmentDetail(activeAppointmentId)
                                })
                            }}>Submit Review</button>
                        </div>
                    </SlideUpModal>
                </>}
        </>
    );
}
export default AppointmentDetailMobile;;