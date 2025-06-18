import Link from 'next/link';
import Image from 'next/image';
import { FaUserMd, FaMapMarkerAlt } from "react-icons/fa";
import { BiPhone, BiLogoWhatsapp, BiSolidStar, BiGroup, BiHome, BiClinic, BiRightArrowAlt } from "react-icons/bi";
import Header from "../components/mobile/header";
import { SectionHeading } from '@/app/components/mobile/ui';
import { TCaretakersHomePageData } from '@/lib/hooks/caretaker/useCaretaker';
import { TCategories } from "@/lib/hooks/useCategories";
import { doctorSpecialityIcon, doctorProfilePic, clinicProfilePic, clinicBannerImage } from '@/lib/image';
import ViewAllCategories from '../components/mobile/doctors/view-all-categores';
import { getSendEnquiryWhatsappMessage } from '@/lib/hooks/caretaker/useCaretaker';
import { support_no } from '@/constants/site-config';
import { BookCaretakerButton, BookNowService,SendEnquiryBtn, CaretakerBookClinicButton } from '@/app/components/mobile/caretaker/booing-caretaker';
import BannerView from '@/app/components/mobile/banner-view';
import SendEnquiryForm from '@/app/components/mobile/send-enquiry-form';
const CaretakersMobile = async ({ state, city, pageData, categories }: { state: string, city: string, market_name?: string, pageData: TCaretakersHomePageData, categories: TCategories }) => {
    return (
        <>
            <Header heading="Caretakers" template="SUBPAGE" />
            <div>
                {pageData.sections.map((section, i) => <div key={`section-${i}`}>
                    {section.section_type === "site_banner" ? <div className='relative'>
                        <BannerView banners={(section.banners ? section.banners : []).filter(banner => banner.device_type === "mobile" || banner.device_type === "all").map(banner => ({
                            src: clinicBannerImage(banner.image),
                            media_type: "image",
                            duration: 5,
                        }))} />
                    </div> : section.section_type === "patient_care" ? <>
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
                                <SendEnquiryBtn section='service_at_hospital'/>
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
                                <SendEnquiryBtn section='service_at_home'/>
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
        </>
    )
}
export default CaretakersMobile;