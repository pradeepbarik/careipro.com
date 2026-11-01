/* The services careipro offers, for pages that have to show them before a city is known.
 *
 * Everywhere else these come from the city's own home page cache, where the api has already turned
 * each url_pattern into a real link. The front door has no city yet, so it carries its own copy:
 * the labels and icons are the same, and `path` is what goes after /{state}/{city} once somebody
 * picks one. Keep in step with VERTICALS in api.careipro.com's init-cache controller.
 */
export type TVerticalTile = { label: string, icon: string, path: string };

export const VERTICAL_TILES: TVerticalTile[] = [
    { label: "Doctors", icon: "doctors-vertical.webp", path: "best-doctors" },
    { label: "Clinic/Hospital", icon: "clinics-vertical.webp", path: "hospitals-and-clinics" },
    { label: "Ultrasound,Xray & Lab Tests", icon: "ultrasound-vertical.webp", path: "labs-tests-scans" },
    { label: "Caretakers", icon: "caretaker-vertical.webp", path: "caretakers" },
    /* not "medicines-stores-pharmacies", which is what the api's VERTICALS still says and which
       matches no rewrite, so it 404s. the rewrites know this one and "pharmacies" */
    // { label: "Medicine Stores/Pharmacies", icon: "medicines-vertical.svg", path: "medicines-and-healthcare-products" },
    // { label: "Petcare/Veterinary", icon: "petcare-vertical.webp", path: "pet-care-clinics" },
    { label: "Physiotherapy", icon: "physiotherapy-vertical.webp", path: "physiotherapy-centers" },
    // { label: "Relaxation/Massage", icon: "relaxation-massage-vertical.webp", path: "massage-service-spas" },
    { label: "Ambulance", icon: "ambulance-vertical.webp", path: "ambulance-service" },
];
