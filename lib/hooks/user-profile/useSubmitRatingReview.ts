import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { submitReviewsPostCurl } from "../useClientSideApiCall";
type TReviewRags = Array<{
    topic: string,
    sub_topics: Array<{
        sub_topic: string,
        tags: Array<{ tag: string, score: number }>,
        selectionType: "single" | "multiple"
    }>
}>
const reviewTags: TReviewRags = [
    {
        topic: "About Doctor",
        sub_topics: [{
            sub_topic: "Overall",
            tags: [{ tag: "Very Good", score: 5 }, { tag: "Satisfied", score: 4 }, { tag: "Not Satisfied", score: -3 }],
            selectionType: "multiple"
        }, {
            sub_topic: "Friendly",
            tags: [{ tag: "Friendly", score: 1 }, { tag: "Unfriendly", score: -1 }],
            selectionType: "single"
        }, {
            sub_topic: "Communication",
            tags: [{ tag: "Excellent Communication", score: 1 }, { tag: "Unsatisfied with Communication", score: 0 }, { tag: "Good Listener", score: 1 }, { tag: "Rushed", score: -1 }],
            selectionType: "single"
        }, {
            sub_topic: "Experience",
            tags: [{ tag: "Skilled", score: 2 }, { tag: "Not Skilled", score: -1 }],
            selectionType: "single"
        }]
    }, {
        topic: "About Clinic Staffs",
        sub_topics: [{
            sub_topic: "Staffs Behaviour",
            tags: [{ tag: "Supportive Staff", score: 1 }, { tag: "Unfriendly Staff", score: -1 }, { tag: "Misbehaved by staffs", score: -2 }],
            selectionType: "single"
        }]
    }, {
        topic: "About Clinc",
        sub_topics: [{
            sub_topic: "Service",
            tags: [{ tag: "Quick Service", score: 1 }, { tag: "Slow Service", score: 0 }],
            selectionType: "single"
        }, {
            sub_topic: "Price",
            tags: [{ tag: "Affordable Prices", score: 1 }, { tag: "Expensive", score: 0 }],
            selectionType: "single"
        }, {
            sub_topic: "Clean",
            tags: [{ tag: "Clean & Hygenic", score: 1 }, { tag: "Managebale Cliniliness", score: 0 }, { tag: "Poor Cleanness", score: -1 }],
            selectionType: "single"
        }, {
            sub_topic: "Management",
            tags: [{ tag: "Good Management", score: 1 }, { tag: "Poor management", score: -1 }],
            selectionType: "single"
        }, {
            sub_topic: "Facilities",
            tags: [{ tag: "Modern Facilities", score: 1 }, { tag: "Old Facilities", score: 0 }],
            selectionType: "single"
        }]
    }
]
const useSubmitRatingReview = ({ review_text = "" }: { review_text?: string }) => {
    const [SelectedRating, setSelectedRating] = useState<number>(0);
    const [rating, setRating] = useState<number>(0);
    const [reviewText, setReviewText] = useState<string>(review_text || "");
    const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
    const [selectedReviewTags, setSelectedReviewTags] = useState<Array<{ tag: string, score: number, topic: string, sub_topic: string }>>([]);
    const [selectedReviewTagsArr, setSelectedReviewTagsArr] = useState<string[]>([]);

    const onSelectReviewTag = (data: {
        tags: {
            tag: string;
            score: number;
        }[];
        selectionType: "single" | "multiple";
        tag: {
            tag: string;
            score: number;
        };
        topic: string,
        sub_topic: string
        selected: boolean
    }) => {
        let tags = data.tags.map(tag => tag.tag);
        if (data.selectionType === "single") {
            let reviewtags = selectedReviewTags.filter((tag) => {
                return tags.includes(tag.tag) == false
            })
            if (data.selected) {
                setSelectedReviewTags(reviewtags);
                setSelectedReviewTagsArr(reviewtags.map(tag => tag.tag))
            } else {
                reviewtags.push({ ...data.tag, topic: data.topic, sub_topic: data.sub_topic });
                setSelectedReviewTags(reviewtags);
                setSelectedReviewTagsArr(reviewtags.map(tag => tag.tag))
            }
        } else if (data.selectionType === "multiple") {
            if (data.selected) {
                let reviewtags = selectedReviewTags.filter((tag) => {
                    return tag.tag !== data.tag.tag
                })
                setSelectedReviewTags(reviewtags);
                setSelectedReviewTagsArr(reviewtags.map(tag => tag.tag))
            } else {
                let reviewtags = [...selectedReviewTags]
                reviewtags.push({ ...data.tag, topic: data.topic, sub_topic: data.sub_topic });
                setSelectedReviewTags(reviewtags);
                setSelectedReviewTagsArr(reviewtags.map(tag => tag.tag))
            }
        }
    }
    const submitRatingReview = (params: {
        rev_id: number,
        clinic_id: number,
        doctor_id: number,
        service_loc_id: number,
        appointment_id: number,
        consultation_date: string,
        case?: "appointment_review" | "general_review"
    }, cb: () => void) => {
        submitReviewsPostCurl({
            rev_id: params.rev_id,
            appoitment_id: params.appointment_id,
            doctor_id: params.doctor_id,
            service_loc_id: params.service_loc_id,
            clinic_id: params.clinic_id,
            consultation_date: params.consultation_date,
            rating: SelectedRating,
            visited_for: "",
            experience: reviewText,
            review_tags: selectedReviewTags,
            case: params.case || "appointment_review"
        }).then((data) => {
            toast.success(data.message)
            setShowReviewModal(false)
            cb()
        }).catch((err) => {
            toast.error(err.message)
        })
    }
    const submitRating = (params: {
        rev_id: number,
        clinic_id: number,
        doctor_id: number,
        service_loc_id: number,
        appointment_id: number,
        consultation_date: string
    }, cb: () => void) => {
        submitReviewsPostCurl({
            rev_id: params.rev_id,
            appoitment_id: params.appointment_id,
            doctor_id: params.doctor_id,
            service_loc_id: params.service_loc_id,
            clinic_id: params.clinic_id,
            rating: SelectedRating,
            consultation_date: params.consultation_date,
        }).then((data) => {
            toast.success(data.message)
            setShowReviewModal(false)
            cb()
        }).catch((err) => {
            toast.error(err.message)
        })
    }
    const reset=()=>{
        setSelectedRating(0);
        setReviewText("");
        setSelectedReviewTags([]);
        setSelectedReviewTagsArr([]);
    }
    useEffect(() => {
        setReviewText(review_text)
    }, [review_text])
    return {
        reviewTags,
        showReviewModal,
        setShowReviewModal,
        SelectedRating,
        setSelectedRating,
        reviewText,
        setReviewText,
        selectedReviewTags,
        setSelectedReviewTags,
        selectedReviewTagsArr,
        setSelectedReviewTagsArr,
        onSelectReviewTag,
        submitRatingReview,
        submitRating,
        reset
    };
}
export default useSubmitRatingReview;