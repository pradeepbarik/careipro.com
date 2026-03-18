'use client';
import Link from "next/link";
import { BiCheck, BiPhone, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { FaUsers, FaChartLine, FaCalendarCheck, FaStar, FaQuoteLeft, FaHandHoldingHeart, FaUserShield, FaMoneyBillWave, FaUserCheck } from "react-icons/fa";
import { MdVerified, MdVisibility, MdSupport, MdAccessTime, MdLocationOn } from "react-icons/md";
import { useState } from "react";
import DesktopFooter from "../../components/desktop/footer";
import PageHeader from "../../components/desktop/header";
import BusinessTypesSection from "../components/business-type-section";

// Benefits for Individual Caretakers
const individualBenefits = [
    { icon: <MdVisibility className="text-3xl" />, title: 'Get Found by Families', desc: 'Families searching for caretakers in your area will find your profile easily on our platform.' },
    { icon: <FaMoneyBillWave className="text-3xl" />, title: 'Earn More Money', desc: 'Set your own rates, get direct payments. No middleman taking commission from your hard-earned money.' },
    { icon: <MdVerified className="text-3xl" />, title: 'Verified Badge', desc: 'Get a verified badge after document verification. Families trust verified caretakers more.' },
    { icon: <FaCalendarCheck className="text-3xl" />, title: 'Manage Your Schedule', desc: 'Accept or decline bookings based on your availability. You control when you work.' },
    { icon: <FaStar className="text-3xl" />, title: 'Build Your Reputation', desc: 'Collect ratings and reviews from families. Good reviews bring more bookings.' },
    { icon: <MdSupport className="text-3xl" />, title: '24/7 Support', desc: 'Our team is always available to help you with any issues or questions.' },
];

// Benefits for Vendors (Agencies)
const vendorBenefits = [
    { icon: <FaUsers className="text-3xl" />, title: 'Manage Multiple Caretakers', desc: 'Add all your caretakers under one account. Track their bookings, availability, and performance.' },
    { icon: <FaChartLine className="text-3xl" />, title: 'Business Dashboard', desc: 'Complete analytics - see earnings, bookings, top performers, and growth reports.' },
    { icon: <MdLocationOn className="text-3xl" />, title: 'Expand Your Reach', desc: 'Get bookings from multiple cities. Families across India can find your caretakers.' },
    { icon: <FaMoneyBillWave className="text-3xl" />, title: 'Centralized Payments', desc: 'All payments come to your business account. Easily manage payouts to your caretakers.' },
    { icon: <FaUserShield className="text-3xl" />, title: 'Quality Control', desc: 'Monitor ratings and feedback for each caretaker. Maintain service quality across your team.' },
    { icon: <MdAccessTime className="text-3xl" />, title: 'Save Admin Time', desc: 'Automated booking management, reminders, and invoicing. Focus on growing your business.' },
];

// How It Works Steps - Individual
const individualSteps = [
    { step: 1, title: 'Register Free', desc: 'Create your profile with skills, experience, and availability' },
    { step: 2, title: 'Upload Documents', desc: 'Add Aadhaar, certificates, and previous work references' },
    { step: 3, title: 'Get Verified', desc: 'Our team verifies your documents within 24-48 hours' },
    { step: 4, title: 'Start Earning', desc: 'Receive booking requests and start earning money' },
];

// How It Works Steps - Vendor
const vendorSteps = [
    { step: 1, title: 'Register Agency', desc: 'Create your business account with company details' },
    { step: 2, title: 'Add Caretakers', desc: 'Add your team members with their profiles and skills' },
    { step: 3, title: 'Verify Team', desc: 'Submit documents for all caretakers for verification' },
    { step: 4, title: 'Grow Business', desc: 'Receive bookings and manage your team from one dashboard' },
];

// FAQs
const faqs = [
    { q: 'Is registration free for caretakers?', a: 'Yes! Registration is completely free for individual caretakers. We only charge a small commission on successful bookings.' },
    { q: 'How do I get paid?', a: 'Payments are transferred directly to your bank account after each booking is completed. For vendors, all payments go to your business account.' },
    { q: 'What documents are required?', a: 'For verification, we need Aadhaar card, recent photo, and any relevant certificates (nursing, elderly care, etc.). Previous work references are a plus.' },
    { q: 'Can I set my own rates?', a: 'Absolutely! You set your own hourly/daily rates. We suggest competitive rates based on your city and experience level.' },
    { q: 'How do families find me?', a: 'Families search for caretakers based on location, skills, ratings, and availability. A complete profile with good reviews ranks higher.' },
    { q: 'What if a family cancels a booking?', a: 'We have a fair cancellation policy. If cancelled within 24 hours of service, you receive partial compensation.' },
    { q: 'Can I work in multiple cities?', a: 'Yes! You can update your service areas anytime. This is especially useful for vendors with caretakers in different cities.' },
    { q: 'How does the rating system work?', a: 'After each service, families rate caretakers on punctuality, care quality, and professionalism. Higher ratings mean more visibility and bookings.' },
];

// Testimonials
const testimonials = [
    { name: 'Sunita Devi', role: 'Individual Caretaker, Delhi', text: 'Before Careipro, I struggled to find regular work. Now I have bookings every week and families contact me directly. My income has doubled!', rating: 5 },
    { name: 'Care Plus Agency', role: 'Caretaker Vendor, Mumbai', text: 'Managing 15 caretakers was a nightmare before. With Careipro dashboard, I can see all bookings, payments, and ratings in one place. Highly recommended!', rating: 5 },
    { name: 'Ramesh Kumar', role: 'Individual Caretaker, Bangalore', text: 'The verified badge really helps. Families trust me more because they know my documents are verified. I get more bookings than before.', rating: 5 },
];

// Hero Section
const HeroSection = () => {
    return (
        <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 50%, #a78bfa 100%)' }}>
            <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1 text-center lg:text-left">
                        <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-4">
                            🤝 Join 5,000+ Caretakers & Vendors
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            Grow Your Caretaking Career <br />
                            <span className="text-purple-200">Join Careipro Today</span>
                        </h1>
                        <p className="text-xl text-white/90 mb-8 max-w-xl">
                            Whether you&apos;re an individual caretaker or run an agency with multiple caretakers, Careipro helps you reach more families and earn more.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="#individual" className="px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg text-lg">
                                I&apos;m a Caretaker
                            </Link>
                            <Link href="#vendor" className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all border border-white/30 text-lg">
                                I&apos;m a Vendor/Agency
                            </Link>
                        </div>
                        <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start">
                            <div className="flex -space-x-3">
                                {['👩‍⚕️', '👨‍⚕️', '👩', '👨'].map((emoji, i) => (
                                    <div key={i} className="w-10 h-10 rounded-full bg-white/30 border-2 border-white flex items-center justify-center text-lg">
                                        {emoji}
                                    </div>
                                ))}
                            </div>
                            <p className="text-white/90 text-sm">
                                <span className="font-bold">5,000+</span> caretakers earning with us
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 hidden lg:block">
                        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/20 rounded-2xl p-6 text-center">
                                    <div className="text-4xl font-bold text-white">₹25K+</div>
                                    <div className="text-white/80 text-sm">Avg Monthly Earning</div>
                                </div>
                                <div className="bg-white/20 rounded-2xl p-6 text-center">
                                    <div className="text-4xl font-bold text-white">10K+</div>
                                    <div className="text-white/80 text-sm">Families Trust Us</div>
                                </div>
                                <div className="bg-white/20 rounded-2xl p-6 text-center">
                                    <div className="text-4xl font-bold text-white">50+</div>
                                    <div className="text-white/80 text-sm">Cities Covered</div>
                                </div>
                                <div className="bg-white/20 rounded-2xl p-6 text-center">
                                    <div className="text-4xl font-bold text-white">4.9★</div>
                                    <div className="text-white/80 text-sm">Caretaker Rating</div>
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

// Why Join Section - Problems & Solutions
const WhyJoinSection = () => {
    const problems = [
        { icon: '😟', text: 'Struggling to find regular work' },
        { icon: '📞', text: 'Depending on phone calls for bookings' },
        { icon: '😔', text: 'Families don\'t trust without references' },
        { icon: '📍', text: 'Limited to one locality for work' },
        { icon: '⏰', text: 'No control over your schedule' },
    ];

    const solutions = [
        { icon: '✅', text: 'Get regular bookings from families nearby' },
        { icon: '💰', text: 'Keep most of your earnings - low platform fee' },
        { icon: '📱', text: 'Manage bookings through easy-to-use app' },
        { icon: '✓', text: 'Verified badge builds instant trust' },
        { icon: '🌍', text: 'Get work from multiple areas/cities' },
        { icon: '📅', text: 'Accept/reject based on your availability' },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Caretakers Join Careipro?</h2>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto">See how Careipro solves common problems faced by caretakers</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Problems */}
                    <div className="bg-red-50 rounded-2xl p-8 border-2 border-red-200">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center">
                                <span className="text-3xl">😩</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800">Without Careipro</h3>
                                <p className="text-red-600 font-medium">Common Struggles</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {problems.map((item, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                                        <span className="text-white text-sm">✕</span>
                                    </div>
                                    <p className="text-gray-700">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Solutions */}
                    <div className="bg-green-50 rounded-2xl p-8 border-2 border-green-200 relative">
                        <div className="absolute -top-4 right-4 px-4 py-1 bg-green-500 text-white text-sm font-bold rounded-full">
                            JOIN TODAY
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-3xl">😊</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800">With Careipro</h3>
                                <p className="text-green-600 font-medium">Better Career</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {solutions.map((item, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                                        <span className="text-white text-sm">✓</span>
                                    </div>
                                    <p className="text-gray-700">{item.text}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6">
                            <Link href="#register" className="inline-block w-full py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-all text-center shadow-lg">
                                🚀 Join Careipro Now - Free
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl p-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
                        <div>
                            <div className="text-4xl font-bold mb-2">3x</div>
                            <p className="text-purple-100">More Earnings</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">50%</div>
                            <p className="text-purple-100">More Bookings</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">0%</div>
                            <p className="text-purple-100">Registration Fee</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">24/7</div>
                            <p className="text-purple-100">Support Available</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Individual Caretaker Section
const IndividualCaretakerSection = () => {
    return (
        <section id="individual" className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-4">
                        👤 For Individual Caretakers
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Start Your Caretaking Career with Careipro</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">Whether you&apos;re experienced or just starting, we help you find families who need your care</p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {individualBenefits.map((benefit, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all border border-gray-200">
                            <div className="w-14 h-14 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                                {benefit.icon}
                            </div>
                            <h3 className="font-bold text-gray-800 text-lg mb-2">{benefit.title}</h3>
                            <p className="text-gray-600">{benefit.desc}</p>
                        </div>
                    ))}
                </div>

                {/* How It Works */}
                <div className="bg-white rounded-2xl p-8 border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">How to Get Started</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {individualSteps.map((item, index) => (
                            <div key={index} className="relative text-center">
                                <div className="w-16 h-16 mx-auto rounded-full bg-purple-500 text-white flex items-center justify-center text-2xl font-bold mb-4">
                                    {item.step}
                                </div>
                                <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
                                <p className="text-gray-600 text-sm">{item.desc}</p>
                                {index < individualSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-8 right-0 transform translate-x-1/2 text-purple-300 text-3xl">
                                        →
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-8 text-center">
                    <Link href="#register" className="inline-block px-8 py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-all shadow-lg text-lg">
                        Register as Individual Caretaker →
                    </Link>
                </div>
            </div>
        </section>
    );
};

// Vendor/Agency Section
const VendorSection = () => {
    return (
        <section id="vendor" className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium mb-4">
                        🏢 For Vendors & Agencies
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Manage Your Caretaker Business on Careipro</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">Run an agency with multiple caretakers? We make it easy to manage your team and grow your business</p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {vendorBenefits.map((benefit, index) => (
                        <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:bg-indigo-50 transition-all border border-gray-200 hover:border-indigo-200">
                            <div className="w-14 h-14 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                                {benefit.icon}
                            </div>
                            <h3 className="font-bold text-gray-800 text-lg mb-2">{benefit.title}</h3>
                            <p className="text-gray-600">{benefit.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Dashboard Preview */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 md:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="text-white">
                            <h3 className="text-2xl md:text-3xl font-bold mb-4">
                                Powerful Vendor Dashboard
                            </h3>
                            <p className="text-indigo-100 text-lg mb-6">
                                Everything you need to manage your caretaker business in one place.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                        <span className="text-white">✓</span>
                                    </div>
                                    <span>Add unlimited caretakers to your team</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                        <span className="text-white">✓</span>
                                    </div>
                                    <span>Track all bookings and payments</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                        <span className="text-white">✓</span>
                                    </div>
                                    <span>See ratings and performance of each caretaker</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                        <span className="text-white">✓</span>
                                    </div>
                                    <span>Generate invoices and reports automatically</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            {/* Mock Dashboard Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="bg-white/20 rounded-xl p-4 text-center">
                                    <div className="text-3xl font-bold text-white">15</div>
                                    <div className="text-white/80 text-sm">Caretakers</div>
                                </div>
                                <div className="bg-white/20 rounded-xl p-4 text-center">
                                    <div className="text-3xl font-bold text-white">48</div>
                                    <div className="text-white/80 text-sm">Active Bookings</div>
                                </div>
                                <div className="bg-white/20 rounded-xl p-4 text-center">
                                    <div className="text-3xl font-bold text-white">₹2.5L</div>
                                    <div className="text-white/80 text-sm">This Month</div>
                                </div>
                                <div className="bg-white/20 rounded-xl p-4 text-center">
                                    <div className="text-3xl font-bold text-white">4.8★</div>
                                    <div className="text-white/80 text-sm">Avg Rating</div>
                                </div>
                            </div>
                            <div className="bg-white/20 rounded-xl p-4">
                                <div className="text-white/80 text-sm mb-2">Recent Bookings</div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-white text-sm">
                                        <span>Sunita - Mrs. Kapoor</span>
                                        <span className="text-green-300">Confirmed</span>
                                    </div>
                                    <div className="flex items-center justify-between text-white text-sm">
                                        <span>Ramesh - Mr. Singh</span>
                                        <span className="text-yellow-300">Pending</span>
                                    </div>
                                    <div className="flex items-center justify-between text-white text-sm">
                                        <span>Geeta - Mrs. Verma</span>
                                        <span className="text-green-300">Confirmed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* How It Works */}
                <div className="mt-12 bg-gray-50 rounded-2xl p-8 border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">How to Get Started as Vendor</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {vendorSteps.map((item, index) => (
                            <div key={index} className="relative text-center">
                                <div className="w-16 h-16 mx-auto rounded-full bg-indigo-500 text-white flex items-center justify-center text-2xl font-bold mb-4">
                                    {item.step}
                                </div>
                                <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
                                <p className="text-gray-600 text-sm">{item.desc}</p>
                                {index < vendorSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-8 right-0 transform translate-x-1/2 text-indigo-300 text-3xl">
                                        →
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-8 text-center">
                    <Link href="#register" className="inline-block px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg text-lg">
                        Register as Vendor/Agency →
                    </Link>
                </div>
            </div>
        </section>
    );
};

// Caretaker Types Section
const CaretakerTypesSection = () => {
    const types = [
        { icon: '👴', title: 'Elderly Care', desc: 'Care for senior citizens at home', services: ['Daily assistance', 'Medication reminders', 'Companionship', 'Mobility support'] },
        { icon: '🤒', title: 'Patient Care', desc: 'Post-surgery and medical care', services: ['Wound dressing', 'Medical monitoring', 'Hospital assistance', 'Recovery support'] },
        { icon: '👶', title: 'Child Care', desc: 'Baby and child care services', services: ['Nanny services', 'School pick-up', 'Homework help', 'Activity supervision'] },
        { icon: '♿', title: 'Special Needs Care', desc: 'Care for differently-abled', services: ['Physical therapy support', 'Daily living assistance', 'Transportation', 'Skill development'] },
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Type of Caretaker Are You?</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">We welcome all types of caretakers. Select your specialization when you register.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {types.map((type, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all">
                            <div className="text-5xl mb-4">{type.icon}</div>
                            <h3 className="font-bold text-gray-800 text-lg mb-2">{type.title}</h3>
                            <p className="text-gray-500 text-sm mb-4">{type.desc}</p>
                            <ul className="space-y-2">
                                {type.services.map((service, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                        <span className="text-purple-500">•</span>
                                        {service}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Earning Calculator Section
const EarningCalculatorSection = () => {
    const earnings = [
        { type: 'Part-time (4 hrs/day)', hourly: '₹150-250', monthly: '₹18,000 - ₹30,000' },
        { type: 'Full-time (8 hrs/day)', hourly: '₹100-200', monthly: '₹24,000 - ₹48,000' },
        { type: 'Live-in Caretaker', daily: '₹800-1500', monthly: '₹24,000 - ₹45,000' },
        { type: 'Night Shift (12 hrs)', nightly: '₹600-1000', monthly: '₹18,000 - ₹30,000' },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-medium mb-4">
                        💰 Earning Potential
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How Much Can You Earn?</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">See estimated earnings based on your availability and experience level</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {earnings.map((item, index) => (
                        <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 text-center">
                            <h3 className="font-bold text-gray-800 mb-4">{item.type}</h3>
                            {item.hourly && <p className="text-gray-600 text-sm">Rate: {item.hourly}/hr</p>}
                            {item.daily && <p className="text-gray-600 text-sm">Rate: {item.daily}/day</p>}
                            {item.nightly && <p className="text-gray-600 text-sm">Rate: {item.nightly}/night</p>}
                            <div className="mt-4 pt-4 border-t border-green-200">
                                <p className="text-xs text-gray-500">Monthly Earning</p>
                                <p className="text-xl font-bold text-green-600">{item.monthly}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h3 className="font-bold text-gray-800 text-lg">Experienced caretakers earn even more! 🚀</h3>
                            <p className="text-gray-600">With good ratings and reviews, you can charge premium rates and get more bookings.</p>
                        </div>
                        <Link href="#register" className="px-6 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-all whitespace-nowrap">
                            Start Earning Today
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Testimonials Section
const TestimonialsSection = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Success Stories</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">Hear from caretakers and vendors who are earning well with Careipro</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                            <FaQuoteLeft className="text-purple-200 text-3xl mb-4" />
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

// Request Demo Section
const RequestDemoSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        businessName: '',
        location: '',
        type: 'individual'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Registration Request:', formData);
        alert('Thank you! We will contact you soon.');
    };

    return (
        <section id="register" className="py-16 bg-gradient-to-br from-purple-600 to-violet-700 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Text Content */}
                    <div className="text-white">
                        <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                            🎯 Free Registration
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Join Careipro & Start Earning
                        </h2>
                        <p className="text-lg text-purple-100 mb-6">
                            Register now and our team will guide you through the verification process. Start receiving bookings within days!
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <span className="text-xl">📝</span>
                                </div>
                                <div>
                                    <p className="font-semibold">Simple Registration</p>
                                    <p className="text-purple-100 text-sm">Fill basic details and we&apos;ll call you</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <span className="text-xl">✅</span>
                                </div>
                                <div>
                                    <p className="font-semibold">Quick Verification</p>
                                    <p className="text-purple-100 text-sm">Get verified within 24-48 hours</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <span className="text-xl">🎁</span>
                                </div>
                                <div>
                                    <p className="font-semibold">Zero Registration Fee</p>
                                    <p className="text-purple-100 text-sm">Completely free to join</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="bg-white rounded-3xl p-8 shadow-2xl">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Register Now</h3>
                            <p className="text-gray-600">Fill in your details to get started</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Type Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    I am a <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                                >
                                    <option value="individual">Individual Caretaker</option>
                                    <option value="vendor">Vendor / Agency</option>
                                </select>
                            </div>

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
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
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
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                                />
                            </div>

                            {/* Business/Agency Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {formData.type === 'vendor' ? 'Agency Name' : 'Your Specialization'} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="businessName"
                                    value={formData.businessName}
                                    onChange={handleChange}
                                    placeholder={formData.type === 'vendor' ? 'Enter agency/company name' : 'e.g., Elderly Care, Patient Care'}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                                />
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Location <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="City, State (e.g., Mumbai, Maharashtra)"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-bold text-lg rounded-xl hover:from-purple-600 hover:to-violet-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                🚀 Register Now - It&apos;s Free
                            </button>
                        </form>

                        <p className="text-center text-gray-500 text-sm mt-4">
                            By registering, you agree to our <Link href="/privacy-policy" className="text-purple-600 hover:underline">Privacy Policy</Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

// FAQ Section
const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-16 bg-white">
            <div className="max-w-3xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-600 text-lg">Everything you need to know about joining Careipro</p>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
                            >
                                <span className="font-semibold text-gray-800">{faq.q}</span>
                                {openIndex === index ? (
                                    <BiChevronUp className="text-2xl text-purple-500" />
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

// CTA Section
const CTASection = () => {
    return (
        <section className="py-16" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 50%, #a78bfa 100%)' }}>
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Earning?</h2>
                <p className="text-xl text-white/90 mb-8">Join thousands of caretakers earning well with Careipro. Registration is 100% free!</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="#register" className="px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg text-lg">
                        Register Now - Free
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
const CaretakerListingPageDesktop = () => {
    return (
        <>
            <PageHeader state="" city="" />
            <HeroSection />
            <WhyJoinSection />
            <IndividualCaretakerSection />
            <VendorSection />
            <CaretakerTypesSection />
            <EarningCalculatorSection />
            <TestimonialsSection />
            <RequestDemoSection />
            <FAQSection />
            <CTASection />
            <BusinessTypesSection referer="caretaker" />
            <DesktopFooter state="Odisha" city="Bhadrak" />
        </>
    );
};

export default CaretakerListingPageDesktop;