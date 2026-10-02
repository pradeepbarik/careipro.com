import dynamic from "next/dynamic";
import Link from "next/link";
import { BiGridAlt, BiMessageRoundedDots, BiChevronRight, BiLocationPlus, BiBuildings, BiInfoCircle, BiBriefcase, BiMoney, BiTagAlt, BiPhone, BiLogoWhatsapp } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { TDoctorDetail, TDoctorvailableData } from "@/lib/types/doctor";
import { doctorProfilePic, clinicProfilePic, doctorSpecialityIcon } from "@/lib/image";
import { capitalizeFirstLetter, formatCurrency, showMaskedMobile } from "@/lib/helper/format-text";
import { doctorDetailPageUrl, cityPageLink } from "@/lib/helper/link";
import { TsearchParams } from "../types";
import { userSecreateKey } from "@/constants/storage_keys";
import Announcements from "@/app/components/mobile/doctors/doctor-detail/announcements";
import LikeShare from "@/app/components/mobile/doctors/doctor-detail/like-share";
import ClickableImage from "@/app/components/mobile/image";
import TrackedNavLink from "@/app/components/client-components/tracked-nav-link";
import TrackedLink from "@/app/components/client-components/tracked-link";
import BookingPanel from "./booking-panel";
import StickyActionBar, { TPrimaryAction } from "./sticky-action-bar";
import { getSendEnquiryWhatsappMessage } from "../mobile";
import { hirePersonalAssistantPageUrl } from "@/lib/helper/link";

const BOOKING_PANEL_ID = "booking-panel";

const OverView = dynamic(() => import("../mobile/overview"));
const MediaContent = dynamic(() => import("../mobile/media-content"));
const SimilarBusieness = dynamic(() => import("../mobile/similar-doctors"));
const Reviews = dynamic(() => import("../mobile/reviews"));

