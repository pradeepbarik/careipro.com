import Link from "next/link";
import { BiChevronRight, BiTime, BiPhone } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { FaPaw, FaDog, FaCat, FaMapMarkerAlt, FaHeart, FaBone } from "react-icons/fa";
import { MdVerified, MdPets, MdVaccines, MdLocalHospital, MdSpa } from "react-icons/md";
import { GiDogHouse, GiSittingDog, GiDogBowl } from "react-icons/gi";
import Header from '@/app/components/mobile/header';

// Static Data
const petServices = [
    { id: 1, name: 'Veterinary Care', icon: <MdLocalHospital className="text-xl" />, desc: 'Medical checkups & treatments', color: 'bg-orange-50 text-orange-600' },
    { id: 2, name: 'Pet Grooming', icon: <MdSpa className="text-xl" />, desc: 'Bath, haircut & styling', color: 'bg-amber-50 text-amber-600' },
    { id: 3, name: 'Pet Boarding', icon: <GiDogHouse className="text-xl" />, desc: 'Safe & comfortable stay', color: 'bg-yellow-50 text-yellow-600' },
    { id: 4, name: 'Pet Training', icon: <GiSittingDog className="text-xl" />, desc: 'Obedience & behavior training', color: 'bg-orange-50 text-orange-600' },
    { id: 5, name: 'Vaccination', icon: <MdVaccines className="text-xl" />, desc: 'Timely vaccination schedules', color: 'bg-red-50 text-red-600' },
    { id: 6, name: 'Pet Food & Supplies', icon: <GiDogBowl className="text-xl" />, desc: 'Premium food & accessories', color: 'bg-amber-50 text-amber-600' },
];

const petCategories = [
    { id: 1, name: 'Dogs', icon: <FaDog className="text-2xl" />, count: 150, color: 'from-orange-400 to-amber-500' },
    { id: 2, name: 'Cats', icon: <FaCat className="text-2xl" />, count: 85, color: 'from-amber-400 to-yellow-500' },
    { id: 3, name: 'Birds', icon: <FaPaw className="text-2xl" />, count: 45, color: 'from-yellow-400 to-orange-500' },
    { id: 4, name: 'Small Pets', icon: <MdPets className="text-2xl" />, count: 30, color: 'from-orange-500 to-red-500' },
];

const petClinics = [
    {
        id: 1,
        name: 'Happy Paws Veterinary Clinic',
        location: 'Koramangala, Bangalore',
        rating: 4.8,
        reviews: 245,
        services: ['Veterinary Care', 'Grooming', 'Vaccination'],
        timing: '9:00 AM - 9:00 PM',
        image: null,
        verified: true,
    },
    {
        id: 2,
        name: 'Pet Paradise Animal Hospital',
        location: 'Indiranagar, Bangalore',
        rating: 4.6,
        reviews: 189,
        services: ['Surgery', 'Dental Care', 'Emergency'],
        timing: '24 Hours',
        image: null,
        verified: true,
    },
    {
        id: 3,
        name: 'Furry Friends Pet Care',
        location: 'HSR Layout, Bangalore',
        rating: 4.7,
        reviews: 156,
        services: ['Grooming', 'Boarding', 'Training'],
        timing: '8:00 AM - 8:00 PM',
        image: null,
        verified: false,
    },
    {
        id: 4,
        name: 'Pawsome Pet Clinic',
        location: 'Whitefield, Bangalore',
        rating: 4.5,
        reviews: 132,
        services: ['Veterinary Care', 'Pet Food', 'Accessories'],
        timing: '9:00 AM - 7:00 PM',
        image: null,
        verified: true,
    },
];

const veterinarians = [
    { id: 1, name: 'Dr. Rahul Sharma', specialization: 'Small Animal Medicine', experience: 12, rating: 4.9, image: null },
    { id: 2, name: 'Dr. Priya Patel', specialization: 'Pet Surgery', experience: 8, rating: 4.8, image: null },
    { id: 3, name: 'Dr. Amit Kumar', specialization: 'Pet Dermatology', experience: 10, rating: 4.7, image: null },
    { id: 4, name: 'Dr. Sneha Reddy', specialization: 'Exotic Animals', experience: 6, rating: 4.6, image: null },
];

const FaUserMd = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 448 512" width="1em" height="1em">
        <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/>
    </svg>
);

