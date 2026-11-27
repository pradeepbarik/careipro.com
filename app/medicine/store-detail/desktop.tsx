import Link from "next/link";
import { BiChevronRight, BiMapPin, BiPhoneCall } from "react-icons/bi";
import { BsWhatsapp } from "react-icons/bs";
import { MdDeliveryDining, MdLocalPharmacy, MdVerified } from "react-icons/md";
import ShareButton from "@/app/components/client-components/share-button";
import { TclinicDetail } from "@/lib/hooks/useClinics";
import { capitalizeEachWordFirstLetter } from "@/lib/helper/format-text";
import { cityPageLink, medicineStoreCategoryLink, medicineStoreListLink } from "@/lib/helper/link";
import { clinicProfilePic } from "@/lib/image";
import { storeWhatsappLink, joinAddress } from "../store-contact";
import { StoreOpenStatus } from "./store-open-status";
import StoreImageBannerSection from "./store-banner";
import {
    StoreDetailsSection, PrescriptionSection, DeliverySection, AboutStoreSection, RecommendedByDoctorsSection
} from "./mobile";

/* the mobile sections are full bleed strips with a bottom border, here each sits in its own card */
const Card = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden [&>div]:border-b-0">{children}</div>
);

/**
 * The desktop store page. Who the store is and what it offers take the wide column; reaching it
 * (the number, Call, WhatsApp, sending a prescription) stays in view in the side column.
 */
