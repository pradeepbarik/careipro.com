import React from "react";
import Header from "../components/mobile/header";

const services = [
  { title: "Doctor Booking", icon: "🩺" },
  { title: "Video Consult", icon: "📹" },
  { title: "Lab Tests", icon: "🧪" },
  { title: "Medicine Delivery", icon: "💊" },
  { title: "E-Prescriptions", icon: "📄" },
  { title: "Health Records", icon: "🗂️" },
];

const AboutUsMobile = () => {
  return (
    <>
      <Header heading="About us" template="SUBPAGE" />

      <div className="bg-white px-4 py-6 text-gray-800">

        {/* Company Intro */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-2 text-black-700">Welcome to Careipro</h2>
          <p className="text-sm text-gray-600">
            Careipro is a trusted online platform designed to make healthcare simple, fast, and accessible.
            We help patients connect with doctors, labs, and pharmacies—all from the comfort of their homes.
            It is Founded in 2020 and we have a 5 Years of Experience.
          </p>
        </section>

         {/* Our Vision */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-black-700 mb-2">Our Vision</h2>
          <p className="text-sm text-gray-600">
            To become India’s most reliable and affordable digital healthcare platform that delivers care to every doorstep — with technology, trust, and compassion.
          </p>
        </section>

        {/* Our Mission */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-black-700 mb-2">Our Mission</h2>
          <p className="text-sm text-gray-600">
            To empower individuals with seamless access to healthcare through innovation, technology, and compassion.
            We aim to make healthcare smarter and more connected.
          </p>
        </section>

        {/* Our Services Provided */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-black-700 mb-4">Our Services Provided</h2>

          <div className="grid grid-cols-3 gap-5 text-center">
            {services.map((service, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-2xl shadow-md">
                  {service.icon}
                </div>
                <p className="text-sm font-medium text-gray-800">{service.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-black-700 mb-2">Why to Choose Careipro?</h2>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>24/7 online doctor consultations</li>
            <li>Affordable lab tests and doorstep sample collection</li>
            <li>Fast & genuine medicine delivery</li>
            <li>Secure cloud-based health records</li>
            <li>Easy-to-use mobile interface for all age groups</li>
          </ul>
        </section>
        
      </div>
    </>
  );
};

export default AboutUsMobile;