// Mobile Hero Section
const MobileHeroSection = () => {
    return (
        <div className="px-4 pt-4 pb-6" style={{ background: 'linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fb923c 100%)' }}>
            <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium flex items-center gap-1">
                    <FaPaw className="text-xs" /> Trusted Pet Care
                </span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
                Pet Care Services in Bangalore
            </h1>
            <p className="text-white/90 text-sm mb-4">
                Find the best veterinary clinics, pet groomers, and expert veterinarians for your furry friends.
            </p>
            <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
                    <div className="text-white mb-1 flex justify-center">
                        <MdLocalHospital className="text-lg" />
                    </div>
                    <div className="text-lg font-bold text-white">300+</div>
                    <div className="text-white/80 text-xs">Pet Clinics</div>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
                    <div className="text-white mb-1 flex justify-center">
                        <FaUserMd className="text-lg" />
                    </div>
                    <div className="text-lg font-bold text-white">500+</div>
                    <div className="text-white/80 text-xs">Veterinarians</div>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
                    <div className="text-white mb-1 flex justify-center">
                        <FaPaw className="text-lg" />
                    </div>
                    <div className="text-lg font-bold text-white">50K+</div>
                    <div className="text-white/80 text-xs">Happy Pets</div>
                </div>
            </div>
        </div>
    );
};

