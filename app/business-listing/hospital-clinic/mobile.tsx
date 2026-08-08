'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiPhone, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { FaHospital, FaHandHoldingMedical, FaPaw, FaUsers, FaChartLine, FaCalendarCheck, FaQuoteLeft } from "react-icons/fa";
import { MdSpa, MdVisibility, MdSupport } from "react-icons/md";
import { BiCheck } from "react-icons/bi";
import Header from "../../components/mobile/header";
import { support_no } from "@/constants/site-config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import { selectAuthSlice } from "@/lib/slices/authSlice";
import useEnquiry from "@/lib/hooks/useEnquiry";

const selectUserInfo = createSelector([selectAuthSlice], (state) => {
    return {
        user_mobile: state.user_info?.mobile || "",
        user_name: state.user_info?.firstname || "",
        cookies: state.cookies
    }
})

// Benefits
const benefits = [
    { icon: <MdVisibility className="text-2xl" />, title: 'Your Own Website & App', desc: 'Get a professional website and mobile application for your clinic with your own branding and domain.' },
    { icon: <FaChartLine className="text-2xl" />, title: 'Lowest Cost', desc: 'Affordable development and maintenance fees. No hidden charges, transparent pricing for all features.' },
    { icon: <BiCheck className="text-2xl" />, title: 'Direct Payments', desc: 'Receive payments from patients directly to your bank account. No middleman, instant settlements.' },
    { icon: <FaUsers className="text-2xl" />, title: 'Full Clinic Management', desc: 'Complete patient management and clinic management software - staff, inventory, billing, and more.' },
    { icon: <FaCalendarCheck className="text-2xl" />, title: 'Online Appointments', desc: 'Let patients book appointments online 24/7. Automated reminders and easy rescheduling.' },
    { icon: <MdSupport className="text-2xl" />, title: 'Reports & Reviews', desc: 'Manage patient reports, track ratings & reviews. Build your reputation with verified feedback.' },
];

// How It Works Steps
const steps = [
    { step: 1, title: 'Register', desc: 'Create your free account with basic details' },
    { step: 2, title: 'Complete Profile', desc: 'Add your services, timings, and photos' },
    { step: 3, title: 'Get Verified', desc: 'Submit documents for verification' },
    { step: 4, title: 'Start Receiving', desc: 'Get patients and grow your business' },
];

// FAQs
const faqs = [
    { q: 'Is the listing really free?', a: 'Yes! Basic listing on Careipro is completely free. We also offer premium plans with additional features like priority listing, advanced analytics, and more.' },
    { q: 'How long does verification take?', a: 'Verification typically takes 24-48 hours. Once you submit your documents, our team will review and verify your listing.' },
    { q: 'Can I edit my listing after creation?', a: 'Absolutely! You can update your listing anytime through your dashboard - change timings, add services, update photos, and more.' },
    { q: 'How do patients find my listing?', a: 'Patients can find you through our website search, mobile app, and we also promote listings through Google and social media.' },
    { q: 'What documents are required for verification?', a: 'For doctors: Medical registration certificate. For clinics: Business registration and relevant licenses. Requirements vary by business type.' },
];

// Business Types
const businessTypes = [
    { id: 'clinic', href: "/business-listing/hospital-clinic", name: 'Clinic / Hospital', icon: <FaHospital className="text-2xl" />, color: 'from-green-500 to-emerald-600', desc: 'List your clinic or hospital' },
    { id: 'caretaker', href: "/business-listing/caretaker", name: 'Caretaker', icon: <FaHandHoldingMedical className="text-2xl" />, color: 'from-purple-500 to-violet-600', desc: 'Offer caretaker services' },
    { id: 'physiotherapy', href: "/business-listing/physiotherapy", name: 'Physiotherapy', icon: <MdSpa className="text-2xl" />, color: 'from-teal-500 to-cyan-600', desc: 'Physiotherapy center listing' },
    { id: 'petcare', href: "/business-listing/petcare", name: 'Pet Care', icon: <FaPaw className="text-2xl" />, color: 'from-orange-500 to-amber-600', desc: 'Veterinary & pet services' },
];

// Reusable section heading
const SectionTitle = ({ badge, title, desc }: { badge?: string, title: React.ReactNode, desc?: string }) => (
    <div className="text-center mb-6">
        {badge && (
            <span className="inline-block px-3 py-1.5 bg-white/70 text-gray-700 rounded-full text-xs font-medium mb-3 border border-gray-200">
                {badge}
            </span>
        )}
        <h2 className="text-xl font-bold text-gray-800 mb-2 leading-snug">{title}</h2>
        {desc && <p className="text-gray-600 text-sm">{desc}</p>}
    </div>
);

