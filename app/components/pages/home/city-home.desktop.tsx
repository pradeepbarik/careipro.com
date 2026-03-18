import { Suspense } from 'react';
import Link from 'next/link';
import { getCityHomePageData } from '@/lib/hooks/home/useHomePage';
import { BiSolidMap, BiClinic, BiUser, BiSearch, BiPhone, BiEnvelope, BiChevronRight, BiTime } from "react-icons/bi";
import { AiFillCaretDown, AiFillStar } from "react-icons/ai";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaUserMd, FaHospital, FaHandHoldingMedical, FaPaw } from "react-icons/fa";
import { MdVerified, MdLocalHospital } from "react-icons/md";
import { doctorSpecialityIcon, verticalIcon, getCityIcon } from '@/lib/image';
import { alllCategoriesPageLink, cityPageLink } from '@/lib/helper/link';
import { capitalizeFirstLetter } from '@/lib/helper/format-text';
import SetStateCity from '../../client-components/set-state-city';
import CategoriesFooter from '../../mobile/footer/categories';
import { userSecreateKey, userinfo } from '@/constants/storage_keys';
import dynamic from 'next/dynamic';
import { THomePageData, TPopularDoctor, TSpecility, TSectionBanner } from '@/lib/types/home-page';
import { TPopularClinic } from '@/lib/types/clinic';
import DesktopFooter from '../../desktop/footer';
import PageHeader from '../../desktop/header';
import HomePageBanner from '../../desktop/home/home-page-banner';
import SectionBanners from '../../mobile/section-banners';

const AppointmentReminder = dynamic(() => import("../../mobile/appointment-reminder"), { ssr: false });
const RatingReminder = dynamic(() => import("../../mobile/rating-reminder"), { ssr: false });
const OwnBusinessCard = dynamic(() => import("../../mobile/own-business-card"), { ssr: false });

const SectionHeading = ({ heading, showViewAll, viewAllLink }: { heading: string, showViewAll?: boolean, viewAllLink?: string }) => {
    return (
        <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-primary rounded-full"></div>
                <h2 className="text-xl font-bold text-gray-800">{heading}</h2>
            </div>
            {showViewAll && viewAllLink && (
                <Link href={viewAllLink} className="flex items-center gap-1 text-primary font-medium hover:underline text-sm">
                    View All <BiChevronRight className="text-lg" />
                </Link>
            )}
        </div>
    );
};

