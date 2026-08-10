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
        >
            <img src="/patient-assistant.png" alt="Patient Assistant" className="w-full rounded-xl" />
        </Link>
    );
};
export default PatientAssistantBanner;
