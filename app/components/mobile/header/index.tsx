'use client'
import Link from 'next/link';
import { AiFillCaretDown, AiOutlineLeft } from "react-icons/ai";
import { BiSolidUserCircle } from "react-icons/bi";
import classes from "./header.module.scss";
export const BackButton = () => {
    return (
        <AiOutlineLeft className='font-semibold h-8 w-8 rounded-full p-1' onClick={() => {
            window.history.go(-1)
        }} />
    )
}
const Header = ({ template = "HOMEPAGE", heading = "", state, city }: { template?: "HOMEPAGE" | "SUBPAGE", heading?: string, state?: string, city?: string }) => {
    if (template === "SUBPAGE") {
        return (
            <div style={{ height: "3.7rem" }}>
                <div className={`flex gap-2 items-center px-2 py-2 fixed bg-white ${classes.container}`}>
                    <AiOutlineLeft className='font-semibold h-10 w-10 p-2' onClick={() => {
                        window.history.go(-1)
                    }} />
                    <h3 className='fs-17 font-semibold'>
                        {heading}
                    </h3>
                </div>
            </div>

        )
    }
    return <>
        <div style={{ height: "3.7rem" }}>
            <div className={`flex items-center px-2 py-2 fixed bg-white ${classes.container}`}>
                <img src="careipro-primary-logo.png" alt='Careipro logo' className={`${classes.logo}`} />
                <div className='ml-auto flex items-center gap-2'>
                    <Link href={"/service-available-cities"} className={`px-2 py-1 ml-2 flex items-center fs-13 ${classes.citySelection}`}>
                        {city ? city : 'Your Location'}
                        <AiFillCaretDown />
                    </Link>
                    <div>
                        <Link href={"/my-profile"} className='flex gap-1 items-center border rounded-lg px-1 py-1 color-primary'>
                            <BiSolidUserCircle className='text-lg' />
                            <span className='font-semibold'>My Profile</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    </>
}
export default Header;