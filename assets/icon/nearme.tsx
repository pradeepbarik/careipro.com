import { CSSProperties } from "react";

export const Nearme = ({style={},className=""}:{style?:CSSProperties,className?:string}) => {
    return (
        <>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} style={style} xmlns="http://www.w3.org/2000/svg"> <path d="M3 11L22 2L13 21L11 13L3 11Z" stroke="#2298DA" stroke-linecap="round" stroke-linejoin="round"></path> </svg>
        </>
    )
}
export default Nearme;