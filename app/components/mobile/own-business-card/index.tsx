'use client'
import { createPortal } from 'react-dom';
import { FaUserMd } from "react-icons/fa";
import { BiChevronRight, BiStar, BiLocationPlus, BiRightArrowAlt } from "react-icons/bi";
import { userinfo, userSecreateKey } from '@/constants/storage_keys';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { SectionHeading } from '../ui';
import { clinicProfilePic } from '@/lib/image';
import { useEffect, useState } from 'react';
import { fetchClinicDetail, TclinicDetail } from '@/lib/hooks/useClientSideApiCall';
import styles from './style.module.scss';
import Link from 'next/link';
import { clinicDetailpageUrl, doctorDetailPageUrl } from '@/lib/helper/link';
import { array_chunk } from '@/lib/helper';
import NIsToOneDoctorsSliders from '../doctors/vertical-slider';
const OwnBusinessCard = ({ position, cookies }: { position: string, cookies: any }) => {
    const { clinic_info } = useSelector((state: RootState) => state.authSlice);
    const [container, setContainer] = useState<HTMLElement | null>(null);
    useEffect(() => {
        setContainer(document.getElementById(position));
    }, [])
    if (container && cookies[userinfo] && cookies[userSecreateKey] && clinic_info) {
        let clinicDtlpgUrl = clinicDetailpageUrl({
            seo_url: clinic_info.seo_url,
            bid: clinic_info.bid,
            state: clinic_info.state,
            city: clinic_info.city,
            market_name: clinic_info.market_name
        });
        return createPortal(<>
            <SectionHeading heading='My Business' />
            <div className='flex bg-red-50 border rounded-md items-center gap-4 mb-4 mx-2 py-1 px-2'>
                <img src={clinicProfilePic(clinic_info.logo || "")} alt="Clinic Profile Pic" className='w-14 h-14 object-cover rounded-md' />
                <div>
                    <Link href={clinicDtlpgUrl} className='font-semibold fs-16'>{clinic_info.name}</Link>
                    <p>
                        <BiLocationPlus className='inline-block mr-1' />
                        {clinic_info.location},{clinic_info.locality} {clinic_info.market_name},{clinic_info.city}
                    </p>
                </div>
                <Link href={clinicDtlpgUrl} className='ml-auto'>
                    <BiRightArrowAlt className={`${styles.arrow} bg-primary rounded-full color-white`} />
                </Link>
            </div>
        </>, container);
    } else {
        return <></>;
    }
}

export default OwnBusinessCard;