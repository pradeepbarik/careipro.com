import { Suspense } from 'react';
import Link from 'next/link';
import { getCityHomePageData } from '@/lib/hooks/home/useHomePage';
import { BiSolidMap, BiClinic, BiUser, BiSearch, BiPhone, BiEnvelope, BiChevronRight, BiTime } from "react-icons/bi";
import { FiArrowRight } from "react-icons/fi";
import { AiFillCaretDown, AiFillStar } from "react-icons/ai";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaHospital } from "react-icons/fa";
import { MdVerified, MdLocalHospital } from "react-icons/md";
import { doctorSpecialityIcon, verticalIcon, getCityIcon } from '@/lib/image';
import { alllCategoriesPageLink, cityPageLink } from '@/lib/helper/link';
import { capitalizeFirstLetter } from '@/lib/helper/format-text';
import SetStateCity from '../../client-components/set-state-city';
import CategoriesFooter from '../../mobile/footer/categories';
import { userSecreateKey, userinfo } from '@/constants/storage_keys';
import dynamic from 'next/dynamic';
import { THomePageData, TPopularDoctor, TSpecility, TSectionBanner } from '@/lib/types/home-page';
import { shortVideosAsStories } from '@/lib/helper/short-video';
import { TPopularClinic } from '@/lib/types/clinic';
import HeroSection from '../../desktop/home/hero-section';
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

const DesktopSpecializations = ({ data, specialist_ids, state, city, town }: { data: Record<number, TSpecility>, specialist_ids: number[], state?: string, city?: string, town?: string }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <SectionHeading heading="Find Doctors by Specialization" />
            {/* nine specialists and the view all tile fill two rows of five exactly */}
            <div className="grid grid-cols-5 gap-4">
                {specialist_ids.filter((specialist_id) => data[specialist_id]).slice(0, 9).map((specialist_id) => (
                    <Link key={specialist_id} href={data[specialist_id].seo_url} title={`${data[specialist_id].name} doctors in ${town ? town + ", " : ""}${city}`} className="group flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
                        <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-2 group-hover:bg-blue-100 transition-colors">
                            <img src={doctorSpecialityIcon(data[specialist_id].icon)} alt={data[specialist_id].name} className="w-8 h-8" />
                        </div>
                        <span className="text-xs font-medium text-gray-700 text-center leading-tight group-hover:text-primary transition-colors">{data[specialist_id].name}</span>
                    </Link>
                ))}
                {/* the closing tile of the grid, a filled icon so it reads as the action of the
                    row rather than one more speciality sitting next to the tinted ones */}
                <Link href={alllCategoriesPageLink(state || "", city || "", town || "")} title={`All doctor specialists in ${town ? town + ", " : ""}${city}`} className="group flex flex-col items-center justify-center p-3 rounded-lg bg-primary/5 hover:bg-primary/10 hover:border-primary transition-colors">
                    <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform">
                        <FiArrowRight className="text-xl" strokeWidth={2.5} />
                    </div>
                    <span className="text-xs font-semibold text-primary text-center leading-tight">View All</span>
                </Link>
            </div>
        </div>
    );
};

/**
 * The supporting line under a vertical name. The api sends only a label, an icon and a url, so the
 * line is matched here on the url and label together, loosely enough that a change of wording on
 * either does not drop it. A vertical that carries its own description wins over this.
 */
