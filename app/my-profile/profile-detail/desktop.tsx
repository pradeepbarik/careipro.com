'use client'
import { ReactNode } from "react";
import Link from "next/link";
import { IconType } from "react-icons";
import { BiPhone, BiEnvelope, BiUser, BiCake, BiMap, BiCurrentLocation, BiStore, BiLinkExternal, BiCheckShield, BiStar, BiSolidLocationPlus } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import { userSecreateKey } from '@/constants/storage_keys';
import useUserProfile from '@/lib/hooks/user-profile';
import { fullName, initials, imageUrl, genderLabel, dobLabel, userAddress, cityState, ownedClinic, clinicAddress, businessTypeLabel, clinicPageUrl } from "./profile-ui";

const Panel = ({ title, action, children }: { title?: string, action?: ReactNode, children: ReactNode }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
        {(title || action) && (
            <div className="flex items-center mb-4">
                {title && <h3 className="font-bold fs-15 text-gray-800">{title}</h3>}
                {action && <div className="ml-auto">{action}</div>}
            </div>
        )}
        {children}
    </div>
);

const Field = ({ icon: Icon, label, value, wide = false }: { icon: IconType, label: string, value: ReactNode, wide?: boolean }) => (
    <div className={`flex items-start gap-3 min-w-0 ${wide ? "col-span-2" : ""}`}>
        <span className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"><Icon /></span>
        <div className="min-w-0">
            <div className="fs-12 text-gray-500">{label}</div>
            <div className="fs-14 font-semibold text-gray-800 break-words">
                {value || <span className="text-gray-400 font-normal">Not added</span>}
            </div>
        </div>
    </div>
);

const Avatar = ({ src, name, rounded = "rounded-full" }: { src: string, name: string, rounded?: string }) => (
    src
        ? <img src={src} alt={name} className={`h-20 w-20 ${rounded} object-cover border border-gray-100 shrink-0`} />
        : <span className={`h-20 w-20 ${rounded} bg-primary text-white flex items-center justify-center text-3xl font-bold shrink-0`}>{initials(name)}</span>
);

const Heading = () => (
    <div className="flex items-center gap-3 mb-3">
        <div className="w-1 h-5 bg-primary rounded-full"></div>
        <h2 className="font-bold text-gray-800">My Profile</h2>
    </div>
);

/**
 * The profile inside the account layout, so the menu stays beside it and this renders only the
 * panel on the right. Same data and rules as the phone page, through profile-ui.
 */
