/* The ambulance vehicle classes. This is a fixed taxonomy rather than data: the same codes are
   stored in clinic_ambulances.vehicle_type by the branch admin, so the two must stay in step.
   The providers themselves come from the api, see lib/hooks/ambulance/useAmbulance.ts. */

export type TAmbulanceCategoryCode = "BLS" | "ALS" | "ICU" | "PTV" | "NEONATAL" | "MORTUARY" | "AIR";

export type TAmbulanceCategory = {
    code: TAmbulanceCategoryCode,
    name: string,
    /** the label used on a provider card chip, where the full name does not fit */
    short: string,
    desc: string,
}


/** government-run, free, and the right first answer for a stranger in an emergency */
export const NATIONAL_EMERGENCY_NUMBER = "108";

export const ambulanceCategories: TAmbulanceCategory[] = [
    { code: "BLS", name: "Basic Life Support", short: "BLS", desc: "Oxygen, stretcher and a trained attendant" },
    { code: "ALS", name: "Advanced Life Support", short: "ALS", desc: "Cardiac monitor, defibrillator and paramedic" },
    { code: "ICU", name: "ICU / Cardiac Ambulance", short: "ICU", desc: "Full ventilator-equipped ICU on wheels" },
    { code: "PTV", name: "Patient Transport", short: "Transport", desc: "Planned, non-emergency shifting" },
    { code: "NEONATAL", name: "Neonatal / Infant", short: "Neonatal", desc: "Incubator and warmer for newborns" },
    { code: "MORTUARY", name: "Mortuary Van", short: "Mortuary", desc: "Freezer box for dignified last transport" },
    { code: "AIR", name: "Air Ambulance", short: "Air", desc: "Inter-state critical care airlift" },
];