const MedicineStoreDetailDesktop = ({ data }: { data: TclinicDetail }) => {
    const info = data.clinic_info;
    const state = info.state || "";
    const callNumber = info.mobile || info.alt_mob_no;
    const whatsappNumber = info.whatsapp_number || info.mobile;
    const address = joinAddress([info.locality, info.location, info.city]);
    const categories = data.specializations?.MEDICINESTORE || [];
    const doctors = (info.recommended_doctors || "").split(",").map((d) => d.trim()).filter(Boolean);
    const marketName = capitalizeEachWordFirstLetter(info.market_name || "");
    const marketLink = medicineStoreListLink({ state, city: info.city, market_name: info.market_name });

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="max-w-7xl mx-auto px-4 py-5">
                <nav aria-label="Breadcrumb" className="flex items-center gap-1 fs-13 text-gray-500 mb-3">
                    <Link href="/" className="hover:text-primary">Careipro</Link>
                    <BiChevronRight className="shrink-0" />
                    <Link href={cityPageLink(state, info.city)} className="hover:text-primary">{capitalizeEachWordFirstLetter(info.city)}</Link>
                    <BiChevronRight className="shrink-0" />
                    <Link href={medicineStoreListLink({ state, city: info.city })} className="hover:text-primary">Medicine Stores</Link>
                    {info.market_name && <>
                        <BiChevronRight className="shrink-0" />
                        <Link href={marketLink} className="hover:text-primary">{marketName}</Link>
                    </>}
                    <BiChevronRight className="shrink-0" />
                    <span className="text-gray-700 font-medium truncate">{info.name}</span>
                </nav>

                <div className="grid grid-cols-[7fr_3fr] gap-5 items-start mt-5">
                    <div className="min-w-0 flex flex-col gap-4">
                        {/* identity */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <div className="flex gap-4">
                                {info.logo
                                    ? <img src={clinicProfilePic(info.logo)} alt={`Logo of ${info.name}`}
                                        className="h-20 w-20 rounded-xl object-cover border border-gray-100 shrink-0" />
                                    : <span className="h-20 w-20 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                        <MdLocalPharmacy className="text-primary" style={{ fontSize: "2.5rem" }} />
                                    </span>}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start gap-3">
                                        <h1 className="flex-1 min-w-0 flex items-center gap-2 text-2xl font-bold text-gray-900 leading-tight">
                                            {info.name}
                                            {info.verified === 1 && <MdVerified className="text-primary shrink-0 text-xl" title="Verified by Careipro" />}
                                        </h1>
                                        <ShareButton name={info.name}
                                            className="shrink-0 w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                                            iconClassName="text-lg text-gray-700" />
                                    </div>
                                    {info.tag_line && <p className="fs-14 text-gray-600 italic mt-1">{info.tag_line}</p>}
                                    {address && (
                                        <p className="flex items-center gap-1.5 fs-14 text-gray-600 mt-1.5">
                                            <BiMapPin className="text-red-500 shrink-0" /> {address}
                                        </p>
                                    )}
                                    <div className="flex flex-wrap items-center gap-2 mt-3">
                                        <StoreOpenStatus timing={data.timing} />
                                        {info.medicine_home_delivery === 1 && (
                                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary flex items-center gap-1">
                                                <MdDeliveryDining /> Home Delivery
                                            </span>
                                        )}
                                    </div>
                                    {/* each category opens the other stores of that kind in the same market */}
                                    {categories.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {categories.map((c) => info.market_name ? (
                                                <Link key={c.id}
                                                    href={medicineStoreCategoryLink({ state, city: info.city, market_name: info.market_name, seo_url: c.seo_url || c.name, cat_id: c.id })}
                                                    className="flex items-center gap-1 px-2.5 py-1 bg-primary/5 text-primary rounded-full fs-12 font-semibold border border-primary/20 hover:bg-primary/10 transition-colors">
                                                    <MdLocalPharmacy /> {c.name}
                                                </Link>
                                            ) : (
                                                <span key={c.id} className="flex items-center gap-1 px-2.5 py-1 bg-primary/5 text-primary rounded-full fs-12 font-semibold border border-primary/20">
                                                    <MdLocalPharmacy /> {c.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* the mobile banner shows a "No Banner Available" box, a wide page doesn't need one */}
                        {data.banners.length > 0 && (
                            <Card><StoreImageBannerSection banners={data.banners} store_name={info.name} /></Card>
                        )}
                        <Card><StoreDetailsSection data={data} /></Card>
                        {(info.about_clinic || "").trim() && <Card><AboutStoreSection about={info.about_clinic} store_name={info.name} /></Card>}
                        {doctors.length > 0 && <Card><RecommendedByDoctorsSection doctors={doctors} /></Card>}
                    </div>

                    {/* reaching the store stays in view the whole way down */}
                    <aside className="min-w-0 sticky top-[104px] flex flex-col gap-4">
                        {(callNumber || whatsappNumber) && (
                            <div className="bg-white rounded-xl border border-gray-200 p-4">
                                <h2 className="font-bold text-gray-800 fs-15">Contact the store</h2>
                                {/* a laptop can't dial, so the number is printed for the visitor to read */}
                                {callNumber && <p className="text-xl font-bold text-gray-900 mt-2 tracking-wide">{callNumber}</p>}
                                <div className="flex flex-col gap-2 mt-3">
                                    {callNumber && (
                                        <a href={`tel:${callNumber}`} className="button gap-1.5 fs-14">
                                            <BiPhoneCall /> Call Now
                                        </a>
                                    )}
                                    {whatsappNumber && (
                                        <a href={storeWhatsappLink(whatsappNumber, info.name)} target="_blank" rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-1.5 rounded-[.3rem] border font-semibold py-2 px-2 fs-14 hover:bg-green-50 transition-colors"
                                            style={{ color: "#15803d", borderColor: "#15803d" }}>
                                            <BsWhatsapp /> WhatsApp
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                        <Card><PrescriptionSection data={data} /></Card>
                        <Card><DeliverySection data={data} /></Card>
                        {info.market_name && (
                            <Link href={marketLink}
                                className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3 hover:border-primary transition-colors">
                                <span className="flex-1 min-w-0 font-semibold text-gray-800 fs-14">More medicine stores in {marketName}</span>
                                <BiChevronRight className="text-xl text-primary shrink-0" />
                            </Link>
                        )}
                    </aside>
                </div>
            </main>
        </div>
    );
};
export default MedicineStoreDetailDesktop;
