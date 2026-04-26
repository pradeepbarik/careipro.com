import Link from "next/link";
import { BiChevronRight, BiSearch, BiTime, BiPhone, BiSolidStar } from "react-icons/bi";
import { FaMapMarkerAlt, FaShieldAlt } from "react-icons/fa";
import { MdLocalPharmacy, MdDeliveryDining, MdVerified, MdLocalOffer } from "react-icons/md";
import { GiMedicines, GiPill, GiTablet } from "react-icons/gi";
import Header from "../components/mobile/header";
import { AiFillStar } from "react-icons/ai";

// Static Data
const medicineCategories = [
    { id: 1, name: 'Antibiotics', icon: <GiMedicines />, color: 'from-blue-400 to-cyan-500' },
    { id: 2, name: 'Painkillers', icon: <GiPill />, color: 'from-red-400 to-pink-500' },
    { id: 3, name: 'Vitamins', icon: <GiTablet />, color: 'from-amber-400 to-yellow-500' },
    { id: 4, name: 'Diabetes', icon: <MdLocalPharmacy />, color: 'from-green-400 to-emerald-500' },
    { id: 5, name: 'Cold & Cough', icon: <GiMedicines />, color: 'from-purple-400 to-pink-500' },
    { id: 6, name: 'Digestion', icon: <GiPill />, color: 'from-orange-400 to-red-500' },
];

const medicineTypes = [
    { id: 3, name: 'Allopathy', desc: 'Traditional herbal treatments', storeCount: 32, color: 'from-amber-50 to-amber-100', borderColor: 'border-amber-300', textColor: 'text-amber-700', badgeColor: 'bg-amber-500' },
    { id: 1, name: 'Ayurvedic', desc: 'Modern medicine treatments', storeCount: 45, color: 'from-blue-50 to-blue-100', borderColor: 'border-blue-300', textColor: 'text-blue-700', badgeColor: 'bg-blue-500' },
    { id: 2, name: 'Homeopathy', desc: 'Natural remedy treatments', storeCount: 28, color: 'from-green-50 to-green-100', borderColor: 'border-green-300', textColor: 'text-green-700', badgeColor: 'bg-green-500' },
];

const topMedicineStores = [
    { id: 1, name: 'Apollo Pharmacy', location: 'MG Road, Bangalore', rating: 4.9, reviews: 324, image: null, verified: true, deliveryTime: '20-30 min', isOpen: true, recommendedBy: ['Dr. Rahul Sharma', 'Dr. Priya Patel'], coupon: 'APOLLO20', discount: 20 },
    { id: 2, name: 'Medplus Pharmacy', location: 'Indiranagar, Bangalore', rating: 4.7, reviews: 256, image: null, verified: true, deliveryTime: '30-40 min', isOpen: true, recommendedBy: ['Dr. Amit Kumar', 'Dr. Sneha Reddy'], coupon: 'MEDPLUS15', discount: 15 },
    { id: 3, name: 'Jiva Pharmacy', location: 'Koramangala, Bangalore', rating: 4.6, reviews: 189, image: null, verified: true, deliveryTime: '25-35 min', isOpen: false, recommendedBy: ['Dr. Neha Singh', 'Dr. Vikram Patel'], coupon: 'JIVA25', discount: 25 },
];

const featuredMedicines = [
    { id: 1, name: 'Aspirin 500mg', price: 50, originalPrice: 70, discount: 28, rating: 4.8, reviews: 245, image: null },
    { id: 2, name: 'Cough Syrup', price: 85, originalPrice: 120, discount: 29, rating: 4.7, reviews: 156, image: null },
    { id: 3, name: 'Vitamin D3', price: 150, originalPrice: 220, discount: 32, rating: 4.9, reviews: 389, image: null },
    { id: 4, name: 'Multivitamin', price: 200, originalPrice: 280, discount: 28, rating: 4.6, reviews: 278, image: null },
];

