import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { BiSolidMap, BiUser, BiSearch, BiPhone, BiEnvelope, BiChevronRight, BiLogoWhatsapp, BiSolidStar, BiGroup, BiHome, BiClinic } from "react-icons/bi";
import { AiFillCaretDown, AiFillStar } from "react-icons/ai";
import {
    FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaUserMd, FaMapMarkerAlt, FaHandHoldingMedical, FaHeartbeat,
    FaHospital, FaUserNurse, FaHandsHelping, FaTint, FaAmbulance
} from "react-icons/fa";
import { MdVerified, MdSupportAgent } from "react-icons/md";
import { TCaretakersHomePageData, TCaretaker, TCareTakerClinic, getSendEnquiryWhatsappMessage } from "@/lib/hooks/caretaker/useCaretaker";
import { TCategories } from "@/lib/hooks/useCategories";
import { TSectionBanner, TSiteBanner } from "@/lib/types/home-page";
import { doctorSpecialityIcon, doctorProfilePic, clinicProfilePic, clinicBannerImage } from '@/lib/image';
import CategoriesFooter from '../components/mobile/footer/categories';
import ServiceAvailbeCities from '../components/mobile/footer/service-available-cities';
import { BookCaretakerButton, BookNowService, SendEnquiryBtn, CaretakerBookClinicButton } from '@/app/components/mobile/caretaker/booing-caretaker';
import SendEnquiryForm from '@/app/components/mobile/send-enquiry-form';
import SiteBannerSlider from '@/app/components/desktop/site-banner-slider';
import ClinicStories from '@/app/components/desktop/home/clinic-stories';
import { shortVideosAsStories, TShortVideo } from '@/lib/helper/short-video';
import { capitalizeFirstLetter } from '@/lib/helper/format-text';
import { support_no } from '@/constants/site-config';
import {
    PATIENT_CARE_POINTS, PATIENT_CARE_PRICES, PATIENT_CARE_ENQUIRY,
    HOUSE_HELP_SERVICES, COOKING_SLOTS,
    BABY_CARE_PRICES, SENIOR_CARE_PRICES, MASSAGE_PRICES,
    MONTHLY_CARE, MONTHLY_MASSAGE, whatsappEnquiry,
    TPriceTile, TBestValue
} from './services';
/* both halves of the hero stand the same height so neither side letterboxes the other */
const HERO_HEIGHT = "20rem";

/* every kind of provider careipro lists. the card is on the caretaker page for the same reason it is
   on the doctors one: the page is for families hiring, and this is the one way in for the people
   they hire */
const PROVIDER_TYPES = [
    { label: "Clinic & Hospital", icon: FaHospital },
    { label: "Doctor", icon: FaUserMd },
    { label: "Nurse", icon: FaUserNurse },
    { label: "ASHA Worker", icon: FaHandsHelping },
    { label: "Blood Donor", icon: FaTint },
    { label: "Ambulance", icon: FaAmbulance },
];

const JOIN_HREF = "/business-listing/caretaker?utm_source=careipro&utm_medium=caretaker-hero&utm_campaign=join-with-us";

const JoinCard = ({ city }: { city: string }) => (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 h-full flex flex-col min-w-0">
        <h2 className="text-xl font-bold text-gray-900 leading-tight">
            Thank you to every healthcare service provider who helps patients get better sooner.
        </h2>
        <p className="fs-14 text-gray-500 leading-snug mt-1">
            List your service on careipro and reach the families in {capitalizeFirstLetter(city || '')} looking for care every day.
        </p>

        <div className="grid grid-cols-2 gap-2 mt-4">
            {PROVIDER_TYPES.map((provider) => (
                <span
                    key={provider.label}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-2 fs-13 font-semibold text-gray-700 min-w-0"
                >
                    <provider.icon className="text-primary shrink-0" />
                    <span className="truncate">{provider.label}</span>
                </span>
            ))}
        </div>

        <Link href={JOIN_HREF} className="mt-auto pt-4 flex items-center justify-center gap-1.5 fs-14 font-semibold">
            <span className="w-full text-center rounded-lg bg-primary text-white py-2.5 hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5">
                Join with us<BiChevronRight className="text-lg" />
            </span>
        </Link>
    </div>
);

/* The rotation on the left with the join card riding it as the last slide, the short videos on the
   right, half each. Same pairing the city home and the doctors page open with, fed by this page's
   own banners and videos. */