const verticalTagline = (vertical: THomePageData['verticals'][number]) => {
    if (vertical.description) return vertical.description;
    const key = `${vertical.url} ${vertical.label}`.toLowerCase();
    if (key.includes('doctor')) return 'Find & book trusted doctors';
    if (key.includes('caretaker')) return 'Find professional caretakers';
    if (key.includes('physiotherapy')) return 'Home & clinic physiotherapy';
    if (key.includes('nursing') || key.includes('home-care') || key.includes('home care')) return 'Healthcare at your doorstep';
    if (key.includes('pet')) return 'Veterinary care for your pets';
    if (key.includes('medicine') || key.includes('pharmac')) return 'Medicines at your doorstep';
    if (key.includes('lab') || key.includes('test') || key.includes('scan')) return 'Book lab tests & scans';
    if (key.includes('hospital') || key.includes('clinic')) return 'Top hospitals & clinics near you';
    if (key.includes('massage')) return 'Relaxing massage at home';
    if (key.includes('assistant')) return 'A helping hand when you need it';
    return `Explore ${vertical.label.toLowerCase()}`;
};

const DesktopVerticals = ({ data }: { data: THomePageData['verticals'] }) => {
    const verticals = data || [];
    //the row is always one line of five, the first four verticals get a card of their own and
    //whatever is left is stacked into the fifth column rather than wrapping onto a ragged row
    const featured = verticals.slice(0, 4);
    const rest = verticals.slice(4);
    return (
        <div className="bg-primary/5 rounded-xl border bg-white border-gray-200 p-6 mb-8">
            <SectionHeading heading="What healthcare do you need?" />
            <div className={`grid ${rest.length ? 'grid-cols-5' : 'grid-cols-4'} gap-5 items-stretch`}>
                {featured.map((vertical) => (
                    <Link
                        key={vertical.label}
                        href={'/' + vertical.url}
                        title={`${vertical.label} - careipro`}
                        className="group flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                    >
                        <div className="h-28 flex items-center justify-center mb-4">
                            <img src={verticalIcon(vertical.icons)} alt={vertical.label} className="max-h-28 w-auto object-contain" />
                        </div>
                        <h3 className="font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors">{vertical.label}</h3>
                        <p className="fs-13 text-gray-500 mt-1 leading-snug">{verticalTagline(vertical)}</p>
                        {/* the spacing sits on the wrapper, padding on the circle itself would
                            eat into its fixed size and push the arrow off centre */}
                        <div className="mt-auto pt-4">
                            <span className="h-6 w-10 rounded-full bg-primary text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                                <FiArrowRight className="text-lg" strokeWidth={2.5} />
                            </span>
                        </div>
                    </Link>
                ))}
                {rest.length > 0 && (
                    <div className="flex flex-col gap-4">
                        {rest.map((vertical) => (
                            <Link
                                key={vertical.label}
                                href={'/' + vertical.url}
                                title={`${vertical.label} - careipro`}
                                className="group flex-1 min-h-0 flex items-center gap-3 bg-white rounded-2xl border border-gray-200 shadow-sm p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <img src={verticalIcon(vertical.icons)} alt={vertical.label} className="h-14 w-14 object-contain shrink-0" />
                                <div className="min-w-0">
                                    <h3 className="font-bold text-gray-900 fs-14 leading-snug group-hover:text-primary transition-colors">{vertical.label}</h3>
                                    <p className="fs-12 text-gray-500 leading-snug line-clamp-2">{verticalTagline(vertical)}</p>
                                </div>
                                {/* a bare arrow here, the stacked card is too tight for the round button */}
                                <FiArrowRight className="ml-auto text-lg text-primary shrink-0 group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
                            </Link>
                        ))}
                    </div>
                )}
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
            <main className="max-w-7xl mx-auto px-4 py-6">
                <HeroSection city={city} stories={shortVideosAsStories(data?.short_videos)} />
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
                        ) : section.name === "doctor_category" && data.doctorCategory && false ? (
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
            {/* the band the footer used to wrap, the footer itself is in the layout now */}
            <div className="bg-gray-100 text-gray-800 py-8">
                <div className="max-w-7xl mx-auto px-4">
                <Suspense>
                    <CategoriesFooter heading="Find Doctors By Specialist" state={state} city={city} market_name={town} group_category="DOCTOR" page="DOCTORS" />
                </Suspense>
                </div>
            </div>
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
