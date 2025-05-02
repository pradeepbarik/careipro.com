import { CSSProperties } from "react";
import { BiCheck } from "react-icons/bi";
const Radio = ({ selected, style = {}, className = "" }: { selected: boolean, className?: string, style?: CSSProperties }) => {
    return (
        <>
            {selected ?
                <BiCheck className={"h-4 w-4 shrink-0 bg-primary color-white rounded-full"} style={style} />
                :
                <span className={`inline-block h-4 w-4 shrink-0 rounded-full ${className}`} style={{ border: '2px solid var(--primary-color)', ...style }}></span>
            }
        </>
    )
}
export default Radio;