const HeroSection = ({ city, banners, shortVideos }: {
    city: string, banners?: TSiteBanner[], shortVideos?: TShortVideo[]
}) => (
    <div className="grid grid-cols-2 gap-5 items-stretch mb-8">
        <SiteBannerSlider banners={banners || []} height={HERO_HEIGHT} trailingSlide={<JoinCard city={city} />} />
        <div style={{ height: HERO_HEIGHT }}>
            <ClinicStories stories={shortVideosAsStories(shortVideos)} city={capitalizeFirstLetter(city || '')} />
        </div>
    </div>
);

/* ---- the service catalogues, the six sections the page settings actually switch on ---- */

const PriceTiles = ({ tiles }: { tiles: TPriceTile[] }) => (
    <div className={`grid gap-3 ${tiles.length === 4 ? 'grid-cols-4' : 'grid-cols-3'}`}>
        {tiles.map((tile) => (
            <div
                key={tile.label}
                className={`rounded-xl p-4 flex flex-col items-center justify-center text-center border transition-colors ${tile.highlight
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 bg-gray-50'}`}
            >
                <span className="fs-13 font-semibold text-gray-500">{tile.label}</span>
                <span className="text-xl font-bold text-gray-900 mt-0.5">{tile.price}</span>
                {tile.note && <span className="fs-12 text-gray-500 mt-0.5">{tile.note}</span>}
            </div>
        ))}
    </div>
);

const BestValueRow = ({ offer }: { offer: TBestValue }) => (
    <div className="relative mt-3 rounded-xl border border-gray-200 bg-gray-50 p-4 flex items-center justify-between gap-4">
        <span className="absolute -top-2 right-4 fs-12 font-bold text-white bg-gray-800 px-2 py-0.5 rounded-full">💎 Best Value</span>
        <span className="flex items-center gap-3 min-w-0">
            <span className="h-11 w-11 shrink-0 rounded-full bg-gray-800 text-white flex items-center justify-center fs-13 font-bold">{offer.badge}</span>
            <span className="flex flex-col min-w-0">
                <span className="font-semibold text-gray-800">{offer.title}</span>
                <span className="fs-13 text-gray-500">{offer.subtitle}</span>
            </span>
        </span>
        <span className="text-xl font-bold text-gray-900 shrink-0">{offer.price}</span>
    </div>
);

