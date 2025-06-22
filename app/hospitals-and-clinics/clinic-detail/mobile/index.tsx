import Link from "next/link";
import Header from "@/app/components/mobile/header";
import ClinicBanner from "@/app/components/mobile/clinics/clinic-banners";
import ClinicDoctors from "@/app/components/mobile/clinics/clinic-doctors";
import AppointmentReminder from '@/app/components/mobile/appointment-reminder';
import Rating from "@/app/components/mobile/ui/rating";
import { TclinicDetail } from '@/lib/hooks/useClinics';
import { clinicProfilePic } from '@/lib/image';
import { doctorsTabDisplayname } from '@/lib/helper/format-text';
import { BsTelephone, BsWhatsapp } from "react-icons/bs";
import { BiHelpCircle, BiGridAlt, BiPhotoAlbum, BiMessageRoundedDots } from "react-icons/bi";
import { clinicDetailpageUrl } from "@/lib/helper/link";
import SendEnquiry from "./send-enquiry";
const ClinicDetailMobile = ({ data, searchParams }: { data: TclinicDetail, searchParams: any }) => {
    const pageUrl = clinicDetailpageUrl({ seo_url: data.clinic_info.seo_url, state: data.clinic_info.state || "", city: data.clinic_info.city, market_name: data.clinic_info.market_name, bid: data.clinic_info.bid })
    return (
        <>
            <Header heading={data.clinic_info.name} template="SUBPAGE" />
            {(data.hasBanner) ?
                <>
                    <ClinicBanner banners={data.banners} profile_pic={data.clinic_info.logo || ""} name={data.clinic_info.name} />
                    <div className="flex items-center gap-2 px-2 bg-white py-2 relative">
                        <img src='/icon/clinic-icon.png' className='w-8 h-8' />
                        <div className="grow flex flex-col">
                            <h2 className={"color-primary fs-17 font-semibold"}>{data.clinic_info.name}</h2>
                            {/* <span>5 Years in healthcare</span> */}
                            <span>
                                {data.clinic_info.locality} {data.clinic_info.market_name},{data.clinic_info.city} &nbsp;
                                {!data.clinic_info.show_patients_feedback &&
                                    <Link href={`https://www.google.com/maps/dir/?api=1&destination=${data.clinic_info.location_lat},${data.clinic_info.location_lng}`} target="_blank" className="color-secondary border border-color-secondary rounded-md px-1 py-1">View on map {'>'}</Link>
                                }
                            </span>
                            {data.clinic_info.show_patients_feedback &&
                                <div className="mt-1">
                                    <Link href={`https://www.google.com/maps/dir/?api=1&destination=${data.clinic_info.location_lat},${data.clinic_info.location_lng}`} target="_blank" className="color-secondary border border-color-secondary rounded-md px-1 py-1">View on map {'>'}</Link>
                                </div>}
                        </div>
                        {data.clinic_info.show_patients_feedback == 1 &&
                            <span className="ml-auto font-bold absolute top-2 right-2 fs-18">
                                <Rating rating={(data.clinic_info.rating || 0) < 3 ? 3.5 : data.clinic_info.rating || 0} />
                            </span>
                        }
                        {/* <Link href={`https://www.google.com/maps/dir/?api=1&destination=${data.clinic_info.location_lat},${data.clinic_info.location_lng}`} target="_blank" className="flex flex-col items-center">
                            <span className="border border-color-primary rounded-md px-2 py-1">
                                <Nearme pathStyle={{ stroke: "var(--primary-color)" }} className="mr-2" />
                            </span>
                            <span className="fs-12 font-semibold">Get Direction</span>
                        </Link> */}
                    </div>
                </>
                :
                <>
                    <div className="flex gap-2 bg-white px-2 py-1">
                        <div>
                            <img src={clinicProfilePic(data.clinic_info.logo || "")} className="h-24 w-24 rounded-lg" />
                        </div>
                        <div className="flex flex-col grow">
                            <span className="font-semibold fs-17 color-primary">{data.clinic_info.name}</span>
                            {/* <span>5 Years in healthcare</span> */}
                            <span>{data.clinic_info.locality} {data.clinic_info.market_name},{data.clinic_info.city}</span>
                        </div>
                    </div>
                </>}
            {/* <div className="bg-white flex px-2 justify-around">
                <a href={`tel:${data.clinic_info.mobile}`} className="flex flex-col justify-center items-center">
                    <BsTelephone className="border rounded-md p-2 w-12 h-10 bg-primary color-white" style={{ fontSize: '2.2rem' }} />
                    <span className="font-semibold text-nowrap">Call Now</span>
                </a>
                {data.clinic_info.whatsapp_number &&
                    <a href={`tel:${data.clinic_info.whatsapp_number}`} className="flex flex-col justify-center items-center">
                        <BsWhatsapp className="border rounded-md p-2 w-12 h-10 bg-primary color-white" style={{ fontSize: '2.2rem', background: "#61AA84" }} />
                        <span className="font-semibold text-nowrap">Message</span>
                    </a>
                }
                <a target="_blank" href={`https://www.google.com/maps/dir/?api=1&destination=${data.clinic_info.location_lat},${data.clinic_info.location_lng}`} className="flex flex-col justify-center items-center">
                    <Nearme className="border rounded-md p-2 w-12 h-10" style={{ fontSize: '2.2rem' }} />
                    <span className="font-semibold text-nowrap">Direction</span>
                </a>
            </div> */}
            <div id="reminder-section"></div>
            {data.clinic_info.enable_enquiry == 1 ?
                <SendEnquiry businessType={data.clinic_info.business_type} state={data.clinic_info.state || ""} city={data.clinic_info.city} clini_id={data.clinic_info.id} />
                : <></>
            }
            <div className="flex overflow-auto px-2 gap-2 hide-scroll-bar mt-2 mb-2">
                {data.totalDoctors > 0 &&
                    <Link href={`${pageUrl}`} className={`text-nowrap border bg-white rounded-md px-2 py-1 pr-6 font-semibold flex items-center ${(searchParams.sub_page == undefined || searchParams.sub_page === "") ? 'bg-primary color-white' : ''}`}>
                        <img src="/icon/male-doctor.svg" className="h-6 w-6 rounded-full bg-white" />
                        <span className="ml-1 fs-16">{doctorsTabDisplayname(data.clinic_info.business_type)}</span>
                    </Link>
                }
                {data.specializations['TESTSCAN'] && <Link href={`${pageUrl}/Lab-Test-And-Scans`} className={`text-nowrap border bg-white rounded-md px-2 py-1 pr-6 font-semibold flex gap-2 items-center ${(searchParams.sub_page == 'Lab-Test-And-Scans') ? 'bg-primary color-white' : ''}`}>
                    <img src="/icon/lab-test-defult.png" className="h-6 w-6 rounded-full bg-white" />
                    <span className="fs-16">Test & Scans</span>
                </Link>}
                {data.specializations['DISEASE'] &&
                    <Link href={`${pageUrl}/Disease-Treatment-Available`} className={`text-nowrap border bg-white rounded-md px-2 py-1 pr-6 font-semibold flex gap-2 items-center ${(searchParams.sub_page === "Disease-Treatment-Available") ? 'bg-primary color-white' : ''}`}>
                        <img src="/icon/disease-treatment2.png" className="h-6 w-6 rounded-full bg-white" />
                        <span className="fs-16">Disease Treatments</span>
                    </Link>
                }
                {/* <Link href={`${pageUrl}/photos`} className={`bg-white border rounded-md font-semibold px-2 py-1 flex items-center shrink-0 gap-1 ${(searchParams.sub_page === "photos") ? 'bg-primary color-white' : ''}`}>
                    <BiPhotoAlbum className="" />
                    <span className="text-nowrap fs-16">Photos</span>
                </Link> */}
                {data.clinic_info.show_patients_feedback == 1 ?
                    <Link href={`${pageUrl}/Patients-Reviews`} className={`bg-white border rounded-md font-semibold px-2 py-1 flex items-center shrink-0 gap-1 ${(searchParams.sub_page === "feedback") ? 'bg-primary color-white' : ''}`}>
                        <BiMessageRoundedDots />
                        <span className="text-nowrap fs-16">Reviews</span>
                    </Link>:<></>
                }
            </div>
            {searchParams.sub_page === "" || searchParams.sub_page === undefined ?
                <ClinicDoctors clinic_info={data.clinic_info} doctors={data.doctors} specializations={data.specializations} />
                : searchParams.sub_page === "Lab-Test-And-Scans" ?
                    <>
                        <div className="px-2 py-2 grid grid-cols-2 gap-2">
                            {(data.specializations["TESTSCAN"] || []).map((cat) =>
                                <div key={cat.seo_id} className="flex items-center gap-2 px-2 py-1 border border-color-grey rounded-md bg-white">
                                    <img src={cat.icon || "/icon/test-scan-defult.png"} className="w-10 h-10" />
                                    <span>{cat.name}</span>
                                </div>
                            )}
                        </div>
                    </>
                    : searchParams.sub_page === "Disease-Treatment-Available" ?
                        <>
                            <div className="px-2 py-2 grid grid-cols-2 gap-2">
                                {(data.specializations["DISEASE"] || []).map((cat) =>
                                    <div key={cat.seo_id} className="flex items-center gap-2 px-2 py-1 border border-color-grey rounded-md bg-white">
                                        <img src={cat.icon || "/icon/disease-defult-icon.png"} className="w-10 h-10" />
                                        <span>{cat.name}</span>
                                    </div>
                                )}
                            </div>
                        </>
                        : searchParams.sub_page === "photos" ?
                            <div className="flex flex-wrap gap-2 p-2">photos</div>
                            : <ClinicDoctors clinic_info={data.clinic_info} doctors={data.doctors} specializations={data.specializations} />
            }
            <AppointmentReminder clinic_id={data.clinic_info.id} position="reminder-section" />
            <div className="mt-16">
                <div className="fixed bottom-0 left-0 w-full bg-white flex gap-2 px-2 py-2">
                    {data.clinic_info.whatsapp_number &&
                        <a href={`https://wa.me/${data.clinic_info.whatsapp_number}?text=${encodeURI("Hi,I found your clinic on careipro")}`} target="_blank" className="button flex-1" data-variant="outlined" style={{ color: "#6EB23B", borderColor: "#6EB23B" }}>
                            <BsWhatsapp className="mr-2" style={{ color: "#6EB23B" }} />
                            Whatsapp
                        </a>
                    }
                    <button className="button ripple flex-1">
                        <BsTelephone className="mr-2" />
                        Contact With Clinic
                    </button>

                    {data.clinic_info.whatsapp_number && false &&
                        <div className="flex items-center">
                            <span className="relative h-10 w-10">
                                <span className="flex items-center justify-cente p-1.5 rounded-full absolute left-4 h-full w-full overflow-hidden" style={{ background: "#6EB23B" }}>
                                    <BsWhatsapp className="h-full w-full color-white" />
                                </span>
                            </span>
                            <span className="border-2 rounded-full px-2 pl-4 fs-15 color-white" style={{ color: "#6EB23B", borderColor: "#6EB23B" }}>Message</span>
                        </div>
                    }
                </div>
            </div>

        </>
    )
}
export default ClinicDetailMobile;