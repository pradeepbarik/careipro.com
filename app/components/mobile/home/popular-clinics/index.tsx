import Link from 'next/link'
import { BiSolidMap, BiChevronRight } from "react-icons/bi";
import { FaHospital } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { TPopularClinic } from '@/lib/types/clinic';
import { clinicProfilePic } from '@/lib/image';

/**
 * The clinic rail on the city home, used both by the curated "popular clinics" section and by a
 * clinics section the admin builds from chosen ids.
 *
 * Every card is the same white surface. The previous version alternated a teal fill with white,
 * which read as two kinds of listing rather than one list, and put the clinic's own logo nowhere.
 */
const PopularClinics = ({ clinics }: { clinics: TPopularClinic[] }) => {
    return (
        <div className='flex gap-3 overflow-auto cp-section hide-scroll-bar'>
            {clinics.map((clinic) => {
                /* the first two read on a card this size; the rest become a count so a clinic with
                   a long list does not push the card taller than its neighbours */
                const specialities = clinic.doctor_specializations || [];
                const shown = specialities.slice(0, 2);
                const extra = Math.max(
                    (clinic.total_specialist || specialities.length) - shown.length,
                    0
                );
                return (
                    <Link
                        key={clinic.id}
                        href={clinic.seo_url}
                        title={`${clinic.name} - careipro`}
                        className='shrink-0 w-[80%] bg-white border border-gray-200 rounded-xl p-3 shadow-sm active:bg-gray-50 transition-colors flex flex-col'
                    >
                        <div className='flex gap-3'>
                            {clinic.logo
                                ? <img src={clinicProfilePic(clinic.logo)} alt={`Logo of ${clinic.name}`}
                                    className='w-14 h-14 rounded-lg object-cover border border-gray-100 shrink-0' />
                                : <span className='w-14 h-14 rounded-lg bg-cyan-50 border border-cyan-100 flex items-center justify-center shrink-0'>
                                    <FaHospital className='text-cyan-600 fs-20' />
                                </span>}
                            <div className='min-w-0 grow'>
                                <div className='flex items-start gap-1'>
                                    <h3 className='fs-15 font-bold text-gray-900 leading-tight one-line grow'>{clinic.name}</h3>
                                    {clinic.verified === 1 && <MdVerified className='text-blue-500 shrink-0 mt-[2px]' />}
                                </div>
                                <span className='flex items-center gap-1 fs-12 text-gray-500 mt-[2px]'>
                                    <BiSolidMap className='text-cyan-600 shrink-0' />
                                    <span className='one-line'>
                                        {[clinic.locality, clinic.market_name].filter(Boolean).join(', ')}
                                    </span>
                                </span>
                            </div>
                        </div>

                        {shown.length > 0 &&
                            <div className='flex flex-wrap gap-1.5 mt-2'>
                                {shown.map((spl) =>
                                    <span key={spl} className='fs-12 px-2 py-[2px] rounded-full bg-cyan-50 text-cyan-800 border border-cyan-100'>
                                        {spl}
                                    </span>
                                )}
                                {extra > 0 &&
                                    <span className='fs-12 px-2 py-[2px] rounded-full bg-gray-100 text-gray-600'>
                                        +{extra} more
                                    </span>}
                            </div>}

                        <span className='flex items-center justify-end gap-0.5 fs-12 font-semibold text-cyan-700 mt-auto pt-2'>
                            View Details <BiChevronRight className='fs-15' />
                        </span>
                    </Link>
                )
            })}
        </div>
    )
}
export default PopularClinics;