const ProfileDetailDesktop = ({ cookies }: { cookies: Record<string, any> }) => {
    /* read from the cookie the server passed down, the store is empty until the browser runs */
    const isLoggedIn = cookies[userSecreateKey] !== undefined;
    const { userProfile } = useUserProfile();

    if (!isLoggedIn) {
        return (
            <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <img src="/icon/no-data.svg" alt="" className="w-24 h-24 mb-4" />
                    <p className="font-semibold text-gray-800">Please login to view your profile.</p>
                    <Link href="/login" className="mt-4 rounded-full bg-primary text-white font-semibold fs-14 px-6 py-2.5 hover:opacity-90 transition-opacity">
                        Login / Sign up
                    </Link>
                </div>
            </div>
        );
    }

    if (userProfile === null) {
        return (
            <>
                <Heading />
                <div className="space-y-4">
                    <div className="h-48 bg-white rounded-xl border border-gray-200 animate-pulse" />
                    <div className="h-56 bg-white rounded-xl border border-gray-200 animate-pulse" />
                </div>
            </>
        );
    }

    const name = fullName(userProfile);
    const clinic = ownedClinic(userProfile);
    const pageUrl = clinic ? clinicPageUrl(clinic) : "";

    return (
        <>
            <Heading />
            <div className="space-y-4">
                <Panel>
                    <div className="flex items-center gap-4 pb-5 mb-5 border-b border-gray-100">
                        <Avatar src={imageUrl(userProfile.image)} name={name} />
                        <div className="min-w-0">
                            <div className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                {name || "Your name"}
                                {userProfile.is_clinic_owner == 1 && (
                                    <span className="fs-12 font-semibold px-2 py-[2px] rounded-full text-white" style={{ background: "#2fc384" }}>Owner</span>
                                )}
                            </div>
                            {cityState(userProfile) && (
                                <div className="fs-14 text-gray-500 flex items-center gap-1 mt-0.5"><BiSolidLocationPlus />{cityState(userProfile)}</div>
                            )}
                        </div>
                    </div>
                    <h3 className="font-bold fs-15 text-gray-800 mb-4">Personal Details</h3>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                        <Field icon={BiPhone} label="Mobile" value={userProfile.mobile} />
                        <Field icon={BiEnvelope} label="Email" value={userProfile.email} />
                        <Field icon={BiUser} label="Gender" value={genderLabel(userProfile.gender)} />
                        <Field icon={BiCake} label="Date of Birth" value={dobLabel(userProfile.date_of_birth)} />
                        <Field icon={BiMap} label="Address" value={userAddress(userProfile)} />
                        <Field icon={BiCurrentLocation} label="Landmark" value={userProfile.location} />
                    </div>
                </Panel>

                {clinic && (
                    <Panel title="Business Details" action={pageUrl ? (
                        <Link href={pageUrl} className="flex items-center gap-1.5 rounded-lg border border-primary/40 text-primary fs-13 font-semibold py-2 px-3 hover:bg-primary hover:text-white transition-colors">
                            <BiLinkExternal />View your page
                        </Link>
                    ) : undefined}>
                        <div className="flex items-center gap-4 pb-5 mb-5 border-b border-gray-100">
                            <Avatar src={imageUrl(clinic.logo)} name={clinic.name} rounded="rounded-xl" />
                            <div className="min-w-0">
                                <div className="text-lg font-bold text-gray-900">{clinic.name}</div>
                                {clinic.tag_line && <div className="fs-13 text-gray-500">{clinic.tag_line}</div>}
                                <div className="flex flex-wrap gap-1.5 mt-1.5">
                                    <span className="fs-12 font-semibold px-2 py-[2px] rounded-full bg-primary/10 text-primary">{businessTypeLabel(clinic.business_type)}</span>
                                    {clinic.verified == 1 && <span className="fs-12 font-semibold px-2 py-[2px] rounded-full bg-green-50 text-green-700 flex items-center gap-0.5"><BiCheckShield />Verified</span>}
                                    {clinic.is_prime == 1 && <span className="fs-12 font-semibold px-2 py-[2px] rounded-full bg-amber-50 text-amber-700 flex items-center gap-0.5"><BiStar />Prime</span>}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                            <Field icon={BiPhone} label="Contact No." value={clinic.mobile} />
                            <Field icon={BiPhone} label="Alternate Contact No." value={clinic.alt_mob_no} />
                            <Field icon={FaWhatsapp} label="WhatsApp" value={clinic.whatsapp_number} />
                            <Field icon={BiEnvelope} label="Business Email" value={clinic.email} />
                            <Field icon={BiStore} label="Location" value={clinicAddress(clinic)} wide />
                        </div>
                        {/* what search engines show for the listing, only the owner needs it */}
                        <div className="mt-5 rounded-lg bg-primary/5 border border-primary/10 p-4">
                            <div className="fs-13 font-bold text-gray-800 mb-2">Search listing (SEO)</div>
                            <div className="fs-12 text-gray-500">Page title</div>
                            <div className="fs-14 text-gray-800 break-words">{clinic.page_title || <span className="text-gray-400">Not added</span>}</div>
                            <div className="fs-12 text-gray-500 mt-3">Meta description</div>
                            <div className="fs-14 text-gray-800 break-words">{clinic.meta_description || <span className="text-gray-400">Not added</span>}</div>
                        </div>
                    </Panel>
                )}
            </div>
        </>
    );
};

export default ProfileDetailDesktop;
