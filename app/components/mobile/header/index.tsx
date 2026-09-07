'use client'
import Link from 'next/link';
import { AiFillCaretDown } from "react-icons/ai";
import { BiSolidChevronLeft, BiUser, BiSearch, BiBell } from "react-icons/bi";
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
const Header = ({ template = "HOMEPAGE", heading = "", headingElement = "h1", state, city, rightContainer, showSearch = false, showProfile = false }: { template?: "HOMEPAGE" | "SUBPAGE" | "VERTICAL_LANDING", heading?: string, headingElement?: "h1" | "h2" | "div", state?: string, city?: string, rightContainer?: ReactNode, showSearch?: boolean, showProfile?: boolean }) => {
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
                <div className={`flex gap-2 items-center px-2 py-2 fixed bg-white shadow-md ${classes.container}`}>
                    <BiSolidChevronLeft className='font-semibold h-6 w-6 shrink-0' onClick={handleBack} />
                    {headingElement === "h2" ? <h2 className='fs-17 font-semibold one-line'>
                        {heading}
                    </h2> : headingElement === "div" ? <div className='fs-17 font-semibold one-line'>
                        {heading}
                    </div> :
                        <h1 className='fs-17 font-semibold one-line'>
                            {heading}
                        </h1>}
                    <div className='ml-auto flex items-center gap-2'>
                        {showSearch && (
                            <div
                                onClick={() => { router.push(state && city ? `/${state}/${city}/search` : '/search') }}
                                className="ml-auto flex items-center gap-1.5 bg-slate-100 border border-slate-300 rounded-full px-3 py-1.5 cursor-pointer shrink-0"
                                aria-label="Search"
                            >
                                <BiSearch className="text-slate-500 text-base shrink-0" />
                                <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
                                    Search…
                                </span>
                            </div>
                        )}
                        {showProfile && (
                            <div className="ml-auto">
                                <Link href={"/my-profile"} title='My Profile' className='flex items-center justify-center rounded-full shrink-0 bg-cyan-600' style={{ width: '2.2rem', height: '2.2rem', background: 'var(--primary-color)' }}>
                                    <BiUser className='text-white text-lg' />
                                </Link>
                            </div>
                        )}
                        {rightContainer ? rightContainer : <></>}
                    </div>
                </div>
            </div>

        )
    }
    if (template === "VERTICAL_LANDING") {
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
                                {capitalizeEachWordFirstLetter(state || "")},{capitalizeEachWordFirstLetter(city || "") || 'Select Location'}
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
            <div className={`flex items-center justify-between px-2 py-2 fixed bg-white ${classes.container}`}>
                <div className='flex flex-col shrink-0'>
                    <img src="/careipro-primary-logo.png" alt='Careipro logo' className={`${classes.logo}`} />
                    <span className='color-text-light leading-none' style={{ fontSize: '0.55rem' }}>Your Health, Our Care</span>
                </div>
                {/* position: fixed on this row (via classes.container) already makes it
                    a positioning context, so this centers on the row itself regardless
                    of how wide the logo vs. the icons on the right end up being. */}
                <Link href={"/service-available-cities"} className={`absolute left-1/2 -translate-x-1/2 px-3 py-1.5 flex items-center gap-1 fs-13 font-semibold capitalize ${classes.citySelection}`}>
                    <HiLocationMarker className='color-primary text-base shrink-0' />
                    {city ? city : 'Your Location'}
                    <AiFillCaretDown className='fs-11' />
                </Link>
                <div className='flex items-center gap-2'>
                    {/* No notifications feature/page exists yet - this is a static
                        placeholder icon (links to profile) until one is built. */}
                    <Link href={"/my-profile"} title='Notifications' className='relative flex items-center justify-center rounded-full shrink-0 border border-color-grey' style={{ width: '2.2rem', height: '2.2rem' }}>
                        <BiBell className='color-black text-lg' />
                        <span className='absolute top-1 right-1.5 block h-2 w-2 rounded-full bg-red-500 border border-white' />
                    </Link>
                    <Link href={"/my-profile"} title='My Profile' className='flex items-center justify-center rounded-full shrink-0' style={{ width: '2.2rem', height: '2.2rem', background: '#1f2937' }}>
                        <BiUser className='text-white text-lg' />
                    </Link>
                </div>
            </div>
        </div>

    </>
}
export default Header;