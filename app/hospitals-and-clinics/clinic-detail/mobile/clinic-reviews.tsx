import Link from "next/link";
import { BsStarFill } from "react-icons/bs";
import { BiConversation, BiChevronRight } from "react-icons/bi";
import { TclinicDetail } from "@/lib/hooks/useClinics";
import { moment } from "@/lib/helper/date-time";

type TReview = NonNullable<TclinicDetail["reviews"]>[number];
const STAR_ROWS = [5, 4, 3, 2, 1];

const Stars = ({ rating, className = "" }: { rating: number, className?: string }) => {
    return (
        <span className={`flex items-center gap-[2px] ${className}`}>
            {[1, 2, 3, 4, 5].map((i) =>
                <BsStarFill key={i} className={i <= Math.round(rating) ? "text-amber-400" : "text-gray-300"} />
            )}
        </span>
    )
}
/* Reviews come through as "2026-03-22 14:24:09". Relative reads better than a date on a
   listing, but anything past a couple of months is clearer as the month itself. */
const reviewAge = (reviewDate: string) => {
    if (!reviewDate) {
        return "";
    }
    const when = moment(reviewDate);
    if (!when.isValid()) {
        return "";
    }
    return when.diff(moment(), "months") <= -2 ? when.format("MMM YYYY") : when.fromNow();
}

const ClinicReviews = ({ reviews, spread, rating, allReviewsUrl }: {
    reviews: TReview[],
    spread: Record<string, number>,
    rating: number | null,
    allReviewsUrl: string
}) => {
    const total = STAR_ROWS.reduce((sum, star) => sum + (spread[star] || 0), 0);
    if (reviews.length === 0 && total === 0) {
        return <span className="fs-13 text-gray-500">No reviews yet.</span>
    }
    /* prefer the spread, it covers every public review rather than the six listed, and
       falls back to the clinic's stored rating when there is nothing to average */
    const average = total > 0
        ? STAR_ROWS.reduce((sum, star) => sum + star * (spread[star] || 0), 0) / total
        : (rating || 0);
    return (
        <>
            <div className="flex gap-4 items-center pb-3 border-b border-gray-100">
                <div className="flex flex-col items-center shrink-0">
                    <span className="fs-20 font-bold text-gray-900">{average.toFixed(1)}</span>
                    <Stars rating={average} className="fs-12" />
                    <span className="fs-12 text-gray-500 mt-1">{total} review{total === 1 ? "" : "s"}</span>
                </div>
                <div className="flex flex-col gap-1 grow">
                    {STAR_ROWS.map((star) => {
                        const count = spread[star] || 0;
                        return (
                            <div key={star} className="flex items-center gap-2">
                                <span className="fs-12 text-gray-500 w-2">{star}</span>
                                <span className="h-[6px] rounded-full bg-gray-100 grow overflow-hidden">
                                    <span className="block h-full rounded-full bg-amber-400"
                                        style={{ width: total > 0 ? `${Math.round((count / total) * 100)}%` : "0%" }} />
                                </span>
                                <span className="fs-12 text-gray-400 w-8 text-right">{count}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="flex flex-col gap-3 mt-3">
                {reviews.map((review) => {
                    const name = (review.user_name || "").trim();
                    const experience = (review.experience || "").trim();
                    const age = reviewAge(review.review_date);
                    return (
                        <div key={review.id} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                            <div className="flex items-center gap-2">
                                <span className="h-8 w-8 rounded-full bg-cyan-50 text-cyan-700 flex items-center justify-center fs-13 font-bold shrink-0">
                                    {name ? name.charAt(0).toUpperCase() : "?"}
                                </span>
                                <span className="flex flex-col grow min-w-0">
                                    <span className="fs-13 font-semibold text-gray-900 one-line">{name || "Verified patient"}</span>
                                    <span className="fs-12 text-gray-400 one-line">
                                        {/* which doctor was seen, since a clinic review is really
                                            a review of one visit to one of its doctors */}
                                        {review.doctor_name ?
                                            <>Consulted <b>{review.doctor_name}</b>{age ? ` · ${age}` : ""}</>
                                            : age}
                                    </span>
                                </span>
                                <Stars rating={review.rating} className="fs-12 shrink-0" />
                            </div>
                            {/* plenty of reviews are tags only, so the paragraph is skipped
                                rather than leaving an empty gap under the name */}
                            {experience &&
                                <p className="fs-13 text-gray-600 leading-5 mt-2">{experience}</p>
                            }
                            {review.review_tags.length > 0 &&
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {review.review_tags.map((tag, i) =>
                                        <span key={`${review.id}-${i}`} className="fs-12 px-2 py-[2px] rounded-full bg-gray-100 text-gray-600">
                                            {tag.tag}
                                        </span>
                                    )}
                                </div>
                            }
                            {review.replay &&
                                <div className="flex gap-2 mt-2 pl-2 border-l-2 border-cyan-200">
                                    <BiConversation className="text-cyan-600 shrink-0 mt-[2px]" />
                                    <span className="flex flex-col">
                                        <span className="fs-12 font-semibold text-gray-700">Clinic replied</span>
                                        <span className="fs-13 text-gray-600 leading-5">{review.replay}</span>
                                    </span>
                                </div>
                            }
                        </div>
                    )
                })}
            </div>
            {/* only worth offering when there is more than the six the api returns, and
                not at all on the reviews page itself, which passes no url */}
            {allReviewsUrl && total > reviews.length &&
                <Link href={allReviewsUrl}
                    className="flex items-center justify-center gap-1 mt-3 py-2 rounded-lg border border-cyan-600 text-cyan-700 fs-13 font-bold">
                    View all {total} reviews<BiChevronRight className="fs-17" />
                </Link>
            }
        </>
    )
}
export default ClinicReviews;
