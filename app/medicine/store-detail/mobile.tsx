import Link from "next/link";
import { BiChevronLeft, BiPhone, BiTime, BiMapPin, BiShare } from "react-icons/bi";
import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdVerified, MdDeliveryDining, MdLocalOffer, MdLocalPharmacy } from "react-icons/md";
import { GiTablet } from "react-icons/gi";
import Header from "../../components/mobile/header";
import { TclinicDetail } from "@/lib/hooks/useClientSideApiCall";
import StoreImageBannerSection from "./store-banner";
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
    return (
        <div className="bg-white sticky top-14 z-40 border-b">
            <div className="p-4">

                {/* Store Info */}
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h1 className="text-lg font-bold text-gray-900">{data.clinic_info.name}</h1>
                            {data.clinic_info.status==="verified" && <MdVerified className="text-orange-500" />}
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                            <AiFillStar className="text-amber-500" />
                            <span className="font-bold text-gray-800">{3.6}</span>
                            <span className="text-xs text-gray-500">({3} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                            <BiMapPin className="text-red-500" />
                            <span>{data.clinic_info.locality}, {data.clinic_info.location}, {data.clinic_info.city}</span>
                        </div>
                    </div>
                    <button className="text-2xl text-gray-400">
                        <AiOutlineHeart />
                    </button>
                </div>

                {/* Status & Info Pills */}
                <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${1==1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {1==1 ? '● Open' : '● Closed'}
                    </span>
                    {data.clinic_info.medicine_delivery_time_tag ?data.clinic_info.medicine_delivery_time_tag.split(",").map((tag,index)=>(
                        <span key={index} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 flex items-center gap-1">
                            <MdDeliveryDining /> {tag}
                        </span>
                    )) : null}
                    {data.clinic_info.medicine_min_order_tag ? (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-100 text-orange-700">
                            {data.clinic_info.medicine_min_order_tag}
                        </span>
                    ) : null}
                </div>

                {/* Contact Buttons */}
                <div className="flex gap-2">
                    <a href={`tel:${data.clinic_info.mobile}`} className="flex-1 py-2 border border-orange-600 text-orange-600 rounded-lg text-xs font-semibold flex items-center justify-center gap-2">
                        <BiPhone /> Call
                    </a>
                    <button className="flex-1 py-2 bg-orange-600 text-white rounded-lg text-xs font-semibold">
                        Order Now
                    </button>
                </div>
            </div>
        </div>
    );
};



// Store Details Section
const StoreDetailsSection = ({data}:{data: TclinicDetail}) => {
    return (
        <div className="px-4 py-5 bg-white border-b">
            <h3 className="text-sm font-bold text-gray-800 mb-3">Store Details</h3>
            <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                    <BiTime className="text-orange-600 text-lg flex-shrink-0" />
                    <div>
                        <p className="text-xs text-gray-600">Working Hours</p>
                        <p className="text-sm font-semibold text-gray-800">{data.clinic_info.open_time}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <BiMapPin className="text-red-600 text-lg flex-shrink-0" />
                    <div>
                        <p className="text-xs text-gray-600">Address</p>
                        <p className="text-sm font-semibold text-gray-800">{data.clinic_info.locality}, {data.clinic_info.location}, {data.clinic_info.city}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <BiPhone className="text-green-600 text-lg flex-shrink-0" />
                    <div>
                        <p className="text-xs text-gray-600">Phone</p>
                        <p className="text-sm font-semibold text-gray-800">{data.clinic_info.mobile}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Recommended By Doctors Section
const RecommendedByDoctorsSection = ({doctors}: { doctors: string[] }) => {
    if(doctors.length === 0){
        return null;
    }
    return (
        <div className="px-4 py-5 bg-gray-50 border-b">
            <h3 className="text-sm font-bold text-gray-800 mb-3">Recommended By Doctors</h3>
            <div className="flex flex-wrap gap-2">
                {doctors.map((doctor, index) => (
                    <span key={index} className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold border border-orange-200">
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
                <MdLocalOffer className="text-orange-600" /> Active Offers
            </h3>
            <div className="space-y-2">
                {storeData.offers.map((offer, index) => (
                    <div key={index} className="p-3 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-600 mb-0.5">Use Code</p>
                            <p className="text-sm font-bold text-orange-600">{offer.coupon}</p>
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
                        <div className="bg-gradient-to-br from-orange-50 to-amber-50 h-24 flex items-center justify-center relative">
                            <GiTablet className="text-3xl text-orange-400" />
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
                                <span className="text-sm font-bold text-orange-600">₹{medicine.price}</span>
                                <span className="text-[10px] text-gray-400 line-through">₹{medicine.originalPrice}</span>
                            </div>
                            <button className="w-full py-1 bg-orange-600 text-white rounded text-[10px] font-semibold hover:bg-orange-700 transition-colors">
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
            <Header template='SUBPAGE' heading={data.clinic_info.name} />
            <StoreHeaderSection data={data} />
            <StoreImageBannerSection banners={data.banners} store_name={data.clinic_info.name} />
            <StoreDetailsSection data={data} />
            <RecommendedByDoctorsSection doctors={data.clinic_info.recommended_doctors?data.clinic_info.recommended_doctors.split(","):[]} />
            <OffersSection />
            <AvailableMedicinesSection />
            <CustomerReviewsSection />
            <div className="h-20" />
        </div>
    );
};
export default MedicineStoreDetailMobile;