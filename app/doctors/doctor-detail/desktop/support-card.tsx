import { BiSupport, BiPhone, BiHeadphone } from "react-icons/bi";
import { TDoctorDetail } from "@/lib/types/doctor";
import { capitalizeEachWordFirstLetter } from "@/lib/helper/format-text";
import { support_no } from "@/constants/site-config";
import TrackedLink from "@/app/components/client-components/tracked-link";
import ReportIssue from "@/app/components/client-components/report-issue";

const clean = (value: string | null | undefined) => (value || "").trim();

/**
 * The careipro side of the booking rail, the same card the clinic detail page carries and reading
 * the same fields, the clinic's own crm and support numbers with the city settings standing in.
 * The platform helpline is the last resort, so the card still gives a visitor somewhere to call in
 * a city that has no support row yet.
 */
const SupportCard = ({ data, patientName = "" }: { data: TDoctorDetail, patientName?: string }) => {
    //the clinic's own crm, with no city fallback: city_manager_* is careipro's internal contact
    //for the city and is not for patients. only the city's patient support line stands in.
    const crm = clean(data.crm_contact_number);
    const usesClinicSupport = Boolean(clean(data.patient_support_contact_no));
    const support = clean(data.patient_support_contact_no) || clean(data.city_settings?.patient_support_contact_no) || support_no;
    const supportStaff = usesClinicSupport ? "" : clean(data.city_settings?.patient_support_staff_name);
    const supportTiming = usesClinicSupport ? "" : clean(data.city_settings?.support_time_message);

    //names are entered free form in the admin, normalise before a patient sees them
    const crmName = capitalizeEachWordFirstLetter(clean(data.crm_name));
    const namedHelper = Boolean(crm && crmName);
    const helperName = namedHelper ? crmName : capitalizeEachWordFirstLetter(supportStaff);

    return (
        <section className="bg-white rounded-xl p-4 border border-indigo-100">
            <div className="flex items-start gap-3">
                <span className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                    <BiSupport className="text-indigo-600 text-xl" />
                </span>
                <div className="flex flex-col grow min-w-0">
                    <h2 className="fs-15 font-bold text-gray-900 leading-5">Not able to connect with the clinic?</h2>
                    <span className="fs-13 text-gray-600 leading-5 mt-1">
                        {helperName
                            ? <><span className="font-semibold text-gray-900">{helperName}</span> from careipro is ready to help you immediately.</>
                            : "Our careipro care team is ready to help you immediately."}
                    </span>
                </div>
            </div>
            <div className="flex flex-col gap-2 mt-3">
                {crm && (
                    <TrackedLink
                        href={`tel:${crm}`}
                        ev_nm="crm_call_click"
                        section_name="careipro_support"
                        className="flex items-center justify-center gap-2 py-2 rounded-lg bg-cyan-600 text-white fs-13 font-bold hover:bg-cyan-700 transition-colors"
                    >
                        <BiPhone />{namedHelper ? `Talk with ${crmName}` : "Talk with our care team"}
                    </TrackedLink>
                )}
                <TrackedLink
                    href={`tel:${support}`}
                    ev_nm="patient_support_call_click"
                    section_name="careipro_support"
                    className={`flex items-center justify-center gap-2 py-2 rounded-lg fs-13 font-bold transition-colors ${crm
                        ? 'border border-cyan-600 text-cyan-700 hover:bg-cyan-50'
                        : 'bg-cyan-600 text-white hover:bg-cyan-700'}`}
                >
                    <BiHeadphone />
                    {supportStaff ? `Patient support · ${capitalizeEachWordFirstLetter(supportStaff)}` : "Patient support helpline"}
                </TrackedLink>
                {supportTiming && <span className="fs-12 text-gray-500 text-center">{supportTiming}</span>}
            </div>
            {/* the doctor and city go in the campaign so a reported issue can be traced back to
                the page it came from without another lookup */}
            <ReportIssue
                campaign={`doctor_detail_support_unresolved:${data.doctor_id}:${(data.clinic_city || '').toLowerCase()}`}
                defaultName={patientName}
            />
        </section>
    );
};

export default SupportCard;
