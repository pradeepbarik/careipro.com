'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { BiUser, BiChevronRight } from 'react-icons/bi';
import { fetchMembershipStatus } from '@/lib/hooks/useClientSideApiCall';
import { hirePersonalAssistantPageUrl } from '@/lib/helper/link';

const PatientEnquiryBanner = dynamic(() => import('@/app/components/mobile/patient-enquiry'));

const PatientAssistantBanner = ({
    doctor_id, clinic_id, servicelocation_id, doctor_name, clinic_name, city, state
}: {
    doctor_id: number, clinic_id: number, servicelocation_id: number, doctor_name: string, clinic_name: string, city: string, state: string
}) => {
    const [isPrimeMember, setIsPrimeMember] = useState(false);

    useEffect(() => {
        fetchMembershipStatus().then(({ data }) => {
            setIsPrimeMember(!!data?.is_prime_member);
        });
    }, []);

    if (isPrimeMember) {
        return (
            <PatientEnquiryBanner
                doctor_id={doctor_id}
                clinic_id={clinic_id}
                servicelocation_id={servicelocation_id}
                doctor_name={doctor_name}
                clinic_name={clinic_name}
                city={city}
            />
        );
    }

    return (
        <Link
            href={hirePersonalAssistantPageUrl(state, city)}
            className="mx-2 mt-2 mb-3 rounded-xl p-4 flex items-center gap-3 shadow-sm"
            style={{ background: 'linear-gradient(135deg, #0f766e 0%, #0891b2 100%)' }}
        >
            <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <BiUser className="text-white text-2xl" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-white font-bold fs-15">Hire a Personal Assistant</div>
                <div className="text-white/85 fs-12 leading-tight mt-0.5">Book appointments, get information & order medicine for you</div>
            </div>
            <BiChevronRight className="text-white text-xl shrink-0" />
        </Link>
    );
};
export default PatientAssistantBanner;
