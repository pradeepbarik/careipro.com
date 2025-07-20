import { BiSolidStar, BiSolidStarHalf } from "react-icons/bi";
export const Rating = ({ rating }: { rating: number }) => {
  return <>
    <span className="flex border items-center gap-1 rounded-md px-1">
      <BiSolidStar className={`text-lg color-primary`} />
      <span>{rating.toFixed(1)}</span>
    </span>
  </>
}
export default Rating;