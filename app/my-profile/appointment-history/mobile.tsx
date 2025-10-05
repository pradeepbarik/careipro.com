'use client'
import { Fragment, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import Header from "@/app/components/mobile/header";
import useAppointment from "@/lib/hooks/user-profile/useAppointment";
import { formatDoctorName } from '@/lib/helper/format-text';
import Ratingstars from '@/app/components/mobile/ui/rating-stars';
import ReviewTags from "@/app/components/mobile/review-tags";
import { SlideUpModal } from "@/app/components/mobile/ui";
import useSubmitRatingReview from "@/lib/hooks/user-profile/useSubmitRatingReview";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Login from '@/app/components/mobile/login';
import { userSecreateKey } from '@/constants/storage_keys';

const MyAppointmentsMobile = ({ cookies }: { cookies: Record<string, any> }) => {
    const router=useRouter();
    const { appointments, appointment, setAppointment } = useAppointment({ init: true, page: "history" });
    const { reviewTags, showReviewModal, setShowReviewModal, setSelectedRating, SelectedRating, selectedReviewTagsArr, setSelectedReviewTagsArr, setSelectedReviewTags, onSelectReviewTag, reviewText, setReviewText, submitRatingReview, submitRating } = useSubmitRatingReview({});
    const { user_info } = useSelector((state: RootState) => {
        return {
            user_info: state.authSlice.user_info
        }
    })
    const [showLoginModal, setShowLoginModal] = useState(true);
    if (user_info === null || cookies[userSecreateKey] === undefined) {
        return (
            <>
                <Header heading="My Appointments" template="SUBPAGE" />
                <div>
                    <div className="flex flex-col items-center justify-center py-10">
                        <img src="/icon/no-data.svg" alt="Login Required" className="w-24 h-24 mb-4" />
                        <p className="text-center text-lg font-semibold mb-2">Please login to view your booking history.</p>
                        <button
                            className="button px-6 py-2 rounded-2xl bg-primary text-white font-semibold"
                            onClick={() => { setShowLoginModal(true); }}
                        >
                            Login / Signup
                        </button>
                    </div>
                </div>
                <SlideUpModal open={showLoginModal} heading='Login / Signup' onClose={() => { setShowLoginModal(false) }}>
                    <Login allowLoggedInUser={true} onLoginSuccess={() => { setShowLoginModal(false); router.refresh(); }} />
                </SlideUpModal>
            </>
        )
    }
    return (
        <>
            <Header heading="My Appointments" template="SUBPAGE" />
            {/* <div className="flex overflow-auto px-2 gap-2 hide-scroll-bar mt-2 mb-2">
                <span className="text-nowrap border bg-white rounded-3xl px-2 py-1 font-semibold flex items-center bg-primary color-white">Recent</span>
                <span className="text-nowrap border bg-white rounded-3xl px-2 py-1 font-semibold flex items-center">All History</span>
            </div> */}
            <div>
                {appointments.map((appointment) =>
                    <div key={appointment.booking_id} className="shadow-md mb-1 py-2 px-2 bg-white">
                        <div className="flex gap-3">
                            <img src={appointment.doctor_photo} className="h-16 w-16 rounded-full" />
                            <div className="grow">
                                <p className="font-semibold color-text-light">Booked appointment For <span className="color-text-deep">{appointment.patient_name}</span></p>
                                <p className="font-semibold fs-16">{formatDoctorName(appointment.doctor_name)}</p>
                                <p className="font-semibold">
                                    <span className="color-text-light">Clinic : </span>
                                    <span className="color-primary">{appointment.clinic_name}</span>
                                </p>
                                <div className="flex">
                                    <span className="flex font-semibold">
                                        <span className="color-text-light">Consult date :&nbsp;</span>
                                        <span>{appointment.consult_date}</span>
                                    </span>
                                    <span className="flex ml-auto font-semibold">
                                        <span>Sl No :&nbsp;</span>
                                        <span className="color-primary">{appointment.today_booking_id}</span>
                                    </span>
                                </div>
                            </div>
                            <Link href={`/my-profile/appointment-detail?case_id=${appointment.case_id}&appointment_id=${appointment.booking_id}`} className="ml-auto flex items-center">
                                <BiChevronRight className="text-2xl" />
                            </Link>
                        </div>
                        <div className="flex border-t py-2 items-center">
                            <div className="w-9/12 font-semibold">
                                Share your experience
                                <Ratingstars given_rating={appointment.rating || 0} className="text-2xl color-primary" onChange={(r) => {
                                    setSelectedRating(r)
                                    setSelectedReviewTagsArr(appointment.review_tags_arr || [])
                                    setSelectedReviewTags(appointment.review_tags || [])
                                    setReviewText(appointment.experience || "")
                                    setAppointment(appointment);
                                    setShowReviewModal(true);
                                }} />
                            </div>
                            {appointment.active === 1 &&
                                <div className="ml-auto font-semibold">
                                    <Link href={appointment.seo_url} className="button py-2 text one-line text-xs rounded-2xl text-center">Book Appointment</Link>
                                </div>
                            }
                        </div>
                    </div>
                )}
            </div>
            <SlideUpModal heading="Share you Review" open={showReviewModal} onClose={() => {
                setShowReviewModal(false);
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
                        if (appointment) {
                            submitRatingReview({
                                rev_id: appointment.review_id || 0,
                                appointment_id: appointment.booking_id,
                                clinic_id: appointment.clinic_id,
                                doctor_id: appointment.doctor_id,
                                service_loc_id: appointment.servicelocation_id,
                                consultation_date: appointment.consult_date,
                            }, () => {

                            })
                        }
                    }}>Submit Review</button>
                </div>
            </SlideUpModal>
        </>
    )
}
export default MyAppointmentsMobile;