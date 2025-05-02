'use client'
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Header from "@/app/components/mobile/header";
import { SectionHeading } from '@/app/components/mobile/ui';
import useUserProfile from '@/lib/hooks/user-profile';
const ProfileDetailMobile = () => {
    const { userProfile } = useUserProfile();
    if (userProfile === null) {
        return <></>
    }
    return (
        <>
            <Header heading="My Profile" template="SUBPAGE" />
            <div className="border box-shadow bg-white rounded-xl mx-2 mt-16">
                <div className="flex justify-center py-2 relative">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s" className="border border-color-grey shadow-md rounded-full h-24 w-24 absolute -top-10" style={{ borderWidth: "2px", padding: "2px" }} />
                </div>
                <div className="text-center mt-10 py-2">
                    {userProfile.is_clinic_owner == 1 &&
                        <span className='fs-14 font-semibold border px-1 py-1 color-white rounded-md leading-[1]' style={{ background: "#2fc384" }}>Owner</span>
                    }
                    <p className="font-bold fs-20">
                        {userProfile.firstname} {userProfile.lastname}
                    </p>
                    <p>{userProfile.city},{userProfile.state}</p>
                </div>
                <div className="">
                    <div className="border-b px-2">
                        <p>Mobile</p>
                        <p className="font-semibold fs-17">{userProfile.mobile}</p>
                    </div>
                    <div className="border-b px-2">
                        <p>Email</p>
                        <p className="font-semibold fs-17">{userProfile.email||"--"}</p>
                    </div>
                    <div className="border-b px-2">
                        <p>Gender</p>
                        <p className="font-semibold fs-17">{userProfile.gender||"--"}</p>
                    </div>
                    <div className="border-b px-2">
                        <p>Address</p>
                        <p className="font-semibold fs-17">{userProfile.village} {userProfile.sub_district} {userProfile.city||"--"} {userProfile.state}</p>
                    </div>
                    <div className="border-b px-2">
                        <p>Landmark</p>
                        <p className="font-semibold fs-17">{userProfile.location||"--"}</p>
                    </div>
                </div>
            </div>
            {userProfile.clinic_info && userProfile.user_type === "clinic_staff" && userProfile.is_clinic_owner == 1 &&
                <div className="px-2">
                    <SectionHeading heading="Business Detail" />
                    <div className="border box-shadow bg-white rounded-xl mt-8">
                        <div className="flex justify-center py-2 relative">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s" className="border border-color-grey shadow-md rounded-full h-24 w-24 absolute -top-10" style={{ borderWidth: "2px", padding: "2px" }} />
                        </div>
                        <div className="text-center mt-10 py-2">
                            <span className='fs-14 font-semibold border px-1 py-1 color-white rounded-md leading-[1]' style={{ background: "#2fc384" }}>{userProfile.clinic_info.business_type}</span>
                            <p className="font-bold fs-20">
                                {userProfile.clinic_info.name}
                            </p>
                            <p>{userProfile.clinic_info.location} {userProfile.clinic_info.locality} {userProfile.clinic_info.market_name} {userProfile.clinic_info.city}</p>
                        </div>
                        <div className="border-b px-2 flex">
                            <div>
                                <p>Contact No</p>
                                <p className="font-semibold fs-17">{userProfile.clinic_info.mobile}</p>
                            </div>
                            <div className="ml-auto">
                                <p>Alternate Contact No</p>
                                <p className="font-semibold fs-17">{userProfile.clinic_info.alt_mob_no || "--"}</p>
                            </div>
                        </div>
                        <div className="border-b px-2">
                            <p>Business Email</p>
                            <p className="font-semibold fs-17">{userProfile.clinic_info.email || "--"}</p>
                        </div>
                        <div className="border-b px-2">
                            <p>Location</p>
                            <p className="font-semibold fs-17">{userProfile.clinic_info.location} {userProfile.clinic_info.locality} {userProfile.clinic_info.market_name} {userProfile.clinic_info.city}</p>
                        </div>
                        <div className="border-b px-2">
                            <p>Page URL</p>
                            <p className="font-semibold fs-17">{userProfile.clinic_info.seo_url}</p>
                        </div>
                        <div className="border-b px-2">
                            <p>Meta Title</p>
                            <p className="font-semibold fs-17">{userProfile.clinic_info.page_title||"--"}</p>
                        </div>
                        <div className="border-b px-2">
                            <p>Meta Description</p>
                            <p className="font-semibold fs-17">{userProfile.clinic_info.meta_description||"--"}</p>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
export default ProfileDetailMobile;