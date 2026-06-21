import Link from "next/link";
import Script from "next/script";
import { BiSolidMap, BiClinic, BiTimeFive,BiRightArrowAlt } from "react-icons/bi";
import { TDoctor } from "@/lib/types/doctor";
import { doctorProfilePic } from '@/lib/image';
import { doctorDetailPageUrl } from '@/lib/helper/link';
import CheckAvailabilityBtn from './check-availability-btn';
import ConsultTimingBadge from './consult-timing-badge';

function formatDateLabel(dateStr: string): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    const diff = Math.round((date.getTime() - today.getTime()) / 86400000);
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    return date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
}

function getSessionSlots(cd: NonNullable<TDoctor['matched_consult_date']>): string[] {
    const slots: string[] = [];
    if (cd.first_session_start_time && cd.first_session_end_time)
        slots.push(`${cd.first_session_start_time} – ${cd.first_session_end_time}`);
    if (cd.second_session_start_time && cd.second_session_end_time)
        slots.push(`${cd.second_session_start_time} – ${cd.second_session_end_time}`);
    if (cd.third_session_start_time && cd.third_session_end_time)
        slots.push(`${cd.third_session_start_time} – ${cd.third_session_end_time}`);
    return slots;
}

const NIsToOneDoctorsSliders = ({ data, type = 'DOCTOR', showAvaileTime }: { data: TDoctor[], type?: 'DOCTOR' | 'CLINIC_DOCTOR', showAvaileTime?: boolean }) => {
    return (
        <div className="">
            {data.map((doctor, i) => {
                const doctorDtlpgUrl = doctorDetailPageUrl({ doctor_id: doctor.doctor_id, clinic_id: doctor.clinic_id, service_loc_id: doctor.service_location_id, seo_url: doctor.doctor_seo_url, city: doctor.city, state: doctor.state, market_name: doctor.market_name,type: doctor.business_type })
                return (
                    <Link key={doctor.service_location_id} className="bg-white border-b shadow-md mb-1 block" href={doctorDtlpgUrl} title={`${doctor.doctor_name} in ${doctor.clinic},${doctor.city}`}>
                        <div className="flex py-2 px-2 gap-3">
                            <div className="w-20 shrink-0 flex flex-col items-center gap-1">
                                <img alt={"Profile picture of " + doctor.doctor_name} src={doctorProfilePic(doctor.doctor_profile_pic)} className="w-20 h-20 rounded-md" />
                                {doctor.experience > 0 && (
                                    <span className="text-[10px] font-bold text-red-700 border border-red-200 rounded-full px-2 py-0.5 w-full text-center leading-tight">
                                       Exp: {doctor.experience}+ Yrs
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col grow">
                                <Link className="flex items-center font-semibold fs-16" href={doctorDtlpgUrl}>{doctor.doctor_name}</Link>
                                <div className="flex">
                                    <div className="flex flex-col grow">
                                        {doctor.qualification_disp && <span>{doctor.qualification_disp}</span>}
                                        {doctor.position && <span>{doctor.position}</span>}
                                        {doctor.specialists && <span>{doctor.specialists}</span>}
                                        {type === 'DOCTOR' && <>
                                            {doctor.matched_consult_date
                                                ? <div className="mt-0.5 flex">
                                                    <div className="flex items-center gap-1 mb-0.5">
                                                        <BiTimeFive className="color-primary text-xs shrink-0" />
                                                        <span className="text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 rounded-md px-1.5 leading-snug">
                                                            {formatDateLabel(doctor.matched_consult_date.date)}
                                                        </span>
                                                    </div>
                                                    <div className="pl-2">
                                                        {getSessionSlots(doctor.matched_consult_date).map((slot, idx) => (
                                                            <div key={idx} className="text-xs text-gray-600 leading-snug">{slot}</div>
                                                        ))}
                                                    </div>
                                                  </div>
                                                : doctor.display_consulting_timing && doctor.display_consulting_timing.length > 0
                                                    ? <div className="mt-0.5">
                                                        {doctor.display_consulting_timing.map((dt, idx) => (
                                                            <div key={idx} className="flex items-start gap-1 text-xs text-gray-600 leading-snug">
                                                                <span className="grid grid-cols-2 gap-1">
                                                                    <span className="font-semibold flex items-center gap-1">
                                                                        <BiTimeFive className="shrink-0 mt-0.5 color-primary" />
                                                                        {dt.label}:
                                                                    </span>
                                                                    <span className="flex flex-col">
                                                                        {dt.value.map((v, vi) => (
                                                                            <span key={vi} className="ml-1">{v}</span>
                                                                        ))}
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        ))}
                                                      </div>
                                                    : doctor.consult_dates && doctor.consult_dates.length > 0
                                                        ? <ConsultTimingBadge consult_dates={doctor.consult_dates} doctorName={doctor.doctor_name} />
                                                        : doctor.availability
                                                            ? <span className="flex items-center">
                                                                <BiTimeFive/>&nbsp;
                                                                <span className="color-secondary font-semibold">{doctor.availability}</span>
                                                              </span>
                                                            : <></>
                                            }
                                        </>}
                                    </div>

                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="flex items-center px-2 py-2">
                            <div className="flex flex-col leading-5">
                                {type === "CLINIC_DOCTOR" && <>
                                            
                                    {doctor.availability ?
                                        <span>
                                            <BiTimeFive className="color-primary" />&nbsp;
                                            <span className="color-secondary font-semibold">{doctor.availability}</span>
                                        </span>
                                        :
                                        <CheckAvailabilityBtn availablePrefix="" service_loc_id={doctor.service_location_id} show={(showAvaileTime && i < 4) ? showAvaileTime : false} />
                                    }
                                </>}
                                {type === 'DOCTOR' && <>
                                    {doctor.clinic &&
                                        <span className="font-semibold flex items-center gap-1">
                                            <BiClinic className="color-primary" />
                                            {doctor.clinic}
                                        </span>}
                                    {type === 'DOCTOR' &&
                                        <span className="flex items-baseline gap-1">
                                            <BiSolidMap className="color-primary relative top-1" />
                                            <span className="text">{doctor.locality}, {doctor.market_name}</span>
                                        </span>
                                    }
                                </>}

                            </div>
                            <div className="ml-auto flex items-end">
                                {type === "DOCTOR" ?
                                    // <Link href={doctorDetailPageUrl({ doctor_id: doctor.doctor_id, clinic_id: doctor.clinic_id, service_loc_id: doctor.service_location_id, seo_url: doctor.doctor_seo_url, city: doctor.city, state: doctor.state, market_name: doctor.market_name })} className="button py-2 text one-line text-xs rounded-2xl text-center" data-variant='contained' >Doctor detail</Link>
                                    <span title={`${doctor.doctor_name} in ${doctor.clinic},${doctor.city}`} className="border rounded-full border-color-primary" >
                                        <BiRightArrowAlt className="text-2xl color-primary"/>
                                    </span>
                                    : <>
                                        <Link className="button one-line" href={doctorDetailPageUrl({ doctor_id: doctor.doctor_id, clinic_id: doctor.clinic_id, service_loc_id: doctor.service_location_id, seo_url: doctor.doctor_seo_url, city: doctor.city, state: doctor.state, market_name: doctor.market_name, type: doctor.business_type })}>Book Appointment</Link>
                                    </>}
                            </div>
                        </div>
                        {doctor.ldjson && <Script type="application/ld+json" id={`ldjson-doctor-card-${doctor.doctor_id}-${doctor.clinic_id}`}>
                            {doctor.ldjson}
                        </Script>
                        }
                    </Link>
                )
            })}
        </div>
    )
}
export default NIsToOneDoctorsSliders;