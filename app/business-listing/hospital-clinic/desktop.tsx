'use client';
import Link from "next/link";
import { BiCheck, BiPhone, BiEnvelope, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { FaUserMd, FaHospital, FaHandHoldingMedical, FaPaw, FaUsers, FaChartLine, FaCalendarCheck, FaStar, FaQuoteLeft } from "react-icons/fa";
import { MdSpa, MdVerified, MdVisibility, MdSupport } from "react-icons/md";
import { useState } from "react";
import DesktopFooter from "../../components/desktop/footer";
import PageHeader from "../../components/desktop/header";
import BusinessTypesSection from "../components/business-type-section";

// Benefits
const benefits = [
    { icon: <MdVisibility className="text-3xl" />, title: 'Your Own Website & App', desc: 'Get a professional website and mobile application for your clinic with your own branding and domain.' },
    { icon: <FaChartLine className="text-3xl" />, title: 'Lowest Cost', desc: 'Affordable development and maintenance fees. No hidden charges, transparent pricing for all features.' },
    { icon: <BiCheck className="text-3xl" />, title: 'Direct Payments', desc: 'Receive payments from patients directly to your bank account. No middleman, instant settlements.' },
    { icon: <FaUsers className="text-3xl" />, title: 'Full Clinic Management', desc: 'Complete patient management and clinic management software - staff, inventory, billing, and more.' },
    { icon: <FaCalendarCheck className="text-3xl" />, title: 'Online Appointments', desc: 'Let patients book appointments online 24/7. Automated reminders and easy rescheduling.' },
    { icon: <MdSupport className="text-3xl" />, title: 'Reports & Reviews', desc: 'Manage patient reports, track ratings & reviews. Build your reputation with verified feedback.' },
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

// Testimonials
const testimonials = [
    { name: 'Dr. Rajesh Kumar', role: 'Cardiologist, Delhi', text: 'Careipro has helped me reach more patients than ever. The appointment system is seamless and saves me hours every week.', rating: 5 },
    { name: 'City Care Hospital', role: 'Multi-specialty Hospital, Mumbai', text: 'We saw a 40% increase in patient inquiries within the first month of listing. Highly recommended for healthcare providers.', rating: 5 },
    { name: 'Dr. Priya Sharma', role: 'Pediatrician, Bangalore', text: 'The verified badge really builds trust. Parents feel confident booking appointments for their children through my Careipro profile.', rating: 5 },
];

// Hero Section
const HeroSection = () => {
    return (
        <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #047857 0%, #10b981 50%, #34d399 100%)' }}>
            <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1 text-center lg:text-left">
                        <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-4">
                            🎉 Join 10,000+ Healthcare Providers
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            List Your Business <br />
                            <span className="text-green-200">100% Free</span>
                        </h1>
                        <p className="text-xl text-white/90 mb-8 max-w-xl">
                            Reach millions of patients searching for healthcare services. Create your free listing and start growing your practice today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="#register" className="px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg text-lg">
                                Start Free Listing
                            </Link>
                            <Link href="#benefits" className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all border border-white/30 text-lg">
                                Learn More
                            </Link>
                        </div>
                        <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full bg-white/30 border-2 border-white flex items-center justify-center text-white text-sm font-bold">
                                        {['Dr', 'HC', 'MC', 'PC'][i - 1]}
                                    </div>
                                ))}
                            </div>
                            <p className="text-white/90 text-sm">
                                <span className="font-bold">10,000+</span> healthcare providers trust us
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 hidden lg:block">
                        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/20 rounded-2xl p-6 text-center">
                                    <div className="text-4xl font-bold text-white">1M+</div>
                                    <div className="text-white/80 text-sm">Monthly Visitors</div>
                                </div>
                                <div className="bg-white/20 rounded-2xl p-6 text-center">
                                    <div className="text-4xl font-bold text-white">50K+</div>
                                    <div className="text-white/80 text-sm">Appointments</div>
                                </div>
                                <div className="bg-white/20 rounded-2xl p-6 text-center">
                                    <div className="text-4xl font-bold text-white">100+</div>
                                    <div className="text-white/80 text-sm">Cities</div>
                                </div>
                                <div className="bg-white/20 rounded-2xl p-6 text-center">
                                    <div className="text-4xl font-bold text-white">4.8★</div>
                                    <div className="text-white/80 text-sm">User Rating</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>
    );
};

