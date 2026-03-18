import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { BiSolidMap, BiUser, BiSearch, BiPhone, BiEnvelope, BiChevronRight, BiTime, BiCalendar } from "react-icons/bi";
import { AiFillCaretDown, AiFillStar } from "react-icons/ai";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaUserMd, FaStethoscope, FaBriefcaseMedical } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { TCategories } from "@/lib/hooks/useCategories";
import { TDoctorsPageData } from "@/lib/hooks/useDoctors";
import { TDoctor } from "@/lib/types/doctor";
import { TSectionBanner } from "@/lib/types/home-page";
import { doctorSpecialityIcon } from '@/lib/image';
import CategoriesFooter from '../components/mobile/footer/categories';
import ServiceAvailbeCities from '../components/mobile/footer/service-available-cities';
import PageHeader from "../components/desktop/header";
import DesktopFooter from "../components/desktop/footer";
// Hero Section
const HeroSection = ({ city }: { city: string }) => {
    const stats = [
        { label: 'Verified Doctors', value: '5000+', icon: <MdVerified className="text-2xl" /> },
        { label: 'Specializations', value: '50+', icon: <FaStethoscope className="text-2xl" /> },
        { label: 'Happy Patients', value: '1M+', icon: <AiFillStar className="text-2xl" /> },
    ];
    return (
        <div className="mb-8">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="px-8 py-8" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #60a5fa 100%)' }}>
                    <div className="flex items-center justify-between">
                        <div className="max-w-xl">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                                    👨‍⚕️ Trusted Healthcare Professionals
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold text-white mb-3">
                                Find Best Doctors in {city}
                            </h1>
                            <p className="text-white/90 text-lg mb-6">
                                Book appointments with top specialists. Get expert medical consultation from verified and experienced doctors.
                            </p>
                            <div className="flex gap-4">
                                <Link href="#specialists" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2">
                                    <FaStethoscope /> Find Specialists
                                </Link>
                                <Link href="/free-listing" className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all border border-white/30">
                                    Join as Doctor
                                </Link>
                            </div>
                        </div>
                        <div className="hidden lg:flex gap-4">
                            {stats.map((stat) => (
                                <div key={stat.label} className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 min-w-[140px] text-center border border-white/20">
                                    <div className="text-white mb-2 flex justify-center">{stat.icon}</div>
                                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                                    <div className="text-white/80 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Section Heading
const SectionHeading = ({ heading, viewAllLink }: { heading: string, viewAllLink?: string }) => {
    return (
        <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                <h2 className="text-xl font-bold text-gray-800">{heading}</h2>
            </div>
            {viewAllLink && (
                <Link href={viewAllLink} className="flex items-center gap-1 text-blue-600 font-medium hover:underline text-sm">
                    View All <BiChevronRight className="text-lg" />
                </Link>
            )}
        </div>
    );
};

// Specialists Grid
const SpecialistsSection = ({ specialists, categories, state, city }: { 
    specialists: TDoctorsPageData['specialists'], 
    categories: TCategories,
    state: string, 
    city: string 
}) => {
    const colors = [
        'bg-blue-50 text-blue-600 hover:bg-blue-100',
        'bg-indigo-50 text-indigo-600 hover:bg-indigo-100',
        'bg-purple-50 text-purple-600 hover:bg-purple-100',
        'bg-pink-50 text-pink-600 hover:bg-pink-100',
        'bg-rose-50 text-rose-600 hover:bg-rose-100',
        'bg-orange-50 text-orange-600 hover:bg-orange-100',
        'bg-amber-50 text-amber-600 hover:bg-amber-100',
        'bg-teal-50 text-teal-600 hover:bg-teal-100',
    ];
    
    return (
        <div id="specialists" className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <SectionHeading heading="Find Doctors By Specialist" viewAllLink={`/doctors/categories?state=${state}&city=${city}`} />
            <div className="grid grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {specialists.map((specialist, index) => (
                    <Link 
                        key={specialist.id} 
                        href={specialist.seo_url} 
                        className="group flex flex-col items-center p-4 rounded-xl transition-all border border-transparent hover:border-gray-200 hover:shadow-md"
                    >
                        <div className={`w-16 h-16 rounded-2xl ${colors[index % colors.length]} flex items-center justify-center mb-3 transition-all group-hover:scale-110`}>
                            <Image 
                                alt={specialist.name} 
                                src={doctorSpecialityIcon(specialist.icon)} 
                                width={32} 
                                height={32} 
                                className="w-8 h-8" 
                            />
                        </div>
                        <span className="text-sm font-medium text-gray-700 text-center leading-tight group-hover:text-blue-600 transition-colors">
                            {specialist.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

// Doctor Card
const DoctorCard = ({ doctor }: { doctor: TDoctor }) => {
    return (
        <Link href={doctor.doctor_seo_url} className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-500 hover:shadow-lg transition-all">
            <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100">
                        {doctor.doctor_profile_pic ? (
                            <img src={doctor.doctor_profile_pic} alt={doctor.doctor_name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <FaUserMd className="text-blue-500 text-3xl" />
                            </div>
                        )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                        <MdVerified className="text-white text-xs" />
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                        {doctor.doctor_name}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">{doctor.position}</p>
                    {doctor.specialists && (
                        <p className="text-sm text-blue-600 font-medium truncate">{doctor.specialists}</p>
                    )}
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                        {doctor.experience > 0 && (
                            <span className="flex items-center gap-1">
                                <FaBriefcaseMedical className="text-blue-400" />
                                {doctor.experience} Yrs Exp
                            </span>
                        )}
                        {doctor.qualification_disp && (
                            <span className="truncate">{doctor.qualification_disp}</span>
                        )}
                    </div>
                </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <BiSolidMap className="text-red-500 flex-shrink-0" />
                    <span className="truncate">{doctor.clinic}, {doctor.locality}</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {doctor.availability && (
                            <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                <BiTime /> {doctor.availability}
                            </span>
                        )}
                        {doctor.service_charge > 0 && (
                            <span className="text-sm font-semibold text-gray-800">₹{doctor.service_charge}</span>
                        )}
                    </div>
                    <span className="text-sm text-blue-600 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Book Now <BiChevronRight />
                    </span>
                </div>
            </div>
        </Link>
    );
};

// Doctors Grid Section (n:1 view)
const DoctorsGridSection = ({ heading, doctors, viewAllUrl }: { 
    heading: string, 
    doctors: TDoctor[], 
    viewAllUrl?: string 
}) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <SectionHeading heading={heading} viewAllLink={viewAllUrl} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {doctors.slice(0, 6).map((doctor) => (
                    <DoctorCard key={`${doctor.doctor_id}-${doctor.service_location_id}`} doctor={doctor} />
                ))}
            </div>
            {doctors.length > 6 && viewAllUrl && (
                <div className="mt-6 text-center">
                    <Link href={viewAllUrl} className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-600 font-semibold rounded-xl hover:bg-blue-100 transition-all">
                        View All {doctors.length}+ Doctors <BiChevronRight />
                    </Link>
                </div>
            )}
        </div>
    );
};

// Doctors Horizontal Section (1:n view)
const DoctorsHorizontalSection = ({ heading, doctors, viewAllUrl }: { 
    heading: string, 
    doctors: TDoctor[], 
    viewAllUrl?: string 
}) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <SectionHeading heading={heading} viewAllLink={viewAllUrl} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {doctors.slice(0, 8).map((doctor) => (
                    <Link 
                        key={`${doctor.doctor_id}-${doctor.service_location_id}`} 
                        href={doctor.doctor_seo_url} 
                        className="group bg-gray-50 rounded-xl p-4 hover:bg-blue-50 hover:shadow-md transition-all border border-transparent hover:border-blue-200"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-white shadow-sm flex-shrink-0">
                                {doctor.doctor_profile_pic ? (
                                    <img src={doctor.doctor_profile_pic} alt={doctor.doctor_name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                                        <FaUserMd className="text-blue-500 text-xl" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-800 text-sm truncate group-hover:text-blue-600 transition-colors">
                                    {doctor.doctor_name}
                                </h4>
                                <p className="text-xs text-gray-500 truncate">{doctor.position}</p>
                                {doctor.experience > 0 && (
                                    <p className="text-xs text-blue-600 mt-1">{doctor.experience} Yrs Experience</p>
                                )}
                            </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                            <span className="text-xs text-gray-500 truncate">{doctor.locality}</span>
                            <BiChevronRight className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

// Section Banners
const SectionBannersDesktop = ({ banners, heading }: { banners: TSectionBanner[], heading?: string }) => {
    return (
        <div className="mb-8">
            {heading && <SectionHeading heading={heading} />}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {banners.map((banner, index) => (
                    <div key={index} className="rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all" style={{ ...banner.display_style }}>
                        {banner.redirection_url ? (
                            <Link href={banner.redirection_url}>
                                <img src={banner.img_url} alt={banner.alt_text || 'Banner'} className="w-full h-48 object-cover" />
                            </Link>
                        ) : (
                            <img src={banner.img_url} alt={banner.alt_text || 'Banner'} className="w-full h-48 object-cover" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Main Component
const DesktopDoctors = ({ city, state, pageData, categories, diseases }: { 
    city: string, 
    state: string, 
    pageData: TDoctorsPageData, 
    categories: TCategories, 
    diseases: TCategories 
}) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <PageHeader state={state} city={city} vertical="doctors"  />
            <main className="max-w-7xl mx-auto px-4 py-6">
                <HeroSection city={city} />
                
                <SpecialistsSection 
                    specialists={pageData.specialists} 
                    categories={categories}
                    state={state} 
                    city={city} 
                />

                {pageData.sections.map((section, i) => (
                    <div key={`section-${i}`} id={`section-${i}`}>
                        {section.section_type === "doctor" && section.doctors && section.doctors.length > 0 ? (
                            section.viewType === "1:n" ? (
                                <DoctorsHorizontalSection 
                                    heading={section.heading} 
                                    doctors={section.doctors} 
                                    viewAllUrl={section.view_all_url} 
                                />
                            ) : (
                                <DoctorsGridSection 
                                    heading={section.heading} 
                                    doctors={section.doctors} 
                                    viewAllUrl={section.view_all_url} 
                                />
                            )
                        ) : section.section_type === "banners" && section.banners ? (
                            <SectionBannersDesktop banners={section.banners} heading={section.heading} />
                        ) : null}
                    </div>
                ))}
            </main>

            <DesktopFooter state={state} city={city} vertical="doctors">
                <Suspense fallback={<></>}>
                    <CategoriesFooter 
                        state={state} 
                        city={city} 
                        group_category='DOCTOR' 
                        heading='Best Doctors By Speciality' 
                        categories={categories} 
                    />
                </Suspense>
                <Suspense fallback={<></>}>
                    <CategoriesFooter 
                        state={state} 
                        city={city} 
                        group_category='DISEASE' 
                        heading='Disease Specialist Doctors' 
                        categories={diseases} 
                    />
                </Suspense>
                <Suspense fallback={<></>}>
                    <ServiceAvailbeCities />
                </Suspense>
            </DesktopFooter>
        </div>
    );
};

export default DesktopDoctors;