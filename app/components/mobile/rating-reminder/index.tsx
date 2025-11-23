'use client';

import useRatingReminder, { TRatingReminder } from "@/lib/hooks/useRatingReminder";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import { BiStar, BiX } from "react-icons/bi";
import { Fragment, useEffect, useState } from "react";
import { formatDoctorName } from "@/lib/helper/format-text";
import { SlideUpModal } from "../ui";
import useSubmitRatingReview from "@/lib/hooks/user-profile/useSubmitRatingReview";
import Ratingstars from "../ui/rating-stars";
import ReviewTags from "../review-tags";
const RatingReminder = ({ catid, doctor_id }: { catid: number, doctor_id: number }) => {
    const { reminders, onRatingSubmitted,removeRatingReminder,removeReminderId } = useRatingReminder({ catid, doctor_id });
    const { reviewTags, showReviewModal, setShowReviewModal, setSelectedRating, SelectedRating, selectedReviewTagsArr, onSelectReviewTag, reviewText, setReviewText, submitRatingReview, reset } = useSubmitRatingReview({});
    const [scrollDirection, setScrollDirection] = useState("");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [activeReminder, setActiveReminder] = useState<TRatingReminder | null>(null);
    const openReviewModal = (reminder: TRatingReminder, rating: number) => {
        setSelectedRating(rating);
        setActiveReminder(reminder);
        setShowReviewModal(true);
    };
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 0) {
                setScrollDirection('down');
            } else if (currentScrollY < lastScrollY) {
                setScrollDirection('up');
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]); // Re-run effect if lastScrollY changes
    useEffect(() => {
       
    }, [reminders.length])
    if (reminders.length === 0) {
        return null;
    }
    return (
        <>
            {createPortal(<div className="fixed w-full left-0 px-2" id="rating-reminder" style={{ transition: "bottom .3s", bottom: scrollDirection === "down" ? "-6.5rem" : "4.5rem" }}>
                {reminders.length > 1 ?
                    <Swiper slidesPerView={'auto'}
                        spaceBetween={10}>
                        {reminders.map((reminder,i) =>
                            <SwiperSlide style={{ width: `85%` }} key={reminder.id}>
                                <div className="p-2 shadow-md rounded-md border bg-orange-50 flex items-center gap-4" style={{opacity: removeReminderId === reminder.id ? 0 : 1, transition:"opacity .5s"}}>
                                    <div className="grow">
                                        <div>How was your last visit experience?</div>
                                        <div className="flex items-center">
                                            <span className="font-semibold">{formatDoctorName(reminder.doctor_name)}</span>
                                            <div className="flex justify-around ml-auto">
                                                <BiStar size={24} className="text-yellow-700" onClick={() => { openReviewModal(reminder, 1) }} />
                                                <BiStar size={24} className="text-yellow-700" onClick={() => { openReviewModal(reminder, 2) }} />
                                                <BiStar size={24} className="text-yellow-700" onClick={() => { openReviewModal(reminder, 3) }} />
                                                <BiStar size={24} className="text-yellow-700" onClick={() => { openReviewModal(reminder, 4) }} />
                                                <BiStar size={24} className="text-yellow-700" onClick={() => { openReviewModal(reminder, 5) }} />
                                            </div>
                                        </div>
                                    </div>
                                    <BiX size={24} className="bg-white shadow-md rounded-full ml-auto cursor-pointer" onClick={()=>{removeRatingReminder(reminder.id)}} />
                                </div>
                            </SwiperSlide>
                        )}
                    </Swiper> : <>
                        <div className="p-2 shadow-md rounded-md border bg-orange-50 flex items-center gap-4">
                            <div className="grow">
                                <div>How was your last visit experience?</div>
                                <div className="flex items-center">
                                    <span className="font-semibold">{formatDoctorName(reminders[0].doctor_name)}</span>
                                    <div className="flex justify-around ml-auto">
                                        <BiStar size={24} className="text-yellow-700" onClick={()=>{openReviewModal(reminders[0],1)}} />
                                        <BiStar size={24} className="text-yellow-700" onClick={()=>{openReviewModal(reminders[0],2)}} />
                                        <BiStar size={24} className="text-yellow-700" onClick={()=>{openReviewModal(reminders[0],3)}} />
                                        <BiStar size={24} className="text-yellow-700" onClick={()=>{openReviewModal(reminders[0],4)}} />
                                        <BiStar size={24} className="text-yellow-700" onClick={()=>{openReviewModal(reminders[0],5)}} />
                                    </div>
                                </div>
                            </div>
                            <BiX size={24} className="bg-white shadow-md rounded-full ml-auto cursor-pointer" onClick={()=>{removeRatingReminder(reminders[0].id)}} />
                        </div>
                    </>}
            </div>, document.body)}
            <SlideUpModal heading="Share your feedback" open={showReviewModal} onClose={() => setShowReviewModal(false)}>
                <>
                    {activeReminder && <>
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
                                    appointment_id: activeReminder.id,
                                    consultation_date: "",
                                    rev_id: 0,
                                    clinic_id: activeReminder.clinic_id,
                                    doctor_id: activeReminder.doctor_id,
                                    service_loc_id: activeReminder.servicelocation_id,
                                }, () => {
                                    onRatingSubmitted(activeReminder.id);
                                    reset();

                                })
                            }}>Submit Review</button>
                        </div>
                    </>}
                </>
            </SlideUpModal>

        </>
    )
}
export default RatingReminder;