// Mobile Hero Section
const MobileHeroSection = () => {
    return (
        <div className="px-4 pt-4 pb-6" style={{ background: 'linear-gradient(135deg, #ff6d07 0%, #9a5a23 50%, #de8f3f 100%)' }}>
            <h1 className="text-2xl font-bold text-white mb-2">
                Order from Local Pharmacy
            </h1>
            {/* Steps */}
            <div className="space-y-3">
                {/* Step 1: Upload Photo */}
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white text-orange-600 flex items-center justify-center font-bold text-lg flex-shrink-0">
                            1
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white font-semibold text-base">Upload Photo</h3>
                            <p className="text-white/80 text-xs mt-0.5">Upload prescription or medicine photo</p>
                        </div>
                    </div>
                </div>

                {/* Step 2: Write Hints */}
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white text-orange-600 flex items-center justify-center font-bold text-lg flex-shrink-0">
                            2
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white font-semibold text-base">Write Hints</h3>
                            <p className="text-white/80 text-xs mt-0.5">Add any special requirements or notes</p>
                        </div>
                    </div>
                </div>

                {/* Step 3: Place Order */}
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white text-orange-600 flex items-center justify-center font-bold text-lg flex-shrink-0">
                            3
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white font-semibold text-base">Place Order</h3>
                            <p className="text-white/80 text-xs mt-0.5">Confirm and get medicines delivered</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Now Button */}
            <button className="w-full mt-5 py-3 bg-white text-orange-600 rounded-lg font-bold text-base hover:bg-gray-50 transition-colors shadow-lg">
                Order Now
            </button>
        </div>
    );
};

// Section Heading
const SectionHeading = ({ heading, viewAllLink }: { heading: string; viewAllLink?: string }) => {
    return (
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
                <div className="w-1 h-5 bg-orange-600 rounded-full"></div>
                <h2 className="text-lg font-bold text-gray-800">{heading}</h2>
            </div>
            {viewAllLink && (
                <Link href={viewAllLink} className="flex items-center gap-1 text-orange-600 font-medium text-xs">
                    View All <BiChevronRight className="text-base" />
                </Link>
            )}
        </div>
    );
};

