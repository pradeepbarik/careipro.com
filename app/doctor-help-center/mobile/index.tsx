import Header from "../../components/mobile/header";
import { TDoctorDetail } from "@/lib/types/doctor";
import Image from "next/image";
import { FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { doctorProfilePic } from "@/lib/image";
import { formatDoctorName } from "@/lib/helper/format-text";
import {support_no} from "@/constants/site-config";
import Link from "next/link";
import BreadCrumbs from "../../components/mobile/breadcrumb";
import RatingCard from "./rating-card";
import SendEnquiry from "./send-enquiry";
const DoctorHelpCenterMobile = ({ data, searchParams }: { data: TDoctorDetail, searchParams: any }) => {
    return (
        <>
            <Header heading={`${data.doctor_name} - Help Center`} template="SUBPAGE" />
            <div className="p-4 max-w-md mx-auto">
                {/* Banner */}
                <div className="mb-4 rounded-lg relative overflow-hidden shadow py-2" style={{ background: "linear-gradient(45deg, #f3dfdf, #fbfff0)" }}>
                    <div className="flex items-center w-full h-full px-4">
                        <div className="flex-1">
                            <div className="text-xl font-bold text-black-900 mb-1">Need Help?</div>
                            <div className="text-sm text-black-800 mb-2">
                                Reach out for any assistance
                                regarding your appointments, reports, or clinic services.
                            </div>
                        </div>
                        <div className="flex-shrink-0 ml-4">
                            <Image
                                src={doctorProfilePic(data.profile_pic)}
                                alt={data.doctor_name}
                                width={64}
                                height={64}
                                className="rounded-full border-2 border-orange-400 bg-white object-cover w-16 h-16"
                            />
                            {/* <div>{formatDoctorName(data.doctor_name)}</div> */}
                        </div>
                    </div>
                    <div className="text-right absolute bottom-0 right-2 dot">{formatDoctorName(data.doctor_name)}</div>
                </div>
                {/* CTA Buttons */}
                <div className="flex gap-4 mb-6 justify-center">
                    <a
                        href={`tel:${data.clinic_mobile}`}
                        className="flex-1 border border-teal-500 rounded py-2 font-semibold text-center shadow flex items-center justify-center gap-2"
                    >
                        <FiPhone className="text-lg" />
                        Contact with clinic
                    </a>
                    <a
                        href={`https://wa.me/${data.clinic_mobile}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-green-500 text-white rounded py-2 font-semibold text-center shadow flex items-center justify-center gap-2"
                    >
                        <FaWhatsapp className="text-lg" />
                        WhatsApp to clinic
                    </a>
                </div>

                {/* Clinic Staff Profiles */}
                {/* <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Clinic Staff</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {staffProfiles.map((staff, idx) => (
              <div key={idx} className="flex flex-col items-center min-w-[100px]">
                <div className="w-16 h-16 rounded-full overflow-hidden border mb-2">
                  <Image
                    src={staff.image}
                    alt={staff.name}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-sm font-medium text-center">{staff.name}</span>
                <span className="text-xs text-gray-500 text-center">{staff.role}</span>
              </div>
            ))}
          </div>
        </div> */}

                {/* Enquiry Box */}
                <SendEnquiry state={searchParams.state} city={searchParams.city} businessType={data.business_type} clinic_id={data.clinic_id} doctor_id={data.doctor_id} />
                {/* Share your feedback */}
               <RatingCard clinic_id={data.clinic_id} doctor_id={data.doctor_id} service_loc_id={data.id} />

                <Link href={data.seo_dt.seo_url} className="flex-1 border border-teal-500 rounded py-2 font-semibold text-center shadow flex items-center justify-center mt-3" data-variant="outlined">Book Appointment</Link>

                {/* Common FAQs */}
                <div className="mt-4">
                    <h2 className="text-lg font-semibold mb-3">Common FAQs</h2>
                    <div className="space-y-3">
                        {data.faqs?.mainEntity.map((faq, idx) => (
                            <details key={idx} className="border rounded p-3">
                                <summary className="font-medium cursor-pointer">{faq.name}</summary>
                                <p className="mt-2 text-gray-700 text-sm">{faq.acceptedAnswer?.text}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </div>
            <BreadCrumbs data={[
                {label:"Careipro",href:"https://careipro.com"},
                {label:searchParams.city,href:`https://careipro.com/${searchParams.state}/${searchParams.city}`},
                {label:`Doctors in ${searchParams.city}`,href:`https://careipro.com/${searchParams.state}/${searchParams.city}/best-doctors`},
                {label:formatDoctorName(data.doctor_name),href:data.seo_dt.seo_url},
                {label:"Help Center"}
            ]} />
            <div className='mt-28'>
                <div className='fixed bottom-2 left-0 w-full px-2'>
                    <div className='border rounded-md px-2 py-1 flex' style={{ background: "linear-gradient(-90deg, rgb(198 198 198), rgb(226, 129, 129))" }}>
                        <img src="/icon/customer-support.svg" className='h-16 w-16' />
                        <div className='font-semibold flex flex-col gap-1'>
                            <span className='fs-18 color-white' style={{ lineHeight: "1.3rem" }}>
                                Not getting help?
                            </span>
                            <span className=''>Careipro support is here for you to help</span>
                        </div>
                        <div className='flex items-center ml-auto'>
                            <a href={`tel:${support_no}`} className='bg-red-500 text-white rounded py-2 font-semibold text-center shadow flex items-center justify-center gap-2 ml-auto px-3'>
                                <FiPhone className="text-lg" />
                                Call
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DoctorHelpCenterMobile;