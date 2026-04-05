import { BiSolidStar, BiStar, BiUser } from "react-icons/bi";
import { fetchDoctorReviews, TDoctorReview } from "@/lib/hooks/useDoctors";

const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
                star <= rating
                    ? <BiSolidStar key={star} className="text-yellow-400" style={{ fontSize: '1rem' }} />
                    : <BiStar key={star} className="text-gray-300" style={{ fontSize: '1rem' }} />
            ))}
        </div>
    );
};

const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const ReviewCard = ({ review }: { review: TDoctorReview }) => {
    return (
        <div className="bg-white border rounded-lg px-3 py-3">
            <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <BiUser className="text-gray-500" style={{ fontSize: '1.2rem' }} />
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold fs-15">{review.user_name || 'Anonymous'}</span>
                    <span className="text-gray-500 text-xs">{formatDate(review.review_date)}</span>
                </div>
                <div className="ml-auto flex items-center gap-1 bg-green-50 border border-green-200 rounded-md px-2 py-0.5">
                    <BiSolidStar className="text-green-600" style={{ fontSize: '0.8rem' }} />
                    <span className="font-semibold text-green-700 text-sm">{review.rating}</span>
                </div>
            </div>
            {review.experience && (
                <p className="mt-2 text-gray-700 fs-14 leading-relaxed">{review.experience}</p>
            )}
            {review.review_tags && (
                <div className="mt-2 flex flex-wrap gap-1">
                    {review.review_tags.map((tag, index) => (
                        <span key={index} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-md">{tag.tag}</span>
                    ))}
                </div>
            )}
        </div>
    );
};
const getRatingCountFromSummary = (summary: { one_star: number, two_star: number, three_star: number, four_star: number, five_star: number }, star: number) => {
    switch (star) {
        case 1:
            return summary.one_star;
        case 2:
            return summary.two_star;
        case 3:
            return summary.three_star;
        case 4:
            return summary.four_star;
        case 5:
            return summary.five_star;
        default:
            return 0;
    }
}
const Reviews = async ({ state, city, service_loc_id,doctor_id,clinic_id,rating,rating_count,review_count }: { state: string, city: string, service_loc_id: number,doctor_id: number,clinic_id: number, rating: number, rating_count: number, review_count: number }) => {
    const reviewsResponse = await fetchDoctorReviews({ state, city, service_loc_id, doctor_id, clinic_id });
    if (!reviewsResponse.reviews || reviewsResponse.reviews.length === 0) {
        return (
            <div className="px-2 mt-2">
                <div className="bg-white rounded-lg border px-4 py-8 flex flex-col items-center">
                    <BiStar className="text-gray-300" style={{ fontSize: '2.5rem' }} />
                    <p className="text-gray-500 mt-2 font-semibold">No reviews yet</p>
                    <p className="text-gray-400 text-sm mt-1">Be the first to share your experience</p>
                </div>
            </div>
        );
    }
    const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
        star,
        count: getRatingCountFromSummary(reviewsResponse.summary || { one_star: 0, two_star: 0, three_star: 0, four_star: 0, five_star: 0 }, star)
    }));
    return (
        <div className="px-2 mt-1">
            {/* Rating Summary */}
            <div className="bg-white rounded-lg border px-3 py-3">
                <h3 className="font-semibold fs-16">Patient Reviews</h3>
                <div className="flex items-center gap-4 mt-2">
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold color-primary">{parseFloat(rating.toString()).toFixed(1)}</span>
                        <StarRating rating={Math.round(Number(rating))} />
                        <span className="text-gray-500 text-xs mt-1">{review_count} review{review_count > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex flex-col gap-1 grow">
                        {ratingCounts.map(({ star, count }) => (
                            <div key={star} className="flex items-center gap-2">
                                <span className="text-xs w-3 text-gray-500">{star}</span>
                                <BiSolidStar className="text-yellow-400" style={{ fontSize: '0.7rem' }} />
                                <div className="grow bg-gray-200 rounded-full h-1.5">
                                    <div
                                        className="bg-yellow-400 h-1.5 rounded-full"
                                        style={{ width: `${rating_count > 0 ? (count / rating_count) * 100 : 0}%` }}
                                    />
                                </div>
                                <span className="text-xs text-gray-500 w-5">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Reviews List */}
            <div className="flex flex-col gap-2 mt-2">
                {reviewsResponse.reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>
        </div>
    );
};

export default Reviews;