// Medicine Categories Section
const MedicineCategoriesSection = () => {
    return (
        <div className="px-4 py-5 bg-gray-50">
            <SectionHeading heading="Browse by Category" />
            <div className="grid grid-cols-3 gap-3">
                {medicineCategories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/medicine/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex flex-col items-center"
                    >
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white mb-2 text-2xl`}>
                            {category.icon}
                        </div>
                        <span className="text-xs font-medium text-gray-700 text-center leading-tight">{category.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

// Medicine Types Section
const MedicineTypesSection = () => {
    return (
        <div className="px-4 py-5 bg-white">
            <SectionHeading heading="Medicine Stores Type" viewAllLink="/medicine/types" />
            <div className="space-y-3">
                {medicineTypes.map((type) => (
                    <Link
                        key={type.id}
                        href={`/medicine/type/${type.name.toLowerCase()}`}
                        className={`block p-4 rounded-xl border-2 ${type.borderColor} bg-gradient-to-br ${type.color} hover:shadow-md transition-shadow`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <h3 className={`text-base font-bold ${type.textColor} mb-1`}>
                                    {type.name}
                                </h3>
                                <p className={`text-xs ${type.textColor} opacity-75`}>
                                    {type.desc}
                                </p>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className={`${type.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full mb-1`}>
                                    {type.storeCount}+
                                </span>
                                <span className={`text-xs font-medium ${type.textColor}`}>
                                    Stores
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

// Featured Medicines Section
const FeaturedMedicinesSection = () => {
    return (
        <div className="px-4 py-5 bg-white">
            <SectionHeading heading="Featured Medicines" viewAllLink="/medicine/all" />
            <div className="grid grid-cols-2 gap-3">
                {featuredMedicines.map((medicine) => (
                    <div key={medicine.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 h-24 flex items-center justify-center relative">
                            {medicine.image ? (
                                <img src={medicine.image} alt={medicine.name} className="w-full h-full object-cover" />
                            ) : (
                                <GiTablet className="text-3xl text-blue-400" />
                            )}
                            {medicine.discount > 0 && (
                                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                    {medicine.discount}% OFF
                                </div>
                            )}
                        </div>
                        <div className="p-3">
                            <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1">
                                {medicine.name}
                            </h3>
                            <div className="flex items-center gap-1 mb-2">
                                <AiFillStar className="text-amber-500 text-xs" />
                                <span className="text-xs font-semibold text-gray-700">{medicine.rating}</span>
                                <span className="text-xs text-gray-500">({medicine.reviews})</span>
                            </div>
                            <div className="flex items-baseline gap-1 mb-2">
                                <span className="text-lg font-bold text-blue-600">₹{medicine.price}</span>
                                <span className="text-xs text-gray-400 line-through">₹{medicine.originalPrice}</span>
                            </div>
                            <button className="w-full py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Pharmacy Card
const PharmacyCard = ({ store }: { store: typeof topMedicineStores[0] }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex gap-3 mb-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100 flex-shrink-0">
                    {store.image ? (
                        <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <MdLocalPharmacy className="text-orange-500 text-2xl" />
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-1 mb-1">
                        <h3 className="font-semibold text-gray-800 text-sm leading-tight flex-1">
                            {store.name}
                        </h3>
                        {store.verified && <MdVerified className="text-blue-500 flex-shrink-0 mt-0.5" />}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                        <FaMapMarkerAlt className="text-red-500 flex-shrink-0 text-xs" />
                        <span className="truncate">{store.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="flex items-center gap-0.5 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded">
                            {store.rating} <AiFillStar />
                        </span>
                        <span className="text-xs text-gray-500">({store.reviews})</span>
                    </div>
                </div>
            </div>

            {/* Recommended By Doctors */}
            <div className="mb-3 pb-3 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-600 mb-1.5">Recommended By Doctors</p>
                <div className="flex flex-wrap gap-1.5">
                    {store.recommendedBy.map((doctor, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 bg-orange-50 text-orange-700 rounded-full text-[11px] font-medium border border-orange-200">
                            {doctor}
                        </span>
                    ))}
                </div>
            </div>

            {/* Coupon & Discount Badge */}
            <div className="mb-3 flex items-center justify-between px-3 py-2 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-0.5 bg-orange-500 text-white rounded text-[10px] font-bold">
                        {store.discount}% OFF
                    </span>
                    <span className="text-xs text-gray-700 font-medium">{store.coupon}</span>
                </div>
                <button className="text-[10px] font-semibold text-orange-600 hover:text-orange-700 px-2 py-0.5 rounded bg-white border border-orange-300">
                    Copy
                </button>
            </div>

            <div className="flex items-center gap-2 mb-3 text-xs text-gray-600">
                <MdDeliveryDining className="text-blue-500 text-sm" />
                <span className="font-medium">{store.deliveryTime}</span>
                <span className={store.isOpen ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                    {store.isOpen ? '● Open' : '● Closed'}
                </span>
            </div>

            <button className="w-full py-2 bg-orange-600 text-white rounded-lg text-xs font-medium hover:bg-orange-700 transition-colors">
                Order Now
            </button>
        </div>
    );
};

// Top Pharmacies Section
const TopPharmaciesSection = () => {
    return (
        <div className="px-4 py-5 bg-gray-50">
            <SectionHeading heading="Top Rated Pharmacies" viewAllLink="/medicine/pharmacies" />
            <div className="space-y-3">
                {topMedicineStores.map((store) => (
                    <PharmacyCard key={store.id} store={store} />
                ))}
            </div>
        </div>
    );
};

// Why Choose Us Section
const WhyChooseUsSection = () => {
    const features = [
        { icon: <BiTime className="text-2xl" />, title: 'Fast Delivery', desc: 'Quick & reliable' },
        { icon: <MdLocalOffer className="text-2xl" />, title: 'Best Prices', desc: 'Competitive rates' },
        { icon: <FaShieldAlt className="text-2xl" />, title: 'Verified', desc: 'Licensed stores' },
        { icon: <MdDeliveryDining className="text-2xl" />, title: 'Free Shipping', desc: 'On orders above ₹500' },
    ];

    return (
        <div className="px-4 py-6 bg-gradient-to-br from-blue-600 to-blue-800">
            <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-white mb-1">Why Choose Us?</h3>
                <p className="text-white/80 text-xs">Best pharmacy services in town</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
                {features.map((feature) => (
                    <div key={feature.title} className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
                        <div className="text-white mb-2 flex justify-center">{feature.icon}</div>
                        <h4 className="font-semibold text-white text-sm">{feature.title}</h4>
                        <p className="text-white/70 text-xs mt-1">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Health Tips Section
const HealthTipsSection = () => {
    const tips = [
        { title: 'Check Expiry', desc: 'Always verify dates' },
        { title: 'Proper Storage', desc: 'Cool & dry place' },
        { title: 'Follow Dosage', desc: 'As prescribed' },
        { title: 'Consult Doctor', desc: 'Before buying' },
    ];

    return (
        <div className="px-4 py-5 bg-white">
            <SectionHeading heading="Health Tips" />
            <div className="grid grid-cols-2 gap-3">
                {tips.map((tip) => (
                    <div key={tip.title} className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
                        <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center mb-2 text-lg">
                            <MdLocalPharmacy />
                        </div>
                        <h4 className="font-semibold text-gray-800 text-sm mb-1">{tip.title}</h4>
                        <p className="text-xs text-gray-600">{tip.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Main Mobile Component
const MedicineMobile = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header template='SUBPAGE' heading='Medicine & Health Care Products' />
            <MobileHeroSection />
            {/* <MedicineCategoriesSection /> */}
            <MedicineTypesSection />
            <TopPharmaciesSection />
            {/* <FeaturedMedicinesSection /> */}
            {/* <WhyChooseUsSection /> */}
            {/* <HealthTipsSection /> */}
        </div>
    );
};

export default MedicineMobile;