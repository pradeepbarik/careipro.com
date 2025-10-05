'use client';
import useMyFavourite from '@/lib/hooks/useMyFavourite';
import Header from '../components/mobile/header';
import PageSkeleton from '../components/mobile/page-loader';
import { SectionHeading } from '../components/mobile/ui';
import Link from 'next/link';
import { BiSolidMap, BiClinic, BiRightArrowAlt, BiChevronRight } from "react-icons/bi";
import CheckAvailabilityBtn from '../components/mobile/doctors/check-availability-btn';
const MyFavouritesPageMobile = () => {
    const { loading, doctors } = useMyFavourite();
    return (
        <div>
            <Header heading="My Favourites" template="SUBPAGE" />
            {loading ? (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <PageSkeleton />
                </div>
            ) : (
                <div>
                    <SectionHeading heading="My Favourite Doctors" />
                    {doctors.length > 0 ? <div className="px-2">
                        {doctors.map(doctor => (
                            <div key={doctor.id} className="py-1 px-2 bg-white border rounded-md mb-2">
                                <div className="flex gap-2">
                                    <img src={doctor.image} alt={"Profile picture of " + doctor.name} className="w-16 h-16 rounded-full shrink-0" />
                                    <div className="flex flex-col">
                                        <Link href={doctor.seo_url} className="font-semibold one-line fs-16">{doctor.name}</Link>
                                        {doctor.position && <span>{doctor.position.trim()}</span>}
                                        <span>{doctor.specialization}</span>
                                        <span>
                                           <CheckAvailabilityBtn show={false} service_loc_id={doctor.service_location_id}  />
                                        </span>
                                    </div>
                                </div>
                                <hr className="mt-1" />
                                <div className="flex items-center py-1">
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <BiClinic className="color-primary" />
                                            <span className="font-semibold">{doctor.clinic}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <BiSolidMap className="color-primary" />
                                            <span>{doctor.city}</span>
                                        </div>
                                    </div>
                                    <div className="ml-auto">
                                        <Link href={doctor.seo_url} title={`${doctor.name} in ${doctor.clinic},${doctor.city}`} className="button ">
                                            Book Appointment
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> : <>
                        <p>No favourite doctors found.</p>
                    </>
                    }
                </div>
            )}
        </div>
    );
};
export default MyFavouritesPageMobile;
