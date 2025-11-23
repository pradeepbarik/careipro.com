'use client';
import { useState, Fragment } from 'react';
import { BiCommentDots } from "react-icons/bi";
import { SlideUpModal } from '@/app/components/mobile/ui';
import useSubmitRatingReview from '@/lib/hooks/user-profile/useSubmitRatingReview';
import Ratingstars from '../../ui/rating-stars';
import ReviewTags from '../../review-tags';
const DoctorFeedback = ({ doctor_id, clinic_id, service_loc_id }: { doctor_id: number, clinic_id: number, service_loc_id: number }) => {
    const { reviewTags, showReviewModal, setShowReviewModal, setSelectedRating, SelectedRating, selectedReviewTagsArr, onSelectReviewTag, reviewText, setReviewText, submitRatingReview } = useSubmitRatingReview({});
    return (
        <>
            <span className="flex flex-col items-center w-24 shrink-0" onClick={() => { setShowReviewModal(true) }}>
                <BiCommentDots className="border rounded-md p-2 w-12 h-10 bg-primary color-white" style={{ fontSize: '2.2rem' }} />
                <span>Review</span>
            </span>
            <SlideUpModal heading="Share your feedback" open={showReviewModal} onClose={() => setShowReviewModal(false)}>
                <>
                    <div className="flex justify-center">
                        <Ratingstars given_rating={SelectedRating} onChange={(r) => { setSelectedRating(r) }} className="color-primary text-3xl" />
                    </div>
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
                        <div className="mt-2">
                            <textarea className="w-full h-24 border textarea" placeholder="Write anything else (Optional)" value={reviewText} onChange={(e) => { setReviewText(e.target.value) }}></textarea>
                        </div>
                        <button className="button w-full sticky bottom-0" onClick={() => {
                            submitRatingReview({
                                appointment_id: 0,
                                consultation_date: "",
                                rev_id: 0,
                                clinic_id: clinic_id,
                                doctor_id: doctor_id,
                                service_loc_id: service_loc_id,
                                case:"general_review"
                            }, () => {
                            })
                        }}>Submit Review</button>
                    </div>
                </>
            </SlideUpModal>
        </>
    )
}
export default DoctorFeedback;