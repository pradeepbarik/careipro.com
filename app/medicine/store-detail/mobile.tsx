import Link from "next/link";
import { BiChevronLeft, BiPhone, BiPhoneCall, BiTime, BiTimeFive, BiMapPin, BiShare, BiDirections, BiCalendarCheck } from "react-icons/bi";
import { FaPrescription } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { storeWhatsappLink, storeDirectionsLink, joinAddress } from "../store-contact";
import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdVerified, MdDeliveryDining, MdLocalOffer, MdLocalPharmacy, MdHandshake, MdShoppingBag } from "react-icons/md";
import { GiTablet } from "react-icons/gi";
import Header from "../../components/mobile/header";
import ShareButton from "@/app/components/client-components/share-button";
import { TclinicDetail } from "@/lib/hooks/useClientSideApiCall";
import StoreImageBannerSection from "./store-banner";
import { StoreOpenStatus, StoreHoursRow } from "./store-open-status";
// Store Data
const storeData = {
    id: 1,
    name: 'Apollo Pharmacy',
    location: 'MG Road, Bangalore',
    address: '#123, MG Road, Indiranagar, Bangalore - 560038',
    rating: 4.9,
    reviews: 324,
    image: null,
    verified: true,
    isOpen: true,
    deliveryTime: '20-30 min',
    minOrder: 100,
    phone: '+91 9876543210',
    hours: { open: '9:00 AM', close: '9:00 PM' },
    recommendedBy: ['Dr. Rahul Sharma', 'Dr. Priya Patel', 'Dr. Amit Kumar'],
    offers: [
        { coupon: 'APOLLO20', discount: 20, minAmount: 500 },
        { coupon: 'FIRSTORDER', discount: 30, minAmount: 1000 },
    ],
};

const availableMedicines = [
    { id: 1, name: 'Aspirin 500mg', price: 50, originalPrice: 70, discount: 28, rating: 4.8, reviews: 245 },
    { id: 2, name: 'Cough Syrup', price: 85, originalPrice: 120, discount: 29, rating: 4.7, reviews: 156 },
    { id: 3, name: 'Vitamin D3', price: 150, originalPrice: 220, discount: 32, rating: 4.9, reviews: 389 },
    { id: 4, name: 'Multivitamin', price: 200, originalPrice: 280, discount: 28, rating: 4.6, reviews: 278 },
    { id: 5, name: 'Paracetamol 500mg', price: 40, originalPrice: 60, discount: 33, rating: 4.7, reviews: 312 },
    { id: 6, name: 'Ibuprofen 400mg', price: 55, originalPrice: 80, discount: 31, rating: 4.8, reviews: 198 },
];

const customerReviews = [
    { id: 1, name: 'Rajesh Kumar', rating: 5, text: 'Excellent service and fast delivery. Highly recommended!', date: '2 days ago' },
    { id: 2, name: 'Priya Singh', rating: 4, text: 'Good quality medicines. Delivery was on time.', date: '5 days ago' },
    { id: 3, name: 'Amit Patel', rating: 5, text: 'Best pharmacy in the area. Staff is very helpful.', date: '1 week ago' },
];