const QuickServices = ({ state, city }: { state: string, city: string }) => {
    const services = [
        { name: 'Doctors,Clinics & Hospitals', desc: 'Book appointments with specialists', icon: <FaUserMd className="text-3xl" />, color: 'from-blue-500 to-blue-600', bgLight: 'bg-blue-50', textColor: 'text-blue-600', link: `/${state}/${city}/best-doctors`, count: '5000+' },
        // { name: 'Clinics & Hospitals', desc: 'Top healthcare facilities near you', icon: <MdLocalHospital className="text-3xl" />, color: 'from-emerald-500 to-emerald-600', bgLight: 'bg-emerald-50', textColor: 'text-emerald-600', link: `/${state}/${city}/hospitals-and-clinics`, count: '1200+' },
        {
            name: 'Physiotherapy',
            desc: 'Expert physiotherapists for recovery',
            icon: <MdVerified className="text-3xl" />,
            color: 'from-teal-500 to-teal-600',
            bgLight: 'bg-teal-50',
            textColor: 'text-teal-600',
            link: `/${state}/${city}/physiotherapy-centers`,
            count: '600+'
        },
        { name: 'Home Caretakers', desc: 'Professional care at your doorstep', icon: <FaHandHoldingMedical className="text-3xl" />, color: 'from-purple-500 to-purple-600', bgLight: 'bg-purple-50', textColor: 'text-purple-600', link: `/${state}/${city}/caretakers`, count: '800+' },
        { name: 'Pet Care', desc: 'Veterinary services for your pets', icon: <FaPaw className="text-3xl" />, color: 'from-orange-500 to-orange-600', bgLight: 'bg-orange-50', textColor: 'text-orange-600', link: `/${state}/${city}/pet-care-clinics`, count: '300+' },
    ];
    return (
        <div className="mb-8">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="px-8 py-6" style={{ background: 'linear-gradient(to right, #22c55e, #10b981, #14b8a6)' }}>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-1">Healthcare Services in {city}</h1>
                            <p className="text-white/90 text-lg">Your one-stop destination for all healthcare needs</p>
                        </div>
                        <div className="ml-auto w-1/3">
                           <HomePageBanner />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
                    {services.map((service, index) => (
                        <Link key={service.name} href={service.link} className={`group relative p-6 hover:bg-gray-50 transition-all duration-300 ${index < services.length - 1 ? 'border-r border-gray-100' : ''}`}>
                            <div className="flex flex-col items-center text-center">
                                <div className={`w-16 h-16 rounded-2xl ${service.bgLight} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <span className={service.textColor}>{service.icon}</span>
                                </div>
                                <h3 className="font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors">{service.name}</h3>
                                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{service.desc}</p>
                                <span className={`inline-flex items-center gap-1 text-xs font-semibold ${service.textColor} bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                                    {service.count} Available
                                </span>
                            </div>
                            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r ${service.color} group-hover:w-full transition-all duration-300 rounded-t-full`}></div>
                        </Link>
                    ))}
                </div>
            </div>
            {/* <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white flex items-center gap-4 hover:shadow-lg hover:shadow-blue-200 transition-all cursor-pointer">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <BiTime className="text-2xl" />
                    </div>
                    <div>
                        <h4 className="font-bold">24/7 Available</h4>
                        <p className="text-sm text-white/80">Round the clock support</p>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-5 text-white flex items-center gap-4 hover:shadow-lg hover:shadow-emerald-200 transition-all cursor-pointer">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <MdVerified className="text-2xl" />
                    </div>
                    <div>
                        <h4 className="font-bold">Verified Professionals</h4>
                        <p className="text-sm text-white/80">100% trusted & certified</p>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white flex items-center gap-4 hover:shadow-lg hover:shadow-purple-200 transition-all cursor-pointer">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <AiFillStar className="text-2xl" />
                    </div>
                    <div>
                        <h4 className="font-bold">Top Rated Services</h4>
                        <p className="text-sm text-white/80">Highly reviewed by users</p>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

const DesktopSpecializations = ({ data, specialist_ids, state, city, town }: { data: Record<number, TSpecility>, specialist_ids: number[], state?: string, city?: string, town?: string }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <SectionHeading heading="Find Doctors by Specialization" showViewAll viewAllLink={alllCategoriesPageLink(state || "", city || "", town || "")} />
            <div className="grid grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {specialist_ids.slice(0, 16).map((specialist_id) => (
                    data[specialist_id] && (
                        <Link key={specialist_id} href={data[specialist_id].seo_url} title={`${data[specialist_id].name} doctors in ${town ? town + ", " : ""}${city}`} className="group flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
                            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-2 group-hover:bg-blue-100 transition-colors">
                                <img src={doctorSpecialityIcon(data[specialist_id].icon)} alt={data[specialist_id].name} className="w-8 h-8" />
                            </div>
                            <span className="text-xs font-medium text-gray-700 text-center leading-tight group-hover:text-primary transition-colors">{data[specialist_id].name}</span>
                        </Link>
                    )
                ))}
            </div>
        </div>
    );
};

const DesktopVerticals = ({ data }: { data: THomePageData['verticals'] }) => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500', 'bg-teal-500'];
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <SectionHeading heading="Explore Healthcare Services" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data && data.map((vertical, i) => (
                    <Link key={vertical.label} href={'/' + vertical.url} className="group flex items-center gap-4 px-4 rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all bg-white">
                        <div className={`text-white p-3 rounded-lg`}>
                            <img src={verticalIcon(vertical.icons)} alt={vertical.label} className="w-12 h-12" />
                        </div>
                        <div className="flex-1">
                            <span className="font-semibold text-gray-800 group-hover:text-primary transition-colors">{vertical.label}</span>
                            <div className="text-xs text-gray-500 flex items-center gap-1">Explore <BiChevronRight /></div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

const DesktopPopularDoctors = ({ data, heading }: { data: TPopularDoctor[], heading?: string }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            {heading && <SectionHeading heading={heading||"Top Doctors Near You"} />}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.slice(0, 6).map((doctor) => (
                    <Link key={doctor.id} href={doctor.seo_url} className="group flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all bg-white">
                        <div className="relative flex-shrink-0">
                            <img src={doctor.image} alt={doctor.name} className="w-20 h-20 rounded-lg object-cover" />
                            {doctor.rating && parseFloat(doctor.rating) > 0 && (
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-green-600 text-white text-xs px-2 py-0.5 rounded">
                                    <span>{doctor.rating}</span>
                                    <AiFillStar className="text-[10px]" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1 mb-1">
                                <h3 className="font-semibold text-gray-800 truncate group-hover:text-primary transition-colors">{doctor.name}</h3>
                                <MdVerified className="text-blue-500 flex-shrink-0" />
                            </div>
                            <p className="text-sm text-gray-500 truncate">{doctor.position}</p>
                            <p className="text-sm text-primary font-medium">{doctor.specialization}</p>
                            <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                                <span className="flex items-center gap-1"><BiClinic className="text-gray-400" />{doctor.clinic}</span>
                            </div>
                            <div className="flex items-center gap-1 mt-1 text-xs text-green-600">
                                <BiTime /><span>Available: {doctor.availability}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

const DesktopPopularClinics = ({ clinics }: { clinics: TPopularClinic[] }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <SectionHeading heading="Popular Clinics & Hospitals" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {clinics.slice(0, 6).map((clinic) => (
                    <Link key={clinic.id} href={clinic.seo_url} className="group p-4 rounded-xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all bg-white">
                        <div className="flex items-start gap-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <FaHospital className="text-blue-600 text-xl" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-800 truncate group-hover:text-primary transition-colors">{clinic.name}</h3>
                                <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                    <BiSolidMap className="text-red-500 flex-shrink-0" />
                                    <span className="truncate">{clinic.locality}, {clinic.city}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                            {clinic.doctor_specializations.slice(0, 3).map((spl) => (
                                <span key={spl} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">{spl}</span>
                            ))}
                            {clinic.total_specialist > 3 && (
                                <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">+{clinic.total_specialist - 3} more</span>
                            )}
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                            <span className="text-xs text-gray-500">{clinic.total_specialist} Specialists</span>
                            <span className="text-xs text-primary font-medium flex items-center gap-1">View Details <BiChevronRight /></span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

const DesktopNearbyCities = ({ data, cityMarkets }: { data: THomePageData['nearbyCities'], cityMarkets: THomePageData['cityMarkets'] }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            {data && data.length > 0 && (
                <div className="mb-6">
                    <SectionHeading heading="Healthcare in Nearby Cities" />
                    <div className="flex flex-wrap gap-3">
                        {data.map((city) => (
                            <Link key={city.city} href={cityPageLink(city.state, city.city)} className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-primary hover:text-white border border-gray-200 hover:border-primary rounded-full transition-all text-sm font-medium text-gray-700">
                                <img src={getCityIcon(city.thumbIcon)} alt={city.city} className="w-5 h-5 rounded-full" />
                                {capitalizeFirstLetter(city.city)}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            {cityMarkets && cityMarkets.length > 0 && (
                <div>
                    <SectionHeading heading="Popular Areas" />
                    <div className="flex flex-wrap gap-2">
                        {cityMarkets.map((market) => (
                            <Link key={market.market_name} href={cityPageLink(market.state, market.city, market.market_name)} className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full text-sm text-gray-600 hover:text-primary transition-colors">
                                {capitalizeFirstLetter(market.market_name || '')}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const DesktopDoctorCategory = ({ data }: { data: THomePageData['doctorCategory'] }) => {
    if (!data) return null;
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <SectionHeading heading="Browse by Category" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.map((category, i) => (
                    <Link key={`doctor-category-${i}`} href={category.url} className="group relative overflow-hidden rounded-xl h-32" style={{ backgroundColor: category.bgColor }}>
                        <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
                            <span className="text-white font-bold text-lg">{category.name}</span>
                            <span className="inline-flex items-center gap-1 bg-white text-gray-800 text-sm px-3 py-1.5 rounded-full w-fit font-medium group-hover:bg-primary group-hover:text-white transition-colors">{category.btnText || 'Explore'} <BiChevronRight /></span>
                        </div>
                        <div className="absolute right-0 top-0 w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: `url(${doctorSpecialityIcon(category.image)})` }} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

const DesktopPetcare = ({ data }: { data: THomePageData['petCareInfo'] }) => {
    if (!data || data.length === 0) return null;
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <SectionHeading heading="Pet Care Services" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.map((item, i) => (
                    <Link key={`petcare-${i}`} href={item.url || '#'} className="group rounded-xl overflow-hidden border border-gray-200 hover:border-primary hover:shadow-lg transition-all">
                        <img src={doctorSpecialityIcon(item.banner)} alt="Pet care" className="w-full h-40 object-cover" />
                    </Link>
                ))}
            </div>
        </div>
    );
};

const DesktopSectionBanners = ({ banners }: { banners: Array<TSectionBanner> }) => {
    return (
        <div className="mb-8">
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

const CityHome = async ({ state, city, town, cookies }: { state: string, city: string, town: string, cookies: any }) => {
    const data = await getCityHomePageData(state, city, town);
    const getSectionDoctors = (doctorIds: number[]) => {
        let doctors: any[] = [];
        if (data?.doctors) {
            for (let i = 0; i < doctorIds.length; i++) {
                if (data.doctors && data.doctors[doctorIds[i].toString()]) {
                    doctors.push(data.doctors[doctorIds[i].toString()]);
                }
            }
        }
        return doctors;
    };
    return (
        <div className="min-h-screen bg-gray-100">
            <PageHeader state={state} city={city} vertical="city-home" />
            <main className="max-w-7xl mx-auto px-4 py-6">
                <QuickServices state={state} city={city} />
                {data && data.sections.map((section, i) => (
                    <div key={`section-${i}-${section.name}`} id={`section-${i}`}>
                        {section.name === "nearby_cities" && data.nearbyCities ? (
                            <DesktopNearbyCities data={data.nearbyCities} cityMarkets={data.cityMarkets || []} />
                        ) : section.name === "specialization" ? (
                            <DesktopSpecializations data={data.specializations} specialist_ids={section.specialist_ids || []} state={state} city={city} town={town} />
                        ) : section.name === "verticals" ? (
                            <DesktopVerticals data={data.verticals} />
                        ) : section.name === "popular_clinic" && data.popularClinics ? (
                            <DesktopPopularClinics clinics={data.popularClinics} />
                        ) : section.name === "popular_doctors" && data.popularDoctors ? (
                            <DesktopPopularDoctors data={data.popularDoctors} heading={section.heading} />
                        ) : section.name === "doctor_category" && data.doctorCategory ? (
                            <DesktopDoctorCategory data={data.doctorCategory} />
                        ) : section.name === "pet_care" && data.petCareInfo ? (
                            <DesktopPetcare data={data.petCareInfo} />
                        ) : section.name === "doctors" && section.doctor_ids && section.doctor_ids.length > 0 && data.doctors ? (
                            <DesktopPopularDoctors data={getSectionDoctors(section.doctor_ids)} heading={section.heading} />
                        ) : section.name === "doctors" && section.specialist_id && data.specialistDoctors && data.specialistDoctors[section.specialist_id.toString()] ? (
                            <DesktopPopularDoctors data={data.specialistDoctors[section.specialist_id.toString()]} heading={section.heading} />
                        ) : section.name === "banners" && section.banners ? (
                             <SectionBanners banners={section.banners} />
                            // <DesktopSectionBanners banners={section.banners} />
                        ) : null}
                    </div>
                ))}
            </main>
            <DesktopFooter state={state} city={city} vertical="city-home">
                <Suspense>
                    <CategoriesFooter heading="Find Doctors By Specialist" state={state} city={city} market_name={town} group_category="DOCTOR" page="DOCTORS" />
                </Suspense>
            </DesktopFooter>
            <SetStateCity state={state} city={city} />
            {cookies[userSecreateKey] && cookies[userinfo] && false && (
                <>
                    <AppointmentReminder position={"section-1"} />
                    <RatingReminder catid={0} doctor_id={0} />
                    <OwnBusinessCard position={"section-1"} cookies={cookies} />
                </>
            )}
        </div>
    );
};

export default CityHome;
