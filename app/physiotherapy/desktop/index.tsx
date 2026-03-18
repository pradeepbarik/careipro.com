import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { BiPhone, BiChevronRight, BiTime } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { FaUserMd, FaMapMarkerAlt, FaRunning, FaHeartbeat } from "react-icons/fa";
import { MdVerified, MdSportsGymnastics } from "react-icons/md";
import { GiMuscleUp } from "react-icons/gi";
import { fetchPhysiotherapyHomePageData, TClinic, TSpecialization } from "@/lib/hooks/physiotherapy/usePhysiotherapy";
import { TSectionBanner, TSiteBanner } from "@/lib/types/home-page";
import { doctorSpecialityIcon, clinicProfilePic, clinicBannerImage, doctorProfilePic } from '@/lib/image';
import ServiceAvailbeCities from '../../components/mobile/footer/service-available-cities';
import DesktopFooter from "@/app/components/desktop/footer";
import PageHeader from "@/app/components/desktop/header";
// Hero Section
const HeroSection = ({ city }: { city: string }) => {
    const stats = [
        { label: 'Verified Centers', value: '200+', icon: <MdVerified className="text-2xl" /> },
        { label: 'Expert Therapists', value: '500+', icon: <FaUserMd className="text-2xl" /> },
        { label: 'Happy Patients', value: '25K+', icon: <FaHeartbeat className="text-2xl" /> },
    ];
    return (
        <div className="mb-8">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="px-8 py-8" style={{ background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #2dd4bf 100%)' }}>
                    <div className="flex items-center justify-between">
                        <div className="max-w-xl">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                                    💪 Expert Physical Rehabilitation
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold text-white mb-3">
                                Physiotherapy Services in {city}
                            </h1>
                            <p className="text-white/90 text-lg mb-6">
                                Find the best physiotherapy centers and expert therapists. Get relief from pain, recover from injuries, and improve mobility.
                            </p>
                            <div className="flex gap-4">
                                <Link href="#specialists" className="px-6 py-3 bg-white text-teal-600 font-semibold rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2">
                                    <GiMuscleUp /> Find Therapists
                                </Link>
                                <Link href="/free-listing" className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all border border-white/30">
                                    Register Your Center
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
                <div className="w-1 h-6 bg-teal-500 rounded-full"></div>
                <h2 className="text-xl font-bold text-gray-800">{heading}</h2>
            </div>
            {viewAllLink && (
                <Link href={viewAllLink} className="flex items-center gap-1 text-teal-600 font-medium hover:underline text-sm">
                    View All <BiChevronRight className="text-lg" />
                </Link>
            )}
        </div>
    );
};

// Specializations Grid
const SpecializationsSection = ({ specialists, state, city }: { 
    specialists: TSpecialization[], 
    state: string, 
    city: string 
}) => {
    const colors = [
        'bg-teal-50 text-teal-600 hover:bg-teal-100',
        'bg-cyan-50 text-cyan-600 hover:bg-cyan-100',
        'bg-emerald-50 text-emerald-600 hover:bg-emerald-100',
        'bg-green-50 text-green-600 hover:bg-green-100',
        'bg-sky-50 text-sky-600 hover:bg-sky-100',
        'bg-blue-50 text-blue-600 hover:bg-blue-100',
    ];
    
    return (
        <div id="specialists" className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <SectionHeading heading="Find By Treatment Type" viewAllLink={`/physiotherapy/categories?state=${state}&city=${city}`} />
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {specialists.map((specialist, index) => (
                    <Link 
                        key={specialist.id} 
                        href={specialist.seo_url} 
                        title={`${specialist.name} in ${city}`}
                        className="group flex flex-col items-center p-4 rounded-xl transition-all border border-transparent hover:border-gray-200 hover:shadow-md"
                    >
                        <div className={`w-16 h-16 rounded-2xl ${colors[index % colors.length]} flex items-center justify-center mb-3 transition-all group-hover:scale-110`}>
                            <img 
                                alt={specialist.name} 
                                src={doctorSpecialityIcon(specialist.icon)} 
                                className="w-8 h-8" 
                            />
                        </div>
                        <span className="text-sm font-medium text-gray-700 text-center leading-tight group-hover:text-teal-600 transition-colors">
                            {specialist.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

// Clinic Card
const ClinicCard = ({ clinic }: { clinic: TClinic }) => {
    return (
        <div className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-teal-500 hover:shadow-lg transition-all">
            <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-teal-100 to-cyan-100 flex-shrink-0">
                    {clinic.logo ? (
                        <img src={clinicProfilePic(clinic.logo)} alt={clinic.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <GiMuscleUp className="text-teal-500 text-2xl" />
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <Link href={clinic.seo_url} className="font-semibold text-gray-800 truncate block group-hover:text-teal-600 transition-colors">
                        {clinic.name}
                    </Link>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                        <FaMapMarkerAlt className="text-red-500 flex-shrink-0" />
                        <span className="truncate">{clinic.locality}, {clinic.city}</span>
                    </div>
                    {clinic.rating > 0 && (
                        <div className="flex items-center gap-1 mt-1">
                            <span className="flex items-center gap-0.5 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded">
                                {clinic.rating} <AiFillStar />
                            </span>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="mt-3">
                <div className="flex flex-wrap gap-1.5">
                    {clinic.specialists.slice(0, 3).map((spec) => (
                        <span key={spec} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                            {spec}
                        </span>
                    ))}
                    {clinic.specialists.length > 3 && (
                        <span className="px-2 py-0.5 bg-teal-50 text-teal-600 rounded text-xs font-medium">
                            +{clinic.specialists.length - 3}
                        </span>
                    )}
                </div>
            </div>

            {clinic.doctors && clinic.doctors.length > 0 && (
                <div className="mt-4">
                    <span className="text-sm font-semibold text-gray-700">Expert Therapists</span>
                    <div className="flex gap-2 mt-2 overflow-x-auto hide-scroll-bar">
                        {clinic.doctors.slice(0, 3).map((therapist, i) => (
                            <div key={`therapist-${i}`} className="flex items-center gap-2 border border-teal-200 rounded-lg p-2 flex-shrink-0 bg-teal-50/50">
                                <img src={doctorProfilePic(therapist.image)} alt={therapist.name} className="w-10 h-10 rounded-full object-cover" />
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-gray-800 truncate">{therapist.name}</p>
                                    <p className="text-xs text-gray-500">{therapist.experience}+ yrs</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                <a 
                    href={`tel:${clinic.mobile}`}
                    className="flex-1 flex items-center justify-center gap-2 py-2 border border-teal-500 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors text-sm font-medium"
                >
                    <BiPhone /> Call Now
                </a>
                <Link 
                    href={clinic.seo_url}
                    className="flex-1 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm font-medium text-center"
                >
                    Book Appointment
                </Link>
            </div>
        </div>
    );
};

// Clinics Section
const ClinicsSection = ({ heading, clinics }: { 
    heading: string, 
    clinics: TClinic[] 
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

// Banner Section
const BannerSection = ({ banners }: { banners: TSiteBanner[] }) => {
    const mobileBanners = banners.filter((banner) => banner.device_type === "desktop" || banner.device_type === "all");
    if (mobileBanners.length === 0) return null;
    
    return (
        <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mobileBanners.map((banner) => (
                    <div key={banner.id} className="rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all">
                        <img src={clinicBannerImage(banner.image)} alt={banner.alt_text} className="w-full h-48 object-cover" />
                    </div>
                ))}
            </div>
        </div>
    );
};

// Promotion Banner
const PromotionBanner = ({ banner }: { banner: { banner: string, banner_redirection_url: string } }) => {
    return (
        <div className="mb-8">
            <Link href={banner.banner_redirection_url || "#"} className="block rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all">
                <img src={banner.banner} alt="Promotion" className="w-full h-48 object-cover" />
            </Link>
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

// Services Info Section
const ServicesInfoSection = () => {
    const services = [
        { name: 'Sports Injury', icon: <FaRunning className="text-2xl" />, desc: 'Recovery from sports injuries' },
        { name: 'Joint Pain', icon: <GiMuscleUp className="text-2xl" />, desc: 'Relief from joint & muscle pain' },
        { name: 'Post Surgery', icon: <FaHeartbeat className="text-2xl" />, desc: 'Post-operative rehabilitation' },
        { name: 'Spine Care', icon: <MdSportsGymnastics className="text-2xl" />, desc: 'Back & neck pain treatment' },
    ];
    
    return (
        <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 rounded-2xl p-6 mb-8">
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Our Physiotherapy Services</h3>
                <p className="text-white/80">Comprehensive physical rehabilitation for all your needs</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {services.map((service) => (
                    <div key={service.name} className="bg-white/15 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20 hover:bg-white/25 transition-all cursor-pointer">
                        <div className="text-white mb-2 flex justify-center">{service.icon}</div>
                        <h4 className="font-semibold text-white">{service.name}</h4>
                        <p className="text-white/70 text-sm mt-1">{service.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Main Component
const PhysiotherapyDesktop = async ({ state, city }: { state: string, city: string }) => {
    const pageData = await fetchPhysiotherapyHomePageData(state, city);
    
    return (
        <div className="min-h-screen bg-gray-100">
            <PageHeader state={state} city={city} vertical="physiotherapy"  />
            <main className="max-w-7xl mx-auto px-4 py-6">
                <HeroSection city={city} />
                
                <ServicesInfoSection />

                {pageData.sections.map((section, i) => (
                    <div key={`section-${i}`}>
                        {section.section_type === "banner" && section.banners ? (
                            <BannerSection banners={section.banners as TSiteBanner[]} />
                        ) : section.section_type === "popular_specialist" && section.specialists ? (
                            <SpecializationsSection specialists={section.specialists} state={state} city={city} />
                        ) : section.section_type === "promotion_banner" && section.banner ? (
                            <PromotionBanner banner={section.banner} />
                        ) : section.section_type === "clinics" && section.clinics ? (
                            <ClinicsSection heading={section.heading} clinics={section.clinics} />
                        ) : section.section_type === "banners" && section.banners ? (
                            <SectionBannersDesktop banners={section.banners as TSectionBanner[]} heading={section.heading} />
                        ) : null}
                    </div>
                ))}
            </main>

            <DesktopFooter state={state} city={city} vertical="physiotherapy">
                <Suspense fallback={<></>}>
                    <ServiceAvailbeCities />
                </Suspense>
            </DesktopFooter>
        </div>
    );
};

export default PhysiotherapyDesktop;