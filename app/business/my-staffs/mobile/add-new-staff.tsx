'use client'
import { BiChevronsRight, BiChevronLeft, BiPencil, BiPlus } from 'react-icons/bi';
import { Button, SlideUpModal, Input, Slides, RadioButton, SectionHeading } from "@/app/components/mobile/ui";
import SelectAddress from "@/app/components/mobile/user-address-selection";
import useMystaffs from "@/lib/hooks/business/useMystaff";
const AddNewStaff = ({ onComplete }: { onComplete: () => void }) => {
    const { openAddNewStaffModal, setOpenAddNewStaffModal, isValid, addStaffStep, setAddStaffStep, staffInfo, setStaffInfo, addNewStaff } = useMystaffs({ loadStaffList: false });
    return (
        <>
            <div className="fixed bottom-0 left-0 w-full px-2">
                <Button className="w-full" onClick={() => { setOpenAddNewStaffModal(true) }}>Add New Staff</Button>
            </div>
            <SlideUpModal heading={addStaffStep === 1 ? "Add New Staff" : "Select Staff Address"} headingIcon={addStaffStep > 1 && <BiChevronLeft onClick={() => { addStaffStep > 1 && setAddStaffStep(addStaffStep - 1) }} className='text-4xl' />} open={openAddNewStaffModal} onClose={() => { setOpenAddNewStaffModal(false) }}>
                <Slides currentSlide={addStaffStep}>
                    <div className='flex flex-col h-full'>
                        <div className='flex gap-2'>
                            <Input type="text" lable="First Name" required={true} value={staffInfo.first_name} onChange={(e) => { setStaffInfo({ ...staffInfo, first_name: e.target.value }) }} />
                            <Input type="text" lable="Last Name" value={staffInfo.last_name} onChange={(e) => { setStaffInfo({ ...staffInfo, last_name: e.target.value }) }} />
                        </div>
                        <div className='mt-2'>
                            <Input type="mobile" lable="Mobile No" required={true} value={staffInfo.mobile_no} onChange={(e) => { setStaffInfo({ ...staffInfo, mobile_no: e.target.value }) }} />

                        </div>
                        <div className='mt-2'>
                            <Input lable="Job title" required={true} value={staffInfo.position} onChange={(e) => { setStaffInfo({ ...staffInfo, position: e.target.value }) }} />
                        </div>
                        <div className='flex gap-2 mt-2 mb-4'>
                            <Input lable='Age' type='number' required={true} value={staffInfo.age} onChange={(e) => { setStaffInfo({ ...staffInfo, age: parseInt(e.target.value) }) }} />
                            <Input type="number" lable="Year of Exp." required={true} value={staffInfo.year_of_exp} onChange={(e) => { setStaffInfo({ ...staffInfo, year_of_exp: parseInt(e.target.value) }) }} />
                            <RadioButton label='Gender' name='gender' required={true} value={staffInfo.gender} data={[
                                { label: "Male", value: "male" },
                                { label: "Female", value: "female" },
                            ]} onChange={(v) => { setStaffInfo({ ...staffInfo, gender: v.toString() }) }} />
                        </div>
                        <Button className="w-full mt-auto" onClick={() => { if (isValid(1)) { setAddStaffStep(2) } }}>Next&nbsp;<BiChevronsRight className='text-xl' /></Button>
                    </div>
                    <div className='h-full'>
                        <SelectAddress page_source="add_staff" btnText='Add Staff' onSelect={(addressData) => { addNewStaff(addressData,onComplete) }} save_address={false} showBreadCum={false} />
                        {/* {(staffAddress !== null) &&
                            <div className='flex flex-col h-full'>
                                <SectionHeading heading='Staff Address' />
                                <div className='flex gap-3 border border-color-grey px-4 py-2 rounded-md items-center'>
                                    <div className='fs-15 font-semibold color-text-light'>
                                        {(staffAddress.landmark ? staffAddress.landmark + " ," : "")}{staffAddress.area} {staffAddress.sub_dist} {staffAddress.city},{staffAddress.state}
                                    </div>
                                    <div className='ml-auto'>
                                        <span className="border border-color-grey color-secondary bg-white px-1 py-1 rounded-md flex items-center gap-1" onClick={() => { setStaffAddress(null) }}>
                                            <BiPencil />
                                            Change
                                        </span>
                                    </div>
                                </div>
                                <Button className="w-full mt-auto" onClick={addNewStaff}><BiPlus className='text-xl' />&nbsp;Add Staff</Button>
                            </div>
                        } */}
                    </div>
                </Slides>
            </SlideUpModal>
        </>
    )
}
export default AddNewStaff;