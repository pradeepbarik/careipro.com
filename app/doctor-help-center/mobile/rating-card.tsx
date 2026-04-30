'use client';

import ReviewTags from "@/app/components/mobile/review-tags";
import Ratingstars from "@/app/components/mobile/ui/rating-stars";
import SlideUpModal from "@/app/components/mobile/ui/slide-up-modal";
import moment from "@/lib/helper/date-time";
import useSubmitRatingReview from "@/lib/hooks/user-profile/useSubmitRatingReview";
import { Fragment, useEffect, useState } from "react";
import { BiStar } from "react-icons/bi";

const RatingCard = ({clinic_id, doctor_id, service_loc_id}:{clinic_id:number,doctor_id:number,service_loc_id:number}) => {
    const { reviewTags, showReviewModal, setShowReviewModal, setSelectedRating, SelectedRating, selectedReviewTagsArr, onSelectReviewTag, reviewText, setReviewText, submitRatingReview, reset } = useSubmitRatingReview({});
    const [submitted, setSubmitted] = useState(false);
     const openReviewModal = (rating: number) => {
        setShowReviewModal(true);
        setSelectedRating(rating);
    }
    const onSuccessSubmitReview = () => {
        localStorage.setItem("doctor_help_center_review_submitted", moment().format("YYYY-MM-DD"));
        setShowReviewModal(false);
        reset();
        setSubmitted(true);
    }
    useEffect(() => {
        const lastSubmittedDate = localStorage.getItem("doctor_help_center_review_submitted");
        if (lastSubmittedDate) {
            const today = moment().format("YYYY-MM-DD");
            if (lastSubmittedDate === today) {
                setSubmitted(true);
            }
        }
    }, [])
    return (
        <>
         {submitted ? <>
                    <div className="p-2 shadow-md rounded-md border bg-green-50" style={{ transition: "opacity .5s" }}>
                        <p className="font-semibold text-ceneter text-lg">Thanks for sharing your feedback!</p>
                        <p className="text-center">We appreciate your time and effort in helping us improve our services.</p>
                    </div>
                </> : <>
                    <div>
                        <h2 className="text-lg font-semibold mb-3">Share your Feedback</h2>
                        <div className="p-2 shadow-md rounded-md border bg-orange-50 flex gap-4" style={{ transition: "opacity .5s" }}>
                            <div className="grow">
                                <div>Your Feedback helps us improve our services</div>
                                <div className="flex items-center">
                                    <span className="font-semibold">Share your Feedback</span>
                                    <div className="flex justify-around ml-auto">
                                        <BiStar size={22} className="text-yellow-700" onClick={() => { openReviewModal(1) }} />
                                        <BiStar size={22} className="text-yellow-700" onClick={() => { openReviewModal(2) }} />
                                        <BiStar size={22} className="text-yellow-700" onClick={() => { openReviewModal(3) }} />
                                        <BiStar size={22} className="text-yellow-700" onClick={() => { openReviewModal(4) }} />
                                        <BiStar size={22} className="text-yellow-700" onClick={() => { openReviewModal(5) }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>}
                {!submitted &&
                <SlideUpModal heading="Share your feedback" open={showReviewModal} onClose={() => { setShowReviewModal(false) }}>
                    <>
                        {/* Feedback form content goes here */}
                        <div className="flex justify-center">
                            <Ratingstars given_rating={SelectedRating} onChange={(r) => { setSelectedRating(r) }} className="color-primary text-3xl" />
                        </div>
                        <div>
                            {/* Review tags and submission button */}
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
                            <div className="mt-2">
                                <textarea className="w-full h-24 border textarea" placeholder="Write anything else (Optional)" value={reviewText} onChange={(e) => { setReviewText(e.target.value) }}></textarea>
                            </div>
                        </div>
                        <button className="button w-full sticky bottom-0" onClick={() => {
                            submitRatingReview({
                                appointment_id: 0,
                                consultation_date: "",
                                rev_id: 0,
                                clinic_id: clinic_id,
                                doctor_id: doctor_id,
                                service_loc_id: service_loc_id,
                                case: "general_review",
                                page_source: "doctor_help_center",
                                patient_name:""
                            }, () => {
                                onSuccessSubmitReview();
                            })
                        }}>Submit Review</button>
                    </>
                </SlideUpModal>
            }
        </>
    )
}
export default RatingCard;