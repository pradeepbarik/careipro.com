import Link from 'next/link';
import Image from 'next/image';
import { FaUserMd, FaMapMarkerAlt } from "react-icons/fa";
import { BiPhone, BiLogoWhatsapp, BiSolidStar } from "react-icons/bi";
import Header from "../components/mobile/header";
import { SectionHeading } from '@/app/components/mobile/ui';
import { TCaretakersHomePageData } from '@/lib/hooks/caretaker/useCaretaker';
import { TCategories } from "@/lib/hooks/useCategories";
import { doctorSpecialityIcon, doctorProfilePic,clinicProfilePic } from '@/lib/image';
import ViewAllCategories from '../components/mobile/doctors/view-all-categores';
import {getSendEnquiryWhatsappMessage} from '@/lib/hooks/caretaker/useCaretaker';
import {support_no} from '@/constants/site-config';
const CaretakersMobile = async ({ state, city, pageData, categories }: { state: string, city: string, market_name?: string, pageData: TCaretakersHomePageData, categories: TCategories }) => {
    return (
        <>
            <Header heading="Caretakers" template="SUBPAGE" />
            <div className="bg-white">
                <SectionHeading heading="Find Best Caretakers For">
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
            <div>
                {pageData.sections.map((section, i) => <div key={`section-${i}`}>
                    {section.section_type === "doctors" ? <>
                        {section.heading && <SectionHeading heading={section.heading} />}
                        {section.doctors.map((doctor) =>
                            <div className="bg-white border-b shadow-sm mb-1 px-2 py-1 overflow-hidden" key={doctor.id}>
                                <div className='flex gap-2'>
                                    <img src={"https://content.jdmagicbox.com/comp/bhubaneshwar/k8/0674px674.x674.240426194500.m1k8/catalogue/9dofbddzwkepy9b-j6axyrw077-250.jpg"} className='h-24 w-18 flex-shrink-0 rounded-md' />
                                    <div className='flex flex-col'>
                                        <span className='font-bold fs-18 text one-line w-full'>{doctor.name}</span>
                                        <span>{doctor.experience}+ years exp.</span>
                                        <div className='flex py-1'>
                                            <span className=''>Available&nbsp;: </span>
                                            <span className='flex gap-2 overflow-auto px-2 hide-scroll-bar'>
                                                <span className='border px-1 rounded-md shrink-0'>Monthly</span>
                                                <span className='border px-1 rounded-md shrink-0'>Daily Basis</span>
                                                <span className='border px-1 rounded-md shrink-0'>Hourly Basis</span>
                                                <span className='border px-1 rounded-md shrink-0'>24 Hours / 7 Days</span>
                                            </span>
                                        </div>
                                        <span className='flex gap-2 overflow-auto px-2 py-1 hide-scroll-bar'>
                                            <span className='border px-1 rounded-md shrink-0' style={{ background: "#ededed" }}>Nursing service</span>
                                            <span className='border px-1 rounded-md shrink-0' style={{ background: "#ededed" }}>Patient care</span>
                                            <span className='border px-1 rounded-md shrink-0' style={{ background: "#ededed" }}>senior citizen care</span>
                                            <span className='border px-1 rounded-md shrink-0' style={{ background: "#ededed" }}>Patient care</span>
                                            <span className='border px-1 rounded-md shrink-0' style={{ background: "#ededed" }}>senior citizen care</span>
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
                            <div className="bg-white border-b shadow-md mb-2" key={clinic.id}>
                                <div className="flex py-2 px-2 gap-3">
                                    <div className='flex flex-col'>
                                        <Link href={clinic.seo_url} className='font-bold fs-18 w-full'>{clinic.name}</Link>
                                        <span className='flex items-center gap-1'>
                                            <FaMapMarkerAlt className='color-primary text-sm' />
                                            {clinic.locality}, {clinic.city}
                                        </span>
                                        <span className='flex items-center font-semibold gap-2 mt-1'>
                                            <FaUserMd className='text-lg color-primary' />
                                            {clinic.doctors_cnt} Staffs
                                        </span>
                                    </div>
                                    <img src={clinicProfilePic(clinic.logo)} className='h-20 w-20 rounded-md flex-shrink-0 ml-auto' />
                                </div>
                                <div className='flex px-2'>
                                    <span className='font-semibold'>Services&nbsp;: </span>
                                    <span className='flex gap-2 overflow-auto px-2 hide-scroll-bar'>
                                        <span className='border px-1 rounded-md shrink-0'>Nursing service</span>
                                        <span className='border px-1 rounded-md shrink-0'>Patient care</span>
                                        <span className='border px-1 rounded-md shrink-0'>senior citizen care</span>
                                        <span className='border px-1 rounded-md shrink-0'>Patient care</span>
                                        <span className='border px-1 rounded-md shrink-0'>senior citizen care</span>
                                    </span>
                                </div>
                                <div className='px-2 font-semibold py-1'>Our Top Rated Staffs</div>
                                <div className='flex gap-2 overflow-auto px-2 hide-scroll-bar pb-1'>
                                    {clinic.doctors.map((staff) =>
                                        <div className='flex shrink-0 border border-color-primary rounded-md gap-1' style={{ width: "30%", padding: "3px 2px" }}>
                                            <img src={doctorProfilePic(staff.image)} className="rounded-full" style={{ height: '2.5rem', width: '2.5rem' }} />
                                            <div className='flex flex-col grow' style={{ width: "calc(100% - 2.5rem)" }} >
                                                <span className='one-line font-semibold'>{staff.name}</span>
                                                {staff.rating!=='0.00' &&
                                                    <span>
                                                        <span className='inline-flex items-center bg-primary color-white px-1 gap-1 rounded-md text-sm'>{staff.rating} <BiSolidStar /></span>
                                                    </span>
                                                }
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className='flex gap-2 px-2 mt-1 py-2'>
                                    {clinic.whatsapp_number?
                                    <a className='button grow flex items-center gap-2' target="_blank" href={`https://wa.me/${clinic.whatsapp_number}?text=${encodeURI(getSendEnquiryWhatsappMessage("clinic"))}`} data-variant="outlined">
                                        <BiLogoWhatsapp />Message
                                    </a>:<a className='button grow flex items-center gap-2' target="_blank" href={`https://wa.me/${support_no}?text=${encodeURI(getSendEnquiryWhatsappMessage("support",clinic.name))}`} data-variant="outlined">
                                        <BiLogoWhatsapp />Message
                                    </a>}
                                    <a className='button grow flex items-center gap-2' href={`tel:${clinic.mobile}`} data-variant="outlined">
                                        <BiPhone />Call Now
                                    </a>
                                    <button className='button grow'>Book Now</button>
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
                            <button className='button py-2 one-line'>Book Now</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default CaretakersMobile;