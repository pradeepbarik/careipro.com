'use client'
import Link from 'next/link';
import { AiFillCaretDown, AiOutlineLeft } from "react-icons/ai";
import classes from "./header.module.scss";
const Header = ({ template = "HOMEPAGE", heading = "" }: { template?: "HOMEPAGE" | "SUBPAGE", heading?: string }) => {
    if (template === "SUBPAGE") {
        return (
            <div className={`flex gap-2 items-center px-2 py-2 ${classes.container}`}>
                <AiOutlineLeft className='font-semibold h-10 w-10 p-2' onClick={() => {
                    window.history.go(-1)
                }} />
                <h3 className='fs-17 font-semibold'>
                    {heading}
                </h3>
            </div>
        )
    }
    return <>
        <div className={`flex items-center px-2 py-2 ${classes.container}`}>
            <img src="careipro-primary-logo.png" alt='Careipro logo' className={`${classes.logo}`} />
            <div className='ml-auto flex items-center'>
                <div >
                    <Link href={"/login"} className='ml-auto button' data-color='secondary' data-size="small" >Login</Link>
                </div>
                <span className={`px-1 py-1 ml-2 flex items-center fs-13 ${classes.citySelection}`}>Your Location
                    <AiFillCaretDown />
                </span>
            </div>
        </div>
    </>
}
export default Header;