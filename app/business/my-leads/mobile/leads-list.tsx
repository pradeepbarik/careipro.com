'use client'
import { BiCaretDown, BiBell, BiUser, BiTime, BiUserPlus, BiUserCheck, BiMessageRoundedDots, BiLogoWhatsapp, BiMap, BiPhone } from "react-icons/bi";
import { Button, PriceFormat, SlideUpModal } from '@/app/components/mobile/ui';
import useMyLeads from "@/lib/hooks/business/useMyleads";
import { doctorType, formatDoctorName, capitalizeFirstLetter } from '@/lib/helper/format-text';
import { doctorProfilePic } from '@/lib/image';
import moment, { get_current_datetime } from '@/lib/helper/date-time';
const today = moment(get_current_datetime()).format("Y-MM-DD");
const getDisplayTime = (time: string) => {
    if (today === moment(time).format("Y-MM-DD")) {
        return `Today ${moment(time).format("hh:mm a")}`
    } else if (moment(today).diff(moment(time), "days") == -1) {
        return `Tomorrow ${moment(time).format("hh:mm a")}`
    }
    return moment(time).format("d MMM hh:mm a")
}
const LeadsList = () => {
    const { filter, setFilter, leads, acceptingLeadData, showAcceptmodal, setShowAcceptModal, onAcceptLeadBtnClick, acceptLead, showAssignDoctorModal, setShowAssignDoctorModal, assignDoctorBtnClick, staffsObj, assignStaff } = useMyLeads();
    return (
        <>
            <div className="flex px-2 mt-2">
                <div className="flex overflow-auto gap-2">
                    <span className={`chip gap-1 ${filter.status === 'requested' ? 'selected' : ''}`} onClick={() => { setFilter({ ...filter, status: "requested" }) }}>Open Leads</span>
                    {/* <span className="chip gap-1">Create time <BiCaretDown /></span> */}
                    {/* <span className="chip gap-1">Service Time <BiCaretDown /></span> */}
                    <span className={`chip gap-1 ${filter.status === 'accepted' ? 'selected' : ''}`} onClick={() => { setFilter({ ...filter, status: "accepted" }) }}>Accepted</span>
                </div>
            </div>
            {leads.length > 0 ?
                <>
                    <div className="mt-2">
                        {leads.map((lead, i) =>
                            <div key={lead.id} className="shadow-md mb-1 py-2 px-2 bg-white" >
                                <div>
                                    <div className="flex">
                                        <span className="badge font-semibold color-primary">
                                            {lead.service_name}
                                        </span>
                                        <span className="font-semibold inline-flex items-center gap-1 border border-color-grey rounded-md px-2 ml-2">
                                            <BiTime />
                                            <span>{getDisplayTime(lead.service_time)}</span>
                                        </span>
                                        <span className="font-semibold fs-16 ml-2">
                                            <PriceFormat displayZeroval={false} amount={parseInt(lead.service_price || "0") + parseInt(lead.lead_charge || "0")} />
                                        </span>
                                    </div>
                                    <div className="mt-2 flex items-center gap-2">
                                        <BiUser />
                                        <span className="font-semibold color-text-light fs-17">{lead.patient_name} </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <BiMap />
                                        <span className="fs-14"> {lead.area},{lead.landmark},{lead.sub_dist},{lead.city}</span>
                                    </div>
                                    {lead.comment &&
                                        <div className="flex items-center gap-1">
                                            <BiMessageRoundedDots />
                                            <span className="fs-14">{lead.comment}</span>
                                        </div>
                                    }
                                </div>
                                {(lead.doctor_id && staffsObj[lead.doctor_id]) ?
                                    <>
                                        <div className="font-semibold">Assigned To</div>
                                        <div className="flex gap-2">
                                            <img src={doctorProfilePic(staffsObj[lead.doctor_id].image || "")} className="w-10 h-10 rounded-full" />
                                            <span className="fs-16 font-semibold">{formatDoctorName(staffsObj[lead.doctor_id].name, staffsObj[lead.doctor_id].business_type)}</span>
                                        </div>
                                    </> : (!lead.doctor_id && lead.status === "accepted") ? <>
                                        <div className="flex items-center border rounded-md gap-2 px-1 py-2 bg-pink-200">
                                            <BiBell className="text-xl" />
                                            <span className="font-semibold fs-14">{doctorType(lead.vertical)} not assigned yet</span>
                                        </div>
                                    </> : <>
                                    </>}
                                <div className='flex gap-2 px-2 mt-2'>
                                    <a className='button grow flex items-center gap-2' data-variant="outlined">
                                        <BiLogoWhatsapp />WhatsApp
                                    </a>
                                    <a href={`tel:${lead.patient_mobile}`} className='button grow flex items-center gap-2' data-variant="outlined">
                                        <BiPhone />Call Now
                                    </a>
                                    {lead.status === "requested" &&
                                        <button className='button grow' onClick={() => { onAcceptLeadBtnClick(lead, i) }}>Accept Job</button>
                                    }
                                    {(lead.status === "accepted" && !lead.doctor_id) &&
                                        <button className='button grow' onClick={() => { assignDoctorBtnClick(lead,i) }}>
                                            <BiUserPlus className="text-xl" />
                                            Assign {doctorType(lead.vertical)}
                                        </button>
                                    }
                                    {(lead.status === "accepted" && lead.doctor_id) &&
                                        <button className='button grow' onClick={() => { assignDoctorBtnClick(lead,i) }}>
                                            <BiUserPlus className="text-xl" />
                                            Change {doctorType(lead.vertical)}
                                        </button>
                                    }
                                </div>
                            </div>
                        )}
                    </div>
                </> :
                <>
                    <div>
                        <img src="/icon/no-data.svg" className="mt-10" />
                    </div>
                </>}

            <SlideUpModal open={showAcceptmodal} heading="Accept Job" onClose={() => { setShowAcceptModal(false) }}>
                <>
                    {(acceptingLeadData?.vertical === "RELAXATION" || acceptingLeadData?.vertical === "CARETAKER" || acceptingLeadData?.vertical === "PHYSIOTHERAPY")}
                    <div className="flex gap-2">
                        <div className="button flex-col grow" data-variant="outlined" onClick={() => {setShowAssignDoctorModal(true) }}>
                            <span className="fs-12">Assign {doctorType(acceptingLeadData?.vertical || "")} &</span>
                            <span>Accept</span>
                        </div>
                        <div className="button flex-col grow" onClick={() => { acceptLead() }}>
                            <span className="fs-12">Assign {doctorType(acceptingLeadData?.vertical || "")} Later</span>
                            <span>Now Accept</span>
                        </div>
                    </div>
                </>
            </SlideUpModal>
            <SlideUpModal heading={`Assign ${doctorType(acceptingLeadData?.vertical || "")}`} open={showAssignDoctorModal} onClose={() => { setShowAssignDoctorModal(false) }}>
                <>
                    {Object.keys(staffsObj).map((id) => {
                        let staff = staffsObj[parseInt(id)];
                        return (
                            <div key={id} className="shadow-md py-1 mb-2">
                                <div className="flex gap-2 px-2">
                                    <div className="">
                                        <img src={doctorProfilePic(staff.image || "")} className="w-20 h-20 rounded-full" />
                                    </div>
                                    <div className="grow">
                                        <p className="flex font-semibold fs-17">
                                            {formatDoctorName(staff.name, staff.business_type)}
                                            {acceptingLeadData?.doctor_id === staff.id &&
                                                <span className="font-semibold inline-flex items-center gap-1 border border-color-grey rounded-md px-2 ml-auto fs-13 color-secondary">
                                                    <BiUserCheck className="fs-17" />
                                                    <span>Assigned</span>
                                                </span>
                                            }
                                        </p>
                                        <div className="flex">
                                            <div>
                                                <p className="font-semibold fs-15 color-text-light">{staff.position}</p>
                                                <div className="flex gap-2">
                                                    <span className="dot">{capitalizeFirstLetter(staff.gender)}</span>
                                                    <span className="dot">{staff.experience} Years of Exp.</span>
                                                </div>
                                            </div>
                                            {acceptingLeadData?.doctor_id !== staff.id &&
                                                <div className="ml-auto flex items-center">
                                                    <button className="button py-1" onClick={() => { assignStaff(staff.id) }}>Assign</button>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </>
            </SlideUpModal>
        </>
    )
}
export default LeadsList;