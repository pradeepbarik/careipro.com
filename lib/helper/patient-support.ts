import { TDoctorDetail } from "@/lib/types/doctor";
import { support_no } from "@/constants/site-config";
import { capitalizeEachWordFirstLetter } from "@/lib/helper/format-text";

export type TPatientSupportContact = { number: string, name: string, timing: string };

const clean = (value: string | null | undefined) => (value || "").trim();

/* who a patient should call for this doctor's clinic, in the order the doctor page support card
   uses: the clinic's own patient support line, then the city's (branch admin, city settings), then
   the careipro helpline so there is always someone to call. The city name and timing only belong
   to the city line, a clinic's own number comes without them. */
export const patientSupportContact = (data: TDoctorDetail): TPatientSupportContact => {
    const clinicNumber = clean(data.patient_support_contact_no);
    if (clinicNumber) {
        return { number: clinicNumber, name: "", timing: "" };
    }
    const cityNumber = clean(data.city_settings?.patient_support_contact_no);
    if (cityNumber) {
        return {
            number: cityNumber,
            name: capitalizeEachWordFirstLetter(clean(data.city_settings?.patient_support_staff_name)),
            timing: clean(data.city_settings?.support_time_message),
        };
    }
    return { number: support_no, name: "", timing: "" };
};
