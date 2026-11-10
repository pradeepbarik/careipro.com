'use client'
import { ReactNode } from "react";
import Link from "next/link";
import { IconType } from "react-icons";
import { BiPhone, BiEnvelope, BiUser, BiCake, BiMap, BiCurrentLocation, BiStore, BiLinkExternal, BiCheckShield, BiStar, BiSolidLocationPlus } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import Header from "@/app/components/mobile/header";
import useUserProfile from '@/lib/hooks/user-profile';
import { fullName, initials, imageUrl, genderLabel, dobLabel, userAddress, cityState, ownedClinic, clinicAddress, businessTypeLabel, clinicPageUrl } from "./profile-ui";

const Card = ({ title, children }: { title?: string, children: ReactNode }) => (
    <div className="bg-white rounded-xl shadow-card mx-3 mt-3 p-3">
        {title && <div className="font-semibold fs-16 text-deep mb-1">{title}</div>}
        {children}
    </div>
);

const Row = ({ icon: Icon, label, value }: { icon: IconType, label: string, value: ReactNode }) => (
    <div className="flex items-start gap-3 py-2.5 border-b border-line-light last:border-b-0">
        <span className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"><Icon /></span>
        <div className="min-w-0">
            <div className="text-muted fs-13">{label}</div>
            <div className="font-semibold fs-15 text-deep break-words">
                {value || <span className="text-muted font-normal">Not added</span>}
            </div>
        </div>
    </div>
);

const Avatar = ({ src, name, rounded = "rounded-full" }: { src: string, name: string, rounded?: string }) => (
    src
        ? <img src={src} alt={name} className={`h-20 w-20 ${rounded} object-cover border-2 border-white shadow-md shrink-0`} />
        : <span className={`h-20 w-20 ${rounded} bg-primary text-white flex items-center justify-center text-3xl font-bold border-2 border-white shadow-md shrink-0`}>{initials(name)}</span>
);

const ProfileDetailMobile = () => {
    const { userProfile } = useUserProfile();
    if (userProfile === null) {
        return (
            <>
                <Header heading="My Profile" template="SUBPAGE" />
                <div className="mx-3 mt-3 space-y-3">
                    <div className="h-40 bg-white rounded-xl animate-pulse" />
                    <div className="h-64 bg-white rounded-xl animate-pulse" />
                </div>
            </>
        );
    }
    const name = fullName(userProfile);
    const clinic = ownedClinic(userProfile);
    const pageUrl = clinic ? clinicPageUrl(clinic) : "";
    return (
        <>
            <Header heading="My Profile" template="SUBPAGE" />
            <div className="pb-6">
                {/* who */}
                <div className="bg-white rounded-xl shadow-card mx-3 mt-3 p-4 flex flex-col items-center text-center">
                    <Avatar src={imageUrl(userProfile.image)} name={name} />
                    <div className="font-bold fs-20 text-deep mt-2 flex items-center gap-2">
                        {name || "Your name"}
                        {userProfile.is_clinic_owner == 1 &&
                            <span className="fs-12 font-semibold px-2 py-[2px] rounded-full text-white" style={{ background: "#2fc384" }}>Owner</span>}
                    </div>
                    {cityState(userProfile) &&
                        <div className="text-muted fs-14 flex items-center gap-1 mt-0.5"><BiSolidLocationPlus />{cityState(userProfile)}</div>}
                    {userProfile.mobile &&
                        <div className="mt-2 rounded-full bg-primary/10 text-primary font-semibold fs-14 px-3 py-1 flex items-center gap-1"><BiPhone />{userProfile.mobile}</div>}
                </div>

                <Card title="Personal Details">
                    <Row icon={BiPhone} label="Mobile" value={userProfile.mobile} />
                    <Row icon={BiEnvelope} label="Email" value={userProfile.email} />
                    <Row icon={BiUser} label="Gender" value={genderLabel(userProfile.gender)} />
                    <Row icon={BiCake} label="Date of Birth" value={dobLabel(userProfile.date_of_birth)} />
                    <Row icon={BiMap} label="Address" value={userAddress(userProfile)} />
                    <Row icon={BiCurrentLocation} label="Landmark" value={userProfile.location} />
                </Card>

                {clinic &&
                    <Card title="Business Details">
                        <div className="flex items-center gap-3 py-2">
                            <Avatar src={imageUrl(clinic.logo)} name={clinic.name} rounded="rounded-xl" />
                            <div className="min-w-0">
                                <div className="font-bold fs-17 text-deep">{clinic.name}</div>
                                <div className="flex flex-wrap gap-1.5 mt-1">
                                    <span className="fs-12 font-semibold px-2 py-[2px] rounded-full bg-primary/10 text-primary">{businessTypeLabel(clinic.business_type)}</span>
                                    {clinic.verified == 1 && <span className="fs-12 font-semibold px-2 py-[2px] rounded-full bg-green-50 text-green-700 flex items-center gap-0.5"><BiCheckShield />Verified</span>}
                                    {clinic.is_prime == 1 && <span className="fs-12 font-semibold px-2 py-[2px] rounded-full bg-amber-50 text-amber-700 flex items-center gap-0.5"><BiStar />Prime</span>}
                                </div>
                            </div>
                        </div>
                        {pageUrl &&
                            <Link href={pageUrl} className="w-full mt-1 mb-1 flex items-center justify-center gap-1 rounded-lg border border-primary/40 text-primary font-semibold py-2 fs-14">
                                <BiLinkExternal /> View your page
                            </Link>}
                        <Row icon={BiPhone} label="Contact No." value={clinic.mobile} />
                        <Row icon={BiPhone} label="Alternate Contact No." value={clinic.alt_mob_no} />
                        <Row icon={FaWhatsapp} label="WhatsApp" value={clinic.whatsapp_number} />
                        <Row icon={BiEnvelope} label="Business Email" value={clinic.email} />
                        <Row icon={BiStore} label="Location" value={clinicAddress(clinic)} />
                        {/* what search engines show for the listing, only the owner needs it */}
                        <div className="mt-2 rounded-lg bg-primary/5 p-3">
                            <div className="fs-13 font-semibold text-deep mb-1">Search listing (SEO)</div>
                            <div className="text-muted fs-12">Page title</div>
                            <div className="fs-14 text-deep break-words">{clinic.page_title || <span className="text-muted">Not added</span>}</div>
                            <div className="text-muted fs-12 mt-2">Meta description</div>
                            <div className="fs-14 text-deep break-words">{clinic.meta_description || <span className="text-muted">Not added</span>}</div>
                        </div>
                    </Card>}
            </div>
        </>
    );
}
export default ProfileDetailMobile;
