import { TClinic, TClinicTopDoctor } from '@/lib/types/clinic';
import ClinicCard from './clinic-card';
import { NearbyToggle } from './nearby-distance';

/* Version 2 of the clinics listing. Replaces vertical-slider.tsx, which showed only a
   name, a locality and a logo, with a card that carries what a patient actually chooses
   on: rating, whether the place is open, distance, doctor count and lab services. */
const ClinicsListV2 = ({ clinics, cliniCTopDoctorsData }: {
    clinics: TClinic[],
    cliniCTopDoctorsData?: { [clinic_id: string]: { total_doctor: number, topDoctors: TClinicTopDoctor[] } }
}) => {
    return (
        <div className="px-2 pb-4">
            {/* one ask for the whole page rather than a button per card */}
            <div className="flex justify-end">
                <NearbyToggle />
            </div>
            {clinics.map((clinic) =>
                <ClinicCard key={clinic.id} clinic={clinic}
                    topDoctors={cliniCTopDoctorsData?.[clinic.id.toString()]?.topDoctors || []} />
            )}
        </div>
    )
}
export default ClinicsListV2;
