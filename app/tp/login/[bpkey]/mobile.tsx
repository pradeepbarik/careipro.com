'use client'
import Login from "@/app/components/mobile/login";
import { TclinicDetail } from "@/lib/hooks/useClinics";
import { BiShieldQuarter, BiX } from "react-icons/bi";
import { MdVerified } from "react-icons/md";
import Image from "next/image";
import { clinicProfilePic } from "@/lib/image";

const TploginMobile = ({ data }: { data: TclinicDetail }) => {
    const clinicInfo = data.clinic_info;
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Close Button */}
            <button
                onClick={() => window.history.back()}
                className="fixed top-4 right-4 z-50 w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center shadow-lg transition-colors"
            >
                <BiX className="text-2xl text-gray-700" />
            </button>

            {/* Clinic Branding Header */}
            <div className="bg-gradient-to-br from-teal-500 to-cyan-600 px-4 py-6 shadow-lg">
                <div className="max-w-md mx-auto">
                    {/* Clinic Logo & Name */}
                    <div className="bg-white rounded-2xl p-4 shadow-xl">
                        <div className="flex items-center gap-4">
                            {clinicInfo.logo ? (
                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border-2 border-teal-100">
                                    <Image 
                                        src={clinicProfilePic(clinicInfo.logo)} 
                                        alt={clinicInfo.name}
                                        width={64}
                                        height={64}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center text-teal-600 font-bold text-2xl flex-shrink-0">
                                    {clinicInfo.name?.charAt(0)}
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <h1 className="font-bold text-gray-800 text-lg leading-tight flex items-center gap-2">
                                    <span className="truncate">{clinicInfo.name}</span>
                                    {clinicInfo.verified === 1 && (
                                        <MdVerified className="text-blue-500 text-xl flex-shrink-0" />
                                    )}
                                </h1>
                                {clinicInfo.tag_line && (
                                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{clinicInfo.tag_line}</p>
                                )}
                                <p className="text-xs text-gray-500 mt-1">{clinicInfo.locality}, {clinicInfo.city}</p>
                            </div>
                        </div>
                    </div>

                    {/* Security Badge */}
                    <div className="mt-4 flex items-center justify-center gap-2 text-white/90">
                        <BiShieldQuarter className="text-xl" />
                        <span className="text-sm font-medium">Secure Login via CareIPro</span>
                    </div>
                </div>
            </div>

            {/* Login Section */}
            <div className="max-w-md mx-auto px-4 py-6">
                {/* Login Component */}
                <div className="bg-white rounded-2xl shadow-lg p-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Login to Continue</h2>
                    <Login allowLoggedInUser={true} tplogin={true} />
                </div>
                {/* Footer Note */}
                <p className="text-xs text-center text-gray-500 mt-4">
                    {`After login, you'll be redirected back to`} {clinicInfo.name}
                </p>
            </div>
        </div>
    )
}
export default TploginMobile;