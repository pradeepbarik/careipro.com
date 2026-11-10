'use client';
import { useResultPageDoctors } from "@/lib/hooks/useUserFeedSection";
import { DoctorRelationCards, TYourDoctor } from "./your-doctors";

/**
 * "You might be looking for" at the top of a doctor result page: doctors in
 * this city the logged-in user already booked, contacted or viewed who have
 * this page's specialty. Comes from the user's daily result-page cache file
 * (keyed city -> cat_id); renders nothing for guests or when there are none.
 */
const LookingForDoctors = ({ state, city, cat_id, variant }: { state: string, city: string, cat_id?: string | number, variant: "mobile" | "desktop" }) => {
    const doctors = useResultPageDoctors<TYourDoctor>(state, city, cat_id);
    if (!cat_id) return null;
    return (
        <DoctorRelationCards doctors={doctors} heading="You might be looking for" variant={variant}
            section="looking_for" event="looking_for_doctor" desktopColumns={3} />
    );
};
export default LookingForDoctors;