// Mobile Section Heading
const MobileSectionHeading = ({ heading, viewAllLink }: { heading: string, viewAllLink?: string }) => {
    return (
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
                <div className="w-1 h-5 bg-orange-500 rounded-full"></div>
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

// Mobile Pet Categories Section
const MobilePetCategoriesSection = () => {
    return (
        <div className="px-4 py-5 bg-gray-50">
            <MobileSectionHeading heading="Browse by Pet Type" />
            <div className="grid grid-cols-2 gap-3">
                {petCategories.map((category) => (
                    <Link 
                        key={category.id} 
                        href={`/petcare/${category.name.toLowerCase()}`}
                        className="group relative overflow-hidden rounded-xl p-4 text-white"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.color}`}></div>
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="mb-2 p-2 bg-white/20 rounded-full backdrop-blur-sm">
                                {category.icon}
                            </div>
                            <h3 className="font-bold text-base">{category.name}</h3>
                            <p className="text-white/80 text-xs">{category.count}+ Clinics</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

// Mobile Services Section
const MobileServicesSection = () => {
    return (
        <div className="px-4 py-5 bg-white">
            <MobileSectionHeading heading="Our Pet Care Services" viewAllLink="/petcare/services" />
            <div className="grid grid-cols-3 gap-3">
                {petServices.map((service) => (
                    <Link 
                        key={service.id} 
                        href={`/petcare/services/${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex flex-col items-center"
                    >
                        <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-2`}>
                            {service.icon}
                        </div>
                        <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                            {service.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

// Mobile Clinic Card
const MobileClinicCard = ({ clinic }: { clinic: typeof petClinics[0] }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex gap-3 mb-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-orange-100 to-amber-100 flex-shrink-0">
                    {clinic.image ? (
                        <img src={clinic.image} alt={clinic.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <FaPaw className="text-orange-500 text-xl" />
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-1 mb-1">
                        <h3 className="font-semibold text-gray-800 text-sm leading-tight flex-1">
                            {clinic.name}
                        </h3>
                        {clinic.verified && <MdVerified className="text-blue-500 flex-shrink-0 mt-0.5" />}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                        <FaMapMarkerAlt className="text-red-500 flex-shrink-0 text-xs" />
                        <span className="truncate">{clinic.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="flex items-center gap-0.5 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded">
                            {clinic.rating} <AiFillStar />
                        </span>
                        <span className="text-xs text-gray-500">({clinic.reviews})</span>
                    </div>
                </div>
            </div>
            
            <div className="flex flex-wrap gap-1.5 mb-3">
                {clinic.services.slice(0, 3).map((service) => (
                    <span key={service} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                        {service}
                    </span>
                ))}
            </div>

            <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                <BiTime className="text-orange-500" />
                <span>{clinic.timing}</span>
            </div>

            <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1 py-2 border border-orange-500 text-orange-600 rounded-lg text-xs font-medium">
                    <BiPhone /> Call
                </button>
                <Link 
                    href={`/petcare/clinic/${clinic.id}`}
                    className="flex-1 py-2 bg-orange-500 text-white rounded-lg text-xs font-medium text-center"
                >
                    Book Visit
                </Link>
            </div>
        </div>
    );
};

// Mobile Clinics Section
const MobileClinicsSection = () => {
    return (
        <div className="px-4 py-5 bg-gray-50">
            <MobileSectionHeading heading="Top Pet Clinics Near You" viewAllLink="/petcare/clinics" />
            <div className="space-y-3">
                {petClinics.map((clinic) => (
                    <MobileClinicCard key={clinic.id} clinic={clinic} />
                ))}
            </div>
        </div>
    );
};

// Mobile Veterinarian Card
const MobileVeterinarianCard = ({ vet }: { vet: typeof veterinarians[0] }) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-150 shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {/* Top accent bar */}
            <div className="h-1 bg-gradient-to-r from-orange-500 to-amber-500" />
            
            <div className="p-4">
                {/* Top section: Avatar + Info */}
                <div className="flex items-start gap-4 mb-4">
                    <div className="relative flex-shrink-0">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-orange-100 to-amber-100 ring-3 ring-orange-100 flex items-center justify-center">
                            {vet.image ? (
                                <img src={vet.image} alt={vet.name} className="w-full h-full object-cover" />
                            ) : (
                                <FaUserMd className="text-orange-500 text-2xl" />
                            )}
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                            <MdVerified className="text-white text-xs" />
                        </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-base mb-0.5 leading-tight">
                            {vet.name}
                        </h3>
                        <p className="text-xs text-orange-600 font-medium mb-2">{vet.specialization}</p>
                        
                        {/* Stats */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200">
                                <AiFillStar className="text-amber-500 text-sm" />
                                <span className="text-xs font-semibold text-amber-700">{vet.rating}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 font-semibold text-[10px]">
                                    {vet.experience}
                                </span>
                                <span>Years Exp.</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-100 mb-4" />

                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-3">
                    <button className="py-2.5 px-3 rounded-lg border border-orange-300 bg-orange-50 text-orange-700 text-xs font-bold hover:bg-orange-100 transition-colors">
                        View Profile
                    </button>
                    <button className="py-2.5 px-3 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all">
                        Consult Now
                    </button>
                </div>
            </div>
        </div>
    );
};

// Mobile Veterinarians Section
const MobileVeterinariansSection = () => {
    return (
        <div className="px-4 py-5 bg-white">
            <MobileSectionHeading heading="Expert Veterinarians" viewAllLink="/petcare/veterinarians" />
            <div className="space-y-3">
                {veterinarians.map((vet) => (
                    <MobileVeterinarianCard key={vet.id} vet={vet} />
                ))}
            </div>
        </div>
    );
};

// Mobile Why Choose Us Section
const MobileWhyChooseUsSection = () => {
    const features = [
        { icon: <MdVerified className="text-2xl" />, title: 'Verified Clinics', desc: 'Quality & safety guaranteed' },
        { icon: <FaHeart className="text-2xl" />, title: 'Expert Care', desc: 'Experienced specialists' },
        { icon: <BiTime className="text-2xl" />, title: '24/7 Support', desc: 'Emergency services' },
        { icon: <FaBone className="text-2xl" />, title: 'Complete Services', desc: 'All in one place' },
    ];
    
    return (
        <div className="px-4 py-6 bg-gradient-to-br from-orange-500 to-amber-500">
            <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-white mb-1">Why Choose Us?</h3>
                <p className="text-white/80 text-xs">Best pet care services</p>
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

// Mobile Pet Care Tips Section
const MobilePetCareTipsSection = () => {
    const tips = [
        { title: 'Regular Checkups', desc: 'Annual vet visits', icon: <MdLocalHospital /> },
        { title: 'Balanced Diet', desc: 'Nutritious food', icon: <GiDogBowl /> },
        { title: 'Exercise Daily', desc: 'Keep active', icon: <FaDog /> },
        { title: 'Grooming', desc: 'Maintain hygiene', icon: <MdSpa /> },
    ];
    
    return (
        <div className="px-4 py-5 bg-gray-50">
            <MobileSectionHeading heading="Pet Care Tips" />
            <div className="grid grid-cols-2 gap-3">
                {tips.map((tip) => (
                    <div key={tip.title} className="p-3 rounded-xl bg-white border border-orange-100">
                        <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center mb-2 text-lg">
                            {tip.icon}
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
const PetcareMobile = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header template='SUBPAGE' heading='Pet Care Services' />
            <MobileHeroSection />
            <MobilePetCategoriesSection />
            <MobileServicesSection />
            <MobileClinicsSection />
            <MobileVeterinariansSection />
            <MobileWhyChooseUsSection />
            <MobilePetCareTipsSection />
        </div>
    );
}

export default PetcareMobile;