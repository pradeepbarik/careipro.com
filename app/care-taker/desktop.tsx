import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { BiSolidMap, BiUser, BiSearch, BiPhone, BiEnvelope, BiChevronRight, BiLogoWhatsapp, BiSolidStar, BiGroup, BiHome, BiClinic } from "react-icons/bi";
import { AiFillCaretDown, AiFillStar } from "react-icons/ai";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaUserMd, FaMapMarkerAlt, FaHandHoldingMedical, FaHeartbeat } from "react-icons/fa";
import { MdVerified, MdSupportAgent } from "react-icons/md";
import { TCaretakersHomePageData, TCaretaker, TCareTakerClinic, getSendEnquiryWhatsappMessage } from "@/lib/hooks/caretaker/useCaretaker";
import { TCategories } from "@/lib/hooks/useCategories";
import { TSectionBanner, TSiteBanner } from "@/lib/types/home-page";
import { doctorSpecialityIcon, doctorProfilePic, clinicProfilePic, clinicBannerImage } from '@/lib/image';
import CategoriesFooter from '../components/mobile/footer/categories';
import ServiceAvailbeCities from '../components/mobile/footer/service-available-cities';
import { BookCaretakerButton, BookNowService, SendEnquiryBtn, CaretakerBookClinicButton } from '@/app/components/mobile/caretaker/booing-caretaker';
import SendEnquiryForm from '@/app/components/mobile/send-enquiry-form';
import PageHeader from "../components/desktop/header";
import DesktopFooter from "../components/desktop/footer";
// Hero Section
const HeroSection = ({ city }: { city: string }) => {
    const stats = [
        { label: 'Verified Caretakers', value: '800+', icon: <MdVerified className="text-2xl" /> },
        { label: 'Service Agencies', value: '100+', icon: <FaHandHoldingMedical className="text-2xl" /> },
        { label: 'Happy Families', value: '50K+', icon: <FaHeartbeat className="text-2xl" /> },
    ];
    return (
        <div className="mb-8">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="px-8 py-8" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 50%, #a78bfa 100%)' }}>
                    <div className="flex items-center justify-between">
                        <div className="max-w-xl">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                                    🏠 Professional Home Care Services
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold text-white mb-3">
                                Caretaker Services in {city}
                            </h1>
                            <p className="text-white/90 text-lg mb-6">
                                Find professional caretakers for elderly care, patient care, and home nursing. Trusted and verified staff at your doorstep.
                            </p>
                            <div className="flex gap-4">
                                <Link href="#services" className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2">
                                    <FaHandHoldingMedical /> Find Caretakers
                                </Link>
                                <Link href="/free-listing" className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all border border-white/30">
                                    Register as Agency
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
                <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                <h2 className="text-xl font-bold text-gray-800">{heading}</h2>
            </div>
            {viewAllLink && (
                <Link href={viewAllLink} className="flex items-center gap-1 text-purple-600 font-medium hover:underline text-sm">
                    View All <BiChevronRight className="text-lg" />
                </Link>
            )}
        </div>
    );
};

// Patient Care Cards
const PatientCareSection = () => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <SectionHeading heading="Patient Care Services" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group relative rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)' }}>
                    <div className="p-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Patient Caretaker at Home</h3>
                        <p className="text-gray-600 mb-4">Professional care for your loved ones in the comfort of your home</p>
                        <div className="flex items-center gap-4 mb-4">
                            <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <BiHome className="text-purple-500 text-lg" /> Home Service
                            </span>
                            <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <BiGroup className="text-purple-500 text-lg" /> 40+ Staffs Available
                            </span>
                        </div>
                        <SendEnquiryBtn section='service_at_home' service_name='Need Caretaker at home?' />
                    </div>
                    <img 
                        src="https://www.gahc.co.in/wp-content/uploads/2023/08/blog-03.jpg" 
                        alt="Home Caretaker" 
                        className="absolute right-0 bottom-0 w-48 h-48 object-cover rounded-tl-3xl opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                </div>
                
                <div className="group relative rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)' }}>
                    <div className="p-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Patient Caretaker at Hospital</h3>
                        <p className="text-gray-600 mb-4">Dedicated support during hospital stays for better recovery</p>
                        <div className="flex items-center gap-4 mb-4">
                            <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <BiClinic className="text-purple-500 text-lg" /> Hospital Service
                            </span>
                            <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <BiGroup className="text-purple-500 text-lg" /> 125+ Staffs Available
                            </span>
                        </div>
                        <SendEnquiryBtn section='service_at_hospital' service_name='Need Caretaker at hospital?' />
                    </div>
                    <img 
                        src="https://shrimanjunathahomenursing.com/wp-content/uploads/2024/11/Patient-caretakers-at-hospitals-1024x576.webp" 
                        alt="Hospital Caretaker" 
                        className="absolute right-0 bottom-0 w-48 h-48 object-cover rounded-tl-3xl opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                </div>
            </div>
        </div>
    );
};

