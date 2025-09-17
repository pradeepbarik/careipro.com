'use client'
import Link from 'next/link';
import { AiFillCaretDown } from "react-icons/ai";
import { BiSupport,BiSolidChevronLeft,BiUser } from "react-icons/bi";
import classes from "./header.module.scss";
export const BackButton = () => {
    return (
        <BiSolidChevronLeft className='color-black h-7 w-7 rounded-full p-1' onClick={() => {
            window.history.go(-1)
        }} />
    )
}
const Header = ({ template = "HOMEPAGE", heading = "", state, city }: { template?: "HOMEPAGE" | "SUBPAGE", heading?: string, state?: string, city?: string }) => {
    if (template === "SUBPAGE") {
        return (
            <div style={{ height: "3.5rem" }}>
                <div className={`flex gap-2 items-center px-2 py-2 fixed bg-white ${classes.container}`}>
                    <BiSolidChevronLeft className='font-semibold h-10 w-10 p-2' onClick={() => {
                        window.history.go(-1)
                    }} />
                    <h1 className='fs-17 font-semibold'>
                        {heading}
                    </h1>
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
                        <Link href={"/my-profile"} title='Help Center' className='flex gap-1 items-center border-color-secondary border rounded-lg px-1 py-1 color-secondary'>
                            <BiUser className='text-lg' />
                            <span>My Profile</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    </>
}
export default Header;