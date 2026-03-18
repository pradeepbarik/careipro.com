
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { BiSolidMap, BiUser, BiSearch, BiPhone, BiEnvelope, BiChevronRight, BiTime } from "react-icons/bi";
import { AiFillCaretDown, AiFillStar } from "react-icons/ai";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaHospital, FaUserMd, FaStethoscope } from "react-icons/fa";
import { MdVerified, MdLocalHospital } from "react-icons/md";
import { TCategories } from '@/lib/hooks/useCategories';
import { TClinicsPageData } from '@/lib/hooks/useClinics';
import { TClinic } from '@/lib/types/clinic';
import { TSectionBanner } from '@/lib/types/home-page';
import { doctorSpecialityIcon } from '@/lib/image';
import CategoriesFooter from '../components/mobile/footer/categories';
import ServiceAvailbeCities from '../components/mobile/footer/service-available-cities';
import ClientHandler from './client-handler';
import PageHeader from '../components/desktop/header';
import DesktopFooter from '../components/desktop/footer';
type Tprops = {
    state: string,
    city: string,
    pageData: TClinicsPageData,
    clinicCategories?: TCategories,
    doctorCategories?: TCategories,
}

// Hero Section
const HeroSection = ({ city }: { city: string }) => {
    const stats = [
        { label: 'Verified Clinics', value: '1200+', icon: <MdVerified className="text-2xl" /> },
        { label: 'Specialists', value: '5000+', icon: <FaUserMd className="text-2xl" /> },
        { label: 'Cities Covered', value: '50+', icon: <BiSolidMap className="text-2xl" /> },
    ];
    return (
        <div className="mb-8">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="px-8 py-8" style={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)' }}>
                    <div className="flex items-center justify-between">
                        <div className="max-w-xl">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                                    🏥 Trusted Healthcare Partners
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold text-white mb-3">
                                Hospitals & Clinics in {city}
                            </h1>
                            <p className="text-white/90 text-lg mb-6">
                                Find the best hospitals, clinics and healthcare facilities near you. Book appointments with top specialists.
                            </p>
                            <div className="flex gap-4">
                                <Link href="#specialists" className="px-6 py-3 bg-white text-green-600 font-semibold rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2">
                                    <FaStethoscope /> Browse Specialists
                                </Link>
                                <Link href="/free-listing" className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all border border-white/30">
                                    List Your Clinic
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
                <div className="w-1 h-6 bg-green-500 rounded-full"></div>
                <h2 className="text-xl font-bold text-gray-800">{heading}</h2>
            </div>
            {viewAllLink && (
                <Link href={viewAllLink} className="flex items-center gap-1 text-green-600 font-medium hover:underline text-sm">
                    View All <BiChevronRight className="text-lg" />
                </Link>
            )}
        </div>
    );
};

