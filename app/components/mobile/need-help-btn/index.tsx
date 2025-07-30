import Link from "next/link";
import { CSSProperties } from "react";
import { BiPhone } from "react-icons/bi";
const NeedHelpBtn=({style={}}:{style?:CSSProperties})=>{
    return (
        <Link href={"/contact-us"}  className="button flex items-center fixed -right-6 bottom-14" data-variant="outlined" data-color="secondary" style={{transform:"rotate(-90deg)",...style}}><BiPhone/>Need Help?</Link>
    )
}
export default NeedHelpBtn;