// Hero Section
const HeroSection = () => {
    return (
        <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #047857 0%, #10b981 50%, #34d399 100%)' }}>
            <div className="px-4 py-8 relative z-10">
                <span className="inline-block px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium mb-3">
                    🎉 Join 10,000+ Healthcare Providers
                </span>
                <h1 className="text-3xl font-bold text-white mb-3 leading-tight">
                    List Your Business <br />
                    <span className="text-green-200">100% Free</span>
                </h1>
                <p className="text-white/90 text-sm mb-5">
                    Reach millions of patients searching for healthcare services. Create your free listing and start growing your practice today.
                </p>
                <div className="flex flex-col gap-3">
                    <Link href="#register" className="w-full py-3 bg-white text-green-600 font-bold rounded-xl shadow-lg text-center">
                        Start Free Listing
                    </Link>
                    <Link href="#benefits" className="w-full py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 text-center">
                        Learn More
                    </Link>
                </div>

                {/* Stats */}
                {/* <div className="grid grid-cols-4 gap-2 mt-6">
                    {[
                        { value: '1M+', label: 'Visitors' },
                        { value: '50K+', label: 'Bookings' },
                        { value: '100+', label: 'Cities' },
                        { value: '4.8★', label: 'Rating' },
                    ].map((stat, index) => (
                        <div key={index} className="bg-white/15 backdrop-blur-sm rounded-xl py-3 text-center border border-white/20">
                            <div className="text-base font-bold text-white">{stat.value}</div>
                            <div className="text-white/80 text-[10px]">{stat.label}</div>
                        </div>
                    ))}
                </div> */}

                <div className="flex items-center gap-3 mt-5">
                    <div className="flex -space-x-2">
                        {['Dr', 'HC', 'MC', 'PC'].map((label, i) => (
                            <div key={i} className="w-8 h-8 rounded-full bg-white/30 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">
                                {label}
                            </div>
                        ))}
                    </div>
                    <p className="text-white/90 text-xs">
                        <span className="font-bold">10,000+</span> providers trust us
                    </p>
                </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-56 h-56 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>
    );
};