// Specialists Grid
const SpecialistsSection = ({ specialists, state, city, marketName }: { 
    specialists: TClinicsPageData['specialists'], 
    state: string, 
    city: string, 
    marketName: string 
}) => {
    const colors = [
        'bg-blue-50 text-blue-600 hover:bg-blue-100',
        'bg-emerald-50 text-emerald-600 hover:bg-emerald-100',
        'bg-purple-50 text-purple-600 hover:bg-purple-100',
        'bg-orange-50 text-orange-600 hover:bg-orange-100',
        'bg-pink-50 text-pink-600 hover:bg-pink-100',
        'bg-teal-50 text-teal-600 hover:bg-teal-100',
        'bg-indigo-50 text-indigo-600 hover:bg-indigo-100',
        'bg-rose-50 text-rose-600 hover:bg-rose-100',
    ];
    
    return (
        <div id="specialists" className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <SectionHeading heading="Find Clinics By Specialist" viewAllLink={`/hospitals-and-clinics/categories?state=${state}&city=${city}&market_name=${marketName}`} />
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
                        <span className="text-sm font-medium text-gray-700 text-center leading-tight group-hover:text-green-600 transition-colors">
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
        <Link href={clinic.seo_url} className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-green-500 hover:shadow-lg transition-all">
            <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    {clinic.logo ? (
                        <img src={clinic.logo} alt={clinic.name} className="w-12 h-12 rounded-lg object-cover" />
                    ) : (
                        <FaHospital className="text-green-600 text-2xl" />
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-800 truncate group-hover:text-green-600 transition-colors">
                            {clinic.name}
                        </h3>
                        {clinic.is_prime === 1 && (
                            <MdVerified className="text-blue-500 flex-shrink-0" title="Verified" />
                        )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                        <BiSolidMap className="text-red-500 flex-shrink-0" />
                        <span className="truncate">{clinic.locality}, {clinic.city}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {clinic.doctor_specializations.slice(0, 3).map((spec) => (
                            <span key={spec} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                {spec}
                            </span>
                        ))}
                        {clinic.doctor_specializations.length > 3 && (
                            <span className="px-2 py-1 bg-green-50 text-green-600 rounded text-xs font-medium">
                                +{clinic.doctor_specializations.length - 3} more
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                        <FaUserMd className="text-green-500" />
                        {clinic.doctors_count || clinic.total_specialist} Doctors
                    </span>
                </div>
                <span className="text-sm text-green-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Details <BiChevronRight />
                </span>
            </div>
        </Link>
    );
};

// Clinics Grid Section
const ClinicsGridSection = ({ heading, clinics, viewAllUrl }: { 
    heading: string, 
    clinics: TClinic[], 
    viewAllUrl?: string 
}) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <SectionHeading heading={heading} viewAllLink={viewAllUrl} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {clinics.slice(0, 6).map((clinic) => (
                    <ClinicCard key={clinic.id} clinic={clinic} />
                ))}
            </div>
            {clinics.length > 6 && viewAllUrl && (
                <div className="mt-6 text-center">
                    <Link href={viewAllUrl} className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 text-green-600 font-semibold rounded-xl hover:bg-green-100 transition-all">
                        View All {clinics.length}+ Clinics <BiChevronRight />
                    </Link>
                </div>
            )}
        </div>
    );
};

// Clinics Horizontal Scroll (1:n view)
const ClinicsHorizontalSection = ({ heading, clinics, viewAllUrl }: { 
    heading: string, 
    clinics: TClinic[], 
    viewAllUrl?: string 
}) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <SectionHeading heading={heading} viewAllLink={viewAllUrl} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {clinics.slice(0, 8).map((clinic) => (
                    <Link key={clinic.id} href={clinic.seo_url} className="group bg-gray-50 rounded-xl p-4 hover:bg-green-50 hover:shadow-md transition-all border border-transparent hover:border-green-200">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                                {clinic.logo ? (
                                    <img src={clinic.logo} alt={clinic.name} className="w-10 h-10 rounded object-cover" />
                                ) : (
                                    <FaHospital className="text-green-500 text-xl" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-800 text-sm truncate group-hover:text-green-600 transition-colors">
                                    {clinic.name}
                                </h4>
                                <p className="text-xs text-gray-500 truncate">{clinic.locality}</p>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                            <span className="text-xs text-gray-500">{clinic.total_specialist} Specialists</span>
                            <BiChevronRight className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
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
const HospitalsDesktop = ({ state, city, pageData, clinicCategories, doctorCategories }: Tprops) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <PageHeader state={state} city={city} vertical="clinics" />
            <main className="max-w-7xl mx-auto px-4 py-6">
                <HeroSection city={city} />
                
                <SpecialistsSection 
                    specialists={pageData.specialists} 
                    state={state} 
                    city={city} 
                    marketName={pageData.primary_market} 
                />

                {pageData.sections.map((section, i) => (
                    <div key={`section-${i}`} id={`section-${i}`}>
                        {section.section_type === "clinic" && section.clinics && section.clinics.length > 0 ? (
                            section.viewType === "1:n" ? (
                                <ClinicsHorizontalSection 
                                    heading={section.heading} 
                                    clinics={section.clinics} 
                                    viewAllUrl={section.view_all_url} 
                                />
                            ) : (
                                <ClinicsGridSection 
                                    heading={section.heading} 
                                    clinics={section.clinics} 
                                    viewAllUrl={section.view_all_url} 
                                />
                            )
                        ) : section.section_type === "banners" && section.banners ? (
                            <SectionBannersDesktop banners={section.banners} heading={section.heading} />
                        ) : null}
                    </div>
                ))}
            </main>

            <DesktopFooter state={state} city={city} vertical="clinics">
                <Suspense fallback={<></>}>
                    <CategoriesFooter 
                        state={state} 
                        city={city} 
                        market_name={pageData.primary_market} 
                        group_category='CLINIC' 
                        page="CLINICS" 
                        heading='Find Best Clinics By Categories' 
                    />
                </Suspense>
                <Suspense fallback={<></>}>
                    <CategoriesFooter 
                        state={state} 
                        city={city} 
                        market_name={pageData.primary_market} 
                        group_category='DOCTOR' 
                        page="CLINICS" 
                        heading='Best Specialization Doctors' 
                    />
                </Suspense>
                <Suspense fallback={<></>}>
                    <ServiceAvailbeCities />
                </Suspense>
            </DesktopFooter>

            <ClientHandler />
        </div>
    );
};

export default HospitalsDesktop;