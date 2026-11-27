import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import { BiPhoneCall, BiStore, BiTimeFive } from "react-icons/bi";
import { BsWhatsapp } from "react-icons/bs";
import { FaMapMarkerAlt, FaUserMd } from "react-icons/fa";
import { MdDeliveryDining, MdLocalOffer, MdLocalPharmacy, MdVerified, MdShoppingBag } from "react-icons/md";
import { clinicProfilePic } from "@/lib/image";
import { TStoreListResponse } from "@/lib/hooks/useMedicineStore";
import { storeWhatsappLink } from "../store-contact";

type TStore = TStoreListResponse["stores"][number];

/* the address parts overlap (a market is often also the locality), so empty and repeated parts
   are dropped instead of printing "MG Road,,MG Road" */
const storeAddress = (s: TStore) =>
    Array.from(new Set([s.location, s.locality, s.market_name].map((p) => p?.trim()).filter(Boolean))).join(", ");


const deliveryTags = (s: TStore) =>
    (s.medicine_delivery_time_tag || "").split(",").map((t) => t.trim()).filter(Boolean);

//desktop shows the number on the call button, a laptop can't dial so the visitor needs to read it
const StoreCard = ({ store, desktop = false }: { store: TStore, desktop?: boolean }) => {
    const callNumber = store.mobile || store.alt_mob_no;
    /* a store without a separate whatsapp number is reached on its main mobile */
    const whatsappNumber = store.whatsapp_number || store.mobile;
    const address = storeAddress(store);
    const tags = deliveryTags(store);
    const hasReviews = Number(store.review_cnt) > 0;
    const doctors = (store.recommended_doctors || "").split(",").map((d) => d.trim()).filter(Boolean);

    return (
        <div className={`relative bg-white rounded-xl border border-gray-200 shadow-card overflow-hidden active:bg-gray-50 transition-all ${desktop ? "h-full flex flex-col hover:shadow-md hover:border-primary/40" : ""}`}>
            {/* the whole card opens the store. an anchor cannot sit inside an anchor, so this link is
                stretched over the card and the buttons are lifted above it with z-10 */}
            <Link href={store.dtlpg_url} aria-label={store.name} className="absolute inset-0 z-0" />

            {store.discount_msg && (
                <div className="flex items-center gap-1.5 px-4 py-1.5 bg-primary/10 text-primary text-xs font-semibold">
                    <MdLocalOffer className="flex-shrink-0" />
                    <span className="truncate">{store.discount_msg}</span>
                </div>
            )}

            <div className={`p-4 ${desktop ? "flex-1 flex flex-col" : ""}`}>
                <div className="flex gap-3">
                    {store.logo
                        ? <img src={clinicProfilePic(store.logo)} alt={`Logo of ${store.name}`}
                            className="w-16 h-16 rounded-lg object-cover border border-gray-100 flex-shrink-0" />
                        : <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <MdLocalPharmacy className="text-primary text-3xl" />
                        </div>}

                    <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-1">
                            <h3 className="font-semibold text-deep text-sm leading-tight flex-1 line-clamp-2">{store.name}</h3>
                            {store.is_prime === 1 && (
                                <span className="flex-shrink-0 text-[10px] font-semibold text-primary border border-primary/40 rounded px-1.5 py-0.5 leading-none">
                                    Featured
                                </span>
                            )}
                        </div>

                        {address && (
                            <div className="flex items-center gap-1 text-xs text-muted mt-1">
                                <FaMapMarkerAlt className="text-primary flex-shrink-0 text-[10px]" />
                                <span className="truncate">{address}</span>
                            </div>
                        )}

                        <div className="flex items-center gap-2 mt-1.5">
                            {hasReviews ? (
                                <>
                                    <span className="flex items-center gap-0.5 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded font-semibold">
                                        {store.rating} <AiFillStar />
                                    </span>
                                    <span className="text-xs text-muted">({store.review_cnt})</span>
                                </>
                            ) : (
                                <></>
                            )}
                            {(store.verified === 1 || store.status === "verified") && (
                                <span className="flex items-center gap-0.5 text-[10px] font-semibold text-primary">
                                    <MdVerified className="text-sm" /> Verified
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* what a buyer checks before calling: how fast, whether it delivers, the minimum
                    order and the hours. only the ones the store has filled in are shown */}
                {(tags.length > 0 || store.medicine_home_delivery === 1 || store.medicine_min_order_tag || store.open_time) && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                        {store.medicine_home_delivery === 1 && (
                            <span className="flex items-center gap-1 text-[11px] font-medium text-primary bg-primary/5 border border-primary/20 rounded-full px-2 py-0.5">
                                <MdDeliveryDining className="text-sm" /> Home Delivery
                            </span>
                        )}
                        {tags.map((tag) => (
                            <span key={tag} className="flex items-center gap-1 text-[11px] font-medium text-gray-700 bg-gray-100 rounded-full px-2 py-0.5">
                                <BiTimeFive /> {tag}
                            </span>
                        ))}
                        {store.medicine_min_order_tag && (
                            <span className="flex items-center gap-1 text-[11px] font-medium text-gray-700 bg-gray-100 rounded-full px-2 py-0.5">
                                <MdShoppingBag /> {store.medicine_min_order_tag}
                            </span>
                        )}
                        {store.open_time && (
                            <span className="flex items-center gap-1 text-[11px] font-medium text-gray-700 bg-gray-100 rounded-full px-2 py-0.5">
                                <BiStore /> {store.open_time}
                            </span>
                        )}
                    </div>
                )}

                {/* doctors who send their patients here, typed by the store as a comma separated
                    list. two names fit on one line, the rest are counted */}
                {doctors.length > 0 && (
                    <div className="flex items-center gap-1.5 mt-3 min-w-0">
                        <FaUserMd className="text-primary text-xs flex-shrink-0" />
                        <div className="flex items-center gap-1 min-w-0 overflow-hidden">
                            {doctors.slice(0, 2).map((doctor, i) => (
                                <span key={`doctor-${i}`} className="text-[11px] font-semibold text-primary bg-primary/5 border border-primary/20 rounded-full px-2 py-0.5 truncate max-w-[9rem]">
                                    {doctor}
                                </span>
                            ))}
                            {doctors.length > 2 && (
                                <span className="text-[11px] text-muted flex-shrink-0">+{doctors.length - 2} more</span>
                            )}
                        </div>
                    </div>
                )}

                {/* mt-auto on desktop so the buttons line up along the bottom of a grid row */}
                <div className={`relative z-10 flex gap-2 pt-3 border-t border-gray-100 ${desktop ? "mt-auto" : "mt-3"}`}>
                    {callNumber && (
                        <a href={`tel:${callNumber}`} className="button grow gap-1.5 fs-14" data-size="small">
                            <BiPhoneCall /> {desktop ? callNumber : "Call Now"}
                        </a>
                    )}
                    {whatsappNumber && (
                        <a href={storeWhatsappLink(whatsappNumber, store.name)} target="_blank" rel="noopener noreferrer"
                            className="grow flex items-center justify-center gap-1.5 rounded-[.3rem] border font-semibold py-[.3rem] px-2 fs-14"
                            style={{ color: "#15803d", borderColor: "#15803d" }}>
                            <BsWhatsapp /> WhatsApp
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};
export default StoreCard;