const PatientCareSectionDesktop = ({ heading }: { heading: string }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <SectionHeading heading={heading || "Caretakers for patients in hospital"} />
        {/* the picture and what is included on the left, the rates on the right: on a phone these
            stack, here they read side by side without either half scrolling */}
        <div className="grid grid-cols-[1fr_1.2fr] gap-6 items-center">
            <div className="flex gap-4 min-w-0">
                <span className="h-24 w-24 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden">
                    <img src="/caretaker.png" alt="" className="h-20 w-20 object-contain" />
                </span>
                <div className="min-w-0">
                    <p className="font-semibold text-gray-800 mb-2">Services for patients in hospital</p>
                    <ul className="flex flex-col gap-1.5">
                        {PATIENT_CARE_POINTS.map((point) => (
                            <li key={point} className="flex items-start gap-2 fs-13 text-gray-700">
                                <span className="text-green-600 font-bold shrink-0">✓</span>{point}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div>
                <PriceTiles tiles={PATIENT_CARE_PRICES} />
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={whatsappEnquiry(support_no, PATIENT_CARE_ENQUIRY)}
                    className="mt-3 w-full flex items-center justify-center gap-2 rounded-lg bg-primary text-white font-semibold fs-14 py-2.5 hover:opacity-90 transition-opacity"
                >
                    <BiLogoWhatsapp className="text-lg" />Book Now
                </a>
            </div>
        </div>
    </div>
);

const HouseHelpSectionDesktop = ({ heading }: { heading: string }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <SectionHeading heading={heading} />
        {/* three across rather than the phone's two: the tiles keep their shape and the section does
            not run to three screens of scrolling */}
        <div className="grid grid-cols-3 gap-4">
            {HOUSE_HELP_SERVICES.map((service) => (
                <div key={service.name} className="rounded-xl border border-gray-200 p-4 flex flex-col hover:border-primary/40 hover:shadow-md transition-all">
                    <span className="text-3xl">{service.icon}</span>
                    <span className="font-semibold text-gray-800 mt-2">{service.name}</span>
                    <span className="fs-13 text-gray-500">{service.description}</span>
                    <span className="font-bold text-gray-900 mt-2">{service.price}</span>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={whatsappEnquiry(support_no, service.enquiry)}
                        className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-primary text-white font-semibold fs-13 py-2 hover:opacity-90 transition-opacity"
                    >
                        <BiLogoWhatsapp />Book Now
                    </a>
                </div>
            ))}
        </div>
    </div>
);

const CookingSectionDesktop = ({ heading }: { heading: string }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <SectionHeading heading={heading} />
        <div className="grid grid-cols-3 gap-4">
            {COOKING_SLOTS.map((slot) => (
                <div key={slot.name} className="rounded-xl border border-gray-200 bg-gray-50 p-5 flex flex-col items-center">
                    <span className="text-4xl">{slot.icon}</span>
                    <span className="font-bold text-gray-800 mt-2">{slot.name}</span>
                    <span className="fs-13 text-gray-500">{slot.time}</span>
                </div>
            ))}
        </div>
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={whatsappEnquiry(support_no, "Hi, I need a cook")}
            className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-primary text-white font-semibold fs-14 py-2.5 hover:opacity-90 transition-opacity"
        >
            <BiLogoWhatsapp className="text-lg" />Book a cook
        </a>
    </div>
);

/* baby care, senior care and the massage plan are the same shape: a row of rates and a monthly
   offer under it, so one component draws all three */
const RatePlanSectionDesktop = ({ heading, tiles, offer, enquiry }: {
    heading: string, tiles: TPriceTile[], offer: TBestValue, enquiry: string
}) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <SectionHeading heading={heading} />
        <PriceTiles tiles={tiles} />
        <BestValueRow offer={offer} />
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={whatsappEnquiry(support_no, enquiry)}
            className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-primary text-white font-semibold fs-14 py-2.5 hover:opacity-90 transition-opacity"
        >
            <BiLogoWhatsapp className="text-lg" />Book Now
        </a>
    </div>
);

// Section Heading
const SectionHeading = ({ heading, viewAllLink }: { heading: string, viewAllLink?: string }) => {
    return (
        <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-primary rounded-full"></div>
                <h2 className="text-xl font-bold text-gray-800">{heading}</h2>
            </div>
            {viewAllLink && (
                <Link href={viewAllLink} className="flex items-center gap-1 text-primary font-medium hover:underline text-sm">
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
                                <BiHome className="text-primary text-lg" /> Home Service
                            </span>
                            <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <BiGroup className="text-primary text-lg" /> 40+ Staffs Available
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
                                <BiClinic className="text-primary text-lg" /> Hospital Service
                            </span>
                            <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <BiGroup className="text-primary text-lg" /> 125+ Staffs Available
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
                    <div key={specialist.id} className="group bg-gray-50 rounded-xl p-4 hover:bg-primary/5 transition-all border border-transparent hover:border-primary/20">
                        <div className="flex flex-col items-center text-center">
                            <img 
                                alt={specialist.name} 
                                src={doctorSpecialityIcon(specialist.icon)} 
                                className="w-20 h-20 rounded-full mb-3 group-hover:scale-105 transition-transform"
                            />
                            <h4 className="font-semibold text-gray-800 mb-1 group-hover:text-primary transition-colors">
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
        'bg-primary/5 text-primary hover:bg-primary/10',
        'bg-pink-50 text-pink-600 hover:bg-pink-100',
        'bg-primary/5 text-primary hover:bg-primary/10',
        'bg-primary/5 text-primary hover:bg-primary/10',
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
                        <span className="text-sm font-medium text-gray-700 text-center leading-tight group-hover:text-primary transition-colors">
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
        <Link href={caretaker.seo_url} className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-primary hover:shadow-lg transition-all">
            <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-pink-100">
                        {caretaker.image ? (
                            <img src={doctorProfilePic(caretaker.image)} alt={caretaker.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <FaUserMd className="text-primary text-3xl" />
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
                    <h3 className="font-semibold text-gray-800 truncate group-hover:text-primary transition-colors">
                        {caretaker.name}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">{caretaker.position}</p>
                    <p className="text-sm text-primary font-medium">{caretaker.experience}+ years exp.</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                        {caretaker.specialists.slice(0, 2).map((spec) => (
                            <span key={spec} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                {spec}
                            </span>
                        ))}
                        {caretaker.specialists.length > 2 && (
                            <span className="px-2 py-0.5 bg-primary/5 text-primary rounded text-xs font-medium">
                                +{caretaker.specialists.length - 2}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                <a className="flex-1 flex items-center justify-center gap-2 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors text-sm font-medium">
                    <BiPhone /> Call Now
                </a>
                <button className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-primary transition-colors text-sm font-medium">
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
        <div className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-primary hover:shadow-lg transition-all">
            <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-pink-100 flex-shrink-0">
                    {clinic.logo ? (
                        <img src={clinicProfilePic(clinic.logo)} alt={clinic.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <FaHandHoldingMedical className="text-primary text-2xl" />
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <Link href={clinic.seo_url} className="font-semibold text-gray-800 truncate block group-hover:text-primary transition-colors">
                        {clinic.name}
                    </Link>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                        <FaMapMarkerAlt className="text-red-500 flex-shrink-0" />
                        <span className="truncate">{clinic.locality}, {clinic.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <FaUserMd className="text-primary" />
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
                        <span className="px-2 py-0.5 bg-primary/5 text-primary rounded text-xs font-medium">
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
                            <div key={`staff-${i}`} className="flex items-center gap-2 border border-primary/20 rounded-lg p-2 flex-shrink-0 bg-primary/5/50">
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
                    className="flex-1 flex items-center justify-center gap-2 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors text-sm font-medium"
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
    /* the one band on the page that is not white, so the ask to be called back stands out without
       the page carrying a second theme colour of its own */
    /* the gradient is written out rather than built from the primary and secondary tailwind tokens.
       those resolve to rgb(8, 145, 178 / 1), which mixes the comma and slash forms because
       --rgb-primary-color is comma separated: chrome tolerates that for a plain background-color but
       drops the whole linear-gradient, leaving the band invisible. */
    return (
        <div
            className="rounded-2xl p-6 mb-8"
            style={{ backgroundImage: "linear-gradient(to right, rgb(var(--rgb-primary-color)), rgb(var(--rgb-secondary-color)))" }}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                        <MdSupportAgent className="text-white text-3xl" />
                    </div>
                    <div className="text-white">
                        <h3 className="text-2xl font-bold">Need Help Finding a Caretaker?</h3>
                        <p className="text-white/80">{`We'll find the best caretaker for you at the lowest price`}</p>
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
            <main className="max-w-7xl mx-auto px-4 py-6">
                <HeroSection
                    city={city}
                    banners={pageData.site_banners}
                    shortVideos={pageData.short_videos}
                />
                
                <HelpBanner />

                {pageData.sections.map((section, i) => (
                    <div key={`section-${i}`}>
                        {/* the six types the page settings actually emit. the older names below them
                            are kept because a city whose document still uses them keeps working */}
                        {section.section_type === "patient_caretaker_hourly_services" ? (
                            <PatientCareSectionDesktop heading={section.heading} />
                        ) : section.section_type === "house_help" ? (
                            <HouseHelpSectionDesktop heading={section.heading} />
                        ) : section.section_type === "cooking_help" ? (
                            <CookingSectionDesktop heading={section.heading} />
                        ) : section.section_type === "baby_caretakers" ? (
                            <RatePlanSectionDesktop heading={section.heading} tiles={BABY_CARE_PRICES} offer={MONTHLY_CARE} enquiry="Hi, I need a baby caretaker" />
                        ) : section.section_type === "senior_citizen_caretakers" ? (
                            <RatePlanSectionDesktop heading={section.heading} tiles={SENIOR_CARE_PRICES} offer={MONTHLY_CARE} enquiry="Hi, I need a caretaker for a senior citizen" />
                        ) : section.section_type === "massage_services_senior_citizens" ? (
                            <RatePlanSectionDesktop heading={section.heading} tiles={MASSAGE_PRICES} offer={MONTHLY_MASSAGE} enquiry="Hi, I need a massage service for a senior citizen" />
                        ) : section.section_type === "patient_care" ? (
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

            {/* the band the footer used to wrap, the footer itself is in the layout now */}
            <div className="bg-gray-100 text-gray-800 py-8">
                <div className="max-w-7xl mx-auto px-4">
                <Suspense fallback={<></>}>
                    <ServiceAvailbeCities />
                </Suspense>
                </div>
            </div>
            <SendEnquiryForm state={state} city={city} vertical='CARETAKER' />
        </div>
    );
};

export default CareTakerDesktop;