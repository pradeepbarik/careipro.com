import Link from 'next/link';
import Image from 'next/image';
import { FaUserMd, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { BiPhone, BiLogoWhatsapp, BiSolidStar, BiGroup, BiHome, BiClinic, BiRightArrowAlt } from "react-icons/bi";
import Header from "../components/mobile/header";
import { SectionHeading } from '@/app/components/mobile/ui';
import { TCaretakersHomePageData } from '@/lib/hooks/caretaker/useCaretaker';
import { TCategories } from "@/lib/hooks/useCategories";
import { doctorSpecialityIcon, doctorProfilePic, clinicProfilePic, clinicBannerImage } from '@/lib/image';
import ViewAllCategories from '../components/mobile/doctors/view-all-categores';
import { getSendEnquiryWhatsappMessage } from '@/lib/hooks/caretaker/useCaretaker';
import { support_no } from '@/constants/site-config';
import { BookCaretakerButton, BookNowService, SendEnquiryBtn, CaretakerBookClinicButton } from '@/app/components/mobile/caretaker/booing-caretaker';
import BannerView from '@/app/components/mobile/banner-view';
import SendEnquiryForm from '@/app/components/mobile/send-enquiry-form';
import { TSiteBanner, TSectionBanner } from '@/lib/types/home-page';
import SectionBanners from '../components/mobile/section-banners';
import VerticalLandingBanner from '../components/mobile/slideing-banners/veritcal-banner';
import React from 'react';
const CaretakersMobile = async ({ searchParams, state, city, pageData, categories }: { searchParams: { [key: string]: string }, state: string, city: string, market_name?: string, pageData: TCaretakersHomePageData, categories: TCategories }) => {
    const selectedServiceType = searchParams?.service_type === 'monthly' ? 'monthly' : 'hourly_daily';
    return (
        <>
            <Header heading="Caretakers" template="VERTICAL_LANDING" city={city} state={state} />
            <VerticalLandingBanner position='sticky' className='top-0' autoplay={true} loop={true} showNavigation={false} showPagination={true}
                banners={((pageData.site_banners ? pageData.site_banners : []) as TSiteBanner[]).filter((banner) => banner.device_type === "mobile" || banner.device_type === "all").map(banner => ({
                    image: clinicBannerImage(banner.image),
                    alt: banner.alt_text || "",
                }))}
            />
            <div className='bg-slate-50 rounded-tl-xl rounded-tr-xl relative z-10 -mt-5 pt-5'>
                {/* <div className='px-2 mb-3'>
                    <div className='grid grid-cols-2 gap-2 bg-white p-1 rounded-lg border border-gray-200 shadow-sm'>
                        <Link
                            href='?service_type=hourly_daily'
                            className={`text-center text-sm font-semibold py-2 rounded-md ${selectedServiceType === 'hourly_daily' ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                        >
                            Hourly / Daily Basis
                        </Link>
                        <Link
                            href='?service_type=monthly'
                            className={`text-center text-sm font-semibold py-2 rounded-md ${selectedServiceType === 'monthly' ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                        >
                            Monthly Basis
                        </Link>
                    </div>
                </div> */}
                {pageData.sections.map((section, i) => <React.Fragment key={`section-${i}`}>
                    {section.section_type === "patient_caretaker_hourly_services" ?
                        <>
                            <div className='mx-2 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-lg overflow-hidden border border-cyan-200'>
                                <div className='p-2'>
                                    <div className='flex gap-3 mb-4'>
                                        <div className='w-24 h-24 bg-gradient-to-br from-cyan-200 to-blue-300 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md'>
                                            <img src="/caretaker.png" alt="Caretaker" className='rounded-md' />
                                        </div>
                                        <div className='flex-1'>
                                            <div className='text-sm font-semibold text-gray-800 mb-2'>Services For Patients in Hospital :</div>
                                            <div className='grid grid-cols-1 gap-1.5'>
                                                <div className='flex items-start gap-1.5 text-xs text-gray-700'>
                                                    <span className='text-green-500 font-bold mt-0.5'>✓</span>
                                                    <span>Staying with patient behalf of family member</span>
                                                </div>
                                                <div className='flex items-start gap-1.5 text-xs text-gray-700'>
                                                    <span className='text-green-500 font-bold mt-0.5'>✓</span>
                                                    <span>Help in bathing, toileting & feeding</span>
                                                </div>
                                                <div className='flex items-start gap-1.5 text-xs text-gray-700'>
                                                    <span className='text-green-500 font-bold mt-0.5'>✓</span>
                                                    <span>Mobility assistance with wheelchair</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-4 gap-1.5'>
                                        <div className='bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-2 border border-cyan-200 flex flex-col items-center justify-center aspect-square'>
                                            <div className='text-xs font-bold text-cyan-600'>1 hour</div>
                                            <div className='text-lg font-bold text-cyan-700'>₹99</div>
                                        </div>
                                        <div className='bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-2 border border-cyan-200 flex flex-col items-center justify-center aspect-square'>
                                            <div className='text-xs font-bold text-cyan-600'>6 hours</div>
                                            <div className='text-lg font-bold text-cyan-700'>₹399</div>
                                        </div>
                                        <div className='bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-2 border-2 border-cyan-400 flex flex-col items-center justify-center aspect-square relative'>
                                            <div className='absolute -top-1 -right-1 bg-cyan-500 text-white text-[8px] px-1 rounded-full font-bold'>⭐</div>
                                            <div className='text-xs font-bold text-cyan-600'>10 hours</div>
                                            <div className='text-lg font-bold text-cyan-700'>₹599</div>
                                        </div>
                                        <div className='bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-2 border border-cyan-200 flex flex-col items-center justify-center aspect-square'>
                                            <div className='text-xs font-bold text-cyan-600'>24 hours</div>
                                            <div className='text-lg font-bold text-cyan-700'>₹999</div>
                                        </div>
                                    </div>
                                    <a target='_blank' href={`https://wa.me/${support_no}?text=Hi, I need a caretaker for patient in hospital`} className='w-full mt-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2'>
                                        Book Now
                                    </a>
                                </div>
                            </div>
                        </> : section.section_type === "house_help" ? <>
                            <SectionHeading heading={section.heading} />
                            <div className='px-2 mb-4'>
                                <div className='grid grid-cols-2 gap-3'>
                                    <div className='bg-white rounded-lg p-3 shadow-sm border border-gray-200 flex flex-col'>
                                        <div className='text-3xl mb-2'>🚽</div>
                                        <div className='font-semibold text-gray-800 text-sm'>Bathroom Cleaning</div>
                                        <div className='text-xs text-gray-600 mt-1'>Deep cleaning service</div>
                                        <div className='mt-2 text-sm font-bold text-gray-800'>₹149 / visit</div>
                                        <a target='_blank' href={`https://wa.me/${support_no}?text=Hi, I need a caretaker for bathroom cleaning`} className='button mt-2 w-full bg-cyan-600 text-white text-xs font-semibold py-2 rounded-md'>Book Now</a>
                                    </div>
                                    <div className='bg-white rounded-lg p-3 shadow-sm border border-gray-200 flex flex-col'>
                                        <div className='text-3xl mb-2'>🍳</div>
                                        <div className='font-semibold text-gray-800 text-sm'>Kitchen & Utensils</div>
                                        <div className='text-xs text-gray-600 mt-1'>Complete kitchen care</div>
                                        <div className='mt-2 text-sm font-bold text-gray-800'>₹199 / visit</div>
                                        <a target='_blank' href={`https://wa.me/${support_no}?text=Hi, I need a caretaker for kitchen and utensils`} className='button mt-2 w-full bg-cyan-600 text-white text-xs font-semibold py-2 rounded-md'>Book Now</a>
                                    </div>
                                    <div className='bg-white rounded-lg p-3 shadow-sm border border-gray-200 flex flex-col'>
                                        <div className='text-3xl mb-2'>👕</div>
                                        <div className='font-semibold text-gray-800 text-sm'>Washing Clothes</div>
                                        <div className='text-xs text-gray-600 mt-1'>Laundry service</div>
                                        <div className='mt-2 text-sm font-bold text-gray-800'>₹129 / visit</div>
                                        <a target='_blank' href={`https://wa.me/${support_no}?text=Hi, I need a caretaker for washing clothes`} className='button mt-2 w-full bg-cyan-600 text-white text-xs font-semibold py-2 rounded-md'>Book Now</a>
                                    </div>
                                    <div className='bg-white rounded-lg p-3 shadow-sm border border-gray-200 flex flex-col'>
                                        <div className='text-3xl mb-2'>🧹</div>
                                        <div className='font-semibold text-gray-800 text-sm'>Sweeping & Mopping</div>
                                        <div className='text-xs text-gray-600 mt-1'>Floor cleaning</div>
                                        <div className='mt-2 text-sm font-bold text-gray-800'>₹159 / visit</div>
                                        <a target='_blank' href={`https://wa.me/${support_no}?text=Hi, I need a caretaker for sweeping and mopping`} className='button mt-2 w-full bg-cyan-600 text-white text-xs font-semibold py-2 rounded-md'>Book Now</a>
                                    </div>
                                    <div className='bg-white rounded-lg p-3 shadow-sm border border-gray-200 flex flex-col'>
                                        <div className='text-3xl mb-2'>🎉</div>
                                        <div className='font-semibold text-gray-800 text-sm'>Pre Party Cleaning</div>
                                        <div className='text-xs text-gray-600 mt-1'>Get ready for guests</div>
                                        <div className='mt-2 text-sm font-bold text-gray-800'>₹299 / visit</div>
                                        <a  target='_blank' href={`https://wa.me/${support_no}?text=Hi, I need a caretaker for pre party cleaning`} className='button mt-2 w-full bg-cyan-600 text-white text-xs font-semibold py-2 rounded-md'>Book Now</a>
                                    </div>
                                    <div className='bg-white rounded-lg p-3 shadow-sm border border-gray-200 flex flex-col'>
                                        <div className='text-3xl mb-2'>✨</div>
                                        <div className='font-semibold text-gray-800 text-sm'>Post Party Cleaning</div>
                                        <div className='text-xs text-gray-600 mt-1'>Quick cleanup service</div>
                                        <div className='mt-2 text-sm font-bold text-gray-800'>₹349 / visit</div>
                                        <a  target='_blank' href={`https://wa.me/${support_no}?text=Hi, I need a caretaker for post party cleaning`} className='button mt-2 w-full bg-cyan-600 text-white text-xs font-semibold py-2 rounded-md'>Book Now</a>
                                    </div>
                                </div>
                            </div>
                        </> : section.section_type === "cooking_help" ? <>
                            <SectionHeading heading={section.heading} />
                            <div className='px-2 mb-4'>
                                <div className='grid grid-cols-3 gap-3'>
                                    <div className='bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200 flex flex-col items-center'>
                                        <div className='text-4xl mb-2'>🌅</div>
                                        <div className='font-bold text-gray-800 text-sm text-center'>Breakfast</div>
                                        <div className='text-xs text-gray-600 mt-1 text-center'>7-10 AM</div>
                                    </div>
                                    <div className='bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200 flex flex-col items-center'>
                                        <div className='text-4xl mb-2'>☀️</div>
                                        <div className='font-bold text-gray-800 text-sm text-center'>Lunch</div>
                                        <div className='text-xs text-gray-600 mt-1 text-center'>12-2 PM</div>
                                    </div>
                                    <div className='bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200 flex flex-col items-center'>
                                        <div className='text-4xl mb-2'>🌙</div>
                                        <div className='font-bold text-gray-800 text-sm text-center'>Dinner</div>
                                        <div className='text-xs text-gray-600 mt-1 text-center'>7-9 PM</div>
                                    </div>
                                </div>
                            </div>
                        </> : section.section_type === "baby_caretakers" ? <>
                            <SectionHeading heading={section.heading} />
                            <div className='px-2 mb-4'>
                                <div className='bg-white rounded-lg shadow-sm p-4 border border-gray-200'>
                                    <div className='space-y-2'>
                                        <div className='grid grid-cols-3 gap-2'>
                                            <div className='bg-gray-50 rounded-lg p-2 border border-gray-200 flex flex-col items-center justify-center aspect-square'>
                                                <div className='text-xs font-bold text-gray-600'>1 hour</div>
                                                <div className='text-lg font-bold text-gray-800'>₹150 </div>
                                            </div>
                                            <div className='bg-gray-50 rounded-lg p-2 border border-gray-200 flex flex-col items-center justify-center aspect-square'>
                                                <div className='text-xs font-bold text-gray-600'>2 hours</div>
                                                <div className='text-lg font-bold text-gray-800'>₹250</div>
                                            </div>
                                            <div className='bg-gray-50 rounded-lg p-2 border border-gray-200 flex flex-col items-center justify-center aspect-square'>
                                                <div className='text-xs font-bold text-gray-600'>8 hours</div>
                                                <div className='text-lg font-bold text-gray-800'>₹600</div>
                                            </div>
                                        </div>
                                        <div className='bg-gray-100 rounded-lg p-3 shadow-sm border-2 border-gray-300 flex items-center justify-between relative'>
                                            <div className='absolute -top-2 right-2 bg-gray-800 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-md'>💎 Best Value</div>
                                            <div className='flex items-center gap-2'>
                                                <div className='bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center text-xs font-bold'>30d</div>
                                                <div className='flex flex-col'>
                                                    <span className='font-medium text-gray-700'>8 - 9 Hours/Day</span>
                                                    <span className='text-xs text-gray-600'>For 1 Month</span>
                                                </div>
                                            </div>
                                            <div className='font-bold text-gray-800 text-lg'>₹13,000 - ₹15,000</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </> : section.section_type === "senior_citizen_caretakers" ? <>
                            <SectionHeading heading={section.heading} />
                            <div className='px-2 mb-4'>
                                <div className='bg-white rounded-lg shadow-sm p-4 border border-gray-200'>
                                    <div className='space-y-2'>
                                        <div className='grid grid-cols-3 gap-2'>
                                            <div className='bg-gray-50 rounded-lg p-2 border border-gray-200 flex flex-col items-center justify-center aspect-square'>
                                                <div className='text-xs font-bold text-gray-600'>1 hour</div>
                                                <div className='text-lg font-bold text-gray-800'>₹200 </div>
                                            </div>
                                            <div className='bg-gray-50 rounded-lg p-2 border border-gray-200 flex flex-col items-center justify-center aspect-square'>
                                                <div className='text-xs font-bold text-gray-600'>2 hours</div>
                                                <div className='text-lg font-bold text-gray-800'>₹300</div>
                                            </div>
                                            <div className='bg-gray-50 rounded-lg p-2 border border-gray-200 flex flex-col items-center justify-center aspect-square'>
                                                <div className='text-xs font-bold text-gray-600'>9 hours</div>
                                                <div className='text-lg font-bold text-gray-800'>₹700</div>
                                            </div>
                                        </div>
                                        <div className='bg-gray-100 rounded-lg p-3 shadow-sm border-2 border-gray-300 flex items-center justify-between relative'>
                                            <div className='absolute -top-2 right-2 bg-gray-800 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-md'>💎 Best Value</div>
                                            <div className='flex items-center gap-2'>
                                                <div className='bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center text-xs font-bold'>30d</div>
                                                <div className='flex flex-col'>
                                                    <span className='font-medium text-gray-700'>8 - 9 Hours/Day</span>
                                                    <span className='text-xs text-gray-600'>For 1 Month</span>
                                                </div>
                                            </div>
                                            <div className='font-bold text-gray-800 text-lg'>₹13,000 - ₹15,000</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </> : section.section_type === "massage_services_senior_citizens" ? <>
                            <SectionHeading heading={section.heading} />
                            <div className='px-2 mb-4'>
                                <div className='bg-white rounded-lg shadow-sm p-4 border border-gray-200'>
                                    <div className='space-y-2'>
                                        <div className='grid grid-cols-3 gap-2'>
                                            <div className='bg-gray-50 rounded-lg p-2 border border-gray-200 flex flex-col items-center justify-center aspect-square'>
                                                <div className='text-xs font-bold text-gray-600'>15 Days</div>
                                                <div className='text-lg font-bold text-gray-800'>₹5000 </div>
                                                <div className='text-xs font-bold text-gray-600'>30 - 45 Min</div>
                                            </div>
                                            <div className='bg-gray-50 rounded-lg p-2 border border-gray-200 flex flex-col items-center justify-center aspect-square'>
                                                <div className='text-xs font-bold text-gray-600'>7 Week</div>
                                                <div className='text-lg font-bold text-gray-800'>₹2500</div>
                                                <div className='text-xs font-bold text-gray-600'>30 - 45 Min</div>
                                            </div>
                                            <div className='bg-gray-50 rounded-lg p-2 border border-gray-200 flex flex-col items-center justify-center aspect-square'>
                                                <div className='text-xs font-bold text-gray-600'>3 Days</div>
                                                <div className='text-lg font-bold text-gray-800'>₹1500</div>
                                                <div className='text-xs font-bold text-gray-600'>30 - 45 Min</div>
                                            </div>
                                        </div>
                                        <div className='bg-gray-100 rounded-lg p-3 shadow-sm border-2 border-gray-300 flex items-center justify-between relative'>
                                            <div className='absolute -top-2 right-2 bg-gray-800 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-md'>💎 Best Value</div>
                                            <div className='flex items-center gap-2'>
                                                <div className='bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center text-xs font-bold'>30d</div>
                                                <div className='flex flex-col'>
                                                    <span className='font-medium text-gray-700'>30 - 45 Min every day</span>
                                                    <span className='text-xs text-gray-600'>For 1 Month</span>
                                                </div>
                                            </div>
                                            <div className='font-bold text-gray-800 text-lg'>₹8500</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </> : <></>
                    }
                </React.Fragment>)}
            </div>
            {/* <VerticalLandingBanner position='sticky' className='top-0' banners={[
                { image: clinicBannerImage("caretaker/patient-caretaker.jpeg"), alt: "Caretaker for patient in hospital" },
                { image: clinicBannerImage("caretaker/massage-caretaker.png"), alt: "Massage Caretaker" },
                { image: clinicBannerImage("caretaker/senior-citizen-caretaker.jpeg"), alt: "Caretaker for senior citizen" },
                { image: clinicBannerImage("caretaker/baby-caretaker.jpeg"), alt: "Baby Caretaker" },
                { image: clinicBannerImage("caretaker/house-caretaker.jpeg"), alt: "Instant House Help" },
                { image: clinicBannerImage("caretaker/cook-caretaker.jpeg"), alt: "Cook Caretaker" },
                { image: clinicBannerImage("caretaker/join-caretaker.jpeg"), alt: "Join with Us as a caretaker" },
            ]} autoplay={true} loop={true} showNavigation={false} showPagination={true} /> */}
            {/* Join as Caretaker Card */}
            <div className='mx-2 mt-4 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200'>
                <div className='p-4'>
                    <div className='flex gap-3 items-center mb-3'>
                        <div className='w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0'>
                            <img src='/caretaker-default-profile.png' alt='Caretaker Profile' className='w-full h-full object-cover rounded-lg' />
                        </div>
                        <div className='flex-1'>
                            <h3 className='text-gray-800 font-bold text-lg mb-1'>Looking for Caretaker Job?</h3>
                            <p className='text-gray-600 text-sm'>Work on your preferred location & time</p>
                        </div>
                    </div>

                    <div className='bg-gray-50 rounded-lg p-3 mb-3 border border-gray-100'>
                        <div className='grid grid-cols-2 gap-2 text-gray-700'>
                            <div className='flex items-center gap-2'>
                                <span className='text-green-500 font-bold'>✓</span>
                                <span className='text-sm'>Part-time / Full-time</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <span className='text-green-500 font-bold'>✓</span>
                                <span className='text-sm'>Flexible Hours</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <span className='text-green-500 font-bold'>✓</span>
                                <span className='text-sm'>Weekly Payout</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <span className='text-green-500 font-bold'>✓</span>
                                <span className='text-sm'>Free Training</span>
                            </div>
                        </div>
                    </div>

                    <div className='bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 mb-3 border border-green-200'>
                        <div className='text-center'>
                            <div className='text-gray-600 text-sm mb-1'>EARN UPTO</div>
                            <div className='text-green-600 text-3xl font-bold flex items-center justify-center gap-1'>
                                <span>₹25,000</span>
                                <span className='text-lg'>/month</span>
                            </div>
                            <div className='text-gray-500 text-xs mt-1'>Based on availability & performance</div>
                        </div>
                    </div>

                    <button className='w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2'>
                        <span>Apply Now</span>
                        <BiRightArrowAlt className='text-2xl' />
                    </button>
                </div>
            </div>
            <div className='bg-slate-50 rounded-tl-xl rounded-tr-xl relative z-10 -mt-5 pt-5'>
                <div>
                    {pageData.sections.map((section, i) => <div key={`section-${i}`}>
                        {section.section_type === "patient_care" ? <>
                            <div className='flex px-2 gap-3'>
                                <div className='grow bg-white shadow-md rounded-md overflow-hidden p-2' style={{ background: "#a3eeff45" }}>
                                    <div className='font-semibold fs-16'>Patient Caretaker</div>
                                    <img className='h-32 w-full rounded-full' src="https://www.gahc.co.in/wp-content/uploads/2023/08/blog-03.jpg" />
                                    <div className='font-semibold flex items-center gap-1 mt-2'>
                                        <BiHome />
                                        At Home
                                    </div>
                                    <div className='font-semibold flex items-center gap-1'>
                                        <BiGroup /> 40 Staffs
                                    </div>
                                    <SendEnquiryBtn section='service_at_hospital' service_name='Need Caretaker at hospital?' />
                                </div>
                                <div className='grow bg-white shadow-md rounded-md overflow-hidden p-2' style={{ background: "#a3eeff45" }}>
                                    <div className='font-semibold fs-16'>Patient Caretaker</div>
                                    <img className='h-32 w-full rounded-full' src="https://shrimanjunathahomenursing.com/wp-content/uploads/2024/11/Patient-caretakers-at-hospitals-1024x576.webp" />
                                    <div className='font-semibold flex items-center gap-1 mt-2'>
                                        <BiClinic />
                                        At Hospital
                                    </div>
                                    <div className='font-semibold flex items-center gap-1'>
                                        <BiGroup /> 125 Staffs
                                    </div>
                                    <SendEnquiryBtn section='service_at_home' service_name='Need Caretaker at home?' />
                                </div>
                            </div>
                        </> : (section.section_type === "popular_specialist" && section.viewType === "send_enquiry") ? <>
                            <SectionHeading heading={section.heading} />
                            <div className='flex overflow-auto gap-2 px-2 mb-3 font-semibold bg-white shadow-md hide-scroll-bar'>
                                {pageData.specialists.map((specialist) =>
                                    <div className='w-1/3 shrink-0 bg-white' key={specialist.id}>
                                        <img alt={specialist.name} src={doctorSpecialityIcon(specialist.icon)} className="rounded-full w-full h-24" />
                                        <span className="color-text-light px-1 mt-1 one-line">{specialist.name}</span>
                                        <div className='flex items-center gap-1'>
                                            <BiGroup /> 140 Workers
                                        </div>
                                        <div className='pb-2 mt-2 flex gap-1'>
                                            <BookNowService service_id={specialist.id} service_name={specialist.name} logo={doctorSpecialityIcon(specialist.icon)} />
                                            {/* <Link href={specialist.seo_url} title={``} className="flex items-center justify-center border rounded-full border-color-primary h-6 w-6" >
                                            <BiRightArrowAlt className="text-2xl color-primary" />
                                        </Link> */}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </> : section.section_type === "popular_specialist" ? <>
                            <div className="bg-white mb-2">
                                <SectionHeading heading={section.heading}>
                                    <ViewAllCategories data={categories} state={state} city={city} />
                                </SectionHeading>
                                <div className="flex w-full overflow-auto hide-scroll-bar py-2 shadow-md">
                                    {pageData.specialists.map((specialist) =>
                                        <div key={specialist.id} className="w-26 px-2 shrink-0 flex flex-col items-center">
                                            <Image alt={specialist.name} src={doctorSpecialityIcon(specialist.icon)} width={48} height={48} className="h-12 w-12 rounded-full" />
                                            <Link href={specialist.seo_url} className="">{specialist.name}</Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </> : section.section_type === "doctors" ? <>
                            {section.heading && <SectionHeading heading={section.heading} />}
                            {section.doctors.map((doctor) =>
                                <div className="bg-white border-b shadow-sm mb-2 px-2 py-1 overflow-hidden click" key={doctor.id} data-href={doctor.seo_url}>
                                    <div className='flex gap-2'>
                                        <img src={doctorProfilePic(doctor.image)} className='h-24 w-18 flex-shrink-0 rounded-md' />
                                        <div className='flex flex-col'>
                                            <Link href={doctor.seo_url} className='font-bold fs-16 text one-line w-full'>{doctor.name}</Link>
                                            <span>{doctor.position}</span>
                                            <span>{doctor.experience}+ years exp.</span>
                                            <span className='flex gap-2 overflow-auto px-2 py-1 hide-scroll-bar'>
                                                {doctor.specialists.map((specialist) =>
                                                    <span key={specialist} className='border px-1 rounded-md shrink-0' style={{ background: "#ededed" }}>{specialist}</span>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='flex gap-2 px-2 mt-2'>
                                        <a className='button grow flex items-center gap-2' data-variant="outlined">
                                            <BiPhone />Call Now
                                        </a>
                                        <button className='button grow'>Book Now</button>
                                    </div>
                                </div>
                            )}
                        </> : section.section_type === "clinics" ? <>
                            {section.heading && <SectionHeading heading={section.heading} />}
                            {section.clinics.map((clinic) =>
                                <div className="bg-white border-b shadow-md mb-2 click" key={clinic.id} data-href={clinic.seo_url}>
                                    <div className="flex py-2 px-2 gap-3">
                                        <div className='flex flex-col'>
                                            <Link href={clinic.seo_url} className='font-bold fs-16 w-full'>{clinic.name}</Link>
                                            <span className='flex items-center gap-1'>
                                                <FaMapMarkerAlt className='color-primary' />
                                                {clinic.locality}, {clinic.city}
                                            </span>
                                            <span className='flex items-center gap-2 mt-1'>
                                                <FaUserMd className='color-primary' />
                                                {clinic.doctors_cnt} Staffs
                                            </span>
                                        </div>
                                        <img src={clinicProfilePic(clinic.logo)} className='h-20 w-20 rounded-md flex-shrink-0 ml-auto' />
                                    </div>
                                    <div className='flex px-2'>
                                        <span className=''>Services&nbsp;: </span>
                                        <span className='flex gap-2 overflow-auto px-2 hide-scroll-bar'>
                                            {clinic.specialists.map((specialist) =>
                                                <span key={specialist} className='border px-1 rounded-md shrink-0' style={{ background: "#ededed" }}>{specialist}</span>
                                            )}
                                        </span>
                                    </div>
                                    {clinic.doctors.length > 0 && <>
                                        <div className='px-2 font-semibold py-1'>Our Top Rated Staffs</div>
                                        <div className='flex gap-2 overflow-auto px-2 hide-scroll-bar pb-1'>
                                            {clinic.doctors.map((staff, i) =>
                                                <div key={`staff-${i}`} className='flex shrink-0 border border-color-primary rounded-md gap-1' style={{ width: "30%", padding: "3px 2px" }}>
                                                    <img src={doctorProfilePic(staff.image)} className="rounded-full" style={{ height: '2.5rem', width: '2.5rem' }} />
                                                    <div className='flex flex-col grow' style={{ width: "calc(100% - 2.5rem)" }} >
                                                        <span className='one-line font-semibold'>{staff.name}</span>
                                                        {staff.rating !== '0.00' &&
                                                            <span>
                                                                <span className='inline-flex items-center bg-primary color-white px-1 gap-1 rounded-md text-sm'>{staff.rating} <BiSolidStar /></span>
                                                            </span>
                                                        }
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </>}

                                    <div className='flex gap-2 px-2 mt-1 py-2'>
                                        {clinic.whatsapp_number &&
                                            <a className='button grow flex items-center gap-2' target="_blank" href={`https://wa.me/${clinic.whatsapp_number}?text=${encodeURI(getSendEnquiryWhatsappMessage("clinic"))}`} data-variant="outlined">
                                                <BiLogoWhatsapp />Message
                                            </a>
                                        }
                                        <a className='button grow flex items-center gap-2' href={`tel:${clinic.mobile}`} data-variant="outlined">
                                            <BiPhone />Call Now
                                        </a>
                                        <CaretakerBookClinicButton data={clinic} />
                                    </div>
                                </div>
                            )}
                        </> : section.section_type === "banners" ? <>
                            {section.heading && <SectionHeading heading={section.heading} />}
                            {section.banners && <SectionBanners banners={section.banners as TSectionBanner[]} />}
                        </> : <></>}
                    </div>)}
                </div>
                <div className='mt-28'>
                    <div className='fixed bottom-2 left-0 w-full px-2'>
                        <div className='border rounded-md px-2 py-1 flex' style={{ background: "linear-gradient(-90deg, #83cec5, #e28181)" }}>
                            <img src="/icon/customer-support.svg" className='h-16 w-16' />
                            <div className='font-semibold flex flex-col gap-1'>
                                <span className='fs-18 color-white' style={{ lineHeight: "1.3rem" }}>
                                    Need help?
                                </span>
                                <span className=''>We will Find for you, Best caretaker in lowest Price</span>
                            </div>
                            <div className='flex items-center '>
                                <BookCaretakerButton />
                            </div>
                        </div>
                    </div>
                </div>
                <SendEnquiryForm state={state} city={city} vertical='CARETAKER' />
            </div>
        </>
    )
}
export default CaretakersMobile;