import { BiTime, BiPhoneCall, BiRightArrowAlt, BiRupee } from "react-icons/bi";
import { FaAmbulance } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { TclinicDetail } from "@/lib/hooks/useClinics";
import { ambulancePhoto } from "@/lib/image";
import { ambulanceCategories } from "@/app/ambulance/data";
import SendEnquiry from "./mobile/send-enquiry";
import TrackedLink from "@/app/components/client-components/tracked-link";

type TAmbulance = NonNullable<TclinicDetail["ambulances"]>[0];

export const vehicleTypeName = (code: string) =>
    ambulanceCategories.find((c) => c.code === code)?.name || code;

/** stored as one comma separated string per vehicle by the branch admin */
const facilitiesOf = (vehicle: TAmbulance) =>
    (vehicle.facilities || "").split(",").map((f) => f.trim()).filter(Boolean);

type TRoute = { from: string, to: string, distance_km: number, fare: number, note: string };

/* service_routes is a json array; a blank or malformed value reads as no routes rather than
   breaking the card, since it is free text an admin edits */
const routesOf = (vehicle: TAmbulance): TRoute[] => {
    if (!vehicle.service_routes) return [];
    try {
        const parsed = JSON.parse(vehicle.service_routes);
        return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
        return [];
    }
};

const AmbulanceCard = ({ vehicle, info, surface = "sheet" }: {
    vehicle: TAmbulance, info: TclinicDetail["clinic_info"],
    /** "dialog" from the desktop layout, where a bottom sheet looks out of place */
    surface?: "sheet" | "dialog"
}) => {
    const facilities = facilitiesOf(vehicle);
    const routes = routesOf(vehicle);
    /* Fares move with distance and with what the patient needs on board, so the listed base fare is
       a starting point rather than a quote. Both messages name the vehicle, so the provider knows
       which one is being asked about without the sender having to describe it.

       Both also name the business. One owner can run several businesses off a single phone number,
       so a whatsapp message has to say which of them it is about; and in the enquiry queue the
       business makes a lead readable on its own without opening it.

       The two differ on attribution: an Ask Price enquiry already arrives inside the provider's
       careipro account, while a whatsapp message lands in a personal inbox among every other
       chat, so that one has to say where the lead came from. Same `*bold*` and line break the
       doctor detail page uses for its whatsapp template. */
    const vehicleLabel = `${vehicleTypeName(vehicle.vehicle_type)} ambulance (${vehicle.vehicle_no})`;
    /* the heading names the vehicle the way the card above it does, so a provider running several
       leaves no doubt about which one the sender pressed */
    const vehicleDisplayName = vehicle.title || vehicleTypeName(vehicle.vehicle_type);
    const priceQuestion = `Hi, what is the fare for the ${vehicleLabel} at ${info.name}?`;
    const whatsappMessage = `Hi,\nI found *${info.name}* on careipro.com. What is the fare for your *${vehicleLabel}*?`;
    return (
        <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
            <div className="h-36 bg-cyan-50 flex items-center justify-center overflow-hidden">
                {vehicle.photo
                    ? <img src={ambulancePhoto(vehicle.photo)} alt={`${vehicleTypeName(vehicle.vehicle_type)} ambulance ${vehicle.vehicle_no}`} className="w-full h-full object-cover" />
                    : <FaAmbulance className="text-cyan-600" style={{ fontSize: "2.5rem" }} />}
            </div>
            <div className="p-3">
                <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                        <h3 className="font-bold text-gray-900 fs-14 truncate">{vehicle.title || vehicleTypeName(vehicle.vehicle_type)}</h3>
                        <p className="fs-12 text-gray-500">{vehicle.vehicle_no}</p>
                    </div>
                    <span className="fs-12 font-semibold px-2 py-[2px] rounded-full bg-cyan-50 text-cyan-700 border border-cyan-100 whitespace-nowrap">
                        {vehicleTypeName(vehicle.vehicle_type)}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-100 text-center">
                    <div>
                        <div className="font-bold text-gray-900 fs-14">₹{vehicle.base_fare}</div>
                        <div className="fs-12 text-gray-500">Base fare</div>
                    </div>
                    <div>
                        <div className="font-bold text-gray-900 fs-14">
                            {Number(vehicle.per_km_charge) > 0 ? `₹${vehicle.per_km_charge}` : "—"}
                        </div>
                        <div className="fs-12 text-gray-500">Per km</div>
                    </div>
                </div>

                {facilities.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                        {facilities.map((f) => (
                            <span key={f} className="fs-12 px-2 py-[2px] rounded bg-gray-100 text-gray-600">{f}</span>
                        ))}
                    </div>
                )}

                {routes.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                        <h4 className="fs-12 font-semibold text-gray-700 mb-1.5">Service routes</h4>
                        <div className="flex flex-col gap-1.5">
                            {routes.map((route, i) => (
                                <div key={i} className="flex items-center justify-between gap-2 fs-12">
                                    <span className="flex items-center gap-1 text-gray-700 min-w-0">
                                        <span className="truncate">{route.from}</span>
                                        <BiRightArrowAlt className="text-cyan-600 shrink-0" />
                                        <span className="truncate">{route.to}</span>
                                        {route.distance_km > 0 && <span className="text-gray-400 shrink-0">· {route.distance_km} km</span>}
                                    </span>
                                    {route.fare > 0 && <span className="font-semibold text-gray-900 shrink-0">₹{route.fare}</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-between gap-2 mt-3">
                    {vehicle.available_24x7 === 1 ? (
                        <span className="flex items-center gap-1 fs-12 text-green-700"><BiTime />Available 24×7</span>
                    ) : <span />}
                    {/* the crew on this vehicle, when the provider listed one; the provider's own
                        number stays the primary call in the identity block above */}
                    {vehicle.driver_mobile ? (
                        <a href={`tel:${vehicle.driver_mobile}`} className="flex items-center gap-1 fs-12 font-semibold text-cyan-700 hover:underline">
                            <BiPhoneCall />{vehicle.driver_name || "Driver"}
                        </a>
                    ) : null}
                </div>

                {/* both ask the same question, one through the enquiry queue and one straight to
                    the provider's phone. an ambulance fare depends on the route, so asking is the
                    normal path rather than an optional extra and Ask Price is always offered.
                    WhatsApp needs a number to open, so that one appears only when there is one */}
                <div className="flex gap-2 mt-3">
                    <SendEnquiry
                        variant="button"
                        label="Ask Price"
                        heading={`Ask Price for ${vehicleDisplayName}`}
                        section="ambulance_price_enquiry"
                        defaultMessage={priceQuestion}
                        placeholder="Tell them the pickup, the drop and when you need it"
                        businessType={info.business_type}
                        state={info.state || ""}
                        city={info.city}
                        clini_id={info.id}
                        modalZIndex={20}
                        surface={surface}
                        className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg border border-cyan-600 text-cyan-700 font-semibold fs-13 hover:bg-cyan-50 transition-colors"
                    >
                        <BiRupee className="fs-15" />
                    </SendEnquiry>
                    {info.whatsapp_number ? (
                        <TrackedLink
                            href={`https://wa.me/${info.whatsapp_number}?text=${encodeURIComponent(whatsappMessage)}`}
                            ev_nm="whatsapp_click" section_name="ambulance_card" target="_blank"
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border fs-13 font-semibold"
                            style={{ color: "#15803d", borderColor: "#15803d" }}>
                            <BsWhatsapp />WhatsApp
                        </TrackedLink>
                    ) : null}
                </div>
            </div>
        </div>
    );
};
export default AmbulanceCard;
