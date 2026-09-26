import { IconType } from "react-icons";
import {
    FaParking, FaWheelchair, FaAmbulance, FaPills, FaFlask, FaWifi, FaCouch, FaTint,
    FaRestroom, FaSnowflake, FaCreditCard, FaMoneyBillWave, FaShieldAlt, FaClinicMedical,
    FaCalendarCheck, FaVials, FaProcedures, FaHeartbeat, FaTools, FaChild, FaBlind
} from "react-icons/fa";

/* Icon per facility. The keys must match branch.careipro.com's FACILITY_OPTIONS exactly,
   because the admin writes those strings straight into clinic_specialization.facility and
   they arrive here unchanged. A facility with no entry here falls back to a generic icon,
   so adding an option in the admin never breaks this page. */
export const FACILITY_ICONS: Record<string, IconType> = {
    "Parking": FaParking,
    "Wheelchair Access": FaWheelchair,
    "Lift": FaProcedures,
    "Ambulance": FaAmbulance,
    "In-house Pharmacy": FaPills,
    "In-house Laboratory": FaFlask,
    "Free Wi-Fi": FaWifi,
    "Waiting Lounge": FaCouch,
    "Drinking Water": FaTint,
    "Washroom": FaRestroom,
    "Air Conditioned": FaSnowflake,
    "Card / UPI Payment": FaCreditCard,
    "Cash Payment": FaMoneyBillWave,
    "Insurance Accepted": FaShieldAlt,
    "24x7 Emergency": FaClinicMedical,
    "Online Appointment": FaCalendarCheck,
    "Home Sample Collection": FaVials,
    "Attached Operation Theatre": FaTools,
    "ICU": FaHeartbeat,
    "Blood Bank": FaTint,
    "Child Friendly": FaChild,
    "Senior Citizen Assistance": FaBlind,
}
export const FALLBACK_FACILITY_ICON: IconType = FaClinicMedical;
export const facilityIcon = (facility: string): IconType => {
    return FACILITY_ICONS[facility] || FALLBACK_FACILITY_ICON;
}
