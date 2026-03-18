import Link from "next/link";
import { BiSolidMap, BiUser, BiSearch, BiPhone, BiEnvelope, BiChevronRight, BiTime } from "react-icons/bi";
import { AiFillCaretDown, AiFillStar } from "react-icons/ai";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPaw, FaDog, FaCat, FaBone, FaHeart } from "react-icons/fa";
import { MdVerified, MdPets, MdVaccines, MdLocalHospital, MdSpa } from "react-icons/md";
import { GiDogHouse, GiCat, GiSittingDog, GiDogBowl } from "react-icons/gi";
import PageHeader from "../components/desktop/header";
import DesktopFooter from "../components/desktop/footer";

// Static Data
const petServices = [
    { id: 1, name: 'Veterinary Care', icon: <MdLocalHospital className="text-2xl" />, desc: 'Medical checkups & treatments', color: 'bg-orange-50 text-orange-600 hover:bg-orange-100' },
    { id: 2, name: 'Pet Grooming', icon: <MdSpa className="text-2xl" />, desc: 'Bath, haircut & styling', color: 'bg-amber-50 text-amber-600 hover:bg-amber-100' },
    { id: 3, name: 'Pet Boarding', icon: <GiDogHouse className="text-2xl" />, desc: 'Safe & comfortable stay', color: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100' },
    { id: 4, name: 'Pet Training', icon: <GiSittingDog className="text-2xl" />, desc: 'Obedience & behavior training', color: 'bg-orange-50 text-orange-600 hover:bg-orange-100' },
    { id: 5, name: 'Vaccination', icon: <MdVaccines className="text-2xl" />, desc: 'Timely vaccination schedules', color: 'bg-red-50 text-red-600 hover:bg-red-100' },
    { id: 6, name: 'Pet Food & Supplies', icon: <GiDogBowl className="text-2xl" />, desc: 'Premium food & accessories', color: 'bg-amber-50 text-amber-600 hover:bg-amber-100' },
];

const petCategories = [
    { id: 1, name: 'Dogs', icon: <FaDog className="text-3xl" />, count: 150, color: 'from-orange-400 to-amber-500' },
    { id: 2, name: 'Cats', icon: <FaCat className="text-3xl" />, count: 85, color: 'from-amber-400 to-yellow-500' },
    { id: 3, name: 'Birds', icon: <FaPaw className="text-3xl" />, count: 45, color: 'from-yellow-400 to-orange-500' },
    { id: 4, name: 'Small Pets', icon: <MdPets className="text-3xl" />, count: 30, color: 'from-orange-500 to-red-500' },
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
    {
        id: 5,
        name: 'The Pet Doctors',
        location: 'JP Nagar, Bangalore',
        rating: 4.9,
        reviews: 298,
        services: ['Specialist Care', 'Surgery', 'Diagnostics'],
        timing: '10:00 AM - 8:00 PM',
        image: null,
        verified: true,
    },
    {
        id: 6,
        name: 'Cuddles Pet Hospital',
        location: 'Marathahalli, Bangalore',
        rating: 4.4,
        reviews: 167,
        services: ['Vaccination', 'Grooming', 'Pet Shop'],
        timing: '9:00 AM - 9:00 PM',
        image: null,
        verified: false,
    },
];

const veterinarians = [
    { id: 1, name: 'Dr. Rahul Sharma', specialization: 'Small Animal Medicine', experience: 12, rating: 4.9, image: null },
    { id: 2, name: 'Dr. Priya Patel', specialization: 'Pet Surgery', experience: 8, rating: 4.8, image: null },
    { id: 3, name: 'Dr. Amit Kumar', specialization: 'Pet Dermatology', experience: 10, rating: 4.7, image: null },
    { id: 4, name: 'Dr. Sneha Reddy', specialization: 'Exotic Animals', experience: 6, rating: 4.6, image: null },
];
// Hero Section
const HeroSection = () => {
    const stats = [
        { label: 'Pet Clinics', value: '300+', icon: <MdLocalHospital className="text-2xl" /> },
        { label: 'Veterinarians', value: '500+', icon: <FaUserMd className="text-2xl" /> },
        { label: 'Happy Pets', value: '50K+', icon: <FaPaw className="text-2xl" /> },
    ];
    return (
        <div className="mb-8">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="px-8 py-8" style={{ background: 'linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fb923c 100%)' }}>
                    <div className="flex items-center justify-between">
                        <div className="max-w-xl">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                                    🐾 Trusted Pet Care Services
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold text-white mb-3">
                                Pet Care Services in Bangalore
                            </h1>
                            <p className="text-white/90 text-lg mb-6">
                                Find the best veterinary clinics, pet groomers, boarding facilities, and expert veterinarians for your furry friends.
                            </p>
                            <div className="flex gap-4">
                                <Link href="#clinics" className="px-6 py-3 bg-white text-orange-600 font-semibold rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2">
                                    <FaPaw /> Find Pet Clinics
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

// Import for FaUserMd
const FaUserMd = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 448 512" width="1em" height="1em">
        <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/>
    </svg>
);

// Section Heading
const SectionHeading = ({ heading, viewAllLink }: { heading: string, viewAllLink?: string }) => {
    return (
        <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
                <h2 className="text-xl font-bold text-gray-800">{heading}</h2>
            </div>
            {viewAllLink && (
                <Link href={viewAllLink} className="flex items-center gap-1 text-orange-600 font-medium hover:underline text-sm">
                    View All <BiChevronRight className="text-lg" />
                </Link>
            )}
        </div>
    );
};

// Pet Categories Section
const PetCategoriesSection = () => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <SectionHeading heading="Browse by Pet Type" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {petCategories.map((category) => (
                    <Link 
                        key={category.id} 
                        href={`/petcare/${category.name.toLowerCase()}`}
                        className="group relative overflow-hidden rounded-2xl p-6 text-white transition-transform hover:scale-105"
                        style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.color}`}></div>
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="mb-3 p-3 bg-white/20 rounded-full backdrop-blur-sm">
                                {category.icon}
                            </div>
                            <h3 className="font-bold text-lg">{category.name}</h3>
                            <p className="text-white/80 text-sm">{category.count}+ Clinics</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

// Services Section
const ServicesSection = () => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <SectionHeading heading="Our Pet Care Services" viewAllLink="/petcare/services" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {petServices.map((service) => (
                    <Link 
                        key={service.id} 
                        href={`/petcare/services/${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="group flex flex-col items-center p-4 rounded-xl transition-all border border-transparent hover:border-gray-200 hover:shadow-md"
                    >
                        <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-3 transition-all group-hover:scale-110`}>
                            {service.icon}
                        </div>
                        <span className="text-sm font-medium text-gray-700 text-center leading-tight group-hover:text-orange-600 transition-colors">
                            {service.name}
                        </span>
                        <span className="text-xs text-gray-500 text-center mt-1">{service.desc}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

// Clinic Card
const ClinicCard = ({ clinic }: { clinic: typeof petClinics[0] }) => {
    return (
        <div className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-orange-500 hover:shadow-lg transition-all">
            <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-orange-100 to-amber-100 flex-shrink-0">
                    {clinic.image ? (
                        <img src={clinic.image} alt={clinic.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <FaPaw className="text-orange-500 text-2xl" />
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-800 truncate group-hover:text-orange-600 transition-colors">
                            {clinic.name}
                        </h3>
                        {clinic.verified && <MdVerified className="text-blue-500 flex-shrink-0" />}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                        <FaMapMarkerAlt className="text-red-500 flex-shrink-0" />
                        <span className="truncate">{clinic.location}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="flex items-center gap-0.5 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded">
                            {clinic.rating} <AiFillStar />
                        </span>
                        <span className="text-xs text-gray-500">({clinic.reviews} reviews)</span>
                    </div>
                </div>
            </div>
            
            <div className="mt-3">
                <div className="flex flex-wrap gap-1.5">
                    {clinic.services.map((service) => (
                        <span key={service} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                            {service}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                <BiTime className="text-orange-500" />
                <span>{clinic.timing}</span>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors text-sm font-medium">
                    <BiPhone /> Call Now
                </button>
                <Link 
                    href={`/petcare/clinic/${clinic.id}`}
                    className="flex-1 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium text-center"
                >
                    Book Visit
                </Link>
            </div>
        </div>
    );
};

// Clinics Section
const ClinicsSection = () => {
    return (
        <div id="clinics" className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <SectionHeading heading="Top Pet Clinics Near You" viewAllLink="/petcare/clinics" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {petClinics.map((clinic) => (
                    <ClinicCard key={clinic.id} clinic={clinic} />
                ))}
            </div>
        </div>
    );
};

// Veterinarian Card
const VeterinarianCard = ({ vet }: { vet: typeof veterinarians[0] }) => {
    return (
        <div className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-orange-500 hover:shadow-lg transition-all">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-orange-100 to-amber-100 flex-shrink-0">
                    {vet.image ? (
                        <img src={vet.image} alt={vet.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <FaUserMd className="text-orange-500 text-xl" />
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate group-hover:text-orange-600 transition-colors">
                        {vet.name}
                    </h3>
                    <p className="text-sm text-gray-500">{vet.specialization}</p>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-600">{vet.experience} yrs exp</span>
                        <span className="flex items-center gap-0.5 text-xs text-amber-600">
                            <AiFillStar /> {vet.rating}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex gap-2 mt-4">
                <button className="flex-1 py-2 border border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors text-sm font-medium">
                    View Profile
                </button>
                <button className="flex-1 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">
                    Consult
                </button>
            </div>
        </div>
    );
};

// Veterinarians Section
const VeterinariansSection = () => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <SectionHeading heading="Expert Veterinarians" viewAllLink="/petcare/veterinarians" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {veterinarians.map((vet) => (
                    <VeterinarianCard key={vet.id} vet={vet} />
                ))}
            </div>
        </div>
    );
};

// Why Choose Us Section
const WhyChooseUsSection = () => {
    const features = [
        { icon: <MdVerified className="text-3xl" />, title: 'Verified Clinics', desc: 'All clinics are verified for quality and safety' },
        { icon: <FaHeart className="text-3xl" />, title: 'Expert Care', desc: 'Experienced veterinarians and pet specialists' },
        { icon: <BiTime className="text-3xl" />, title: '24/7 Support', desc: 'Emergency services available round the clock' },
        { icon: <FaBone className="text-3xl" />, title: 'Complete Services', desc: 'From grooming to surgery, all under one roof' },
    ];
    
    return (
        <div className="rounded-2xl p-6 mb-8" style={{ background: 'linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fbbf24 100%)' }}>
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Why Choose Careipro for Pet Care?</h3>
                <p className="text-white/80">We connect you with the best pet care services</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {features.map((feature) => (
                    <div key={feature.title} className="bg-white/15 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20 hover:bg-white/25 transition-all">
                        <div className="text-white mb-2 flex justify-center">{feature.icon}</div>
                        <h4 className="font-semibold text-white">{feature.title}</h4>
                        <p className="text-white/70 text-sm mt-1">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Pet Care Tips Section
const PetCareTipsSection = () => {
    const tips = [
        { title: 'Regular Checkups', desc: 'Schedule annual vet visits for preventive care', icon: <MdLocalHospital /> },
        { title: 'Balanced Diet', desc: 'Feed your pet age-appropriate, nutritious food', icon: <GiDogBowl /> },
        { title: 'Exercise Daily', desc: 'Keep your pet active with regular exercise', icon: <FaDog /> },
        { title: 'Grooming Routine', desc: 'Maintain hygiene with regular grooming sessions', icon: <MdSpa /> },
    ];
    
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <SectionHeading heading="Pet Care Tips" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {tips.map((tip) => (
                    <div key={tip.title} className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100">
                        <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center mb-3 text-xl">
                            {tip.icon}
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-1">{tip.title}</h4>
                        <p className="text-sm text-gray-600">{tip.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Main Component
const PetcareDesktop = ({ state, city }: { state: string, city: string }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <PageHeader state={state} city={city} vertical="petcare" />
            <main className="max-w-7xl mx-auto px-4 py-6">
                <HeroSection />
                <PetCategoriesSection />
                <ServicesSection />
                <ClinicsSection />
                <VeterinariansSection />
                <WhyChooseUsSection />
                <PetCareTipsSection />
            </main>
            <DesktopFooter state={state} city={city} vertical="petcare" />
        </div>
    );
};

export default PetcareDesktop;