// Store Header Section
const StoreHeaderSection = ({ data }: { data: TclinicDetail }) => {
    const callNumber = data.clinic_info.mobile || data.clinic_info.alt_mob_no;
    const whatsappNumber = data.clinic_info.whatsapp_number || data.clinic_info.mobile;
    return (
        <div className="bg-white sticky top-14 z-40 border-b">
            <div className="p-4">

                {/* Store Info */}
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="text-lg font-bold text-gray-900">{data.clinic_info.name}</div>
                            {data.clinic_info.verified === 1 && <MdVerified className="text-primary flex-shrink-0" title="Verified by Careipro" />}
                        </div>
                        {data.clinic_info.tag_line && (
                            <p className="text-xs text-gray-600 italic mb-1.5 line-clamp-1">{data.clinic_info.tag_line}</p>
                        )}
                        {/* the store's categories (Ayurvedic, Homeopathic...) picked in branch settings,
                            kept small since this header stays pinned while scrolling */}
                        {(data.specializations?.MEDICINESTORE || []).length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-2">
                                {(data.specializations?.MEDICINESTORE || []).map((category) => (
                                    <span key={category.id} className="flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded-full text-[11px] font-semibold border border-primary/20">
                                        <MdLocalPharmacy /> {category.name}
                                    </span>
                                ))}
                            </div>
                        )}
                        {/* <div className="flex items-center gap-1 mb-2">
                            <AiFillStar className="text-amber-500" />
                            <span className="font-bold text-gray-800">{3.6}</span>
                            <span className="text-xs text-gray-500">({3} reviews)</span>
                        </div> */}
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                            <BiMapPin className="text-red-500" />
                            <span>{joinAddress([data.clinic_info.locality, data.clinic_info.location, data.clinic_info.city])}</span>
                        </div>
                    </div>
                </div>

                {/* Status & Info Pills */}
                <div className="flex flex-wrap gap-2 mb-3">
                    <StoreOpenStatus timing={data.timing} />
                    {/* one glance answer here, the times and minimum order are in the Delivery section */}
                    {data.clinic_info.medicine_home_delivery === 1 && (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary flex items-center gap-1">
                            <MdDeliveryDining /> Home Delivery
                        </span>
                    )}
                </div>

                {/* Contact Buttons, the same pair as the store list card. a store without a separate
                    whatsapp number is reached on its main mobile */}
                <div className="flex gap-2">
                    {callNumber && (
                        <a href={`tel:${callNumber}`} className="button grow gap-1.5 fs-14" data-size="small">
                            <BiPhoneCall /> Call Now
                        </a>
                    )}
                    {whatsappNumber && (
                        <a href={storeWhatsappLink(whatsappNumber, data.clinic_info.name)} target="_blank" rel="noopener noreferrer"
                            className="grow flex items-center justify-center gap-1.5 rounded-[.3rem] border font-semibold py-[.3rem] px-2 fs-14"
                            style={{ color: "#15803d", borderColor: "#15803d" }}>
                            <BsWhatsapp /> WhatsApp
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};



// Store Details Section
export const StoreDetailsSection = ({data}:{data: TclinicDetail}) => {
    const address = joinAddress([data.clinic_info.locality, data.clinic_info.location, data.clinic_info.city]);
    /* a year in the future or before 1900 is a typing slip, not worth showing */
    const established = Number(data.clinic_info.established_year);
    const thisYear = new Date().getFullYear();
    const servingYears = established >= 1900 && established <= thisYear ? thisYear - established : null;
    return (
        <div className="px-4 py-5 bg-white border-b">
            <h3 className="text-sm font-bold text-gray-800 mb-3">Store Details</h3>
            <div className="space-y-2.5">
                <StoreHoursRow timing={data.timing} openTime={data.clinic_info.open_time} />
                <div className="flex items-center gap-3">
                    <BiMapPin className="text-red-600 text-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-600">Address</p>
                        <p className="text-sm font-semibold text-gray-800">{address}</p>
                    </div>
                    <a href={storeDirectionsLink({ lat: data.clinic_info.location_lat, lng: data.clinic_info.location_lng, name: data.clinic_info.name, address })}
                        target="_blank" rel="noopener noreferrer"
                        className="flex-shrink-0 flex items-center gap-1 text-xs font-semibold text-primary border border-primary/40 rounded-full px-2.5 py-1.5">
                        <BiDirections className="text-sm" /> Get Directions
                    </a>
                </div>
                <div className="flex items-center gap-3">
                    <BiPhone className="text-green-600 text-lg flex-shrink-0" />
                    <div>
                        <p className="text-xs text-gray-600">Phone</p>
                        <p className="text-sm font-semibold text-gray-800">{data.clinic_info.mobile}</p>
                    </div>
                </div>
                {/* trust details the store fills in branch settings, each shown only when set */}
                {servingYears !== null && (
                    <div className="flex items-center gap-3">
                        <BiCalendarCheck className="text-primary text-lg flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-600">Serving Since</p>
                            <p className="text-sm font-semibold text-gray-800">
                                {data.clinic_info.established_year}
                                {servingYears > 0 && <span className="font-normal text-gray-600"> · {servingYears} {servingYears === 1 ? 'year' : 'years'}</span>}
                            </p>
                        </div>
                    </div>
                )}
                {data.clinic_info.partner_with && (
                    <div className="flex items-center gap-3">
                        <MdHandshake className="text-primary text-lg flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-600">Partnered With</p>
                            <p className="text-sm font-semibold text-gray-800">{data.clinic_info.partner_with}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Prescription Section. sending a photo of the prescription is how most people order from a
// local pharmacy, so it gets its own WhatsApp entry with a message saying just that
export const PrescriptionSection = ({ data }: { data: TclinicDetail }) => {
    const whatsappNumber = data.clinic_info.whatsapp_number || data.clinic_info.mobile;
    if (!whatsappNumber) {
        return null;
    }
    /* a store that delivers is asked to send the order, one that does not is asked whether the
       medicines are in stock, so the person knows before making the trip */
    const homeDelivery = data.clinic_info.medicine_home_delivery === 1;
    return (
        <div className="px-4 py-4 bg-white border-b">
            <a href={storeWhatsappLink(whatsappNumber, data.clinic_info.name, homeDelivery ? "prescription" : "prescription_check")} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl border border-green-200 bg-green-50">
                <span className="w-10 h-10 rounded-full bg-white border border-green-200 flex items-center justify-center flex-shrink-0">
                    <FaPrescription className="text-lg" style={{ color: "#15803d" }} />
                </span>
                <span className="flex-1 min-w-0">
                    <span className="block text-sm font-bold text-gray-900">Have a prescription?</span>
                    <span className="block text-xs text-gray-600">
                        {homeDelivery
                            ? "Send a photo on WhatsApp and the store will get your medicines ready"
                            : "Send a photo on WhatsApp to check the medicines are available before you visit"}
                    </span>
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold flex-shrink-0" style={{ color: "#15803d" }}>
                    <BsWhatsapp className="text-base" /> Send
                </span>
            </a>
        </div>
    );
};

// Delivery Section, everything about getting the medicines home in one place
export const DeliverySection = ({ data }: { data: TclinicDetail }) => {
    const homeDelivery = data.clinic_info.medicine_home_delivery === 1;
    /* a delivery time means nothing when the store does not deliver, some stores have one left
       over after switching home delivery off */
    const times = homeDelivery ? (data.clinic_info.medicine_delivery_time_tag || "").split(",").map((t) => t.trim()).filter(Boolean) : [];
    const minOrder = (data.clinic_info.medicine_min_order_tag || "").trim();
    return (
        <div className="px-4 py-5 bg-white border-b">
            <h3 className="text-sm font-bold text-gray-800 mb-3">Delivery</h3>
            <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                    <MdDeliveryDining className={`text-lg flex-shrink-0 ${homeDelivery ? 'text-primary' : 'text-gray-400'}`} />
                    <div>
                        <p className="text-xs text-gray-600">Home Delivery</p>
                        <p className={`text-sm font-semibold ${homeDelivery ? 'text-green-700' : 'text-gray-800'}`}>
                            {homeDelivery ? 'Available' : 'Not available, pick up from the store'}
                        </p>
                    </div>
                </div>
                {times.length > 0 && (
                    <div className="flex items-center gap-3">
                        <BiTimeFive className="text-primary text-lg flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-600">Delivery Time</p>
                            <p className="text-sm font-semibold text-gray-800">{times.join(" · ")}</p>
                        </div>
                    </div>
                )}
                {minOrder && (
                    <div className="flex items-center gap-3">
                        <MdShoppingBag className="text-primary text-lg flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-600">Minimum Order</p>
                            <p className="text-sm font-semibold text-gray-800">{minOrder}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// About Section, written by the store in branch settings. pre-line keeps the paragraphs it typed
export const AboutStoreSection = ({ about, store_name }: { about: string | null | undefined, store_name: string }) => {
    const text = (about || "").trim();
    if (!text) {
        return null;
    }
    return (
        <div className="px-4 py-5 bg-white border-b">
            <h3 className="text-sm font-bold text-gray-800 mb-2">Summary of {store_name}</h3>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line break-words">{text}</p>
        </div>
    );
};

// Recommended By Doctors Section
export const RecommendedByDoctorsSection = ({doctors}: { doctors: string[] }) => {
    if(doctors.length === 0){
        return null;
    }
    return (
        <div className="px-4 py-5 bg-gray-50 border-b">
            <h3 className="text-sm font-bold text-gray-800 mb-3">Recommended By Doctors</h3>
            <div className="flex flex-wrap gap-2">
                {doctors.map((doctor, index) => (
                    <span key={index} className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold border border-primary/20">
                        {doctor}
                    </span>
                ))}
            </div>
        </div>
    );
};

// Offers Section
const OffersSection = () => {
    return (
        <div className="px-4 py-5 bg-white border-b">
            <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <MdLocalOffer className="text-primary" /> Active Offers
            </h3>
            <div className="space-y-2">
                {storeData.offers.map((offer, index) => (
                    <div key={index} className="p-3 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-600 mb-0.5">Use Code</p>
                            <p className="text-sm font-bold text-primary">{offer.coupon}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-600 mb-0.5">Get</p>
                            <p className="text-lg font-bold text-red-600">{offer.discount}%</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-600 mb-0.5">Min</p>
                            <p className="text-sm font-bold text-gray-800">₹{offer.minAmount}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Available Medicines Section
const AvailableMedicinesSection = () => {
    return (
        <div className="px-4 py-5 bg-gray-50">
            <h3 className="text-sm font-bold text-gray-800 mb-3">Available Medicines</h3>
            <div className="grid grid-cols-2 gap-3">
                {availableMedicines.map((medicine) => (
                    <div key={medicine.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="bg-gradient-to-br from-primary/5 to-primary/10 h-24 flex items-center justify-center relative">
                            <GiTablet className="text-3xl text-primary/70" />
                            {medicine.discount > 0 && (
                                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                                    {medicine.discount}% OFF
                                </div>
                            )}
                        </div>
                        <div className="p-2.5">
                            <h4 className="text-xs font-semibold text-gray-800 line-clamp-2 mb-1">
                                {medicine.name}
                            </h4>
                            <div className="flex items-center gap-0.5 mb-1.5">
                                <AiFillStar className="text-amber-500 text-[10px]" />
                                <span className="text-[10px] font-semibold text-gray-700">{medicine.rating}</span>
                                <span className="text-[10px] text-gray-500">({medicine.reviews})</span>
                            </div>
                            <div className="flex items-baseline gap-1 mb-2">
                                <span className="text-sm font-bold text-primary">₹{medicine.price}</span>
                                <span className="text-[10px] text-gray-400 line-through">₹{medicine.originalPrice}</span>
                            </div>
                            <button className="w-full py-1 bg-primary text-white rounded text-[10px] font-semibold hover:bg-primary/90 transition-colors">
                                Add
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Customer Reviews Section
const CustomerReviewsSection = () => {
    return (
        <div className="px-4 py-5 bg-white border-t">
            <h3 className="text-sm font-bold text-gray-800 mb-3">Customer Reviews</h3>
            <div className="space-y-3">
                {customerReviews.map((review) => (
                    <div key={review.id} className="pb-3 border-b last:border-b-0">
                        <div className="flex items-start justify-between mb-1.5">
                            <p className="font-semibold text-gray-800 text-sm">{review.name}</p>
                            <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-1.5">
                            {[...Array(review.rating)].map((_, i) => (
                                <AiFillStar key={i} className="text-amber-500 text-xs" />
                            ))}
                            {[...Array(5 - review.rating)].map((_, i) => (
                                <AiFillStar key={i} className="text-gray-300 text-xs" />
                            ))}
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{review.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Main Mobile Component
const MedicineStoreDetailMobile = ({ data }: { data: TclinicDetail }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header template='SUBPAGE' heading={data.clinic_info.name+" in "+data.clinic_info.locality+", "+data.clinic_info.city}
                rightContainer={<ShareButton name={data.clinic_info.name} className="w-9 h-9 rounded-full flex items-center justify-center active:bg-gray-100" iconClassName="text-xl text-gray-700" />} />
            <StoreHeaderSection data={data} />
            <PrescriptionSection data={data} />
            <RecommendedByDoctorsSection doctors={data.clinic_info.recommended_doctors?data.clinic_info.recommended_doctors.split(","):[]} />
            <StoreImageBannerSection banners={data.banners} store_name={data.clinic_info.name} />
            <StoreDetailsSection data={data} />
            <DeliverySection data={data} />
            <AboutStoreSection about={data.clinic_info.about_clinic} store_name={data.clinic_info.name} />
            {/* <OffersSection /> */}
            {/* <AvailableMedicinesSection /> */}
            {/* <CustomerReviewsSection /> */}
            <div className="h-20" />
        </div>
    );
};
export default MedicineStoreDetailMobile;