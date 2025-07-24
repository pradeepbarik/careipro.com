"use client"
import { useState } from 'react';
import Link from 'next/link';
import { BiUserCircle, BiLogOutCircle } from "react-icons/bi";
import { AiOutlineCarryOut, AiOutlineEdit, AiOutlineHeart, AiOutlineTeam, AiOutlineTag, AiOutlineNotification, AiOutlineComment, AiOutlinePhone, AiOutlineQuestionCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { userSecreateKey, userinfo } from '@/constants/storage_keys';
import { BackButton } from "@/app/components/mobile/header";
import { SlideUpModal } from '@/app/components/mobile/ui';
import Login from '@/app/components/mobile/login';
import useLogin from "@/lib/hooks/login/useLogin";
const MY_PROFILE_ROUTES = "my-profile";
const BUSINESS_ROUTES = "business";
const MyProfileMobile = ({ cookies }: { cookies: Record<string, string> }) => {
    const { logOut, refreshRoute } = useLogin({ allowLoggedInUser: true, redirectUrl: "" });
    const user_info = cookies[userinfo] ? JSON.parse(cookies[userinfo]) : null;
    const [showLoginModal, setShowLoginModal] = useState(false);
    if (cookies[userSecreateKey] || user_info !== null) {
        return (
            <div className='bg-white' style={{ minHeight: "100vh" }}>
                <div className='h-16 flex items-center px-2 border-b'>
                    <BackButton />
                    <span className='grow flex justify-center font-bold text-xl'>
                        <span className='relative'>
                            Hi, {user_info?.fn} {user_info?.ln}
                            {user_info.ico === '1' && <span className='absolute fs-12 left-full -top-3 border px-1 py-1 color-white rounded-md leading-[1]' style={{ background: "#2fc384" }}>Owner</span>}
                        </span>
                    </span>
                </div>
                <div className='px-4'>
                    <ul>
                        {user_info.ico === '1' &&
                            <>
                                {(user_info.bt === "RELAXATION" || user_info.bt === "CARETAKER") ? <>
                                    {user_info.bt === "RELAXATION" &&
                                        <li>
                                            <Link href={`/${BUSINESS_ROUTES}/my-leads`} className='flex items-center h-12'>
                                                <AiOutlineCarryOut className='fs-16' />
                                                <span className='ml-2 fs-16'>
                                                    Leads
                                                </span>
                                            </Link>
                                        </li>
                                    }
                                    {user_info.bt === "CARETAKER" &&
                                        <li>
                                            <Link href={`/${BUSINESS_ROUTES}/enquiries`} className='flex items-center h-12'>
                                                <AiOutlineCarryOut className='fs-16' />
                                                <span className='ml-2 fs-16'>
                                                    Enquiries
                                                </span>
                                            </Link>
                                        </li>
                                    }
                                    <li>
                                        <Link href={`/${BUSINESS_ROUTES}/my-jobs`} className='flex items-center h-12'>
                                            <AiOutlineCarryOut className='fs-16' />
                                            <span className='ml-2 fs-16'>
                                                Jobs
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={`/${BUSINESS_ROUTES}/my-staffs`} className='flex items-center h-12'>
                                            <AiOutlineCarryOut className='fs-16' />
                                            <span className='ml-2 fs-16'>
                                                My Staffs
                                            </span>
                                        </Link>
                                    </li>
                                </> : user_info.bt === "PETCARE" ? <>

                                </> :
                                    <></>}
                                <hr />
                            </>
                        }
                        <li>
                            <Link href={`/${MY_PROFILE_ROUTES}/appointment-history`} className='flex items-center h-12'>
                                <AiOutlineCarryOut className='fs-16' />
                                <span className='ml-2 fs-16'>
                                    My Appointments
                                </span>
                            </Link>
                        </li>
                        {/* <li>
                            <Link href={"/my-appointments"} className='flex items-center h-12'>
                                <AiOutlineHeart className='fs-16' />
                                <span className='ml-2 fs-16'>
                                    My Favourites
                                </span>
                            </Link>
                        </li> */}
                        <li>
                            <Link href={`/${MY_PROFILE_ROUTES}/profile-detail`} className='flex items-center h-12'>
                                <AiOutlineEdit className='fs-16' />
                                <span className='ml-2 fs-16'>
                                    My Profile
                                </span>
                            </Link>
                        </li>
                        {/* <li>
                            <Link href={"/my-appointments"} className='flex items-center h-12'>
                                <AiOutlineTeam className='fs-16' />
                                <span className='ml-2 fs-16'>
                                    Refer & Earn
                                </span>
                            </Link>
                        </li> */}
                        {(user_info.ut === "user" && false) &&
                            <li>
                                <Link href={"/my-appointments"} className='flex items-center h-12'>
                                    <AiOutlineNotification className='fs-16' />
                                    <span className='ml-2 fs-16'>
                                        Open Jobs at Hospitals
                                    </span>
                                </Link>
                            </li>}
                        <li>
                            <Link href={"/support/share-feedback"} className='flex items-center h-12'>
                                <AiOutlineComment className='fs-16' />
                                <span className='ml-2 fs-16'>
                                    Share your Feedback
                                </span>
                            </Link>
                        </li>
                        {user_info.ut === "user" &&
                            <li>
                                <Link href={"Register-clinic-hospital"} className='flex items-center h-12'>
                                    <AiOutlineTag className='fs-16' />
                                    <span className='ml-2 fs-16'>
                                        Register your Hospital / Clinic
                                    </span>
                                </Link>
                            </li>}
                        {/* <li>
                            <Link href={"/Business-With-Careipro"} className='flex items-center h-12'>
                                <AiOutlineTag className='fs-16' />
                                <span className='ml-2 fs-16'>
                                    Business Opertunities
                                </span>
                            </Link>
                        </li> */}
                        <li>
                            <Link href={"/contact-us"} className='flex items-center h-12'>
                                <AiOutlinePhone className='fs-16' />
                                <span className='ml-2 fs-16'>
                                    Contact us
                                </span>
                            </Link>
                        </li>
                        {/* <li>
                            <Link href={"/my-appointments"} className='flex items-center h-12'>
                                <AiOutlineQuestionCircle className='fs-16' />
                                <span className='ml-2 fs-16'>
                                    FAQs
                                </span>
                            </Link>
                        </li> */}
                        <li>
                            <Link href={"/about-us"} className='flex items-center h-12'>
                                <AiOutlineInfoCircle className='fs-16' />
                                <span className='ml-2 fs-16'>
                                    About us
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='px-4 text-center fixed bottom-4 w-full'>
                    <span onClick={logOut} className='inline-flex gap-1 items-center color-secondary font-semibold border border-color-secondary px-1 rounded-md'>
                        <BiLogOutCircle className='text-xl' />
                        <span className='py-1'>
                            Log out
                        </span>
                    </span>
                </div>
            </div>
        )
    }
    return (
        <>
            <div className='bg-white' style={{ minHeight: "100vh" }}>
                <div className='h-12 flex items-center px-2 border-b'>
                    <BackButton />
                    <span className='grow text-center font-semibold text-lg'>My Profile</span>
                    <span onClick={() => { setShowLoginModal(true) }} className='flex gap-1 items-center color-primary font-semibold border border-color-primary px-1 rounded-md'>
                        <BiUserCircle className='text-xl' />
                        <span className='py-1'>
                            Login / Sign up
                        </span>
                    </span>
                </div>
                <div className='px-4'>
                    <ul>
                        <li>
                            <Link href={"/Register-clinic-hospital"} className='flex items-center h-12'>
                                <AiOutlineTag className='fs-16' />
                                <span className='ml-2 fs-16'>
                                    Register your Hospital / Clinic
                                </span>
                            </Link>
                        </li>
                        {/* <li>
                            <Link href={"/Business-with-Careipro"} className='flex items-center h-12'>
                                <AiOutlineTag className='fs-16' />
                                <span className='ml-2 fs-16'>
                                    Business Opertunities
                                </span>
                            </Link>
                        </li> */}
                        {/* <li>
                            <Link href={"/my-appointments"} className='flex items-center h-12'>
                                <AiOutlineTeam className='fs-16' />
                                <span className='ml-2 fs-16'>
                                    Refer & Earn
                                </span>
                            </Link>
                        </li> */}
                        {/* <li>
                            <Link href={"/my-appointments"} className='flex items-center h-12'>
                                <AiOutlineNotification className='fs-16' />
                                <span className='ml-2 fs-16'>
                                    Open Jobs
                                </span>
                            </Link>
                        </li> */}
                        <li>
                            <Link href={"/support/share-feedback"} className='flex items-center h-12'>
                                <AiOutlineComment className='fs-16' />
                                <span className='ml-2 fs-16'>
                                    Share your Feedback
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/contact-us"} className='flex items-center h-12'>
                                <AiOutlinePhone className='fs-16' />
                                <span className='ml-2 fs-16'>
                                    Contact us
                                </span>
                            </Link>
                        </li>
                        {/* <li>
                            <Link href={"/my-appointments"} className='flex items-center h-12'>
                                <AiOutlineQuestionCircle className='fs-16' />
                                <span className='ml-2 fs-16'>
                                    FAQs
                                </span>
                            </Link>
                        </li> */}
                        <li>
                            <Link href={"/about-us"} className='flex items-center h-12'>
                                <AiOutlineInfoCircle className='fs-16' />
                                <span className='ml-2 fs-16'>
                                    About us
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <SlideUpModal open={showLoginModal} onClose={() => { setShowLoginModal(false) }} heading='Login / Signup'>
                <Login onLoginSuccess={() => { setShowLoginModal(false); refreshRoute() }} allowLoggedInUser={true} />
            </SlideUpModal>
        </>
    )
}
export default MyProfileMobile;