const DoctorDetailDesktop = ({ data, availableData, searchParams, cookies }: {
    data: TDoctorDetail,
    availableData: TDoctorvailableData,
    searchParams: TsearchParams,
    cookies: Record<string, any>
}) => {
    const pageUrl = doctorDetailPageUrl({ doctor_id: data.doctor_id, service_loc_id: data.id, clinic_id: data.clinic_id, seo_url: data.seo_url, state: data.clinic_state, city: data.clinic_city, market_name: data.clinic_market, type: data.business_type });
    const subPage = (searchParams.sub_page || "").toLowerCase();
    //a booking that is temporarily closed reads as an announcement, same as on mobile
    const combinedAnnouncements = [
        ...(data.settings.emergency_booking_close == 1 && data.settings.booking_close_message ? [{
            title: 'Temporarily Booking Closed',
            message: data.settings.booking_close_message,
            created_at: 'booking-close-alert',
            expiry_date: '',
            expiry_type: 'forever' as const,
        }] : []),
        ...(data.announcements || []),
    ];
    /* the bar's main button follows the same branching the booking rail does, worked out once here
       so the two can never offer the visitor different routes to an appointment */
    const primaryAction: TPrimaryAction = data.settings.book_by === "call"
        ? { kind: 'call', label: 'CALL NOW', href: `tel:${data.clinic_mobile}` }
        : (data.settings.book_by === "manually" && data.settings.prime_member_only_booking == 1)
            ? { kind: 'link', label: 'Hire Assistant & Book', href: hirePersonalAssistantPageUrl(data.clinic_state, data.clinic_city) }
            : !cookies[userSecreateKey]
                ? { kind: 'link', label: 'Login & Book', href: `/login?redirect_url=${data.seo_dt.seo_url}` }
                //the form is on this page, so the button takes them to it rather than to another url
                : { kind: 'scroll-to-booking', label: 'Book Appointment' };

    const tabClass = (active: boolean) => `flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold fs-14 whitespace-nowrap transition-colors ${active ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-700 hover:border-primary hover:text-primary'}`;

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="max-w-7xl mx-auto px-4 py-5">
                <nav aria-label="Breadcrumb" className="flex items-center gap-1 fs-13 text-gray-500 mb-3">
                    <Link href="/" className="hover:text-primary">Careipro</Link>
                    <BiChevronRight className="shrink-0" />
                    <Link href={cityPageLink(data.clinic_state, data.clinic_city)} className="hover:text-primary">{capitalizeFirstLetter(data.clinic_city)}</Link>
                    <BiChevronRight className="shrink-0" />
                    <Link href={`/${data.clinic_state}/${data.clinic_city}/best-doctors`} className="hover:text-primary">Doctors</Link>
                    <BiChevronRight className="shrink-0" />
                    <span className="text-gray-700 font-medium truncate">{data.doctor_name}</span>
                </nav>

                <div className="grid grid-cols-[7fr_3fr] gap-5 items-start">
                    <div className="min-w-0">
                        {/* profile header */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5 flex gap-5">
                            <div className="w-32 shrink-0">
                                <ClickableImage
                                    src={doctorProfilePic(data.profile_pic)}
                                    alt={`${data.doctor_name}${data.specialty ? ` - ${data.specialty}` : ''} in ${data.clinic_city}`}
                                    className="h-32 w-32 rounded-lg object-cover"
                                />
                                {/* sits under the photo, it belongs to where the doctor practises
                                    rather than to their name. wraps because the column is narrow */}
                                {data.branded_hospital && (
                                    <span className="mt-2 flex items-start justify-center gap-1 fs-12 font-bold text-amber-800 bg-amber-50 border border-amber-200 rounded-md px-1.5 py-1 text-center leading-tight">
                                        <BiBuildings className="shrink-0 mt-0.5" />
                                        <span className="min-w-0">{data.branded_hospital}</span>
                                    </span>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start gap-3">
                                    <div className="min-w-0">
                                        <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                                            {data.doctor_name}{data.specialty ? ` - ${data.specialty}` : ''}
                                        </h1>
                                        {data.position && <p className="text-gray-600 mt-0.5">{data.position}</p>}
                                        {data.qualification_disp && <p className="fs-14 text-gray-500">{data.qualification_disp}</p>}
                                    </div>
                                    <div className="ml-auto shrink-0 flex flex-col items-end gap-2">
                                        <LikeShare total_liked={data.total_liked || 0} url={pageUrl} doctor_name={data.doctor_name} position={data.position || data.qualification_disp} clinic_name={data.clinic_name} service_charge={data.service_charge} doctor_id={data.doctor_id} clinic_id={data.clinic_id} />
                                        {/* reaching the clinic belongs beside who the doctor is,
                                            the rail next to it is only about booking */}
                                        <div className="flex items-center gap-2">
                                            {data.clinic_mobile && (
                                                <TrackedLink
                                                    href={`tel:${data.clinic_mobile}`}
                                                    ev_nm="call_click"
                                                    section_name="profile_header"
                                                    className="flex items-center gap-1.5 border border-teal-600 text-teal-600 font-semibold fs-13 rounded-lg px-3 py-1.5 hover:bg-teal-50 transition-colors whitespace-nowrap"
                                                >
                                                    <BiPhone className="text-base" />{showMaskedMobile(data.clinic_mobile)}
                                                </TrackedLink>
                                            )}
                                            {data.whatsapp_number && (
                                                <TrackedLink
                                                    href={`https://wa.me/${data.whatsapp_number}?text=${encodeURI(getSendEnquiryWhatsappMessage(data.doctor_name))}`}
                                                    ev_nm="whatsapp_click"
                                                    section_name="profile_header"
                                                    className="flex items-center gap-1.5 border border-green-500 text-green-700 font-semibold fs-13 rounded-lg px-3 py-1.5 hover:bg-green-50 transition-colors whitespace-nowrap"
                                                >
                                                    <BiLogoWhatsapp className="text-base" />WhatsApp
                                                </TrackedLink>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* the three numbers a visitor compares, read across in one glance */}
                                <div className="grid grid-cols-3 divide-x divide-line-light rounded-xl bg-gray-50 mt-4 py-2.5 text-center">
                                    <div className="flex flex-col leading-tight">
                                        <span className="fs-15 font-semibold text-gray-900 flex items-center justify-center gap-1">
                                            <BiBriefcase className="text-primary" />{data.experience}+ yrs
                                        </span>
                                        <span className="fs-12 text-muted">Experience</span>
                                    </div>
                                    <div className="flex flex-col leading-tight">
                                        <span className="fs-15 font-semibold text-gray-900 flex items-center justify-center gap-1">
                                            <BiMoney className="text-primary" />{formatCurrency(parseInt(data.service_charge))}
                                        </span>
                                        <span className="fs-12 text-muted">Consulting fee</span>
                                    </div>
                                    <div className="flex flex-col leading-tight">
                                        <span className="fs-15 font-semibold text-gray-900 flex items-center justify-center gap-1">
                                            <AiFillStar className="text-amber-400" />{data.rating || '—'}
                                        </span>
                                        <span className="fs-12 text-muted">
                                            {data.rating_count ? `${data.rating_count} ratings` : 'No ratings yet'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {combinedAnnouncements.length > 0 && (
                            <div className="mt-4"><Announcements announcements={combinedAnnouncements} /></div>
                        )}

                        {/* one card of divided rows rather than separate boxes, so the label column
                            lines up and each row reads as somewhere the visitor can go */}
                        <div className="bg-white rounded-xl border border-gray-200 mt-4 divide-y divide-line-light overflow-hidden">
                            {data.specialization && (
                                <div className="flex items-center gap-3 px-4 py-3">
                                    <span className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-lg">
                                        <BiTagAlt className="rotate-90" />
                                    </span>
                                    <span className="flex flex-col min-w-0 flex-1 leading-snug">
                                        <span className="fs-12 font-medium text-muted uppercase tracking-wide">Specialization</span>
                                        <span className="fs-14 font-medium text-gray-900">
                                            {data.specialization.split(',').map((s) => s.trim()).filter(Boolean).join(', ')}
                                        </span>
                                    </span>
                                </div>
                            )}
                            {data.clinic_id > 0 && (
                                <Link href={data.clinic_dtlpg_url || ''} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                                    <img src={clinicProfilePic(data.clinic_logo || "")} alt={`${data.clinic_name} Logo`} className="h-9 w-9 rounded-full object-cover bg-gray-100 shrink-0" />
                                    <span className="flex flex-col min-w-0 flex-1 leading-snug">
                                        <span className="fs-12 font-medium text-muted uppercase tracking-wide">Clinic</span>
                                        <span className="fs-14 font-semibold text-gray-900 truncate">{data.clinic_name}</span>
                                    </span>
                                    {data.other_doc_cnt && data.other_doc_cnt > 0 ? (
                                        <span className="fs-13 font-semibold text-primary whitespace-nowrap">
                                            +{data.other_doc_cnt} {data.other_doc_cnt > 1 ? 'doctors' : 'doctor'}
                                        </span>
                                    ) : null}
                                    <BiChevronRight className="text-xl text-gray-400 shrink-0" />
                                </Link>
                            )}
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`https://www.google.com/maps/dir/?api=1&destination=${data.location_lat},${data.location_lng}`}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                            >
                                <span className="h-9 w-9 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 text-lg">
                                    <BiLocationPlus />
                                </span>
                                <span className="flex flex-col min-w-0 flex-1 leading-snug">
                                    <span className="fs-12 font-medium text-muted uppercase tracking-wide">Location</span>
                                    <span className="fs-14 font-medium text-gray-900 truncate">
                                        {[data.clinic_location, data.clinic_locality, data.clinic_market].filter(Boolean).join(', ')}
                                    </span>
                                </span>
                                <span className="fs-13 font-semibold text-primary whitespace-nowrap">Directions</span>
                                <BiChevronRight className="text-xl text-gray-400 shrink-0" />
                            </a>
                        </div>

                        {data.active == 0 && (
                            <div className="mt-4 px-4 py-4 bg-orange-50 border border-orange-200 rounded-xl">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                        <BiInfoCircle className="text-orange-500 text-xl" />
                                    </span>
                                    <div>
                                        <p className="font-semibold text-gray-800">Doctor Not Available</p>
                                        <p className="fs-13 text-gray-500">Currently not accepting appointments</p>
                                    </div>
                                </div>
                                <p className="fs-14 text-gray-600">{`Don't worry! You can consult with other qualified doctors in ${data.clinic_city}.`}</p>
                            </div>
                        )}

                        {/* same sub_page urls as mobile, each one stays its own indexable page */}
                        <div className="flex items-center gap-2 mt-5 flex-wrap">
                            <Link href={pageUrl} className={tabClass(!subPage)}>
                                <BiGridAlt />Overview
                            </Link>
                            {(data.allSpecializations["DISEASE"] || []).length > 0 && (
                                <TrackedNavLink href={`${pageUrl}/expert-in-disease-treatment`} ev_nm="tab_click" section_name="expertise_in" className={tabClass(subPage === "expert-in-disease-treatment")}>
                                    <img src="/icon/disease-treatment2.png" alt="" className="h-5 w-5 rounded-full" />Expertise In
                                </TrackedNavLink>
                            )}
                            {data.media && data.media.length > 0 && (
                                <TrackedNavLink href={`${pageUrl}/treatment-photos`} ev_nm="tab_click" section_name="treatment_photos" className={tabClass(subPage === "treatment-photos")}>
                                    <img src="/icon/treatment-photo-and-videos.png" alt="" className="h-5 w-5 rounded-full" />Treatment Photos
                                </TrackedNavLink>
                            )}
                            {data.settings.show_patients_feedback ? (
                                <TrackedNavLink href={`${pageUrl}/patient-reviews`} ev_nm="tab_click" section_name="reviews" className={tabClass(subPage === "patient-reviews")}>
                                    <BiMessageRoundedDots />Reviews
                                </TrackedNavLink>
                            ) : null}
                        </div>

                        <div className="mt-4">
                            {subPage === "treatment-photos" ? (
                                <MediaContent data={data.media} categories={data.media_category} bookingInfo={{
                                    bookBy: data.settings.book_by,
                                    pageUrl,
                                    clinicMobile: data.clinic_mobile,
                                    isLoggedIn: !!cookies[userSecreateKey],
                                    loginRedirectUrl: data.seo_dt.seo_url,
                                }} />
                            ) : subPage === "expert-in-disease-treatment" ? (
                                <div className="bg-white rounded-xl border border-gray-200 p-5">
                                    <div className="grid grid-cols-3 gap-3">
                                        {(data.allSpecializations["DISEASE"] || []).map((cat) => (
                                            <div key={cat.seo_id} className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg">
                                                <img src={doctorSpecialityIcon(cat.icon) || "/icon/disease-defult-icon.png"} alt="" className="w-9 h-9" />
                                                <span className="fs-14 text-gray-700">{cat.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                    {data.treated_health_conditions && data.treated_health_conditions.length > 0 && (
                                        <>
                                            <h2 className="font-bold text-gray-800 mt-5 mb-2">Treated Top Health Conditions</h2>
                                            <div className="grid grid-cols-3 gap-2">
                                                {data.treated_health_conditions.map((condition, idx) => (
                                                    <span key={idx} className="dot fs-14 text-gray-700">{condition.condition}</span>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                    {data.treatments_available && data.treatments_available.length > 0 && (
                                        <>
                                            <h2 className="font-bold text-gray-800 mt-5 mb-2">Available Treatments</h2>
                                            <div className="grid grid-cols-3 gap-2">
                                                {data.treatments_available.map((treatment, idx) => (
                                                    <span key={idx} className="dot fs-14 text-gray-700">{treatment}</span>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : subPage === "patient-reviews" ? (
                                <Reviews state={searchParams.state} city={searchParams.city} service_loc_id={data.id} rating={data.rating || 0} rating_count={data.rating_count || 0} review_count={data.review_count || 0} doctor_id={data.doctor_id} clinic_id={data.clinic_id} />
                            ) : (
                                <OverView data={data} availableData={availableData} />
                            )}
                        </div>

                        {(data.similar_doctors || []).length > 0 && (
                            <div className="mt-5">
                                <SimilarBusieness heading={`Similar Doctors in ${capitalizeFirstLetter(data.clinic_city)}`} similar_doctors={data.similar_doctors || []} />
                            </div>
                        )}
                    </div>

                    {/* booking stays in view the whole way down the profile */}
                    <aside id={BOOKING_PANEL_ID} className="min-w-0 sticky top-[104px]">
                        <BookingPanel data={data} availableData={availableData} cookies={cookies} pageUrl={pageUrl} />
                    </aside>
                </div>
            </main>
            {/* turns up once the profile header has scrolled away, so the actions are never lost */}
            <StickyActionBar
                doctorName={data.doctor_name}
                specialty={data.specialty || data.position}
                photo={doctorProfilePic(data.profile_pic)}
                fee={formatCurrency(parseInt(data.service_charge))}
                clinicMobile={data.clinic_mobile}
                whatsappNumber={data.whatsapp_number}
                whatsappMessage={getSendEnquiryWhatsappMessage(data.doctor_name)}
                primaryAction={primaryAction}
                bookingPanelId={BOOKING_PANEL_ID}
            />
            {/* the bar floats over the page, this keeps it clear of the last of the footer */}
            <div className="h-20" aria-hidden="true"></div>
        </div>
    );
};

export default DoctorDetailDesktop;
