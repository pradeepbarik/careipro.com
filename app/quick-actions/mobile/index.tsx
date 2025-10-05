import Header from "@/app/components/mobile/header";
import { SectionHeading } from "@/app/components/mobile/ui";
import Link from "next/link";
import { BiCheckCircle } from "react-icons/bi";
import { getIconUrl } from "@/lib/image";
const QuickActionsPageMobile = ({ cookies }: { cookies: Record<string, any> }) => {
    return <>
        <Header template="SUBPAGE" heading="All Options" rightContainer={<>
            <Link href={""} className="button rounded-full ml-auto py-1" data-variant="outlined" data-color="secondary">Looking Franchise?</Link>
        </>} />
        <div className="min-h-28 rounded-lg" style={{ backgroundImage: `url(${getIconUrl("hospital-background.jpeg")})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <h2 className="text-white text-lg font-semibold text-center">Effortless Patient Management Software</h2>
            <div className="flex">
                <div className="px-2 py-2 color-white font-normal">
                    <span className="flex items-baseline gap-1">
                        <BiCheckCircle className="text-green-500" />OPD Management System(OMS)
                    </span>
                    <span className="flex items-center gap-1">
                        <BiCheckCircle className="text-green-500" />Clinic Management System(CMS)
                    </span>
                    <span className="flex items-center gap-1">
                        <BiCheckCircle className="text-green-500" />Hospital Management System(HMS)
                    </span>
                </div>
                <div className="grow flex p-2">
                    <Link href={"/Register-clinic-hospital"} title="Best patient,clinic,hospital management software for healthcare service providers" className="button rounded-full py-1 mt-auto ml-auto" data-color="secondary" data-variant="outlined">Explore Now</Link>
                </div>
            </div>
        </div>
        <SectionHeading heading="We are Hiring Delivery Staffs :" />
        <div className='px-2'>
            <div className="flex bg-white shadow-grey-400 shadow rounded-lg overflow-hidden">
                <div className="grow-[1] shrink-0 basis-0">
                    <img src={getIconUrl("delivery-partner.jpg")} className="w-full" />
                </div>
                <div className="grow-[1] shrink-0 basis-0 py-2 pr-2 flex flex-col">
                    <h2 className="fs-18 font-semibold">Delivery Partner</h2>
                    <div className="font-semibold color-text-light">
                        <span className="flex items-baseline gap-1">
                            <BiCheckCircle className="text-green-500" /> Medicine Delivery
                        </span>
                        <span className="flex items-center gap-1">
                            <BiCheckCircle className="text-green-500" /> Food for Patients
                        </span>
                        <span className="flex items-center gap-1">
                            <BiCheckCircle className="text-green-500" /> Medical Document
                        </span>
                    </div>
                    <div className="self-center mt-auto">
                        <Link href={`${cookies["state"]}/apply-for-delivery-staff-jobs-in-${cookies['city']}/FORM-29`} title={`Delivery Staff jobs in ${cookies['city']}`} className="button ripple">Apply Now</Link>
                    </div>
                </div>
            </div>
            <SectionHeading heading="Join with us :" />
            <div className="grid grid-cols-3 gap-2">
                <Link href={`${cookies["state"]}/hire-caretaker-in-${cookies['city']}/FORM-25`} title={`Caretaker jobs in ${cookies['city']}`} className="bg-white rounded-lg overflow-hidden border border-gray-300 py-1 flex flex-col">
                    <div className="text-sm text-center font-semibold underline">Caretaker</div>
                    <img src={getIconUrl("female-caretaker.webp")} alt="Caretaker jobs" />
                    <div className="px-2 mt-auto">
                        <button className="button rounded-full py-1 w-full" data-color="secondary" data-variant="outlined">Join Now</button>
                    </div>
                </Link>
                <Link href={`${cookies["state"]}/hiring-massage-therapist-for-senior-citizens-in-${cookies['city']}/FORM-27`} title={`Massage jobs in ${cookies['city']}`} className="bg-white rounded-lg overflow-hidden border border-gray-300 py-1 flex flex-col">
                    <div className="text-sm text-center font-semibold underline">Massage</div>
                    <img src={getIconUrl("massage-male.jpeg")} alt="Massage Therapist jobs" />
                    <div className="px-2 mt-auto">
                        <button className="button rounded-full py-1 w-full" data-color="secondary" data-variant="outlined">Join Now</button>
                    </div>
                </Link>
                <Link href={`${cookies["state"]}/join-blood-donor-group-in-${cookies['city']}/FORM-28`} title={`Blood Donor in ${cookies['city']}`} className="bg-white rounded-lg overflow-hidden border border-gray-300 py-1 flex flex-col">
                    <div className="text-sm text-center font-semibold underline">Blood Donor</div>
                    <img src={getIconUrl("blood-donor.jpg")} alt="Blood Donor" />
                    <div className="px-2 mt-auto">
                        <button className="button rounded-full py-1 w-full" data-color="secondary" data-variant="outlined">Register Now</button>
                    </div>
                </Link>
            </div>
            <SectionHeading heading="Are you loooking for jobs in clinic or hospital?" />
            <div className="flex bg-white shadow-grey-400 shadow rounded-lg overflow-hidden">
                <div className="grow-[1] shrink-0 basis-0">
                    <img src={getIconUrl("medical-staff.jpg")} className="w-full" />
                </div>
                <div className="grow-[1] shrink-0 basis-0 py-2 pr-2 flex flex-col">
                    <div className="font-semibold color-text-light">
                        <span className="flex items-baseline gap-1">
                            <BiCheckCircle className="text-green-500" /> Staff Nurse
                        </span>
                        <span className="flex items-center gap-1">
                            <BiCheckCircle className="text-green-500" /> Patient Assistant
                        </span>
                        <span className="flex items-center gap-1">
                            <BiCheckCircle className="text-green-500" /> Receptionist / Billing
                        </span>
                        <span className="flex items-center gap-1">
                            <BiCheckCircle className="text-green-500" /> laboratory Technician
                        </span>
                    </div>
                    <div className="self-center mt-auto">
                        <Link href={`${cookies["state"]}/apply-for-medical-staff-jobs-in-${cookies['city']}/FORM-30`} title={`Apply for medical Staff jobs in ${cookies['city']}`} className="button ripple">Apply Now</Link>
                    </div>
                </div>
            </div>
        </div>
    </>;
};

export default QuickActionsPageMobile;
/**
 * clinic register
 * open jobs
 * physiotherapy center
 * massage center
 * caretaker
 * looking for franchise
 * 
 */