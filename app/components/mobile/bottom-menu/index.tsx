'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BiHomeHeart, BiBookHeart, BiCalendar, BiUser, BiAlignLeft, BiSupport, BiBriefcase, BiCategory } from "react-icons/bi";
import { userSecreateKey } from '@/constants/storage_keys';

const FooterMenu = ({ cookies, searchParams }: { cookies: Record<string, any>, searchParams: { [key: string]: string } }) => {
  const [scrollDirection, setScrollDirection] = useState("");
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 0) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]); // Re-run effect if lastScrollY changes
  return (
    <div className="bg-white border-t fixed bottom-0 left-0 right-0 w-full overflow-hidden px-2" style={{ transition: "bottom .3s", bottom: scrollDirection === "down" ? "-6.5rem" : "0", borderTopLeftRadius: "2.2rem", borderTopRightRadius: "2.2rem", boxShadow: "0 -2px 6px rgba(0,0,0,0.1)" }}>
      {cookies[userSecreateKey] ?
        <div className='flex font-semibold py-1'>
          <Link href={`/${searchParams["state"].toLowerCase()}/${searchParams["city"].toLowerCase().replace(" ", "-")}/healthcare-articles`} className='grow-[1] basis-0 shrink-0 gap-1 py-2 flex justify-center items-center flex-col'>
            <BiCategory className='text-xl' />
            Articles
          </Link>
          <Link href={"/my-favourites"} className='grow-[1] basis-0 shrink-0 gap-1 py-2 flex justify-center items-center flex-col'>
            <BiBookHeart className='text-xl' />
            Favourites
          </Link>
          <Link href={"/contact-us"} className='grow-[1] basis-0 shrink-0 gap-1 py-2 flex justify-center items-center flex-col color-secondary text-center'>
            <BiSupport className='text-xl' />
            Need Help?
          </Link>
          <Link href={"/my-profile/appointment-history"} className='grow-[1] basis-0 shrink-0 gap-1 py-2 flex justify-center items-center flex-col text-center'>
            <BiCalendar className='text-xl' />
            Bookings
          </Link>
          <Link href={`/${searchParams["state"].toLowerCase()}/${searchParams["city"].toLowerCase().replace(" ", "-")}/quick-actions`} className='grow-[1] basis-0 shrink-0 gap-1 py-2 flex justify-center items-center flex-col'>
            <BiAlignLeft className='text-xl' />
            More
          </Link>
        </div> :
        <div className='flex font-semibold py-1'>
          <Link href={"/login"} className='grow-[1] basis-0 shrink-0 gap-1 py-2 flex justify-center items-center flex-col'>
            <BiUser className='text-xl' />
            Login
          </Link>
          {/* <Link href='/' className='grow-[1] basis-0 shrink-0 gap-1 flex justify-center items-center flex-col color-primary'>
          <BiHomeHeart className='text-xl' />
          Home
        </Link> */}
          <Link href={`/${searchParams["state"].toLowerCase()}/${searchParams["city"].toLowerCase().replace(" ", "-")}/healthcare-articles`} className='grow-[1] basis-0 shrink-0 gap-1 py-2 flex justify-center items-center flex-col'>
            <BiCategory className='text-xl' />
            Articles
          </Link>
          {/* <Link href={"/my-favourites"} className='grow-[1] basis-0 shrink-0 gap-1 py-2 flex justify-center items-center flex-col'>
            <BiBookHeart className='text-xl' />
            Favourites
          </Link> */}
          <Link href={"/contact-us"} className='grow-[1] basis-0 shrink-0 gap-1 py-2 flex justify-center items-center flex-col color-secondary text-center'>
            <BiSupport className='text-xl' />
            Need Help?
          </Link>
          {/* <Link href={"/my-profile/appointment-history"} className='grow-[1] basis-0 shrink-0 gap-1 py-2 flex justify-center items-center flex-col'>
            <BiCalendar className='text-xl' />
            Bookings
          </Link> */}
          {/* <Link href='/' className='grow-[1] basis-0 shrink-0 gap-1 flex justify-center items-center flex-col color-secondary'>
          <BiBriefcase className='text-xl' />
          Jobs
        </Link> */}
          <Link href={"/my-profile/appointment-history"} className='grow-[1] basis-0 shrink-0 gap-1 py-2 flex justify-center items-center flex-col text-center'>
            <BiCalendar className='text-xl' />
           Bookings
          </Link>
          {/* {cookies[userSecreateKey] ?
          <Link href={"/my-profile"} className='grow-[1] basis-0 shrink-0 gap-1 py-2 flex justify-center items-center flex-col'>
            <BiUser className='text-xl' />
            My Profile
          </Link>
          :
          <Link href={"/login"} className='grow-[1] basis-0 shrink-0 gap-1 py-2 flex justify-center items-center flex-col'>
            <BiUser className='text-xl' />
            Login
          </Link>
        } */}
          <Link href={`/${searchParams["state"].toLowerCase()}/${searchParams["city"].toLowerCase().replace(" ", "-")}/quick-actions`} className='grow-[1] basis-0 shrink-0 gap-1 py-2 flex justify-center items-center flex-col'>
            <BiAlignLeft className='text-xl' />
            More
          </Link>
          {/* <Link href={""} className='grow-[1] basis-0 shrink-0 gap-1 py-2 flex justify-center items-center flex-col'>
          <BiSupport className='text-lg'/>
         Need Help?
        </Link> */}
        </div>
      }
    </div>
  )
}
export default FooterMenu;