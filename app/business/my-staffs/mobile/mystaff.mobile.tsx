'use client'
import Link from "next/link";
import { BiLogoWhatsapp, BiPhone, BiTask,BiPencil } from "react-icons/bi";
import Header from "@/app/components/mobile/header";
import AddNewStaff from '@/app/business/my-staffs/mobile/add-new-staff';
import useMystaffs from "@/lib/hooks/business/useMystaff";
import { doctorProfilePic } from '@/lib/image';
import { formatDoctorName, doctorType, capitalizeFirstLetter } from '@/lib/helper/format-text';
const MystaffMobile = () => {
    const { staffs, refreshStaffsList } = useMystaffs({ loadStaffList: true });
    return (
        <>
            <Header template="SUBPAGE" heading="My Staffs" />
            <div>
                {staffs.map((staff) =>
                    <div key={staff.id} className="shadow-md py-1 mb-2">
                        <div className="flex gap-2 px-2">
                            <div className="">
                                <img src={doctorProfilePic(staff.image || "")} className="w-20 h-20 rounded-full" />
                            </div>
                            <div className="grow">
                                <p className="flex">
                                    <span className="font-semibold fs-17 ">
                                        {formatDoctorName(staff.name, staff.business_type)}
                                    </span>
                                    <span className="ml-auto flex gap-2">
                                        <span className="badge fs-13">
                                            {doctorType(staff.business_type)}
                                        </span>
                                        {staff.active == 1 ?
                                            <span className="badge font-semibold fs-13 flex color-primary">
                                                <span className="dot color-primary"></span>
                                                Active
                                            </span> :
                                            <span className="badge fs-13 font-semibold flex color-secondary">
                                                <span className="dot color-secondary"></span>
                                                In active
                                            </span>
                                        }
                                    </span>

                                </p>
                                <p className="font-semibold fs-15 color-text-light">{staff.position}</p>
                                <div className="flex gap-2">
                                    <span className="dot">{capitalizeFirstLetter(staff.gender)}</span>
                                    <span className="dot">{staff.experience} Years of Exp.</span>
                                </div>
                            </div>
                        </div>
                        {(staff.business_type === "DOCTOR" || staff.business_type === "PHYSIOTHERAPY") ?
                            <div className="flex gap-4 mt-2 px-2">
                                <Link href={``} className='button grow flex items-center gap-2 py-1 basis-0 shrink-0'>
                                    <BiTask />Patients
                                </Link>
                                <Link href={``} className='button grow flex items-center gap-2 py-1 basis-0 shrink-0'>
                                    <BiTask />Book Appointment
                                </Link>
                            </div> :
                            <div className="flex gap-4 mt-2 px-2">
                                <a href={`tel:${staff.mobile}`} className='button grow flex items-center gap-2 py-1 shrink-0 basis-0'>
                                    <BiPhone />Call Now
                                </a>
                                <Link href={``} className='button grow flex items-center gap-2 py-1 shrink-0 basis-0'>
                                    <BiTask />Jobs
                                </Link>
                                <Link href={``} className='button grow flex items-center gap-2 py-1 shrink-0 basis-0'>
                                    <BiPencil />Edit Profile
                                </Link>
                            </div>
                        }
                    </div>
                )}
            </div>
            <AddNewStaff onComplete={refreshStaffsList} />
        </>
    )
}
export default MystaffMobile;