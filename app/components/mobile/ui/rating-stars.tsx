import { useState, useEffect, CSSProperties } from "react";
import { BiStar, BiSolidStar } from "react-icons/bi";
type Iprops = {
  given_rating: number,
  onChange?: (r: number) => void,
  onClick?: (r: number) => void,
  disable?: boolean,
  style?: CSSProperties,
  className?:string
}
const Ratingstars = ({
  given_rating,
  onChange,
  onClick,
  disable = false,
  className="",
  style
}: Iprops) => {
  const [rating, setRating] = useState<number>(given_rating);
  const onSelectStar = (r: number) => {
    if (disable === true) {
      return;
    }
    setRating(r);
    if (onChange) {
      onChange(r);
    }else if(onClick){
      onClick(r);
    }
  };
  useEffect(() => {
    setRating(given_rating);
  }, [given_rating]);
  return (
    <div className="flex">
      {rating >= 1 ? <BiSolidStar className={className} onClick={()=>{onSelectStar(1)}} /> : <BiStar className={className} onClick={()=>{onSelectStar(1)}} />}
      {rating >= 2 ? <BiSolidStar className={className} onClick={()=>{onSelectStar(2)}}/> : <BiStar className={className} onClick={()=>{onSelectStar(2)}} />}
      {rating >= 3 ? <BiSolidStar className={className} onClick={()=>{onSelectStar(3)}} /> : <BiStar className={className} onClick={()=>{onSelectStar(3)}} />}
      {rating >= 4 ? <BiSolidStar className={className} onClick={()=>{onSelectStar(4)}} /> : <BiStar className={className} onClick={()=>{onSelectStar(4)}} />}
      {rating >= 5 ? <BiSolidStar className={className} onClick={()=>{onSelectStar(5)}} /> : <BiStar className={className} onClick={()=>{onSelectStar(5)}} />}
    </div>
  )
}
export default Ratingstars;
