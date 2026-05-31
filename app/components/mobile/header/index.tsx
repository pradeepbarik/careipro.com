'use client'
import Link from 'next/link';
import { AiFillCaretDown } from "react-icons/ai";
import { BiSupport, BiSolidChevronLeft, BiUser, BiSearch } from "react-icons/bi";
import { HiLocationMarker } from "react-icons/hi";
import classes from "./header.module.scss";
import { ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { capitalizeEachWordFirstLetter } from '@/lib/helper/format-text';
export const BackButton = () => {
    return (
        <BiSolidChevronLeft className='color-black h-7 w-7 rounded-full p-1' onClick={() => {
            window.history.go(-1)
        }} />
    )
}
const Header = ({ template = "HOMEPAGE", heading = "",headingElement="h1", state, city, rightContainer, showSearch = false }: { template?: "HOMEPAGE" | "SUBPAGE"|"VERTICAL_LANDING", heading?: string,headingElement?: "h1" | "h2"|"div", state?: string, city?: string, rightContainer?: ReactNode, showSearch?: boolean }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter();

    const handleBack = () => {
        if (window.history.length > 1) {
            window.history.go(-1);
            return;
        }
        window.location.href = '/'; // Fallback to homepage if no history
    };

    useEffect(() => {
        if (template !== "VERTICAL_LANDING") return;

        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [template]);

    if (template === "SUBPAGE") {
        return (
            <div style={{ height: "3.5rem" }}>
                <div className={`flex gap-2 items-center px-2 py-2 fixed bg-white ${classes.container}`}>
                    <BiSolidChevronLeft className='font-semibold h-6 w-6 shrink-0' onClick={handleBack} />
                    {headingElement==="h2" ? <h2 className='fs-17 font-semibold one-line'>
                        {heading}
                    </h2> :headingElement==="div"? <div className='fs-17 font-semibold one-line'>
                        {heading}
                    </div> :
                    <h1 className='fs-17 font-semibold one-line'>
                        {heading}
                    </h1>}
                    {showSearch && (
                        <div
                            onClick={() => {router.push(state && city ? `/${state}/${city}/search` : '/search')}}
                            className="ml-auto flex items-center gap-1.5 bg-slate-100 border border-slate-300 rounded-full px-3 py-1.5 cursor-pointer shrink-0"
                            aria-label="Search"
                        >
                            <BiSearch className="text-slate-500 text-base shrink-0" />
                            <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
                                Search…
                            </span>
                        </div>
                    )}
                    {rightContainer ? rightContainer : <></>}
                </div>
            </div>

        )
    }
    if(template === "VERTICAL_LANDING"){
        return (
            <div 
                className={`fixed top-0 left-0 w-full z-30 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-slate-900/30'}`} 
                style={{ height: "3.7rem" }}
            >
                <div className='flex items-center justify-between px-3 py-2 h-full'>
                    <div className='flex items-center gap-2'>
                        <BiSolidChevronLeft
                            className={`text-xl ${isScrolled ? 'text-gray-800' : 'text-white'} transition-colors duration-300 cursor-pointer`}
                            onClick={handleBack}
                        />
                        <div className='flex flex-col'>
                            <span className={`text-xs ${isScrolled ? 'text-gray-500' : 'text-white/80'} transition-colors duration-300 ml-3`}>
                                {capitalizeEachWordFirstLetter(heading)}
                            </span>
                            <span className={`text-sm font-semibold ${isScrolled ? 'text-gray-800' : 'text-white'} transition-colors duration-300 flex items-center gap-1`}>
                                <HiLocationMarker className={`text-base ${isScrolled ? 'text-red-500' : 'text-white'} transition-colors duration-300`} />
                                {capitalizeEachWordFirstLetter(state||"")},{capitalizeEachWordFirstLetter(city||"") || 'Select Location'}
                                <AiFillCaretDown className='text-xs' />
                            </span>
                        </div>
                    </div>
                    {showSearch && (
                        <div
                            onClick={() => router.push(state && city ? `/${state}/${city}/search` : '/search')}
                            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 cursor-pointer shrink-0 transition-all duration-300 ${isScrolled ? 'bg-slate-100 border border-slate-300' : 'bg-white/20 border border-white/30'}`}
                            aria-label="Search"
                        >
                            <BiSearch className={`text-base shrink-0 transition-colors duration-300 ${isScrolled ? 'text-slate-500' : 'text-white'}`} />
                            <span className={`text-xs font-medium whitespace-nowrap transition-colors duration-300 ${isScrolled ? 'text-slate-500' : 'text-white'}`}>
                                Search…
                            </span>
                        </div>
                    )}
                </div>
            </div>
        )
    }
    return <>
        <div style={{ height: "3.7rem" }}>
            <div className={`flex items-center px-2 py-2 fixed bg-white ${classes.container}`}>
                <img src="/careipro-primary-logo.png" alt='Careipro logo' className={`${classes.logo}`} />
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