// Digital Prescription Section
const DigitalPrescriptionSection = () => {
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
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
                        📱 Digital Prescription & Medicine Tracking
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        No More Confusion with <span className="text-blue-600">Handwritten Prescriptions</span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                        Many patients struggle to read doctor&apos;s handwriting and forget to take medicines on time. With Careipro, patients can see clear medicine instructions and track their daily intake with date-wise logs.
                    </p>
                </div>

                {/* Two Phone Mockups */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start relative">

                    {/* Phone 1 - Medicine List */}
                    <div className="flex flex-col items-center">
                        <div className="relative w-72 md:w-80 mb-6">
                            {/* Phone Outer Frame */}
                            <div className="bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                                {/* Phone Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-2xl z-10"></div>

                                {/* Phone Screen */}
                                <div className="bg-white rounded-[2.5rem] overflow-hidden">
                                    {/* Status Bar */}
                                    <div className="bg-blue-600 px-6 py-3 pt-8">
                                        <div className="flex items-center justify-between text-white text-xs mb-2">
                                            <span>9:41</span>
                                            <div className="flex items-center gap-1">
                                                <span>📶</span>
                                                <span>🔋</span>
                                            </div>
                                        </div>
                                        <h3 className="text-white font-bold text-lg">My Prescription</h3>
                                        <p className="text-blue-100 text-sm">Dr. Sharma • 18 Mar 2026</p>
                                    </div>

                                    {/* Medicine List */}
                                    <div className="p-4 space-y-3 bg-gray-50">
                                        {medicines.map((med, index) => (
                                            <div key={index} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 relative group cursor-pointer hover:border-blue-300 transition-all">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                        <span className="text-xl">💊</span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-semibold text-gray-800 text-sm truncate">{med.name}</h4>
                                                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                                                            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">{med.dosage}</span>
                                                            <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs">{med.timing}</span>
                                                        </div>
                                                        <p className="text-gray-500 text-xs mt-1">Duration: {med.days}</p>
                                                    </div>
                                                    <div className="text-blue-500 text-lg">→</div>
                                                </div>
                                                {index === 0 && (
                                                    <div className="absolute -right-2 -top-2 px-2 py-1 bg-blue-500 text-white text-xs rounded-full animate-pulse">
                                                        Tap to track
                                                    </div>
                                                )}
                                            </div>
                                        ))}

                                        {/* Instructions */}
                                        <div className="bg-yellow-50 rounded-xl p-3 border border-yellow-200">
                                            <div className="flex items-start gap-2">
                                                <span className="text-lg">⚠️</span>
                                                <div>
                                                    <h4 className="font-semibold text-yellow-800 text-sm">Doctor&apos;s Instructions</h4>
                                                    <p className="text-yellow-700 text-xs mt-1">Drink plenty of water. Avoid spicy food.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Navigation */}
                                    <div className="bg-white border-t border-gray-200 px-4 py-3 flex justify-around">
                                        <div className="text-center">
                                            <span className="text-xl">🏠</span>
                                            <p className="text-xs text-gray-500">Home</p>
                                        </div>
                                        <div className="text-center">
                                            <span className="text-xl">💊</span>
                                            <p className="text-xs text-blue-600 font-semibold">Medicines</p>
                                        </div>
                                        <div className="text-center">
                                            <span className="text-xl">📅</span>
                                            <p className="text-xs text-gray-500">Appointments</p>
                                        </div>
                                        <div className="text-center">
                                            <span className="text-xl">👤</span>
                                            <p className="text-xs text-gray-500">Profile</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <h4 className="font-bold text-gray-800 text-lg mb-1">📋 Clear Medicine List</h4>
                            <p className="text-gray-600 text-sm">Tap on any medicine to track intake</p>
                        </div>
                    </div>

                    {/* Arrow between phones - Desktop only */}
                    <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                        <div className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2">
                            Tap Medicine <span className="text-xl">→</span>
                        </div>
                    </div>

                    {/* Phone 2 - Medicine Tracking Log */}
                    <div className="flex flex-col items-center">
                        <div className="relative w-72 md:w-80 mb-6">
                            {/* Phone Outer Frame */}
                            <div className="bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                                {/* Phone Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-2xl z-10"></div>

                                {/* Phone Screen */}
                                <div className="bg-white rounded-[2.5rem] overflow-hidden">
                                    {/* Status Bar */}
                                    <div className="bg-green-600 px-6 py-3 pt-8">
                                        <div className="flex items-center justify-between text-white text-xs mb-2">
                                            <span>9:42</span>
                                            <div className="flex items-center gap-1">
                                                <span>📶</span>
                                                <span>🔋</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-white text-lg">←</span>
                                            <div>
                                                <h3 className="text-white font-bold text-lg">Paracetamol 500mg</h3>
                                                <p className="text-green-100 text-sm">Track your daily intake</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Medicine Info */}
                                    <div className="p-4 bg-gray-50">
                                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                                                        <span className="text-2xl">💊</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-800">1 tablet</h4>
                                                        <p className="text-green-600 text-sm font-medium">After Breakfast</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs text-gray-500">Progress</p>
                                                    <p className="font-bold text-green-600">4/5 days</p>
                                                </div>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                                            </div>
                                        </div>

                                        {/* Date-wise Log */}
                                        <h4 className="font-semibold text-gray-700 text-sm mb-3">📅 Daily Intake Log</h4>
                                        <div className="space-y-2">
                                            {medicineLog.map((log, index) => (
                                                <div key={index} className="bg-white rounded-lg p-3 flex items-center justify-between border border-gray-100">
                                                    <div className="flex items-center gap-3">
                                                        <div className="text-center">
                                                            <p className="text-xs text-gray-500">{log.day}</p>
                                                            <p className="font-bold text-gray-800 text-sm">{log.date}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${log.morning ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                                            {log.morning ? '✓' : '○'}
                                                        </div>
                                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${log.afternoon ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                                            {log.afternoon ? '✓' : '○'}
                                                        </div>
                                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${log.night ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                                            {log.night ? '✓' : '○'}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Mark Today Button */}
                                        <button className="w-full mt-4 py-3 bg-green-500 text-white font-bold rounded-xl flex items-center justify-center gap-2">
                                            ✓ Mark as Taken Today
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Happy Patient Avatar */}
                            <div className="absolute -right-16 top-1/3 hidden lg:block">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-200 to-emerald-200 border-4 border-white shadow-xl flex items-center justify-center">
                                    <span className="text-4xl">😊</span>
                                </div>
                                <div className="mt-2 text-center">
                                    <p className="text-xs font-semibold text-gray-700">Never miss</p>
                                    <p className="text-xs text-gray-500">a dose!</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <h4 className="font-bold text-gray-800 text-lg mb-1">✓ Track Medicine Intake</h4>
                            <p className="text-gray-600 text-sm">Mark tick with date when taken</p>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-4 text-center shadow-md border border-gray-100">
                        <div className="text-3xl mb-2">📖</div>
                        <h4 className="font-semibold text-gray-800">Clear Instructions</h4>
                        <p className="text-gray-500 text-sm">Easy to read medicine names</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center shadow-md border border-gray-100">
                        <div className="text-3xl mb-2">✅</div>
                        <h4 className="font-semibold text-gray-800">Track Intake</h4>
                        <p className="text-gray-500 text-sm">Mark when medicine taken</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center shadow-md border border-gray-100">
                        <div className="text-3xl mb-2">📅</div>
                        <h4 className="font-semibold text-gray-800">Date-wise Log</h4>
                        <p className="text-gray-500 text-sm">Complete history with dates</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center shadow-md border border-gray-100">
                        <div className="text-3xl mb-2">🔔</div>
                        <h4 className="font-semibold text-gray-800">Reminders</h4>
                        <p className="text-gray-500 text-sm">Never miss a dose</p>
                    </div>
                </div>

                {/* Bottom Stats */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
                        <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
                        <p className="text-gray-600">Patients prefer digital prescriptions</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
                        <div className="text-4xl font-bold text-green-600 mb-2">0%</div>
                        <p className="text-gray-600">Confusion in medicine dosage</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
                        <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
                        <p className="text-gray-600">Clear & readable instructions</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Benefits Section
const BenefitsSection = () => {
    return (
        <section id="benefits" className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Join with Careipro?</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">Join thousands of healthcare providers who are growing their practice with us</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:bg-green-50 hover:border-green-200 border border-transparent transition-all">
                            <div className="w-14 h-14 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-4">
                                {benefit.icon}
                            </div>
                            <h3 className="font-bold text-gray-800 text-lg mb-2">{benefit.title}</h3>
                            <p className="text-gray-600">{benefit.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// How It Works Section
const HowItWorksSection = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">Get started in just 4 simple steps</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((item, index) => (
                        <div key={index} className="relative">
                            <div className="bg-white rounded-2xl p-6 text-center border border-gray-200 hover:shadow-lg transition-all">
                                <div className="w-16 h-16 mx-auto rounded-full bg-green-500 text-white flex items-center justify-center text-2xl font-bold mb-4">
                                    {item.step}
                                </div>
                                <h3 className="font-bold text-gray-800 text-lg mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.desc}</p>
                            </div>
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-green-300 text-4xl">
                                    →
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Testimonials Section
const TestimonialsSection = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Partners Say</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">Hear from healthcare providers who have grown their practice with Careipro</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <div key={index} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                            <FaQuoteLeft className="text-green-200 text-3xl mb-4" />
                            <p className="text-gray-700 mb-4 italic">&quot;{item.text}&quot;</p>
                            <div className="flex items-center gap-1 mb-3">
                                {[...Array(item.rating)].map((_, i) => (
                                    <FaStar key={i} className="text-yellow-400" />
                                ))}
                            </div>
                            <div className="font-bold text-gray-800">{item.name}</div>
                            <div className="text-sm text-gray-500">{item.role}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// FAQ Section
const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-3xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-600 text-lg">Everything you need to know about listing on Careipro</p>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-semibold text-gray-800">{faq.q}</span>
                                {openIndex === index ? (
                                    <BiChevronUp className="text-2xl text-green-500" />
                                ) : (
                                    <BiChevronDown className="text-2xl text-gray-400" />
                                )}
                            </button>
                            {openIndex === index && (
                                <div className="px-6 pb-4 text-gray-600">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Comparison Section - Phone vs Online Booking
const ComparisonSection = () => {
    const phoneBooking = [
        { text: 'Patient knows only about one doctor', negative: true },
        { text: 'Limited information about clinic services', negative: true },
        { text: 'No visibility of other specialists', negative: true },
        { text: 'Time-consuming for staff to manage calls', negative: true },
        { text: 'No patient reviews or ratings visible', negative: true },
        { text: 'Missed calls = Missed patients', negative: true },
        { text: 'Manual appointment tracking', negative: true },
        { text: 'No 24/7 availability', negative: true },
        { text: 'If staff leaves, patients lose contact with your clinic', negative: true },
        { text: 'Ex-staff can misguide patients to competitors', negative: true },
    ];

    const onlineBooking = [
        { text: 'Patient discovers all doctors in your clinic', positive: true },
        { text: 'Complete view of all services offered', positive: true },
        { text: 'Patient can compare and choose specialists', positive: true },
        { text: 'Automated booking saves staff time', positive: true },
        { text: 'Ratings & reviews build trust', positive: true },
        { text: '24/7 booking - Never miss a patient', positive: true },
        { text: 'Automatic reminders & notifications', positive: true },
        { text: 'Patient sees clinic photos & facilities', positive: true },
        { text: 'Patients always connect to your clinic, not staff', positive: true },
        { text: 'No risk of losing patients when staff changes', positive: true },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Phone Call vs Online Appointment Booking</h2>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto">See how online booking helps patients discover more about your clinic and increases your patient reach</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Phone Call Booking */}
                    <div className="bg-red-50 rounded-2xl p-8 border-2 border-red-200">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center">
                                <BiPhone className="text-3xl text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800">Phone Call Booking</h3>
                                <p className="text-red-600 font-medium">Traditional Way</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {phoneBooking.map((item, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-white text-sm">✕</span>
                                    </div>
                                    <p className="text-gray-700">{item.text}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 p-4 bg-red-100 rounded-xl">
                            <p className="text-red-700 font-medium text-center">
                                📞 Patient calls for Dr. A → Books only with Dr. A → Leaves without knowing about Dr. B, C, D...
                            </p>
                        </div>
                    </div>

                    {/* Online Booking */}
                    <div className="bg-green-50 rounded-2xl p-8 border-2 border-green-200 relative">
                        <div className="absolute -top-4 right-4 px-4 py-1 bg-green-500 text-white text-sm font-bold rounded-full">
                            RECOMMENDED
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                                <FaCalendarCheck className="text-2xl text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800">Online Appointment Booking</h3>
                                <p className="text-green-600 font-medium">Smart Way with Careipro</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {onlineBooking.map((item, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-white text-sm">✓</span>
                                    </div>
                                    <p className="text-gray-700">{item.text}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 p-4 bg-green-100 rounded-xl">
                            <p className="text-green-700 font-medium text-center">
                                🌐 Patient visits clinic page → Sees all doctors, services, reviews → Books with any specialist → Returns for more services!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Stats */}
                <div className="mt-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
                        <div>
                            <div className="text-4xl font-bold mb-2">3x</div>
                            <p className="text-green-100">More Patient Visibility</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">40%</div>
                            <p className="text-green-100">Increase in Appointments</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">24/7</div>
                            <p className="text-green-100">Booking Availability</p>
                        </div>
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
        { icon: '🔔', text: 'Real-time alerts for negative feedback or complaints' },
        { icon: '📊', text: 'Staff performance tracking through patient reviews' },
        { icon: '📱', text: 'Patients can share concerns privately' },
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
                        💡 A Message for Healthcare Providers
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Good Medicine Is Just the Beginning</h2>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                        True patient care goes beyond prescriptions. Understanding patient experiences, collecting feedback, and ensuring quality service at every touchpoint matters.
                    </p>
                </div>

                {/* Challenges Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {challenges.map((item, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                            <div className="text-4xl mb-4">{item.icon}</div>
                            <h3 className="font-bold text-gray-800 text-lg mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Solution Box */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                Careipro Helps You Listen to Your Patients
                            </h3>
                            <p className="text-blue-100 text-lg mb-6">
                                Our platform gives you complete visibility into patient experiences. Track health records, collect feedback automatically, and address concerns before they become complaints.
                            </p>
                            <Link href="#register" className="inline-block px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all">
                                Start Listening Today →
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {solutions.map((item, index) => (
                                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                    <span className="text-2xl">{item.icon}</span>
                                    <p className="text-white text-sm mt-2">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quote */}
                <div className="mt-12 text-center">
                    <div className="inline-block bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-3xl">
                        <FaQuoteLeft className="text-green-200 text-3xl mb-4 mx-auto" />
                        <p className="text-xl text-gray-700 italic mb-4">
                            &quot;A patient may forget what you said, but they will never forget how you made them feel. Every interaction matters - from the receptionist to the doctor.&quot;
                        </p>
                        <p className="text-green-600 font-semibold">- Patient-Centric Healthcare</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Digital Marketing Section
const DigitalMarketingSection = () => {
    const marketingFeatures = [
        {
            icon: '🌐',
            title: 'Google My Business Setup',
            desc: 'We create and optimize your Google Business Profile so patients can find you easily on Google Search and Maps.',
            highlight: 'Appear on Google Maps'
        },
        {
            icon: '📱',
            title: 'Social Media Marketing',
            desc: 'Professional Facebook & Instagram pages with regular health posts, patient testimonials, and promotional content.',
            highlight: 'Facebook & Instagram'
        },
        {
            icon: '🎯',
            title: 'Targeted Ads',
            desc: 'Run Google Ads and Meta Ads targeted to patients searching for healthcare services in your area.',
            highlight: 'Google & Meta Ads'
        },
        {
            icon: '📝',
            title: 'Content Creation',
            desc: 'Health tips, doctor profiles, service highlights - we create engaging content that attracts patients.',
            highlight: 'Posts & Reels'
        },
        {
            icon: '⭐',
            title: 'Review Management',
            desc: 'Collect positive reviews from satisfied patients and professionally respond to feedback on all platforms.',
            highlight: '5-Star Reputation'
        },
        {
            icon: '📊',
            title: 'Analytics & Reports',
            desc: 'Track your online performance - website visits, appointment bookings, ad performance, and ROI reports.',
            highlight: 'Monthly Reports'
        },
    ];

    const platforms = [
        { name: 'Google', icon: '🔍', color: 'bg-red-100 text-red-600' },
        { name: 'Facebook', icon: '📘', color: 'bg-blue-100 text-blue-600' },
        { name: 'Instagram', icon: '📸', color: 'bg-pink-100 text-pink-600' },
        { name: 'YouTube', icon: '▶️', color: 'bg-red-100 text-red-600' },
        { name: 'WhatsApp', icon: '💬', color: 'bg-green-100 text-green-600' },
    ];

    return (
        <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-4">
                        📣 Digital Marketing Support
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        We Help You Reach More Patients <span className="text-purple-600">Online</span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                        Most doctors and clinics don&apos;t have time or expertise for digital marketing. Careipro handles everything - from Google listing to social media ads - so you can focus on treating patients.
                    </p>
                </div>

                {/* Platform Icons */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {platforms.map((platform, index) => (
                        <div key={index} className={`${platform.color} px-6 py-3 rounded-full flex items-center gap-2 font-medium`}>
                            <span className="text-xl">{platform.icon}</span>
                            {platform.name}
                        </div>
                    ))}
                </div>

                {/* Marketing Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {marketingFeatures.map((feature, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="text-4xl">{feature.icon}</div>
                                <span className="px-3 py-1 bg-purple-100 text-purple-600 text-xs font-medium rounded-full">
                                    {feature.highlight}
                                </span>
                            </div>
                            <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-purple-600 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-sm">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Before vs After */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Before */}
                    <div className="bg-gray-100 rounded-2xl p-8 border-2 border-gray-300">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center">
                                <span className="text-2xl">😟</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-700">Without Digital Marketing</h3>
                                <p className="text-gray-500 text-sm">Traditional Approach</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-gray-600">
                                <span className="text-red-500">✕</span>
                                <span>Patients don&apos;t find you on Google</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <span className="text-red-500">✕</span>
                                <span>No social media presence</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <span className="text-red-500">✕</span>
                                <span>Competitors rank above you</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <span className="text-red-500">✕</span>
                                <span>Low patient trust (no reviews)</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <span className="text-red-500">✕</span>
                                <span>Losing patients to tech-savvy clinics</span>
                            </div>
                        </div>
                    </div>

                    {/* After */}
                    <div className="bg-purple-100 rounded-2xl p-8 border-2 border-purple-300 relative">
                        <div className="absolute -top-3 right-4 px-4 py-1 bg-purple-600 text-white text-sm font-bold rounded-full">
                            WITH CAREIPRO
                        </div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                                <span className="text-2xl">🚀</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">With Careipro Marketing</h3>
                                <p className="text-purple-600 text-sm font-medium">Complete Digital Presence</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-gray-700">
                                <span className="text-green-500 font-bold">✓</span>
                                <span>Top rankings on Google Maps & Search</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <span className="text-green-500 font-bold">✓</span>
                                <span>Active Facebook & Instagram profiles</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <span className="text-green-500 font-bold">✓</span>
                                <span>Targeted ads reaching nearby patients</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <span className="text-green-500 font-bold">✓</span>
                                <span>5-star reviews building trust</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <span className="text-green-500 font-bold">✓</span>
                                <span>More appointments, more revenue</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center text-white">
                        <div>
                            <div className="text-4xl font-bold mb-2">80%</div>
                            <p className="text-purple-100">Patients search online before visiting a doctor</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">3x</div>
                            <p className="text-purple-100">More patient inquiries with digital presence</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">90%</div>
                            <p className="text-purple-100">Trust clinics with good online reviews</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">₹0</div>
                            <p className="text-purple-100">Setup cost with Careipro plans</p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Don&apos;t Have Time for Marketing? We&apos;ve Got You Covered!</h3>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        Focus on your patients while we handle your online presence. From Google to Instagram, we manage everything.
                    </p>
                    <Link href="#register" className="inline-block px-8 py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-all shadow-lg text-lg">
                        Get Started with Digital Marketing →
                    </Link>
                </div>
            </div>
        </section>
    );
};

// Request Demo Section
const RequestDemoSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        clinicName: '',
        location: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Demo Request:', formData);
        alert('Thank you! We will contact you soon for the demo.');
    };

    return (
        <section id="register" className="py-16 bg-gradient-to-br from-green-600 to-emerald-700 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Text Content */}
                    <div className="text-white">
                        <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                            🎯 Free Demo Available
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            See How Careipro Can Transform Your Clinic
                        </h2>
                        <p className="text-lg text-green-100 mb-6">
                            Request a free demo and our team will show you how Careipro can help you manage patients, appointments, digital prescriptions, and grow your practice online.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <span className="text-xl">📞</span>
                                </div>
                                <div>
                                    <p className="font-semibold">Personalized Demo Call</p>
                                    <p className="text-green-100 text-sm">30-minute walkthrough of all features</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <span className="text-xl">💻</span>
                                </div>
                                <div>
                                    <p className="font-semibold">Live Product Demo</p>
                                    <p className="text-green-100 text-sm">See real-time features in action</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <span className="text-xl">🎁</span>
                                </div>
                                <div>
                                    <p className="font-semibold">No Commitment Required</p>
                                    <p className="text-green-100 text-sm">100% free, no obligations</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="bg-white rounded-3xl p-8 shadow-2xl">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Request a Free Demo</h3>
                            <p className="text-gray-600">Fill in your details and we&apos;ll get back to you within 24 hours</p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Your Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none"
                                />
                            </div>

                            {/* Contact Number */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Contact Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="contactNumber"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    placeholder="Enter your mobile number"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none"
                                />
                            </div>

                            {/* Clinic or Doctor Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Clinic / Doctor Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="clinicName"
                                    value={formData.clinicName}
                                    onChange={handleChange}
                                    placeholder="Enter clinic or doctor name"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none"
                                />
                            </div>

                            {/* Clinic Location */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Clinic Location <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="City, State (e.g., Mumbai, Maharashtra)"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                🚀 Request for Demo
                            </button>
                        </form>

                        <p className="text-center text-gray-500 text-sm mt-4">
                            By submitting, you agree to our <Link href="/privacy-policy" className="text-green-600 hover:underline">Privacy Policy</Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

// CTA Section
const CTASection = () => {
    return (
        <section className="py-16" style={{ background: 'linear-gradient(135deg, #047857 0%, #10b981 50%, #34d399 100%)' }}>
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Grow Your Practice?</h2>
                <p className="text-xl text-white/90 mb-8">Join thousands of healthcare providers on Careipro. It&apos;s free, fast, and easy.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="#register" className="px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg text-lg">
                        Get Started Free
                    </Link>
                    <Link href="/contact-us" className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all border border-white/30 text-lg flex items-center justify-center gap-2">
                        <BiPhone /> Contact Us
                    </Link>
                </div>
            </div>
        </section>
    );
};

// Main Component
const BusinessListingDesktop = () => {
    return (
        <>
            <PageHeader state="" city="" />
            <HeroSection />
            <ComparisonSection />
            <PatientExperienceSection />
            <BenefitsSection />
            <HowItWorksSection />
            <DigitalPrescriptionSection />
            <DigitalMarketingSection />
            <RequestDemoSection />
            {/* <TestimonialsSection /> */}
            <FAQSection />
            <CTASection />
            <BusinessTypesSection referer="hospital-clinic" />
            <DesktopFooter state="Odisha" city="Bhadrak" />
        </>
    );
};

export default BusinessListingDesktop;