// Comparison Section - Phone vs Online Booking (tabbed on mobile)
const ComparisonSection = () => {
    const [activeTab, setActiveTab] = useState<'phone' | 'online'>('online');

    const phoneBooking = [
        'Patient knows only about one doctor',
        'Limited information about clinic services',
        'No visibility of other specialists',
        'Time-consuming for staff to manage calls',
        'No patient reviews or ratings visible',
        'Missed calls = Missed patients',
        'Manual appointment tracking',
        'No 24/7 availability',
        'If staff leaves, patients lose contact with your clinic',
        'Ex-staff can misguide patients to competitors',
    ];

    const onlineBooking = [
        'Patient discovers all doctors in your clinic',
        'Complete view of all services offered',
        'Patient can compare and choose specialists',
        'Automated booking saves staff time',
        'Ratings & reviews build trust',
        '24/7 booking - Never miss a patient',
        'Automatic reminders & notifications',
        'Patient sees clinic photos & facilities',
        'Patients always connect to your clinic, not staff',
        'No risk of losing patients when staff changes',
        'Post announcements & advertisements to reach patients instantly',
    ];

    return (
        <section className="py-8 px-3 bg-white">
            <SectionTitle
                title={<>Phone Call vs <span className="text-green-600">Online Booking</span></>}
                desc="See how online booking helps patients discover more about your clinic"
            />

            {/* Tabs */}
            <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-xl mb-4">
                <button
                    onClick={() => setActiveTab('phone')}
                    className={`py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'phone' ? 'bg-red-500 text-white shadow' : 'text-gray-600'}`}
                >
                    📞 Phone Call
                </button>
                <button
                    onClick={() => setActiveTab('online')}
                    className={`py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'online' ? 'bg-green-500 text-white shadow' : 'text-gray-600'}`}
                >
                    🌐 Online
                </button>
            </div>

            {activeTab === 'phone' ? (
                <div className="bg-red-50 rounded-2xl p-4 border border-red-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-11 h-11 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                            <BiPhone className="text-2xl text-white" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-gray-800">Phone Call Booking</h3>
                            <p className="text-red-600 text-xs font-medium">Traditional Way</p>
                        </div>
                    </div>
                    <div className="space-y-2.5">
                        {phoneBooking.map((text, index) => (
                            <div key={index} className="flex items-start gap-2">
                                <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-white text-[10px]">✕</span>
                                </div>
                                <p className="text-gray-700 text-sm">{text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 p-3 bg-red-100 rounded-xl">
                        <p className="text-red-700 text-xs font-medium text-center">
                            📞 Patient calls for Dr. A → Books only with Dr. A → Leaves without knowing about Dr. B, C, D...
                        </p>
                    </div>
                </div>
            ) : (
                <div className="bg-green-50 rounded-2xl p-4 border border-green-200 relative">
                    <div className="absolute -top-2.5 right-3 px-3 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded-full">
                        RECOMMENDED
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-11 h-11 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                            <FaCalendarCheck className="text-xl text-white" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-gray-800">Online Booking</h3>
                            <p className="text-green-600 text-xs font-medium">Smart Way with Careipro</p>
                        </div>
                    </div>
                    <div className="space-y-2.5">
                        {onlineBooking.map((text, index) => (
                            <div key={index} className="flex items-start gap-2">
                                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-white text-[10px]">✓</span>
                                </div>
                                <p className="text-gray-700 text-sm">{text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 p-3 bg-green-100 rounded-xl">
                        <p className="text-green-700 text-xs font-medium text-center">
                            🌐 Patient visits clinic page → Sees all doctors, services, reviews → Books with any specialist → Returns for more services!
                        </p>
                    </div>
                </div>
            )}

            {/* Bottom Stats */}
            <div className="mt-5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-4">
                <div className="grid grid-cols-3 gap-2 text-center text-white">
                    <div>
                        <div className="text-2xl font-bold">3x</div>
                        <p className="text-green-100 text-[11px]">More Visibility</p>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">40%</div>
                        <p className="text-green-100 text-[11px]">More Appointments</p>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">24/7</div>
                        <p className="text-green-100 text-[11px]">Availability</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Patient Experience Section
const PatientExperienceSection = () => {
    const challenges = [
        {
            icon: '💊',
            title: 'Medicine Alone Is Not Enough',
            desc: 'Prescribing the right medicine is important, but tracking patient health records and follow-ups is equally crucial for complete care.',
        },
        {
            icon: '⏰',
            title: 'Time Constraints',
            desc: 'Due to busy schedules, doctors often can\'t spend enough time with each patient. But patients still need to be heard and their concerns addressed.',
        },
        {
            icon: '📝',
            title: 'Patient Feedback Matters',
            desc: 'Collecting patient ratings, reviews, and feedback helps you understand what\'s working and what needs improvement in your practice.',
        },
        {
            icon: '👥',
            title: 'Staff Behavior Issues',
            desc: 'Sometimes patients get ignored or misbehaved by staff members. As a clinic owner, you need visibility into these incidents to maintain service quality.',
        },
    ];

    const solutions = [
        { icon: '📋', text: 'Complete patient health history at your fingertips' },
        { icon: '⭐', text: 'Automated feedback collection after every visit' },
        { icon: '💬', text: 'Patient query management system' },
        { icon: '🔔', text: 'Real-time alerts for negative feedback' },
        { icon: '📊', text: 'Staff performance tracking through reviews' },
        { icon: '📱', text: 'Patients can share concerns privately' },
    ];

    return (
        <section className="py-8 px-3 bg-gray-50">
            <SectionTitle
                badge="💡 A Message for Healthcare Providers"
                title="Good Medicine Is Just the Beginning"
                desc="True patient care goes beyond prescriptions. Understanding patient experiences and ensuring quality service at every touchpoint matters."
            />

            {/* Challenges - horizontal scroll */}
            <div className="flex gap-3 overflow-x-auto hide-scroll-bar -mx-3 px-3 pb-2 mb-5">
                {challenges.map((item, index) => (
                    <div key={index} className="bg-white rounded-2xl p-4 border border-gray-200 shrink-0 w-[75%]">
                        <div className="text-3xl mb-2">{item.icon}</div>
                        <h3 className="font-bold text-gray-800 text-sm mb-1.5">{item.title}</h3>
                        <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>

            {/* Solution Box */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5">
                <h3 className="text-lg font-bold text-white mb-2">
                    Careipro Helps You Listen to Your Patients
                </h3>
                <p className="text-blue-100 text-sm mb-4">
                    Our platform gives you complete visibility into patient experiences. Track health records, collect feedback automatically, and address concerns before they become complaints.
                </p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                    {solutions.map((item, index) => (
                        <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                            <span className="text-xl">{item.icon}</span>
                            <p className="text-white text-[11px] mt-1.5 leading-snug">{item.text}</p>
                        </div>
                    ))}
                </div>
                <Link href="#register" className="block w-full py-3 bg-white text-blue-600 font-bold rounded-xl text-center text-sm">
                    Start Listening Today →
                </Link>
            </div>

            {/* Quote */}
            <div className="mt-5 bg-white rounded-2xl p-5 border border-gray-200 text-center">
                <FaQuoteLeft className="text-green-200 text-2xl mb-3 mx-auto" />
                <p className="text-gray-700 text-sm italic mb-3">
                    &quot;A patient may forget what you said, but they will never forget how you made them feel. Every interaction matters - from the receptionist to the doctor.&quot;
                </p>
                <p className="text-green-600 font-semibold text-xs">- Patient-Centric Healthcare</p>
            </div>
        </section>
    );
};

// Benefits Section
const BenefitsSection = () => {
    return (
        <section id="benefits" className="py-8 px-3 bg-white">
            <SectionTitle
                title="Why Join with Careipro?"
                desc="Join thousands of healthcare providers who are growing their practice with us"
            />
            <div className="space-y-3">
                {benefits.map((benefit, index) => (
                    <div key={index} className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex gap-3">
                        <div className="w-11 h-11 rounded-xl bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                            {benefit.icon}
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm mb-1">{benefit.title}</h3>
                            <p className="text-gray-600 text-xs leading-relaxed">{benefit.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

// How It Works Section
const HowItWorksSection = () => {
    return (
        <section className="py-8 px-3 bg-gray-50">
            <SectionTitle title="How It Works" desc="Get started in just 4 simple steps" />
            <div className="relative">
                {/* Vertical connector line */}
                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-green-200"></div>
                <div className="space-y-4">
                    {steps.map((item, index) => (
                        <div key={index} className="flex gap-4 relative">
                            <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center text-lg font-bold flex-shrink-0 z-10 border-4 border-gray-50">
                                {item.step}
                            </div>
                            <div className="bg-white rounded-2xl p-4 border border-gray-200 flex-1">
                                <h3 className="font-bold text-gray-800 text-sm mb-1">{item.title}</h3>
                                <p className="text-gray-600 text-xs">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Digital Prescription Section
const DigitalPrescriptionSection = () => {
    const [activeScreen, setActiveScreen] = useState<'list' | 'track'>('list');

    const medicines = [
        { name: 'Paracetamol 500mg', dosage: '1 tablet', timing: 'After Breakfast', days: '5 days' },
        { name: 'Azithromycin 250mg', dosage: '1 tablet', timing: 'After Lunch', days: '3 days' },
        { name: 'Cetirizine 10mg', dosage: '1 tablet', timing: 'Before Sleep', days: '7 days' },
    ];

    const medicineLog = [
        { date: '18 Mar', day: 'Mon', morning: true, afternoon: true, night: true },
        { date: '17 Mar', day: 'Sun', morning: true, afternoon: true, night: true },
        { date: '16 Mar', day: 'Sat', morning: true, afternoon: false, night: true },
        { date: '15 Mar', day: 'Fri', morning: true, afternoon: true, night: false },
        { date: '14 Mar', day: 'Thu', morning: true, afternoon: true, night: true },
    ];

    return (
        <section className="py-8 px-3 bg-gradient-to-br from-blue-50 to-indigo-50">
            <SectionTitle
                badge="📱 Digital Prescription & Medicine Tracking"
                title={<>No More Confusion with <span className="text-blue-600">Handwritten Prescriptions</span></>}
                desc="Patients can see clear medicine instructions and track their daily intake with date-wise logs."
            />

            {/* Screen switcher */}
            <div className="grid grid-cols-2 gap-2 bg-white/70 p-1 rounded-xl mb-4 border border-blue-100">
                <button
                    onClick={() => setActiveScreen('list')}
                    className={`py-2.5 rounded-lg text-xs font-semibold transition-all ${activeScreen === 'list' ? 'bg-blue-600 text-white shadow' : 'text-gray-600'}`}
                >
                    📋 Medicine List
                </button>
                <button
                    onClick={() => setActiveScreen('track')}
                    className={`py-2.5 rounded-lg text-xs font-semibold transition-all ${activeScreen === 'track' ? 'bg-green-600 text-white shadow' : 'text-gray-600'}`}
                >
                    ✓ Track Intake
                </button>
            </div>

            {/* Phone Mockup */}
            <div className="mx-auto w-full max-w-[300px]">
                <div className="bg-gray-900 rounded-[2.5rem] p-2.5 shadow-2xl relative">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-gray-900 rounded-b-2xl z-10"></div>

                    <div className="bg-white rounded-[2rem] overflow-hidden">
                        {activeScreen === 'list' ? (
                            <>
                                {/* Status Bar */}
                                <div className="bg-blue-600 px-5 py-3 pt-7">
                                    <div className="flex items-center justify-between text-white text-[10px] mb-1.5">
                                        <span>9:41</span>
                                        <div className="flex items-center gap-1">
                                            <span>📶</span>
                                            <span>🔋</span>
                                        </div>
                                    </div>
                                    <h3 className="text-white font-bold text-base">My Prescription</h3>
                                    <p className="text-blue-100 text-xs">Dr. Sharma • 18 Mar 2026</p>
                                </div>

                                {/* Medicine List */}
                                <div className="p-3 space-y-2.5 bg-gray-50">
                                    {medicines.map((med, index) => (
                                        <div key={index} className="bg-white rounded-xl p-2.5 shadow-sm border border-gray-100">
                                            <div className="flex items-start gap-2.5">
                                                <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-lg">💊</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-gray-800 text-xs truncate">{med.name}</h4>
                                                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                                        <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-[10px]">{med.dosage}</span>
                                                        <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded text-[10px]">{med.timing}</span>
                                                    </div>
                                                    <p className="text-gray-500 text-[10px] mt-0.5">Duration: {med.days}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Instructions */}
                                    <div className="bg-yellow-50 rounded-xl p-2.5 border border-yellow-200">
                                        <div className="flex items-start gap-2">
                                            <span className="text-base">⚠️</span>
                                            <div>
                                                <h4 className="font-semibold text-yellow-800 text-xs">Doctor&apos;s Instructions</h4>
                                                <p className="text-yellow-700 text-[10px] mt-0.5">Drink plenty of water. Avoid spicy food.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Navigation */}
                                <div className="bg-white border-t border-gray-200 px-3 py-2 flex justify-around">
                                    <div className="text-center">
                                        <span className="text-base">🏠</span>
                                        <p className="text-[9px] text-gray-500">Home</p>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-base">💊</span>
                                        <p className="text-[9px] text-blue-600 font-semibold">Medicines</p>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-base">📅</span>
                                        <p className="text-[9px] text-gray-500">Appointments</p>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-base">👤</span>
                                        <p className="text-[9px] text-gray-500">Profile</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Status Bar */}
                                <div className="bg-green-600 px-5 py-3 pt-7">
                                    <div className="flex items-center justify-between text-white text-[10px] mb-1.5">
                                        <span>9:42</span>
                                        <div className="flex items-center gap-1">
                                            <span>📶</span>
                                            <span>🔋</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-white text-base">←</span>
                                        <div>
                                            <h3 className="text-white font-bold text-base">Paracetamol 500mg</h3>
                                            <p className="text-green-100 text-xs">Track your daily intake</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Medicine Info */}
                                <div className="p-3 bg-gray-50">
                                    <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 mb-3">
                                        <div className="flex items-center justify-between mb-2.5">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                                                    <span className="text-xl">💊</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-800 text-sm">1 tablet</h4>
                                                    <p className="text-green-600 text-xs font-medium">After Breakfast</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] text-gray-500">Progress</p>
                                                <p className="font-bold text-green-600 text-sm">4/5 days</p>
                                            </div>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                                        </div>
                                    </div>

                                    {/* Date-wise Log */}
                                    <h4 className="font-semibold text-gray-700 text-xs mb-2">📅 Daily Intake Log</h4>
                                    <div className="space-y-1.5">
                                        {medicineLog.map((log, index) => (
                                            <div key={index} className="bg-white rounded-lg p-2.5 flex items-center justify-between border border-gray-100">
                                                <div className="text-center">
                                                    <p className="text-[10px] text-gray-500">{log.day}</p>
                                                    <p className="font-bold text-gray-800 text-xs">{log.date}</p>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${log.morning ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                                        {log.morning ? '✓' : '○'}
                                                    </div>
                                                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${log.afternoon ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                                        {log.afternoon ? '✓' : '○'}
                                                    </div>
                                                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${log.night ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                                        {log.night ? '✓' : '○'}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Mark Today Button */}
                                    <button className="w-full mt-3 py-2.5 bg-green-500 text-white text-sm font-bold rounded-xl">
                                        ✓ Mark as Taken Today
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="text-center mt-4">
                {activeScreen === 'list' ? (
                    <>
                        <h4 className="font-bold text-gray-800 text-sm mb-0.5">📋 Clear Medicine List</h4>
                        <p className="text-gray-600 text-xs">Switch to &quot;Track Intake&quot; to see the log view</p>
                    </>
                ) : (
                    <>
                        <h4 className="font-bold text-gray-800 text-sm mb-0.5">✓ Track Medicine Intake</h4>
                        <p className="text-gray-600 text-xs">Mark tick with date when taken</p>
                    </>
                )}
            </div>

            {/* Features */}
            <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                    { icon: '📖', title: 'Clear Instructions', desc: 'Easy to read medicine names' },
                    { icon: '✅', title: 'Track Intake', desc: 'Mark when medicine taken' },
                    { icon: '📅', title: 'Date-wise Log', desc: 'Complete history with dates' },
                    { icon: '🔔', title: 'Reminders', desc: 'Never miss a dose' },
                ].map((item, index) => (
                    <div key={index} className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
                        <div className="text-2xl mb-1">{item.icon}</div>
                        <h4 className="font-semibold text-gray-800 text-xs">{item.title}</h4>
                        <p className="text-gray-500 text-[10px] mt-0.5">{item.desc}</p>
                    </div>
                ))}
            </div>

            {/* Bottom Stats */}
            <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
                    <div className="text-xl font-bold text-blue-600">95%</div>
                    <p className="text-gray-600 text-[10px] leading-snug">Prefer digital prescriptions</p>
                </div>
                <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
                    <div className="text-xl font-bold text-green-600">0%</div>
                    <p className="text-gray-600 text-[10px] leading-snug">Confusion in dosage</p>
                </div>
                <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
                    <div className="text-xl font-bold text-purple-600">100%</div>
                    <p className="text-gray-600 text-[10px] leading-snug">Clear instructions</p>
                </div>
            </div>
        </section>
    );
};

// Digital Marketing Section
const DigitalMarketingSection = () => {
    const marketingFeatures = [
        { icon: '🌐', title: 'Google My Business Setup', desc: 'We create and optimize your Google Business Profile so patients can find you easily on Google Search and Maps.', highlight: 'Google Maps' },
        { icon: '📱', title: 'Social Media Marketing', desc: 'Professional Facebook & Instagram pages with regular health posts, patient testimonials, and promotional content.', highlight: 'Facebook & Instagram' },
        { icon: '🎯', title: 'Targeted Ads', desc: 'Run Google Ads and Meta Ads targeted to patients searching for healthcare services in your area.', highlight: 'Google & Meta Ads' },
        { icon: '📝', title: 'Content Creation', desc: 'Health tips, doctor profiles, service highlights - we create engaging content that attracts patients.', highlight: 'Posts & Reels' },
        { icon: '⭐', title: 'Review Management', desc: 'Collect positive reviews from satisfied patients and professionally respond to feedback on all platforms.', highlight: '5-Star Reputation' },
        { icon: '📊', title: 'Analytics & Reports', desc: 'Track your online performance - website visits, appointment bookings, ad performance, and ROI reports.', highlight: 'Monthly Reports' },
    ];

    const platforms = [
        { name: 'Google', icon: '🔍', color: 'bg-red-100 text-red-600' },
        { name: 'Facebook', icon: '📘', color: 'bg-blue-100 text-blue-600' },
        { name: 'Instagram', icon: '📸', color: 'bg-pink-100 text-pink-600' },
        { name: 'YouTube', icon: '▶️', color: 'bg-red-100 text-red-600' },
        { name: 'WhatsApp', icon: '💬', color: 'bg-green-100 text-green-600' },
    ];

    return (
        <section className="py-8 px-3 bg-gradient-to-br from-purple-50 to-pink-50">
            <SectionTitle
                badge="📣 Digital Marketing Support"
                title={<>We Help You Reach More Patients <span className="text-purple-600">Online</span></>}
                desc="Careipro handles everything - from Google listing to social media ads - so you can focus on treating patients."
            />

            {/* Platform Icons */}
            <div className="flex flex-wrap justify-center gap-2 mb-5">
                {platforms.map((platform, index) => (
                    <div key={index} className={`${platform.color} px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-medium`}>
                        <span className="text-sm">{platform.icon}</span>
                        {platform.name}
                    </div>
                ))}
            </div>

            {/* Marketing Features */}
            <div className="space-y-3 mb-5">
                {marketingFeatures.map((feature, index) => (
                    <div key={index} className="bg-white rounded-2xl p-4 border border-gray-200">
                        <div className="flex items-start justify-between mb-2">
                            <div className="text-3xl">{feature.icon}</div>
                            <span className="px-2.5 py-1 bg-purple-100 text-purple-600 text-[10px] font-medium rounded-full">
                                {feature.highlight}
                            </span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-sm mb-1">{feature.title}</h3>
                        <p className="text-gray-600 text-xs leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </div>

            {/* Before vs After */}
            <div className="space-y-4 mb-5">
                <div className="bg-gray-100 rounded-2xl p-4 border border-gray-300">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center flex-shrink-0">
                            <span className="text-xl">😟</span>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-700">Without Digital Marketing</h3>
                            <p className="text-gray-500 text-[11px]">Traditional Approach</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {[
                            'Patients don\'t find you on Google',
                            'No social media presence',
                            'Competitors rank above you',
                            'Low patient trust (no reviews)',
                            'Losing patients to tech-savvy clinics',
                        ].map((text, index) => (
                            <div key={index} className="flex items-start gap-2 text-gray-600 text-xs">
                                <span className="text-red-500">✕</span>
                                <span>{text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-purple-100 rounded-2xl p-4 border border-purple-300 relative">
                    <div className="absolute -top-2.5 right-3 px-3 py-0.5 bg-purple-600 text-white text-[10px] font-bold rounded-full">
                        WITH CAREIPRO
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-xl">🚀</span>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-800">With Careipro Marketing</h3>
                            <p className="text-purple-600 text-[11px] font-medium">Complete Digital Presence</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {[
                            'Top rankings on Google Maps & Search',
                            'Active Facebook & Instagram profiles',
                            'Targeted ads reaching nearby patients',
                            '5-star reviews building trust',
                            'More appointments, more revenue',
                        ].map((text, index) => (
                            <div key={index} className="flex items-start gap-2 text-gray-700 text-xs">
                                <span className="text-green-500 font-bold">✓</span>
                                <span>{text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-4">
                <div className="grid grid-cols-2 gap-4 text-center text-white">
                    <div>
                        <div className="text-2xl font-bold">80%</div>
                        <p className="text-purple-100 text-[11px] leading-snug">Patients search online before visiting</p>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">3x</div>
                        <p className="text-purple-100 text-[11px] leading-snug">More inquiries with digital presence</p>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">90%</div>
                        <p className="text-purple-100 text-[11px] leading-snug">Trust clinics with good reviews</p>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">₹0</div>
                        <p className="text-purple-100 text-[11px] leading-snug">Setup cost with Careipro plans</p>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="mt-5 text-center">
                <h3 className="text-base font-bold text-gray-800 mb-2">Don&apos;t Have Time for Marketing?</h3>
                <p className="text-gray-600 text-sm mb-4">
                    Focus on your patients while we handle your online presence.
                </p>
                <Link href="#register" className="block w-full py-3 bg-purple-600 text-white font-bold rounded-xl shadow-lg text-sm">
                    Get Started with Digital Marketing →
                </Link>
            </div>
        </section>
    );
};

// Request Demo Section
const RequestDemoSection = () => {
    const { user_mobile, user_name, cookies } = useSelector((state: RootState) => selectUserInfo(state));
    const { sendEnquiry } = useEnquiry({
        state: cookies["state"] || "odisha",
        city: cookies["city"] || "bhadrak",
        market_name: "",
        vaertical: "register_clinic"
    });
    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        clinicName: '',
        location: ''
    });

    useEffect(() => {
        if (user_mobile) {
            setFormData((prev) => ({ ...prev, name: prev.name || user_name, contactNumber: prev.contactNumber || user_mobile }))
        }
    }, [user_mobile, user_name]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const contactNumber = formData.contactNumber.trim();
        if (contactNumber.length !== 10) {
            toast.error("Please enter 10 digit contact no");
            return;
        }
        if (!formData.clinicName.trim()) {
            toast.error("Please enter your clinic / doctor name");
            return;
        }
        if (!formData.location.trim()) {
            toast.error("Please enter your clinic location");
            return;
        }
        sendEnquiry({
            name: formData.name.trim(),
            mobile: contactNumber,
            message: `Requested a free demo. Clinic/Doctor name is <b>${formData.clinicName.trim()}</b>, location is <b>${formData.location.trim()}</b>`,
            clinic_id: 0,
            doctor_id: 0,
            specialist_id: 0,
            page: "business_listing_hospital_clinic",
            section: "request_demo"
        }, () => {
            toast.success("Thank you! Our team will contact you soon for the demo.");
            setFormData({ name: '', contactNumber: '', clinicName: '', location: '' });
        }, { showSuccessAlert: false });
    };

    return (
        <section id="register" className="py-8 px-3 bg-gradient-to-br from-green-600 to-emerald-700 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-56 h-56 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
                <div className="text-white mb-5">
                    <span className="inline-block px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium mb-3">
                        🎯 Free Demo Available
                    </span>
                    <h2 className="text-xl font-bold mb-2 leading-snug">
                        See How Careipro Can Transform Your Clinic
                    </h2>
                    <p className="text-green-100 text-sm mb-4">
                        Request a free demo and our team will show you how Careipro can help you manage patients, appointments, digital prescriptions, and grow your practice online.
                    </p>
                    <div className="space-y-3">
                        {[
                            { icon: '📞', title: 'Personalized Demo Call', desc: '30-minute walkthrough of all features' },
                            { icon: '💻', title: 'Live Product Demo', desc: 'See real-time features in action' },
                            { icon: '🎁', title: 'No Commitment Required', desc: '100% free, no obligations' },
                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                    <span className="text-lg">{item.icon}</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">{item.title}</p>
                                    <p className="text-green-100 text-xs">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white rounded-2xl p-5 shadow-2xl">
                    <div className="text-center mb-4">
                        <h3 className="text-lg font-bold text-gray-800 mb-1">Request a Free Demo</h3>
                        <p className="text-gray-600 text-xs">Fill in your details and we&apos;ll get back to you within 24 hours</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                Your Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                Contact Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                placeholder="Enter your mobile number"
                                required
                                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                Clinic / Doctor Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="clinicName"
                                value={formData.clinicName}
                                onChange={handleChange}
                                placeholder="Enter clinic or doctor name"
                                required
                                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                Clinic Location <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="City, State (e.g., Mumbai, Maharashtra)"
                                required
                                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg"
                        >
                            🚀 Request for Demo
                        </button>
                    </form>

                    <p className="text-center text-gray-500 text-[11px] mt-3">
                        By submitting, you agree to our <Link href="/privacy-policy" className="text-green-600 underline">Privacy Policy</Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

// FAQ Section
const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-8 px-3 bg-gray-50">
            <SectionTitle title="Frequently Asked Questions" desc="Everything you need to know about listing on Careipro" />
            <div className="space-y-3">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full px-4 py-3 flex items-center justify-between gap-2 text-left"
                        >
                            <span className="font-semibold text-gray-800 text-sm">{faq.q}</span>
                            {openIndex === index ? (
                                <BiChevronUp className="text-xl text-green-500 flex-shrink-0" />
                            ) : (
                                <BiChevronDown className="text-xl text-gray-400 flex-shrink-0" />
                            )}
                        </button>
                        {openIndex === index && (
                            <div className="px-4 pb-3 text-gray-600 text-xs leading-relaxed">
                                {faq.a}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

// CTA Section
const CTASection = () => {
    return (
        <section className="py-8 px-4 text-center" style={{ background: 'linear-gradient(135deg, #047857 0%, #10b981 50%, #34d399 100%)' }}>
            <h2 className="text-xl font-bold text-white mb-2">Ready to Grow Your Practice?</h2>
            <p className="text-white/90 text-sm mb-5">Join thousands of healthcare providers on Careipro. It&apos;s free, fast, and easy.</p>
            <div className="flex flex-col gap-3">
                <Link href="#register" className="w-full py-3 bg-white text-green-600 font-bold rounded-xl shadow-lg text-center">
                    Get Started Free
                </Link>
                <Link href="/contact-us" className="w-full py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 flex items-center justify-center gap-2">
                    <BiPhone /> Contact Us
                </Link>
            </div>
        </section>
    );
};

// Business Types Section
const BusinessTypesSection = ({ referer }: { referer: string }) => {
    return (
        <section className="py-8 px-3 bg-gray-50">
            <SectionTitle title="Choose Your Business Type" desc="Select the category that best describes your healthcare business" />
            <div className="grid grid-cols-2 gap-3">
                {businessTypes.map((type) => (
                    <Link
                        key={type.id}
                        href={`${type.href}?ref=${referer}`}
                        className="bg-white rounded-2xl p-4 border border-gray-200 text-center"
                    >
                        <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${type.color} flex items-center justify-center text-white mb-3`}>
                            {type.icon}
                        </div>
                        <h3 className="font-bold text-gray-800 text-xs mb-1">{type.name}</h3>
                        <p className="text-[11px] text-gray-500 leading-snug">{type.desc}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
};

// Sticky bottom CTA
const StickyCTA = () => {
    return (
        <div className="fixed bottom-0 left-0 w-full z-30 bg-white border-t border-gray-200 px-3 py-2.5 flex gap-2 shadow-[0_-2px_10px_rgba(0,0,0,0.08)]">
            <a href={`tel:${support_no}`} className="w-12 h-12 rounded-xl border border-green-500 text-green-600 flex items-center justify-center flex-shrink-0">
                <BiPhone className="text-xl" />
            </a>
            <Link href="#register" className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl text-center text-sm">
                Request Free Demo
            </Link>
        </div>
    );
};

// Main Component
const BusinessListingMobile = () => {
    return (
        <>
            <Header heading="Register Your Clinic or Hospital" template="SUBPAGE" />
            <HeroSection />
            <ComparisonSection />
            <PatientExperienceSection />
            <BenefitsSection />
            <HowItWorksSection />
            <DigitalPrescriptionSection />
            <DigitalMarketingSection />
            <RequestDemoSection />
            <FAQSection />
            <CTASection />
            <BusinessTypesSection referer="hospital-clinic" />
            {/* Spacer so sticky CTA doesn't overlap last section */}
            <div className="h-20"></div>
            <StickyCTA />
        </>
    );
};

export default BusinessListingMobile;
