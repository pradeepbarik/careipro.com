import Link from "next/link";
import { FaUserMd } from "react-icons/fa";
import { TclinicDetail } from "@/lib/hooks/useClinics";
import { getOpenStatus, TClinicTiming } from "@/lib/helper/clinic-timing";
import { doctorDetailPageUrl } from "@/lib/helper/link";
import { doctorProfilePic } from "@/lib/image";
import { formatDoctorName } from "@/lib/helper/format-text";
import PriceFormat from "@/app/components/mobile/ui/price-format";

/**
 * One doctor on the clinic detail page, shared by the mobile layout and the desktop one.
 *
 * An earlier attempt gave every doctor a bordered card with a stats strip and ran 68% taller
 * while saying less, so the information stays dense and the gain comes from hierarchy:
 *
 *   - the name leads, a step up from the fs-14 it shared with everything else
 *   - the speciality is coloured, since that is what someone scanning a roster looks for, and
 *     the qualification and years drop to one muted line beneath it
 *   - Book Appointment runs full width underneath carrying the fee, so the price is read
 *     against the thing it buys rather than competing with the name
 *
 * `layout` only changes how one doctor is separated from the next. Stacked on mobile they read
 * as a list, so a hairline is enough; in the desktop two column grid a hairline leaves the
 * columns bleeding into each other, so each cell gets its own border.
 */
const DoctorCard = ({ doctor, info, layout = "list" }: {
    doctor: TclinicDetail["doctors"][number],
    info: TclinicDetail["clinic_info"],
    layout?: "list" | "grid"
}) => {
    const fee = Number(doctor.service_charge);
    const experience = Number(doctor.experience);
    /* a doctor's weekly columns match the clinic_timings shape, so the same helper works */
    const status = getOpenStatus(doctor as unknown as TClinicTiming, new Date());
    const detailUrl = doctorDetailPageUrl({
        doctor_id: doctor.doctor_id,
        service_loc_id: doctor.id,
        clinic_id: doctor.clinic_id,
        seo_url: doctor.seo_url,
        state: info.state || "",
        city: info.city,
        market_name: info.market_name,
        type: doctor.business_type
    });
    const speciality = (doctor.specialists || doctor.position || "").trim();
    /* one muted line: the letters after the name, then how long they have been practising */
    const credentials = [(doctor.qualification_disp || "").trim(), experience > 0 ? `${experience} yrs exp` : ""]
        .filter((part) => part !== "")
        .join(" · ");

    return (
        <div className={layout === "grid"
            ? "p-3 rounded-xl border border-gray-200 bg-white hover:border-cyan-300 hover:shadow-sm transition-all flex flex-col"
            : "py-3 border-b border-gray-100 last:border-0 last:pb-0 first:pt-0"}>
        <div className="flex gap-3">
            {/* icon fallback rather than doctorProfilePic's default, which is a 404 */}
            {doctor.profile_pic ?
                <img src={doctorProfilePic(doctor.profile_pic)} alt={doctor.doctor_name}
                    className="h-12 w-12 rounded-full object-cover bg-gray-100 shrink-0" />
                :
                <span className="h-12 w-12 rounded-full bg-cyan-50 flex items-center justify-center shrink-0">
                    <FaUserMd className="text-cyan-600 fs-18" />
                </span>
            }

            <div className="grow min-w-0">
                <Link href={detailUrl} className="block fs-15 font-bold text-gray-900 leading-5">
                    {formatDoctorName((doctor.doctor_name || "").trim(), doctor.business_type)}
                </Link>
                {speciality && <div className="fs-12 font-semibold text-cyan-700 leading-4">{speciality}</div>}
                {credentials && <div className="fs-12 text-gray-500 leading-4 mt-[1px]">{credentials}</div>}
                {/* The slot is always rendered, even with nothing to say. Only some doctors have
                    consulting hours saved, and letting the line collapse made those cards shorter
                    than their neighbours, so the Book buttons sat at different heights across the
                    grid and the stretched cards opened a gap above their button. */}
                <div className={`fs-12 mt-1 min-h-[18px] ${status.isOpen ? "text-green-700" : "text-gray-500"}`}>
                    {status.nextChange &&
                        <>
                            {/* nextChange carries the day, so this reads "Available today 3:30 PM" */}
                            <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 align-middle ${status.isOpen ? "bg-green-500" : "bg-gray-300"}`} />
                            {status.isOpen ? `Till ${status.nextChange}` : status.nextChange}
                        </>}
                </div>
            </div>

        </div>

        {/* Outlined: the page already has a filled cyan bar pinned at the bottom, and a solid
            button repeated down a roster competes with it.

            The fee rides on the button rather than in the details. On the name's line it
            outweighed the name, and buried in the grey credentials line it disappeared; against
            the action it is read at the moment it matters, next to what it buys. */}
        <Link href={detailUrl}
            className="flex items-center justify-center gap-2 mt-2.5 w-full fs-13 font-bold text-cyan-700 border border-cyan-600 bg-white py-2 rounded-lg active:bg-cyan-50 transition-colors">
            Book Appointment
            {fee > 0 &&
                <>
                    <span className="text-cyan-300" aria-hidden="true">·</span>
                    <PriceFormat amount={fee} symbol={true} />
                </>}
        </Link>
        </div>
    );
};
export default DoctorCard;