// Specialists Grid with Send Enquiry
const SpecialistsEnquirySection = ({ specialists, heading }: { 
    specialists: TCaretakersHomePageData['specialists'],
    heading: string 
}) => {
    return (
        <div id="services" className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <SectionHeading heading={heading} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {specialists.map((specialist) => (
                    <div key={specialist.id} className="group bg-gray-50 rounded-xl p-4 hover:bg-purple-50 transition-all border border-transparent hover:border-purple-200">
                        <div className="flex flex-col items-center text-center">
                            <img 
                                alt={specialist.name} 
                                src={doctorSpecialityIcon(specialist.icon)} 
                                className="w-20 h-20 rounded-full mb-3 group-hover:scale-105 transition-transform"
                            />
                            <h4 className="font-semibold text-gray-800 mb-1 group-hover:text-purple-600 transition-colors">
                                {specialist.name}
                            </h4>
                            <span className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                                <BiGroup /> 140+ Workers
                            </span>
                            <BookNowService service_id={specialist.id} service_name={specialist.name} logo={doctorSpecialityIcon(specialist.icon)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Regular Specialists Grid
const SpecialistsSection = ({ specialists, categories, state, city }: { 
    specialists: TCaretakersHomePageData['specialists'], 
    categories: TCategories,
    state: string, 
    city: string 
}) => {
    const colors = [
        'bg-purple-50 text-purple-600 hover:bg-purple-100',
        'bg-pink-50 text-pink-600 hover:bg-pink-100',
        'bg-indigo-50 text-indigo-600 hover:bg-indigo-100',
        'bg-violet-50 text-violet-600 hover:bg-violet-100',
        'bg-fuchsia-50 text-fuchsia-600 hover:bg-fuchsia-100',
        'bg-rose-50 text-rose-600 hover:bg-rose-100',
    ];
    
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <SectionHeading heading="Find By Service Type" viewAllLink={`/care-taker/categories?state=${state}&city=${city}`} />
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
                        <span className="text-sm font-medium text-gray-700 text-center leading-tight group-hover:text-purple-600 transition-colors">
                            {specialist.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

// Caretaker Card
const CaretakerCard = ({ caretaker }: { caretaker: TCaretaker }) => {
    return (
        <Link href={caretaker.seo_url} className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-purple-500 hover:shadow-lg transition-all">
            <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                        {caretaker.image ? (
                            <img src={doctorProfilePic(caretaker.image)} alt={caretaker.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <FaUserMd className="text-purple-500 text-3xl" />
                            </div>
                        )}
                    </div>
                    {caretaker.rating && parseFloat(caretaker.rating) > 0 && (
                        <div className="absolute -bottom-1 -right-1 flex items-center gap-0.5 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded">
                            <span>{caretaker.rating}</span>
                            <BiSolidStar className="text-[10px]" />
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate group-hover:text-purple-600 transition-colors">
                        {caretaker.name}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">{caretaker.position}</p>
                    <p className="text-sm text-purple-600 font-medium">{caretaker.experience}+ years exp.</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                        {caretaker.specialists.slice(0, 2).map((spec) => (
                            <span key={spec} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                {spec}
                            </span>
                        ))}
                        {caretaker.specialists.length > 2 && (
                            <span className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded text-xs font-medium">
                                +{caretaker.specialists.length - 2}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                <a className="flex-1 flex items-center justify-center gap-2 py-2 border border-purple-500 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium">
                    <BiPhone /> Call Now
                </a>
                <button className="flex-1 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium">
                    Book Now
                </button>
            </div>
        </Link>
    );
};

// Caretakers Grid Section
const CaretakersSection = ({ heading, caretakers }: { 
    heading: string, 
    caretakers: TCaretaker[] 
}) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <SectionHeading heading={heading} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {caretakers.slice(0, 6).map((caretaker) => (
                    <CaretakerCard key={caretaker.id} caretaker={caretaker} />
                ))}
            </div>
        </div>
    );
};

// Clinic Card
const ClinicCard = ({ clinic }: { clinic: TCareTakerClinic }) => {
    return (
        <div className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-purple-500 hover:shadow-lg transition-all">
            <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 flex-shrink-0">
                    {clinic.logo ? (
                        <img src={clinicProfilePic(clinic.logo)} alt={clinic.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <FaHandHoldingMedical className="text-purple-500 text-2xl" />
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <Link href={clinic.seo_url} className="font-semibold text-gray-800 truncate block group-hover:text-purple-600 transition-colors">
                        {clinic.name}
                    </Link>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                        <FaMapMarkerAlt className="text-red-500 flex-shrink-0" />
                        <span className="truncate">{clinic.locality}, {clinic.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <FaUserMd className="text-purple-500" />
                        <span>{clinic.doctors_cnt} Staffs Available</span>
                    </div>
                </div>
            </div>
            
            <div className="mt-3">
                <span className="text-sm text-gray-600">Services: </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                    {clinic.specialists.slice(0, 3).map((spec) => (
                        <span key={spec} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                            {spec}
                        </span>
                    ))}
                    {clinic.specialists.length > 3 && (
                        <span className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded text-xs font-medium">
                            +{clinic.specialists.length - 3}
                        </span>
                    )}
                </div>
            </div>

            {clinic.doctors.length > 0 && (
                <div className="mt-4">
                    <span className="text-sm font-semibold text-gray-700">Top Rated Staffs</span>
                    <div className="flex gap-2 mt-2 overflow-x-auto hide-scroll-bar">
                        {clinic.doctors.slice(0, 3).map((staff, i) => (
                            <div key={`staff-${i}`} className="flex items-center gap-2 border border-purple-200 rounded-lg p-2 flex-shrink-0 bg-purple-50/50">
                                <img src={doctorProfilePic(staff.image)} alt={staff.name} className="w-10 h-10 rounded-full object-cover" />
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-gray-800 truncate">{staff.name}</p>
                                    {staff.rating !== '0.00' && (
                                        <span className="inline-flex items-center gap-0.5 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded">
                                            {staff.rating} <BiSolidStar />
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                {clinic.whatsapp_number && (
                    <a 
                        href={`https://wa.me/${clinic.whatsapp_number}?text=${encodeURI(getSendEnquiryWhatsappMessage("clinic"))}`}
                        target="_blank"
                        className="flex-1 flex items-center justify-center gap-2 py-2 border border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium"
                    >
                        <BiLogoWhatsapp /> Message
                    </a>
                )}
                <a 
                    href={`tel:${clinic.mobile}`}
                    className="flex-1 flex items-center justify-center gap-2 py-2 border border-purple-500 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium"
                >
                    <BiPhone /> Call Now
                </a>
                <CaretakerBookClinicButton data={clinic} />
            </div>
        </div>
    );
};

// Clinics Section
const ClinicsSection = ({ heading, clinics }: { 
    heading: string, 
    clinics: TCareTakerClinic[] 
}) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <SectionHeading heading={heading} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {clinics.slice(0, 6).map((clinic) => (
                    <ClinicCard key={clinic.id} clinic={clinic} />
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

// Help Banner
const HelpBanner = () => {
    return (
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                        <MdSupportAgent className="text-white text-3xl" />
                    </div>
                    <div className="text-white">
                        <h3 className="text-2xl font-bold">Need Help Finding a Caretaker?</h3>
                        <p className="text-white/80">We'll find the best caretaker for you at the lowest price</p>
                    </div>
                </div>
                <BookCaretakerButton />
            </div>
        </div>
    );
};
// Main Component
const CareTakerDesktop = ({ state, city, pageData, categories }: { 
    state: string, 
    city: string, 
    market_name?: string, 
    pageData: TCaretakersHomePageData, 
    categories: TCategories 
}) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <PageHeader state={state} city={city} vertical="caretaker" />
            <main className="max-w-7xl mx-auto px-4 py-6">
                <HeroSection city={city} />
                
                <HelpBanner />

                {pageData.sections.map((section, i) => (
                    <div key={`section-${i}`}>
                        {section.section_type === "patient_care" ? (
                            <>
                            <PatientCareSection />
                            </>
                        ) : section.section_type === "popular_specialist" && section.viewType === "send_enquiry" ? (
                            <SpecialistsEnquirySection specialists={pageData.specialists} heading={section.heading} />
                        ) : section.section_type === "popular_specialist" ? (
                            <SpecialistsSection specialists={pageData.specialists} categories={categories} state={state} city={city} />
                        ) : section.section_type === "doctors" && section.doctors.length > 0 ? (
                            <CaretakersSection heading={section.heading} caretakers={section.doctors} />
                        ) : section.section_type === "clinics" && section.clinics.length > 0 ? (
                            <ClinicsSection heading={section.heading} clinics={section.clinics} />
                        ) : section.section_type === "site_banner" && section.banners ? (
                            <SectionBannersDesktop banners={section.banners as TSectionBanner[]} heading={section.heading} />
                        ) : null}
                    </div>
                ))}
            </main>

            <DesktopFooter state={state} city={city} vertical="caretaker">
                <Suspense fallback={<></>}>
                    <ServiceAvailbeCities />
                </Suspense>
            </DesktopFooter>
            <SendEnquiryForm state={state} city={city} vertical='CARETAKER' />
        </div>
    );
};

export default CareTakerDesktop;