/* what the phone and desktop profile pages share, so the two read a profile the same way */
import { TUserProfile } from "@/lib/hooks/user-profile";
import { clinicDetailpageUrl } from "@/lib/helper/link";
import moment from "@/lib/helper/date-time";

type TClinicInfo = NonNullable<TUserProfile["clinic_info"]>;

const joinParts = (parts: Array<string | null | undefined>) =>
    parts.map((p) => (p || "").trim()).filter(Boolean).join(", ");

export const fullName = (p: TUserProfile) => `${p.firstname || ""} ${p.lastname || ""}`.trim();

export const initials = (name: string) =>
    name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w.charAt(0).toUpperCase()).join("") || "?";

/* the api hands image and logo back as stored, which may be only a file name, so a picture is shown
   only when it is already a full url and the initials stand in otherwise */
export const imageUrl = (src: string | null | undefined) => (src && /^https?:\/\//.test(src) ? src : "");

export const genderLabel = (g: string | null) => (g ? g.charAt(0).toUpperCase() + g.slice(1).toLowerCase() : "");

export const dobLabel = (dob: string | null) => {
    if (!dob) return "";
    const d = moment(dob);
    if (!d.isValid()) return "";
    const age = moment().diff(d, "years");
    return `${d.format("DD MMM YYYY")}${age > 0 ? ` (${age} yrs)` : ""}`;
};

export const userAddress = (p: TUserProfile) => joinParts([p.village, p.sub_district, p.city, p.state]);

export const cityState = (p: TUserProfile) => joinParts([p.city, p.state]);

/* only a clinic owner sees their business, the same rule the phone page always had */
export const ownedClinic = (p: TUserProfile): TClinicInfo | null =>
    p.clinic_info && p.user_type === "clinic_staff" && p.is_clinic_owner == 1 ? p.clinic_info : null;

export const clinicAddress = (c: TClinicInfo) => joinParts([c.location, c.locality, c.market_name, c.city, c.state]);

export const businessTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
        CLINIC: "Clinic",
        PETCARE: "Pet Care",
        MEDICINESTORE: "Medicine Store",
        CARETAKER: "Caretaker",
        RELAXATION: "Relaxation",
        PHYSIOTHERAPY: "Physiotherapy",
    };
    return labels[type] || type;
};

/* the public listing link, when there is enough to build it */
export const clinicPageUrl = (c: TClinicInfo) =>
    c.seo_url && c.state && c.city && c.market_name && c.bid
        ? clinicDetailpageUrl({ seo_url: c.seo_url, state: c.state, city: c.city, market_name: c.market_name, bid: c.bid, business_type: c.business_type })
        : "";
