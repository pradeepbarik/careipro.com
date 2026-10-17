'use client'
import Login from "@/app/components/mobile/login";
import { TclinicDetail } from "@/lib/hooks/useClinics";
import { BiShieldQuarter, BiX, BiArrowBack } from "react-icons/bi";
import { MdVerified } from "react-icons/md";
import Image from "next/image";
import { clinicProfilePic } from "@/lib/image";
import SignedInCard from "./signed-in-card";

/**
 * Logging in on a clinic's behalf, on a wide screen. The visitor arrived from that clinic's own
 * site, so the clinic is named throughout and the careipro branding stays small: they need to see
 * whose login they are completing and that it is safe to hand over a number.
 *
 * Laid out as the two column card the main desktop login uses, with the clinic taking the place of
 * the generic benefits panel. The flow itself is the same shared Login component the mobile page
 * embeds, so the steps and the otp handling stay in one place.
 *
 * The literal teal and cyan classes are deliberate: they match the mobile page, and the theme's
 * own primary tokens only work as a background, not as text or a border.
 */
const TploginDesktop = ({ data }: { data: TclinicDetail }) => {
    const clinicInfo = data.clinic_info;
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 flex items-center justify-center">
            {/* leaves the way back to wherever they came from, same as the mobile page */}
            <button
                onClick={() => window.history.back()}
                aria-label="Close and go back"
                className="fixed top-5 right-5 z-50 w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center shadow-lg transition-colors"
            >
                <BiX className="text-2xl text-gray-700" />
            </button>

            <div className="w-full max-w-4xl bg-white rounded-2xl border border-gray-200 shadow-card overflow-hidden grid grid-cols-[5fr_4fr]">
                {/* whose login this is */}
                <div className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white p-8 relative overflow-hidden">
                    <span className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" aria-hidden="true"></span>
                    <span className="absolute -left-12 -bottom-20 h-48 w-48 rounded-full bg-white/10" aria-hidden="true"></span>

                    <div className="relative">
                        <div className="bg-white rounded-2xl p-5 shadow-xl">
                            <div className="flex items-center gap-4">
                                {clinicInfo.logo ? (
                                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0 border-2 border-teal-100">
                                        <Image
                                            src={clinicProfilePic(clinicInfo.logo)}
                                            alt={clinicInfo.name}
                                            width={80}
                                            height={80}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center text-teal-600 font-bold text-3xl shrink-0">
                                        {clinicInfo.name?.charAt(0)}
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <h1 className="font-bold text-gray-800 text-xl leading-tight flex items-center gap-2">
                                        <span className="truncate">{clinicInfo.name}</span>
                                        {clinicInfo.verified === 1 && (
                                            <MdVerified className="text-blue-500 text-xl shrink-0" />
                                        )}
                                    </h1>
                                    {clinicInfo.tag_line && (
                                        <p className="fs-13 text-gray-600 mt-1 line-clamp-2">{clinicInfo.tag_line}</p>
                                    )}
                                    <p className="fs-13 text-gray-500 mt-1 truncate">{clinicInfo.locality}, {clinicInfo.city}</p>
                                </div>
                            </div>
                        </div>

                        <p className="mt-7 fs-14 text-white/90 leading-relaxed">
                            {clinicInfo.name} books its appointments through Careipro. Sign in with your
                            mobile number to carry on, no password to remember.
                        </p>

                        <div className="mt-7 flex items-center gap-2 text-white/90">
                            <BiShieldQuarter className="text-xl shrink-0" />
                            <span className="fs-14 font-medium">Secure Login via Careipro</span>
                        </div>
                        <div className="mt-3 flex items-center gap-2 text-white/90">
                            <BiArrowBack className="text-xl shrink-0" />
                            <span className="fs-14 font-medium">You come straight back to {clinicInfo.name}</span>
                        </div>
                    </div>
                </div>

                <div className="p-6 flex flex-col justify-center min-w-0">
                    <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Login to Continue</h2>
                    {/* a visitor who already has a careipro session can go straight back */}
                    <SignedInCard clinicName={clinicInfo.name} />
                    <Login allowLoggedInUser={true} tplogin={true} />
                </div>
            </div>
        </div>
    )
}
export default TploginDesktop;
